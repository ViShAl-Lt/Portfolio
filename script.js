/* ============================================================
   Portfolio Client Scripts — Vishal Gangwar
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Role Typing Animation
    const typedWordEl = document.getElementById('typedWord');
    const roles = [
        'Frontend Developer',
        'Web Designer',
        'UI/UX Designer',
        'React.js Developer',
        'MERN Stack Specialist'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function handleTyping() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            typedWordEl.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typeDelay = 45;
        } else {
            typedWordEl.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typeDelay = 90;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            typeDelay = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeDelay = 400;
        }

        setTimeout(handleTyping, typeDelay);
    }

    setTimeout(handleTyping, 1200);


    // 2. Scroll Reveal Animations
    const animElements = document.querySelectorAll('.anim-reveal');

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

    animElements.forEach((el) => {
        revealObserver.observe(el);
    });


    // 3. Skill Progress Fill Animation
    const meterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.meter-bar');
                bars.forEach((bar, i) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, i * 120);
                });
                meterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.skill-groups').forEach(group => {
        meterObserver.observe(group);
    });


    // 4. Header Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function syncNavState() {
        const scrollPos = window.scrollY + 120;

        sections.forEach((sec) => {
            const secTop = sec.offsetTop;
            const secHeight = sec.offsetHeight;
            const secId = sec.getAttribute('id');

            if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + secId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', syncNavState, { passive: true });
    syncNavState();


    // 5. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }


    // 6. Header Show / Hide on Scroll
    let previousScroll = 0;
    const siteHeader = document.getElementById('siteHeader');
    const accentBar = document.querySelector('.accent-bar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > previousScroll && currentScroll > 200) {
            siteHeader.style.transform = 'translateY(-100%)';
            accentBar.style.transform = 'translateY(-100%)';
        } else {
            siteHeader.style.transform = 'translateY(0)';
            accentBar.style.transform = 'translateY(0)';
        }

        siteHeader.style.transition = 'transform 0.3s ease';
        accentBar.style.transition = 'transform 0.3s ease';

        previousScroll = currentScroll;
    }, { passive: true });


    // 7. Smooth Scroll for Page Anchors
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


    // 8. Stats Counting Effect
    function countUpStats() {
        const metricNums = document.querySelectorAll('.metric-num');
        
        metricNums.forEach(el => {
            const text = el.textContent;
            if (text.includes('+')) {
                const target = parseInt(text, 10);
                if (!isNaN(target)) {
                    let count = 0;
                    const step = Math.max(1, target / 20);
                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            el.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(count) + '+';
                        }
                    }, 40);
                }
            }
        });
    }

    const heroBlock = document.getElementById('hero');
    if (heroBlock) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(countUpStats, 700);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        heroObserver.observe(heroBlock);
    }


    // 9. Ambient Mouse Follow Glow
    const mouseGlow = document.getElementById('mouseGlow');

    if (mouseGlow) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;
        let glowVisible = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!glowVisible) {
                mouseGlow.style.opacity = '1';
                glowVisible = true;
            }
        });

        window.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
            glowVisible = false;
        });

        function trackGlow() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            mouseGlow.style.left = `${glowX}px`;
            mouseGlow.style.top = `${glowY}px`;

            requestAnimationFrame(trackGlow);
        }
        requestAnimationFrame(trackGlow);
    }

});
