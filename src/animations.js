// ========================================
// Scroll-Reveal Animations
// ========================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.cs-section, .cs-phones-row, .cs-quote, .persona-card, .case-study-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    // Staggered animations for phone rows
    const phoneRows = document.querySelectorAll('.cs-phones-row');
    phoneRows.forEach(row => {
        const images = row.querySelectorAll('img');
        images.forEach((img, index) => {
            img.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// ========================================
// Reading Progress Indicator
// ========================================

function initReadingProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'reading-progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';

    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = Math.min((scrolled / documentHeight) * 100, 100);

        progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// ========================================
// Parallax Effect on Hero Sprites
// ========================================

function initParallax() {
    const sprites = document.querySelectorAll('.sprite_1, .sprite_2, .sprite_3');

    if (sprites.length === 0) return;

    function updateParallax() {
        const scrolled = window.scrollY;

        sprites.forEach((sprite, index) => {
            // Different speed multipliers for each sprite
            const speed = (index + 1) * 0.15;
            const yPos = -(scrolled * speed);
            sprite.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
}

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Initialize All Animations
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal (all pages)
    initScrollReveal();

    // Reading progress (only on case study pages)
    if (document.body.classList.contains('case-study-page')) {
        initReadingProgress();
    }

    // Parallax (only on homepage with sprites)
    if (document.querySelector('.sprite_1')) {
        initParallax();
    }

    // Smooth scroll (all pages)
    initSmoothScroll();

    console.log('✨ Animations initialized');
});
