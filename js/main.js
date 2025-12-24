/* ==========================================
   MAIN JAVASCRIPT - HÔTEL CERGY PONTOISE
   Animations | Interactions | Optimisations
   ========================================== */

class HotelWebsite {
    constructor() {
        this.header = document.getElementById('header');
        this.hamburger = document.getElementById('hamburger');
        this.nav = document.getElementById('nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.setupHeaderEvents();
        this.setupScrollAnimations();
        this.setupLazyLoading();
        this.setupRoomInteractions();
        this.setupSmoothScroll();
        this.optimizePerformance();
    }

    /* ==========================================
       HEADER & NAVIGATION
       ========================================== */
    setupHeaderEvents() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.nav.classList.toggle('active');
        });

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.nav.classList.remove('active');
            });
        });

        // Header shadow on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            } else {
                this.header.style.boxShadow = 'none';
            }
        });
    }

    /* ==========================================
       SCROLL ANIMATIONS
       ========================================== */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.room-card, .service-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    /* ==========================================
       LAZY LOADING OPTIMIZATION
       ========================================== */
    setupLazyLoading() {
        // Native lazy loading support check
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.addEventListener('loadstart', () => {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease-in-out';
                });
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            });
        } else {
            // Fallback for older browsers
            this.setupIntersectionObserverLazyLoading();
        }
    }

    setupIntersectionObserverLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // For picture elements
                    if (img.parentElement.tagName === 'PICTURE') {
                        const sources = img.parentElement.querySelectorAll('source');
                        sources.forEach(source => {
                            if (source.srcset) {
                                source.srcset = source.srcset;
                            }
                        });
                    }
                    // For img element
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /* ==========================================
       ROOM INTERACTIONS
       ========================================== */
    setupRoomInteractions() {
        const roomButtons = document.querySelectorAll('.room-btn');
        
        roomButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const roomData = button.dataset.room;
                this.showRoomModal(roomData);
            });
        });
    }

    showRoomModal(roomData) {
        // Toast notification instead of modal for better UX
        this.showToast(`Chambre ${roomData} - Redirection vers WhatsApp...`);
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, #D4AF37, #C41E3A);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /* ==========================================
       SMOOTH SCROLL
       ========================================== */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /* ==========================================
       PERFORMANCE OPTIMIZATIONS
       ========================================== */
    optimizePerformance() {
        // Debounce scroll event
        this.throttledScroll = this.throttle(() => {
            this.updateActiveNavLink();
        }, 200);
        
        window.addEventListener('scroll', this.throttledScroll);

        // Optimize animations for mobile
        this.checkDeviceCapabilities();
    }

    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    checkDeviceCapabilities() {
        // Reduce animations on low-end devices
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-base', '0.05s ease-in-out');
        }

        // Disable heavy animations on mobile
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            document.querySelectorAll('.decorative-card').forEach(el => {
                el.style.transform = 'none';
            });
        }
    }
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

// Intersection Observer for fade-in animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.room-card, .service-card, .testimonial-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for toast animation
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Image quality optimization
function optimizeImages() {
    document.querySelectorAll('picture').forEach(picture => {
        const img = picture.querySelector('img');
        if (img) {
            // Set loading priority
            img.loading = 'lazy';
            
            // Add error handling
            img.addEventListener('error', () => {
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%" y="50%" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
            });
        }
    });
}

// Smooth scroll helper
function smoothScrollTo(element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 100;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Performance monitoring
function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
}

// Cache optimization
function initializeCache() {
    if ('serviceWorker' in navigator) {
        // Service worker registration for offline capability
        // Uncomment when SW is implemented
        // navigator.serviceWorker.register('/sw.js');
    }
}

/* ==========================================
   INITIALIZATION
   ========================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main website functionality
    const website = new HotelWebsite();

    // Initialize additional features
    initializeAnimations();
    observeElements();
    optimizeImages();
    monitorPerformance();
    initializeCache();

    console.log('🏨 Hôtel Cergy Pontoise - Website initialized successfully!');
});

// Handle page visibility for optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.body.style.animation = 'none';
    } else {
        // Resume animations
        document.body.style.animation = '';
    }
});

// Handle resize events efficiently
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recheck device capabilities on resize
        const website = new HotelWebsite();
        website.checkDeviceCapabilities();
    }, 250);
});

/* ==========================================
   ENHANCED FEATURES
   ========================================== */

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37, #C41E3A, #165B33);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add scroll progress to initialization
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
});

// Page visibility optimization - reduce frame rate when page is not visible
let animationFrameId;
function throttleAnimations() {
    if (!document.hidden) {
        animationFrameId = requestAnimationFrame(throttleAnimations);
    }
}

window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
    } else {
        throttleAnimations();
    }
});
