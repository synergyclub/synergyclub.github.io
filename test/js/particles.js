window.addEventListener('load', function() {
    try {
        tsParticles.load("particles-js", {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#64ffda" },
                shape: { type: "circle" },
                opacity: { value: 0.8 },
                size: { value: 3, random: true },
                links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 0.5 }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: ["connect", "grab", "bubble"] },
                    onClick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 1 } },
                    bubble: { distance: 250, size: 12.5, duration: 2, opacity: 0.8 },
                    repulse: { distance: 12, duration: 0.4 },
                    push: { quantity: 1 },
                    attract: { distance: 100, duration: 0.2, factor: 3 },
                    bounce: { distance: 200 },
                    connect: { distance: 100, links: { opacity: 0.5 }, radius: 200 },
                    trail: {
                        delay: 0.1, quantity: 3, pauseOnStop: true,
                        particles: { color: { value: "#ff0000" }, size: { value: 5 }, opacity: { value: 0.5 } }
                    },
                    slow: { factor: 3, radius: 200 },
                    pause: { radius: 200 }
                }
            },
            detectRetina: true
        });
        const MAX_PARTICLES = 200;
        setInterval(() => {
            const particlesInstance = tsParticles.domItem(0);
            if (particlesInstance) {
                const particlesArray = particlesInstance.particles.array;
                if (particlesArray.length > MAX_PARTICLES) {
                    const excess = particlesArray.length - MAX_PARTICLES;
                    for (let i = 0; i < excess; i++) {
                        particlesInstance.particles.remove(particlesArray[i]);
                    }
                }
            }
        }, 1000);
    } catch (error) {
        console.error('Error during particles initialization:', error);
    }
});
