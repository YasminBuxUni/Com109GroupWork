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

  generateTimeSlots(); //Limitation: times are hardcoded into the function
//probably wont matter cause they will not be changing their hours frequently
  disableBookedTimes(["09:30", "11:00", "14:15"]); //Limitation: these apply every day

  //local storage
  const nameInput = document.getElementById("name");
  const doctorSelect = document.getElementById("doctor");

  //load saved values
  nameInput.value = localStorage.getItem("name") || ""; // stuff to the right of
  //|| are done if there is no "name"
  //in this case it just sets it blank
  doctorSelect.value = localStorage.getItem("doctor") || "";

  //save when user types and selects
  nameInput.addEventListener("input", function () {
    localStorage.setItem("name", nameInput.value);
  });

  doctorSelect.addEventListener("change", function () {
    localStorage.setItem("doctor", doctorSelect.value);
  });

  //phone input
  const phoneInput = document.querySelector("#phone");

  const fieldNumber = window.intlTelInput(phoneInput, {
    initialCountry: "gb",
    separateDialCode: true,
    preferredCountries: ["gb", "ie"]
  });

  const notes = document.getElementById("notes");
  const charCount = document.getElementById("charCount");

  const maxLength = 200;

  notes.addEventListener("input", function () {
    const remaining = maxLength - notes.value.length;

    charCount.textContent = remaining + " characters remaining";
  });


  //validation
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault(); //stops default browser decisions so we can do all of this

    if (!fieldNumber.isValidNumber()) {
      alert("Please enter a valid phone number");
      return;
    }
    alert("Booked!");
    window.location.href = "index.html";
  });

};