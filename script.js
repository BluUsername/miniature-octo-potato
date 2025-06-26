// script.js

const homepageSection = document.getElementById("homepage-section");
const howtoSection = document.getElementById("howto-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const howtoBtn = document.getElementById("howto-btn");
const quizBtn = document.getElementById("quiz-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const scoreText = document.getElementById("score-text");
const explanationsList = document.getElementById("explanations-list");

let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let userAnswers = [];

const quizData = [
  {
    question: "Which property of a JavaScript array returns the number of elements in the array?",
    options: ["numElements", "sizeOf", "length", "size"],
    correctIndex: 2,
    explanation: "The `.length` property returns the number of elements in a JavaScript array."
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
    explanation: "The 'const' keyword is used to declare a constant variable that cannot be reassigned."
  },
  {
    question: "Which of these is a valid JavaScript function declaration?",
    options: ["let myFunction = function() {}", "function: myFunction() {}", "function = myFunction() {}", "function => myFunction()"],
    correctIndex: 0,
    explanation: "'let myFunction = function() {}' is a valid function expression declaration."
  },
  {
    question: "What will console.log(typeof []) output?",
    options: ["'array'", "'object'", "'list'", "'undefined'"],
    correctIndex: 1,
    explanation: "In JavaScript, arrays are technically objects, so typeof [] returns 'object'."
  },
  {
    question: "Which loop would be best for iterating through an array?",
    options: ["while loop", "for loop", "do-while loop", "switch statement"],
    correctIndex: 1,
    explanation: "A 'for loop' is commonly used for iterating through arrays due to its predictable index control."
  },
  {
    question: "What is the default value of an uninitialized variable in JavaScript?",
    options: ["null", "undefined", "0", "false"],
    correctIndex: 1,
    explanation: "Variables declared but not initialized are assigned the value 'undefined' by default."
  },
  {
    question: "What does the 'return' keyword do in a function?",
    options: ["Stops the function and returns a value", "Continues executing the function", "Declares a new variable", "Calls another function"],
    correctIndex: 0,
    explanation: "The 'return' keyword exits a function and optionally returns a value to the caller."
  }
];

function showSection(section) {
  homepageSection.classList.add("hidden");
  howtoSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");

  section.classList.remove("hidden");
}

function loadQuestion() {
  const current = quizData[currentQuestionIndex];
  questionText.textContent = current.question;
  optionsList.innerHTML = "";

  current.options.forEach((option, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(index, button));
    li.appendChild(button);
    optionsList.appendChild(li);
  });

  nextBtn.classList.add("hidden");
  submitBtn.classList.add("hidden");
  selectedOptionIndex = null;
}

function selectOption(index, button) {
  selectedOptionIndex = index;
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");

  if (currentQuestionIndex < quizData.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    submitBtn.classList.remove("hidden");
  }
}

function showResults() {
  showSection(resultSection);
  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;
  explanationsList.innerHTML = "";

  quizData.forEach((question, i) => {
    const li = document.createElement("li");
    const userAnswer = userAnswers[i];
    li.innerHTML = `<strong>Q:</strong> ${question.question}<br>
                    <strong>Your answer:</strong> ${question.options[userAnswer] || "None"}<br>
                    <strong>Correct answer:</strong> ${question.options[question.correctIndex]}<br>
                    <strong>Explanation:</strong> ${question.explanation}`;
    explanationsList.appendChild(li);
  });
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  showSection(quizSection);
  loadQuestion();
}

function nextQuestion() {
  if (selectedOptionIndex === null) return;
  userAnswers.push(selectedOptionIndex);
  if (selectedOptionIndex === quizData[currentQuestionIndex].correctIndex) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

function submitQuiz() {
  if (selectedOptionIndex !== null) {
    userAnswers.push(selectedOptionIndex);
    if (selectedOptionIndex === quizData[currentQuestionIndex].correctIndex) {
      score++;
    }
  }
  showResults();
}

// Event Listeners
howtoBtn.addEventListener("click", () => showSection(howtoSection));
quizBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitQuiz);
retryBtn.addEventListener("click", startQuiz);
