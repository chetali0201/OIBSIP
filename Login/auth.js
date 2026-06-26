/**
 * auth.js — Authentication Logic
 * Oasis Infobyte Web Development Internship — Level 2
 * Login Authentication System
 *
 * Handles: user registration, login, session management,
 * password hashing (SHA-256 via Web Crypto API), and logout.
 */

// ─────────────────────────────────────────────
// Storage Keys
// ─────────────────────────────────────────────

const USERS_KEY = "oasis_users";       // Array of registered users
const SESSION_KEY = "oasis_session";   // Currently logged-in user

// ─────────────────────────────────────────────
// SHA-256 Hashing via Web Crypto API
// ─────────────────────────────────────────────

/**
 * Hashes a plain-text password using SHA-256.
 * Passwords are NEVER stored as plain text.
 *
 * @param {string} plainText - The raw password entered by the user
 * @returns {Promise<string>} - Hex-encoded SHA-256 hash
 */
async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  // Use the browser's built-in SubtleCrypto API
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the ArrayBuffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return hexHash;
}

// ─────────────────────────────────────────────
// User Storage Helpers
// ─────────────────────────────────────────────

/**
 * Retrieves all registered users from localStorage.
 * Returns an empty array if no users exist yet.
 *
 * @returns {Array} - Array of user objects
 */
function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Saves the full users array back to localStorage.
 *
 * @param {Array} users - The updated users array
 */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Finds a user by their username or email (case-insensitive).
 *
 * @param {string} identifier - Username or email to search for
 * @returns {Object|null} - The matching user object or null
 */
function findUser(identifier) {
  const users = getUsers();
  const lowerIdentifier = identifier.toLowerCase().trim();

  return users.find(
    u =>
      u.username.toLowerCase() === lowerIdentifier ||
      u.email.toLowerCase() === lowerIdentifier
  ) || null;
}

// ─────────────────────────────────────────────
// Session Management
// ─────────────────────────────────────────────

/**
 * Saves a login session for the given user.
 *
 * @param {string} username - The username to store in the session
 */
function createSession(username) {
  const session = {
    username: username,
    loggedInAt: new Date().toISOString()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Retrieves the current active session, if any.
 *
 * @returns {Object|null} - Session object or null if not logged in
 */
function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Destroys the current session (logout).
 */
function destroySession() {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Redirects to the login page if there's no active session.
 * Call this at the top of any protected page (e.g., dashboard).
 */
function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = "index.html";
  }
}

// ─────────────────────────────────────────────
// Password Validation
// ─────────────────────────────────────────────

/**
 * Validates a password against the required rules:
 * - Minimum 8 characters
 * - At least one number
 *
 * @param {string} password - The password to validate
 * @returns {Object} - { valid: boolean, message: string }
 */
function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must include at least one number." };
  }
  return { valid: true, message: "" };
}

// ─────────────────────────────────────────────
// Registration
// ─────────────────────────────────────────────

/**
 * Registers a new user after validating all inputs.
 * Hashes the password before storing.
 *
 * @param {string} username - The desired username
 * @param {string} email - The user's email address
 * @param {string} password - The plain-text password (will be hashed)
 * @returns {Promise<Object>} - { success: boolean, message: string }
 */
async function registerUser(username, email, password) {
  // Trim whitespace
  username = username.trim();
  email = email.trim();

  // Basic empty-field check
  if (!username || !email || !password) {
    return { success: false, message: "All fields are required." };
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // Password strength check
  const pwCheck = validatePassword(password);
  if (!pwCheck.valid) {
    return { success: false, message: pwCheck.message };
  }

  // Check for duplicate username or email
  const existingByUsername = findUser(username);
  const existingByEmail = findUser(email);

  if (existingByUsername) {
    return { success: false, message: "That username is already taken. Try another one!" };
  }
  if (existingByEmail) {
    return { success: false, message: "An account with that email already exists." };
  }

  // Hash the password before storing
  const hashedPassword = await hashPassword(password);

  // Build the new user object
  const newUser = {
    username: username,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  // Save to localStorage
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  return { success: true, message: "Account created successfully! Redirecting to login..." };
}

// ─────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────

/**
 * Attempts to log in a user with the given credentials.
 * Uses a generic error message to avoid revealing which field is wrong.
 *
 * @param {string} identifier - Username or email
 * @param {string} password - The plain-text password to verify
 * @returns {Promise<Object>} - { success: boolean, message: string }
 */
async function loginUser(identifier, password) {
  identifier = identifier.trim();

  // Empty-field check
  if (!identifier || !password) {
    return { success: false, message: "Please fill in all fields." };
  }

  // Look up the user
  const user = findUser(identifier);

  // Hash the entered password to compare
  const hashedInput = await hashPassword(password);

  // Generic error: do NOT reveal whether username or password is wrong
  if (!user || user.password !== hashedInput) {
    return { success: false, message: "Invalid credentials. Please check your details and try again." };
  }

  // Create a session and return success
  createSession(user.username);
  return { success: true, message: `Welcome back, ${user.username}!` };
}

// ─────────────────────────────────────────────
// Logout
// ─────────────────────────────────────────────

/**
 * Logs the current user out by destroying their session,
 * then redirects to the login page.
 */
function logoutUser() {
  destroySession();
  window.location.href = "index.html";
}
