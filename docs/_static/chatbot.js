/**
 * viewephys docs chatbot widget.
 *
 * Talks to the FastAPI backend at CHATBOT_API_URL.
 * To deploy: set window.CHATBOT_API_URL before this script loads,
 * e.g. in a chatbot_config.js that you add to html_js_files in conf.py.
 */
(function () {
  "use strict";

  // Relative URL works when docs are served by FastAPI (http://localhost:8000).
  // Override with window.CHATBOT_API_URL for external deployments.
  const API_URL = window.CHATBOT_API_URL || "/ask";

  // ── Build widget DOM ──────────────────────────────────────────────────────

  const root = document.createElement("div");
  root.id = "vchat-root";
  root.innerHTML = `
    <button id="vchat-btn" aria-label="Open docs assistant" title="Ask about viewephys">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
    <div id="vchat-panel" hidden>
      <div id="vchat-header">
        <span>viewephys assistant</span>
        <button id="vchat-close" aria-label="Close">&times;</button>
      </div>
      <div id="vchat-messages" role="log" aria-live="polite">
        <div class="vchat-msg vchat-bot">
          Hi! Ask me anything about viewephys — installation, usage, file
          formats, or how the interface works.
        </div>
      </div>
      <form id="vchat-form" autocomplete="off">
        <input id="vchat-input" type="text"
               placeholder="Ask a question…" aria-label="Question" />
        <button type="submit" id="vchat-send" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(root);

  const btn   = document.getElementById("vchat-btn");
  const panel = document.getElementById("vchat-panel");
  const close = document.getElementById("vchat-close");
  const form  = document.getElementById("vchat-form");
  const input = document.getElementById("vchat-input");
  const log   = document.getElementById("vchat-messages");

  // Conversation history sent to the backend for multi-turn context
  const history = [];

  // ── Toggle panel ─────────────────────────────────────────────────────────

  function openPanel() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    input.focus();
  }

  function closePanel() {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", function () {
    panel.hidden ? openPanel() : closePanel();
  });
  close.addEventListener("click", closePanel);

  // ── Render minimal markdown ───────────────────────────────────────────────

  function renderMarkdown(text) {
    return text
      // Escape HTML first
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      // ```code blocks```
      .replace(/```[\w]*\n?([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      // `inline code`
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // **bold**
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      // newlines → <br> (outside pre blocks)
      .replace(/\n/g, "<br>");
  }

  // ── Append a message bubble ───────────────────────────────────────────────

  function appendMsg(html, role) {
    const div = document.createElement("div");
    div.className = "vchat-msg vchat-" + role;
    div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  // ── Send a question ───────────────────────────────────────────────────────

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const question = input.value.trim();
    if (!question) return;

    input.value = "";
    input.disabled = true;
    document.getElementById("vchat-send").disabled = true;

    appendMsg(renderMarkdown(question), "user");
    const loader = appendMsg(
      '<span class="vchat-dots"><span></span><span></span><span></span></span>',
      "bot"
    );

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        loader.remove();
        appendMsg("<strong>Error " + res.status + ":</strong> " + (data.detail || "unknown error"), "bot vchat-error");
      } else {
        loader.remove();
        appendMsg(renderMarkdown(data.answer), "bot");

        // Keep last 4 turns in history (8 messages) to stay within limits
        history.push({ role: "user", content: question });
        history.push({ role: "assistant", content: data.answer });
        if (history.length > 8) history.splice(0, 2);
      }
    } catch (err) {
      loader.remove();
      appendMsg(
        "<strong>Could not reach the backend.</strong><br>" +
          "Make sure uvicorn is running: " +
          "<code>python -m uvicorn chatbot.app:app --reload</code>",
        "bot vchat-error"
      );
    } finally {
      input.disabled = false;
      document.getElementById("vchat-send").disabled = false;
      input.focus();
    }
  });
})();
