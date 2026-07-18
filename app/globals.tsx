/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================================
   PROFESSIONAL COLOR SCHEME
   ============================================================ */

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #60a5fa;
  --secondary: #7c3aed;
  --accent: #06b6d4;
  --background: #0f172a;
  --surface: #1e293b;
  --surface-light: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --success: #22c55e;
  --warning: #eab308;
  --error: #ef4444;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--background);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ============================================================
   SCROLLBAR STYLING
   ============================================================ */

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--surface);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}

/* ============================================================
   ANIMATIONS
   ============================================================ */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out forwards;
}

/* ============================================================
   GLASS EFFECT
   ============================================================ */

.glass {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-light {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* ============================================================
   GRADIENT TEXT
   ============================================================ */

.gradient-text {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ============================================================
   BUTTON STYLES
   ============================================================ */

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* ============================================================
   INPUT STYLES
   ============================================================ */

.input-primary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.3s ease;
  width: 100%;
}

.input-primary:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.input-primary::placeholder {
  color: var(--text-secondary);
}

/* ============================================================
   CUSTOM FILE UPLOAD
   ============================================================ */

.file-upload {
  position: relative;
  display: inline-block;
}

.file-upload-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-upload-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-label:hover {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.file-upload-label.dragging {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
  transform: scale(1.02);
}

/* ============================================================
   CHAT MESSAGES
   ============================================================ */

.message-user {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-radius: 1rem 1rem 0.25rem 1rem;
  padding: 1rem 1.25rem;
  max-width: 80%;
  margin-left: auto;
  animation: slideIn 0.3s ease-out forwards;
}

.message-assistant {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem 1rem 1rem 0.25rem;
  padding: 1rem 1.25rem;
  max-width: 80%;
  margin-right: auto;
  animation: fadeIn 0.5s ease-out forwards;
}

/* ============================================================
   STATS CARDS
   ============================================================ */

.stat-card {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.stat-card .icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.stat-card .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-card .label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ============================================================
   HEALTH INDICATOR
   ============================================================ */

.health-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.health-bar {
  flex: 1;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  overflow: hidden;
}

.health-bar-fill {
  height: 100%;
  border-radius: 0.25rem;
  transition: width 1s ease;
}

.health-bar-fill.excellent {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.health-bar-fill.good {
  background: linear-gradient(90deg, #eab308, #ca8a04);
}

.health-bar-fill.poor {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

/* ============================================================
   TAGS / CHIPS
   ============================================================ */

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

.tag-primary {
  background: rgba(37, 99, 235, 0.15);
  color: var(--primary-light);
  border-color: rgba(37, 99, 235, 0.2);
}

.tag-success {
  background: rgba(34, 197, 94, 0.15);
  color: var(--success);
  border-color: rgba(34, 197, 94, 0.2);
}

.tag-warning {
  background: rgba(234, 179, 8, 0.15);
  color: var(--warning);
  border-color: rgba(234, 179, 8, 0.2);
}

.tag-error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--error);
  border-color: rgba(239, 68, 68, 0.2);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 640px) {
  .message-user,
  .message-assistant {
    max-width: 95%;
  }
}

/* ============================================================
   LOADING SPINNER
   ============================================================ */

.spinner {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}