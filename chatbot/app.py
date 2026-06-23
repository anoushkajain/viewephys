"""
viewephys docs chatbot — FastAPI backend.

All RST files are loaded once at startup and injected into the system prompt.
No vector DB or retrieval needed — the full docs fit comfortably in any modern
LLM context window.

Run locally:
    $env:ANTHROPIC_API_KEY = "sk-ant-..."
    python -m uvicorn chatbot.app:app --reload

Then open http://localhost:8000 — the docs are served by FastAPI itself,
so there is no need for a separate HTTP server or CORS configuration.
"""

from pathlib import Path

import anthropic
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="viewephys docs assistant")

# Allow requests from GitHub Pages and local dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


def _load_docs() -> str:
    docs_dir = Path(__file__).parent.parent / "docs"
    parts: list[str] = []
    for rst in sorted(docs_dir.glob("*.rst")):
        parts.append(f"## {rst.stem}\n\n{rst.read_text(encoding='utf-8')}")
    return "\n\n---\n\n".join(parts)


_DOCS = _load_docs()

_SYSTEM = f"""\
You are a concise, helpful assistant for viewephys — a lightweight Python tool \
for visualising raw Neuropixels electrophysiology data, developed by the \
International Brain Laboratory (IBL).

Answer questions using only the documentation provided below. Keep answers \
short and practical. If something is not covered, say so and point to the \
relevant documentation page. Do not invent details not found in the docs.

<documentation>
{_DOCS}
</documentation>"""


class ChatRequest(BaseModel):
    question: str
    history: list[dict[str, str]] = []


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ask")
def ask(body: ChatRequest) -> dict[str, str]:
    try:
        client = anthropic.Anthropic()
    except Exception as exc:
        raise HTTPException(
            status_code=500, detail=f"Anthropic client error: {exc}"
        ) from exc

    # Build message list: previous turns + current question
    messages = list(body.history) + [{"role": "user", "content": body.question}]

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",  # fast and cheap for a chat widget
            max_tokens=512,
            system=_SYSTEM,
            messages=messages,
        )
    except anthropic.AuthenticationError as exc:
        raise HTTPException(
            status_code=401, detail="Invalid ANTHROPIC_API_KEY"
        ) from exc
    except Exception as exc:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return {"answer": response.content[0].text}


# Serve the built docs at / — must come after all API routes
_DOCS_HTML = Path(__file__).parent.parent / "docs" / "_build" / "html"
if _DOCS_HTML.exists():
    app.mount("/", StaticFiles(directory=str(_DOCS_HTML), html=True), name="docs")
