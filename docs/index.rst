viewephys
=========

**viewephys** is a lightweight Python tool developed by the
`International Brain Laboratory (IBL) <https://www.internationalbrainlab.com/>`_
to visualize raw electrophysiology data.

It is built for speed and simplicity: open a Neuropixels recording, scroll through
channels and time, and get immediate visual feedback, without running a full analysis
pipeline first.

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

- have a raw electrophysiology file (.bin, .cbin, or a NumPy array) ready to view
- have basic familiarity with Python
- are comfortable using the command line
- may be new to the IBL ecosystem, no prior IBL experience required

What problems does it solve?
-----------------------------

Raw electrophysiology files are large often tens of gigabytes (hundreds of channels, tens of
thousands of samples per second) , binary, and not human-readable. Most analysis tools require 
significant setup before you can see anything.


viewephys provides:

.. list-table::
   :widths: 45 55
   :header-rows: 1

   * - Problem
     - viewephys solution
   * - Large binary files are hard to inspect
     - Opens files without loading everything into memory
   * - Noise and artefacts are hard to spot
     - Density and wiggle display modes make signal quality immediately visible
   * - Setting up analysis pipelines is slow
     - Viewer launches in seconds with a single command
   * - Multi-channel data is hard to navigate
     - Scroll through all channels and time interactively


When to use viewephys?
---------------------

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Stage
     - Use viewephys to…
   * - **Before spike sorting**
     - Sanity-check raw data quality: gain, noise bands, dead channels
   * - **After destriping**
     - Compare raw vs cleaned traces side by side
   * - **Before deep analysis**
     - Decide if a recording is worth processing further
   * - **During troubleshooting**
     - Identify where in time or channels a problem occurs

.. note::
   viewephys does not sort spikes, compute metrics, or modify your data.


What data formats does it support?
------------------------------------

viewephys reads binary files produced by
`SpikeGLX <https://billkarsh.github.io/SpikeGLX/>`_ (``.bin`` and ``.cbin``),
which is one of the standard acquisition software for Neuropixels probes.
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
