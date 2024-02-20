async function loginInit() {
  await loadUsers();
  await loadContacts();
}

function login() {
  const email = document.getElementById("login-input-email").value;
  const password = document.getElementById("login-input-password").value;
  let user = users.find((u) => u.email == email && u.password == password);
  console.log(user);
  if (user) {
    console.log("User gefunden");
    currentUser = {
      email: user.email,
      userId: user.id,
      name: user.name,
      initials: user.initials,
    };
    console.log(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "summary.html";
  } else {
    console.log("User nicht gefunden");
    document.getElementById("errorbox").innerHTML =
      "Wrong password Ups! Try again.";
  }
}

function toggleRememberButton() {
  let button = document.getElementById("remember-button");
  button.classList.toggle("button-img");
}

function guestLogin() {
  currentUser = {
    email: "Guest",
    userId: "Guest",
    name: "Guest",
    initials: "G",
  };
  console.log(currentUser);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "summary.html";
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("login-input-password");
  const visibilityToggle = document.getElementById(
    "password-visibility-toggle"
  );
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  visibilityToggle.style.backgroundImage =
    passwordInput.type === "password"
      ? "url(/img/login/visibility_off.svg)"
      : "url(/img/login/visibility.svg)";
}
