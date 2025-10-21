/* ===========================================
   UNIFIED INTERVIEW PREP JAVASCRIPT
   =========================================== */

// Global variables
let currentCodeContent = '';
let currentCodeLanguage = 'javascript';

// ===========================================
// NAVIGATION SCROLL EFFECT
// ===========================================

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-container');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// ===========================================
// SMOOTH SCROLL TO TOP FUNCTIONALITY
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add a scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
    `;
    scrollTopBtn.onmouseover = () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(99, 102, 241, 0.3)';
    };
    scrollTopBtn.onmouseout = () => {
        scrollTopBtn.style.transform = 'scale(1)';
        scrollTopBtn.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    };
    scrollTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Initialize code block toggles
    initializeCodeBlocks();

    // Initialize smooth scrolling for navigation
    initializeSmoothScrolling();

    // Initialize fade-in animations
    initializeFadeInAnimations();

    // Initialize code button animations
    initializeCodeButtonAnimations();
});

// ===========================================
// CODE BLOCK TOGGLE FUNCTIONALITY
// ===========================================

function initializeCodeBlocks() {
    document.querySelectorAll('.code-toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.nextElementSibling;
            if (codeBlock && codeBlock.classList.contains('code-block')) {
                const isHidden = !codeBlock.classList.contains('show');

                if (isHidden) {
                    codeBlock.classList.add('show');
                    this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Code';
                } else {
                    codeBlock.classList.remove('show');
                    this.innerHTML = '<i class="fas fa-code"></i> View Code Example';
                }
            }
        });

        // Add hover animation
        button.addEventListener('mouseenter', function() {
            this.innerHTML = this.innerHTML.includes('Hide') ?
                '<i class="fas fa-eye-slash"></i> Click to Hide Code' :
                '<i class="fas fa-eye"></i> Click to View Code';
        });

        button.addEventListener('mouseleave', function() {
            this.innerHTML = this.innerHTML.includes('Hide') ?
                '<i class="fas fa-eye-slash"></i> Hide Code' :
                '<i class="fas fa-code"></i> View Code Example';
        });
    });
}

// ===========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===========================================

function initializeSmoothScrolling() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
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
}

// ===========================================
// FADE-IN ANIMATIONS
// ===========================================

function initializeFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.question-card').forEach(card => {
        observer.observe(card);
    });
}

// ===========================================
// CODE BUTTON ANIMATIONS
// ===========================================

function initializeCodeButtonAnimations() {
    document.querySelectorAll('.code-toggle-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.innerHTML = this.innerHTML.includes('Hide') ?
                '<i class="fas fa-eye-slash"></i> Click to Hide Code' :
                '<i class="fas fa-eye"></i> Click to View Code';
        });

        button.addEventListener('mouseleave', function() {
            this.innerHTML = this.innerHTML.includes('Hide') ?
                '<i class="fas fa-eye-slash"></i> Hide Code' :
                '<i class="fas fa-code"></i> View Code Example';
        });
    });
}

// ===========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ===========================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Could add toast notification here
        console.log('Code copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================================
// PERFORMANCE OPTIMIZATION: LAZY LOAD PRISM.JS
// ===========================================

if (!window.Prism) {
    const prismScript = document.createElement('script');
    prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    document.head.appendChild(prismScript);
}

// ===========================================
// KEYBOARD NAVIGATION
// ===========================================

document.addEventListener('keydown', function(e) {
    // Close code blocks on Escape
    if (e.key === 'Escape') {
        document.querySelectorAll('.code-block.show').forEach(block => {
            block.classList.remove('show');
            const button = block.previousElementSibling;
            if (button && button.classList.contains('code-toggle-btn')) {
                button.innerHTML = '<i class="fas fa-code"></i> View Code Example';
            }
        });
    }
});

// ===========================================
// ACCESSIBILITY IMPROVEMENTS
// ===========================================

// Add focus management for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Ensure code buttons are keyboard accessible
    document.querySelectorAll('.code-toggle-btn').forEach(button => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
