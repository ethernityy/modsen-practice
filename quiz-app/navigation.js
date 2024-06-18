import { showQuestion, currentQuestion, correctAnswers } from './quiz.js';
import { questions } from './questions.js';

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
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
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}

export { nextQuestion, prevQuestion, showResults, restartQuiz };
