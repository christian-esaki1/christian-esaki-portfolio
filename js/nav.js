(() => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("main-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");

    // Bloque le scroll uniquement quand le menu est ouvert
    document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
  });

  // Ferme le menu quand on clique sur un lien
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Ferme avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
})();
