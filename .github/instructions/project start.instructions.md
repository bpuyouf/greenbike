---
description: |
  Formatting and style rules for the frontend (HTML/CSS/JS) and backend (Node.js/Express)
  to keep the project consistent, readable, and maintainable.
applyTo: "**/*.{js,ts,html,css,json,md,env}"
---

## 📌 Purpose
These instructions define the formatting and style expectations for both the frontend and backend portions of the project so that generated and edited code stays uniform and easy to maintain.

## 🧰 Scope
Applies to:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js/Express JavaScript (or TypeScript if used)
- Configuration: `.env` / `.env.example`, `package.json`, and related project files

## ✅ Formatting & Style Rules
### General
- Use **UTF-8 encoding** with **LF line endings**.
- Keep line length under **100 characters** when practical.
- Use **2 spaces for indentation** (no tabs).
- Ensure files end with a single newline.

### JavaScript (Frontend + Backend)
- Prefer `const` and `let`; avoid `var`.
- Use **single quotes** for strings unless interpolation requires double quotes.
- Always terminate statements with semicolons.
- Use **async/await** for asynchronous code; avoid raw promise chains when possible.
- Require error handling (try/catch) around async operations and return meaningful errors.
- Keep functions small and focused; prefer one responsibility per function.

### HTML
- Use **semantic HTML elements** (`header`, `main`, `section`, `article`, `footer`, etc.).
- Keep structure clean: avoid deeply nested elements when possible.
- Use **BEM-style class names** for styling clarity (e.g., `block__element--modifier`).

### CSS
- Use **custom properties (CSS variables)** for colors, spacing, and shared values.
- Prefer **class-based styling** over element selectors.
- Keep selectors specific but not overly complex.
- Organize CSS logically (layout, typography, components), and keep repetition low.

### Environment Files
- Do **not commit** `.env` to source control.
- Keep a `.env.example` with placeholder values and no secrets.
- Read configuration values from `process.env` in Node.js (use `.env` only in local/dev). Use a library like `dotenv` for local loading.

## 🧠 Azure-specific Guidance (for later use)
- Use environment variables for all credentials and connection strings.
- Structure the app so it can be deployed as a single Node.js web app (e.g., Azure App Service) or as a container (Azure Container Apps).

## ✅ How to Use These Instructions
When you ask the agent to create or modify code:
- Follow these formatting rules consistently.
- If something is unclear (e.g., naming, folder structure), ask for clarification.
- If you want to enforce additional rules (e.g., linting, formatting tools), propose adding config files such as `eslint`, `prettier`, or `stylelint`.
