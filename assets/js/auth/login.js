import UserServive from "../service/userServices.js";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const messgae = document.querySelector("#message");
const signinBtn = document.querySelector("#signin-btn");
const passMessage = document.querySelector("#pass-feeback");


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
    passMessage.innerHTML = "A valid Password must contain: <br> -Uppercase letter <br> -Lowercase letter <br> -Special character <br> -Numbers"
    passMessage.style.color = "red"
  }
});

signinBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (validateEmail(email.value) && validatePassword(password.value)) {
    const user = { email: email.value, password: password.value };
    const response = await UserServive.authenticateUser(user);

    message.textContent = "";
    const res = await response.json();
    const token = response.headers.get("x-auth-token");
    if (response.status===200) {
      // Access the token from the response headers
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(res));
        message.textContent = "🚨Redirecting......";
        message.style.color = "green";
        window.location.assign("../../blog-pages/blog.html");
    } else {
      message.textContent = "Invalid email and password";
      message.style.color = "red";
      passMessage.innerHTML = "A valid Password must contain: <br> -Uppercase letter <br> -Lowercase letter <br> -Special character <br> -Numerical characters"
      passMessage.style.color = "red"
      email.style.border = "2px solid darkred";
      password.style.border = "2px solid darkred";
    }
  }
}});