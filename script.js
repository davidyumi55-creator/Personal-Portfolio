
document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");        
    const navLinks = document.getElementById("nav-links");        
    const themeToggle = document.getElementById("theme-toggle"); 
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const form = document.getElementById("contact-form");          
    const formStatus = document.getElementById("form-status");    

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", isOpen);
        hamburger.textContent = isOpen ? "✕" : "☰";
    }

    function closeMenu() {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
    }

  
    function smoothScroll(event) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

      
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            closeMenu(); 
        }
    }

    function applyTheme(theme) {
        const isLight = theme === "light";
        document.body.classList.toggle("light", isLight);
        themeToggle.textContent = isLight ? "🌙" : "☀️";
    }

    function toggleTheme() {
        const newTheme = document.body.classList.contains("light") ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    function setError(fieldId, message) {
        document.getElementById(fieldId + "-error").textContent = message;
        document.getElementById(fieldId).classList.toggle("invalid", message !== "");
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm(event) {
        event.preventDefault(); 
        formStatus.textContent = "";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        let isValid = true;

        if (name === "") {
            setError("name", "Please enter your name.");
            isValid = false;
        } else {
            setError("name", "");
        }

        if (email === "") {
            setError("email", "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError("email", "Please enter a valid email address.");
            isValid = false;
        } else {
            setError("email", "");
        }
       
        if (message === "") {
            setError("message", "Please write a message.");
            isValid = false;
        } else {
            setError("message", "");
        }

        if (isValid) {
            formStatus.textContent = "Thank you, " + name + "! Your message is ready to send.";
            form.reset();
        }
    }
   
    hamburger.addEventListener("click", toggleMenu);
    themeToggle.addEventListener("click", toggleTheme);
    form.addEventListener("submit", validateForm);
    anchorLinks.forEach(function (link) {
        link.addEventListener("click", smoothScroll);
    });
   
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
});
