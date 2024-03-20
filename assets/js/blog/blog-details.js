import UserServive from "../service/userServices.js";
import BlogService from "../service/blogServices.js";
import MessageServices from "../service/MessgeServices.js";
import CommentService from "../service/commentServices.js";

const commentBox = document.querySelector("#comment-text");
const feedback = document.querySelector("#feedback");
const commentBtn = document.querySelector("#comment-btn");
const commentCount = document.querySelector("#comments-count")
const container = document.getElementById("commented");
const likeBtn = document.getElementById("like-icon");
const likeCount = document.getElementById("like-count");
const signedUser = document.getElementById("signed-user");
const logout = document.getElementById("logout");
const subscribe = document.getElementById("subscribe-input")
const subscribeBtn = document.getElementById("subscribe-btn")
const subFeedback = document.getElementById("sub-feedback");
const subscribeSection = document.getElementById("subscribe")
const blogSection = document.querySelector("#blog-section");
const commenterImage = document.getElementById("commenter-img")
const accountLink = document.getElementById("account-link");
const loader = document.getElementById('loader');

// getting the # from a Blog ID
let blogId;
let authenticatedUser


// fill the page with the blog content dynamically
document.addEventListener("DOMContentLoaded", async () => {

    loader.style.display = 'block';
    authenticatedUser = UserServive.getAuthenticatedUser();
    blogId = location.hash.slice(1);
    if (!blogId) {
        window.location.assign("../../blog-pages/blog.html");
    }
    const data = await BlogService.getAllBlogById(blogId);
    const blog = await data.json();

    updateLikeUI(blogId, authenticatedUser);
    // Check authentication status
    if (authenticatedUser !== null) {
        subscribeSection.style.display = "none";
        signedUser.textContent = `Signed in as: ${authenticatedUser.email}`
        let answer = await UserServive.getUserById(authenticatedUser._id)
        let user = await answer.json();

        commenterImage.src = user.profile
        logout.innerHTML = '<a ><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
    } else {
        subscribeSection.style.display = "flex";
        signedUser.textContent = "Register today😊"
        logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
    }

    // Render blog content in details 
    if (blog) {
        const image = blogSection.querySelector("img");
        const title = blogSection.querySelector("#blog-title");
        const author = blogSection.querySelector("#blog-author");
        const date = blogSection.querySelector("#blog-date");
        const content = blogSection.querySelector("#blog-content-details");

        image.src = blog.thumbnail;
        title.textContent = blog.title;
        author.textContent = `Written by ${blog.author.username}`;
        const dateCreated = blog.createdAt;
        const parsedDate = new Date(dateCreated);
        const formattedDate = parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        date.textContent = formattedDate;
        content.innerHTML = blog.content;
    } else {
        blogSection.innerHTML = "<p>Blog post not found</p>";
    }

    // Show blog comments
    const response = await CommentService.getBlogComments(blogId);
    if (response.ok) {
        const blogCommentsDetails = await response.json();
        commentCount.textContent = `${blogCommentsDetails.commentsCount || 0} Comments`;
        renderBlogComment(blogCommentsDetails.comments)
    }
    loader.style.display = 'none';

});

subscribeBtn.addEventListener('click', (e) => {
    subFeedback.style.transition = "all 300ms ease-in-out";
    if (validateEmail(subscribe.value)) {
        subFeedback.style.display = "block";
        subFeedback.style.backgroundColor = "white";
        subFeedback.style.padding = "1rem";
        subFeedback.style.borderRadius = "0.5rem";
        subFeedback.textContent = addSubscriberEmailToLocalStorage(subscribe.value);

        setTimeout(() => {
            subFeedback.textContent = "";
            subFeedback.style.display = "none";
            subFeedback.style.transition = "all 300ms ease-in-out";
        }, 3000);
    } else {
        subFeedback.style.display = "block";
        subFeedback.style.backgroundColor = "white";
        subFeedback.style.padding = "1rem";
        subFeedback.style.borderRadius = "0.5rem";
        subFeedback.style.color = "darkred";
        subFeedback.innerHTML = "Invalid email";

        setTimeout(() => {
            subFeedback.textContent = "";
            subFeedback.style.display = "none";
            subFeedback.style.transition = "all 300ms ease-in-out";
        }, 3000);
    }
})

