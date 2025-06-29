// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target').replace(/,/g, ''));
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Card hover effects
const cards = document.querySelectorAll('.team-card, .player-card, .news-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Team button interactions
const teamButtons = document.querySelectorAll('.team-btn');

teamButtons.forEach(button => {
    button.addEventListener('click', function() {
        const teamName = this.parentElement.querySelector('h3').textContent;
        showTeamStats(teamName);
    });
});

function showTeamStats(teamName) {
    // Mock team stats data
    const teamStats = {
        'Thunder Bolts': {
            wins: 45,
            losses: 20,
            homeRuns: 156,
            era: 3.24,
            battingAvg: 0.287
        },
        'Lightning Strikes': {
            wins: 42,
            losses: 23,
            homeRuns: 142,
            era: 3.45,
            battingAvg: 0.275
        },
        'Storm Chasers': {
            wins: 38,
            losses: 27,
            homeRuns: 128,
            era: 3.67,
            battingAvg: 0.268
        }
    };
    
    const stats = teamStats[teamName];
    if (stats) {
        alert(`${teamName} Stats:\nRecord: ${stats.wins}-${stats.losses}\nHome Runs: ${stats.homeRuns}\nTeam ERA: ${stats.era}\nBatting Average: ${stats.battingAvg}`);
    }
}

// CTA Button interaction
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const teamsSection = document.querySelector('#teams');
        if (teamsSection) {
            teamsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Dynamic greeting based on time of day
function updateGreeting() {
    const heroContent = document.querySelector('.hero-content p');
    const currentHour = new Date().getHours();
    let greeting;
    
    if (currentHour < 12) {
        greeting = "Good morning, baseball fans! Your ultimate destination for baseball stats, news, and analysis";
    } else if (currentHour < 18) {
        greeting = "Good afternoon, baseball enthusiasts! Your ultimate destination for baseball stats, news, and analysis";
    } else {
        greeting = "Good evening, diamond devotees! Your ultimate destination for baseball stats, news, and analysis";
    }
    
    if (heroContent) {
        heroContent.textContent = greeting;
    }
}

// Baseball field animation
function animateBaseballField() {
    const field = document.querySelector('.baseball-field');
    if (field) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            field.style.transform = `rotate(${rotation}deg)`;
        }, 50);
    }
}

// News card click handlers
const newsCards = document.querySelectorAll('.news-card');
newsCards.forEach(card => {
    card.addEventListener('click', function() {
        const headline = this.querySelector('h3').textContent;
        const date = this.querySelector('.news-date').textContent;
        const excerpt = this.querySelector('p:last-of-type').textContent;
        
        // Simple modal-like alert (in a real app, you'd use a proper modal)
        alert(`${headline}\n\nPublished: ${date}\n\n${excerpt}\n\n[This would open the full article in a real implementation]`);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 71, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1a472a, #2d5f3f)';
        navbar.style.backdropFilter = 'none';
    }
});

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    animateBaseballField();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code for baseball sound
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Baseball cheer animation
        const body = document.body;
        body.style.animation = 'shake 0.5s ease-in-out 3';
        
        // Create confetti effect
        createConfetti();
        
        setTimeout(() => {
            body.style.animation = '';
        }, 1500);
        
        konamiCode = [];
    }
});

function createConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const fallDuration = Math.random() * 3 + 2;
        confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            confetti.remove();
        };
    }
}

// Add CSS keyframes for shake animation
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}`;

const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll event
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 71, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1a472a, #2d5f3f)';
        navbar.style.backdropFilter = 'none';
    }
}, 16));

// Add baseball-themed cursor trail effect
let mouseTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // Clean up old trail elements
    const oldTrails = document.querySelectorAll('.mouse-trail');
    oldTrails.forEach(trail => {
        if (Date.now() - parseInt(trail.dataset.time) > 1000) {
            trail.remove();
        }
    });
    
    // Create new trail element occasionally
    if (Math.random() < 0.1) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.textContent = '⚾';
        trail.dataset.time = Date.now();
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 9998;
            animation: fadeOut 1s ease-out forwards;
        `;
        document.body.appendChild(trail);
    }
});

// Add fadeOut animation for mouse trail
const trailKeyframes = `
@keyframes fadeOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
}`;

style.textContent += trailKeyframes;

console.log('🏟️ Welcome to Home Run Heroes! ⚾');
console.log('Try the Konami code for a surprise: ↑↑↓↓←→←→BA');