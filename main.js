const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const dateButtons = document.querySelectorAll(".calendar-cell:not(.muted)");
const slotButtons = document.querySelectorAll(".slot-button:not(.disabled)");
const planButtons = document.querySelectorAll(".plan-button");
const priceCards = document.querySelectorAll(".price-card[data-plan][data-price]");
const selectedSlot = document.getElementById("selected-slot");
const priceTag = document.querySelector(".price-tag");

let activeDate = document.querySelector(".calendar-cell.active")?.textContent || "21";
let activeTime = document.querySelector(".slot-button.active")?.textContent || "12:00";
let activePrice = "$40";
let activePlan = "dj set · 1 hour";

const updateSummary = () => {
  selectedSlot.textContent = `${activePlan} · March ${activeDate} · ${activeTime} · ${activePrice}`;
  if (priceTag) {
    priceTag.textContent = `From ${activePrice}`;
  }
};

dateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dateButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeDate = button.textContent;
    updateSummary();
  });
});

slotButtons.forEach((button) => {
  button.addEventListener("click", () => {
    slotButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeTime = button.textContent;
    updateSummary();
  });
});

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    planButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activePlan = button.dataset.plan || activePlan;
    activePrice = button.dataset.price || activePrice;
    updateSummary();
  });
});

priceCards.forEach((card) => {
  card.addEventListener("click", () => {
    priceCards.forEach((item) => item.classList.remove("featured"));
    card.classList.add("featured");
    activePlan = card.dataset.plan || activePlan;
    activePrice = card.dataset.price || activePrice;

    planButtons.forEach((button) => {
      const isMatch = button.dataset.plan === activePlan;
      button.classList.toggle("active", isMatch);
    });

    updateSummary();
  });
});

updateSummary();
