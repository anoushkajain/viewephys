FAQ
===

Loading data
------------

**The viewer opens but the trace looks completely flat.**

The default gain may be too low for your data. Press ``Ctrl + A`` several
times until individual channels become visible.

----

**How do I open compressed** ``.cbin`` **files?**

IBL compressed binary files (``.cbin``) require the ``mtscomp`` package to
decompress on the fly. Install it alongside viewephys:

.. code-block:: bash

   pip install mtscomp

For more information see the
`mtscomp repository <https://github.com/int-brain-lab/mtscomp>`_.

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
