// NAVBAR SCROLL
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// BURGER MENU
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.onclick = () => {
   navLinks.classList.toggle("active");
   burger.classList.toggle("toggle");
};

// Fermer menu après clic
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// TYPEWRITER
const text = ["Développeur Web", "Freelancer", "Ingénieur électricien", "Musicien"];
let i = 0;
let j = 0;
let isDeleting = false;

function type() {
    const el = document.getElementById("typewriter");
    if (!el) return;

    const current = text[i];

    if (!isDeleting) {
        el.textContent = current.substring(0, j++);
        if (j > current.length) {
            isDeleting = true;
            return setTimeout(type, 1500); // pause
        }
    } else {
        el.textContent = current.substring(0, j--);
        if (j < 0) {
            isDeleting = false;
            i = (i + 1) % text.length;
        }
    }

    setTimeout(type, isDeleting ? 80 : 120);
}

type();


document.addEventListener("click", (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isClickOnBurger = burger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnBurger) {
        navLinks.classList.remove("active");
    }
});

// SKILL BARS
const skillFills = document.querySelectorAll(".skill-fill");
const skillsSection = document.querySelector("#comp");

window.addEventListener("scroll", () => {
    const trigger = skillsSection.offsetTop - window.innerHeight + 100;

    if (window.scrollY > trigger) {
        skillFills.forEach(fill => {
            if (fill.classList.contains("html")) fill.style.width = "90%";
            if (fill.classList.contains("css")) fill.style.width = "85%";
            if (fill.classList.contains("js")) fill.style.width = "70%";
        });
    }
});

// PROJECT CARDS ANIMATION
const projects = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

projects.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.6s ease";
    projectObserver.observe(card);
});


document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Message envoyé !");
});
