document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language runs in the browser?",
      options: ["Python", "Java", "C++", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Hemingway", "Twain", "Shakespeare"],
      answer: "Harper Lee",
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Saturn", "Mars", "Venus"],
      answer: "Mars",
    },
    {
      question: "What’s the chemical symbol for water?",
      options: ["WO", "H2O", "HO2", "OH2"],
      answer: "H2O",
    },
    {
      question: "What year did World War II end?",
      options: ["1945", "1939", "1918", "1960"],
      answer: "1945",
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: "Pacific",
    },
    {
      question: "Which continent has the most countries?",
      options: ["Asia", "Africa", "Europe", "South America"],
      answer: "Africa",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
    {
      question: "What is the fastest land animal?",
      options: ["Cheetah", "Leopard", "Lion", "Gazelle"],
      answer: "Cheetah",
    },
  ];

  questions.sort(() => Math.random() - 0.5);

  let currentQuestion = 0;
  let score = 0;
  let time = 60;
  let interval;
  let userAnswers = new Array(questions.length).fill(null);

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const resultBox = document.getElementById("result-box");
  const scoreText = document.getElementById("score-text");
  const timerEl = document.getElementById("timer");

  function showQuestion() {
    const q = questions[currentQuestion];
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.6";

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;

      if (userAnswers[currentQuestion] === option) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";

        btn.style.outline = "2px solid #0077ff";
        btn.disabled = true;

        if (option === q.answer) {
          btn.style.backgroundColor = "#4caf50";
          btn.style.color = "#fff";
        } else {
          btn.style.opacity = "0.6";
        }
      }

      btn.addEventListener("click", () => selectAnswer(btn, q.answer));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(button, correctAnswer) {
    const selected = button.textContent;

    if (userAnswers[currentQuestion] == null) {
      if (selected === correctAnswer) {
        score++;
      }
    }

    userAnswers[currentQuestion] = selected;

    const allButtons = optionsEl.querySelectorAll("button");
    allButtons.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = "#4caf50";
        btn.style.color = "#fff";
      } else {
        btn.style.opacity = "0.6";
      }

      if (btn.textContent === selected) {
        btn.style.outline = "2px solid #0077ff";
      }
    });

    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
  }

  function showResult() {
    clearInterval(interval);
    document.getElementById("quiz-box").classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `You got ${score} out of ${questions.length} correct.`;
  }

  function startTimer() {
    interval = setInterval(() => {
      time--;
      const minutes = String(Math.floor(time / 60)).padStart(2, "0");
      const seconds = String(time % 60).padStart(2, "0");
      timerEl.textContent = `${minutes}:${seconds}`;

      if (time <= 0) {
        clearInterval(interval);
        showResult();
      }
    }, 1000);
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
    }
  });

  startTimer();
  showQuestion();
});
