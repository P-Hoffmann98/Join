async function contactInit() {
  await includeHTML();
  await loadUsers();
  await loadContacts();
  renderContacts();
}

function renderContacts() {
  let contactlist = document.getElementById("contact-list");
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    contactlist.innerHTML += `
    <div class="contact" onlcick="showContact(${i})">${contact.name}</div>
    `;
  }
}
