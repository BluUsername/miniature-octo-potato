"use strict";

const howToBtn = document.getElementById("howto-btn");
const quizBtn = document.getElementById("quiz-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");

const homepageSection = document.getElementById("homepage-section");
const howtoSection = document.getElementById("howto-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const scoreText = document.getElementById("score-text");
const explanationsList = document.getElementById("explanations-list");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = Array(10).fill(null);

const questions = [
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Float"],
    answer: 3,
    explanation: "'Float' is not a distinct data type in JavaScript; numbers with decimals are part of the 'Number' type."
  },
  {
    question: "What does '===' mean in JavaScript?",
    options: ["Assignment", "Equality", "Strict Equality", "Inequality"],
    answer: 2,
    explanation: "'===' checks for both value and type equality, unlike '=='."
  },
  // ... include 8 more questions
];

function showSection(sectionToShow) {
  homepageSection.classList.add("hidden");
  howtoSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");

  sectionToShow.classList.remove("hidden");
}

howToBtn.addEventListener("click", () => {
  showSection(howtoSection);

  // Add Quiz button to how-to page
  if (!howtoSection.querySelector("#howto-quiz-btn")) {
    const quizButton = document.createElement("button");
    quizButton.id = "howto-quiz-btn";
    quizButton.textContent = "Start Quiz";
    quizButton.className = "mt-2";
    quizButton.addEventListener("click", () => {
      startQuiz();
    });
    howtoSection.appendChild(quizButton);
  }
});

quizBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers.fill(null);
  showSection(quizSection);
  displayQuestion();
  submitBtn.classList.add("hidden");
}

function displayQuestion() {
  const current = questions[currentQuestionIndex];
  questionText.textContent = current.question;
  optionsList.innerHTML = "";

  current.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      selectedAnswers[currentQuestionIndex] = idx;
      const allBtns = optionsList.querySelectorAll("button");
      allBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    // Restore previous answer
    if (selectedAnswers[currentQuestionIndex] === idx) {
      btn.classList.add("selected");
    }
    li.appendChild(btn);
    optionsList.appendChild(li);
  });

  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
  nextBtn.classList.remove("hidden");
  submitBtn.classList.add("hidden");

  // Add Back button
  if (!document.getElementById("back-btn")) {
    const backBtn = document.createElement("button");
    backBtn.id = "back-btn";
    backBtn.textContent = "Back";
    backBtn.className = "mt-2";
    backBtn.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
      }
    });
    quizSection.querySelector(".center").prepend(backBtn);
  }
}

nextBtn.addEventListener("click", () => {
  if (selectedAnswers[currentQuestionIndex] == null) {
    alert("Please select an answer.");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    showResults();
  }
});

retryBtn.addEventListener("click", () => {
  showSection(homepageSection);
});

function showResults() {
  let correct = 0;
  explanationsList.innerHTML = "";

  questions.forEach((q, idx) => {
    const userAns = selectedAnswers[idx];
    if (userAns === q.answer) correct++;

    const li = document.createElement("li");
    li.innerHTML = `<strong>Q${idx + 1}:</strong> ${q.question}<br>
                    <strong>Your answer:</strong> ${q.options[userAns] || "No answer"}<br>
                    <strong>Correct answer:</strong> ${q.options[q.answer]}<br>
                    <em>${q.explanation}</em>`;
    explanationsList.appendChild(li);
  });

  scoreText.textContent = `You scored ${correct} out of ${questions.length}.`;
  showSection(resultSection);
}
