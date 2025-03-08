// Authentication Module
const API_BASE_URL = 'https://api.gullycricket.live/v1';

// User session management
let currentUser = null;

// Initialize auth state from localStorage
const initializeAuth = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
        currentUser = JSON.parse(userData);
    }
};

// Login function
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        currentUser = data.user;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Signup function
export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        const data = await response.json();
        currentUser = data.user;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

// Logout function
export const logout = () => {
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/login.html';
};

// Get current user
export const getCurrentUser = () => {
    return currentUser;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!currentUser;
};

// Password reset request
export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('Password reset request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
};

// Verify password reset token
export const verifyPasswordResetToken = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-reset-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error('Invalid or expired token');
        }

        return await response.json();
    } catch (error) {
        console.error('Token verification error:', error);
        throw error;
    }
};

// Update password
export const updatePassword = async (token, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, newPassword })
        });

        if (!response.ok) {
            throw new Error('Password update failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Password update error:', error);
        throw error;
    }
};

// Initialize auth state when module loads
initializeAuth();
