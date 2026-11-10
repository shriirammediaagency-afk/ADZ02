/**
 * ADZINOX PRIVATE LIMITED — MAIN JAVASCRIPT
 * Animations: GSAP + ScrollTrigger | Three.js background
 * Custom cursor | Smooth scroll | Magnetic buttons
 * Counters | Slider | FAQ | Forms | Chatbot
 */

/* ===================================================================
   0. WAIT FOR DOM
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // ── Init order ──
  initPreloader();
  initCustomCursor();
  initThreeBackground();
  initNavbar();
  initHeroAnimations();
  initScrollAnimations();
  initMagneticButtons();
  initPortfolioFilter();
  initPortfolioModal();
  initTestimonialsSlider();
  initCounters();
  initFAQ();
  initForms();
  initChatbot();
  initCookieBanner();
  initBackToTop();
  initMarquee();
  initSmoothScroll();
  initThemeToggle();
  initMobileNav();
});

/* ===================================================================
   1. PRELOADER
   =================================================================== */
function initPreloader() {
  const preloader   = document.getElementById('preloader');
  const logoEl      = preloader?.querySelector('.preloader-logo');
  const fillEl      = preloader?.querySelector('.preloader-fill');
  const textEl      = preloader?.querySelector('.preloader-text');
  if (!preloader) return;

  document.body.classList.add('loading');
  let progress = 0;
  const messages = ['Initialising systems...', 'Loading assets...', 'Crafting experience...', 'Almost there...'];
  let msgIdx = 0;

  // Animate logo in
  gsap.to(logoEl, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress > 100) progress = 100;

    gsap.to(fillEl, { width: `${progress}%`, duration: 0.4, ease: 'power2.out' });

    if (msgIdx < messages.length && progress > msgIdx * 25) {
      if (textEl) textEl.textContent = messages[msgIdx++];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        gsap.timeline()
          .to(logoEl, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
          .to(preloader, {
            opacity: 0, duration: 0.6, ease: 'power2.inOut',
            onComplete: () => {
              preloader.remove();
              document.body.classList.remove('loading');
              animateHeroIn();
            }
          }, '-=0.1');
      }, 400);
    }
  }, 120);
}

/* ===================================================================
   2. CUSTOM CURSOR
   =================================================================== */
function initCustomCursor() {
  const dot     = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline || window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
  });

  function trackOutline() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    gsap.set(outline, { x: outX, y: outY });
    requestAnimationFrame(trackOutline);
  }
  trackOutline();

  // Hover states
  const hoverEls = document.querySelectorAll('a, button, .service-card, .portfolio-item, .team-card, .filter-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });

  document.addEventListener('mouseleave', () => {
    gsap.to([dot, outline], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to([dot, outline], { opacity: 1, duration: 0.3 });
  });
}

/* ===================================================================
   3. THREE.JS BACKGROUND
   =================================================================== */
function initThreeBackground() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Particle system
  const COUNT = 1800;
  const positions = new Float32Array(COUNT * 3);
  const colors    = new Float32Array(COUNT * 3);

  const palette = [
    new THREE.Color('#00f5ff'),
    new THREE.Color('#7c3aed'),
    new THREE.Color('#e040fb'),
    new THREE.Color('#ffffff'),
  ];

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

    const col = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Floating wireframe geometries
  const meshes = [];
  const geoTypes = [
    new THREE.IcosahedronGeometry(0.5, 0),
    new THREE.OctahedronGeometry(0.4, 0),
    new THREE.TetrahedronGeometry(0.45, 0),
  ];

  const wireColors = [0x00f5ff, 0x7c3aed, 0xe040fb];

  for (let i = 0; i < 6; i++) {
    const wMat = new THREE.MeshBasicMaterial({
      color: wireColors[i % wireColors.length],
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const mesh = new THREE.Mesh(geoTypes[i % geoTypes.length], wMat);
    mesh.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4 - 1
    );
    mesh.userData = { rx: Math.random() * 0.01, ry: Math.random() * 0.01, floatAmp: Math.random() * 0.3, floatFreq: Math.random() * 0.5 + 0.3, baseY: mesh.position.y };
    scene.add(mesh);
    meshes.push(mesh);
  }

  // Mouse parallax
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.8;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;

    curX += (targetX - curX) * 0.04;
    curY += (targetY - curY) * 0.04;

    particles.rotation.y = t * 0.06 + curX * 0.3;
    particles.rotation.x = curY * 0.2;

    meshes.forEach(m => {
      m.rotation.x += m.userData.rx;
      m.rotation.y += m.userData.ry;
      m.position.y = m.userData.baseY + Math.sin(t * m.userData.floatFreq) * m.userData.floatAmp;
    });

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ===================================================================
   4. NAVBAR
   =================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!navbar) return;

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNavLink();
  }, { passive: true });

  // Active link tracking
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }
}

