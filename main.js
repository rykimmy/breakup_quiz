// Initialize outcome dictionary with respective scores
const scores = {
  "Ghosting": 0,
  "Distancing": 0,
  "Superficial Communication": 0,
  "Invested Communication": 0,
};

// Function to get random color
function getRandomColor() {
  // Create random RGB values
  const red = Math.floor(Math.random() * 156) + 200;
  const blue = Math.floor(Math.random() * 156) + 50;
  const green = Math.floor(Math.random() * 156) + 50;

  // Create color in string form
  const rgb = `rgb(${red}, ${green}, ${blue})`;

  return rgb;
}

// Function to render the landing page
function renderLandingPage() {
  const landingPage = document.createElement('div');
  landingPage.classList.add('landing-page');
  document.body.appendChild(landingPage);

  const landingTitle = document.createElement('h2');
  landingTitle.classList.add('landing-title');
  landingTitle.textContent = "In a Pickle and Don't Know How to Break Up with Someone? We've Got You Covered!";
  landingPage.appendChild(landingTitle);

  const description = document.createElement('p');
  const quizModel = document.createElement('p');
  const treeModel = document.createElement('p');
  const conclusion = document.createElement('p');
  description.classList.add('description');
  quizModel.classList.add('quiz-model');
  treeModel.classList.add('tree-model');
  conclusion.classList.add('conclusion');

  description.textContent = "As part of our PHIL 9.06 Bread Crumb Project, we interviewed a range of Dartmouth students on the practical and cultural norms surrounding breakups at Dartmouth. Through a combination of qualitative and quantitative data, we abstracted two different models:"

  quizModel.textContent = "1) A multiple-choice quiz that questions the nature and qualities of the relationship and then algorithmically produces the most common or standard breakup method in accordance with Dartmouth norms."

  treeModel.textContent = "2) A decision tree that leverages influential relationship qualities as branching points to outline common scenarios at Dartmouth and ascribe particular breakup outcomes, representative of the Dartmouth standard."

  conclusion.textContent = "We recognize that such a generalized approach cannot suffice to account for all the contextual details and nuances that might further shape one's approach to a breakup. As such, the outcomes provided are not real suggestions and should not be taken as valid justification. Additionally, our models do not reflect our personal views but rather represent general perspectives of Dartmouth students. Thus, they serve as preliminary guides towards understanding what the Dartmouth-specific normative approach to breakups would be under common scenarios or relationship cases."

  landingPage.appendChild(description);
  landingPage.appendChild(quizModel);
  landingPage.appendChild(treeModel);
  landingPage.appendChild(conclusion);

  const quizButton = document.createElement('button');
  quizButton.textContent = "Quiz";
  quizButton.classList.add('quiz-button');
  landingPage.appendChild(quizButton);

  quizButton.addEventListener('click', () => {
    landingPage.remove(); // Remove the landing page
    initQuiz(); // Initialize the quiz
  });

  const treeButton = document.createElement('button');
  treeButton.textContent = "Decision Tree";
  treeButton.classList.add('tree-button');
  landingPage.appendChild(treeButton);

  treeButton.addEventListener('click', () => {
    landingPage.remove(); // Remove the landing page
    window.location.href = 'tree.html';
  });
}

