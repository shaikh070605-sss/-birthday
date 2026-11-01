
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let giftOpened = false;
let candlesBlown = false;
let envelopeOpened = false;
let musicPlaying = false;

let heartTimer;
let transitionTimer;

// Screen navigation
function changeScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Music controls
async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
      musicPlaying = true;
      musicButton.innerText = "♫ Music On";
    } catch (error) {
      musicButton.innerText = "Music unavailable";
    }
  } else {
    music.pause();
    musicPlaying = false;
    musicButton.innerText = "♫ Music Off";
  }
}

// Start music after gift interaction
async function startMusic() {
  try {
    await music.play();
    musicPlaying = true;
    musicButton.innerText = "♫ Music On";
  } catch (error) {
    musicButton.innerText = "♫ Play Music";
  }
}

// Gift opening
function openGift() {
  if (giftOpened) return;

  giftOpened = true;

  document.getElementById("gift").classList.add("open");

  startMusic();

  createConfetti(70);

  transitionTimer = setTimeout(() => {
    changeScreen("birthday");
  }, 1300);
}

// Blow out candles
function blowCandles() {
  if (candlesBlown) return;

  candlesBlown = true;

  document.querySelectorAll(".flame").forEach((flame, index) => {
    setTimeout(() => {
      flame.classList.add("off");
    }, index * 300);
  });

  document.getElementById("wishText").innerText =
    "Your wish has been sent to the universe! ✨💗";

  document.getElementById("blowButton").innerText =
    "Wish Made! 💖";

  createConfetti(50);
}

// Go to envelope screen
function showLetter() {
  changeScreen("envelopeScreen");
}

// Open envelope animation
function openLetter() {
  if (envelopeOpened) return;

  envelopeOpened = true;

  document.getElementById("envelope").classList.add("open");

  setTimeout(() => {
    changeScreen("letterScreen");
  }, 1600);
}

// Final screen
function showFinal() {
  changeScreen("final");
  createConfetti(90);
}

// Restart complete experience
function restart() {
  giftOpened = false;
  candlesBlown = false;
  envelopeOpened = false;

  clearTimeout(transitionTimer);

  document.getElementById("gift").classList.remove("open");
  document.getElementById("envelope").classList.remove("open");

  document.querySelectorAll(".flame").forEach(flame => {
    flame.classList.remove("off");
  });

  document.getElementById("wishText").innerText =
    "Close your eyes, make a wish and blow the candles! 🕯️";

  document.getElementById("blowButton").innerText =
    "Blow the Candles 🌬️";

  document.getElementById("confetti").innerHTML = "";

  changeScreen("welcome");
}

// Floating hearts and stars
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

heartTimer = setInterval(createParticle, 650);

// Confetti
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
