// Auth Constants
const API_BASE_URL = 'http://localhost:3000/api';
const AUTH_TOKEN_KEY = 'cricket_live_auth_token';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Event Listeners
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Save token and redirect
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        window.location.href = '/';
    } catch (error) {
        showError(error.message);
    }
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const name = signupForm.name.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
        showError('All fields are required');
        return;
    }

    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        // Save token and redirect
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        window.location.href = '/';
    } catch (error) {
        showError(error.message);
    }
}

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const authCard = document.querySelector('.auth-card');
    authCard.insertBefore(errorElement, authCard.firstChild);
    
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// Check Authentication Status
export function isAuthenticated() {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

// Get Auth Token
export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Logout
export function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = '/login.html';
}
