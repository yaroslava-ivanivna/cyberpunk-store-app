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
// Slider //
// const track = document.querySelector('.reviews-loop');
// const prev = document.querySelector('.nav-btn.prev');
// const next = document.querySelector('.nav-btn.next');
// const reviews = document.querySelectorAll('.users-reviews');

// let currentSlide = 0;
// const reviewsPerPage = 3;
// const totalSlides = Math.ceil(reviews.length / reviewsPerPage);

// function updateSlider() {
//   const width = reviews[0].offsetWidth + 24; // ширина + gap
//   track.style.transform = `translateX(-${
//     currentSlide * width * reviewsPerPage
//   }px)`;
// }

// next.addEventListener('click', () => {
//   if (currentSlide < totalSlides - 1) {
//     currentSlide++;
//     updateSlider();
//   }
// });

// prev.addEventListener('click', () => {
//   if (currentSlide > 0) {
//     currentSlide--;
//     updateSlider();
//   }
// });

const track = document.querySelector('.reviews-loop');
const cards = document.querySelectorAll('.users-reviews');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');

let currentIndex = 0;
const cardsPerView = 3;

function updateSlider() {
  const cardWidth = cards[0].offsetWidth + 24; // ширина + gap
  const offset = currentIndex * cardWidth;
  track.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - cardsPerView) {
    currentIndex++;
    updateSlider();
  } else {
    currentIndex = 0; // зациклення
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  } else {
    currentIndex = cards.length - cardsPerView; // зациклення назад
    updateSlider();
  }
});

window.addEventListener('resize', updateSlider);
updateSlider();
