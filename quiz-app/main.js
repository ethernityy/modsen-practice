import { questions } from './questions';

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;
let timerInterval;
let startTime;

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

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerElement.textContent = `Time: ${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function loadQuestion() {
  if (currentQuestionIndex === 0) startTimer();

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

nextButton.addEventListener('click', handleNextQuestion);
checkButton.addEventListener('click', showCorrectAnswers);

function handleNextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopTimer();
  questionNumberElement.textContent = 'Quiz Completed!';
  questionTextElement.textContent = `You scored ${score} out of ${totalQuestions}`;
  optionsContainerElement.innerHTML = '';
  nextButton.textContent = 'Restart';
  nextButton.removeEventListener('click', handleNextQuestion);
  nextButton.addEventListener('click', restartQuiz);
  nextButton.disabled = false;
  checkButton.style.display = 'none';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = 'Next';
  nextButton.removeEventListener('click', restartQuiz);
  nextButton.addEventListener('click', handleNextQuestion);
  loadQuestion();
}

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

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.quiz-container').classList.toggle('dark-mode');
  document.querySelector('header').classList.toggle('dark-mode');
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.quiz-container').classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
    themeToggle.checked = true;
  }
}

initializeTheme();
loadQuestion();
