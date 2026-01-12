// Utilitaires
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Année footer
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu mobile
const navToggle = $("#navToggle");
const nav = $("#nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Modal produits (page index)
const modal = $("#modal");
const modalBody = $("#modalBody");
const modalTitle = $("#modalTitle");

function openModal(title, bodyHtml) {
  if (!modal) return;
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHtml;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// Boutons "Détails"
$$("[data-product]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-product");
    openModal(
      name,
      `
      <p><strong>${name}</strong> — détails rapides.</p>
      <ul>
        <li>✅ Produit statique (demo)</li>
        <li>📦 Livraison : 24-48h (exemple)</li>
        <li>💳 Paiement : cash / mobile money (exemple)</li>
      </ul>
      <p>Pour commander, passe par la page contact.</p>
    `
    );
  });
});

// Validation contact (page contact)
const form = $("#contactForm");
if (form) {
  const successMsg = $("#successMsg");

  const showError = (name, msg) => {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg || "";
  };

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const subject = (data.get("subject") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    // reset errors
    ["name", "email", "subject", "message"].forEach((k) => showError(k, ""));
    if (successMsg) successMsg.hidden = true;

    let ok = true;
    if (name.length < 2) {
      showError("name", "Entrez votre nom.");
      ok = false;
    }
    if (!isEmail(email)) {
      showError("email", "Email invalide.");
      ok = false;
    }
    if (subject.length < 3) {
      showError("subject", "Sujet trop court.");
      ok = false;
    }
    if (message.length < 10) {
      showError("message", "Message trop court (min 10 caractères).");
      ok = false;
    }

    if (!ok) return;

    // Simulation d'envoi
    form.reset();
    if (successMsg) successMsg.hidden = false;
  });
}
