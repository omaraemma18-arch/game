const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'Madrid', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Rome', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Venus', correct: false },
      { text: 'Mercury', correct: false },
    ],
  },
  {
    question: 'Which language is primarily used for web pages?',
    answers: [
      { text: 'JavaScript', correct: true },
      { text: 'Python', correct: false },
      { text: 'C++', correct: false },
      { text: 'Swift', correct: false },
    ],
  },
  {
    question: 'What is 7 + 5?',
    answers: [
      { text: '12', correct: true },
      { text: '10', correct: false },
      { text: '14', correct: false },
      { text: '11', correct: false },
    ],
  },
];

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.classList.add('hide');
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
    button.disabled = true;
  });

  if (correct) {
    score++;
  }

  nextButton.classList.remove('hide');
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerText = 'Restart';
  } else {
    nextButton.innerText = 'Next';
  }
  showScore();
}

function showScore() {
  scoreElement.classList.remove('hide');
  scoreElement.innerText = `Score: ${score} / ${questions.length}`;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex >= questions.length - 1) {
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    scoreElement.innerText = `Final score: ${score} / ${questions.length}`;
    scoreElement.classList.remove('hide');
  } else {
    currentQuestionIndex++;
    setNextQuestion();
  }
});
