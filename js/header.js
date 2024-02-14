function loadInitials() {
  document.getElementById("header_initials").innerHTML =
    currentUser["initials"];
}

function openContextMenuHeader() {
  document.getElementById("context_menu_header").classList.toggle("d-none");
}
