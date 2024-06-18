import {
  showQuestion,
  getCurrentQuestion,
  setCurrentQuestion,
  correctAnswers,
} from './quiz.js';
import { questions } from './questions.js';

function nextQuestion() {
  console.log('Next button clicked');
  let currentQuestion = getCurrentQuestion();
  if (currentQuestion < questions.length) {
    setCurrentQuestion(currentQuestion + 1);
    console.log('Current', currentQuestion);
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
  correctAnswers = 0;
  showQuestion();
}

export { nextQuestion, prevQuestion, showResults, restartQuiz };
