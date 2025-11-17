// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Form Submission Handler
document.getElementById('trip-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        travelDate: formData.get('travel-date'),
        duration: formData.get('duration'),
        travelers: formData.get('travelers')
    };
    
    // Show success message
    showBookingConfirmation(bookingData);
    
    // Reset form
    this.reset();
});

function showBookingConfirmation(data) {
    const confirmationMessage = `
        🚀 Booking Confirmed! 🚀
        
        Thank you, ${data.name}!
        
        Booking Details:
        • Travel Date: ${new Date(data.travelDate).toLocaleDateString()}
        • Duration: ${data.duration} Earth Days
        • Travelers: ${data.travelers}
        • Confirmation sent to: ${data.email}
        
        Get ready for the adventure of a lifetime on Kepler-452b!
    `;
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%);
        border: 2px solid #00d4ff;
        border-radius: 20px;
        padding: 3rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        color: white;
        font-family: 'Inter', sans-serif;
        animation: slideUp 0.3s ease;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div>
            <h2 style="color: #00d4ff; font-family: 'Orbitron', monospace; margin-bottom: 1.5rem; font-size: 2rem;">
                🎉 Booking Successful! 🎉
            </h2>
            <pre style="white-space: pre-wrap; line-height: 1.6; color: #b8b8d0; text-align: left;">
                ${confirmationMessage}
            </pre>
            <button id="close-modal" style="
                background: linear-gradient(135deg, #00d4ff 0%, #00ff88 100%);
                color: #0a0a0f;
                border: none;
                padding: 1rem 2rem;
                font-size: 1rem;
                font-weight: 700;
                border-radius: 50px;
                cursor: pointer;
                margin-top: 2rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
            ">Close</button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal handler
    document.getElementById('close-modal').addEventListener('click', () => {
        modalOverlay.remove();
        style.remove();
    });
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(modalOverlay)) {
            modalOverlay.remove();
            style.remove();
        }
    }, 10000);
}

// Intersection Observer for Scroll Animations
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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.destination-card, .activity-card, .section-title');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const planet = document.querySelector('.planet');
    
    if (hero && planet) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        planet.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
    }
});

// Dynamic Star Background
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
    
    // Add twinkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize stars on load
createStars();

// CTA Button Animation
document.querySelector('.cta-button').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
        // Scroll to destinations section
        document.querySelector('#destinations').scrollIntoView({
            behavior: 'smooth'
        });
    }, 200);
});

// Form Input Validation
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#ff00ff';
            this.style.boxShadow = '0 0 10px rgba(255, 0, 255, 0.3)';
        } else {
            this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            this.style.boxShadow = 'none';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#00d4ff';
        this.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.3)';
    });
});

// Add hover effect to cards
document.querySelectorAll('.destination-card, .activity-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Set minimum date for travel booking (today)
const travelDateInput = document.getElementById('travel-date');
if (travelDateInput) {
    const today = new Date().toISOString().split('T')[0];
    travelDateInput.min = today;
}
