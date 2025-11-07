// js/nav.js
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("nav-menu");

  if (!burger || !menu) return;

  // Bascule l'affichage du menu
  burger.addEventListener("click", () => {
    menu.classList.toggle("show");
    burger.setAttribute("aria-expanded", menu.classList.contains("show"));
  });

  // Ferme le menu après un clic sur un lien (mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        menu.classList.remove("show");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  });
});
