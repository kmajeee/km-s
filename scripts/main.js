/**
 * SHEIK ABDUL MAJEETH K M — PORTFOLIO CLIENT LOGIC
 * Dynamic Parallax, Badge Interactions, Project Modals, Particle Engine & Theme Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initSkillTabs();
  initProjectModals();
  initParticles();
  initCardSpotlight();
  initScrollReveal();
  initCounterUp();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Cyber Dark' : 'Clean Studio Light'} Mode`);
    });
  }
}

/* ==========================================================================
   2. TYPING EFFECT FOR HERO ROLE
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const phrases = [
    "Robotics & Autonomous Systems",
    "Cross-Platform Flutter Apps",
    "NVIDIA Isaac & Jetson Pipelines",
    "Published AI Retail Technology",
    "Cyber-Physical IoT Devices"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 90;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400;
    }

    setTimeout(typeLoop, typingDelay);
  }

  typeLoop();
}


/* ==========================================================================
   5. NAVBAR SCROLL & ACTIVE SPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
      }
    });
  }
}

/* ==========================================================================
   7. SKILL CATEGORY TABS
   ========================================================================== */
function initSkillTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. PROJECT DEEP DIVE MODALS
   ========================================================================== */
const projectDetails = {
  'smart-trolley': {
    title: 'Smart Trolley — AI-Enabled Voice Billing & Security System',
    subtitle: 'Published Research & Maldives SMART 25 Award Winner',
    category: 'Robotics &bull; Embedded IoT &bull; Flutter &bull; Firebase',
    description: `
      <p>The Smart Trolley is an autonomous cyber-physical retail cart designed to eliminate long checkout queues and prevent retail theft. Integrated with a Flutter application, NFC, RFID, weight verification sensors, and speech recognition, it enables instant scanning, automated billing, and live cart weight verification.</p>
      
      <h4 style="margin: 20px 0 10px; color: var(--accent-cyan); font-size: 1.1rem;">Key Engineering Highlights</h4>
      <ul style="list-style: disc; padding-left: 20px; line-height: 1.7; color: var(--text-secondary); margin-bottom: 20px;">
        <li><strong>Dual-Verification Anti-Theft:</strong> Interfaced load cells via HX711 amplifier with Arduino/ESP32. Discrepancies between scanned barcode weight and physical basket weight trigger immediate audit alerts.</li>
        <li><strong>Speech Recognition & Voice Billing:</strong> Integrated mobile voice commands allowing hands-free item search, category navigation, and voice-assisted checkout.</li>
        <li><strong>Real-time Cloud Sync:</strong> Firebase Firestore synchronizes active cart sessions, allowing managers to monitor store inventory, footfall patterns, and transaction status in real-time.</li>
        <li><strong>Child Safety Geofencing:</strong> Triangulated BLE RSSI beacons to track cart locations within the supermarket perimeter, triggering notifications if carts stray beyond boundaries.</li>
      </ul>

      <h4 style="margin: 20px 0 10px; color: var(--accent-cyan); font-size: 1.1rem;">Hardware & Software Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
        <span class="chip chip-accent">Flutter</span>
        <span class="chip chip-accent">Dart</span>
        <span class="chip">Firebase Firestore</span>
        <span class="chip">ESP32-S3 / Arduino</span>
        <span class="chip">Load Cell + HX711</span>
        <span class="chip">RFID / NFC</span>
        <span class="chip">BLE Beacons</span>
        <span class="chip">Speech API</span>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 10px;">
        <a href="#research" class="btn btn-primary btn-sm modal-action-btn">View Research Paper Details</a>
      </div>
    `
  },
  'rydr': {
    title: 'Rydr — Real-Time Group Cycling Navigation App',
    subtitle: 'High-Precision Pelotons & Distance Cycling Telemetry',
    category: 'Mobile Dev &bull; Real-time GPS &bull; Cloud Backend',
    description: `
      <p>Rydr is a cross-platform Flutter application engineered for cycling groups and peloton teams who require synchronized route planning, live teammate telemetry, pace pacing, and emergency beacon capabilities.</p>

      <h4 style="margin: 20px 0 10px; color: var(--accent-cyan); font-size: 1.1rem;">Key Engineering Highlights</h4>
      <ul style="list-style: disc; padding-left: 20px; line-height: 1.7; color: var(--text-secondary); margin-bottom: 20px;">
        <li><strong>Sub-second Group Synchronization:</strong> Real-time GPS coordinate broadcasting allowing teammates to view each other's pace, relative position, and sprint gaps.</li>
        <li><strong>Offline Map Caching:</strong> Integrated SQLite local storage to preserve offline route topologies and elevation data in rural or low-cellular areas.</li>
        <li><strong>Hazard Warning Network:</strong> Peer-to-peer route alerts for road obstacles, steep gradients, and weather changes.</li>
        <li><strong>Energy-Optimized Background Location:</strong> Custom Flutter background service keeping GPS polling efficient to conserve device battery during 100km+ rides.</li>
      </ul>

      <h4 style="margin: 20px 0 10px; color: var(--accent-cyan); font-size: 1.1rem;">Technology Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
        <span class="chip chip-accent">Flutter</span>
        <span class="chip chip-accent">Google Cloud</span>
        <span class="chip">Geolocation API</span>
        <span class="chip">WebSockets</span>
        <span class="chip">SQLite Local DB</span>
        <span class="chip">REST APIs</span>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 10px;">
        <a href="https://github.com/kmajeee" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Visit GitHub Profile</a>
      </div>
    `
  },
  'fakex': {
    title: 'FakeX — Fake Certification Detection (Mobile + Web Prototype)',
    subtitle: 'Computer Vision & Optical Security Verification',
    category: 'Computer Vision &bull; Flutter &bull; React.js &bull; Python',
    description: `
      <p>FakeX combats academic fraud and counterfeit professional credentials by coupling mobile optical scanning with centralized cryptographic verification algorithms.</p>

      <h4 style="margin: 20px 0 10px; color: var(--accent-cyan); font-size: 1.1rem;">Key Engineering Highlights</h4>
      <ul style="list-style: disc; padding-left: 20px; line-height: 1.7; color: var(--text-secondary); margin-bottom: 20px;">
        <li><strong>Unified Ecosystem:</strong> Mobile scanner built in Flutter for field officers, paired with a web validation dashboard built in React.js for university registrars.</li>
        <li><strong>Optical Watermark & Stamp Verification:</strong> Computer vision pipelines identifying digital manipulation, pixel inconsistencies, and signature anomalies.</li>
        <li><strong>Cryptographic Hashes:</strong> Validates document authenticity against tamper-proof registry databases in MongoDB.</li>
        <li><strong>Zero-Latency Inference:</strong> Optimized models allowing instant scanning without cloud round-trip delays.</li>
      </ul>

      <h4 style="margin: 20px 0 10px; color: var(--accent-cyan); font-size: 1.1rem;">Technology Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
        <span class="chip chip-accent">Flutter</span>
        <span class="chip chip-accent">React.js</span>
        <span class="chip">Python</span>
        <span class="chip">OpenCV / ML</span>
        <span class="chip">MongoDB</span>
        <span class="chip">REST APIs</span>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 10px;">
        <a href="https://github.com/kmajeee" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Explore Code on GitHub</a>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="proj-category" style="margin-bottom: 8px; display: block;">${data.category}</span>
      <h2 style="font-size: 1.65rem; font-weight: 800; line-height: 1.25; margin-bottom: 6px; color: var(--text-primary);">${data.title}</h2>
      <div style="font-size: 0.9rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 20px;">${data.subtitle}</div>
      <div style="line-height: 1.65; color: var(--text-secondary);">${data.description}</div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook internal links inside modal
    const actionLinks = modalContent.querySelectorAll('.modal-action-btn');
    actionLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeModal();
      });
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-target');
      openModal(target);
    });
  });

  // Clicking on project media also opens modal
  projectCards.forEach(card => {
    const visual = card.querySelector('.project-media');
    const id = card.getAttribute('data-project-id');
    if (visual && id) {
      visual.addEventListener('click', () => openModal(id));
      visual.style.cursor = 'pointer';
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-cyan); flex-shrink: 0;">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 14 14"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   10. INTERACTIVE PARTICLE NEURAL NETWORK
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width > 768 ? 55 : 25, 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      baseRadius: Math.random() * 1.6 + 0.8,
      radius: Math.random() * 1.6 + 0.8,
      pulse: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const baseColor = isDark ? '0, 229, 255' : '2, 132, 199';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Subtle breathing pulse
      p.pulse += 0.03;
      p.radius = p.baseRadius + Math.sin(p.pulse) * 0.35;

      // Mouse interactive attraction & tethering
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;

          // Connect particle to cursor
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${baseColor}, ${0.28 * force})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle circle with luminous core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${isDark ? 0.65 : 0.45})`;
      ctx.fill();

      // Inter-particle neural network links
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * (isDark ? 0.16 : 0.1);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   11. DYNAMIC CARD SPOTLIGHT
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.glass-panel, .metric-card, .project-card, .skill-category-card, .contact-hub-card, .education-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   11. SCROLL REVEAL INTERSECTION OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item, .project-card, .skill-category-card, .timeline-item, .about-card, .about-highlights-card, .research-showcase, .education-card, .contact-card, .contact-form');

  revealElements.forEach(el => {
    el.classList.add('reveal-item');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   12. NUMBER COUNTER UP ANIMATION
   ========================================================================== */
function initCounterUp() {
  const counterElements = document.querySelectorAll('.count-up');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1600; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeOut * target;

          el.textContent = currentVal.toFixed(decimals);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toFixed(decimals);
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counterElements.forEach(el => observer.observe(el));
}

