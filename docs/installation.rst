Installation
============

Requirements
------------

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Requirement
     - Version / notes
   * - Python
     - 3.8 or higher (3.12 recommended)
   * - Operating system
     - Linux, macOS, Windows
   * - Qt backend
     - Installed automatically via PyPI

Option 1 — Install from PyPI (recommended)
-------------------------------------------

This is the fastest way to get started.

**Step 1 — Create a virtual environment**

Using a virtual environment keeps viewephys isolated from your system Python.

*Using conda (recommended):*

.. code-block:: bash

   conda create -n viewephys python=3.12
   conda activate viewephys

*Using venv:*

.. code-block:: bash

   python -m venv venv
   source venv/bin/activate        # macOS / Linux
   venv\Scripts\activate           # Windows

**Step 2 — Install viewephys**

.. code-block:: bash

   pip install viewephys

**Step 3 — Verify the installation**

.. code-block:: bash

   viewephys --help

You should see available commands and options printed to the terminal.

Option 2 — Install from source (development)
---------------------------------------------

Use this if you want the latest unreleased changes or plan to contribute.

.. code-block:: bash

   git clone https://github.com/int-brain-lab/viewephys.git
   cd viewephys
   pip install -e .

The ``-e`` flag installs in *editable mode*: changes you make to the source
are immediately reflected without reinstalling.

Option 3 — IBL unified environment
------------------------------------

If you are already using the
`IBL unified environment (iblenv) <https://github.com/int-brain-lab/iblenv>`_,
viewephys is compatible and can be installed into it directly:

.. code-block:: bash

   conda activate iblenv
   pip install viewephys

Troubleshooting
---------------

.. warning::

   **Qt errors on Linux**

   On headless Linux servers, the Qt GUI backend may fail. Run viewephys on a
   machine with a display, or use a virtual display::

      export DISPLAY=:0

.. note::

   **Older Python versions**

   Python 3.8–3.11 are supported but 3.12 is recommended. If you see dependency
   conflicts, create a fresh environment with Python 3.12.

.. tip::

   **Windows path issues**

   If ``viewephys --help`` is not found after installation, ensure your virtual
   environment is activated and that ``Scripts/`` is on your PATH.