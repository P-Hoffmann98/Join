function loadInitials() {
  document.getElementById("header_initials").innerHTML =
    currentUser["initials"];
}

setTimeout(loadInitials, 700);
