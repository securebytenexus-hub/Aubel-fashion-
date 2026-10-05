document.addEventListener("DOMContentLoaded", () => {
  const NUMERO = "22879584573";

  document.querySelectorAll("article").forEach((article) => {
    const nom = article.querySelector("h3").textContent.trim();
    const prix = article.querySelector("p").textContent.replace(/^\s*Prix\s*:\s*/i, "").trim();

    const message = `Bonjour MABIA SHOP, je souhaite commander : ${nom} (${prix}). Est-il disponible ?`;
    const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(message)}`;

    const lien = article.querySelector("button a");
    if (lien) {
      lien.href = url;
      lien.target = "_blank";
      lien.rel = "noopener";
    }
  });
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