# Authentication Setup Instructions

## Google OAuth 2.0 Setup

1. Go to the Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google OAuth 2.0 API
4. Go to the Credentials section
5. Create OAuth 2.0 Client ID credentials
   - Choose "Web application" as the application type
   - Add your domain to the authorized JavaScript origins
   - Add your redirect URI (usually your domain + /oauth2callback)
6. Note down the Client ID and API Key

## Implementation Steps

1. Replace the placeholder values in js/auth.js:
   - Replace YOUR_GOOGLE_CLIENT_ID with the Client ID from Google Cloud Console
   - Replace YOUR_GOOGLE_API_KEY with the API Key from Google Cloud Console

2. Add the following code to your HTML files (place it before the closing </body> tag):

```html
<!-- Add Google Sign-In button and user info display -->
<div id="auth-container">
    <button id="signin-button" onclick="signIn()">Sign in with Google</button>
    <button id="signout-button" onclick="signOut()" style="display: none;">Sign Out</button>
    <div id="user-info"></div>
</div>

<!-- Add Google API and authentication scripts -->
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="js/auth.js"></script>
<script>
    // Initialize the Google Sign-In when the page loads
    window.onload = function() {
        initAuth();
    };
</script>
```

3. Add basic CSS styles for the auth container (add to your CSS file):

```css
#auth-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

#signin-button, #signout-button {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#user-info {
    margin-top: 10px;
    font-size: 14px;
}
```

4. Configure your web server to handle HTTPS (required for OAuth 2.0)

## Security Considerations

- Always use HTTPS in production
- Keep your API keys and client secrets secure
- Implement proper session management
- Validate tokens on the server side if you're using a backend
- Regular security audits and updates

## Additional Features

You can extend the authentication system by:
- Adding more OAuth providers (Facebook, Twitter, etc.)
- Implementing email/password authentication
- Adding two-factor authentication
- Creating a user profile system