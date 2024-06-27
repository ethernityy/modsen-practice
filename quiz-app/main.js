import { loadQuestion, showCorrectAnswers } from './quiz.js';
import { handleNextQuestion, restartQuiz, showResults } from './navigation.js';
import { initializeTheme, toggleTheme } from './theme.js';
import { stopTimer } from './timer.js';
import { questions } from './questions.js';

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.querySelector('.options-container');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const themeToggle = document.getElementById('theme-toggle');

const checkButton = document.createElement('button');
checkButton.id = 'check-btn';
checkButton.textContent = 'Check Answers';
checkButton.style.marginRight = '10px';
nextButton.parentNode.insertBefore(checkButton, nextButton);

const state = {
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: questions.length,
};

const elements = {
  questionNumberElement,
  questionTextElement,
  optionsContainerElement,
  nextButton,
  checkButton,
  timerElement,
  stopTimer,
};

nextButton.addEventListener('click', () => {
  handleNextQuestion(state, loadQuestion, showResults, elements);
});

checkButton.addEventListener('click', () => {
  showCorrectAnswers(
    questions[state.currentQuestionIndex],
    optionsContainerElement,
    checkButton,
    nextButton,
    state
  );
});

themeToggle.addEventListener('change', () => toggleTheme(themeToggle));

initializeTheme(themeToggle);
loadQuestion(state, elements);
