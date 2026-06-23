FAQ
===


**The viewer opens but the trace looks completely flat.**

The default gain may be too low for your data. Press ``Ctrl + A`` several
times until individual channels become visible.

----

**How do I use compressed** ``.cbin`` **files?**

To use ``.cbin`` **files, IBL compressed binary files (``.cbin``) you would require the ``mtscomp`` package to
decompress first. Then you will have a regular binary file. Install it alongside viewephys:

.. code-block:: bash

   pip install mtscomp

For more information see the
`mtscomp repository <https://github.com/int-brain-lab/mtscomp>`_.

----

**File not found when loading a recording.**

Pass an absolute path to avoid ambiguity. On Windows use a raw string to
avoid backslash issues:

.. code-block:: python

   viewer = EphysBinViewer(r"C:\Data\recording_g0_t0.imec0.ap.bin")


----

**The display looks wrong — diagonal streaks, scrambled channels, or a flat image.**

This usually means the channel count or reshape order is wrong. Binary files store
 samples interleaved across channels, so the reshape order matters:

.. code-block:: python

   data = np.fromfile("recording.dat", dtype=np.int16).reshape(-1, n_channels).T

Using the wrong n_channels shifts each row out of alignment, which can show up as diagonal streaking.
For Neuropixels 1.0 AP recordings, the file has 385 channels: 
384 neural channels plus 1 sync channel. 
Drop the sync channel before passing the array to viewephys()

----

**How do I know if my recording is good?**

Signs of a good recording in density mode:

- Clear contrast between background and individual channel events
- Active channels clustered in a region (probe is in tissue)
- No sustained bright vertical bands (few artefacts)
- Signal visible above background noise on multiple channels

For a quantitative assessment, run IBL quality metrics via
``brainbox.metrics`` after spike sorting, can also use
`SpikeInterface <https://spikeinterface.readthedocs.io>`_'s quality
metrics and curation tools.

----


**The viewer does not launch.**

Make sure the Qt backend is installed.

.. code-block:: bash

   pip install "viewephys[qt]"

----

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
