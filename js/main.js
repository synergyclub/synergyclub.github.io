// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }
    const savedTheme = getCookie('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeSwitcher.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    themeSwitcher.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        themeSwitcher.textContent = isDarkMode ? '☀️' : '🌙';
        setCookie('theme', isDarkMode ? 'dark' : 'light', 30);
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    if (cookieBanner && acceptCookiesButton) {
        if (!getCookie('cookiesAccepted')) {
            cookieBanner.style.display = 'block';
        }
        acceptCookiesButton.addEventListener('click', () => {
            setCookie('cookiesAccepted', 'true', 365);
            cookieBanner.style.display = 'none';
        });
    }

    // Scroll Animations (timeline)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.2 });
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll to Top Button
    const toTopBtn = document.getElementById('to-top-btn');
    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                toTopBtn.classList.add('show');
                toTopBtn.classList.remove('hide');
            } else {
                toTopBtn.classList.add('hide');
                toTopBtn.classList.remove('show');
            }
        });
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            this.classList.toggle('open');
        });
    }
});