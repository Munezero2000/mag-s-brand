const names = document.querySelector("#s-name");
const email = document.querySelector("#s-email");
const password = document.querySelector("#s-password");
const message = document.querySelector("#message");
const registerBtn = document.querySelector("#register-btn");
document.addEventListener("DOMContentLoaded", ()=>{
  endSession();
})

names.addEventListener("input", (e) => {
  if (names.value.trim().length < 3) {
    names.style.border = "2px solid #742ad3";
  } else {
    names.style.border = "2px solid darkred";
  }
});

email.addEventListener("input", (e) => {
  if (validateEmail(e.target.value)) {
    email.style.border = "2px solid #742ad3";
  } else {
    email.style.border = "2px solid darkred";
  }
});

password.addEventListener("input", (e) => {
  if (validatePassword(e.target.value)) {
    password.style.border = "2px solid #742ad3";
  } else {
    password.style.border = "2px solid darkred";
  }
});

registerBtn.addEventListener("click", (e) => {
  if (
    validateName(names.value) &&
    validateEmail(email.value) &&
    validatePassword(password.value)
  ) {
    let feedback = registerUser(names.value, email.value, password.value);
    message.textContent = feedback;
    message.style.color = "green";
    window.location.assign("../../login.html")
  } else {
    message.textContent = "🚨Invalid Information😒";
    message.style.color = "red";
  }
});