/* ===================================================================
   5. MOBILE NAV
   =================================================================== */
function initMobileNav() {
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===================================================================
   6. HERO ANIMATIONS
   =================================================================== */
function initHeroAnimations() {
  // Will be called after preloader exits
}

function animateHeroIn() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-badge',    { opacity: 1, y: 0, duration: 0.6 })
    .to('.hero-title',    { opacity: 1, duration: 0.8 }, '-=0.2')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('.hero-ctas',     { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .to('.hero-stats',    { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to('.scroll-indicator', { opacity: 1, duration: 0.5 }, '-=0.1');

  // Kinetic word animation
  const words = document.querySelectorAll('.hero-title .word');
  words.forEach((word, i) => {
    gsap.from(word, {
      y: 60, opacity: 0, duration: 0.8,
      delay: 0.3 + i * 0.1, ease: 'power3.out'
    });
  });
}

/* ===================================================================
   7. SCROLL ANIMATIONS (GSAP ScrollTrigger)
   =================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // Stagger children
  gsap.utils.toArray('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('[data-stagger-item]');
    gsap.from(children, {
      opacity: 0, y: 32, stagger: 0.12, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: parent, start: 'top 85%' }
    });
  });

  // Parallax sections
  gsap.utils.toArray('[data-parallax]').forEach(el => {
    gsap.to(el, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

/* ===================================================================
   8. MAGNETIC BUTTONS
   =================================================================== */
function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach(wrap => {
    const btn = wrap.querySelector('.btn');
    if (!btn) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });

    wrap.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' });
    });
  });
}

/* ===================================================================
   9. PORTFOLIO FILTER
   =================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        gsap.to(item, {
          opacity: match ? 1 : 0,
          scale: match ? 1 : 0.92,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => { item.style.pointerEvents = match ? 'auto' : 'none'; }
        });
      });
    });
  });
}

/* ===================================================================
   10. PORTFOLIO MODAL
   =================================================================== */
