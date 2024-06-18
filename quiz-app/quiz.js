import { showResults } from './navigation.js';
import { questions } from './questions.js';

let currentQuestion = 0;
let correctAnswers = 0;

function showQuestion() {
  const questionNumberElement = document.getElementById('question-number');
  const questionTextElement = document.getElementById('question-text');
  const optionsContainerElement = document.querySelector('.options-container');
  const nextBtn = document.getElementById('next');

  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  questionNumberElement.innerText = `Question ${currentQuestion + 1}/${
    questions.length
  }`;
  questionTextElement.innerText = questions[currentQuestion].question;
  optionsContainerElement.innerHTML = '';

  questions[currentQuestion].options.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('option');
    button.dataset.correct = option.correct;
    button.addEventListener('click', () => selectAnswer(button));
    optionsContainerElement.appendChild(button);
  });

  document.getElementById('prev').disabled = currentQuestion === 0;
  nextBtn.disabled = true;
}

function selectAnswer(selectedButton) {
  const options = document.querySelectorAll('.option');
  options.forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
  });

  if (selectedButton.dataset.correct === 'true') {
    correctAnswers++;
  }

  document.getElementById('next').disabled = false;
}

function getCurrentQuestion() {
  return currentQuestion;
}

function setCurrentQuestion(value) {
  currentQuestion = value;
}

export {
  showQuestion,
  selectAnswer,
  getCurrentQuestion,
  setCurrentQuestion,
  correctAnswers,
};
