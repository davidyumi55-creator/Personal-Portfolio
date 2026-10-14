/* ==========================================================
   Personal Portfolio - script.js
   Features: hamburger menu, smooth scroll, dark/light mode,
             contact form validation
   ========================================================== */

// Wait until the HTML is fully loaded before running any code
document.addEventListener("DOMContentLoaded", function () {

    // ---------- Grab the elements we need ----------
    const hamburger = document.getElementById("hamburger");        // menu button (mobile)
    const navLinks = document.getElementById("nav-links");         // <ul> of links
    const themeToggle = document.getElementById("theme-toggle");   // dark/light button
    const anchorLinks = document.querySelectorAll('a[href^="#"]'); // all in-page links
    const form = document.getElementById("contact-form");          // contact form
    const formStatus = document.getElementById("form-status");     // success message

    /**
     * Opens or closes the mobile navigation menu.
     * Also updates aria-expanded for accessibility.
     */
    function toggleMenu() {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", isOpen);
        hamburger.textContent = isOpen ? "✕" : "☰";
    }

    /**
     * Closes the mobile menu (used after a link is clicked).
     */
    function closeMenu() {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
    }

    /**
     * Smoothly scrolls to the section targeted by an anchor link.
     * @param {Event} event - the click event on the link
     */
    function smoothScroll(event) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        // Only handle links that point to a real section on this page
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            closeMenu(); // close the mobile menu after navigating
        }
    }

    /**
     * Applies the chosen theme ("dark" or "light") to the page
     * and updates the toggle button icon.
     * Dark is the default look, so only light adds a class.
     * @param {string} theme - "dark" or "light"
     */
    function applyTheme(theme) {
        const isLight = theme === "light";
        document.body.classList.toggle("light", isLight);
        themeToggle.textContent = isLight ? "🌙" : "☀️";
    }

    /**
     * Switches between dark and light mode and
     * remembers the choice in localStorage.
     */
    function toggleTheme() {
        const newTheme = document.body.classList.contains("light") ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    /**
     * Shows or clears an error message for one form field.
     * @param {string} fieldId - id of the input ("name", "email", "message")
     * @param {string} message - error text, or "" to clear the error
     */
    function setError(fieldId, message) {
        document.getElementById(fieldId + "-error").textContent = message;
        document.getElementById(fieldId).classList.toggle("invalid", message !== "");
    }

    /**
     * Checks that an email address has a valid format.
     * @param {string} email - the text typed by the user
     * @returns {boolean} true if the format looks like name@domain.com
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Validates the contact form when it is submitted.
     * Every field must be filled in and the email must be valid.
     * @param {Event} event - the submit event
     */
    function validateForm(event) {
        event.preventDefault(); // stop the page from reloading
        formStatus.textContent = "";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        let isValid = true;

        // Name must not be empty
        if (name === "") {
            setError("name", "Please enter your name.");
            isValid = false;
        } else {
            setError("name", "");
        }

        // Email must not be empty and must have a valid format
        if (email === "") {
            setError("email", "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError("email", "Please enter a valid email address.");
            isValid = false;
        } else {
            setError("email", "");
        }

        // Message must not be empty
        if (message === "") {
            setError("message", "Please write a message.");
            isValid = false;
        } else {
            setError("message", "");
        }

        // If everything is valid, show a success message and reset the form
        if (isValid) {
            formStatus.textContent = "Thank you, " + name + "! Your message is ready to send.";
            form.reset();
        }
    }

    // ---------- Attach event listeners ----------
    hamburger.addEventListener("click", toggleMenu);
    themeToggle.addEventListener("click", toggleTheme);
    form.addEventListener("submit", validateForm);
    anchorLinks.forEach(function (link) {
        link.addEventListener("click", smoothScroll);
    });

    // ---------- On page load: restore the saved theme (default: dark) ----------
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
});