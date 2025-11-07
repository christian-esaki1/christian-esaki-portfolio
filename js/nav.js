// js/nav.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("main-menu");

  if (!toggle || !menu) return;

  // Sécurité : empêche l'injection de code via innerHTML
  toggle.addEventListener("click", (e) => {
    e.preventDefault();

    // Bascule l'affichage du menu
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("active");
  });

  // Ferme le menu quand on clique sur un lien (meilleur UX mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
