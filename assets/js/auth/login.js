import UserServive from "../service/userServices.js";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector("#message");
const signinBtn = document.querySelector("#signin-btn");
const passMessage = document.querySelector("#pass-feeback");

// Validating inputs
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

// check auth status
document.addEventListener("DOMContentLoaded", async (e) => {
  const token = UserServive.getUserToken();
  if (token) {
    location.href = "blog-pages/user-dashboard.html"
  }
})

signinBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const loader = document.getElementById('loader');
  const overlay = document.getElementById('overlay');
  loader.style.display = 'block';
  loader.style.display = 'block';
  overlay.style.display = 'block';
  if (UserServive.validateEmail(email.value) && UserServive.validatePassword(password.value)) {
    const user = { email: email.value, password: password.value };
    const response = await UserServive.authenticateUser(user);
    loader.style.display = 'none';
    overlay.style.display = 'none';
    if (response.ok) {
      const token = response.headers.get("x-auth-token");
      const res = await response.json();
      console.log(res)
      // Access the token from the response headers
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(res));
        message.textContent = "🚨Redirecting......";
        message.style.color = "green";
        window.location.assign("../../blog-pages/blog.html");
      }
    } else {
      message.textContent = "Invalid email or password";
      message.style.color = "red";
      passMessage.innerHTML = "A valid Password must contain: <br> -Uppercase letter <br> -Lowercase letter <br> -Special character <br> -Numerical characters"
      passMessage.style.color = "red"
      email.style.border = "2px solid darkred";
      password.style.border = "2px solid darkred";
    }
  }
});