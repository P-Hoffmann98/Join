function changeMenuLinkBgColor() {
  let currentPage = window.location.pathname;
  let links = document.querySelectorAll(".nav-menu-point a");
  console.log(currentPage);
  console.log(links);
  links.forEach((link) => {
    if (link.href.includes(`${currentPage}`)) {
      link.classList.add("active-menu-link");
    }
  });
}
