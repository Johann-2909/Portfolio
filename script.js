/* ===========================
   Dark Mode
   =========================== */
const darkmodeButton = document.getElementById("darkmode-toggle");

if (darkmodeButton) {
    darkmodeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("darkmode", isDark);
        darkmodeButton.textContent = isDark ? "☀️" : "🌙";
    });
}

if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("dark");
    if (darkmodeButton) darkmodeButton.textContent = "☀️";
}

/* ===========================
   i18n — DE / EN Toggle
   =========================== */
const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "home.eyebrow": "Hi, my name is",
        "home.headline": "Johann Balzereit.<br>I'm a Web Developer.",
        "home.sub": "I am a self-taught web developer from Schleswig-Holstein, Germany, focused on building clean, functional, and user-friendly web applications. I'm currently expanding my frontend skills and enjoy solving problems, improving user experiences, and learning something new every day.",
        "home.cta": "View Projects",
        "about.title": "About",
        "about.intro": "I am a 25-year-old web developer from Germany. I found a passion in working with computers. In 2024 I started coding in JavaScript — since then it has become a hobby that I take seriously every day.",
        "cards.view": "View Code",
        "cards.visit": "Visit now",
        "about.available": "I'm currently looking for my first job in web development. Feel free to reach out!",
        "skills.title": "Skills",
        "skills.frontend": "Frontend",
        "skills.tools": "Tools & Others",
        "projects.title": "Projects",
        "projects.sub": "A selection of things I have built. More coming soon.",
        "projects.p1.title": "Project Title",
        "projects.p1.desc": "Short description of what this project does and what you learned.",
        "projects.live": "Live Demo",
        "projects.code": "Code",
        "contact.title": "Contact",
        "contact.sub": "Have a project in mind or just want to say hi? Send me a message.",
        "contact.name": "Name",
        "contact.email": "E-Mail",
        "contact.message": "Message",
        "contact.send": "Send Message",
    },
    de: {
        "nav.home": "Home",
        "nav.about": "Über mich",
        "nav.skills": "Fähigkeiten",
        "nav.projects": "Projekte",
        "nav.contact": "Kontakt",
        "home.eyebrow": "Hallo, ich bin",
        "home.headline": "Johann Balzereit.<br>Ich bin Web-Entwickler.",
        "home.sub": "Ich bin ein autodidaktischer Web-Entwickler aus Schleswig-Holstein. Ich baue saubere, funktionale und benutzerfreundliche Webanwendungen. Ich erweitere täglich meine Frontend-Kenntnisse und löse gerne Probleme.",
        "home.cta": "Projekte ansehen",
        "about.title": "Über mich",
        "about.intro": "Ich bin ein 25-jähriger Webentwickler aus Deutschland. Ich habe eine Leidenschaft für die Arbeit mit Computern entdeckt. 2024 begann ich mit JavaScript zu programmieren — seitdem ist es ein ernsthaftes Hobby für mich.",
        "cards.view": "Code ansehen",
        "cards.visit": "Jetzt besuchen",
        "about.available": "Ich bin derzeit auf der Suche nach meinem ersten Job in der Webentwicklung. Meld dich gerne bei mir!",
        "skills.title": "Fähigkeiten",
        "skills.frontend": "Frontend",
        "skills.tools": "Tools & Sonstiges",
        "projects.title": "Projekte",
        "projects.sub": "Eine Auswahl meiner Projekte. Mehr folgt bald.",
        "projects.p1.title": "Projekttitel",
        "projects.p1.desc": "Kurze Beschreibung des Projekts und was du dabei gelernt hast.",
        "projects.live": "Live-Demo",
        "projects.code": "Code",
        "contact.title": "Kontakt",
        "contact.sub": "Hast du ein Projekt im Kopf oder möchtest einfach Hallo sagen? Schreib mir.",
        "contact.name": "Name",
        "contact.email": "E-Mail",
        "contact.message": "Nachricht",
        "contact.send": "Nachricht senden",
    },
};

let currentLang = localStorage.getItem("lang") || "en";

function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const val = translations[lang][key];
        if (val !== undefined) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            } else {
                el.innerHTML = val;
            }
        }
    });
    document.documentElement.lang = lang;
}

const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "de" : "en";
        localStorage.setItem("lang", currentLang);
        applyTranslations(currentLang);
        langToggle.textContent = currentLang === "en" ? "DE / EN" : "EN / DE";
    });
}

applyTranslations(currentLang);

/* ===========================
   Footer year
   =========================== */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===========================
   Contact Form
   =========================== */
const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const submitBtn = document.getElementById("submit-btn");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;

        form.querySelectorAll("[required]").forEach((field) => {
            field.classList.remove("error");
            if (!field.value.trim()) {
                field.classList.add("error");
                valid = false;
            }
        });

        const emailField = document.getElementById("cf-email");
        if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            emailField.classList.add("error");
            valid = false;
        }

        if (!valid) {
            feedback.textContent =
                currentLang === "de"
                    ? "Bitte fülle alle Felder korrekt aus."
                    : "Please fill in all fields correctly.";
            feedback.className = "form-feedback error-msg";
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent =
            currentLang === "de" ? "Wird gesendet…" : "Sending…";

        setTimeout(() => {
            feedback.textContent =
                currentLang === "de"
                    ? "✅ Nachricht gesendet! Ich melde mich bald."
                    : "✅ Message sent! I'll get back to you soon.";
            feedback.className = "form-feedback success";
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent =
                currentLang === "de" ? "Nachricht senden" : "Send Message";
        }, 1200);
    });
}

/* ===========================
   Smooth scroll for nav links
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* ===========================
   Scroll-reveal simple
   =========================== */
const revealEls = document.querySelectorAll(
    ".project-card, .tech-card, .skill-group, .skill-bar-fill"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealEls.forEach((el) => {
        if (!el.classList.contains("skill-bar-fill")) {
            el.style.opacity = "0";
            el.style.transform = "translateY(24px)";
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        }
        observer.observe(el);
    });
}