# Calculator — Web Development Internship Project (Level 2)

**Built by:** Chetali Kumbhare  
**Tech Stack:** HTML · CSS · Vanilla JavaScript  
**Type:** Frontend Internship Project

---

## Project Overview

A clean, functional calculator built without any frameworks or external libraries. This project was built to practise real-world frontend skills — CSS Grid layout, DOM manipulation, event delegation, and writing readable JavaScript logic without shortcuts like `eval()`.

---

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Decimal number support
- Live result preview while typing
- Calculation history (last 5 entries)
- Backspace / delete button
- Clear (C) button
- Divide-by-zero protection
- Sequential operations (chain calculations)
- Full keyboard support
- Subtle page load fade-in animation
- Responsive for mobile and desktop

---

## Folder Structure

```
calculator-project/
├── index.html      ← Structure and layout
├── style.css       ← All styling, CSS variables, grid, responsive
├── script.js       ← All calculator logic and event handling
└── README.md       ← This file
```

---

## How to Run

No build steps needed. Just open `index.html` in any modern browser.

Or use VS Code's **Live Server** extension for auto-reload while editing.

---

## Keyboard Shortcuts

| Key          | Action       |
|--------------|--------------|
| `0–9`        | Enter digit  |
| `+` `-` `*`  | Operator     |
| `/`          | Divide       |
| `.`          | Decimal      |
| `Enter` `=`  | Evaluate     |
| `Backspace`  | Delete last  |
| `Escape`     | Clear all    |

---

## JavaScript Logic — How It Works

The JS is split into clear, focused functions. Here's a plain-English overview:

### State object
All calculator data lives in one `state` object:
```js
const state = {
  expression: "0",     // what the user is typing
  result: "",          // live preview result
  history: [],         // last 5 calculations
  justEvaluated: false // flag for post-equals behaviour
};
```

### Number input (`handleNumber`)
Appends a digit to the expression. If the user just pressed `=`, it starts fresh so the result isn't accidentally built on.

### Operator input (`handleOperator`)
Appends an operator like `+` or `×`. If an operator was already at the end, it replaces it instead of doubling up.

### Decimal (`handleDecimal`)
Checks the current number segment. Only adds `.` if that number doesn't already have one.

### Equals (`handleEquals`)
Calls `evaluate()`, saves the result to history, and sets the `justEvaluated` flag.

### Evaluator (`evaluate`) — no `eval()`
The expression string is split into an array of tokens (numbers and operators). It walks through them left to right: number → operator → number → result.

```
"8 × 3 + 2"
Tokens: ["8", "×", "3", "+", "2"]
Step 1: 8 × 3 = 24
Step 2: 24 + 2 = 26
```

Divide-by-zero is caught before division happens, and a friendly message is shown.

### Event delegation
A single `click` listener on the button grid reads `data-action` and `data-value` attributes from each button. This is cleaner than attaching one listener per button.

---

## Future Improvement Ideas

1. **Operator precedence** — Currently evaluates left to right. Could extend the evaluator to handle × and ÷ before + and − (BODMAS/PEMDAS).
2. **Percentage button** — Add a `%` key that converts the current number.
3. **Theme toggle** — Light/dark mode with a CSS variable swap.
4. **Persistent history** — Save history to `localStorage` so it survives page refresh.
5. **Bracket support** — Allow expressions like `(3 + 2) × 4`.
6. **Smooth digit transitions** — CSS transitions on the display when the result updates.
7. **Scientific mode** — Toggle to reveal √, x², sin, cos, log.
8. **Error shake animation** — Subtle shake on the display for invalid input.

---

*A Level 2 internship project — focused on clean code, not complexity.*
