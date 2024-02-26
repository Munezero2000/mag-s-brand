//validation
function validateTitle(titleValue) {
  return titleValue.trim() !== "" && titleValue.length >= 20;
}

function validateContent(contentValue) {
  return contentValue.trim() !== "" && contentValue.length >= 100;
}

function addBlogPost(title, category, content, imageName) {
  // Blog Post Object
  const blogPost = {
    id: uuidv4(),
    title: title,
    category: category,
    content: content,
    author: "me",
    dateCreated: new Date().toISOString(),
    blogthumbnail: imageName
  };

  let feedback = saveBlogPostToLocalStorage(blogPost);
  return feedback;
}

function saveBlogPostToLocalStorage(blogPost) {
  const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  blogPosts.push(blogPost);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  return "Blog post added successfully.";
}
function getBlogPost() {
  return JSON.parse(localStorage.getItem("blogPosts")) || []
}

function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('blog-card', 'flex', 'flex-col');
  
  const image = document.createElement('img');
  image.src = `../assets/images/${data.blogthumbnail}`;
  image.alt = data.title;
  
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-white');
  
  const datePara = document.createElement('p');
  const dateCreated = data.dateCreated; 
  const parsedDate = new Date(dateCreated);
  const formattedDate = parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  datePara.textContent = formattedDate;
  
  const titlePara = document.createElement('p');
  titlePara.textContent = data.title;
  
  const descriptionPara = document.createElement('p');
  let message = "🚀 Discover something new today! 🌟Explore our latest blog post for insights on a fascinating topic. 📖✨Dive into the world of knowledge with us.<br> Read more now!....";
  descriptionPara.innerHTML= message;
 

  contentDiv.appendChild(datePara);
  contentDiv.appendChild(titlePara);
  contentDiv.appendChild(descriptionPara);

  card.appendChild(image);
  card.appendChild(contentDiv);
  
  return card;
}

//a function to get a signed in user
function getAuthenticatedUser(){
  return JSON.parse(sessionStorage.getItem("currentUser")) || null;
}

//get comment from local storage
function getCommentFromLocalStorage(){
  return JSON.parse(localStorage.getItem("blogComments")) || [];
}
function getLikesFromLocalStorage(){
  return JSON.parse(localStorage.getItem("blogLikes")) || [];
}
// function to add a new comment 
function addCommentToLocalStorage( userId, blogId, commentText){
  const comment = {
      id : uuidv4(),
      user : userId,
      blog : blogId,
      comment: commentText,
      commentedOn: new Date()
  }
  const blogComments = getCommentFromLocalStorage();
  blogComments.push(comment);
  localStorage.setItem("blogComments", JSON.stringify(blogComments))
  return "comment Added";
}

function addLikeToLocalStorage(userId, blogId) {
  const like = {
    user: userId,
    blog: blogId,
    likedOn: new Date()
  };
  const blogLikes = getLikesFromLocalStorage();
  blogLikes.push(like);
  localStorage.setItem("blogLikes", JSON.stringify(blogLikes));
  return "Like added";
}

function deleteLikeFromLocalStorage(userId, blogId) {
  const blogLikes = getLikesFromLocalStorage();
  const index = blogLikes.findIndex(like => like.user === userId && like.blog === blogId);
  
  if (index !== -1) {
    blogLikes.splice(index, 1);
    localStorage.setItem("blogLikes", JSON.stringify(blogLikes));
    return "Like deleted";
  } else {
    return "Like not found";
  }
}
function deleteUserFromLocalStorage(id) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
      users.splice(userIndex, 1); // Remove the user from the array
      localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
      return "User deleted successfully";
  } else {
      return "User not found";
  }
}


function deleteCommentFromLocalStorage(commentId) {
  const blogComments = getCommentFromLocalStorage();
  const index = blogComments.findIndex(comment => comment.id === commentId);
  
  if (index !== -1) {
    blogComments.splice(index, 1);
    localStorage.setItem("blogComments", JSON.stringify(blogComments));
    return "Comment deleted";
  } else {
    return "Comment not found";
  }
}


function getAllUser(){
  return JSON.parse(localStorage.getItem("users")) || [];
}

function findUserById(id){
  const users = getAllUser();
  return users.find((user)=>{
    return user.id = id;
  })
}
function findCommentsById(id){
  const comments = getCommentFromLocalStorage();
  return comments.filter((comment)=>{
    return comment.blog == id;
  }) || []
}

function endSession() {
  sessionStorage.removeItem("sessionId");
  sessionStorage.removeItem("currentUser");
}

function checkAdminPrivilage(){
const authenticatedUser = getAuthenticatedUser();
document.addEventListener("DOMContentLoaded", (e)=>{
  if(authenticatedUser && authenticatedUser.role !== "admin"){
    endSession();
    window.location.assign("../../login.html")
  }else if(!authenticatedUser){
    window.location.assign("../../login.html")
  }
})
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function addSubscriberEmailToLocalStorage(email) {
  const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
  const existingSubscriberIndex = subscribers.findIndex(subscriber => subscriber.email === email);
  
  if (existingSubscriberIndex === -1) {
    subscribers.push({ email: email });
    
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
     return "Subscriber added successfully: "+ email;
  } else {
      return "Subscriber already exists:"+ email;
  }
}
