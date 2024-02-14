async function signupInit() {
  await loadUsers();
  await loadContacts();
}

let acceptChecked = false;

async function registerUser() {
  let name = document.getElementById("signup-input-name").value;
  let email = document.getElementById("signup-input-email").value;
  let password = document.getElementById("signup-input-password").value;
  let userId = generateUserId();
  let initials = generateUserInitials(name);
  let i = Math.floor(Math.random() * allColors.length);
  let color = allColors[i];

  if (!acceptChecked) {
    document.getElementById("errorbox").innerHTML =
      "Please accept our Privacy Policy to sign up!";
    return;
  } else {
    signupbutton.disabled = true;
    users.push({
      id: userId,
      name: name,
      email: email,
      password: password,
      initials: initials,
      color: color,
    });
    contacts.push({
      id: userId,
      name: name,
      email: email,
      initials: initials,
      phone: "",
      color: color,
    });

    await setItem("users", JSON.stringify(users));
    await setItem("contacts", JSON.stringify(contacts));
    signupbutton.disabled = false;
    window.location.href = "index.html";
  }
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
    confirmPwdInput.setCustomValidity("");
  }
}

function togglePrivacyButton() {
  acceptChecked = !acceptChecked;
  let button = document.getElementById("privacy-button");
  button.classList.toggle("button-img");
}
