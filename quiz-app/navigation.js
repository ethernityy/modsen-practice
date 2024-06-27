export function handleNextQuestion(state, loadQuestion, showResults, elements) {
  if (state.currentQuestionIndex < state.totalQuestions - 1) {
    state.currentQuestionIndex++;
    loadQuestion(state, elements);
  } else {
    showResults(state, elements);
  }
}

export function restartQuiz(state, loadQuestion, elements) {
  state.currentQuestionIndex = 0;
  state.score = 0;
  loadQuestion(state, elements);
}

export function showResults(state, elements) {
  const {
    questionNumberElement,
    questionTextElement,
    optionsContainerElement,
    nextButton,
    checkButton,
    stopTimer,
  } = elements;
  stopTimer();
  questionNumberElement.textContent = 'Quiz Completed!';
  questionTextElement.textContent = `You scored ${state.score} out of ${state.totalQuestions}`;
  optionsContainerElement.innerHTML = '';
  nextButton.textContent = 'Restart';
  nextButton.addEventListener('click', () =>
    restartQuiz(state, loadQuestion, elements)
  );
  nextButton.disabled = false;
  checkButton.style.display = 'none';
}
