let c;

async function contactInit() {
  await includeHTML();
  await loadUsers();
  await loadContacts();
  loadCurrentUser();
  loadInitials();
  renderContacts();
}

function renderContacts() {
  let contactlist = document.getElementById("contact-list");
  contactlist.innerHTML = "";

  contacts.sort((a, b) => a.name.localeCompare(b.name));

  let currentLetter = null;

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0).toUpperCase();

    if (firstLetter !== currentLetter) {
      contactlist.innerHTML += `<h2>${firstLetter}</h2>`;
      contactlist.innerHTML += `<div class="contact-list-spacer"></div>`;
      currentLetter = firstLetter;
    }

    contactlist.innerHTML += `
      <div class="contact-card" id="contact-card-${i}" onclick="showContact(${i});">
        <div class="circle" style="background-color: ${contact.color};">${contact.initials}</div>
        <div class="contact">
          <h1>${contact.name}</h1>
          <p class="contact-email">${contact.email}</p>
        </div>
      </div>
    `;
  }
}

function showContact(i) {
  let bigContactCard = document.getElementById("big-contact-card");
  const contact = contacts[i];
  bigContactCard.innerHTML = "";
  bigContactCard.innerHTML = `
    <div class="big-contact-header">
      <div class="big-circle" style="background-color: ${contact.color};">${contact.initials}</div>
      <div class="big-contact-name-edits">
        <h1>${contact.name}</h1>
        <div class="big-contact-edit-delete">
          <div class="big-contact-edit" onclick="openEditContact(${i})">
            <img src="img/contact/edit.svg">
            <p>Edit</p>
          </div>
          <div class="big-contact-delete" onclick="deleteContact(${i})">
            <img src="img/contact/delete.svg">
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
    <div class="big-contact-infos">
      <h2>Contact Information</h2>
      <h3>Email</h3>
      <a>${contact.email}</a>
      <h3>Phone</h3>
      <p>${contact.phone}</p>
    </div>
  `;
  for (let j = 0; j < contacts.length; j++) {
    document.getElementById(`contact-card-${j}`).style.backgroundColor =
      "#FFFFFF";
    document.getElementById(`contact-card-${j}`).style.color = "#000000";
  }
  document.getElementById(`contact-card-${i}`).style.backgroundColor =
    "#2A3647";
  document.getElementById(`contact-card-${i}`).style.color = "#FFFFFF";
  if (document.documentElement.clientWidth < 850) {
    document.getElementById("contact-container-right").style.display = "flex";
    document.getElementById("contact-container-left").style.display = "none";
    bigContactCard.innerHTML += `
    <img 
    class="contact-back-button-mobile" 
    src="img/contact/arrow-left-line.svg"
    onclick="closeMobileBigContact()"
    >    
    `;
    document.getElementById(`contact-card-${j}`).style.color = "#000000";
  }
}

async function deleteContact(c) {
  contacts.splice(c, 1);
  const bigContactCard = document.getElementById("big-contact-card");
  bigContactCard.innerHTML = "";
  closeEditContact();
  await setItem("contacts", JSON.stringify(contacts));
}

function openEditContact(i) {
  document.getElementById("edit-contact-filter").classList.remove("d-none");
  document.getElementById("edit-contact-card").classList.remove("d-none");
  c = i;
  loadUsers();
  loadContacts();
}

function closeEditContact() {
  document.getElementById("edit-contact-filter").classList.add("d-none");
  document.getElementById("edit-contact-card").classList.add("d-none");
  renderContacts();
}

async function editContact() {
  let name = document.getElementById("contact-edit-name").value;
  let email = document.getElementById("contact-edit-email").value;
  let phone = document.getElementById("contact-edit-phone").value;

  if (name) {
    contacts[c].name = name;
  }
  if (email) {
    contacts[c].email = email;
  }
  if (phone) {
    contacts[c].phone = phone;
  }

  await setItem("contacts", JSON.stringify(contacts));
  document.getElementById("contact-edit-name").value = "";
  document.getElementById("contact-edit-email").value = "";
  document.getElementById("contact-edit-phone").value = "";
  closeEditContact();
  renderContacts();
  showContact(c);
}

function openAddContact() {
  document.getElementById("add-contact-filter").classList.remove("d-none");
  document.getElementById("add-contact-card").classList.remove("d-none");
  loadUsers();
  loadContacts();
}

function closeAddContact() {
  document.getElementById("add-contact-filter").classList.add("d-none");
  document.getElementById("add-contact-card").classList.add("d-none");
}

async function addContact() {
  let name = document.getElementById("contact-input-name").value;
  let email = document.getElementById("contact-input-email").value;
  let phone = document.getElementById("contact-input-phone").value;
  let i = Math.floor(Math.random() * allColors.length);
  let color = allColors[i];
  let userId = generateUserId();
  let initials = generateUserInitials(name);

  contacts.push({
    id: userId,
    name: name,
    email: email,
    initials: initials,
    phone: phone,
    color: color,
  });
  await setItem("contacts", JSON.stringify(contacts));
  document.getElementById("contact-input-name").value = "";
  document.getElementById("contact-input-email").value = "";
  document.getElementById("contact-input-phone").value = "";
  closeAddContact();
  renderContacts();
}

function handleFormSubmission() {
  addContact();
}

function closeMobileBigContact() {
  document.getElementById("contact-container-right").style.display = "none";
  document.getElementById("contact-container-left").style.display = "flex";
  renderContacts();
}
