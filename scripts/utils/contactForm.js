const cross = document.querySelector(".closeModal");

/**
 * Display the modal and set the name content
 */
const displayModal = () => {
  // Set the name content based on the h2 element
  document.querySelector(".name").textContent =
    document.querySelector("h2").textContent;
  // Get the modal element
  const modal = document.getElementById("contact_modal");
  // Display the modal
  modal.style.display = "block";
  cross.focus();
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".contact_button")
    .addEventListener("click", displayModal);
  console.log("Le DOM est affiché");
});

/**
 * Closes the modal by hiding it.
 */
const closeModal = () => {
  const modal = document.getElementById("contact_modal"); // Get the modal element
  modal.style.display = "none"; // Hide the modal
};

// Add keyup event listener to close the modal when Enter key is pressed for accessibilty
cross.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    closeModal();
  }
});

// Ajoutez cet écouteur d'événement à l'endroit où vous initialiser la modal
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

/**
 * Handles the form submission event.
 * @param {Event} event - The form submission event.
 */
function handleSubmit(event) {
  console.log(event);
  event.preventDefault(); // Prevent page reload on submit
  const isValid = form.checkValidity(); // Check if the form is valid
  if (isValid) {
    // Log the values entered in the form
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      console.log(input.value);
    });
    const textArea = form.querySelector("textarea");
    console.log(textArea.value);
    closeModal(); // Close the modal
    // Show an alert message
    form.reset(); // Reset the form if valid
  }
}

// function to keep the focus in the modal

const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector("#contact_modal"); // select the modal by it's id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener("keydown", function (e) {
  let isTabPressed = e.key === "Tab" || e.key == 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();
