const NUMERO = "22879584573";

document.querySelectorAll("article").forEach((article) => {
  const nom = article.querySelector("h3").textContent.trim();
  const prix = article.querySelector("p").textContent.replace(/^\s*Prix\s*:\s*/i, "").trim();

  const message = `Bonjour MABIA SHOP, je souhaite commander : ${nom} (${prix}). Est-il disponible ?`;
  const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(message)}`;

  const bouton = article.querySelector("button");
  let lien = bouton.querySelector("a");

  // Crée le lien s'il n'existe pas (cas des 3 premières robes)
  if (!lien) {
    lien = document.createElement("a");
    lien.textContent = bouton.textContent.trim();
    bouton.textContent = "";
    bouton.append(lien);
  }

  lien.href = url;
  lien.target = "_blank";
  lien.rel = "noopener";
});