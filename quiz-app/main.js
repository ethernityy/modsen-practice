const questions = [
  {
    question: 'How many planets are in the solar system?',
    options: [
      { text: '8', correct: true },
      { text: '7', correct: false },
      { text: '9', correct: false },
      { text: '10', correct: false },
    ],
  },
  {
    question: 'What is the smallest ocean in the world?',
    options: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: true },
      { text: 'Pacific Ocean', correct: false },
    ],
  },
  {
    question: 'What is the freezing point of water?',
    options: [
      { text: '0', correct: true },
      { text: '-5', correct: false },
      { text: '-6', correct: false },
      { text: '5', correct: false },
    ],
  },
  {
    question: 'What is the longest river in the world?',
    options: [
      { text: 'Nile', correct: true },
      { text: 'Amazon', correct: false },
      { text: 'Yangtze', correct: false },
      { text: 'Mississippi', correct: false },
    ],
  },
  {
    question: 'How many chromosomes are in the human genome?',
    options: [
      { text: '42', correct: false },
      { text: '44', correct: false },
      { text: '46', correct: true },
      { text: '48', correct: false },
    ],
  },
  {
    question: 'Which of these characters are friends with Harry Potter?',
    options: [
      { text: 'Ron Weasley', correct: true },
      { text: 'Draco Malfoy', correct: false },
      { text: 'Hermione Granger', correct: true },
      { text: 'Severus Snape', correct: false },
    ],
  },
  {
    question: 'What is the capital of Canada?',
    options: [
      { text: 'Toronto', correct: false },
      { text: 'Ottawa', correct: true },
      { text: 'Vancouver', correct: false },
      { text: 'Montreal', correct: false },
    ],
  },
  {
    question: 'What is the Jewish New Year called?',
    options: [
      { text: 'Hanukkah', correct: false },
      { text: 'Yom Kippur', correct: false },
      { text: 'Kwanzaa', correct: false },
      { text: 'Rosh Hashanah', correct: true },
    ],
  },
  {
    question: 'What is the capital of France?',
    options: [
      { text: 'New York', correct: false },
      { text: 'London', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Dublin', correct: false },
    ],
  },
];
let currentQuestion = 0;
let correctAnswers = 0;

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
});

function showQuestion() {
  const questionNumberElement = document.getElementById('question-number');
  const questionTextElement = document.getElementById('question-text');
  const optionsContainerElement = document.querySelector('.options-container');
  const nextBtn = document.getElementById('next');

  questionNumberElement.innerText = `Question ${currentQuestion + 1}/${
    questions.length
  }`;
  questionTextElement.innerText = questions[currentQuestion].question;
  optionsContainerElement.innerHTML = '';

  questions[currentQuestion].options.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('option');
    button.dataset.correct = option.correct;
    button.addEventListener('click', () => selectAnswer(button));
    optionsContainerElement.appendChild(button);
  });

  document.getElementById('prev').disabled = currentQuestion === 0;
  nextBtn.disabled = true;
}

function selectAnswer(selectedButton) {
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

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showResults() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
  <div class='question-container'>
  <h2 class='question-container'>Quiz completed<h2>
  <p class='question'> You got ${correctAnswers} out of ${questions.length} points<p>
  <button id='restart' class='nav-btn' onclick='restartQuiz()'>Restart</button>
  </div>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}

document.getElementById('next').addEventListener('click', nextQuestion);
document.getElementById('prev').addEventListener('click', prevQuestion);
