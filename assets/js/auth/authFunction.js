function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateName(name) {
  if(name.length > 3){
    return name;
  }
}

function saveUserToLocalStorage(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    return "User with this email already exists.";
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return "Account created succefully";
}

// Function to register a new user
function registerUser(name, email, password) {
  //User Object
  const user = {
    id: uuidv4(),
    name: name,
    email: email,
    Password: password,
    role: "reader",
    dateJoined: new Date().toISOString(),
  };

  let feedback = saveUserToLocalStorage(user);
  return feedback;
}
function ManageSession(user) {
  const sessionId = uuidv4();
  sessionStorage.setItem("sessionId", sessionId);
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}
function endSession() {
  sessionStorage.removeItem("sessionId");
  sessionStorage.removeItem("currentUser");
}

function verifyCredentials(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email);
  console.log(user);
  if (user) {
    if (validatePassword(password) && user.Password === password) {
      console.log(user);
      ManageSession(user);
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
