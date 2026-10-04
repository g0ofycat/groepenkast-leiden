const quoteForm = document.querySelector("#quote-form");

quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const body = [
        `Naam: ${name}`,
        `E-mailadres: ${email}`,
        "",
        message,
    ].join("\n");
    const mailto = new URL("mailto:info@groepenkastleiden.nl");

    mailto.searchParams.set("subject", `Offerteaanvraag: ${subject}`);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.href;
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
    navLinks.classList.toggle("is-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("click", (event) => {
    if (
        menuToggle?.getAttribute("aria-expanded") === "true" &&
        event.target instanceof Node &&
        !menuToggle.contains(event.target) &&
        !navLinks?.contains(event.target)
    ) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
    }
});