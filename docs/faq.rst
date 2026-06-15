FAQ
===

----

Installation
------------

**viewephys --help is not found after pip install.**

Make sure your virtual environment is activated:

.. code-block:: bash

   conda activate viewephys   # if using conda
   viewephys --help

   source venv/bin/activate   # if using venv (macOS / Linux)
   venv\Scripts\activate      # Windows
   viewephys --help

----

**I get a Qt error on Linux.**

Headless Linux servers do not have a display. Either run viewephys on a
machine with a display, or set a virtual display first:

.. code-block:: bash

   export DISPLAY=:0

----

Loading data
------------

**The viewer opens but the trace looks completely flat.**

The default gain may be too low for your data. Press ``Ctrl + A`` several
times until individual channels become visible.

----

**What file formats does viewephys support?**

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Extension
     - Description
   * - ``.bin``
     - Raw binary Neuropixels recording (SpikeGLX or OpenEphys)
   * - ``.cbin``
     - IBL compressed binary format (requires ``mtscomp``)

For other formats (NWB, Nix, proprietary acquisition formats), convert
to binary first using `SpikeInterface <https://spikeinterface.readthedocs.io>`_.

----

**I need to specify the number of channels or sampling rate manually.**

Pass them directly via Python:

.. code-block:: python

   import numpy as np
   from viewephys.gui import viewephys

   data = np.fromfile("recording.bin", dtype=np.int16).reshape(385, -1)
   data = data[:384, :]           # drop sync channel
   ve = viewephys(data / 1e6, fs=30_000)   # convert to Volts

----

Interpreting the trace
-----------------------

**What are the bright vertical stripes?**

Vertical stripes spanning all channels simultaneously are electrical
artefacts — typically 50 Hz (Europe) or 60 Hz (US) line noise, or a
ground loop issue. They are not neural signal. Apply
``ibldsp.voltage.destripe()`` before spike sorting to remove them.

----

**How do I know if my recording is good?**

Signs of a good recording in density mode:

- Clear contrast between background and individual channel events
- Active channels clustered in a region (probe is in tissue)
- No sustained bright vertical bands (few artefacts)
- Signal visible above background noise on multiple channels

For a quantitative assessment, run IBL quality metrics via
``brainbox.metrics`` after spike sorting.

----

**What does the channel dropdown (trace / shank / col / row...) mean?**

See the :doc:`interface` guide for a full explanation of each option.

----

Integration
-----------

**Can I use viewephys inside a Jupyter notebook?**

Yes. Add the Qt magic before importing:

.. code-block:: python

   %gui qt
   from viewephys.gui import viewephys
   import numpy as np

   data = np.random.randn(384, 30_000) / 1e6
   ve = viewephys(data, fs=30_000)

----

**Does viewephys require ONE API or Alyx?**

No. viewephys is completely standalone and does not require any other
IBL library. It can be used independently on any Neuropixels recording.