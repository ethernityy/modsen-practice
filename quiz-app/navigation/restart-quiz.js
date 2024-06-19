import {
  showQuestion,
  setCurrentQuestion,
  resetCorrectAnswers,
  resetSelection,
} from '../quiz/index.js';
import { prevQuestion, nextQuestion } from './index.js';

function restartQuiz() {
  setCurrentQuestion(0);
  resetCorrectAnswers();
  resetSelection();

  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
    <div id="question-number"></div>
    <div id="question-text"></div>
    <div class="options-container"></div>
    <button id="prev">Previous</button>
    <button id="next">Next</button>
  `;

  document.getElementById('prev').addEventListener('click', prevQuestion);
  document.getElementById('next').addEventListener('click', nextQuestion);

  showQuestion();
}

window.restartQuiz = restartQuiz;

export { restartQuiz };
