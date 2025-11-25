document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // Hamburger Menu Toggle
  // -------------------------
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
  });

  // -------------------------
  // Scroll Reveal Animation
  // -------------------------
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", reveal);
  reveal();


  // -------------------------
  // Certificate Slider (PERFECT STOP VERSION)
  // -------------------------
  let index = 0;

  window.moveSlide = function(step) {
    const grid = document.querySelector(".cert-grid");
    const items = document.querySelectorAll(".cert-grid img");

    if (!grid || items.length === 0) return;

    // Detect device type
    let view;
    if (window.innerWidth <= 480) view = 1;      // Mobile
    else if (window.innerWidth <= 992) view = 2; // Tablet
    else view = 3;                                // Desktop

    const total = items.length;
    const maxIndex = Math.ceil(total / view) - 1;

    // Update slide index
    index += step;
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;

    // Get actual card width
    const cardWidth = items[0].getBoundingClientRect().width;

    // Gap between items
    const gap = parseInt(getComputedStyle(grid).gap) || 0;

    let pageWidth;

    // ⭐ Exact movement for mobile (1 image fits screen width)
    if (view === 1) {
      pageWidth = cardWidth; 
    } 
    else {
      // ⭐ Desktop + Tablet use full set width
      pageWidth = (cardWidth + gap) * view;
    }

    // Apply movement
    grid.style.transform = `translateX(-${index * pageWidth}px)`;
  };

  // Reset when resizing screen
  window.addEventListener("resize", () => {
    index = 0;
    window.moveSlide(0);
  });


  // -------------------------
  // Particle Background
  // -------------------------
  const canvas = document.createElement('canvas');
  canvas.id = 'bgCanvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle animation
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5),
      dy: (Math.random() - 0.5)
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,191,0.7)';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

});
