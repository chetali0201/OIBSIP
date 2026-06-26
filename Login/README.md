# 🔐 Login Authentication System

**Oasis Infobyte Web Development Internship — Level 2 Task**

A complete front-end login authentication system built with pure HTML5, CSS3, and Vanilla JavaScript. Passwords are hashed using the browser's built-in **Web Crypto API (SHA-256)** — never stored in plain text. Sessions are managed with `localStorage`.

---

## 📸 Screenshots

> _Add screenshots of your pages here after running the project._

| Login Page | Register Page | Dashboard |
|:---:|:---:|:---:|
| `screenshots/login.png` | `screenshots/register.png` | `screenshots/dashboard.png` |

---

## ✨ Features

- **User Registration** — Create an account with username, email, and password
- **Password Validation** — Minimum 8 characters and at least one number, enforced both client-side and in JS logic
- **Duplicate Prevention** — Can't register the same username or email twice
- **Live Password Rules** — Real-time checklist that ticks off as you type
- **Secure Login** — Generic error messages that don't reveal whether the username or password was wrong
- **SHA-256 Password Hashing** — Web Crypto API hashes passwords before they ever touch localStorage
- **Session Management** — Separate session object stored in localStorage; destroyed on logout
- **Protected Dashboard** — Automatically redirects unauthenticated users to the login page
- **Logout** — One click clears the session and returns to login
- **Responsive Design** — Works great on mobile, tablet, and desktop
- **Glassmorphism UI** — Deep navy + violet palette with animated floating blobs

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, glassmorphism, animations, responsive layout |
| Vanilla JavaScript (ES6+) | Auth logic, DOM manipulation, event handling |
| Web Crypto API (`SubtleCrypto`) | SHA-256 password hashing |
| localStorage | User data and session persistence |
| Google Fonts (Poppins) | Typography |

---

## 📁 Folder Structure

```
WebDev-L2-LoginAuthSystem/
│
├── index.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Protected dashboard (requires login)
├── style.css           # All styles — glassmorphism, animations, responsive
├── auth.js             # Core auth logic — hashing, register, login, session
└── README.md           # This file
```

---

## 🚀 Setup Instructions

This is a purely front-end project — **no build step, no server, no dependencies**.

### Option 1: Open directly in browser

1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)

```bash
# Clone the repo (if using Git)
git clone https://github.com/your-username/WebDev-L2-LoginAuthSystem.git

# Navigate into the folder
cd WebDev-L2-LoginAuthSystem

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html
```

### Option 2: Use VS Code Live Server (recommended)

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **"Open with Live Server"**
3. The project opens at `http://127.0.0.1:5500`

> **Note:** Opening HTML files via `file://` protocol may block some browser features (like the Web Crypto API on older browsers). Using Live Server avoids this.

---

## 🔑 How to Test

1. **Go to `register.html`** — create a test account
   - Try submitting empty fields (should block and show hints)
   - Try a password shorter than 8 chars or without a number (should fail validation)
   - Register successfully with a valid username, email, and strong password

2. **Go to `index.html`** — log in with your test account
   - Try wrong credentials (should show a generic error, no field-specific hint)
   - Log in with correct credentials → redirects to dashboard

3. **Dashboard** — see your welcome message and session info
   - Try navigating to `dashboard.html` in a new tab without logging in → should redirect to login

4. **Logout** — click the log out button → session is cleared, back to login

---

## 🔒 Security Notes

| ✅ Implemented | ❌ Not in scope (front-end only) |
|---|---|
| SHA-256 password hashing | Server-side authentication |
| Generic login error messages | HTTPS / TLS encryption |
| Session stored separately from users | JWT / secure cookies |
| No passwords stored in plain text | Rate limiting / brute force protection |

> This is a **client-side demonstration** for an internship project. In a production application, authentication must always be handled on a secure server with proper session management, HTTPS, and a real database.

---

## 🎨 Design Highlights

- **Color Palette:** Deep navy `#0F172A` → indigo `#1E1B4B` gradient background
- **Accent:** Violet `#6366F1` with lavender `#C4B5FD` highlights  
- **Typography:** Poppins (Google Fonts) — friendly, modern, readable
- **Signature Element:** Three animated floating blobs behind the auth cards (pure CSS keyframe animation)
- **Glassmorphism:** `backdrop-filter: blur(20px)` with semi-transparent borders

---

## 👨‍💻 About

Built as part of the **Oasis Infobyte Web Development Internship — Level 2**.

**Intern:** _[Your Name]_  
**Task:** Login Authentication System  
**Date:** _[Month Year]_

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
