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
     - 3.10 or higher (3.12 recommended)
   * - Operating system
     - Linux, macOS, Windows
   * - Qt backend
     - installed automatically

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

   python3.12 -m venv venv
   source venv/bin/activate        # macOS / Linux
   venv\Scripts\activate           # Windows

.. note::

   If you do not have Python 3.12, replace ``python3.12`` with your installed
   version (e.g. ``python3.10``). Python 3.10 or higher is required.
   To check your version run ``python3 --version``.

**Step 2 — Install viewephys**

.. code-block:: bash

   pip install viewephys



**Step 3 — Verify the installation**

.. code-block:: bash

   viewephys --help

You should see available commands and options printed to the terminal.

.. tip::

   **Windows path issues**

   If ``viewephys --help`` is not found after installation, ensure your virtual
   environment is activated and that ``Scripts/`` is on your PATH.

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


