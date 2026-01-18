document.querySelector(".search-box button").addEventListener("click", () => {
  alert("Search feature coming soon!");
});

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const obstacles = document.querySelectorAll(".hero, section, header, nav");

/* Resize */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* Particle Class */
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(100, 170, 255, 0.8)";
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    /* Bounce from walls */
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    /* Bounce from sections */
    obstacles.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (
        this.x > rect.left &&
        this.x < rect.right &&
        this.y > rect.top &&
        this.y < rect.bottom
      ) {
        this.vx *= -1;
        this.vy *= -1;
      }
    });

    this.draw();
  }
}

/* Create particles */
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

/* Animate */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

animate();


