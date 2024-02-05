async function contactInit() {
  await includeHTML();
  await loadUsers();
  await loadContacts();
  renderContacts();
}

function renderContacts() {
  let contactlist = document.getElementById("contact-list");
  contactlist.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    contactlist.innerHTML += `
      <div class="contact-card" id="contact-card-${i}" onclick="showContact(${i})">
        <div class="circle" style="background-color: ${contact.color};">${contact.initials}</div>
        <div class="contact">
          <h1>${contact.name}</h1>
          <p>${contact.email}</p>
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
          <div class="big-contact-edit">
            <img src="img/contact/edit.svg">
            <p>Edit</p>
          </div>
          <div class="big-contact-delete">
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
}
