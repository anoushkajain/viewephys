Quickstart
==========

This guide walks you through opening a recording and exploring the interface
for the first time.

Option 1: Command line (fastest)
---------------------------------

If you have a SpikeGLX binary file (``.bin`` or ``.cbin``), launch the viewer
directly from the terminal:

.. code-block:: bash

   viewephys -f /path/to/your/recording.ap.bin

The viewer opens with a navigation window. Use the horizontal slider to scrub
through time, or type a time in seconds in the **Jump to** box and press Enter.

To open an empty viewer and load a file via the menu instead:

.. code-block:: bash

   viewephys

Then use **File → Open** to select your recording.

.. note::

   The ``-f`` flag is required when passing a file path on the command line.
   ``viewephys /path/to/file.bin`` (without ``-f``) will not work.

Option 2: Interactive Python session (IPython / Jupyter)
---------------------------------------------------------

.. code-block:: python

   # In IPython, enable the Qt event loop first:
   %gui qt

   import numpy as np
   from viewephys.gui import viewephys

   # Simulate one second of Neuropixels data (384 channels, 30 kHz)
   nc, ns, fs = 384, 50000, 30000
   data = np.random.randn(nc, ns) / 1e6  # values in volts

   ve = viewephys(data, fs=fs)

You can open multiple windows at once — each must have a unique title:

.. code-block:: python

   ve2 = viewephys(data * 50, fs=fs, title="amplified")

.. figure:: view_rand_array.png
   :alt: viewephys showing a NumPy array
   :width: 100%

   Two viewer windows displaying the same array at different gain levels.

.. warning::

   The ``%gui qt`` magic must be run before creating any viewer window.
   Without it, the window will appear frozen or will not respond to input.

Option 3: From a Python script
-------------------------------

Scripts do not have a persistent Qt event loop the way IPython does.
You must create the application yourself and call ``app.exec()`` at the end,
otherwise the window closes immediately.

**Viewing a binary file from a script:**

.. code-block:: python

   from pathlib import Path
   from viewephys.gui import EphysBinViewer, create_app

   app = create_app()

   viewer = EphysBinViewer(Path("/path/to/your/recording.ap.bin"))

   app.exec()

**Viewing a NumPy array from a script:**

.. code-block:: python

   import numpy as np
   from viewephys.gui import viewephys, create_app

   app = create_app()

   nc, ns, fs = 384, 50000, 30000
   data = np.random.randn(nc, ns) / 1e6

   ve = viewephys(data, fs=fs)
   ve2 = viewephys(data * 50, fs=fs, title="amplified")

   app.exec()

Exploring the interface
------------------------

Once the viewer is open:

.. figure:: raw_bin_viewer_destripe.png
   :alt: viewephys binary file viewer showing destriped Neuropixels data
   :width: 100%

   The binary file viewer with destriped preprocessing selected.


- **Horizontal slider** — scrubs through time
- **Jump to box** — type a time in seconds and press Enter to jump directly
- **Checkboxes** (raw, destripe, butterworth, broadband) — open side-by-side
  views of the same data at different preprocessing stages
- **Ctrl + Z** — reduce gain by 3 dB
- **Ctrl + A** — increase gain by 3 dB
- **Ctrl + P** — link pan and zoom across all open windows

Common issues
--------------

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Problem
     - Solution
   * - ``ImportError: cannot import name 'viewephys' from 'viewephys'``
     - Use ``from viewephys.gui import viewephys``, not ``from viewephys import viewephys``
   * - Window opens but is frozen
     - In IPython, run ``%gui qt`` before creating the viewer
   * - Window closes immediately in a script
     - Add ``app = create_app()`` before the viewer and ``app.exec()`` at the end
   * - File not found
     - Check the path; use the ``-f`` flag on the command line
   * - No window appears at all
     - Ensure a Qt binding is installed: ``pip install PyQt5``
