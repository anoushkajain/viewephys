Quickstart
==========

This guide takes you from a raw electrophysiology file to an interactive
viewer in under five minutes.

----

Option A — Open a file from the command line
--------------------------------------------

The simplest way to start:

.. code-block:: bash

   viewephys -f /path/to/your/recording.bin

The viewer opens immediately. Replace the path with your actual ``.bin`` or ``.cbin`` file.

.. tip::

   Don't have a recording yet? Jump to **Option C** below to generate synthetic
   data and explore the interface without any real files.

----

Option B — Open a file from the GUI
------------------------------------

1. Launch the viewer with no arguments:

   .. code-block:: bash

      viewephys

2. From the menu bar, choose **File → Open**.
3. Navigate to your ``.bin`` or ``.cbin`` file and select it.

----

Option C — Load a NumPy array in Python
----------------------------------------

You can pass data directly from Python — useful for testing or for
integrating viewephys into an existing analysis script.

.. code-block:: python

   import numpy as np
   from viewephys.gui import viewephys

   # Simulate one second of Neuropixels data (384 channels, 30 kHz)
   nc, ns, fs = 384, 30_000, 30_000
   data = np.random.randn(nc, ns) / 1e6  # data in Volts

   ve = viewephys(data, fs=fs)

.. note::

   **IPython / Jupyter users**

   If you are running this inside IPython or a Jupyter notebook, add the Qt
   event loop magic before importing::

      %gui qt

----

What you will see
-----------------

Once the viewer opens, you will see a density-mode display:

- **Dark regions** = low activity or noise
- **Light regions** = signal events (spikes, LFP)
- **Vertical bright stripes** = electrical artefacts (noise bands)

----

Navigating the viewer
---------------------

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

To inspect a specific channel, hover over it — the channel number and voltage
update in real time in the bottom-left status bar. See the :doc:`interface`
guide for a full explanation of every control and menu option.

----

Step-by-step: your first quality check
---------------------------------------

Follow this sequence when opening a new recording for the first time:

**1. Check the gain**

When the file first opens, the default gain may make the trace look flat or clipped.
Press ``Ctrl + A`` a few times to increase gain until individual channels become visible.

**2. Identify noise bands**

Look for bright vertical stripes spanning all channels simultaneously.
These are electrical artefacts (often 50 or 60 Hz line noise), not neural signal.
Note their position in time — you will want to remove them with
``ibldsp.voltage.destripe()`` before sorting.

**3. Find a clean region**

Scroll to a region where channels show clear contrast — dark background with bright
deflections on a few channels. This indicates good signal-to-noise ratio (SNR).

**4. Check for probe drift**

Scroll through time and watch whether active channels gradually shift upward or downward.
Gradual channel migration over time indicates probe drift, which should be corrected
before spike sorting.

----

Next steps
----------

Now that you can open and navigate a recording:

- Read the full :doc:`controls` reference for all keyboard shortcuts
- See the :doc:`faq` for common issues
- Explore the `IBL documentation hub <https://docs.internationalbrainlab.org>`_
  for the next steps in the pipeline (destriping, spike sorting, quality metrics)
