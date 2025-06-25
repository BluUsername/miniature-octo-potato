// Coding Quiz Questions
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
    explanation: "Python is a programming language; HTML and CSS are markup and style languages."
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
      "<!-- -->"
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
}];

// Shuffle questions for each quiz attempt
let shuffledQuestions, currentQuestion, score, userAnswers;

// Fisher-Yates shuffle: Randomly shuffles the elements of an array in place
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// DOM Elements and Navigation setup inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('quiz-btn');
  const howtoBtn = document.getElementById('howto-btn');
  const howtoSection = document.getElementById('howto-section');
  const quizSection = document.getElementById('quiz-section');
  const resultSection = document.getElementById('result-section');
  const questionText = document.getElementById('question-text');
  const optionsList = document.getElementById('options-list');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const scoreText = document.getElementById('score-text');
  const explanationsList = document.getElementById('explanations-list');
  const retryBtn = document.getElementById('retry-btn');

  // Make these variables accessible to other functions
  window.quizElements = {
    startBtn,
    howtoBtn,
    howtoSection,
    quizSection,
    resultSection,
    questionText,
    optionsList,
    nextBtn,
    submitBtn,
  scoreText,
  explanationsList,
  retryBtn
};

// Start Quiz
function startQuiz() {
  const { howtoSection, quizSection, resultSection } = window.quizElements;
  howtoSection.style.display = 'none';
  quizSection.style.display = '';
  resultSection.style.display = 'none';
  shuffledQuestions = [...questions];
  shuffle(shuffledQuestions);
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  showQuestion();
}
// Show Question
function showQuestion() {
  const { questionText, optionsList, nextBtn, submitBtn } = window.quizElements;
  const q = shuffledQuestions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  optionsList.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(idx);
    btn.setAttribute('aria-label', opt);
    // If already answered, mark and disable
    if (typeof userAnswers[currentQuestion] !== 'undefined') {
      btn.disabled = true;
      if (idx === userAnswers[currentQuestion]) btn.classList.add('selected');
      if (idx === q.answer) btn.classList.add('correct');
      else if (idx === userAnswers[currentQuestion] && idx !== q.answer) btn.classList.add('incorrect');
    }
    li.appendChild(btn);
    optionsList.appendChild(li);
  });

  // Enable/disable navigation buttons based on answer state
  const answered = typeof userAnswers[currentQuestion] !== 'undefined';
  nextBtn.disabled = !answered;
  nextBtn.style.display = currentQuestion < shuffledQuestions.length - 1 ? '' : 'none';
  submitBtn.style.display = currentQuestion === shuffledQuestions.length - 1 ? '' : 'none';
  submitBtn.disabled = !answered;
}
  function markOptionsAfterSelection(selectedIdx) {
    const { optionsList } = window.quizElements;
    const q = shuffledQuestions[currentQuestion];
    const optionButtons = optionsList.querySelectorAll('button');
    optionButtons.forEach((b, idx) => {
      b.classList.remove('selected', 'correct', 'incorrect');
      if (idx === selectedIdx) b.classList.add('selected');
      if (idx === q.answer) b.classList.add('correct');
      else if (idx === selectedIdx && idx !== q.answer) b.classList.add('incorrect');
      b.disabled = true;
    });
  }

  function selectAnswer(selectedIdx) {
    const { nextBtn, submitBtn } = window.quizElements;
    // Remove previous score for this question before updating answer
    if (typeof userAnswers[currentQuestion] !== 'undefined') {
      const prevAnswer = userAnswers[currentQuestion];
      const q = shuffledQuestions[currentQuestion];
      if (prevAnswer === q.answer) score--;
    }
    userAnswers[currentQuestion] = selectedIdx;
    if (selectedIdx === shuffledQuestions[currentQuestion].answer) score++;
    markOptionsAfterSelection(selectedIdx);

    nextBtn.disabled = false;
    if (currentQuestion === shuffledQuestions.length - 1) {
      submitBtn.disabled = false;
    }
  }

  function handleNextQuestion() {
    currentQuestion++;
    showQuestion();
  }

  function handleSubmit() {
    showResults();
  }

  function isValidUserAnswer(idx, q) {
    return typeof userAnswers[idx] === 'number' && userAnswers[idx] >= 0 && userAnswers[idx] < q.options.length;
  }

  function showResults() {
    const { quizSection, resultSection, scoreText, explanationsList } = window.quizElements;
    quizSection.style.display = 'none';
    resultSection.style.display = '';
    scoreText.textContent = `You scored ${score} out of ${shuffledQuestions.length}.`;
    explanationsList.innerHTML = '';

    shuffledQuestions.forEach((q, idx) => {
      const li = document.createElement('li');
      let userAnswerText = isValidUserAnswer(idx, q)
        ? q.options[userAnswers[idx]]
        : 'No answer';
      li.innerHTML = `<strong>Q${idx + 1}:</strong> ${q.question}<br>
        <strong>Your answer:</strong> ${userAnswerText}<br>
        <strong>Correct answer:</strong> ${q.options[q.answer]}<br>
        <em>${q.explanation}</em>`;
      explanationsList.appendChild(li);
    });
  }

  // Event listeners
  startBtn.onclick = startQuiz;
  howtoBtn.onclick = function () {
    howtoSection.style.display = '';
    quizSection.style.display = 'none';
    resultSection.style.display = 'none';
  };
  nextBtn.onclick = handleNextQuestion;
  submitBtn.onclick = handleSubmit;
  retryBtn.onclick = startQuiz;

  // Show how-to section on load
  howtoSection.style.display = '';
  quizSection.style.display = 'none';
resultSection.style.display = 'none';})
