/* -----------------------------------------------------------
   Coding-Concepts Quiz – clean version (25 Jun 2025)
   – Uses .hidden class for visibility
   – No inline style.display battles
   – Syntax-error free
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
    options: ["//", "/*", "#", "--"],   // <-- no more blank entry
    answer: 2,
    explanation: "The # symbol is used for single-line comments in Python."
  }
  // …add the rest of your questions here …
];

/* ---------- tiny helper ---------- */
const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- element cache ---------- */
  const howtoBtn       = $("howto-btn");
  const quizBtn        = $("quiz-btn");
  const howtoSection   = $("howto-section");
  const quizSection    = $("quiz-section");
  const resultSection  = $("result-section");
  const questionText   = $("question-text");
  const optionsList    = $("options-list");
  const nextBtn        = $("next-btn");
  const submitBtn      = $("submit-btn");
  const scoreText      = $("score-text");
  const explanations   = $("explanations-list");
  const retryBtn       = $("retry-btn");

  /* ---------- visibility helpers ---------- */
  const show = (el) => el.classList.remove("hidden");
  const hide = (el) => el.classList.add("hidden");

  /* ---------- state ---------- */
  let shuffled = [], current = 0, score = 0, userAns = [];

  /* ---------- navigation ---------- */
  howtoBtn?.addEventListener("click", () => {
    show(howtoSection); hide(quizSection); hide(resultSection);
  });
  quizBtn?.addEventListener("click", startQuiz);
  retryBtn?.addEventListener("click", startQuiz);
  nextBtn?.addEventListener("click", () => advance(false));
  submitBtn?.addEventListener("click", () => advance(true));

  /* ---------- functions ---------- */
  function startQuiz() {
    hide(howtoSection); show(quizSection); hide(resultSection);
    shuffled = [...questions].sort(() => Math.random() - 0.5);
    current  = 0;
    score    = 0;
    userAns  = [];
    renderQ();
  }

  function renderQ() {
    const q = shuffled[current];
    questionText.textContent = `Q${current + 1}: ${q.question}`;
    optionsList.innerHTML = "";

    q.options.forEach((opt, i) => {
      const li  = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", () => pick(i));
      li.appendChild(btn);
      optionsList.appendChild(li);
    });

    nextBtn.disabled = true;
    submitBtn.disabled = true;
    show(current < shuffled.length - 1 ? nextBtn : submitBtn);
    hide(current < shuffled.length - 1 ? submitBtn : nextBtn);
  }

  function pick(i) {
    const q = shuffled[current];
    userAns[current] = i;
    [...optionsList.children].forEach((li, idx) => {
      const b = li.firstElementChild;
      b.classList.toggle("selected",  idx === i);
      b.classList.toggle("correct",   idx === q.answer);
      b.classList.toggle("incorrect", idx === i && idx !== q.answer);
      b.disabled = true;
    });
    if (i === q.answer) score++;
    nextBtn.disabled = submitBtn.disabled = false;
  }

  function advance(isSubmit) {
    if (typeof userAns[current] === "undefined")
      return alert("Please choose an answer first.");

    if (isSubmit || current === shuffled.length - 1) { showResults(); return; }
    current++; renderQ();
  }

  function showResults() {
    hide(quizSection); show(resultSection);
    scoreText.textContent = `You scored ${score} / ${shuffled.length}`;
    explanations.innerHTML = "";
    shuffled.forEach((q, i) => {
      const li = document.createElement("li");
      li.innerHTML =
        `<strong>Q${i + 1}</strong> ${q.question}<br>
         Your answer: ${q.options[userAns[i] ?? "-"]}<br>
         Correct answer: ${q.options[q.answer]}<br>
         <em>${q.explanation}</em>`;
      explanations.appendChild(li);
    });
  }
});
