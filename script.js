document.addEventListener('DOMContentLoaded', function () {
    // Get the form and input fields
    var form = document.querySelector('.contact-form');
    var nameInput = form.querySelector('input[name="name"]');
    var emailInput = form.querySelector('input[name="email"]');
    var messageInput = form.querySelector('textarea[name="message"]');
    var successMessage = form.querySelector('.success-message');


    // Create and insert error elements below each input
    var nameError = createErrorElement(nameInput);
    var emailError = createErrorElement(emailInput);
    var messageError = createErrorElement(messageInput);

    // Add real-time (live) validation listeners
    nameInput.addEventListener('input', function () {
      validateName(nameInput, nameError);
    });

    emailInput.addEventListener('input', function () {
      validateEmail(emailInput, emailError);
    });

    messageInput.addEventListener('input', function () {
      validateMessage(messageInput, messageError);
    });

    // Form submit handler
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Stop form from submitting

      // Run validations
      var isNameValid = validateName(nameInput, nameError);
      var isEmailValid = validateEmail(emailInput, emailError);
      var isMessageValid = validateMessage(messageInput, messageError);
      

      // If all valid, show success and reset form
      if (isNameValid && isEmailValid && isMessageValid) {
  form.reset();
  clearError(nameError);
  clearError(emailError);
  clearError(messageError);

  successMessage.textContent = 'Message sent successfully!';
  successMessage.style.display = 'block';

  // Optional: auto-hide the message after 4 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 4000);
}

    });

    // Name validation
    function validateName(input, errorElement) {
      var value = input.value.trim();
      if (value.length < 2) {
        showError(errorElement, 'Name must be at least 2 characters.');
        return false;
      }
      clearError(errorElement);
      return true;
    }

    // Email validation
    function validateEmail(input, errorElement) {
      var value = input.value.trim();
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value)) {
        showError(errorElement, 'Enter a valid email address.');
        return false;
      }
      clearError(errorElement);
      return true;
    }

    // Message validation
    function validateMessage(input, errorElement) {
      var value = input.value.trim();
      if (value.length < 10) {
        showError(errorElement, 'Message must be at least 10 characters.');
        return false;
      }
      clearError(errorElement);
      return true;
    }

    // Create error message element below input
    function createErrorElement(input) {
      var errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.display = 'none';
      errorDiv.style.color = '#AF3E3E';
      errorDiv.style.fontSize = '13px';
      errorDiv.style.marginTop = '4px';
      input.parentNode.insertBefore(errorDiv, input.nextSibling);
      return errorDiv;
    }

    // Show an error
    function showError(element, message) {
      element.textContent = message;
      element.style.display = 'block';
    }

    // Hide the error
    function clearError(element) {
      element.textContent = '';
      element.style.display = 'none';
    }
  });


