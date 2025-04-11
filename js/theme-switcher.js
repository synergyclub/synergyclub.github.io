document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Helper function to get a cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Helper function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    // Load saved theme from cookies
    const savedTheme = getCookie('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeSwitcher.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Add event listener to toggle theme
    themeSwitcher.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        themeSwitcher.textContent = isDarkMode ? '☀️' : '🌙';
        setCookie('theme', isDarkMode ? 'dark' : 'light', 30); // Save theme for 30 days
    });
});