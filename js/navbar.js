(async () => {
  'use strict';
  try {
    const placeholder = document.getElementById('navbar-placeholder');
    const response = await fetch('navbar.html', { cache: 'no-store' });
    if (!response.ok) throw new Error('Erreur de chargement navbar');
    const html = await response.text();
    placeholder.innerHTML = html;

    // Gestion du menu burger
    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('.nav-menu');
    if (burger && navMenu) {
      burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        burger.classList.toggle('active');
      });

      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('show');
          burger.classList.remove('active');
        });
      });
    }

    // Lien actif
    const current = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu a').forEach(a => {
      if (a.getAttribute('href') === current) a.classList.add('active');
    });

  } catch (err) {
    console.error('Navbar error:', err);
  }
})();
