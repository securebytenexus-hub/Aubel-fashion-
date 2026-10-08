// ----- Thème clair / sombre (exécuté tout de suite pour éviter le flash) -----
(function () {
  let choix = null;
  try { choix = localStorage.getItem("theme"); } catch (e) {}
  const systeme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = choix || systeme;
})();

document.addEventListener("DOMContentLoaded", () => {
  const NUMERO = "22879584573";

  // ----- Boutons « commander » : message WhatsApp pré-rempli -----
  document.querySelectorAll("article").forEach((article) => {
    const titre = article.querySelector("h4");
    const prixEl = article.querySelector(".prix");
    const lien = article.querySelector(".btn-commander");
    if (!titre || !prixEl || !lien) return;
    const nom = titre.textContent.trim();
    const prix = prixEl.textContent.replace(/^\s*Prix\s*:\s*/i, "").trim();
    const message = `Bonjour MABIA SHOP, je souhaite commander : ${nom} (${prix}). Est-il disponible ?`;
    lien.href = `https://wa.me/${NUMERO}?text=${encodeURIComponent(message)}`;
    lien.target = "_blank";
    lien.rel = "noopener";
  });

  // ----- Filtres de produits -----
  const filtres = document.querySelectorAll(".action button[data-filtre]");
  const categories = document.querySelectorAll(".categorie");
  filtres.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const choix = bouton.dataset.filtre;
      filtres.forEach((b) => b.setAttribute("aria-pressed", String(b === bouton)));
      categories.forEach((cat) => { cat.hidden = choix !== "tout" && cat.id !== choix; });
    });
  });

  // ----- Bouton thème -----
  const racine = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  function majToggle() {
    const sombre = racine.dataset.theme === "dark";
    toggle.setAttribute("aria-label", sombre ? "Passer en mode clair" : "Passer en mode sombre");
  }
  toggle.addEventListener("click", () => {
    const suivant = racine.dataset.theme === "dark" ? "light" : "dark";
    racine.dataset.theme = suivant;
    try { localStorage.setItem("theme", suivant); } catch (e) {}
    majToggle();
  });
  majToggle();

  // ----- Menu burger -----
  const burger = document.querySelector(".burger");
  const menu = document.getElementById("menu");
  function fermerMenu() {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }
  burger.addEventListener("click", () => {
    const ouvert = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", ouvert);
    burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fermerMenu));
  document.addEventListener("keydown", (e) => e.key === "Escape" && fermerMenu());
  window.matchMedia("(min-width: 721px)").addEventListener("change", fermerMenu);
});