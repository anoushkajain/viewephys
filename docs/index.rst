viewephys
=========

**viewephys** is a lightweight Python tool developed by the
`International Brain Laboratory (IBL) <https://www.internationalbrainlab.com/>`_
to visualize raw electrophysiology data, particularly Neuropixels recordings.

It is designed to help users:

- Inspect neural signals quickly without writing any analysis code
- Explore raw voltage traces across all recording channels simultaneously
- Compare data at different stages of preprocessing side by side
- Identify noise, artifacts, or signal patterns interactively

The tool focuses on **fast, interactive visualization** rather than heavy data
processing or analysis.

Who is it for?
--------------

viewephys is intended for:

- Neuroscientists working with electrophysiology data
- Data analysts and engineers handling neural recordings
- Anyone who wants a quick way to inspect raw data before deeper analysis

We assume users:

- Have basic familiarity with Python
- Are comfortable using the command line
- May not be familiar with the IBL ecosystem or this specific tool

What problems does it solve?
-----------------------------

Working with raw electrophysiology data is challenging because:

- Files are large (hundreds of channels, tens of thousands of samples per second)
- Raw voltage traces are not immediately interpretable
- Most visualization tools are heavy to set up or require scripting

viewephys provides:

- A **one-command way** to open and explore a recording
- A **scrollable, zoomable interface** to navigate channels and time
- **Four preprocessing views** side by side (raw, destripe, Butterworth, broadband),
  so you can compare the effect of each step without leaving the viewer
- A **spike-picking mode** for manually marking events of interest

What data formats does it support?
------------------------------------

viewephys reads binary files produced by
`SpikeGLX <https://billkarsh.github.io/SpikeGLX/>`_ (``.bin`` and ``.cbin``),
which is the standard acquisition software for Neuropixels probes.
It can also display any NumPy array directly, making it easy to use within
a Python session or script.

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Getting Started

   installation
   quickstart

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Tutorials

   tutorials

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: How to Guides

   controls
   preprocessing
   pick_spikes

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Reference

   api
   release_notes

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Community

   community
