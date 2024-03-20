import MessageServices from "./service/MessgeServices.js";
import UserServive from "./service/userServices.js";

const name = document.querySelector("#feedback-name")
const email = document.querySelector("#feedback-email")
const message = document.querySelector("#feedback-message")
const feedback = document.querySelector("#feedback")
const menu = document.querySelector("#nav-bar");
const authBtn = document.getElementById("auth-button")
const feedbackBtn = document.querySelector("#send-feedback-btn")


document.addEventListener("DOMContentLoaded", async(e)=>{
  const authenticated = UserServive.getAuthenticatedUser();
  if(authenticated){
    authBtn.innerHTML = '<a class="nav-icon"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
    authBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      UserServive.logout();
      location.href="./login.html";
    })
  }else{
    authBtn.innerHTML = '<a class="nav-icon" href="login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
  }
})

// Menu button mgt
const container = document.querySelector(".container");
document.querySelector("#close-nav-item").addEventListener("click", (e) => {
  menu.style.display = "none";
  container.style.filter = "";
});
document.querySelector("#menu-icon").addEventListener("click", (e) => {
  menu.style.display = "flex";
  container.style.filter = "blur(8px)";
});

//clients message and feeback
feedbackBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!name.value || !email.value || message.value.length < 10) {
    const not = "The name is required. <br> A valid email is required. <br> the Message is required and must be 10 character or more... "
    displayNotification("darkred", not, 5000)
  } else {
    const feedback = {
      name: name.value,
      senderEmail: email.value,
      content: message.value
    }
    const response = await MessageServices.sendMessage(feedback);
    const data = await response.json();
    console.log(data)
    if (response.status === 201) {
      displayNotification("darkgreen", data.message, 5000);
    } else {
      displayNotification("darkred", data.message, 5000);
    }
    name.value = "";
    email.value = "";
    message.value = "";
  }

})


function displayNotification(color, message, delay) {
  feedback.style.display = "block";
  feedback.style.transition = "all 1000ms ease-in"
  feedback.style.color = color;
  feedback.innerHTML = message;

  setTimeout(() => {
    feedback.style.display = "none";
    feedback.style.transition = "all 1000ms"
  }, delay);
}
