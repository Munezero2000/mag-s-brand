import UserServive from "../service/userServices.js";
import BlogService from "../service/blogServices.js";

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

// getting the # from a Blog ID
const url = location.hash
const blogId = url.slice(1);
if (!blogId) {
    window.location.assign("../../blog-pages/blog.html");
}

const authenticatedUser = UserServive.getAuthenticatedUser();

// fill the page with the blog content dynamically
document.addEventListener("DOMContentLoaded", async () => {
    const data = await BlogService.getAllBlogById(blogId);
    const blog = await data.json();

    // Check authentication status
    if (authenticatedUser !== null) {
        subscribeSection.style.display = "none";
        signedUser.textContent = `Signed in as: ${authenticatedUser.email}`
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

        image.src = `http://localhost:4000/uploads/${blog.thumbnail}`;
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
commentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const user = getAuthenticatedUser();
    if (user === null) {
        window.location.assign("../../login.html")
    } else {
        if (commentBox.value.length < 10) {
            feedback.textContent = "Comment must at least be 10 characters!";
            feedback.style.color = "red";
        } else {
            feedback.style.color = "green"
            addCommentToLocalStorage(user.id, blogId, commentBox.value)
            window.location.reload();
        }
    }
});

// Show blog comments
const blogComment = findCommentsById(blogId);
commentCount.textContent = `${blogComment.length || 0} Comments`;

blogComment.forEach(comment => {
    // Create user profile image element
    const userProfileImg = document.createElement("img");
    userProfileImg.src = "../assets/images/profile.jpg";
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
    const user = findUserById(comment.user)
    commentorName.id = "commentor-name";
    commentorName.textContent = user.name;

    // Create time since commented element
    const timeSinceCommented = document.createElement("p");
    timeSinceCommented.classList.add("delighted");
    timeSinceCommented.textContent = calculateTimeSinceCommented(comment.commentedOn);

    userNameAndTime.appendChild(commentorName);
    userNameAndTime.appendChild(timeSinceCommented);

    const commentedText = document.createElement("p");
    commentedText.id = "commented-text";
    commentedText.innerHTML = comment.comment;
    userNameAndTime.appendChild(commentedText);

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-can");
    deleteButton.style.color = "white"
    deleteButton.style.cursor = "pointer";
    userNameAndTime.appendChild(deleteButton);


    const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser && authenticatedUser.id === comment.user) {
        deleteButton.style.display = "block";
        deleteButton.addEventListener("click", () => {
            deleteCommentFromLocalStorage(comment.id);
            window.location.reload();
        });
    } else {
        deleteButton.style.display = "none";
    }

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

function checkLikeStatus() {
    const user = getAuthenticatedUser();
    const likes = getLikesFromLocalStorage();
    if (user === null) {
        window.location.assign("../../login.html");
    } else {
        const checkUser = likes.find((like) => {
            return like.user === user.id;
        });
        // THIS NEEDS MY ATTENTION
        if (checkUser === undefined) {
            likeBtn.classList.replace('fa-solid', 'fa-regular');
            addLikeToLocalStorage(user.id, blogId);
        } else {
            likeBtn.classList.replace('fa-regular', 'fa-solid');
            deleteLikeFromLocalStorage(user.id, blogId);
        }

    }
    const blogLikes = likes.filter((like) => {
        return like.blog == blogId
    })
    likeCount.textContent = `${blogLikes.length} likes`
}


logout.addEventListener('click', (e) => {
    endSession();
    signedUser.textContent = "Register today😊";
    logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
});