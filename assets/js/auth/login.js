const email = document.querySelector("#email");
const password = document.querySelector("#password");
const messgae = document.querySelector("#message");
const signinBtn = document.querySelector("#signin-btn");
const passMessage = document.querySelector("#pass-feeback");


document.addEventListener("DOMContentLoaded", ()=>{
  endSession();
})

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
    passMessage.style.display = "none"
  } else {
    password.style.border = "2px solid darkred";
    passMessage.innerHTML ="A valid Password must contain: <br> -Uppercase letter <br> -Lowercase letter <br> -Special character <br> -Numbers"
    passMessage.style.color = "red"
  }
});

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEmail(email.value) && validatePassword(password.value)) {
    message.textContent = "";
    const user = verifyCredentials(email.value, password.value);
    if (user !== null) {
      message.textContent = "🚨Redirecting......";
      message.style.color = "green";
      window.location.assign("../../blog-pages/blog.html");
    } else {
      message.textContent = "🚨Invalid Information😒";
      message.style.color = "red";
    }
  }else{
    message.textContent = "Invalid email and password";
    message.style.color = "red";
    passMessage.innerHTML ="A valid Password must contain: <br> -Uppercase letter <br> -Lowercase letter <br> -Special character <br> -Numerical characters"
    passMessage.style.color = "red"
    email.style.border = "2px solid darkred";
    password.style.border = "2px solid darkred";
  }
});
