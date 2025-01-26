// Add error handling and browser compatibility check
        window.addEventListener('load', async function() {
            console.log("Window loaded, initializing particles...");
            if (typeof tsParticles === 'undefined') {
                console.error('tsParticles library failed to load');
                return;
            }
            
            try {
                console.log("Starting tsParticles initialization...");
                await tsParticles.init();
                console.log("tsParticles initialized successfully");
                await tsParticles.load("particles-js", {
                    fullScreen: {
                        enable: false
                    },
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#64ffda"
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: 0.5,
                        random: false
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "destroy"
                    },
                    collisions: {
                        enable: true,
                        mode: "destroy"
                    }
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: "attract"
                        }
                    }
                },
                background: {
                    color: "#0a192f"
                }
            });
                console.log("Particles loaded successfully");
                
                // Verify canvas creation
                const canvas = document.querySelector("#particles-js canvas");
                if (canvas) {
                    console.log("Canvas element found:", canvas);
                } else {
                    console.error("Canvas element not found in DOM");
                }
            } catch (error) {
                console.error('Error during particles initialization:', error);
            }
        });