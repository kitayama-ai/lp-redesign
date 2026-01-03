document.addEventListener('DOMContentLoaded', () => {
    // 1. ENHANCED SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // スタガードアニメーション（順番に表示）
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // すべてのreveal要素を監視
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // list-stickerも監視
    document.querySelectorAll('.list-sticker').forEach((el, index) => {
        observer.observe(el);
    });

    // 2. ENHANCED NUMBER COUNT UP ANIMATION
    function startCountUp(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (target - start) * ease);
            el.textContent = '¥' + current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = '¥' + target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // 3. PARALLAX EFFECT FOR HERO SECTION
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroImg = document.getElementById('heroImg');
        const heroTitle = document.querySelector('.hero-title');
        const speechBubble = document.querySelector('.speech-bubble');

        if (heroImg && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.3;
            heroImg.style.transform = `rotate(1.5deg) translateY(${scrolled * parallaxSpeed}px)`;
        }

        if (heroTitle && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.2;
            heroTitle.style.transform = `rotate(-1.5deg) translateY(${scrolled * parallaxSpeed}px)`;
        }

        if (speechBubble && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.15;
            speechBubble.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // 4. ENHANCED STICKY CTA WITH SMOOTH TRANSITION
    const stickyCTA = document.getElementById('stickyCTA');
    let lastScrollY = window.scrollY;
    let isScrollingDown = false;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;

        if (stickyCTA) {
            if (currentScrollY > 100) {
                stickyCTA.style.transform = 'translateX(-50%) translateY(0)';
                stickyCTA.style.opacity = '1';
            } else {
                stickyCTA.style.transform = 'translateX(-50%) translateY(200px)';
                stickyCTA.style.opacity = '0';
            }
        }
    }, { passive: true });

    // 5. MOUSE TRACKING EFFECT FOR INTERACTIVE ELEMENTS
    const interactiveElements = document.querySelectorAll('.pop-cta, .list-sticker, .chat-bubble');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });

    // 6. RIPPLE EFFECT FOR BUTTONS
    const buttons = document.querySelectorAll('.pop-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 7. SMOOTH SCROLL TO ELEMENTS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 8. LAZY LOADING FOR IMAGES
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 9. ENHANCED CHAT BUBBLE ANIMATIONS
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    chatBubbles.forEach((bubble, index) => {
        bubble.style.animationDelay = `${index * 0.2}s`;
    });
});

// 10. RIPPLE EFFECT STYLES (Added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
