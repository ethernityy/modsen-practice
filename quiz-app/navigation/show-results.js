import { correctAnswers } from '../quiz.js';
import { questions } from '../questions.js';
import { restartQuiz } from './index.js';

function showResults() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
  <div class='question-container'>
    <h2 class='question-container'>Quiz completed</h2>
    <p class='question'> You got ${correctAnswers} out of ${questions.length} points</p>
    <button class='nav-btn' onclick='restartQuiz()'>Restart</button>
  </div>
  `;
}

export { showResults };
