async function addUserToServer(user) {
  const response = await setItem("users", user);
  console.log(response);
}

async function registerUser(event) {
  event.preventDefault();

  let name = document.getElementById("signup-input-name").value;
  let email = document.getElementById("signup-input-email").value;
  let password = document.getElementById("signup-input-password").value;
  let confirmPassword = document.getElementById(
    "signup-input-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords must match!");
    return;
  }

  let userId = generateUserId();
  let initials = generateUserInitials(name);

  let newUser = {
    id: userId,
    name: name,
    email: email,
    password: password,
    initials: initials,
    tasks: [],
    contacts: [],
  };

  addUserToServer(newUser);
}

function generateUserInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function generateUserId() {
  return "user" + Date.now();
}

function checkPasswordMatch() {
  let password = document.getElementById("signup-input-password").value;
  let confirmPassword = document.getElementById(
    "signup-input-confirm-password"
  ).value;
  let confirmPwdInput = document.getElementById(
    "signup-input-confirm-password"
  );

  if (password !== confirmPassword) {
    confirmPwdInput.setCustomValidity("Die Passwörter stimmen nicht überein!");
  } else {
    confirmPwdInput.setCustomValidity(""); // Reset the custom validation message
  }
}

function togglePrivacyButtonColor() {
  let button = document.getElementById("privacy-button");
  button.classList.toggle("button-img");
}
