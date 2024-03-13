import UserServive from "../service/userServices.js";
const names = document.querySelector("#s-name");
const email = document.querySelector("#s-email");
const password = document.querySelector("#s-password");
const message = document.querySelector("#message");
const registerBtn = document.querySelector("#register-btn");


names.addEventListener("input", (e) => {
  if (validateName(e.target.value)) {
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

registerBtn.addEventListener("click", async (e) => {
  if (
    validateName(names.value) &&
    validateEmail(email.value) &&
    validatePassword(password.value)
  ) {
    const user = {
      username: names.value,
      email: email.value,
      password: password.value
    }
    try {
      let response = await UserServive.registerUser(user);
      if (response.status === 201) {
        let feedback = await response.json();
        console.log(feedback.message);
        message.textContent = feedback.message;
        setTimeout(() => {
          window.location.href = "./login.html"
        }, 2000);
        message.style.color = "green";
      } else {
        let errorData = await response.json();
        console.error("Registration failed:", errorData);
        message.textContent = `🚨${errorData.message}`;
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.textContent = "🚨 Registration failed. Please try again later.";
      message.style.color = "red";
    }
  } else {
    message.textContent = "🚨Invalid Information😒";
    message.style.color = "red";
  }
});
