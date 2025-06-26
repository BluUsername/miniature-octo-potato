// =========================
// Quiz Data and Variables
// =========================
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyperlink and Text Markup Language"
    ],
    answer: 1,
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  {
    question: "Which tag is used to define a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    answer: 0,
    explanation: "The <a> tag defines a hyperlink in HTML."
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    answer: 2,
    explanation: "CSS (Cascading Style Sheets) is used to style HTML elements."
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "#"],
    answer: 1,
    explanation: "JavaScript uses // for single-line comments and /* */ for multi-line comments."
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["v myVar = 5;", "let myVar = 5;", "variable myVar = 5;", "dim myVar = 5;"],
    answer: 1,
    explanation: "You declare a variable using let, const, or var in JavaScript."
  },
  {
    question: "Which method is used to add a new element at the end of an array in JavaScript?",
    options: ["add()", "push()", "append()", "insert()"],
    answer: 1,
    explanation: "The push() method adds an element to the end of an array."
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Syntax",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2,
    explanation: "CSS stands for Cascading Style Sheets."
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: 2,
    explanation: "JavaScript doesn't have a 'Float' type; numbers are all of type Number."
  },
  {
    question: "How can you make a website responsive?",
    options: [
      "Using HTML only",
      "Using media queries in CSS",
      "Using tables for layout",
      "Using large images"
    ],
    answer: 1,
    explanation: "Media queries in CSS help make websites responsive to different screen sizes."
  },
  {
    question: "What is the purpose of JavaScript in web development?",
    options: [
      "To define the content",
      "To style the content",
      "To add interactivity",
      "To store data in databases"
    ],
    answer: 2,
    explanation: "JavaScript adds interactivity and behavior to web pages."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = Array(questions.length).fill(null);

// =========================
// DOM Elements
// =========================
const homepageSection = document.getElementById("homepage-section");
const howtoSection = document.getElementById("howto-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const howtoBtn = document.getElementById("howto-btn");
const quizBtn = document.getElementById("quiz-btn");
const howtoQuizBtn = document.getElementById("howto-quiz-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const backBtn = document.getElementById("back-btn");
const scoreText = document.getElementById("score-text");
const explanationsList = document.getElementById("explanations-list");

// =========================
// Progress Bar Functions
// =========================
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

// =========================
// Navigation Functions
// =========================
function showSection(section) {
  homepageSection.classList.add("hidden");
  howtoSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  section.classList.remove("hidden");
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = Array(questions.length).fill(null);
  showSection(quizSection);
  displayQuestion();
}

function displayQuestion() {
  const current = questions[currentQuestionIndex];
  questionText.textContent = current.question;
  optionsList.innerHTML = "";

  current.options.forEach((option, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectOption(index));

    if (userAnswers[currentQuestionIndex] === index) {
      btn.classList.add("selected");
    }

    li.appendChild(btn);
    optionsList.appendChild(li);
  });

  backBtn.classList.toggle("hidden", currentQuestionIndex === 0);
  nextBtn.classList.toggle("hidden", currentQuestionIndex >= questions.length - 1);
  submitBtn.classList.toggle("hidden", currentQuestionIndex < questions.length - 1);

  // Update progress bar
  updateProgressBar();
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  displayQuestion();
}

function showResults() {
  score = userAnswers.reduce((acc, answer, i) => acc + (answer === questions[i].answer ? 1 : 0), 0);
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
  explanationsList.innerHTML = "";

  questions.forEach((q, i) => {
    const li = document.createElement("li");

    // Get the user's selected answer and the correct answer
    const selectedAnswer = questions[i].options[userAnswers[i]];
    const correctAnswer = questions[i].options[q.answer];

    // Add question, selected answer, correct answer, and explanation
    li.innerHTML = `
      <strong>Q${i + 1}: ${q.question}</strong><br>
      <strong>Your answer:</strong> ${selectedAnswer}<br>
      <strong>Correct answer:</strong> ${correctAnswer}<br>
      <em>Explanation: ${q.explanation}</em>
    `;
    explanationsList.appendChild(li);
  });

  showSection(resultSection);
}

// =========================
// Event Listeners
// =========================
howtoBtn.addEventListener("click", () => showSection(howtoSection));
quizBtn.addEventListener("click", startQuiz);
howtoQuizBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
});

backBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
});

submitBtn.addEventListener("click", showResults);
retryBtn.addEventListener("click", () => showSection(homepageSection));
