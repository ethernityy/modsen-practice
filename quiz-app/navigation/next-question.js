import {
  showQuestion,
  getCurrentQuestion,
  setCurrentQuestion,
} from '../quiz.js';
import { questions } from '../questions.js';
import { showResults } from './showResults.js';

function nextQuestion() {
  let currentQuestion = getCurrentQuestion();
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    showQuestion();
  } else {
    showResults();
  }
}

export { nextQuestion };
