import {
  showQuestion,
  getCurrentQuestion,
  setCurrentQuestion,
} from '../quiz.js';

function prevQuestion() {
  let currentQuestion = getCurrentQuestion();
  if (currentQuestion > 0) {
    setCurrentQuestion(currentQuestion - 1);
    showQuestion();
  }
}

export { prevQuestion };
