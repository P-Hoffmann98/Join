async function loginInit() {
  await includeHTML();
  await loadUsers();
}

function login() {
  let email = document.getElementById("login-input-email").value;
  let password = document.getElementById("login-input-password").value;
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
  }
}

function toggleRememberButtonColor() {
  let button = document.getElementById("remember-button");
  button.classList.toggle("button-img");
}
