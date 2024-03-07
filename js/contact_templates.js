function renderContactsHTML(contact) {
  return /* html */ `
    <div class="contact-card" id="contact-card-${contact.id}" onclick="showContact(${contact.id});">
        <div class="circle" style="background-color: ${contact.color};">${contact.initials}</div>
        <div class="contact">
          <h1>${contact.name} ${you}</h1>
          <p class="contact-email">${contact.email}</p>
        </div>
      </div>
    `;
}
