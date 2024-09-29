// document.addEventListener('DOMContentLoaded', function () {
//     const availableSlotRadios = document.querySelectorAll('input[name="available-slot"]');
//     const weekdayTimeSlot = document.querySelector('.weekday-time-slot');
//     const weekendTimeSlot = document.querySelector('.weekend-time-slot');

//     const ageRadios = document.querySelectorAll('input[name="age"]');
//     const healthRadios = document.querySelectorAll('input[name="healthy"]');

//     const subsequentQuestions = document.querySelectorAll('.subsequent-question');
//     subsequentQuestions.forEach(question => question.style.display = 'none');

//     weekdayTimeSlot.style.display = 'none';
//     weekendTimeSlot.style.display = 'none';

//     availableSlotRadios.forEach(radio => {
//         radio.addEventListener('change', function () {
//             if (this.value === 'monday-thursday') {
//                 weekdayTimeSlot.style.display = 'block';
//                 weekendTimeSlot.style.display = 'none';
//             } else if (this.value === 'saturday') {
//                 weekdayTimeSlot.style.display = 'none';
//                 weekendTimeSlot.style.display = 'block';
//             }
//             resetTimeSlots(); // Reset the time slots when available slot changes
//             checkConditions();
//         });
//     });

//     ageRadios.forEach(radio => {
//         radio.addEventListener('change', checkConditions);
//     });

//     healthRadios.forEach(radio => {
//         radio.addEventListener('change', checkConditions);
//     });

//     function checkConditions() {
//         const isAgeAbove18 = document.getElementById('age-yes').checked;
//         const isHealthy = document.getElementById('healthy-yes').checked;

//         subsequentQuestions.forEach(question => {
//             question.style.display = (isAgeAbove18 && isHealthy) ? 'block' : 'none';
//             question.setAttribute('aria-hidden', !isAgeAbove18 || !isHealthy);  // For accessibility
//         });
//     }

//     function resetTimeSlots() {
//         const timeSlotRadios = document.querySelectorAll('input[name="time-slot"]');
//         timeSlotRadios.forEach(radio => {
//             radio.checked = false; // Uncheck all time slot options
//             const card = radio.closest('.radio-card');
//             if (card) card.classList.remove('selected'); // Remove selected class from UI
//         });
//     }
// });

// // Selection handling for radio buttons
// function handleSelection(groupClass) {
//     const cards = document.querySelectorAll(`.${groupClass} .radio-card`);
//     cards.forEach(card => {
//         card.addEventListener('click', function () {
//             cards.forEach(c => c.classList.remove('selected'));
//             this.classList.add('selected');
//         });
//     });
// }

// // Apply selection handling to both question groups
// handleSelection('age-group');
// handleSelection('healthy-group');
// handleSelection('available-slot-group');
// handleSelection('weekday-time-slot');
// handleSelection('weekend-time-slot');

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     const countryCode = document.querySelector('select[name="countryCode"]').value;
//     let phoneNo = document.querySelector('input[name="phoneNo"]').value;

//     // If the phone number starts with '0', remove the leading '0'
//     if (phoneNo.startsWith('0')) {
//         phoneNo = phoneNo.substring(1); // Remove the leading '0'
//     }

//     // Combine country code and sanitized phone number
//     const fullPhoneNo = countryCode + phoneNo;
    
//     // Display loading message
//     Swal.fire({
//         title: 'Submitting...',
//         html: '<div><img src="https://superstorefinder.net/support/wp-content/uploads/2018/01/orange_circles.gif" alt="Loading..." style="width: 100px; height: 100px;"/></div><p>Please wait while your form is being submitted.</p>',
//         allowEscapeKey: false,
//         allowOutsideClick: false,
//         showConfirmButton: false, // No confirm button
//         showCancelButton: false, // No cancel button
//         onBeforeOpen: () => {
//             Swal.showLoading();
//         }
//     });

//     fetch('https://script.google.com/macros/s/AKfycby9DFCRNP2bDUMJE9hYsdo-hIRbaFqSPUrM64DhjIL3feqyInSLWKtL8d97wsbKxxeg/exec', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             // timestamp: timestamp,
//             name: document.querySelector('input[name="name"]').value,
//             email: document.querySelector('input[name="email"]').value,
//             phoneNo: fullPhoneNo
//         }),
//         mode: 'no-cors' // Ensure CORS is handled correctly
//     })
//     .then(response => {
//         // Hide loading state and show success alert
//         Swal.close(); // Close the loading popup
//         Swal.fire({
//             icon: 'success',
//             title: 'Form Submitted!',
//             text: 'Your form has been successfully submitted.',
//             confirmButtonText: 'OK'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // Redirect to previous page when "OK" is clicked
//                 window.location.href = '/putrajaya';
//             }
//         });

//         // Optionally reset the form after submission
//         document.getElementById('myForm').reset();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // Hide loading state and show error alert
//         Swal.close(); // Close the loading popup
//         Swal.fire({
//             icon: 'error',
//             title: 'Submission Failed',
//             text: 'An error occurred. Please try again.',
//         });
//     });
// });

