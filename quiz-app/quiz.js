import { questions } from './questions.js';
import { startTimer, stopTimer } from './timer.js';
import { showResults, restartQuiz } from './results.js';

export let currentQuestionIndex = 0;
export let score = 0;
const totalQuestions = questions.length;

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.querySelector('.options-container');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');

const checkButton = document.createElement('button');
checkButton.id = 'check-btn';
checkButton.textContent = 'Check Answers';
checkButton.style.marginRight = '10px';
nextButton.parentNode.insertBefore(checkButton, nextButton);

export function loadQuestion() {
  if (currentQuestionIndex === 0) startTimer(timerElement);

  const currentQuestion = questions[currentQuestionIndex];
  questionNumberElement.textContent = `Question ${
    currentQuestionIndex + 1
  }/${totalQuestions}`;
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
    button.addEventListener('click', selectAnswer);
    optionsContainerElement.appendChild(button);
  });

  nextButton.disabled = true;
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.isMultiple) {
    selectedButton.classList.toggle('selected');
    const selectedButtons = document.querySelectorAll('.option.selected');
    nextButton.disabled = selectedButtons.length === 0;
    checkButton.disabled = selectedButtons.length === 0;
    return;
  }

  const isCorrect = selectedButton.dataset.isCorrect === 'true';
  selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');

  if (isCorrect) score++;

  Array.from(optionsContainerElement.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.isCorrect === 'true') {
      button.classList.add('correct');
    }
  });

  nextButton.disabled = false;
}

export function handleNextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults(score, totalQuestions, stopTimer, restartQuiz);
  }
}

nextButton.addEventListener('click', handleNextQuestion);
checkButton.addEventListener('click', showCorrectAnswers);

function showCorrectAnswers() {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.isMultiple) {
    const selectedButtons = document.querySelectorAll('.option.selected');
    selectedButtons.forEach((button) => {
      const isCorrect = button.dataset.isCorrect === 'true';
      button.classList.add(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) score++;
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

loadQuestion();
