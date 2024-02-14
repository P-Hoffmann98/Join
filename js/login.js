async function loginInit() {
  await loadUsers();
  await loadContacts();
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
    document.getElementById("errorbox").innerHTML =
      "Wrong password Ups! Try again.";
  }
}

function toggleRememberButton() {
  let button = document.getElementById("remember-button");
  button.classList.toggle("button-img");
}
