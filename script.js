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

  // Close menu when a nav link is clicked
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("open");
    });
  });

  // -------------------------
  // Scroll Reveal Animation
  // -------------------------
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const threshold = window.innerWidth <= 768 ? 50 : 100; // Lower threshold on mobile for better triggering
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - threshold) {
        el.classList.add("active");
      } else {
        el.classList.remove("active"); // Allow re-triggering on scroll up/down
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


  // =========================================
  // PARTICLE NETWORK BACKGROUND ANIMATION
  // =========================================
  
  class ParticleNetwork {
    constructor(config = {}) {
      // Configuration
      this.config = {
        particleColor: config.particleColor || 'rgba(0, 255, 191, 0.8)',
        lineColor: config.lineColor || 'rgba(0, 255, 191, 0.2)',
        particleSize: config.particleSize || { min: 1.5, max: 3 },
        particleSpeed: config.particleSpeed || { min: 0.3, max: 0.8 },
        connectionDistance: config.connectionDistance || 150,
        mouseRepelDistance: config.mouseRepelDistance || 120,
        mouseRepelStrength: config.mouseRepelStrength || 2,
        particleCount: this.getParticleCount(),
        ...config
      };

      // Canvas setup
      this.canvas = document.getElementById('bgCanvas') || this.createCanvas();
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: 0, y: 0, active: false };

      this.init();
    }

    getParticleCount() {
      const width = window.innerWidth;
      if (width <= 480) return 25;      // Mobile
      if (width <= 768) return 40;      // Tablet
      if (width <= 1200) return 60;     // Laptop
      return 80;                        // Desktop
    }

    createCanvas() {
      const canvas = document.createElement('canvas');
      canvas.id = 'bgCanvas';
      canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: #0a0a0a;
      `;
      document.body.prepend(canvas);
      return canvas;
    }

    init() {
      this.resizeCanvas();
      this.createParticles();
      this.setupEventListeners();
      this.animate();
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.config.particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = this.getRandomValue(
          this.config.particleSpeed.min,
          this.config.particleSpeed.max
        );

        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: this.getRandomValue(this.config.particleSize.min, this.config.particleSize.max),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          originalVx: 0,
          originalVy: 0,
          opacity: Math.random() * 0.5 + 0.5
        });

        // Store original velocity for later
        this.particles[i].originalVx = this.particles[i].vx;
        this.particles[i].originalVy = this.particles[i].vy;
      }
    }

    getRandomValue(min, max) {
      return Math.random() * (max - min) + min;
    }

    setupEventListeners() {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.active = true;
      });

      window.addEventListener('mouseout', () => {
        this.mouse.active = false;
      });

      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.config.particleCount = this.getParticleCount();
        this.createParticles();
      });

      // Touch support for mobile
      document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
          this.mouse.active = true;
        }
      });

      document.addEventListener('touchend', () => {
        this.mouse.active = false;
      });
    }

    updateParticles() {
      this.particles.forEach((particle) => {
        // Reset to original velocity
        particle.vx = particle.originalVx;
        particle.vy = particle.originalVy;

        // Mouse repulsion
        if (this.mouse.active) {
          const dx = particle.x - this.mouse.x;
          const dy = particle.y - this.mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.config.mouseRepelDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / this.config.mouseRepelDistance) * this.config.mouseRepelStrength;
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
      });
    }

    drawParticles() {
      this.particles.forEach((particle) => {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.config.particleColor;
        this.ctx.fill();

        // Subtle glow
        this.ctx.strokeStyle = `rgba(0, 255, 191, 0.3)`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
      });
    }

    drawConnections() {
      const particleCount = this.particles.length;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.config.connectionDistance) {
            const opacity = 1 - distance / this.config.connectionDistance;
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.strokeStyle = `rgba(0, 255, 191, ${opacity * 0.3})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }
    }

    animate = () => {
      // Clear canvas
      this.ctx.fillStyle = '#0a0a0a';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Update and draw
      this.updateParticles();
      this.drawConnections();
      this.drawParticles();

      // Continue animation
      requestAnimationFrame(this.animate);
    };
  }

  // Initialize particle network
  const particleNetwork = new ParticleNetwork({
    particleColor: 'rgba(0, 255, 191, 0.8)',
    lineColor: 'rgba(0, 255, 191, 0.2)',
    particleSize: { min: 1.5, max: 3 },
    particleSpeed: { min: 0.3, max: 0.8 },
    connectionDistance: 150,
    mouseRepelDistance: 120,
    mouseRepelStrength: 2
  });

  // -------------------------
  // Marquee Skills Animation
  // -------------------------
  document.querySelectorAll('.skill-chip').forEach(ch => {
    ch.addEventListener('mouseenter', () => {
      const marquee = ch.closest('.marquee');
      if (marquee) marquee.querySelector('.track').style.animationPlayState = 'paused';
    });
    ch.addEventListener('mouseleave', () => {
      const marquee = ch.closest('.marquee');
      if (marquee) marquee.querySelector('.track').style.animationPlayState = 'running';
    });
  });

  // Adjust animation duration based on track width
  (function adjustDurations(){
    document.querySelectorAll('.marquee').forEach(m=>{
      const track = m.querySelector('.track');
      if(!track) return;
      const firstHalf = Array.from(track.children).slice(0, track.children.length/2);
      let total = 0;
      firstHalf.forEach(item=> total += item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 16));
      const pxPerSec = 75;
      const duration = Math.max(10, Math.round(total / pxPerSec));
      track.style.animationDuration = (m.classList.contains('fast') ? Math.max(8, duration*0.7) : (m.classList.contains('slow') ? duration*1.3 : duration)) + 's';
    });
  })();

});
