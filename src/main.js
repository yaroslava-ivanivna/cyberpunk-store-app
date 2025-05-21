const canvas = document.getElementById('radiationCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 0.3,
    speedY: Math.random() * 0.5 + 0.2,
    opacity: Math.random() * 0.5 + 0.3,
    flicker: Math.random() > 0.5,
  };
}
function drawAnomalyEffect() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    10 + Math.random() * 20,
    canvas.width / 2,
    canvas.height / 2,
    200
  );
  gradient.addColorStop(0, 'rgba(0,255,136,0.2)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 5;
    ctx.fill();

    // Рух
    p.y += p.speedY;
    p.x += Math.sin(Date.now() / 1000 + p.y / 20) * 0.3;
    if (p.y > canvas.height) p.y = 0;

    // Мерехтіння
    if (p.flicker) {
      p.opacity += (Math.random() - 0.5) * 0.05;
      p.opacity = Math.max(0.1, Math.min(0.6, p.opacity));
    }
  }
}

function animate() {
  drawAnomalyEffect();
  drawParticles();
  requestAnimationFrame(animate);
}

// Старт
for (let i = 0; i < 150; i++) {
  particles.push(createParticle());
}
animate();
