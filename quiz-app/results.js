import {
  loadQuestion,
  currentQuestionIndex,
  score,
  handleNextQuestion,
} from './quiz.js';
import { stopTimer } from './timer.js';

export function showResults(score, totalQuestions, stopTimer, restartQuiz) {
  stopTimer();
  const questionNumberElement = document.getElementById('question-number');
  const questionTextElement = document.getElementById('question-text');
  const optionsContainerElement = document.querySelector('.options-container');
  const nextButton = document.getElementById('next-btn');
  const checkButton = document.getElementById('check-btn');

  questionNumberElement.textContent = 'Quiz Completed!';
  questionTextElement.textContent = `You scored ${score} out of ${totalQuestions}`;
  optionsContainerElement.innerHTML = '';
  nextButton.textContent = 'Restart';
  nextButton.removeEventListener('click', handleNextQuestion);
  nextButton.addEventListener('click', restartQuiz);
  nextButton.disabled = false;
  checkButton.style.display = 'none';
}

export function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  const nextButton = document.getElementById('next-btn');
  nextButton.textContent = 'Next';
  nextButton.removeEventListener('click', restartQuiz);
  nextButton.addEventListener('click', handleNextQuestion);
  loadQuestion();
}