const portfolioData = {
  'brand-id':    { cat: 'Branding', title: 'Nexus Brand Identity', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=860&q=80', challenge: 'A B2B SaaS startup needed a powerful brand identity that conveyed trust, innovation, and scalability to enterprise clients in a crowded market.', solution: 'We developed a comprehensive brand system — logo, color palette, typography, voice guidelines, and an immersive brand book — grounded in the concept of "connected intelligence."', results: [{ val: '+340%', label: 'Brand recall' }, { val: '2.8×', label: 'Investor pitch success' }, { val: '#1', label: 'Industry perception' }] },
  'digital-mkt': { cat: 'Digital Marketing', title: 'Surge E-Commerce Campaign', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=860&q=80', challenge: 'An e-commerce brand was struggling with a 3.2% conversion rate and ₹220 CPL on Meta and Google, burning budget with minimal ROI.', solution: 'We rebuilt the full funnel — audience segmentation, creative A/B testing, landing page CRO, and retargeting sequences — resulting in a data-driven performance engine.', results: [{ val: '₹42 CPL', label: '↓ 81% cost reduction' }, { val: '9.7%', label: 'Conversion rate' }, { val: '620%', label: 'ROAS achieved' }] },
  'video-prod':  { cat: 'Video Production', title: 'Cinematic Launch Film', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=860&q=80', challenge: 'A premium lifestyle brand needed a 90-second launch film for OTT and Instagram that would generate organic buzz and position them as a luxury-tier player.', solution: 'Conceptualised and produced a 5-day shoot across three cities with drone coverage, colour grading, and original music composition — all in-house.', results: [{ val: '4.2M+', label: 'Organic views' }, { val: '88K', label: 'Shares in 48hrs' }, { val: '12 sec', label: 'Avg watch time jump' }] },
  'ooh-print':   { cat: 'OOH / Print', title: 'Metro OOH Domination', img: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=860&q=80', challenge: 'A real estate developer wanted to dominate the awareness phase in three tier-1 cities before launch — with zero digital spend.', solution: 'A 14-day OOH blitz across 62 prime hoardings, metro wraps, and airport panels using a single iconic visual with minimal copy — engineered for maximum recall.', results: [{ val: '62', label: 'Hoardings live' }, { val: '3 Cities', label: 'Simultaneous' }, { val: '14M+', label: 'Estimated eyeballs' }] },
  'social-smm':  { cat: 'Social Media', title: 'D2C Brand Social Growth', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=860&q=80', challenge: 'A D2C skincare brand had 3,400 Instagram followers with low engagement and no brand story. They needed to go from invisible to influential.', solution: 'Full social overhaul: new content strategy, reel templates, 30-day content calendar, influencer seeding, and community management protocol.', results: [{ val: '0→68K', label: 'Instagram followers' }, { val: '11.3%', label: 'Avg engagement rate' }, { val: '₹0 paid', label: 'Fully organic' }] },
  'web-dev':     { cat: 'Web & App', title: 'FinTech Platform UI/UX', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=860&q=80', challenge: 'A fintech startup needed a web + mobile UI that would pass SEBI compliance review while feeling premium and user-friendly to retail investors.', solution: 'From wireframes to Figma design system to full React + Node.js development — we built a compliant, accessible, and beautifully crafted investment platform.', results: [{ val: '96', label: 'Lighthouse score' }, { val: '1.8s', label: 'LCP performance' }, { val: '100K+', label: 'Users onboarded' }] },
};

function initPortfolioModal() {
  const overlay = document.getElementById('portfolioModal');
  if (!overlay) return;

  document.querySelectorAll('.portfolio-item[data-project]').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.project;
      const data = portfolioData[key];
      if (!data) return;

      overlay.querySelector('.modal-img').src   = data.img;
      overlay.querySelector('.modal-img').alt   = data.title;
      overlay.querySelector('.modal-cat').textContent = data.cat;
      overlay.querySelector('.modal-title').textContent = data.title;
      overlay.querySelector('.modal-challenge').textContent = data.challenge;
      overlay.querySelector('.modal-solution').textContent  = data.solution;

      const statsEl = overlay.querySelector('.modal-grid');
      statsEl.innerHTML = data.results.map(r => `
        <div class="modal-stat">
          <div class="modal-stat-val">${r.val}</div>
          <div class="modal-stat-label">${r.label}</div>
        </div>`).join('');

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  overlay.querySelector('.modal-close')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* ===================================================================
   11. TESTIMONIALS SLIDER
   =================================================================== */
function initTestimonialsSlider() {
  const track  = document.querySelector('.testimonials-track');
  const dots   = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');
  if (!track) return;

  const cards   = track.querySelectorAll('.testimonial-card');
  const total   = Math.ceil(cards.length / getVisible());
  let current   = 0;

  function getVisible() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function go(idx) {
    const vis  = getVisible();
    const max  = Math.max(0, Math.ceil(cards.length / vis) - 1);
    current    = Math.max(0, Math.min(idx, max));
    const pct  = current * (100 / vis) * vis;

    // We shift by number of visible cards * current index
    const cardW = track.parentElement.offsetWidth / vis;
    gsap.to(track, { x: -(cardW + 24) * vis * current, duration: 0.6, ease: 'power3.out' });

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => go(current - 1));
  nextBtn?.addEventListener('click', () => go(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

  // Auto-play
  let autoPlay = setInterval(() => go(current + 1 > Math.ceil(cards.length / getVisible()) - 1 ? 0 : current + 1), 5000);
  track.parentElement?.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.parentElement?.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => go(current + 1 > Math.ceil(cards.length / getVisible()) - 1 ? 0 : current + 1), 5000);
  });

  window.addEventListener('resize', () => go(0));
}

/* ===================================================================
   12. ANIMATED COUNTERS
   =================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length || typeof gsap === 'undefined') return;

  counters.forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals || 0;

    ScrollTrigger?.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = prefix + parseFloat(this.targets()[0].val).toFixed(decimals) + suffix;
          }
        });
      }
    });
  });
}

/* ===================================================================
   13. FAQ ACCORDION
   =================================================================== */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ===================================================================
   14. FORMS (Quote + Contact + Apply)
   =================================================================== */
function initForms() {
  // Quote form
  handleForm('quoteForm', 'quoteSuccess');
  // Contact form
  handleForm('contactForm', 'contactSuccess');
  // Newsletter form
  handleForm('newsletterForm', 'newsletterSuccess');
  // Apply form
  handleForm('applyForm', 'applySuccess');
}

function handleForm(formId, successId) {
  const form    = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
      form.reset();
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
        gsap.from(success, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
      }
    }, 1800);
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const wrap = field.closest('.form-group');
    const isEmail = field.type === 'email';
    const isPhone = field.type === 'tel';
    const empty = !field.value.trim();
    const badEmail = isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    const badPhone = isPhone && !/^\+?[\d\s\-]{10,}$/.test(field.value);

    const err = wrap?.querySelector('.form-error');
    if (err) err.remove();

    if (empty || badEmail || badPhone) {
      valid = false;
      field.style.borderColor = '#f87171';
      const msg = document.createElement('span');
      msg.className = 'form-error';
      msg.style.cssText = 'font-size:12px;color:#f87171;margin-top:4px;display:block;';
      msg.textContent = empty ? 'This field is required.' : (badEmail ? 'Enter a valid email.' : 'Enter a valid phone number.');
      wrap?.appendChild(msg);
    } else {
      field.style.borderColor = '';
    }
  });
  return valid;
}

/* ===================================================================
   15. CHATBOT WIDGET
   =================================================================== */
function initChatbot() {
  const trigger = document.querySelector('.chatbot-trigger');
  const panel   = document.querySelector('.chatbot-panel');
  const closeBtn = document.querySelector('.chatbot-close');
  const input   = document.querySelector('.chatbot-input');
  const sendBtn = document.querySelector('.chatbot-send');
  const msgs    = document.querySelector('.chatbot-messages');
  if (!trigger || !panel) return;

  const responses = {
    'services':     'We offer 11 core services including Brand Strategy, Digital Marketing, Video Production, Influencer Marketing, OOH Advertising, and AI-driven Analytics. Which service interests you most?',
    'pricing':      'Our packages start from ₹15,000/month (Starter) to ₹75,000/month (Enterprise). We also offer fully custom quotes. Would you like a Free Consultation?',
    'contact':      'You can reach us at info@adzinox.com or +91 98765 43210. Our office is in Mumbai. Or just fill the Quote form and we\'ll call you back within 2 hours!',
    'portfolio':    'We\'ve worked on 500+ projects across Branding, Digital Campaigns, Video, OOH, and Web Dev. Check our Portfolio section for detailed case studies!',
    'quote':        'Great choice! Please scroll to our "Free Consultation" section and fill the form — we respond within 2 business hours. Or call us: +91 98765 43210.',
  };

  trigger.addEventListener('click', () => panel.classList.toggle('open'));
  closeBtn?.addEventListener('click', () => panel.classList.remove('open'));

  function addMsg(text, from = 'bot') {
    const m = document.createElement('div');
    m.className = `chat-msg ${from}`;
    m.textContent = text;
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addOptions() {
    const optDiv = document.createElement('div');
    optDiv.className = 'chat-msg bot';
    optDiv.innerHTML = `<div class="chat-options">
      <button class="chat-option" data-key="services">🚀 Our Services</button>
      <button class="chat-option" data-key="pricing">💰 Pricing & Packages</button>
      <button class="chat-option" data-key="portfolio">🎨 See Our Work</button>
      <button class="chat-option" data-key="quote">📋 Get a Quote</button>
      <button class="chat-option" data-key="contact">📞 Contact Us</button>
    </div>`;
    msgs.appendChild(optDiv);
    msgs.scrollTop = msgs.scrollHeight;

    optDiv.querySelectorAll('.chat-option').forEach(btn => {
      btn.addEventListener('click', () => {
        addMsg(btn.textContent, 'user');
        optDiv.remove();
        setTimeout(() => addMsg(responses[btn.dataset.key] || 'Let me connect you with our team!'), 600);
      });
    });
  }

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    input.value = '';

    setTimeout(() => {
      const key = Object.keys(responses).find(k => val.toLowerCase().includes(k));
      addMsg(key ? responses[key] : 'Thanks for reaching out! Our team will get back to you shortly. Meanwhile, you can call us at +91 98765 43210 or email info@adzinox.com.');
    }, 800);
  }

  sendBtn?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
  addOptions();
}

/* ===================================================================
   16. COOKIE BANNER
   =================================================================== */
function initCookieBanner() {
  if (localStorage.getItem('adzinox_cookie_ok')) return;
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  setTimeout(() => banner.classList.add('show'), 1500);

  banner.querySelector('#cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('adzinox_cookie_ok', '1');
    gsap.to(banner, { y: '120%', opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: () => banner.remove() });
  });

  banner.querySelector('#cookieReject')?.addEventListener('click', () => {
    gsap.to(banner, { y: '120%', opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: () => banner.remove() });
  });
}

/* ===================================================================
   17. BACK TO TOP
   =================================================================== */
function initBackToTop() {
  const btn = document.querySelector('.float-btn-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================================================
   18. MARQUEE DUPLICATION
   =================================================================== */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  // Duplicate for infinite loop
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}

/* ===================================================================
   19. SMOOTH SCROLL
   =================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ===================================================================
   20. THEME TOGGLE
   =================================================================== */
function initThemeToggle() {
  const btn  = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('adzinox_theme');
  if (stored) root.dataset.theme = stored;

  btn?.addEventListener('click', () => {
    const isDark = root.dataset.theme !== 'light';
    root.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('adzinox_theme', root.dataset.theme);
    btn.innerHTML = isDark ? icons.moon : icons.sun;
  });
}

/* ===================================================================
   21. INLINE SVG ICON HELPERS
   =================================================================== */
const icons = {
  sun: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  moon: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

/* ===================================================================
   22. TILT CARDS (3D hover effect)
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
});
