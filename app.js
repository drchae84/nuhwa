// Nuhwa Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeProgramNavigation();
    initializeContactForm();
    initializeAnimations();
    
    // Show home section by default
    showSection('home');
    
    // Handle initial page load with hash
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        showSection(sectionId);
    }
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Navigation links - main nav and footer
    const allNavLinks = document.querySelectorAll('.nav__link, .nav__dropdown-link, .footer__link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = navToggle ? navToggle.querySelectorAll('span') : [];
                    spans.forEach(span => span.style.transform = 'none');
                    if (spans.length > 1) spans[1].style.opacity = '1';
                }
            }
        });
    });
    
    // Hero action buttons
    const heroButtons = document.querySelectorAll('.hero__actions .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => span.style.transform = 'none');
                    if (spans.length > 1) spans[1].style.opacity = '1';
                }
            }
        }
    });
}

// Program navigation functionality
function initializeProgramNavigation() {
    // Program card clicks from home page
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const program = this.getAttribute('data-program');
            if (program) {
                showSection(program);
            }
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const program = this.getAttribute('data-program');
                if (program) {
                    showSection(program);
                }
            }
        });
    });
    
    // Program detail buttons
    const programDetailBtns = document.querySelectorAll('.program-detail-btn');
    programDetailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const target = this.getAttribute('data-target');
            if (target) {
                showSection(target);
            }
        });
    });
    
    // Back buttons
    const backBtns = document.querySelectorAll('.back-btn');
    backBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const target = this.getAttribute('data-target');
            if (target) {
                showSection(target);
            }
        });
    });
    
    // Program detail action buttons (Contact Us to Collaborate)
    const programActionBtns = document.querySelectorAll('.program-detail__actions .btn--primary');
    programActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Animation functionality
function initializeAnimations() {
    // Add fade-in animation to elements as they become visible
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.program-card, .location-card, .program-detail-card, .contact__location, .about__section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Section switching utility - FIXED
function showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug log
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash without triggering scroll
        if (history.pushState) {
            history.pushState(null, null, `#${sectionId}`);
        } else {
            window.location.hash = sectionId;
        }
        
        // Trigger animations for newly visible elements
        setTimeout(() => {
            const newElements = targetSection.querySelectorAll('.fade-in:not(.visible)');
            newElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        }, 100);
        
        console.log('Section shown successfully:', sectionId); // Debug log
    } else {
        console.error('Section not found:', sectionId); // Debug log
    }
}

// Notification utility
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification__content';
    content.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-12);
    `;
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'notification__message';
    messageSpan.textContent = message;
    messageSpan.style.cssText = `
        color: var(--color-text);
        font-size: var(--font-size-base);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification__close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.onclick = function() {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    };
    
    content.appendChild(messageSpan);
    content.appendChild(closeBtn);
    notification.appendChild(content);
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        padding: var(--space-16);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'error') {
        notification.style.borderLeftColor = 'var(--color-error)';
        notification.style.borderLeftWidth = '4px';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Email validation utility
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        showSection(sectionId);
    } else {
        showSection('home');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => span.style.transform = 'none');
                if (spans.length > 1) spans[1].style.opacity = '1';
            }
        }
    }
});

// Smooth hover effects for program cards
document.addEventListener('DOMContentLoaded', function() {
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'var(--transition-elegant)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const programDetailCards = document.querySelectorAll('.program-detail-card');
    programDetailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'var(--transition-elegant)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Initialize lazy loading when sections become visible
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const cards = section.querySelectorAll('.fade-in:not(.visible)');
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

// Observe all sections for animations
setTimeout(() => {
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
}, 100);