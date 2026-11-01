
// =====================================
// SADIYA BIRTHDAY WEBSITE - VERSION 4
// =====================================

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let giftOpened = false;
let candlesBlown = false;
let envelopeOpened = false;
let secretOpened = false;

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

let fireworksActive = false;
let fireworksFrame = null;

const screens = document.querySelectorAll(".screen");

// =====================================
// SCREEN NAVIGATION
// =====================================

function changeScreen(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================================
// MUSIC
// =====================================

async function startMusic() {
  try {
    await music.play();
    musicButton.innerText = "♫ Music On";
  } catch (error) {
    musicButton.innerText = "♫ Play Music";
  }
}

async function toggleMusic() {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    musicButton.innerText = "♫ Play Music";
  }
}

// =====================================
// GIFT OPENING
// =====================================

function openGift() {
  if (giftOpened) return;

  giftOpened = true;

  document.getElementById("gift").classList.add("open");

  startMusic();
  createConfetti(70);

  setTimeout(() => {
    changeScreen("birthday");
  }, 1200);
}

// =====================================
// BLOW CANDLES
// =====================================

function blowCandles() {
  if (candlesBlown) return;

  candlesBlown = true;

  document.querySelectorAll(".flame").forEach((flame, index) => {
    setTimeout(() => {
      flame.classList.add("off");
    }, index * 250);
  });

  document.getElementById("wishText").innerText =
    "Your wish has been sent to the universe! ✨💗";

  document.getElementById("blowButton").innerText =
    "Wish Made! 💖";

  createConfetti(50);
}

// =====================================
// ENVELOPE
// =====================================

function showLetter() {
  changeScreen("envelopeScreen");
}

function openLetter() {
  if (envelopeOpened) return;

  envelopeOpened = true;

  document.getElementById("envelope").classList.add("open");

  setTimeout(() => {
    changeScreen("letterScreen");
  }, 1300);
}

// =====================================
// FRIENDSHIP QUIZ
// =====================================

// Edit these questions and answers
// according to your real friendship.

const quizQuestions = [
  {
    question: "What makes a friendship truly special?",
    options: [
      "Trust and understanding 💗",
      "Only expensive gifts 🎁",
      "Competing with each other 🏆",
      "Talking only when needed 📱"
    ],
    answer: 0,
    message: "Yes! Trust and understanding make friendship beautiful! 💕"
  },
  {
    question: "What is the best thing to share with a best friend?",
    options: [
      "Only secrets 🤫",
      "Happy and difficult moments 🥹",
      "Only birthday gifts 🎂",
      "Nothing at all 😄"
    ],
    answer: 1,
    message: "Exactly! Being there in every moment matters! ❤️"
  },
  {
    question: "What should never disappear from our friendship?",
    options: [
      "Trust and respect 💖",
      "Small arguments 😜",
      "Competition 🏁",
      "Silence forever 🤐"
    ],
    answer: 0,
    message: "Absolutely! May our friendship always stay beautiful! 🌸"
  }
];

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;

  changeScreen("quizScreen");
  loadQuestion();
}

function loadQuestion() {
  const question = quizQuestions[quizIndex];

  quizAnswered = false;

  document.getElementById("questionCount").innerText =
    `Question ${quizIndex + 1} of ${quizQuestions.length}`;

  document.getElementById("quizQuestion").innerText =
    question.question;

  document.getElementById("quizProgress").style.width =
    `${(quizIndex / quizQuestions.length) * 100}%`;

  document.getElementById("quizFeedback").innerText = "";

  const optionsContainer = document.getElementById("quizOptions");

  optionsContainer.innerHTML = "";

  document.getElementById("nextQuestionButton").hidden = true;

  question.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.className = "quiz-option";
    button.type = "button";
    button.innerText = option;

    button.addEventListener("click", () => {
      selectAnswer(index, button);
    });

    optionsContainer.appendChild(button);
  });
}

function selectAnswer(index, selectedButton) {
  if (quizAnswered) return;

  quizAnswered = true;

  const question = quizQuestions[quizIndex];

  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach(button => {
    button.disabled = true;
  });

  selectedButton.classList.add("selected");

  if (index === question.answer) {
    quizScore++;

    document.getElementById("quizFeedback").innerText =
      "Correct! " + question.message;

    createConfetti(20);
  } else {
    document.getElementById("quizFeedback").innerText =
      "Nice try! " + question.message;
  }

  document.getElementById("quizProgress").style.width =
    `${((quizIndex + 1) / quizQuestions.length) * 100}%`;

  const nextButton = document.getElementById("nextQuestionButton");

  nextButton.hidden = false;

  nextButton.innerText =
    quizIndex === quizQuestions.length - 1
      ? "See My Result 💗"
      : "Next Question →";
}