// Function to initialize the quiz
function initQuiz() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Define data variables
      const outcomes = data.outcomes;
      const questions = data.questions;
      let questionIndex = 0;

      // Function to get data from json file and render question/answer content
      function renderQuestion() {
        // Get question to render and its answers
        const question = questions[questionIndex];
        const answers = question.answers;

        // Create question container div element
        const questionContainer = document.createElement('div');
        questionContainer.id = question.id;
        questionContainer.classList.add('question-container');

        // Create question title
        const questionTitle = document.createElement('h2');
        questionTitle.classList.add('question-title');
        questionTitle.textContent = question.question_text;
        questionContainer.appendChild(questionTitle);

        // Create answers container div element
        const answersContainer = document.createElement('div');
        answersContainer.classList.add('answers-container');
        questionContainer.appendChild(answersContainer);

        // Create each answer (label+h3+input)
        answers.forEach(answer => {
          // Create answer label
          const label = document.createElement('label');
          label.classList.add('answer-label');
          label.style.backgroundColor = getRandomColor();

          // Create answer element as img or text depending on json file
          const answerElement = answer.is_image ? document.createElement('img') : document.createElement('h3');
          if (answer.is_image) {
            answerElement.classList.add('answer-img');
            answerElement.src = answer.src;
          } else {
            answerElement.classList.add('answer-text');
            answerElement.textContent = answer.text;
          }

          // Create input
          const input = document.createElement('input');
          input.id = answer.id;
          input.classList.add('answer-input');
          input.type = 'radio';
          input.name = question.name;

          // Add child elements to label container
          label.appendChild(answerElement);
          label.appendChild(input);

          // Add label container as child to answers container
          answersContainer.appendChild(label);
        })

        // Create next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('next-button');
        nextButton.disabled = true;
        questionContainer.appendChild(nextButton);

        // Add event listener to enable next button after answer is selected
        answersContainer.addEventListener('click', enableButton);

        // Add questionContainer div as child element to body
        document.body.appendChild(questionContainer);
      }

      renderQuestion();

      // Function to enable next button
      function enableButton() {
        const submitButton = document.querySelector('.next-button');
        submitButton.disabled = false;
      }

      // Function to render outcome page
      function renderOutcome(outcome) {
        // Create outcome container
        const outcomeContainer = document.createElement('div');
        outcomeContainer.classList.add('outcome-container');
        outcomeContainer.style.backgroundColor = outcomes[outcome].background_color;

        // Create title element
        const outcomeTitle = document.createElement('h2');
        outcomeTitle.classList.add('outcome-title');
        outcomeTitle.textContent = "Based on your particular circumstances, the standard approach to end this relationship is...";
        outcomeContainer.appendChild(outcomeTitle);

        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('outcome-content-container');
        outcomeContainer.appendChild(contentContainer);

        // Create outcome content title (outcome result)
        const contentTitle = document.createElement('h3');
        contentTitle.classList.add('outcome-content-title');
        contentTitle.textContent = outcomes[outcome].name;

        // Create outcome description
        const contentDescription = document.createElement('p');
        contentDescription.classList.add('outcome-content-description');
        contentDescription.textContent = outcomes[outcome].description;

        // Add all the content elements as children to container
        contentContainer.appendChild(contentTitle);
        contentContainer.appendChild(contentDescription);
        // contentContainer.appendChild(outcomeImage);

        // Create play again button
        const playAgain = document.createElement('button');
        playAgain.classList.add('outcome-button');
        playAgain.textContent = "Back";
        playAgain.style.backgroundColor = outcomes[outcome].button_color;
        outcomeContainer.appendChild(playAgain);

        document.body.appendChild(outcomeContainer);

        // Add event listener for play again button
        playAgain.addEventListener('click', () => {
          location.reload();
        });
      }

      // Event listener to handle next button click
      document.addEventListener('click', function (event) {
        if (event.target.classList.contains('next-button')) {
          // Increment question index counter
          questionIndex++;

          // Update outcome scores by getting the selected answer element
          const selectedAnswerId = document.querySelector('.answer-input:checked').id;
          const selectedQuestion = questions[questionIndex - 1];
          const selectedAnswer = selectedQuestion.answers.find(answer => answer.id === selectedAnswerId);

          // Iterates through keys (outcomes) for the selected answer and increments the global score dict
          Object.keys(selectedAnswer.outcomes).forEach(outcome => {
            scores[outcome] += selectedAnswer.outcomes[outcome];
          });

          // Remove previous question container to replace with new content to render
          const previousQuestionContainer = document.querySelector('.question-container');
          previousQuestionContainer.remove();

          // Render new question or outcome if all questions finished
          if (questionIndex === questions.length) {
            // Use reduce to iterate over score values for each outcome and find the highest score
            const highestOutcome = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            renderOutcome(highestOutcome);
          } else {
            renderQuestion();
          }
        }
      });
    })
    .catch(error => console.log('Error fetching data:', error));
}

// Call to render the landing page on initial load
renderLandingPage();

// Changes opacity of non-selected answer options dynamically
document.addEventListener('change', function (event) {
  if (event.target.classList.contains('answer-input')) {
    // Grab selected element and its container
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