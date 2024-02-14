function changeMenuLinkBgColor() {
  let currentPage = window.location.pathname;
  let links = document.querySelectorAll(".navigation a");
  links.forEach((link) => {
    if (link.href.includes(`${currentPage}`)) {
      link.classList.add("activeMenuLink");
    }
  });
}
