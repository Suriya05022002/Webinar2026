/* =========================================================
   MOBILE MENU
========================================================= */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  const icon = menuBtn.querySelector("i");
  if (nav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    const icon = menuBtn.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* =========================================================
   COUNTDOWN TIMER
========================================================= */
const webinarDate = new Date("2026-08-22T16:00:00").getTime();
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = webinarDate - now;

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   FAQ + FOOTER  —  Vanilla JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- FAQ Accordion ---------- */
  var items = document.querySelectorAll('[data-accordion]');

  items.forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all items
      items.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Newsletter form ---------- */
  var form = document.getElementById('newsletterForm');
  var note = document.getElementById('newsletterNote');
  var emailInput = document.getElementById('newsletterEmail');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = emailInput.value.trim();

      if (!email) return;

      note.textContent = 'Thanks! You are subscribed — check your inbox.';
      note.classList.add('is-success');
      emailInput.value = '';
      emailInput.blur();

      setTimeout(function () {
        note.textContent = 'We respect your privacy. Unsubscribe at any time.';
        note.classList.remove('is-success');
      }, 4000);
    });
  }
})();

/* =========================================================
   REGISTRATION FORM WITH DATABASE INTEGRATION
========================================================= */
const registrationForm = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const registerAnother = document.getElementById("registerAnother");
const submitBtn = document.getElementById("submitBtn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const roleInput = document.getElementById("role");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const roleError = document.getElementById("roleError");

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  roleError.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const role = roleInput.value;

  let isValid = true;

  if (name.length < 3) {
    nameError.textContent = "Please enter your full name.";
    isValid = false;
  }

  if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (!isValidPhone(phone)) {
    phoneError.textContent = "Please enter a valid 10-digit phone number.";
    isValid = false;
  }

  if (!role) {
    roleError.textContent = "Please select an option.";
    isValid = false;
  }

  if (!isValid) return;

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";

  try {
    const response = await fetch("register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, role }),
    });

    const text = await response.text();
    let result;
    
    try {
      result = JSON.parse(text);
    } catch (e) {
      throw new Error("Server returned an invalid JSON response.");
    }

    if (result.status === "success") {
      registrationForm.style.display = "none";
      successMessage.style.display = "block";
      showToast("Registration successful!");
    } else {
      showToast(result.message || "Registration failed. Try again.");
    }
  } catch (error) {
    showToast(error.message || "Server error. Please try again later.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  }
});

registerAnother.addEventListener("click", () => {
  registrationForm.reset();
  clearErrors();
  successMessage.style.display = "none";
  registrationForm.style.display = "block";
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

/* =========================================================
   TOAST & SCROLL
========================================================= */
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
let toastTimer;

function showToast(message) {
  toastText.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 8px 30px rgba(15, 23, 42, 0.06)";
  } else {
    header.style.boxShadow = "none";
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerHeight = header.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});