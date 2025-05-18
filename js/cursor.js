document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    // Add cursor classes
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    // Add cursors to DOM
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Update cursor position
    const moveCursor = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        cursorOutline.style.left = `${mouseX}px`;
        cursorOutline.style.top = `${mouseY}px`;
    };

    // Handle cursor hover effects
    const handleHover = () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(-45deg)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursorDot.style.filter = 'drop-shadow(0 0 15px #ffeb3b)';
        cursorOutline.style.opacity = '1';
    };

    const handleUnhover = () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 187, 0.9))';
        cursorOutline.style.opacity = '0.8';
    };

    // Add hover effects for all clickable elements
    const clickables = document.querySelectorAll(
        'a, button, .feature-card, .team-card, input[type="button"], input[type="submit"], .waffle-menu, .theme-switcher'
    );
    
    clickables.forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleUnhover);
    });

    // Create star particles function
    const createStarParticles = (x, y) => {
        const numStars = 12;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            star.textContent = '*';
            
            const angle = (i / numStars) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            star.style.setProperty('--angle', `${angle}rad`);
            star.style.setProperty('--distance', `${distance}px`);
            star.style.setProperty('--delay', `${Math.random() * 0.1}s`);
            
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 800);
        }
    };

    // Click effect
    document.addEventListener('click', (e) => {
        createStarParticles(e.clientX, e.clientY);
        
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursorDot.style.filter = 'drop-shadow(0 0 15px #ffeb3b)';
        
        setTimeout(() => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 187, 0.9))';
        }, 150);
    });

    // Handle cursor visibility
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.8';
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Add cursor tracking
    window.addEventListener('mousemove', moveCursor);
});

// Add styling for star particles
const style = document.createElement('style');
style.textContent = `
.star-particle {
    position: fixed;
    pointer-events: none;
    z-index: 99997;
    font-size: 48px; /* Larger size */
    color: #ffd700;
    text-shadow: 0 0 15px #ffeb3b;
    transform-origin: center;
    animation: starAnimation 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    animation-delay: var(--delay);
}

@keyframes starAnimation {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0.2);
    }
    20% {
        opacity: 1;
        transform: translate(
            calc(cos(var(--angle)) * var(--distance) * 0.3),
            calc(sin(var(--angle)) * var(--distance) * 0.3)
        ) scale(1.2);
    }
    100% {
        opacity: 0;
        transform: translate(
            calc(cos(var(--angle)) * var(--distance)),
            calc(sin(var(--angle)) * var(--distance))
        ) scale(0.5);
    }
}`;
document.head.appendChild(style);