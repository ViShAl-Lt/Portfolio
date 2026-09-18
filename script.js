/* ============================================================
   VISHAL.DEV — Portfolio Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TYPEWRITER EFFECT (Matched to Resume Roles)
    // ==========================================
    const typewriterEl = document.getElementById('typewriterText');
    const words = [
        'Frontend Developer',
        'Web Designer',
        'UI/UX Designer',
        'React.js Developer',
        'MERN Stack Specialist'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 45;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2200; // pause at word completion
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter after a slight delay
    setTimeout(typeWriter, 1200);


    // ==========================================
    // 2. SCROLL REVEAL (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });


    // ==========================================
    // 3. SKILL BARS ANIMATION
    // ==========================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach((fill, index) => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                        fill.classList.add('animated');
                    }, index * 120);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.skills-grid').forEach(grid => {
        skillObserver.observe(grid);
    });


    // ==========================================
    // 4. ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    // ==========================================
    // 5. MOBILE HAMBURGER MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('navLinks');

    if (hamburger && navLinksEl) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksEl.classList.toggle('open');
        });

        navLinksEl.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksEl.classList.remove('open');
            });
        });
    }


    // ==========================================
    // 6. NAVBAR HIDE/SHOW ON SCROLL
    // ==========================================
    let lastScrollY = 0;
    const navbar = document.getElementById('navbar');
    const gradientLine = document.querySelector('.gradient-line');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
            gradientLine.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
            gradientLine.style.transform = 'translateY(0)';
        }

        navbar.style.transition = 'transform 0.3s ease';
        gradientLine.style.transition = 'transform 0.3s ease';

        lastScrollY = currentScrollY;
    }, { passive: true });


    // ==========================================
    // 7. SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
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


    // ==========================================
    // 8. COUNTER ANIMATION FOR STATS
    // ==========================================
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            if (text.includes('+')) {
                const num = parseInt(text, 10);
                if (!isNaN(num)) {
                    let current = 0;
                    const increment = Math.max(1, num / 20);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            stat.textContent = num + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 40);
                }
            }
        });
    }

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 700);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        heroObserver.observe(heroSection);
    }


    // ==========================================
    // 9. INTERACTIVE CURSOR GLOW FOLLOW EFFECT
    // ==========================================
    const cursorGlow = document.getElementById('cursorGlow');

    if (cursorGlow) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;
        let isCursorVisible = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isCursorVisible) {
                cursorGlow.style.opacity = '1';
                isCursorVisible = true;
            }
        });

        window.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
            isCursorVisible = false;
        });

        // Smooth physics-based trailing loop using lerp (Linear Interpolation)
        function animateCursor() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);
    }

});
