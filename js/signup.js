async function addUserToServer(user) {
<<<<<<< HEAD
  const response = await setItem("users", user);
=======
  const response = await setItem('users', user);
>>>>>>> 59a54fd8ec4f6f8f1ca933c1c03df73c59265555
  console.log(response);
}

async function registerUser() {

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
  return Date.now();
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
