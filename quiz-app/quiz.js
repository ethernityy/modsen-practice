import { questions } from './questions.js';
import { startTimer, stopTimer, updateTimer } from './timer.js';

export function loadQuestion(state, elements) {
  const {
    questionNumberElement,
    questionTextElement,
    optionsContainerElement,
    nextButton,
    checkButton,
    timerElement,
  } = elements;

  if (state.currentQuestionIndex === 0) {
    startTimer((startTime) => updateQuizTimer(startTime, timerElement));
  }

  const currentQuestion = questions[state.currentQuestionIndex];
  questionNumberElement.textContent = `Question ${
    state.currentQuestionIndex + 1
  }/${state.totalQuestions}`;
  questionTextElement.textContent = currentQuestion.question;
  optionsContainerElement.innerHTML = '';

  if (currentQuestion.isMultiple) {
    const informationParagraph = document.createElement('p');
    informationParagraph.textContent =
      'This question has multiple correct answers';
    informationParagraph.classList.add('info-paragraph');
    informationParagraph.style.color = 'blue';
    optionsContainerElement.appendChild(informationParagraph);

    checkButton.style.display = 'inline-block';
    checkButton.disabled = true;
  } else {
    checkButton.style.display = 'none';
  }

  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = option.text;
    button.dataset.isCorrect = option.isCorrect;
    button.addEventListener('click', (event) =>
      selectAnswer(
        event,
        currentQuestion,
        optionsContainerElement,
        nextButton,
        checkButton,
        state
      )
    );
    optionsContainerElement.appendChild(button);
  });

  nextButton.disabled = true;
}

function selectAnswer(
  event,
  currentQuestion,
  optionsContainerElement,
  nextButton,
  checkButton,
  state
) {
  const selectedButton = event.target;

  if (currentQuestion.isMultiple) {
    selectedButton.classList.toggle('selected');
    const selectedButtons = document.querySelectorAll('.option.selected');
    nextButton.disabled = selectedButtons.length === 0;
    checkButton.disabled = selectedButtons.length === 0;
    return;
  }

  const isCorrect = selectedButton.dataset.isCorrect === 'true';
  selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');

  if (isCorrect) state.score++;

  Array.from(optionsContainerElement.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.isCorrect === 'true') {
      button.classList.add('correct');
    }
  });

  nextButton.disabled = false;
}

export function showCorrectAnswers(
  currentQuestion,
  optionsContainerElement,
  checkButton,
  nextButton,
  state
) {
  if (currentQuestion.isMultiple) {
    const selectedButtons = document.querySelectorAll('.option.selected');
    selectedButtons.forEach((button) => {
      const isCorrect = button.dataset.isCorrect === 'true';
      button.classList.add(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) state.score++;
    });
    Array.from(optionsContainerElement.children).forEach((button) => {
      button.disabled = true;
      if (button.dataset.isCorrect === 'true') {
        button.classList.add('correct');
      }
    });
  }
  checkButton.disabled = true;
  nextButton.disabled = false;
}

function updateQuizTimer(startTime, timerElement) {
  timerElement.textContent = updateTimer(startTime);
}
