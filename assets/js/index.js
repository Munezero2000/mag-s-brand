const menu = document.querySelector("#nav-bar");
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
const name = document.querySelector("#feedback-name")
const email = document.querySelector("#feedback-email")
const message = document.querySelector("#feedback-message")
const feedback = document.querySelector("#feedback")
const feedbackBtn = document.querySelector("#send-feedback-btn")

feedbackBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  if(!name.value || !email.value || message.value.length < 10){
    const not = "The name is required. <br> A valid email is required. <br> the Message is required and must be 10 character or more... "
    displayNotification("darkred", not, 5000)
  }else{
    const feedbackObj = {
      name:name.value,
      email: email.value,
      message: message.value
    }
    saveFeedback(feedbackObj)
    displayNotification("darkgreen", "Message sent succefully", 5000)
    name.value ="";
    email.value= "";
    message.value = "";
  }

})

const saveFeedback= (feedback)=>{
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || []
  feedbacks.push(feedback)
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks))
}

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
