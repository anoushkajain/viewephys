Quickstart
==========

viewephys is designed to be intuitive and easy to use. This quickstart guide walks you 
through the basics of opening a recording and navigating the viewer.

In this section you will:

- Load a dataset
- Launch the viewer
- Navigate through the data

----

Step 1 — Prepare your data
--------------------------

viewephys works with electrophysiology data files (e.g. binary recordings
such as ``.bin`` files). Make sure you have:

- A valid data file (``.bin`` or ``.cbin``)
- Knowledge of its sampling rate and channel structure ( you can usually find this in the metadata file, e.g. ``.meta`` or ``.ch``)

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Extension
     - Description
   * - ``.bin``
     - Raw binary Neuropixels recording (SpikeGLX format)
   * - ``.cbin``
     - IBL compressed binary format (requires ``mtscomp``)

.. note::

   viewephys reads the metadata file (``.meta`` or ``.ch``) automatically
   if it is in the same folder as your data file. If no metadata file is
   found, you will be asked to provide the channel count and sampling rate
   manually.

----

Step 2 — Launch the viewer
--------------------------

**From the command line**

The simplest way to start:

.. code-block:: bash

   viewephys -f /path/to/your/recording.bin

The viewer opens immediately.

**From the GUI**

1. Launch the viewer with no arguments:

   .. code-block:: bash

      viewephys

2. From the menu bar, choose **File → Open**
3. Navigate to your ``.bin`` or ``.cbin`` file and select it

----

Step 3 — Load from Python (optional)
--------------------------------------

You can also use viewephys within a Python session — useful for testing
or integrating the viewer into an existing analysis script:

.. code-block:: python

   import numpy as np
   from viewephys.gui import viewephys

   # Simulate one second of Neuropixels data (384 channels, 30 kHz)
   nc, ns, fs = 384, 50_000, 30_000
   data = np.random.randn(nc, ns) / 1e6  # data in Volts

   ve = viewephys(data, fs=fs)

.. note::

   **IPython / Jupyter users**

   Add the Qt event loop magic before importing::

      %gui qt

**Opening multiple windows**

viewephys supports multiple instances simultaneously.
Each window must have a unique title:

.. code-block:: python

   data2 = data * 50
   ve2 = viewephys(data2, fs=fs, title="plot 2")

This is useful for comparing two versions of the same recording side by
side — for example, raw vs destriped data. See :doc:`interface` for how
to link windows and run viewephys from a script.

----

Step 4 — Explore the interface
-------------------------------

Once the viewer opens, you will see a density-mode display:

.. image:: _static/viewephys_gui.JPG
   :alt: viewephys main trace window showing density-mode display with channels 180-230
   :align: center
   :width: 95%

|

.. note::

   This screenshot shows channels 180–230. The viewer loads all channels —
   scroll vertically to navigate the full probe depth.

- **Dark regions** — low activity or background noise
- **Light regions** — signal events (spikes, LFP deflections)
- **Vertical dark band** — electrical artefact (noise band)
- **Status bar** (bottom left) — updates as you hover: voltage, signal
  value, and channel number

**Navigating the viewer**

.. list-table::
   :widths: 45 55
   :header-rows: 1

   * - Action
     - How
   * - Scroll through time
     - Mouse wheel or drag
   * - Switch channels
     - Scroll vertically
   * - Zoom in / out
     - Ctrl + scroll
   * - Increase gain
     - ``Ctrl + A``
   * - Decrease gain
     - ``Ctrl + Z``
   * - Switch display mode
     - Menu → **View** → Density / Wiggle
   * - Link multiple windows
     - ``Ctrl + P`` (multi-window mode)

To inspect a specific channel, hover over it — the channel number and
voltage update in real time in the bottom-left status bar. See the
:doc:`interface` guide for a full explanation of every control and menu
option.

----

Step 5 — Your first quality check
-----------------------------------

Follow this sequence when opening a new recording for the first time:

**1. Check the gain**

When the file first opens, the default gain may make the trace look flat
or clipped. Press ``Ctrl + A`` a few times to increase gain until
individual channels become visible.

**2. Identify noise bands**

Look for bright vertical stripes spanning all channels simultaneously.
These are electrical artefacts (often 50 or 60 Hz line noise), not neural
signal. Note their position in time — you will want to remove them with
``ibldsp.voltage.destripe()`` before sorting.

**3. Find a clean region**

Scroll to a region where channels show clear contrast — dark background
with bright deflections on a few channels. This indicates good
signal-to-noise ratio (SNR).

**4. Check for probe drift**

Scroll through time and watch whether active channels gradually shift
upward or downward. Gradual channel migration over time indicates probe
drift, which should be corrected before spike sorting.

----

Next steps
----------

Now that you can open and navigate a recording:

- Read the :doc:`interface` guide for a full explanation of every control
  and menu option
- Read the :doc:`controls` reference for all keyboard shortcuts
- See the :doc:`faq` for common issues
- Explore the `IBL documentation hub <https://docs.internationalbrainlab.org>`_
  for the next steps in the pipeline (destriping, spike sorting, quality
  metrics)