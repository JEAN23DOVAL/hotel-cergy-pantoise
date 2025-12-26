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
        this.setupRoomThumbnails();
        this.setupFAQ();
        this.updateFooterInfo();
        this.setupVideoPlayback();
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
        // Memory cache pour les images chargées
        this.imageCache = new Map();

        // IntersectionObserver avec caching en mémoire
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target, observer);
                }
            });
        }, {
            rootMargin: '50px' // Précharge 50px avant l'apparition
        });

        // Observer toutes les images avec data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Support natif lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease-in-out';
                });
            });
        }
    }

    loadImage(img, observer) {
        const src = img.dataset.src || img.src;
        
        // Vérifier le cache en mémoire
        if (this.imageCache.has(src)) {
            img.src = src;
            img.classList.add('loaded');
            observer.unobserve(img);
            return;
        }

        // Créer une nouvelle image pour pré-charger
        const tempImg = new Image();
        tempImg.onload = () => {
            // Ajouter au cache
            this.imageCache.set(src, true);
            
            // Animer le chargement
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            img.src = src;
            img.onload = () => {
                img.style.opacity = '1';
                img.classList.add('loaded');
                console.log('[Lazy Loading] Image mise en cache:', src);
            };
            observer.unobserve(img);
        };
        
        tempImg.onerror = () => {
            console.error('[Lazy Loading] Erreur chargement image:', src);
            observer.unobserve(img);
        };
        
        tempImg.src = src;
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

    setupRoomThumbnails() {
        document.querySelectorAll('.room-card').forEach(card => {
            const mainImg = card.querySelector('.main-room-image');
            const thumbnails = card.querySelectorAll('.thumbnail');
            thumbnails.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Retire l'active de toutes les miniatures
                    thumbnails.forEach(t => t.classList.remove('active'));
                    btn.classList.add('active');
                    // Récupère l'image de la miniature cliquée
                    const picture = btn.querySelector('picture');
                    const source = picture.querySelector('source');
                    const img = picture.querySelector('img');
                    // Échange les sources de l'image principale et de la miniature
                    const mainPicture = card.querySelector('.room-image-container picture');
                    const mainSource = mainPicture.querySelector('source');
                    const mainImgTag = mainPicture.querySelector('img');
                    // Sauvegarde les sources actuelles
                    const tempSrcset = mainSource.srcset;
                    const tempSrc = mainImgTag.src;
                    const tempAlt = mainImgTag.alt;
                    // Remplace l'image principale par la miniature
                    mainSource.srcset = source.srcset;
                    mainImgTag.src = img.src;
                    mainImgTag.alt = img.alt;
                    // Remplace la miniature par l'ancienne principale
                    source.srcset = tempSrcset;
                    img.src = tempSrc;
                    img.alt = tempAlt;
                });
            });
        });
    }

    setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(button => {
            button.addEventListener('click', (e) => {
                const item = button.parentElement;
                const isExpanded = item.dataset.expanded === 'true';

                // Close all other items
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.dataset.expanded = 'false';
                });

                // Toggle current item
                if (!isExpanded) {
                    item.dataset.expanded = 'true';
                    button.setAttribute('aria-expanded', 'true');
                } else {
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    updateFooterInfo() {
        // Update copyright year dynamically
        const copyrightEl = document.getElementById('footer-copyright');
        if (copyrightEl) {
            const currentYear = new Date().getFullYear();
            copyrightEl.innerHTML = `&copy; ${currentYear} Cergy Pontoise Hôtel. Tous droits réservés.`;
        }
    }

    setupVideoPlayback() {
        // Video playback is handled by VideoManager class
        // This method ensures compatibility with HotelWebsite initialization
        if (window.videoManager) {
            console.log('[HotelWebsite] Video playback system initialized');
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
    initResourceCaching();
    logCacheStats();
});

/* ==========================================
   RESOURCE CACHING & OPTIMIZATION
   ========================================== */

/**
 * Initialise le caching des ressources statiques
 * Utilise localStorage pour persister les informations de cache
 */
function initResourceCaching() {
    const cacheConfig = {
        version: 'v1',
        maxCacheSize: 50 * 1024 * 1024, // 50MB max
        TTL: 7 * 24 * 60 * 60 * 1000 // 7 jours
    };

    // Initialiser le cache localStorage
    const cacheKey = `hotel-cache-${cacheConfig.version}`;
    const existingCache = JSON.parse(localStorage.getItem(cacheKey) || '{}');

    // Nettoyer les caches expirés
    const now = Date.now();
    Object.keys(existingCache).forEach(key => {
        if (existingCache[key].expiry && now > existingCache[key].expiry) {
            delete existingCache[key];
            console.log('[Cache Manager] Cache expiré supprimé:', key);
        }
    });

    localStorage.setItem(cacheKey, JSON.stringify(existingCache));

    // Précharger les ressources critiques
    prefetchCriticalResources();
    console.log('[Cache Manager] Caching des ressources initialisé');
}

/**
 * Précharge les ressources critiques pour améliorer la performance
 */
function prefetchCriticalResources() {
    const criticalAssets = [
        '/css/style.css',
        '/js/main.js',
        'https://kit.fontawesome.com/9d673adfb6.js'
    ];

    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = asset;
        document.head.appendChild(link);
        console.log('[Prefetch] Ressource préchargée:', asset);
    });
}

/**
 * Récupère les stats du cache et affiche les informations
 */
function logCacheStats() {
    if ('serviceWorker' in navigator) {
        caches.keys().then(cacheNames => {
            console.log('[Cache Stats] Caches disponibles:', cacheNames);
            cacheNames.forEach(cacheName => {
                caches.open(cacheName).then(cache => {
                    cache.keys().then(requests => {
                        const totalSize = requests.length;
                        console.log(`[Cache Stats] ${cacheName}: ${totalSize} ressources en cache`);
                    });
                });
            });
        });
    }

    // Afficher localStorage cache stats
    const cacheKey = 'hotel-cache-v1';
    const cache = JSON.parse(localStorage.getItem(cacheKey) || '{}');
    const cachedItems = Object.keys(cache).length;
    console.log(`[Cache Stats] localStorage: ${cachedItems} items en cache`);
}

/**
 * Fonction pour nettoyer le cache manuellement
 */
window.clearHotelCache = function() {
    if ('serviceWorker' in navigator) {
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            ).then(() => {
                localStorage.removeItem('hotel-cache-v1');
                console.log('[Cache Manager] Tous les caches ont été supprimés');
                window.location.reload();
            });
        });
    } else {
        localStorage.removeItem('hotel-cache-v1');
        console.log('[Cache Manager] localStorage cache supprimé');
        window.location.reload();
    }
};

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
// ==========================================
//    VIDEO PLAYBACK MANAGEMENT
// ==========================================
class VideoManager {
    constructor() {
        this.videos = new Map();
        this.currentVideo = null;
        this.videoModal = null;
        this.setupVideoElements();
        this.setupPlayButtons();
    }

