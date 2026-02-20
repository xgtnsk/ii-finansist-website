// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 2. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Apply reveal to elements
    const revealSelectors = ['.feature-card', '.promo-box', '.section-title', '.stat-item', '.hero-title', '.hero-subtitle', '.hero-actions', '.phone-mockup'];
    document.querySelectorAll(revealSelectors.join(', ')).forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // 3. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }
    });

    // Easing for outline to follow cursor with inertia
    const animateCursor = () => {
        let easing = 0.15;
        outlineX += (mouseX - outlineX) * easing;
        outlineY += (mouseY - outlineY) * easing;

        if (cursorOutline) {
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects for magnetic cursor feel
    const hoverElements = document.querySelectorAll('a, .btn, .glass, .feature-card, .stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'var(--primary)';
                cursorOutline.style.backgroundColor = 'rgba(127, 61, 255, 0.1)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                cursorOutline.style.backgroundColor = 'transparent';
            }
        });
    });

    // 4. 3D Tilt Effect for Phone Mockup
    const mockup = document.querySelector('.phone-mockup');
    const hero = document.querySelector('.hero');

    if (mockup && hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            // Calculate mouse position relative to hero section center
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseXRel = e.clientX - centerX;
            const mouseYRel = e.clientY - centerY;

            // Calculate rotation (max degrees)
            const maxRotate = 20;
            const rotateY = (mouseXRel / (rect.width / 2)) * maxRotate;
            const rotateX = -(mouseYRel / (rect.height / 2)) * maxRotate;

            mockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            // Reset rotation when mouse leaves hero section
            mockup.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }
});
