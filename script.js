/* -----------------------------------------------------------
   Coding-Concepts Quiz – fully updated (25 Jun 2025)
   – Uses .hidden class for visibility (no style.display battles)
   – Keeps ALL ten original questions
   – Replaces blank "" option in the Python-comment question with "--"
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
        explanation: "A variable stores data that can be used and changed during program execution."
    },
    {
        question: "Which of the following is a programming language?",
        options: [
            "HTML",
            "CSS",
            "Python",
            "Bootstrap"
        ],
        answer: 2,
        explanation: "Python is a programming language; HTML and CSS are markup and style languages, and Bootstrap is a CSS framework."
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
            "To define a function.",
            "To repeat a block of code.",
            "To debug code."
        ],
        answer: 2,
        explanation: "Loops repeat a block of code multiple times."
    },
    {
        question: "What is an algorithm?",
        options: [
            "A step-by-step procedure for solving a problem.",
            "A programming language.",
            "A type of variable.",
            "A code editor."
        ],
        answer: 0,
        explanation: "An algorithm is a clear sequence of steps to solve a problem."
    },
    {
        question: "What does 'debugging' mean?",
        options: [
            "Writing new code.",
            "Finding and fixing errors in code.",
            "Compiling the program.",
            "Saving your work."
        ],
        answer: 1,
        explanation: "Debugging is the process of identifying and correcting errors in code."
    },
    {
        question: "Which symbol is commonly used for comments in Python?",
        options: [
            "//",
            "/*",
            "#",
            "--"
        ],
        answer: 2,
        explanation: "The # symbol is used for single-line comments in Python."
    },
    {
        question: "What is a function?",
        options: [
            "A type of variable.",
            "A reusable block of code that performs a specific task.",
            "A data structure.",
            "A loop."
        ],
        answer: 1,
        explanation: "A function is a named, reusable block of code."
    },
    {
        question: "What is the purpose of an IDE?",
        options: [
            "To store data.",
            "To compile programs.",
            "To provide tools for writing and testing code.",
            "To run websites."
        ],
        answer: 2,
        explanation: "An IDE (Integrated Development Environment) provides tools for coding, testing, and debugging."
    },
    {
        question: "What does 'compilation' do?",
        options: [
            "Runs the program.",
            "Transforms source code into executable code.",
            "Debugs the code.",
            "Designs the user interface."
        ],
        answer: 1,
        explanation: "Compilation converts human-readable code into machine code."
    }
];

/* ---------- tiny helper ---------- */
const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
    /* ---------- element cache ---------- */
    const howtoBtn = $("howto-btn");
    const quizBtn = $("quiz-btn");
    const howtoSection = $("howto-section");
    const quizSection = $("quiz-section");
    const resultSection = $("result-section");
    const questionText = $("question-text");
    const optionsList = $("options-list");
    const nextBtn = $("next-btn");
    const submitBtn = $("submit-btn");
    const scoreText = $("score-text");
    const explanations = $("explanations-list");
    const retryBtn = $("retry-btn");

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
        current = 0;
        score = 0;
        userAns = [];
        renderQ();
    }

    function renderQ() {
        const q = shuffled[current];
        questionText.textContent = `Q${current + 1}: ${q.question}`;
        optionsList.innerHTML = "";
        q.options.forEach((opt, i) => {
            const li = document.createElement("li");
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
            b.classList.toggle("selected", idx === i);
            b.classList.toggle("correct", idx === q.answer);
            b.classList.toggle("incorrect", idx === i && idx !== q.answer);
            b.disabled = true;
        });
        if (i === q.answer) score++;
        nextBtn.disabled = submitBtn.disabled = false;
    }

    function advance(isSubmit) {
        if (typeof userAns[current] === "undefined") {
            alert("Please choose an answer first.");
            return;
        }
        if (isSubmit || current === shuffled.length - 1) { showResults(); return; }
        current++; renderQ();
    }

    function showResults() {
        hide(quizSection); show(resultSection);
        scoreText.textContent = `You scored ${score} out of ${shuffled.length}.`;
        explanations.innerHTML = "";
        shuffled.forEach((q, i) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Q${i + 1}: ${q.question}</strong><br>
                Your answer: ${q.options[userAns[i] ?? "-"]}<br>
                Correct answer: ${q.options[q.answer]}<br>
                ${q.explanation}`;
            explanations.appendChild(li);
        });
    }
});
