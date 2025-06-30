const blowSound = document.getElementById('blow-sound');
const cheerSound = document.getElementById('cheer-sound');

function blowCandle(candle) {
  const flame = candle.querySelector('.flame');
  if (flame) {
    flame.remove();
    blowSound.play();
    checkAllBlown();
  }
}

function checkAllBlown() {
  const flamesLeft = document.querySelectorAll('.flame').length;
  if (flamesLeft === 0) {
    cheerSound.play();
    startConfetti();
  }
}

// Confetti effect
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti() {
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: random(0, canvas.width),
      y: random(-canvas.height, 0),
      size: random(5, 10),
      speed: random(1, 3),
      color: `hsl(${random(0, 360)}, 100%, 50%)`,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.size, c.size);
    c.y += c.speed;
    if (c.y > canvas.height) c.y = random(-100, 0);
  });
  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  createConfetti();
  drawConfetti();
}
