// Google OAuth 2.0 Configuration
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/oauth2/v4/rest"];
const SCOPES = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

let isSignedIn = false;
let userProfile = null;

function initAuth() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        
        // Handle the initial sign-in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        const user = gapi.auth2.getAuthInstance().currentUser.get();
        const profile = user.getBasicProfile();
        userProfile = {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl()
        };
        onSignIn();
    } else {
        userProfile = null;
        onSignOut();
    }
}

function signIn() {
    gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut();
}

function onSignIn() {
    // Update UI for signed-in state
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('signout-button').style.display = 'block';
    document.getElementById('user-info').innerHTML = `Welcome, ${userProfile.name}!`;
}

function onSignOut() {
    // Update UI for signed-out state
    document.getElementById('signin-button').style.display = 'block';
    document.getElementById('signout-button').style.display = 'none';
    document.getElementById('user-info').innerHTML = '';
}