# OAuth Setup Instructions

## Step 1: Set Up Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google OAuth 2.0 API from the API Library
4. Go to the Credentials section

## Step 2: Create OAuth 2.0 Credentials
1. Click "Create Credentials" and select "OAuth 2.0 Client ID"
2. Choose "Web application" as the application type
3. Set up Authorized JavaScript Origins:
   - Add `http://localhost` (for local testing)
   - Add your production domain (e.g., `https://yourdomain.com`)
4. Set up Authorized Redirect URIs:
   - Add `http://localhost` (for local testing)
   - Add your production domain (e.g., `https://yourdomain.com`)
5. Click Create

## Step 3: Get Your Credentials
1. Note down your Client ID and API Key
2. Update `js/auth.js` with your credentials:
   - Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID
   - Replace `YOUR_GOOGLE_API_KEY` with your actual API Key

## Step 4: Set Up HTTPS
OAuth 2.0 requires HTTPS in production. Make sure your web server is configured for HTTPS.

## Step 5: Testing
1. Test locally using `http://localhost`
2. Verify sign in/out functionality works
3. Check that user info is displayed correctly

## Security Notes
- Never commit API keys or client secrets to version control
- Use environment variables or secure configuration management in production
- Regularly rotate API keys
- Monitor OAuth usage in Google Cloud Console
- Implement proper session management
- Consider adding rate limiting for auth attempts