viewephys
=========

**viewephys** is a lightweight Python tool developed by the
`International Brain Laboratory (IBL) <https://www.internationalbrainlab.com/>`_
to visualize raw Neuropixel electrophysiology data.

It is built for speed and simplicity: open a recording and get
immediate visual feedback, without running a full analysis pipeline first.

It is designed to help users:

- Explore raw voltage traces across all recording channels simultaneously
- Compare data at different stages of preprocessing side by side
- Spot noise, artefacts, or signal patterns before committing to deeper analysis

Who is it for?
--------------

- Neuroscientists and data engineers working with electrophysiology recordings
- Anyone who wants to inspect raw data

We assume users:

- have basic familiarity with Python
- are comfortable using the command line
- may be new to the IBL ecosystem, no prior IBL experience required

Why does this matter?
----------------------

Raw electrophysiology files are large, often tens of gigabytes, with hundreds
of channels sampled tens of thousands of times per second in a binary format, and not
human-readable on their own. Most analysis tools require significant setup
before you can see anything at all.

viewephys removes that barrier:

.. list-table::
   :widths: 45 55
   :header-rows: 1

   * - Without viewephys
     - With viewephys
   * - Loading a file means loading it entirely into memory
     - Files open without loading everything into memory
   * - A full pipeline must be configured before you see anything
     - The viewer launches in seconds with a single command
   * - Scrolling through hundreds of channels by hand is tedious
     - Channels and time are navigable interactively, with different display modes

What data formats does it support?
------------------------------------

viewephys accepts ``*.bin`` and ``*.dat`` electrophysiology files.
It can also display any NumPy array directly, making it easy to use within
a Python session or script.

When to use viewephys?
-----------------------

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Stage
     - Use viewephys to…
   * - Before spike sorting
     - Sanity-check raw data quality: gain, noise bands, dead channels
   * - After destriping
     - Compare raw vs cleaned traces side by side
   * - During troubleshooting
     - Identify where in time or channels a problem occurs

.. note::

   viewephys does not sort spikes, compute metrics, or modify your data.

.. toctree::
   :maxdepth: 1
   :hidden:

   installation
   quickstart
   interface
   faq
   community
   release_notes
