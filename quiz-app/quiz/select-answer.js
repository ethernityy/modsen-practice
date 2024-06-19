import {
  correctAnswers,
  getCurrentQuestion,
  setCurrentQuestion,
  resetSelection,
  resetCorrectAnswers,
} from './index.js';
import { questions } from '../questions.js';

let selectedAnswers = [];

function selectAnswer(selectedButton, isMultipleChoice) {
  if (isMultipleChoice) {
    selectedButton.classList.toggle('selected');

    if (selectedButton.classList.contains('selected')) {
      selectedAnswers.push(selectedButton);
    } else {
      selectedAnswers = selectedAnswers.filter(
        (button) => button !== selectedButton
      );
    }

    const allSelectedCorrect = selectedAnswers.every(
      (button) => button.dataset.correct === 'true'
    );
    const allCorrectSelected =
      selectedAnswers.length ===
      questions[getCurrentQuestion()].options.filter((option) => option.correct)
        .length;

    document.getElementById('next').disabled = !(
      allSelectedCorrect && allCorrectSelected
    );
  } else {
    const options = document.querySelectorAll('.option');
    options.forEach((button) => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.classList.add('correct');
      } else {
        button.classList.add('incorrect');
      }
    });

    if (selectedButton.dataset.correct === 'true') {
      correctAnswers++;
    }

    document.getElementById('next').disabled = false;
  }
}

export { selectAnswer, selectedAnswers };
