"use strict";
// ===================================================================
// Quiz logic (script.js)
// ===================================================================
// Author: Your Name • Custom code written for the Coding Concepts Quiz
// -------------------------------------------------------------------
// Lint‑friendly (JSHint) ✅  • W3C accessible navigation support ✅
// ===================================================================

/******************************
 * Cache DOM references
 ******************************/
const homepageSection  = document.getElementById("homepage-section");
const howtoSection     = document.getElementById("howto-section");
const quizSection      = document.getElementById("quiz-section");
const resultSection    = document.getElementById("result-section");

const howtoBtn   = document.getElementById("howto-btn");
const quizBtn    = document.getElementById("quiz-btn");
const nextBtn    = document.getElementById("next-btn");
const submitBtn  = document.getElementById("submit-btn");
const retryBtn   = document.getElementById("retry-btn");

const questionText     = document.getElementById("question-text");
const optionsList      = document.getElementById("options-list");
const scoreText        = document.getElementById("score-text");
const explanationsList = document.getElementById("explanations-list");

/******************************
 * Quiz data
 ******************************/
const quizData = [
  {
    question: "Which property of a JavaScript array returns the number of elements in the array?",
    options: ["numElements", "sizeOf", "length", "size"],
    correctIndex: 2,
    explanation: "The `.length` property returns the number of elements in an array."
  },
  {
    question: "What is the purpose of a function parameter?",
    options: ["To call a function.", "To allow a function to accept data.", "To specify actual values passed to a function."],
    correctIndex: 1,
    explanation: "Parameters are placeholders for data that a function can use when it's called."
  },
  {
    question: "What does the !== operator do in JavaScript?",
    options: ["Assigns a value", "Checks for equality", "Checks for inequality without type coercion", "Performs addition"],
    correctIndex: 2,
    explanation: "The !== operator checks for inequality without performing type coercion."
  },
  {
    question: "What does the .push() method do in JavaScript?",
    options: ["Removes the last element of an array", "Adds a new element to the end of an array", "Sorts the array", "Adds an element to the beginning of an array"],
    correctIndex: 1,
    explanation: "The .push() method adds a new element to the end of an array."
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["let", "var", "constant", "const"],
    correctIndex: 3,
    explanation: "Use `const` to declare a variable that cannot be reassigned."
  },
  {
    question: "Which of these is a valid JavaScript function declaration?",
    options: ["let myFunction = function() {}", "function: myFunction() {}", "function = myFunction() {}", "function => myFunction()"],
    correctIndex: 0,
    explanation: "`let myFunction = function() {}` is a valid function expression."
  },
  {
    question: "What will console.log(typeof []) output?",
    options: ["'array'", "'object'", "'list'", "'undefined'"],
    correctIndex: 1,
    explanation: "Arrays are objects in JavaScript, so `typeof []` returns 'object'."
  },
  {
    question: "Which loop is best for iterating through an array?",
    options: ["while loop", "for loop", "do-while loop", "switch statement"],
    correctIndex: 1,
    explanation: "A `for` loop is commonly used for array iteration due to index control."
  },
  {
    question: "What is the default value of an uninitialized variable in JavaScript?",
    options: ["null", "undefined", "0", "false"],
    correctIndex: 1,
    explanation: "Variables declared but not initialized are `undefined`."
  },
  {
    question: "What does the `return` keyword do in a function?",
    options: ["Stops the function and returns a value", "Continues executing the function", "Declares a new variable", "Calls another function"],
    correctIndex: 0,
    explanation: "`return` exits a function and optionally passes a value back."
  }
];

/******************************
 * State variables
 ******************************/
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
const userAnswers = [];

/******************************
 * UI Helper functions
 ******************************/
function setActiveNav(button) {
  [howtoBtn, quizBtn].forEach(btn => {
    btn.classList.toggle("nav-active", btn === button);
    btn.setAttribute("aria-expanded", btn === button);
  });
}

function showSection(section) {
  [homepageSection, howtoSection, quizSection, resultSection].forEach(sec => {
    sec.classList.add("hidden");
  });
  section.classList.remove("hidden");
}

/******************************
 * Quiz flow functions
 ******************************/
function loadQuestion() {
  const { question, options } = quizData[currentQuestionIndex];
  questionText.textContent = question;
  optionsList.innerHTML = "";

  options.forEach((opt, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.type = "button";
    btn.addEventListener("click", () => selectOption(idx, btn));
    li.appendChild(btn);
    optionsList.appendChild(li);
  });

  selectedOptionIndex = null;
  nextBtn.classList.add("hidden");
  submitBtn.classList.add("hidden");
}

function selectOption(index, button) {
  selectedOptionIndex = index;
  optionsList.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");

  if (currentQuestionIndex < quizData.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    submitBtn.classList.remove("hidden");
  }
}

function nextQuestion() {
  if (selectedOptionIndex === null) return;
  evaluateAnswer();
  currentQuestionIndex += 1;
  loadQuestion();
}

function submitQuiz() {
  if (selectedOptionIndex !== null) {
    evaluateAnswer();
  }
  showResults();
}

function evaluateAnswer() {
  userAnswers.push(selectedOptionIndex);
  const isCorrect = selectedOptionIndex === quizData[currentQuestionIndex].correctIndex;
  if (isCorrect) score += 1;
}

/******************************
 * Results screen
 ******************************/
function showResults() {
  showSection(resultSection);
  setActiveNav(null);

  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;
  explanationsList.innerHTML = "";

  quizData.forEach((q, i) => {
    const li = document.createElement("li");
    const userIdx = userAnswers[i];
    li.innerHTML = `<strong>Q:</strong> ${q.question}<br>
      <strong>Your answer:</strong> ${(q.options[userIdx] || "None")}
      ${userIdx === q.correctIndex ? "✅" : "❌"}<br>
      <strong>Correct answer:</strong> ${q.options[q.correctIndex]}<br>
      <strong>Explanation:</strong> ${q.explanation}`;
    explanationsList.appendChild(li);
  });
}

/******************************
 * Start / reset
 ******************************/
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers.length = 0; // clear array
  setActiveNav(quizBtn);
  showSection(quizSection);
  loadQuestion();
}

/******************************
 * Event listeners
 ******************************/
howtoBtn.addEventListener("click", () => {
  setActiveNav(howtoBtn);
  showSection(howtoSection);
});

quizBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitQuiz);
retryBtn.addEventListener("click", startQuiz);

/******************************
 * Initial view (homepage)
 ******************************/
setActiveNav(null);
