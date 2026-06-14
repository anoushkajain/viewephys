Installation
============

Requirements
------------

Before installing viewephys, make sure you have:

- **Python 3.10 or higher**
- **pip** installed
- A **Qt binding**: one of PyQt5, PyQt6, PySide2, or PySide6 (see below)
- A virtual environment (recommended)

.. note::

   viewephys renders its interface using Qt. You must have at least one Qt
   binding installed, otherwise the viewer window will not appear.
   PyQt5 is the most commonly used option.

Step 1 — Create a virtual environment
--------------------------------------

On macOS / Linux:

.. code-block:: bash

   python -m venv venv
   source venv/bin/activate

On Windows:

.. code-block:: bat

   python -m venv venv
   venv\Scripts\activate


Step 2 — Install viewephys
---------------------------

Install the package from PyPI along with a Qt binding:

.. code-block:: bash

   pip install viewephys PyQt5

If you prefer a different Qt backend:

.. code-block:: bash

   pip install viewephys PyQt6       # Qt 6
   pip install viewephys PySide6     # PySide Qt 6

Step 3 — Verify the installation
----------------------------------

.. code-block:: bash

   viewephys --help

You should see:

.. code-block:: text

   usage: viewephys [-h] [-f FILE]

   Electrophysiology file viewer with preprocessing options

   options:
     -h, --help            show this help message and exit
     -f FILE, --file FILE  path to the binary file to load

Install from source
-------------------

If you want the latest development version from GitHub:

.. code-block:: bash

   git clone https://github.com/int-brain-lab/viewephys.git
   cd viewephys
   pip install -e ".[qt]"

IBL environment
---------------

viewephys is also compatible with the
`IBL conda environment <https://github.com/int-brain-lab/iblenv>`_,
which bundles all dependencies including the Qt binding.
