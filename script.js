// 1. Lookbook Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const garmentCards = document.querySelectorAll(".garment-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.dataset.filter;

    garmentCards.forEach((card) => {
      const matches =
        selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.classList.toggle("hidden", !matches);
    });
  });
});

// 2. Private Fitting Modal Logic
const modal = document.getElementById("bookingModal");
const openButtons = document.querySelectorAll(".open-modal-btn");
const closeBtn = document.getElementById("closeModalBtn");
const garmentInput = document.getElementById("selectedGarment");
const fittingForm = document.getElementById("fittingForm");
const feedback = document.getElementById("formFeedback");

openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    garmentInput.value = btn.dataset.garment || "Custom Bespoke Piece";
    feedback.hidden = true;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

fittingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("clientName").value.trim();
  const piece = garmentInput.value;
  const fabric = document.getElementById("fabricChoice").value;
  const date = document.getElementById("fittingDate").value;

  feedback.textContent = `Thank you, ${name}. Your fitting for "${piece}" in ${fabric} is reserved for ${date}. Our atelier concierge will reach out shortly.`;
  feedback.hidden = false;
  fittingForm.reset();
  garmentInput.value = piece;
});