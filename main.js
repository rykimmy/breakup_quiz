
// Changes opacity of non-selected answer options dynamically
document.addEventListener('change', function (event) {
  if (event.target.classList.contains('answer-input')) {
    const selectedInput = event.target;
    const questionContainer = selectedInput.closest('.question-container');

    // Reset opacity for all labels
    questionContainer.querySelectorAll('.answer-label').forEach(label => {
      label.style.opacity = '0.5';
    });

    // Set opacity for selected label
    if (selectedInput.checked) {
      selectedInput.parentElement.style.opacity = '1';
    }
  }
});