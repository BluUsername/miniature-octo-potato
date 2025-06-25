/* -----------------------------------------------------------
   Coding-Concepts Quiz – revised to use `hidden` class toggling
   -----------------------------------------------------------
   – Adds lightweight `show()` / `hide()` helpers
   – Removes every .style.display assignment
   – Replaces the empty option in the “Python comments” question
     with “--” so no blank button appears
----------------------------------------------------------- */

const questions = [
  {
    question: "What is a variable in programming?",
    options: [
      "A storage location for data.",
      "A function call.",
      "A type of loop.",
      "A comment in code."
    ],
    answer: 0,
    explanation:
      "A variable stores data that can be used and changed during program execution."
  },
  {
    question: "Which of the following is a programming language?",
    options: ["HTML", "CSS", "JavaScript", "HTTP"],
    answer: 2,
    explanation:
      "HTML and CSS are markup/style sheets; HTTP is a protocol. JavaScript is the language."
  },
  {
    question: "What does 'syntax' refer to in programming?",
    options: [
      "The speed of execution.",
      "The rules for writing code.",
      "The size of the program.",
      "The type of variable."
    ],
    answer: 1,
    explanation: "Syntax is the set of rules that defines how code must be written."
  },
  {
    question: "What is a loop used for in programming?",
    options: [
      "To store data.",
      "To repeat a block of code.",
      "To define a function.",
      "To debug code."
    ],
    answer: 1,
    explanation: "Loops repeat a block of code multiple times."
  },
  {
    question: "Which symbol is commonly used for comments in Python?",
    options: ["//", "/*", "#", "--"],
    answer: 2,
    explanation: "The # symbol is used for single-line comments in Python."
  },
  /* --- keep the rest of your questions here unchanged --- */
];

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- element cache ---------- */
  const howtoBtn = document.getElementById("howto-btn");
  const quizBtn = document.getElementById("quiz-btn");
  const howtoSection = document.getElementById("howto-section");
  const quizSection = document.getElementById("quiz-section");
  const resultSection = document.getElementById("result-section");
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options-list");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const scoreText = document.getElementById("score-text");
  const explanationsList = document.getElementById("explanations-list");
  const retryBtn = document.getElementById("retry-btn");

  /* ---------- helpers to toggle visibility ---------- */
  const show = (el) => el.classList.remove("hidden");
  const hide = (el) => el.classList.add("hidden");

  /* ---------- state ---------- */
  let shuffledQuestions = [];
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];

  /* ---------- navigation buttons ---------- */
  if (howtoBtn)
    howtoBtn.onclick = () => {
      show(howtoSection);
      hide(quizSection);
      hide(resultSection);
    };

  if (quizBtn) quizBtn.onclick = startQuiz;
  if (retryBtn) retryBtn.onclick = startQuiz;
  if (nextBtn) nextBtn.onclick = handleNextQuestion;
  if (submitBtn) submitBtn.onclick = handleSubmit;

  /* ---------- quiz flow ---------- */
  function startQuiz() {
    hide(howtoSection);
    show(quizSection);
    hide(resultSection);

    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    showQuestion();
  }

  function showQuestion() {
    const q = shuffledQuestions[currentQuestion];
    questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    optionsList.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;
      btn.setAttribute("aria-label", opt);
      btn.onclick = () => selectAnswer(idx);
      li.appendChild(btn);
      optionsList.appendChild(li);
    });

    nextBtn.disabled = true;
    submitBtn.disabled = true;

    if (currentQuestion < shuffledQuestions.length - 1) {
      show(nextBtn);
      hide(submitBtn);
    } else {
      hide(nextBtn);
      show(submitBtn);
    }
  }

  function selectAnswer(selectedIdx) {
    const q = shuffledQuestions[currentQuestion];
    userAnswers[currentQuestion] = selectedIdx;

    const optionButtons = optionsList.querySelectorAll("button");
    optionButtons.forEach((b, idx) => {
      b.classList.remove("selected", "correct", "incorrect");
      if (idx === selectedIdx) b.classList.add("selected");
      if (idx === q.answer) b.classList.add("correct");
      else if (idx === selectedIdx && idx !== q.answer)
        b.classList.add("incorrect");
      b.disabled = true;
    });

    if (selectedIdx === q.answer) score++;
    nextBtn.disabled = false;
    submitBtn.disabled = false;
  }

  function handleNextQuestion() {
    if (typeof userAnswers[currentQuestion] === "undefined") {
      alert("Please select an answer before proceeding.");
      return;
    }

    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }

  function handleSubmit() {
    if (typeof userAnswers[currentQuestion] === "undefined") {
      alert("Please select an answer before submitting.");
      return;
    }
    showResults();
  }

  function showResults() {
    hide(quizSection);
    show(resultSection);

    scoreText.textContent = `You scored ${score} out of ${shuffledQuestions.length}.`;
    explanationsList.innerHTML = "";

    shuffledQuestions.forEach((q, idx) => {
      const li = document.createElement("li");
      const userAnswerText =
        typeof userAnswers[idx] === "number" &&
        userAnswers[idx] >= 0 &&
        userAnswers[idx] < q.options.length
          ? q.options[userAnswers[idx]]
          : "No answer";

      li.innerHTML = `<strong>Q${idx + 1}:</strong> ${q.question}<br>
        <strong>Your answer:</strong> ${userAnswerText}<br>
        <strong>Correct answer:</strong> ${q.options[q.answer]}<br>
        <em>${q.explanation}</em>`;
      explanationsList.appendChild(li);
    });
  }

  /* ---------- utility ---------- */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
});
