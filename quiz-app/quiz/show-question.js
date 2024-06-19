import { getCurrentQuestion } from './getCurrentQuestion.js';
import { questions } from '../questions.js';
import { showResults } from '../navigation/showResults.js';
import { selectAnswer } from './selectAnswer.js';

function showQuestion() {
  const questionNumberElement = document.getElementById('question-number');
  const questionTextElement = document.getElementById('question-text');
  const optionsContainerElement = document.querySelector('.options-container');
  const nextBtn = document.getElementById('next');

  if (
    !questionNumberElement ||
    !questionTextElement ||
    !optionsContainerElement ||
    !nextBtn
  ) {
    console.error('One or more elements are missing');
    return;
  }

  const currentQuestionIndex = getCurrentQuestion();
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const question = questions[currentQuestionIndex];
  questionNumberElement.innerText = `Question ${currentQuestionIndex + 1}/${
    questions.length
  }`;
  questionTextElement.innerText = question.question;

  const correctOptionsCount = question.options.filter(
    (option) => option.correct
  ).length;
  if (correctOptionsCount > 1) {
    questionTextElement.innerText += ' (Select multiple answers)';
  }

  optionsContainerElement.innerHTML = '';

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('option');
    button.dataset.correct = option.correct;
    button.addEventListener('click', () =>
      selectAnswer(button, correctOptionsCount > 1)
    );
    optionsContainerElement.appendChild(button);
  });

  document.getElementById('prev').disabled = currentQuestionIndex === 0;
  nextBtn.disabled = true;
}

export { showQuestion };
