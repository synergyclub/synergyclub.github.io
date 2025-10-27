document.addEventListener('DOMContentLoaded', () => {
    const siteTitle = document.querySelector('.site-title');
    const navLogo = document.querySelector('.nav-logo');
    
    // Make elements clickable and redirect to home
    const redirectToHome = (e) => {
        window.location.href = 'index.html';
    };

    siteTitle.style.cursor = 'pointer';
    navLogo.style.cursor = 'pointer';
    
    siteTitle.addEventListener('click', redirectToHome);
    navLogo.addEventListener('click', redirectToHome);
    
    const createTextParticles = () => {
        const logoRect = navLogo.getBoundingClientRect();
        const titleRect = siteTitle.getBoundingClientRect();
        
        const numParticles = 16;
        const textSymbols = ['✦', '✧', '*', '⚡'];
        
        // Define emission points for logo and title
        const emissionPoints = [
            // Logo points
            { x: logoRect.right, y: logoRect.top },

            { x: logoRect.right, y: logoRect.bottom },
            
            // Title points
            { x: titleRect.left, y: titleRect.top },
            { x: titleRect.left, y: titleRect.bottom },
        ];
        
        // Create particles from each emission point
        emissionPoints.forEach(point => {
            for (let i = 0; i < numParticles / emissionPoints.length; i++) {
                const particle = document.createElement('div');
                particle.className = 'text-particle';
                particle.textContent = textSymbols[Math.floor(Math.random() * textSymbols.length)];
                
                particle.style.position = 'fixed';
                particle.style.left = `${point.x}px`;
                particle.style.top = `${point.y}px`;
                particle.style.zIndex = '9999';
                
                document.body.insertBefore(particle, document.body.firstChild);
                
                // Animate particle
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * 40;
                particle.animate([
                    {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(0.5)'
                    },
                    {
                        opacity: 0,
                        transform: `translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        ) scale(1.2)`
                    }
                ], {
                    duration: 800,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                setTimeout(() => particle.remove(), 800);
            }
        });
    };

    // Add hover effects
    [siteTitle, navLogo].forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (element === siteTitle) {
                element.style.color = '#ffd700';
                element.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
            }
            if (element === navLogo) {
                element.style.transform = 'rotate(360deg)';
            }
            createTextParticles();
        });

        element.addEventListener('mouseleave', () => {
            if (element === siteTitle) {
                element.style.color = '';
                element.style.textShadow = '';
            }
            if (element === navLogo) {
                element.style.transform = 'rotate(0deg)';
            }
        });
    });
});