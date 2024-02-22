const commentBox = document.querySelector("#comment-text"); 
const feedback = document.querySelector("#feedback");
const commentBtn = document.querySelector("#comment-btn");
const commentCount = document.querySelector("#comments-count")
const container = document.getElementById("commented");
const likeBtn = document.getElementById("like-icon");
const likeCount = document.getElementById("like-count");
const signedUser = document.getElementById("signed-user");
const logout = document.getElementById("logout");

// getting the if from the hash
const url = location.hash
const blogId = url.slice(1);
if(!blogId){
    window.location.assign("../../blog-pages/blog.html");
}
const authenticatedUser = getAuthenticatedUser();
// fill the page with the blog content dynamically
document.addEventListener("DOMContentLoaded", function() {
    const blogPostsData = localStorage.getItem("blogPosts");
    const blogPosts = JSON.parse(blogPostsData);
    const blogSection = document.querySelector("#blog-section");
    location

    if(authenticatedUser !== null){
        signedUser.textContent=`Signed in as: ${authenticatedUser.email}`
        logout.innerHTML='<a ><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
    }else{
        signedUser.textContent = "Register today😊"
        logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
    }
    if (blogPosts && blogPosts.length > 0) {
        const foundPost = blogPosts.find(post => post.id === blogId);
        if (foundPost) {
            const image = blogSection.querySelector("img");
            const title = blogSection.querySelector("#blog-title");
            const author = blogSection.querySelector("#blog-author");
            const date = blogSection.querySelector("#blog-date");
            const content = blogSection.querySelector("#blog-content-details");

            image.src = `../assets/images/${foundPost.blogthumbnail}`;
            title.textContent = foundPost.title;
            author.textContent = `Written by ${foundPost.author}`;
            const dateCreated = foundPost.dateCreated; 
            const parsedDate = new Date(dateCreated);
            const formattedDate = parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            date.textContent = formattedDate;
            content.innerHTML = foundPost.content;
            // checkLikeStatus();
        } else {
            blogSection.innerHTML = "<p>Blog post not found</p>";
        }
    } else {
        blogSection.innerHTML = "<p>No blog posts available</p>";
    }
});

// add Comment when the button is clicked
commentBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const user = getAuthenticatedUser();
    if(user === null){
        window.location.assign("../../login.html")
    }else{
        if(commentBox.value.length < 10){
            feedback.textContent = "Comment must at least be 10 characters!";
            feedback.style.color = "red";
        }else{
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
    commentedText.innerHTML = comment.comment ;
    userNameAndTime.appendChild(commentedText);

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-can");
    deleteButton.style.color ="white"
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

function checkLikeStatus(){
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
    const blogLikes = likes.filter((like)=>{
        return like.blog == blogId
    })
    likeCount.textContent = `${blogLikes.length} likes`
}

logout.addEventListener('click', (e)=>{
    endSession();
    signedUser.textContent = "Register today😊";
    logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
});