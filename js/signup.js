users = [
  {
    id: "",
    name: "",
    email: "",
    password: "",
    initials: "",
    tasks: [
      {
        id: "",
        autor: "",
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        prio: "",
        category: "",
        subtasks: "",
        contacts: "",
        status: "",
      },
    ],
    contacts: [
      {
        id: "",
        name: "",
        email: "",
        phone: "",
        color: "",
      },
    ],
  },
];

function addUser(id, name, email, password) {
  let initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  let newUser = {
    id: id,
    name: name,
    email: email,
    password: password,
    initials: initials,
    tasks: [],
    contacts: [],
  };

  users.push(newUser);
  console.log(users);
}

function registerUser() {
  let name = document.getElementById("signup-input-name").value;
  let email = document.getElementById("signup-input-email").value;
  let password = document.getElementById("signup-input-password").value;
  let confirmPassword = document.getElementById(
    "signup-input-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwörter müssen übereinstimmen!");
    return;
  }

  addUser(generateUserId(), name, email, password);
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

function togglePrivacyButtonColor(){
  let button = document.getElementById('privacy-button')
  button.classList.toggle('button-img');
}