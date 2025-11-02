// Al Ahli Driving Center - JavaScript Functions
document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted! We will contact you soon.');
            this.reset();
        });

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // UTM Parameter Capture
    function getUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || '',
            gclid: urlParams.get('gclid') || '',
            fbclid: urlParams.get('fbclid') || '',
            referrer: document.referrer || '',
            landing_page: window.location.href,
            timestamp: new Date().toISOString()
        };
    }

    // Store UTM parameters in sessionStorage for persistence
    const utmParams = getUTMParameters();
    sessionStorage.setItem('utmParams', JSON.stringify(utmParams));

    // Form Submission Handler
    function handleFormSubmission(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Add UTM parameters
            const storedUtmParams = JSON.parse(sessionStorage.getItem('utmParams') || '{}');
            const submissionData = {
                ...formObject,
                ...storedUtmParams
            };
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            console.log('Form Data with UTM:', submissionData);
            
            // Here you would typically send the data to your server
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(submissionData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle success
            // })
            // .catch(error => {
            //     // Handle error
            // });
            
            // For demo purposes, show success message after 2 seconds
            setTimeout(() => {
                alert('Thank you for your inquiry! We will contact you soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optional: Redirect to thank you page
                // window.location.href = '/thank-you.html';
                
                // Optional: Fire conversion tracking
                // gtag('event', 'conversion', {
                //     'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                //     'value': 1.0,
                //     'currency': 'AED'
                // });
                
            }, 2000);
        });
    }

    // Initialize form handlers
    handleFormSubmission('contactForm');
    handleFormSubmission('mobileContactForm');
    handleFormSubmission('footerContactForm');

    // Phone Number Formatting (UAE format)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            // UAE phone number formatting
            if (value.length > 0) {
                if (value.startsWith('971')) {
                    // International format
                    if (value.length > 11) value = value.substring(0, 11);
                    value = value.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
                } else if (value.startsWith('0')) {
                    // Local format starting with 0
                    if (value.length > 10) value = value.substring(0, 10);
                    value = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
                } else {
                    // Local format without 0
                    if (value.length > 9) value = value.substring(0, 9);
                    if (value.length >= 7) {
                        value = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
                    }
                }
            }
            
            e.target.value = value;
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background opacity on scroll
        if (scrollTop > 50) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
            navbar.classList.remove('bg-white');
        } else {
            navbar.classList.add('bg-white');
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
        
        // Hide/show navbar on scroll (optional)
        // if (scrollTop > lastScrollTop && scrollTop > 100) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sectionsToAnimate = document.querySelectorAll('section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // Lazy Loading for Images (if you add images later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Click to Call Analytics Tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks for analytics
            console.log('Phone call initiated:', this.href);
            
            // Google Analytics event (if GA is loaded)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'engagement',
                    'event_label': 'header_phone_click'
                });
            }
            
            // Facebook Pixel event (if Facebook Pixel is loaded)
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', 'PhoneCall');
            }
        });
    });

    // Email Click Tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email click:', this.href);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'event_category': 'engagement',
                    'event_label': 'contact_email'
                });
            }
        });
    });

    // Page Load Performance Tracking
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Send load time to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'page_load',
                'value': Math.round(loadTime)
            });
        }
    });

    // Course Link Click Tracking
    const courseLinks = document.querySelectorAll('a[href="#contact"]');
    courseLinks.forEach(link => {
        link.addEventListener('click', function() {
            const courseName = this.closest('.bg-gradient-to-br')?.querySelector('h3')?.textContent;
            
            console.log('Course interest:', courseName);
            
            if (typeof gtag !== 'undefined' && courseName) {
                gtag('event', 'course_interest', {
                    'event_category': 'engagement',
                    'event_label': courseName
                });
            }
        });
    });

    // WhatsApp Integration (if needed)
    function initWhatsApp() {
        const whatsappNumber = '971501234567'; // Replace with actual WhatsApp number
        const whatsappMessage = encodeURIComponent('Hi! I am interested in driving courses at Al Ahli Driving Center.');
        
        // You can add WhatsApp button dynamically
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50';
        whatsappBtn.innerHTML = '<span class="material-icons">chat</span>';
        whatsappBtn.title = 'Chat on WhatsApp';
        
        // Uncomment to add WhatsApp button
        // document.body.appendChild(whatsappBtn);
    }

    // Initialize WhatsApp if needed
    // initWhatsApp();

    // Form Validation Enhancement
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('border-red-500')) {
                        validateField(this);
                    }
                });
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error styling
        field.classList.remove('border-red-500');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            field.classList.add('border-red-500');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // Initialize enhanced form validation
    enhanceFormValidation();

});

// Export functions for external use if needed
window.AlAhliDrivingCenter = {
    getUTMParameters: function() {
        return JSON.parse(sessionStorage.getItem('utmParams') || '{}');
    },
    
    trackEvent: function(eventName, eventData) {
        console.log('Custom event:', eventName, eventData);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName, eventData);
        }
    }
};