function nextQuestion() {
  if (!quizAnswered) return;

  quizIndex++;

  if (quizIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  document.getElementById("quizScore").innerText =
    `Your score: ${quizScore}/${quizQuestions.length}`;

  changeScreen("quizResult");

  createConfetti(60);
}

// =====================================
// FINAL SCREEN
// =====================================

function showFinal() {
  changeScreen("final");

  startFireworks();
  createConfetti(70);
}

// =====================================
// SECRET SURPRISE
// =====================================

function revealSecret() {
  if (secretOpened) return;

  secretOpened = true;

  const message = document.getElementById("secretMessage");

  message.hidden = false;

  document.getElementById("secretButton").innerText =
    "Your Secret Surprise is Opened 💗";

  createConfetti(100);

  message.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// =====================================
// FLOATING HEARTS
// =====================================

const particles = document.getElementById("particles");

function createParticle() {
  const particle = document.createElement("span");

  particle.className = "particle";

  const symbols = ["💗", "💕", "✨", "🌸", "💖", "⭐"];

  particle.innerText =
    symbols[Math.floor(Math.random() * symbols.length)];

  particle.style.left = Math.random() * 100 + "vw";

  particle.style.fontSize =
    (12 + Math.random() * 20) + "px";

  const duration = 5 + Math.random() * 6;

  particle.style.animationDuration = duration + "s";

  particles.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

setInterval(createParticle, 650);

// =====================================
// CONFETTI
// =====================================

function createConfetti(amount = 50) {
  const container = document.getElementById("confetti");

  const symbols = ["💗", "✨", "🌸", "💕", "🎉", "⭐"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.innerText =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "vw";

    piece.style.animationDuration =
      (3 + Math.random() * 4) + "s";

    piece.style.animationDelay =
      Math.random() * 1.5 + "s";

    piece.style.fontSize =
      (12 + Math.random() * 20) + "px";

    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 8500);
}

// =====================================
// FIREWORKS ANIMATION
// =====================================

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let fireworks = [];
let particlesList = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Firework {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight + 10;

    this.targetY = 80 + Math.random() * window.innerHeight * 0.45;

    this.speed = 5 + Math.random() * 3;
    this.exploded = false;

    this.color = [
      "#ff75b5",
      "#ffd166",
      "#c8a2ff",
      "#ffffff",
      "#ff9cce"
    ][Math.floor(Math.random() * 5)];
  }

  update() {
    this.y -= this.speed;

    if (this.y <= this.targetY) {
      this.exploded = true;
      explode(this.x, this.y, this.color);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class FireworkParticle {
  constructor(x, y, color) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;

    this.x = x;
    this.y = y;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.alpha = 1;
    this.color = color;
    this.radius = Math.random() * 2.5 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.vy += 0.045;

    this.alpha -= 0.014;
  }

  draw() {
    ctx.globalAlpha = Math.max(0, this.alpha);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

function explode(x, y, color) {
  for (let i = 0; i < 65; i++) {
    particlesList.push(new FireworkParticle(x, y, color));
  }
}

function animateFireworks() {
  if (!fireworksActive) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (Math.random() < 0.055) {
    fireworks.push(new Firework());
  }

  fireworks.forEach(firework => {
    firework.update();

    if (!firework.exploded) {
      firework.draw();
    }
  });

  fireworks = fireworks.filter(firework => !firework.exploded);

  particlesList.forEach(particle => {
    particle.update();
    particle.draw();
  });

  particlesList = particlesList.filter(
    particle => particle.alpha > 0
  );

  fireworksFrame = requestAnimationFrame(animateFireworks);
}

function startFireworks() {
  stopFireworks();

  canvas.style.display = "block";

  fireworksActive = true;

  fireworks = [];
  particlesList = [];

  animateFireworks();
}

function stopFireworks() {
  fireworksActive = false;

  if (fireworksFrame !== null) {
    cancelAnimationFrame(fireworksFrame);
    fireworksFrame = null;
  }

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  canvas.style.display = "none";

  fireworks = [];
  particlesList = [];
}

// =====================================
// RESTART EXPERIENCE
// =====================================

function restart() {
  stopFireworks();

  giftOpened = false;
  candlesBlown = false;
  envelopeOpened = false;
  secretOpened = false;

  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;

  document.getElementById("gift").classList.remove("open");

  document.getElementById("envelope").classList.remove("open");

  document.querySelectorAll(".flame").forEach(flame => {
    flame.classList.remove("off");
  });

  document.getElementById("wishText").innerText =
    "Close your eyes, make a wish and blow the candles! 🕯️";

  document.getElementById("blowButton").innerText =
    "Blow the Candles 🌬️";

  document.getElementById("secretMessage").hidden = true;

  document.getElementById("secretButton").innerText =
    "🎁 Open Your Secret Surprise";

  document.getElementById("confetti").innerHTML = "";

  document.getElementById("quizOptions").innerHTML = "";

  document.getElementById("quizFeedback").innerText = "";

  document.getElementById("quizProgress").style.width = "0%";

  document.getElementById("nextQuestionButton").hidden = true;

  changeScreen("welcome");
}
