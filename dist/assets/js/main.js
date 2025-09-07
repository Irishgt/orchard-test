document.addEventListener("DOMContentLoaded", () => {

// track clicks on each card
const cardClicks = new Map();

document.addEventListener("click", (e) => {
  const cardLink = e.target.closest(".cards__link"); // updated to match your markup
  if (!cardLink) return;

  e.preventDefault(); // prevent page refresh

// count clicks for the specific card
  cardClicks.set(cardLink, (cardClicks.get(cardLink) || 0) + 1);

  console.log("clicked card:",cardLink, "| no. of clicks:", cardClicks.get(cardLink)
  );
});

  // gallery
  const modal = document.querySelector(".gallery-modal");
  if (!modal) return; // stop if there's no modal on the page

  const modalImg = modal.querySelector(".gallery-modal__image");
  const modalCaption = modal.querySelector(".gallery-modal__caption");
  const closeBtn = modal.querySelector(".gallery-modal__close");
  const overlay = modal.querySelector(".gallery-modal__overlay");
  let lastBtn = null;

  // open the modal
  function openModal(src, alt, btn) {
    if (!src) return; // don't open if there's no image
    modalImg.src = src;
    modalImg.alt = alt || "";
    modalCaption.textContent = alt || "";
    modal.classList.remove("visually-hidden");
    lastBtn = btn;
    closeBtn.focus();
    document.body.style.overflow = "hidden"; // prevent page scroll
  }

  // close the modal
  function closeModal() {
    modal.classList.add("visually-hidden");
    modalImg.src = "";
    modalCaption.textContent = "";
    document.body.style.overflow = ""; // restore scroll
    lastBtn?.focus(); // return focus to the button that opened the modal
    lastBtn = null;
  }

  // attach click events to all gallery buttons
  document.querySelectorAll(".gallery__button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(btn.dataset.src, btn.dataset.alt, btn);
    });
  });

  // close modal when clicking the close button /overlay
  [closeBtn, overlay].forEach((el) => el?.addEventListener("click", closeModal));

  // close with the escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("visually-hidden")) {
      closeModal();
    }
  });

});
