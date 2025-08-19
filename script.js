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
    options: ["<!-- -->", "//", "--", "#"],
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
const heroSection = document.getElementById("hero-section");
const navBar = document.getElementById("nav-bar");

// Theme elements
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const progressHeader = document.getElementById("progress-header");
const progressContext = document.getElementById("progress-context");
const progressPercentage = document.getElementById("progress-percentage");

// Quiz elements
const howtoBtn = document.getElementById("howto-btn");
const howtoQuizBtn = document.getElementById("howto-quiz-btn");
const startBtn = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");
const optionsFieldset = document.getElementById("options-fieldset");
const optionsContainer = document.getElementById("options-container");
const questionLegend = document.getElementById("question-legend");
const quizFeedback = document.getElementById("quiz-feedback");

const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const backBtn = document.getElementById("back-btn");
const scoreText = document.getElementById("score-text");
const explanationsList = document.getElementById("explanations-list");

// Legacy elements (for backward compatibility)
const progressText = document.getElementById("progress-text");
const optionsList = document.getElementById("options-list");

// =========================
// Theme Management
// =========================
function initializeTheme() {
  const savedTheme = localStorage.getItem('quiz-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let theme;
  if (savedTheme) {
    theme = savedTheme;
  } else if (prefersDark) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('quiz-theme', theme);
  
  // Update theme icon
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('quiz-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// =========================
// Focus Management
// =========================
function focusFirstOption() {
  const firstRadio = optionsContainer.querySelector('input[type="radio"]');
  if (firstRadio) {
    firstRadio.focus();
  }
}

function announceFeedback(message) {
  quizFeedback.textContent = message;
  // Clear after a delay to reset for next announcement
  setTimeout(() => {
    quizFeedback.textContent = '';
  }, 1000);
}

// =========================
// Progress Bar Functions
// =========================
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
  
  // Update progress text (legacy)
  if (progressText) {
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  }
  
  // Update new progress header
  if (progressContext) {
    progressContext.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  }
  if (progressPercentage) {
    progressPercentage.textContent = Math.round(progress) + '%';
  }
  
  // Announce progress for screen readers
  const announcement = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  announceFeedback(announcement);
}

// =========================
// Navigation Functions
// =========================
function showSection(section) {
  [homepageSection, howtoSection, quizSection, resultSection, heroSection].forEach(sec => sec.classList.add("hidden"));
  section.classList.remove("hidden");

  if (section === quizSection) {
    navBar.classList.add("hidden-nav");
    progressHeader.classList.remove("hidden");
  } else {
    navBar.classList.remove("hidden-nav");
    progressHeader.classList.add("hidden");
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
  
  // Update legend for screen readers
  questionLegend.textContent = `${current.question} - Choose your answer:`;
  
  // Clear previous options
  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    // Create radio input
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${currentQuestionIndex}`;
    input.id = `option-${currentQuestionIndex}-${index}`;
    input.value = index;
    input.checked = userAnswers[currentQuestionIndex] === index;
    
    // Create label as option card
    const label = document.createElement("label");
    label.classList.add("option-card");
    label.setAttribute("for", input.id);
    
    // Create option content
    const optionText = document.createElement("div");
    optionText.classList.add("option-text");
    
    const optionIcon = document.createElement("div");
    optionIcon.classList.add("option-icon");
    
    const textSpan = document.createElement("span");
    textSpan.textContent = option;
    
    optionText.appendChild(optionIcon);
    optionText.appendChild(textSpan);
    
    // Assemble the option
    label.appendChild(input);
    label.appendChild(optionText);
    optionsContainer.appendChild(label);
    
    // Add event listener for selection
    input.addEventListener("change", () => {
      if (input.checked) {
        selectOption(index);
      }
    });
  });

  // Update navigation buttons
  backBtn.classList.toggle("hidden", currentQuestionIndex === 0);
  nextBtn.classList.toggle("hidden", currentQuestionIndex >= questions.length - 1);
  submitBtn.classList.toggle("hidden", currentQuestionIndex < questions.length - 1);

  updateProgressBar();
  
  // Focus management - focus first option after a short delay
  setTimeout(() => {
    focusFirstOption();
  }, 100);
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  
  // Update the radio button
  const radio = document.querySelector(`input[name="question-${currentQuestionIndex}"][value="${index}"]`);
  if (radio) {
    radio.checked = true;
  }
  
  // Announce selection for screen readers
  const current = questions[currentQuestionIndex];
  const selectedOption = current.options[index];
  announceFeedback(`Selected: ${selectedOption}`);
}

function showResults() {
  // Recompute score and render results safely (no innerHTML)
  score = 0;
  explanationsList.innerHTML = "";

  questions.forEach((q, i) => {
    const selected = userAnswers[i];
    const isCorrect = selected === q.answer;
    if (isCorrect) score++;

    const li = document.createElement("li");
    li.classList.add(isCorrect ? "result-correct" : "result-incorrect");

    // Q line
    const pQ = document.createElement("p");
    const qStrong = document.createElement("strong");
    qStrong.textContent = `Q${i + 1}: `;
    pQ.appendChild(qStrong);
    pQ.appendChild(document.createTextNode(q.question));
    li.appendChild(pQ);

    // Your answer
    const pYour = document.createElement("p");
    const yourStrong = document.createElement("strong");
    yourStrong.textContent = "Your answer: ";
    pYour.appendChild(yourStrong);
    pYour.appendChild(
      document.createTextNode(selected != null ? q.options[selected] : "No answer selected")
    );
    li.appendChild(pYour);

    // Correct answer
    const pCorrect = document.createElement("p");
    const correctStrong = document.createElement("strong");
    correctStrong.textContent = "Correct answer: ";
    pCorrect.appendChild(correctStrong);
    pCorrect.appendChild(document.createTextNode(q.options[q.answer]));
    li.appendChild(pCorrect);

    // Explanation
    if (q.explanation) {
      const pExp = document.createElement("p");
      pExp.textContent = q.explanation;
      li.appendChild(pExp);
    }

    explanationsList.appendChild(li);
  });

  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
  showSection(resultSection);
}

// =========================
// Event Listeners
// =========================

// Theme toggle
themeToggle.addEventListener("click", toggleTheme);

// Navigation
howtoBtn.addEventListener("click", () => showSection(howtoSection));
howtoQuizBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", startQuiz);

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
retryBtn.addEventListener("click", () => showSection(heroSection));

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Only handle shortcuts when quiz is active and not typing in text inputs
  if (!quizSection.classList.contains("hidden") && 
      !(e.target.tagName === "INPUT" && e.target.type === "text") &&
      e.target.tagName !== "TEXTAREA") {
    
    // Handle number keys 1-4 (and potentially more)
    const num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      const current = questions[currentQuestionIndex];
      if (current && current.options[num - 1]) {
        e.preventDefault();
        selectOption(num - 1);
        // Update the radio button
        const radio = document.querySelector(`input[name="question-${currentQuestionIndex}"][value="${num - 1}"]`);
        if (radio) {
          radio.checked = true;
          radio.focus();
        }
      }
    }
    
    // Handle Enter key for Next/Submit
    if (e.key === "Enter") {
      e.preventDefault();
      if (!nextBtn.classList.contains("hidden")) {
        nextBtn.click();
      } else if (!submitBtn.classList.contains("hidden")) {
        submitBtn.click();
      }
    }
    
    // Handle Backspace for Back
    if (e.key === "Backspace") {
      e.preventDefault();
      if (!backBtn.classList.contains("hidden")) {
        backBtn.click();
      }
    }
  }
});

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
});
