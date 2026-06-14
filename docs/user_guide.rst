User Guide
==========

This page covers the full feature set of viewephys beyond the basics in the
:doc:`quickstart`.

Preprocessing modes
--------------------

The binary file viewer offers four preprocessing views that can be opened
side by side using the checkboxes in the navigation window:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Mode
     - Description
   * - **raw**
     - Unprocessed voltage straight from the file
   * - **destripe**
     - IBL destriping algorithm — removes correlated noise across channels
   * - **butterworth**
     - 3rd-order Butterworth high-pass filter at 300 Hz (AP band)
   * - **broadband**
     - High-pass filter at 2 Hz over a 3-second window (LFP band)

Tick any combination of checkboxes and move the slider — each checked mode
opens a separate window showing the same time window after that processing step.

Keyboard shortcuts
-------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Shortcut
     - Action
   * - ``Ctrl + Z``
     - Decrease gain by 3 dB (zoom out on amplitude)
   * - ``Ctrl + A``
     - Increase gain by 3 dB (zoom in on amplitude)
   * - ``Ctrl + P``
     - Link pan, zoom, and gain across all open viewer windows

Spike picking
--------------

viewephys includes a manual spike-picking mode for marking events of interest
directly on the trace.

**Enabling pick mode**

Open a viewer window, then go to **Pick → Pick** in the menu bar to toggle
picking on.

**Picking controls**

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Action
     - Effect
   * - Left click
     - Place a spike marker (snaps to nearby voltage peak automatically)
   * - Ctrl + left click
     - Place a marker at the exact click position (no peak snapping)
   * - Shift + left click
     - Remove the nearest existing marker
   * - Space
     - Increment the spike group number (for labelling groups separately)

Picked spikes are stored as a pandas DataFrame with columns ``sample``,
``trace``, ``amp``, and ``group``, accessible at
``viewer.ctrl.model.pickspikes.picks``.

Comparing SpikeInterface preprocessing steps
---------------------------------------------

viewephys integrates naturally with
`SpikeInterface <https://spikeinterface.readthedocs.io/>`_.
The example below opens two windows to compare filtering and common-median
referencing side by side:

.. code-block:: python

   import spikeinterface.extractors as si_extractors
   import spikeinterface.preprocessing as si_prepro
   from viewephys.gui import viewephys, create_app

   app = create_app()

   rec_raw = si_extractors.read_spikeglx("/path/to/data", stream_id="imec0.ap")
   fs = rec_raw.get_sampling_frequency()

   rec_filt = si_prepro.bandpass_filter(rec_raw, freq_min=300, freq_max=6000)
   rec_cmr = si_prepro.common_reference(rec_filt, operator="median")

   # SpikeInterface returns (time, channel) — viewephys needs (channel, time)
   view_filt = viewephys(rec_filt.get_traces().T, fs=fs, title="bandpass")
   view_cmr = viewephys(rec_cmr.get_traces().T, fs=fs, title="CMR")

   app.exec()

.. note::

   SpikeInterface returns arrays in ``(time, channel)`` shape.
   viewephys expects ``(channel, time)``, so always transpose with ``.T``.

Live recording
--------------

viewephys can connect to a SpikeGLX recording while it is still running.
Use **File → Open live recording** in the navigation window to load a file
that is actively being written. The viewer will read up to the latest
available sample each time you move the slider.
