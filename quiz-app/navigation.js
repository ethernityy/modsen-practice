import {
  showQuestion,
  getCurrentQuestion,
  setCurrentQuestion,
  correctAnswers,
  resetCorrectAnswers,
} from './quiz.js';
import { questions } from './questions.js';

function nextQuestion() {
  let currentQuestion = getCurrentQuestion();
  if (currentQuestion < questions.length) {
    setCurrentQuestion(currentQuestion + 1);
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  let currentQuestion = getCurrentQuestion();
  if (currentQuestion > 0) {
    setCurrentQuestion(currentQuestion - 1);
    showQuestion();
  }
}

function showResults() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
  <div class='question-container'>
    <h2 class='question-container'>Quiz completed<h2>
    <p class='question'> You got ${correctAnswers} out of ${questions.length} points<p>
    <button class='nav-btn' onclick='restartQuiz()'>Restart</button>
  </div>
  `;
}

function restartQuiz() {
  setCurrentQuestion(0);
  resetCorrectAnswers();

  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
    <div id="question-number"></div>
    <div id="question-text"></div>
    <div class="options-container"></div>
    <button id="prev" onclick="prevQuestion()">Previous</button>
    <button id="next" onclick="nextQuestion()">Next</button>
  `;

  showQuestion();
}
window.restartQuiz = restartQuiz;

export { nextQuestion, prevQuestion, showResults, restartQuiz };
