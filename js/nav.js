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
<script>
(function(){
  const burger = document.getElementById('burger');
  const menu = document.getElementById('nav-menu');

  if(burger && menu){
    burger.addEventListener('click', () => {
      menu.classList.toggle('show');
      burger.setAttribute('aria-expanded', menu.classList.contains('show'));
    });

    // Fermer le menu après un clic sur un lien (mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if(window.innerWidth <= 900){
          menu.classList.remove('show');
          burger.setAttribute('aria-expanded','false');
        }
      });
    });
  }
})();
</script>