// add Comment when the button is clicked
commentBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    loader.style.display = 'block';
    if (!authenticatedUser) {
        window.location.assign("../../login.html")
    }

    const comment = {
        author: authenticatedUser._id,
        blog: blogId,
        content: commentBox.value
    }
    const response = await CommentService.createComment(comment);
    loader.style.display = 'none';
    const data = await response.json();
    if (response.ok) {
        commentBox.textContent = "";
        window.location.reload();
    }
});


function renderBlogComment(blogComment) {
    blogComment.forEach(comment => {
        // Create user profile image element
        const userProfileImg = document.createElement("img");
        userProfileImg.src = comment.author.profile || "";
        userProfileImg.classList.add("profile-image"); // Add any necessary classes

        // Create user profile container element
        const userProfileContainer = document.createElement("div");
        userProfileContainer.id = "user-profile";
        userProfileContainer.classList.add("flex", "align-center");
        userProfileContainer.appendChild(userProfileImg);

        // Create user name and time element
        const userNameAndTime = document.createElement("div");
        userNameAndTime.classList.add("user-name-time");

        const commentorName = document.createElement("p");
        commentorName.id = "commentor-name";
        commentorName.textContent = comment.author.username;

        // Create time since commented element
        const timeSinceCommented = document.createElement("p");
        timeSinceCommented.classList.add("delighted");
        timeSinceCommented.textContent = calculateTimeSinceCommented(comment.createdAt);

        userNameAndTime.appendChild(commentorName);
        userNameAndTime.appendChild(timeSinceCommented);

        const commentedText = document.createElement("p");
        commentedText.id = "commented-text";
        commentedText.innerHTML = comment.content;
        userNameAndTime.appendChild(commentedText);

        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fas", "fa-trash-can");
        deleteButton.style.color = "white"
        deleteButton.style.cursor = "pointer";
        userNameAndTime.appendChild(deleteButton);

        deleteButton.style.display = "none";

        // Create the main commented container
        const commentedContainer = document.createElement("div");
        commentedContainer.id = "commented";
        commentedContainer.classList.add("flex");
        commentedContainer.appendChild(userProfileContainer);
        commentedContainer.appendChild(userNameAndTime);
        // commentedContainer.appendChild(commentedText);
        // commentedContainer.appendChild(deleteButton);

        // Append the commented container to the main container
        container.appendChild(commentedContainer);
    });
}

// Function to calculate time since comment was made
function calculateTimeSinceCommented(commentDate) {
    const now = new Date();
    const diff = now - new Date(commentDate);
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
        return "a few seconds ago";
    } else {
        return "a few moments ago";
    }
}

likeBtn.addEventListener('click', checkLikeStatus);
async function checkLikeStatus() {
    const user = UserServive.getAuthenticatedUser();
    const response = await BlogService.getAllBlogById(blogId);
    const blog = await response.json();
    if (!user) {
        window.location.assign("../../login.html");
    } else {
        const checkUser = blog.likes.find((like) => {
            return like === user._id;
        });
        if (checkUser === undefined) {
            likeBtn.classList.replace('fa-regular', 'fa-solid');
            blog.likes.push(user._id);
        } else {
            likeBtn.classList.replace('fa-solid', 'fa-regular');
            blog.likes = blog.likes.filter((like) => like.user !== user.id);
        }
        const updatedBlogResponse = await BlogService.updateBlogLikes(blogId, blog.likes);
        const updatedBlog = await updatedBlogResponse.json();
        // Update like count on the UI
        likeCount.textContent = `${updatedBlog.likes.length} likes`;
    }
}

async function updateLikeUI(blogId, user) {
    const response = await BlogService.getAllBlogById(blogId);
    const blog = await response.json();

    if (user) {
        const checkUser = blog.likes.find((like) => like === user._id);
        if (checkUser !== undefined) {
            likeBtn.classList.replace('fa-regular', 'fa-solid');
        } else {
            likeBtn.classList.replace('fa-solid', 'fa-regular');
        }
    } else {
        likeBtn.classList.replace('fa-solid', 'fa-regular');
    }

    likeCount.textContent = `${blog.likes.length} likes`;
}




logout.addEventListener('click', (e) => {
    endSession();
    signedUser.textContent = "Register today😊";
    logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
});