// =========================================
//  Calculator — script.js
//  Author: Chetali Kumbhare
// =========================================

// --- State ---
// We keep all calculator data in one object so it's easy to track
const state = {
  expression: "0",     // What's shown on the top display line
  result: "",          // Live result shown below
  history: [],         // Array of last 5 completed calculations
  justEvaluated: false // Flag: did we just press '='? Helps handle next input correctly
};

// --- DOM References ---
const expressionEl  = document.getElementById("expression");
const resultEl      = document.getElementById("result");
const historyList   = document.getElementById("historyList");
const historyEmpty  = document.getElementById("historyEmpty");
const pageWrapper   = document.getElementById("pageWrapper");

// --- Page Load Animation ---
// Small delay so the transition is visible on first open
window.addEventListener("load", () => {
  setTimeout(() => {
    pageWrapper.classList.add("loaded");
  }, 80);
});

// =========================================
//  CORE LOGIC FUNCTIONS
// =========================================

/**
 * Handles a number button press (0–9).
 * If we just evaluated, start a fresh expression.
 * Replaces the initial "0" with the first digit.
 */
function handleNumber(value) {
  if (state.justEvaluated) {
    state.expression = value;
    state.justEvaluated = false;
  } else if (state.expression === "0") {
    state.expression = value;
  } else {
    state.expression += value;
  }
  updateLiveResult();
}

/**
 * Handles an operator button press (+, -, ×, ÷).
 * If we just evaluated, we continue chaining from the result.
 * Prevents double operators by replacing the last one if needed.
 */
function handleOperator(value) {
  if (state.justEvaluated) {
    // Chain from the result of the last calculation
    state.expression = state.result + " " + value + " ";
    state.justEvaluated = false;
  } else {
    // Remove trailing space+operator if the user changed their mind
    const trimmed = state.expression.trimEnd();
    const lastChar = trimmed.slice(-1);
    if (["+", "-", "×", "÷"].includes(lastChar)) {
      state.expression = trimmed.slice(0, -1).trimEnd() + " " + value + " ";
    } else {
      state.expression += " " + value + " ";
    }
  }
  clearActiveOperator();
  highlightActiveOperator(value);
  state.result = "";
  updateDisplay();
}

/**
 * Handles the decimal point button.
 * Prevents adding a second dot to the current number segment.
 */
function handleDecimal() {
  if (state.justEvaluated) {
    state.expression = "0.";
    state.justEvaluated = false;
    updateDisplay();
    return;
  }

  // Split expression by operators to get the last number segment
  const parts = state.expression.split(/[\+\-\×\÷]/);
  const lastPart = parts[parts.length - 1];

  // Only add a dot if the current number doesn't have one
  if (!lastPart.includes(".")) {
    // If expression ends with an operator, start "0."
    const lastChar = state.expression.slice(-1);
    if (["+", "-", "×", "÷", " "].includes(lastChar)) {
      state.expression += "0.";
    } else if (state.expression === "0") {
      state.expression = "0.";
    } else {
      state.expression += ".";
    }
  }
  updateDisplay();
}

/**
 * Handles the equals button.
 * Parses the expression, computes the result, saves to history.
 */
function handleEquals() {
  if (state.justEvaluated) return; // Don't re-evaluate

  const rawExpression = state.expression.trim();
  if (!rawExpression || rawExpression === "0") return;

  try {
    const answer = evaluate(rawExpression);

    if (answer === null) return; // Invalid expression silently ignored

    // Save to history (max 5 entries)
    const historyEntry = `${rawExpression} = ${answer}`;
    state.history.unshift(historyEntry);
    if (state.history.length > 5) state.history.pop();

    // Show answer on main display
    state.result = "";
    state.expression = String(answer);
    state.justEvaluated = true;

    clearActiveOperator();
    updateDisplay();
    renderHistory();

  } catch (e) {
    // If something unexpected goes wrong, show error briefly
    state.expression = "Error";
    state.result = "";
    state.justEvaluated = true;
    updateDisplay();
  }
}

/**
 * Clears everything and resets to initial state.
 */
function handleClear() {
  state.expression = "0";
  state.result = "";
  state.justEvaluated = false;
  clearActiveOperator();
  updateDisplay();
}

/**
 * Removes the last character from the expression (backspace).
 * If expression becomes empty, reset to "0".
 */
function handleBackspace() {
  if (state.justEvaluated) {
    handleClear();
    return;
  }

  // Remove trailing space + operator like " + " (3 chars) or just one char
  if (state.expression.length <= 1) {
    state.expression = "0";
  } else {
    // Check if we're deleting an operator with spaces around it
    if (state.expression.slice(-1) === " ") {
      state.expression = state.expression.trimEnd().slice(0, -1).trimEnd();
    } else {
      state.expression = state.expression.slice(0, -1);
    }

    // Avoid leaving a bare expression
    if (state.expression === "" || state.expression === "-") {
      state.expression = "0";
    }
  }

  updateLiveResult();
}

