async function signupInit() {
  await includeHTML();
  await loadUsers();
}

async function registerUser() {
  signupbutton.disabled = true;
  let name = document.getElementById("signup-input-name").value;
  let email = document.getElementById("signup-input-email").value;
  let password = document.getElementById("signup-input-password").value;
  let userId = generateUserId();
  let initials = generateUserInitials(name);

  users.push({
    id: userId,
    name: name,
    email: email,
    password: password,
    initials: initials,
  }),
    await setItem("users", JSON.stringify(users));
  signupbutton.disabled = false;
  /*resetForm();*/
  window.location.href = "login.html";
}

/*
function resetForm() {
  document.getElementById("signup-input-name").value = "";
  document.getElementById("signup-input-email").value = "";
  document.getElementById("signup-input-password").value = "";
  document.getElementById("signup-input-confirm-password").value = "";
}
*/

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
    confirmPwdInput.setCustomValidity("");
  }
}

function togglePrivacyButtonColor() {
  let button = document.getElementById("privacy-button");
  button.classList.toggle("button-img");
}
