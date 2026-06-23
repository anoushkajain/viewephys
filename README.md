# viewephys

It is a lightweight Python tool developed by the
[International Brain Laboratory (IBL)](https://www.internationalbrainlab.com/)
to visualize raw Neuropixel electrophysiology data.

## Installation

```shell
pip install viewephys
```

For a virtual environment setup, development install, and Qt backend options,
see the [installation guide](https://anoushkajain.github.io/viewephys/installation.html).

## Quick start

```shell
viewephys                        # open the GUI, then File → Open
viewephys -f /path/to/raw.bin   # open a specific file directly
```

Or from Python:

```python
import numpy as np
from viewephys.gui import viewephys

data = np.random.randn(384, 50000) / 1e6  # (channels, samples) in Volts
ve = viewephys(data, fs=30000)
```

For a full walkthrough — including script usage and loading NumPy arrays —
see the [quickstart guide](https://anoushkajain.github.io/viewephys/quickstart.html).

## Controls

| Shortcut | Action |
|---|---|
| `Ctrl + A` | Increase display gain (+3 dB) |
| `Ctrl + Z` | Decrease display gain (−3 dB) |
| `Ctrl + P` | Link pan, zoom, and gain across open windows |

For the full interface reference see the [interface guide](https://anoushkajain.github.io/viewephys/interface.html).

## Documentation

The full hosted documentation is at **https://anoushkajain.github.io/viewephys/index.html**
and covers installation, quickstart guide, full interface reference, and FAQ.

### Documentation source

The docs live in the [`docs/`](docs/) directory and are built with
[Sphinx](https://www.sphinx-doc.org/) using the
[Furo](https://pradyunsg.me/furo/) theme.

```
docs/
├── conf.py            # Sphinx configuration
├── requirements.txt   # Sphinx build dependencies
├── index.rst          # Landing page and toctree
├── installation.rst
├── quickstart.rst
├── interface.rst
├── faq.rst
├── community.rst
├── release_notes.rst
└── _static/           # Images and assets
```

### Build the documentation locally

**Step 1 — Clone the repository**

```shell
git clone https://github.com/anoushkajain/viewephys.git
cd viewephys
```

> To contribute documentation changes, fork the repository on GitHub first,
> then clone your fork instead.

**Step 2 — Install the build dependencies**

```shell
pip install -r docs/requirements.txt
```

**Step 3 — Build the HTML**

```shell
sphinx-build -b html docs docs/_build/html
```

**Step 4 — Open in a browser**

```shell
# macOS / Linux
open docs/_build/html/index.html

# Windows
start docs/_build/html/index.html
```

The built site will be in `docs/_build/html/`. Changes to `.rst` files are
reflected immediately on the next build — no reinstall needed.

### Run the docs chatbot locally

A chat widget is embedded in every docs page. It requires a small backend to
call the Claude API. To run it:

```shell
pip install -r chatbot/requirements.txt
ANTHROPIC_API_KEY=sk-...  uvicorn chatbot.app:app --reload   # macOS / Linux
$env:ANTHROPIC_API_KEY="sk-..."                               # Windows (PowerShell)
uvicorn chatbot.app:app --reload
```

Then rebuild the docs (`sphinx-build -b html docs docs/_build/html`) and open
`docs/_build/html/index.html`. The chat button appears in the bottom-right
corner of every page. If the backend is not running, the widget shows a
friendly error message.
