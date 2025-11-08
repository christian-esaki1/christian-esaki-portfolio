// js/navbar.js
(async () => {
  'use strict';
  try {
    const placeholder = document.getElementById('navbar-placeholder');
    const response = await fetch('navbar.html', { cache: 'no-store' });
    if (!response.ok) throw new Error('Erreur de chargement navbar');

    const html = await response.text();
    placeholder.insertAdjacentHTML('afterbegin', html);

    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('.nav-menu');

    if (burger && navMenu) {
      burger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('show');
        burger.classList.toggle('active');
        burger.setAttribute('aria-expanded', isActive);
      });

      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('show');
          burger.classList.remove('active');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Lien actif selon la page
    const current = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu a').forEach(a => {
      if (a.getAttribute('href') === current) a.classList.add('active');
    });
  } catch (err) {
    console.error('Navbar error:', err);
  }
})();
