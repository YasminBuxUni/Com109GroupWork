document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const formMessage = document.getElementById("formMessage");

  const maxLength = 200;

  messageInput.addEventListener("input", function () {
    const remaining = maxLength - messageInput.value.length;
    charCount.textContent = remaining + " characters remaining";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    formMessage.textContent = "";
    formMessage.className = "";

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please fill in all required fields.";
      formMessage.classList.add("error-message");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.classList.add("error-message");
      return;
    }

    if (phone !== "" && !/^[0-9+\s()-]+$/.test(phone)) {
      formMessage.textContent = "Please enter a valid phone number.";
      formMessage.classList.add("error-message");
      return;
    }

    if (message.length < 10) {
      formMessage.textContent = "Your message must be at least 10 characters long.";
      formMessage.classList.add("error-message");
      return;
    }

    formMessage.textContent = "Your message has been sent successfully.";
    formMessage.classList.add("success-message");

    form.reset();
    charCount.textContent = maxLength + " characters remaining";
  });
});