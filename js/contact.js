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
    let randomColor = allColors[Math.floor(Math.random() * allColors.length)];

    contactlist.innerHTML += `
      <div class="contact-card" onclick="showContact(${i})">
        <div class="circle" style="background-color: ${randomColor};">${contact.initials}</div>
        <div class="contact">
          <h1>${contact.name}</h1>
          <p>${contact.email}</p>
        </div>
      </div>
    `;
  }
}
