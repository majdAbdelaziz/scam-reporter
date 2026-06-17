// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// Nav scroll shadow
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.report-card, .step-card, .impact-card, .dict-card, .blog-card-sm').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  revealObserver.observe(el);
});

// Type tags toggle
document.querySelectorAll('.type-tag').forEach(tag => {
  tag.addEventListener('click', () => tag.classList.toggle('active'));
});

// Report form submit
const reportForm = document.getElementById('reportForm');
if (reportForm) {
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = reportForm.querySelector('.submit-btn');
    btn.textContent = '✓ تم استلام البلاغ — شكراً لك!';
    btn.style.background = '#0F6E56';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'إرسال بلاغ آخر';
      btn.style.background = '';
      btn.disabled = false;
      reportForm.reset();
      document.querySelectorAll('.type-tag').forEach(t => t.classList.remove('active'));
    }, 3500);
  });
}

// Live counter animation
function animateCount(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.round(current).toLocaleString('ar') + suffix;
  }, 25);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCount(el, parseInt(el.dataset.count), el.dataset.suffix || '');
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));
}
