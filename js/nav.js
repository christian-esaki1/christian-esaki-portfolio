// js/nav.js - Navigation réutilisable pour tout le site
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== GÉNÉRATION DU HTML DE NAVIGATION ==========
    const navHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="logo">🛡️ Christian ESAKI</a>
                
                <!-- Bouton burger -->
                <button class="nav-toggle" id="burger" aria-label="Toggle navigation" aria-expanded="false">
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                
                <!-- Menu de navigation -->
                <ul class="nav-menu" id="nav-menu">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="parcours.html">Parcours</a></li>
                    <li><a href="competences.html">Compétences</a></li>
                    <li><a href="projets.html">Projets</a></li>
                    <li><a href="certifications.html">Certifications</a></li>
                    <li><a href="articles.html">Articles</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;
    
    // ========== INJECTION DE LA NAVIGATION ==========
    // Remplace le <nav> existant ou l'injecte dans un placeholder
    const existingNav = document.querySelector('nav');
    const navPlaceholder = document.getElementById('nav-placeholder');
    
    if (existingNav) {
        existingNav.outerHTML = navHTML;
    } else if (navPlaceholder) {
        navPlaceholder.innerHTML = navHTML;
    } else {
        // Si rien n'existe, injecte au début du body
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
    
    // ========== ACTIVATION DU LIEN DE LA PAGE COURANTE ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ========== MENU BURGER ==========
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    
    if (burger && navMenu) {
        // Toggle menu au clic sur le burger
        burger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            burger.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('show');
            burger.setAttribute('aria-expanded', isExpanded);
            
            // Empêcher le scroll quand le menu est ouvert (mobile)
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fermer le menu au clic sur un lien
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('show');
                    burger.classList.remove('active');
                    burger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideNav = burger.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========== SÉCURITÉ : Liens externes ==========
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// ========== STYLES CSS POUR LE BURGER (si pas dans style.css) ==========
// Ajouter dynamiquement si nécessaire
const burgerStyles = `
    .nav-toggle {
        display: none;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        gap: 5px;
        padding: 0.5rem;
        z-index: 1001;
    }
    
    .nav-toggle div {
        width: 25px;
        height: 3px;
        background: white;
        transition: all 0.3s ease;
        border-radius: 2px;
    }
    
    .nav-toggle.active div:nth-child(1) {
        transform: rotate(45deg) translate(7px, 7px);
    }
    
    .nav-toggle.active div:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active div:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    @media (max-width: 768px) {
        .nav-toggle {
            display: flex;
        }
        
        .nav-menu {
            display: none;
            flex-direction: column;
            position: fixed;
            top: 70px;
            right: 0;
            width: 280px;
            height: calc(100vh - 70px);
            background: #0f172a;
            box-shadow: -4px 0 25px rgba(0, 0, 0, 0.3);
            padding: 2rem 1rem;
            gap: 0.5rem;
            z-index: 999;
            overflow-y: auto;
        }
        
        .nav-menu.show {
            display: flex;
            animation: slideInRight 0.3s ease-out;
        }
        
        .nav-menu a {
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    }
`;

// Injecter les styles si pas déjà présents
if (!document.getElementById('nav-dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'nav-dynamic-styles';
    styleSheet.textContent = burgerStyles;
    document.head.appendChild(styleSheet);
}
