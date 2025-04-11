document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Helper function to check if a cookie exists
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

    // Show the cookie banner if the "cookiesAccepted" cookie is not set
    if (!getCookie('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }

    // Handle the "Accept" button click
    acceptCookiesButton.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365); // Save acceptance for 1 year
        cookieBanner.style.display = 'none';
    });
});