// =========================================
//  EVALUATOR (no eval())
// =========================================

/**
 * Parses and evaluates a math expression string.
 * Supports +, -, ×, ÷ with no operator precedence (left-to-right).
 * Returns null for invalid input, "Error" string for divide-by-zero.
 *
 * Example: "12 × 3 + 4" → 40
 */
function evaluate(expression) {
  // Replace display symbols with standard JS operators for parsing
  const cleaned = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .trim();

  // Split on operators while keeping them
  // This regex splits by +, -, *, / but keeps the delimiter
  const tokens = cleaned.split(/\s*([\+\-\*\/])\s*/).filter(t => t !== "");

  if (tokens.length === 0) return null;

  // First token must be a number
  let result = parseFloat(tokens[0]);
  if (isNaN(result)) return null;

  // Walk through operator-number pairs
  let i = 1;
  while (i < tokens.length) {
    const operator = tokens[i];
    const operand  = parseFloat(tokens[i + 1]);

    if (isNaN(operand)) return null;

    if (operator === "+") result += operand;
    else if (operator === "-") result -= operand;
    else if (operator === "*") result *= operand;
    else if (operator === "/") {
      if (operand === 0) {
        // Divide by zero — show friendly message
        state.expression = "Can't ÷ by 0";
        state.result = "";
        state.justEvaluated = true;
        updateDisplay();
        return null; // Signal to caller: stop processing
      }
      result /= operand;
    }

    i += 2;
  }

  // Round to avoid floating point drift (e.g. 0.1 + 0.2 = 0.30000000004)
  return parseFloat(result.toFixed(10));
}

// =========================================
//  LIVE RESULT PREVIEW
// =========================================

/**
 * Shows a dimmed result preview as the user types.
 * Only shows if the expression has at least one complete operation.
 */
function updateLiveResult() {
  const expr = state.expression.trim();

  // Check if expression contains an operator — if so, try to evaluate
  const hasOperator = /[\+\-×÷]/.test(expr);

  if (hasOperator) {
    const preview = evaluate(expr);
    if (preview !== null && String(preview) !== expr) {
      state.result = "= " + preview;
    } else {
      state.result = "";
    }
  } else {
    state.result = "";
  }

  updateDisplay();
}

// =========================================
//  DISPLAY & HISTORY UPDATES
// =========================================

/**
 * Syncs the DOM with the current state.
 */
function updateDisplay() {
  expressionEl.textContent = state.expression;
  resultEl.textContent     = state.result;
}

/**
 * Re-renders the history list.
 * Shows empty state text when there are no entries.
 */
function renderHistory() {
  if (state.history.length === 0) {
    historyEmpty.style.display = "block";
    historyList.innerHTML = "";
    return;
  }

  historyEmpty.style.display = "none";
  historyList.innerHTML = state.history
    .map(entry => `<li>${entry}</li>`)
    .join("");
}

// =========================================
//  OPERATOR HIGHLIGHT (visual feedback)
// =========================================

/**
 * Removes the .active class from all operator buttons.
 */
function clearActiveOperator() {
  document.querySelectorAll(".btn-operator").forEach(btn => {
    btn.classList.remove("active");
  });
}

/**
 * Adds .active class to the currently selected operator button.
 */
function highlightActiveOperator(value) {
  document.querySelectorAll(".btn-operator").forEach(btn => {
    if (btn.dataset.value === value) {
      btn.classList.add("active");
    }
  });
}

// =========================================
//  EVENT LISTENERS — Button Clicks
// =========================================

// One listener on the grid parent — delegates to the right handler
document.querySelector(".button-grid").addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  switch (action) {
    case "number":   handleNumber(value);   break;
    case "operator": handleOperator(value); break;
    case "decimal":  handleDecimal();       break;
    case "equals":   handleEquals();        break;
    case "clear":    handleClear();         break;
    case "backspace": handleBackspace();    break;
  }
});

// =========================================
//  EVENT LISTENERS — Keyboard Support
// =========================================

document.addEventListener("keydown", (e) => {
  // Digits 0–9
  if (e.key >= "0" && e.key <= "9") {
    handleNumber(e.key);
  }
  // Operators
  else if (e.key === "+") handleOperator("+");
  else if (e.key === "-") handleOperator("-");
  else if (e.key === "*") handleOperator("×");
  else if (e.key === "/") {
    e.preventDefault(); // Prevent browser quick-find
    handleOperator("÷");
  }
  // Decimal
  else if (e.key === ".") handleDecimal();
  // Equals / Enter
  else if (e.key === "=" || e.key === "Enter") handleEquals();
  // Backspace
  else if (e.key === "Backspace") handleBackspace();
  // Escape → Clear
  else if (e.key === "Escape") handleClear();
});

// =========================================
//  INIT
// =========================================

// Render initial state on page load
updateDisplay();
renderHistory();
