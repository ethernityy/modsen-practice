import { showQuestion, selectAnswer } from './quiz.js';
import { nextQuestion, prevQuestion } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();

  document.getElementById('next').addEventListener('click', nextQuestion);
  document.getElementById('prev').addEventListener('click', prevQuestion);
  document
    .querySelector('.options-container')
    .addEventListener('click', (event) => {
      if (event.target.classList.contains('option')) {
        selectAnswer(event.target);
      }
    });
});
