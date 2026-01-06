document.addEventListener('DOMContentLoaded', () => {
    // Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.grid-item, .resume-item, .tool-item, .pdf-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
});
