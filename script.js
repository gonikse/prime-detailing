"use strict";

/**
 * KONFIGURACJA PRZED OPUBLIKOWANIEM:
 * 1. Ustaw rzeczywisty adres EMAIL (otworzy program pocztowy klienta), LUB
 * 2. Ustaw FORM_ENDPOINT z https://formspree.io/ (wyśle formularz bezpośrednio).
 * Jeśli oba pola są puste, formularz pokazuje gotową treść do skopiowania.
 * Nie przechowuj tutaj kluczy prywatnych/API secrets.
 */
const CONTACT_EMAIL = ""; // np. "kontakt@twojafirma.pl"
const FORM_ENDPOINT = ""; // np. "https://formspree.io/f/XXXXXXXX"

// Navbar, scroll indicator, and anchors
const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
const progress = document.getElementById("scroll-progress");
const year = document.getElementById("year");

document.documentElement.classList.add("js");
year.textContent = String(new Date().getFullYear());

function closeMenu({ restoreFocus = false } = {}) {
  const wasOpen = nav.classList.contains("is-open");
  menuButton.classList.remove("is-open");
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Otwórz menu");
  if (wasOpen && restoreFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const opening = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", opening);
  menuButton.classList.toggle("is-open", opening);
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", opening ? "Zamknij menu" : "Otwórz menu");
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
document.addEventListener("click", event => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu({ restoreFocus: true });
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 950) closeMenu();
});

function updateScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 25);
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0}%`;
}
window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

// Active navigation links based on the viewed section
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (!navLinks.some(link => link.getAttribute("href") === `#${id}`)) return;
      navLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
  sections.forEach(section => navObserver.observe(section));
}

// Subtle reveal animations: everything stays visible if IntersectionObserver isn't supported
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -15px 0px" });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}

// A before/after demo using two visual treatments of the same image
const comparison = document.getElementById("comparison-widget");
const comparisonRange = document.getElementById("compare-range");
function updateComparison(value) {
  const amount = Number(value);
  comparison.style.setProperty("--split", `${amount}%`);
  comparisonRange.setAttribute("aria-valuetext", `${amount} procent zdjęcia po`);
}
comparisonRange.addEventListener("input", event => updateComparison(event.target.value));
updateComparison(comparisonRange.value);

// Package selection moves the chosen package to the contact form
const packageSelect = document.getElementById("package-select");
document.querySelectorAll("[data-package]").forEach(button => {
  button.addEventListener("click", () => {
    packageSelect.value = button.dataset.package;
    document.getElementById("contact").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => packageSelect.focus({ preventScroll: true }), 450);
  });
});

// Accessible photo lightbox, including Escape and arrow-key navigation
const galleryButtons = [...document.querySelectorAll("[data-gallery-index]")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
let galleryIndex = 0;
let lastGalleryFocus = null;
function updateLightbox() {
  const clickedImage = galleryButtons[galleryIndex].querySelector("img");
  lightboxImage.src = clickedImage.getAttribute("src");
  lightboxImage.alt = clickedImage.alt;
  lightboxCaption.textContent = `${galleryIndex + 1} / ${galleryButtons.length} — ${clickedImage.alt}`;
}
function openLightbox(index) {
  galleryIndex = index;
  lastGalleryFocus = document.activeElement;
  updateLightbox();
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  lightboxClose.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  if (lastGalleryFocus) lastGalleryFocus.focus();
}
function moveLightbox(direction) {
  galleryIndex = (galleryIndex + direction + galleryButtons.length) % galleryButtons.length;
  updateLightbox();
}
galleryButtons.forEach((button, index) => button.addEventListener("click", () => openLightbox(index)));
lightboxClose.addEventListener("click", closeLightbox);
document.getElementById("lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.getElementById("lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
  if (event.key === "Tab") {
    const controls = [...lightbox.querySelectorAll("button")];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

// Contact form: Formspree, mailto, or a transparent demo fallback
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const formFallback = document.getElementById("form-fallback");
const formGenerated = document.getElementById("form-generated");
const copyMessage = document.getElementById("copy-message");
const submitButton = form.querySelector("button[type=submit]");

function setStatus(message, type = "info") {
  formStatus.textContent = message;
  formStatus.dataset.type = type;
}
function makeMailBody(data) {
  return [
    `Imię i nazwisko: ${data.get("name")}`,
    `E-mail: ${data.get("email")}`,
    `Telefon: ${data.get("phone") || "nie podano"}`,
    `Pakiet: ${data.get("package")}`,
    "",
    "Wiadomość:",
    data.get("message")
  ].join("\n");
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = makeMailBody(data);
  formFallback.hidden = true;
  const subject = `Zapytanie detailing — ${data.get("package")}`;

  if (FORM_ENDPOINT.trim()) {
    submitButton.disabled = true;
    setStatus("Wysyłanie zapytania…", "info");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus("Zapytanie zostało przekazane do usługi formularzy. Dziękujemy!", "success");
    } catch (error) {
      setStatus("Nie udało się wysłać zapytania. Spróbuj ponownie lub skontaktuj się bezpośrednio.", "error");
      console.error("Form error:", error);
    } finally {
      submitButton.disabled = false;
    }
    return;
  }

  if (CONTACT_EMAIL.trim()) {
    const mailto = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("Otwieranie programu pocztowego. Sprawdź treść i wyślij wiadomość w swoim programie e-mail.", "info");
    return;
  }

  // In a fresh portfolio/demo site there is no recipient address: do not fake delivery.
  formGenerated.value = `Temat: ${subject}\n\n${body}`;
  formFallback.hidden = false;
  setStatus("Tryb demo: brak skonfigurowanego odbiorcy. Poniżej masz treść do skopiowania; ustaw adres e-mail lub Formspree w script.js.", "info");
  formFallback.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyMessage.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(formGenerated.value);
    setStatus("Skopiowano treść zapytania do schowka.", "success");
  } catch {
    formGenerated.focus();
    formGenerated.select();
    setStatus("Zaznaczono treść. Naciśnij Ctrl+C, aby ją skopiować.", "info");
  }
});