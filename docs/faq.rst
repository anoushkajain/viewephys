FAQ
===

----


Loading data
------------

**The viewer opens but the trace looks completely flat.**

The default gain may be too low for your data. Press ``Ctrl + A`` several
times until individual channels become visible.

----

Opening compressed ``.cbin`` files
------------------------------------

IBL compressed binary files (``.cbin``) require the ``mtscomp`` package to
decompress on the fly. If you plan to open ``.cbin`` files, install it
alongside viewephys:

.. code-block:: bash

   pip install mtscomp

.. note::

   ``mtscomp`` is not installed automatically with viewephys. If you try to
   open a ``.cbin`` file without it, you will see an import error. Standard
   ``.bin`` files do not require ``mtscomp``.

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
----