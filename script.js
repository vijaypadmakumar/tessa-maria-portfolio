// Small JS: mobile nav toggle, reveal on scroll, contact form -> mailto prefill
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // IntersectionObserver for reveal animations
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form: open mail client with prefilled content (no backend)
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formNote = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill all fields — and do not send just "Hi".';
        return;
      }

      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:tessamariasams@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Media slider
  const slider = document.querySelector(".slider");
  if (slider) {
    const slides = Array.from(slider.children);
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");
    let index = 0;
    const setPosition = () => {
      slider.style.transform = `translateX(${-index * 100}%)`;
    };

    const goNext = () => { index = (index + 1) % slides.length; setPosition(); };
    const goPrev = () => { index = (index - 1 + slides.length) % slides.length; setPosition(); };

    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (prevBtn) prevBtn.addEventListener("click", goPrev);

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    });

    // Touch support (basic)
    let startX = 0;
    let isTouching = false;
    slider.addEventListener("touchstart", (e) => {
      isTouching = true;
      startX = e.touches[0].clientX;
    }, {passive: true});

    slider.addEventListener("touchmove", (e) => {
      if (!isTouching) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      // small drag visual feedback (optional)
      slider.style.transition = "none";
      slider.style.transform = `translateX(${diff - index * slider.offsetWidth}px)`;
    }, {passive: true});

    slider.addEventListener("touchend", (e) => {
      isTouching = false;
      slider.style.transition = "";
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff > 50) goPrev();
      else if (diff < -50) goNext();
      else setPosition();
    });
    // ensure initial position
    setPosition();
  }

  // Set footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// Portfolio slider logic
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const sliderTrack = document.querySelector(".slider-track");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach(btn => btn.classList.remove("active"));
      tab.classList.add("active");
      sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    });
  });

  // Update year automatically
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
