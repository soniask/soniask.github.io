/*
 * This file contains code for the following tasks:
 * 1. Create a new account.
 * 2. Sign in an existing account.
 * 3. Redirect a user to chat.html once they are logged in/signed up.
 */

// Tracks if the user has just submitted the form to sign up
var signingUp = false;

// Store DOM elements for login form
var loginForm = document.getElementById("login-form");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginButton = document.getElementById("login-button");
var loginError = document.getElementById("login-error");

// When the user logs in, send the email and password to firebase.
// Firebase will determine whether or not the user logged in correctly.
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    loginError.classList.remove('active');

    var email = loginEmail.value;
    var password = loginPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {

    })
    .catch(function(error) {
        loginError.textContent = error.message;
        loginError.classList.add('active');

    });
});

// Store DOM elements for signup form
var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-email");
var signupPassword = document.getElementById("signup-password");
var signupPasswordConfirm = document.getElementById("signup-password-confirm");
var signupError = document.getElementById("signup-error");

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    signupError.classList.remove('active');

    var displayName = signupName.value;
    var email = signupEmail.value;
    var password = signupPassword.value;
    var passwordConfirm = signupPasswordConfirm.value;

    if (password !== passwordConfirm) {
        signupError.textContent = 'Passwords do not match.';
        signupError.classList.add('active');
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            signingUp = true;

            // Update display name and profile picture
            user.updateProfile({
                displayName: displayName,
                photoURL: "https://www.gravatar.com/avatar/" + md5(email)
            }).then(function() {
                // Send verification email
                user.sendEmailVerification();
                // Redirect to chat page
                window.location.href = "chat.html";
            }, function(error) {
                signupError.textContent = error.message;
                signupError.classList.add('active');
            });
        })
        .catch(function (error) {
            signupError.textContent = error.message;
            signupError.classList.add('active');
        });
    }
});

// This callback is called whenever the user's logged in state changes,
// e.g. when the page first loads, when a user logs in, when a user logs out.
firebase.auth().onAuthStateChanged(function(user) {
  if (user && !signingUp) {
      window.location.href = "chat.html";
  }
});
