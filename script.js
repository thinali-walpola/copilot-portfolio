// Basic interactivity: mobile menu, theme toggle, smooth scroll, contact form handling
(function(){
  const doc = document;
  const html = doc.documentElement;
  const hamburger = doc.getElementById('hamburger');
  const nav = doc.getElementById('primary-nav');
  const themeToggle = doc.getElementById('theme-toggle');
  const form = doc.getElementById('contact-form');
  const status = doc.getElementById('form-status');
  const yearEl = doc.getElementById('year');

  // Set year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Load theme from localStorage or media preference
  const preferred = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  html.setAttribute('data-theme', preferred);

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', cur);
    localStorage.setItem('theme', cur);
    themeToggle.setAttribute('aria-pressed', cur === 'dark' ? 'true' : 'false');
  });

  // Mobile nav toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      // close
      nav.classList.remove('nav-open');
      nav.style.display = '';
      hamburger.setAttribute('aria-expanded','false');
    } else {
      // open
      nav.classList.add('nav-open');
      nav.style.display = 'block';
      hamburger.setAttribute('aria-expanded','true');
    }
  });

  // Close mobile nav when a link is clicked
  nav.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      nav.classList.remove('nav-open');
      nav.style.display = '';
      hamburger.setAttribute('aria-expanded','false');
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Simple form validation and fake submit (replace with real API if needed)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const data = new FormData(form);
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const message = data.get('message')?.trim();

    if (!name || name.length < 2) { status.textContent = 'Please enter your name (2+ characters).'; return; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { status.textContent = 'Please provide a valid email.'; return; }
    if (!message || message.length < 10) { status.textContent = 'Message should be at least 10 characters.'; return; }

    // Simulate async submit
    status.textContent = 'Sending…';
    setTimeout(() => {
      status.textContent = 'Thanks — your message has been received. I’ll be in touch soon!';
      form.reset();
    }, 900);
  });

})();