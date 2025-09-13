// Suryansh Enterprises Website JavaScript:
// File Name: app.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLanguageToggle();
    initializeServiceTabs();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeAnimations();
});

// Language Toggle Functionality - FIXED
function initializeLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Set initial state
    updateLanguageButtons('en');
    setLanguage('en');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            
            // Update button states
            updateLanguageButtons(lang);
            
            // Set the language
            setLanguage(lang);
        });
    });
    
    function updateLanguageButtons(activeLang) {
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === activeLang) {
                btn.classList.add('active');
            }
        });
    }
    
    function setLanguage(lang) {
        console.log('Setting language to:', lang);
        
        // Update body data-lang attribute
        document.body.setAttribute('data-lang', lang);
        
        // Handle all language-specific elements
        const allElements = document.querySelectorAll('[data-lang-target]');
        
        allElements.forEach(element => {
            const targetLang = element.getAttribute('data-lang-target');
            
            if (targetLang === lang) {
                element.classList.remove('hidden');
                element.style.display = '';
            } else {
                element.classList.add('hidden');
                element.style.display = 'none';
            }
        });
        
        // Update form select options
        updateSelectOptions(lang);
    }
    
    function updateSelectOptions(lang) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            const options = serviceSelect.querySelectorAll('option');
            options.forEach(option => {
                const langElements = option.querySelectorAll('[data-lang-target]');
                if (langElements.length > 0) {
                    let newText = '';
                    langElements.forEach(langEl => {
                        if (langEl.getAttribute('data-lang-target') === lang) {
                            newText = langEl.textContent || langEl.innerText;
                        }
                    });
                    if (newText) {
                        option.textContent = newText;
                    }
                }
            });
        }
    }
}

// Service Tabs Functionality - FIXED
function initializeServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Contact Form Functionality - FIXED
function initializeContactForm() {
    const contactForm = document.querySelector('.inquiry-form');
    
    if (contactForm) {
        // Ensure all form elements are interactive
        const formElements = contactForm.querySelectorAll('input, select, textarea, button');
        formElements.forEach(element => {
            element.removeAttribute('disabled');
            element.style.pointerEvents = 'auto';
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Form submitted');
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            console.log('Form data:', data);
            
            // Validate form
            if (validateForm(data)) {
                // Show success message
                showFormMessage('success', getLocalizedText('form_success'));
                
                // Reset form
                this.reset();
            }
        });
        
        // Add real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Ensure field is interactive
            field.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }
    
    function validateForm(data) {
        let isValid = true;
        const errors = [];
        
        // Validate required fields
        if (!data.name || data.name.trim().length < 2) {
            errors.push(getLocalizedText('name_error'));
            isValid = false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push(getLocalizedText('email_error'));
            isValid = false;
        }
        
        if (!data.service) {
            errors.push(getLocalizedText('service_error'));
            isValid = false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push(getLocalizedText('message_error'));
            isValid = false;
        }
        
        if (!isValid) {
            showFormMessage('error', errors.join('<br>'));
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        let isValid = true;
        
        switch (fieldName) {
            case 'name':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = isValidEmail(value);
                break;
            case 'service':
                isValid = value !== '';
                break;
            case 'message':
                isValid = value.length >= 10;
                break;
        }
        
        if (!isValid) {
            field.classList.add('error');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormMessage(type, message) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = message;
        
        // Insert message above form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
}

// Smooth Scrolling Navigation - FIXED
function initializeSmoothScrolling() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            console.log('Navigation clicked:', targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    window.addEventListener('scroll', debounce(updateActiveNavItem, 100));
    
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    }
}

// Mobile Menu Functionality - FIXED
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navLinks.classList.contains('mobile-active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav') && navLinks.classList.contains('mobile-active')) {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileMenuBtn) {
        navLinks.classList.add('mobile-active');
        mobileMenuBtn.classList.add('active');
        document.body.classList.add('menu-open');
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileMenuBtn) {
        navLinks.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Animation and Scroll Effects
function initializeAnimations() {
    // Only use Intersection Observer if available
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .feature, .category, .stat');
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        const animateElements = document.querySelectorAll('.service-card, .feature, .category, .stat');
        animateElements.forEach(element => {
            element.classList.add('animate-in');
        });
    }
    
    // Add animation styles
    addAnimationStyles();
}

// Helper function to add animation CSS
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .feature,
        .category,
        .stat {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .service-card.animate-in,
        .feature.animate-in,
        .category.animate-in,
        .stat.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-message {
            padding: var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
            font-weight: var(--font-weight-medium);
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-message.success {
            background-color: rgba(var(--color-success-rgb), 0.1);
            border: 1px solid rgba(var(--color-success-rgb), 0.3);
            color: var(--color-success);
        }
        
        .form-message.error {
            background-color: rgba(var(--color-error-rgb), 0.1);
            border: 1px solid rgba(var(--color-error-rgb), 0.3);
            color: var(--color-error);
        }
        
        .form-control.error {
            border-color: var(--color-error);
            background-color: rgba(var(--color-error-rgb), 0.05);
        }
        
        .nav-link.active-nav {
            background-color: var(--color-secondary);
            color: var(--color-primary);
        }
        
        /* Ensure form elements are interactive */
        input, select, textarea, button {
            pointer-events: auto !important;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background-color: var(--color-surface);
                border-top: 1px solid var(--color-border);
                box-shadow: var(--shadow-lg);
                flex-direction: column;
                padding: var(--space-16);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all var(--duration-normal) var(--ease-standard);
                z-index: 1000;
                max-height: calc(100vh - 70px);
                overflow-y: auto;
            }
            
            .nav-links.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links li {
                margin: var(--space-8) 0;
            }
            
            .nav-link {
                display: block;
                padding: var(--space-12);
                text-align: center;
                border-radius: var(--radius-base);
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border: 1px solid var(--color-border);
                background-color: var(--color-secondary);
                margin: var(--space-8) 0;
                border-radius: var(--radius-base);
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            body.menu-open {
                overflow: hidden;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility function to get localized text
function getLocalizedText(key) {
    const currentLang = document.body.getAttribute('data-lang') || 'en';
    
    const texts = {
        en: {
            form_success: 'Thank you for your inquiry! We will get back to you soon.',
            name_error: 'Please enter a valid name (at least 2 characters).',
            email_error: 'Please enter a valid email address.',
            service_error: 'Please select a service.',
            message_error: 'Please enter a message (at least 10 characters).'
        },
        hi: {
            form_success: 'आपकी पूछताछ के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
            name_error: 'कृपया एक वैध नाम दर्ज करें (कम से कम 2 अक्षर)।',
            email_error: 'कृपया एक वैध ईमेल पता दर्ज करें।',
            service_error: 'कृपया एक सेवा चुनें।',
            message_error: 'कृपया एक संदेश दर्ज करें (कम से कम 10 अक्षर)।'
        }
    };
    
    return texts[currentLang][key] || texts.en[key];
}

// Utility functions
function debounce(func, wait) {
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

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// Performance optimization - lazy load images if any are added later
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Console log for debugging
console.log('Suryansh Enterprises website JavaScript loaded successfully');