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
  // Add remaining 9 questions as before
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

const navBar = document.getElementById("nav-bar");
const startBtn = document.getElementById("start-btn");
const howtoBtn = document.getElementById("howto-btn");
const howtoQuizBtn = document.getElementById("howto-quiz-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const backBtn = document.getElementById("back-btn");
const scoreText = document.getElementById("score-text");
const explanationsList = document.getElementById("explanations-list");
const progressText = document.getElementById("progress-text");

// =========================
// Progress Bar Functions
// =========================
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// =========================
// Navigation Functions
// =========================
function showSection(section) {
  [homepageSection, howtoSection, quizSection, resultSection].forEach(s => s.classList.add("hidden"));
  section.classList.remove("hidden");

  if (section === quizSection) {
    navBar.classList.add("hidden-nav");
  } else {
    navBar.classList.remove("hidden-nav");
  }
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

  updateProgressBar();
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  displayQuestion();
}

function showResults() {
  score = userAnswers.reduce((acc, ans, i) => acc + (ans === questions[i].answer ? 1 : 0), 0);
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
  explanationsList.innerHTML = "";

  questions.forEach((q, i) => {
    const userChoice = q.options[userAnswers[i]] || "No answer selected";
    const correctChoice = q.options[q.answer];

    const li = document.createElement("li");
    li.innerHTML = `
      <p><strong>Q${i + 1}: ${q.question}</strong></p>
      <p><strong>Your Answer:</strong> ${userChoice}</p>
      <p><strong>Correct Answer:</strong> ${correctChoice}</p>
      <p><em>${q.explanation}</em></p>
    `;
    explanationsList.appendChild(li);
  });

  showSection(resultSection);
}

// =========================
// Event Listeners
// =========================
howtoBtn.addEventListener("click", () => showSection(howtoSection));
startBtn.addEventListener("click", startQuiz);
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
retryBtn.addEventListener("click", () => showSection(document.getElementById("hero-section")));

// Initialize
showSection(document.getElementById("hero-section"));
