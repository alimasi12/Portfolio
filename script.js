// querySelector cherche le premier élément correspondant à un sélecteur CSS.
// Nous mémorisons ces éléments dans des constantes pour les réutiliser facilement.
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('#burger');
const navLinks = document.querySelector('#navLinks');
// querySelectorAll renvoie plusieurs éléments. [... ] transforme cette collection en vrai tableau.
const links = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section, header.hero')];

// Cette fonction ferme le menu mobile. La centraliser évite de répéter le même code.
function closeMenu() {
  // classList.remove retire la classe CSS "open", ce qui remet le menu hors écran.
  navLinks.classList.remove('open');
  // aria-expanded informe les technologies d'assistance que le menu est maintenant fermé.
  burger.setAttribute('aria-expanded', 'false');
  // Le libellé évolue avec l'état du bouton afin d'être compréhensible sans voir l'icône.
  burger.setAttribute('aria-label', 'Ouvrir le menu');
}

// addEventListener écoute une action. Ici, "click" se déclenche quand on clique sur le bouton.
burger.addEventListener('click', () => {
  // toggle ajoute "open" si elle manque, et la retire si elle existe déjà.
  // La valeur retournée (true/false) nous dit si le menu est désormais ouvert.
  const isOpen = navLinks.classList.toggle('open');
  // String est nécessaire car les attributs HTML sont toujours du texte.
  burger.setAttribute('aria-expanded', String(isOpen));
  // L'opérateur ternaire choisit une valeur selon la condition : condition ? siVrai : siFaux.
  burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Pour chaque lien du menu, fermer le panneau après la navigation vers une section.
links.forEach(link => link.addEventListener('click', closeMenu));
// Escape est la touche attendue pour fermer une interface ouverte ; c'est une bonne pratique UX.
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

// Quand l'utilisateur défile, on ajoute une classe au menu pour modifier son apparence.
window.addEventListener('scroll', () => {
  // window.scrollY est le nombre de pixels défilés verticalement depuis le haut.
  // toggle reçoit une deuxième valeur booléenne : la classe est présente seulement si elle est vraie.
  navbar.classList.toggle('scrolled', window.scrollY > 30);
// passive:true indique au navigateur que cet écouteur ne bloquera pas le défilement : plus fluide.
}, { passive: true });

// IntersectionObserver est plus performant que calculer sans cesse la position de chaque section.
// Il avertit notre code lorsqu'une section entre ou sort d'une zone visible de l'écran.
const observer = new IntersectionObserver(entries => {
  // entries contient une entrée pour chaque section dont la visibilité a changé.
  entries.forEach(entry => {
    // Si la section n'est pas dans la zone observée, nous ne faisons rien.
    if (!entry.isIntersecting) return;
    // target est la section concernée. On rend actif le lien dont le href correspond à son id.
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
// rootMargin réduit volontairement la zone d'observation : un lien devient actif quand la section
// arrive près du centre de l'écran. threshold:0 suffit dès qu'une partie devient visible.
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

// On demande à l'observer de surveiller toutes les sections, y compris le hero d'accueil.
sections.forEach(section => observer.observe(section));
// new Date() donne la date actuelle ; getFullYear extrait l'année. textContent écrit du texte sûr.
document.querySelector('#year').textContent = new Date().getFullYear();
