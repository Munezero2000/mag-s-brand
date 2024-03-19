import UserServive from "../service/userServices.js";

const names = document.getElementById("user-name");
const role = document.getElementById("user-role")
const userId = document.getElementById("user-id")
const userImage = document.getElementById("user-img");
const dashboard = document.getElementById("dashboard-link");
const namesInput = document.getElementById("names")
const emailInput = document.getElementById("email")
const fileInput = document.getElementById('file-input')
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");
const feeback = document.getElementById("feedback");
const updateInfoBtn = document.getElementById("update-info-btn");
const deleteAccBtn = document.getElementById("delete-acc-btn");
const changePasswordbtn = document.getElementById("change-password-btn");

let authenticated;
let user;

document.addEventListener("DOMContentLoaded", async (e) => {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    authenticated = UserServive.getAuthenticatedUser();
    if (!authenticated) {
        window.location.href = "../login.html";

    } else {
        if (authenticated.role !== "admin") {
            dashboard.style.display = "none";
        }
        const response = await UserServive.getUserById(authenticated._id);
        loader.style.display = 'none';
        if (response.ok) {
            user = await response.json();
            names.textContent = user.username;
            role.textContent = user.role.toUpperCase();
            userId.textContent = user._id
            userImage.src = user.profile
            namesInput.value = user.username;
            emailInput.value = user.email;
        }

    }
})

// Validating user Inputs
namesInput.addEventListener("input", (e) => {
    if (UserServive.validateName(e.target.value)) {
        namesInput.style.border = "2px solid #742ad3";
    } else {
        namesInput.style.border = "2px solid darkred";
    }
});

emailInput.addEventListener("input", (e) => {
    if (UserServive.validateEmail(e.target.value)) {
        emailInput.style.border = "2px solid #742ad3";
    } else {
        emailInput.style.border = "2px solid darkred";
    }
});
password.addEventListener("input", (e) => {
    if (UserServive.validatePassword(e.target.value)) {
        password.style.border = "2px solid #742ad3";
    } else {
        password.style.border = "2px solid darkred";
    }
});

cpassword.addEventListener("input", (e) => {
    if (cpassword.value === password.value) {
        cpassword.style.border = "2px solid #742ad3";
        feeback.textContent = "Password Match. Click change password Button to Confirm";
        feeback.style.color = "green";
    } else {
        cpassword.style.border = "2px solid darkred";
        feeback.textContent = "Password does not match"
        feeback.style.color = "red";
    }
});

// Change icon for adding image
document.getElementById('edit-img').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

// Listen for the change event on the file input element
fileInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            userImage.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    }
});

// update profile 
updateInfoBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (UserServive.validateEmail(emailInput.value) && UserServive.validateName(namesInput.value)) {
        const data = new FormData();
        data.append("username", namesInput.value);
        data.append("email", emailInput.value);
        data.append("profile", fileInput.files[0]);

        const response = await UserServive.updateUserInformation(authenticated._id, data);
        if (response.ok) {
            const res = await response.json();
            location.reload();
        }

    }
})

// change password
changePasswordbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (UserServive.validatePassword(password.value) && (password.value === cpassword.value)) {
        const data = new FormData();
        data.append("password", password.value);

        const response = await UserServive.updateUserInformation(authenticated._id, data);
        if (response.ok) {
            const res = await response.json();
            password.value = "";
            cpassword.value = "";
            feeback.textContent = "Password changed successfully";
            console.log(res);
        }


    }

})

deleteAccBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    confirm("Are sure you to delete your Account?😢")

    const response = await UserServive.deleteUserAccount(authenticated._id);
    if (response.ok) {
        const data = await response.json();
        UserServive.logout()
        console.log(data);
    }
});