    setupVideoElements() {
        // Create modal container if not exists
        if (!document.getElementById('video-modal')) {
            const modal = document.createElement('div');
            modal.id = 'video-modal';
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <button class="video-modal-close" aria-label="Fermer la vidéo">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
            this.videoModal = modal;

            // Close on background click
            this.videoModal.addEventListener('click', (e) => {
                if (e.target === this.videoModal) {
                    this.closeVideo();
                }
            });

            // Close button
            this.videoModal.querySelector('.video-modal-close').addEventListener('click', () => {
                this.closeVideo();
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.videoModal.classList.contains('active')) {
                    this.closeVideo();
                }
            });
        } else {
            this.videoModal = document.getElementById('video-modal');
        }
    }

    setupPlayButtons() {
        // Get all video play buttons
        const playButtons = document.querySelectorAll('.video-play-btn, .video-cta');
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Get video ID from data-video attribute
                const videoId = button.closest('.video-card')?.querySelector('[data-video]')?.getAttribute('data-video');
                if (videoId) {
                    this.playVideo(videoId);
                }
            });
        });
    }

    playVideo(videoId) {
        // Map video IDs to file paths
        const videoPaths = {
            'prestige-room-1': 'assets/videos/prestige-room-1.mp4',
            'junior-suite-1': 'assets/videos/junior-suite-1.mp4',
            'restaurant-bar-1': 'assets/videos/restaurant-bar-1.mp4',
            'standard-room-1': 'assets/videos/standard-room-1.mp4'
        };

        const videoPath = videoPaths[videoId];
        if (!videoPath) {
            console.warn(`Video not found: ${videoId}`);
            return;
        }

        // Create video element (lazy loading - only on click)
        const videoContent = this.videoModal.querySelector('.video-modal-content');
        const existingVideo = videoContent.querySelector('video');

        if (existingVideo) {
            existingVideo.remove();
        }

        const video = document.createElement('video');
        video.setAttribute('controls', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('preload', 'metadata');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';

        // Add source with streaming support
        const source = document.createElement('source');
        source.src = videoPath;
        source.type = 'video/mp4';
        video.appendChild(source);

        // Insert video before close button
        const closeBtn = videoContent.querySelector('.video-modal-close');
        videoContent.insertBefore(video, closeBtn.nextSibling);

        // Open modal
        this.videoModal.classList.add('active');
        this.currentVideo = videoId;

        // Track video playing
        if (window.gtag) {
            gtag('event', 'video_start', {
                'video_id': videoId,
                'video_title': videoId.replace('-', ' ')
            });
        }

        // Log for analytics
        console.log(`[Video Manager] Playing: ${videoId}`);
    }

    closeVideo() {
        this.videoModal.classList.remove('active');
        const video = this.videoModal.querySelector('video');
        
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.remove();
        }

        this.currentVideo = null;
    }
}

// Initialize video manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.videoManager = new VideoManager();
});