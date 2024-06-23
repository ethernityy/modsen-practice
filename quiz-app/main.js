const questions = [
  {
    question: 'How many planets are in the solar system?',
    options: [
      { text: '8', isCorrect: true },
      { text: '7', isCorrect: false },
      { text: '9', isCorrect: false },
      { text: '10', isCorrect: false },
    ],
  },
  {
    question: 'What is the smallest ocean in the world?',
    options: [
      { text: 'Atlantic Ocean', isCorrect: false },
      { text: 'Indian Ocean', isCorrect: false },
      { text: 'Arctic Ocean', isCorrect: true },
      { text: 'Pacific Ocean', isCorrect: false },
    ],
  },
  {
    question: 'What is the freezing point of water?',
    options: [
      { text: '0', isCorrect: true },
      { text: '-5', isCorrect: false },
      { text: '-6', isCorrect: false },
      { text: '5', isCorrect: false },
    ],
  },
  {
    question: 'What is the longest river in the world?',
    options: [
      { text: 'Nile', isCorrect: true },
      { text: 'Amazon', isCorrect: false },
      { text: 'Yangtze', isCorrect: false },
      { text: 'Mississippi', isCorrect: false },
    ],
  },
  {
    question: 'How many chromosomes are in the human genome?',
    options: [
      { text: '42', isCorrect: false },
      { text: '44', isCorrect: false },
      { text: '46', isCorrect: true },
      { text: '48', isCorrect: false },
    ],
  },
  {
    question: 'Which of these characters are friends with Harry Potter?',
    options: [
      { text: 'Ron Weasley', isCorrect: true },
      { text: 'Draco Malfoy', isCorrect: false },
      { text: 'Hermione Granger', isCorrect: true },
      { text: 'Severus Snape', isCorrect: false },
    ],
    isMultiple: true,
  },
  {
    question: 'What is the capital of Canada?',
    options: [
      { text: 'Toronto', isCorrect: false },
      { text: 'Ottawa', isCorrect: true },
      { text: 'Vancouver', isCorrect: false },
      { text: 'Montreal', isCorrect: false },
    ],
  },
  {
    question: 'What is the Jewish New Year called?',
    options: [
      { text: 'Hanukkah', isCorrect: false },
      { text: 'Yom Kippur', isCorrect: false },
      { text: 'Kwanzaa', isCorrect: false },
      { text: 'Rosh Hashanah', isCorrect: true },
    ],
  },
  {
    question: 'What is the capital of France?',
    options: [
      { text: 'New York', isCorrect: false },
      { text: 'London', isCorrect: false },
      { text: 'Paris', isCorrect: true },
      { text: 'Dublin', isCorrect: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.querySelector('.options-container');
const nextButton = document.getElementById('next-btn');

const checkButton = document.createElement('button');
checkButton.id = 'check-btn';
checkButton.textContent = 'Check Answers';
checkButton.style.marginRight = '10px';
nextButton.parentNode.insertBefore(checkButton, nextButton);

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionNumberElement.textContent = `Question ${
    currentQuestionIndex + 1
  }/${totalQuestions}`;
  questionTextElement.textContent = currentQuestion.question;
  optionsContainerElement.innerHTML = '';

  if (currentQuestion.isMultiple) {
    const informationParagraph = document.createElement('p');
    informationParagraph.textContent =
      'This question has multiple correct answers';
    informationParagraph.classList.add('info-paragraph');
    informationParagraph.style.color = 'blue';
    optionsContainerElement.appendChild(informationParagraph);

    checkButton.style.display = 'inline-block';
    checkButton.disabled = true;
  } else {
    checkButton.style.display = 'none';
  }

  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = option.text;
    button.dataset.isCorrect = option.isCorrect;
    button.addEventListener('click', selectAnswer);
    optionsContainerElement.appendChild(button);
  });

  nextButton.disabled = true;
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.isMultiple) {
    selectedButton.classList.toggle('selected');
    const selectedButtons = document.querySelectorAll('.option.selected');
    nextButton.disabled = selectedButtons.length === 0;
    checkButton.disabled = selectedButtons.length === 0;
    return;
  }

  const isCorrect = selectedButton.dataset.isCorrect === 'true';
  selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');

  if (isCorrect) score++;

  Array.from(optionsContainerElement.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.isCorrect === 'true') {
      button.classList.add('correct');
    }
  });

  nextButton.disabled = false;
}

nextButton.addEventListener('click', handleNextQuestion);
checkButton.addEventListener('click', showCorrectAnswers);

function handleNextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionNumberElement.textContent = 'Quiz Completed!';
  questionTextElement.textContent = `You scored ${score} out of ${totalQuestions}`;
  optionsContainerElement.innerHTML = '';
  nextButton.textContent = 'Restart';
  nextButton.removeEventListener('click', handleNextQuestion);
  nextButton.addEventListener('click', restartQuiz);
  nextButton.disabled = false;
  checkButton.style.display = 'none';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = 'Next';
  nextButton.removeEventListener('click', restartQuiz);
  nextButton.addEventListener('click', handleNextQuestion);
  loadQuestion();
}

function showCorrectAnswers() {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.isMultiple) {
    const selectedButtons = document.querySelectorAll('.option.selected');
    selectedButtons.forEach((button) => {
      const isCorrect = button.dataset.isCorrect === 'true';
      button.classList.add(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) score++;
    });
    Array.from(optionsContainerElement.children).forEach((button) => {
      button.disabled = true;
      if (button.dataset.isCorrect === 'true') {
        button.classList.add('correct');
      }
    });
  }
  checkButton.disabled = true;
  nextButton.disabled = false;
}

loadQuestion();
