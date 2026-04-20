window.onload = function () { ///waits for the html file to fully load

  const timeSelect = document.getElementById("time"); //list of times

  function generateTimeSlots(startHour = 9, endHour = 17) {
    timeSelect.innerHTML = '<option value="">-- Select Time --</option>';
    //sets the option value to nothing to remove old times

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes of [0, 15, 30, 45]) {

        let h = hour.toString().padStart(2, '0');
        let m = minutes.toString().padStart(2, '0');
        //padStart adds a 0 to the start of the number if its less than 2 digits
        //makes times 09:00 instead of 9:0

        let time = `${h}:${m}`;

        let option = document.createElement("option"); //empty option
        option.value = time; //actual value
        option.textContent = time; //what the user sees

        timeSelect.appendChild(option); //adds times to the list
      }
    }
  }

  function disableBookedTimes(bookedTimes = []) {
    const options = timeSelect.options;

    for (let i = 0; i < options.length; i++) {
      if (bookedTimes.includes(options[i].value)) {
        options[i].disabled = true;
        options[i].textContent += " (Booked)";
      }
    }
  }

  generateTimeSlots();
  disableBookedTimes(["09:30", "11:00", "14:15"]);

  // ----------------------------
  // PHONE INPUT (intl-tel-input)
  // ----------------------------

  const phoneInput = document.querySelector("#phone");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "gb",
    separateDialCode: true,
    preferredCountries: ["gb", "ie"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
  });

  const phoneError = document.getElementById("phoneError");

  // Form submit
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault(); //stops default browser decisions so we can do all of this

    // validate phone number using intl-tel-input
    if (!iti.isValidNumber()) {
      phoneError.textContent = "Please enter a valid phone number";
      phoneInput.style.border = "1px solid red";
      return;
    }

    // clear error if valid
    phoneError.textContent = "";
    phoneInput.style.border = "";

    alert("Booked!");

    window.location.href = "index.html";
  });

};