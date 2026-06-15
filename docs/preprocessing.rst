Preprocessing Modes
===================

viewephys can display the same data through four preprocessing pipelines
simultaneously, letting you compare the effect of each step side by side
without leaving the viewer.

Selecting modes
---------------

In the navigation window, tick any combination of the four checkboxes before
moving the slider. Each ticked mode opens a separate viewer window showing
the same time window after that processing step.

.. figure:: raw_bin_viewer_destripe.png
   :alt: viewephys showing destriped Neuropixels data
   :width: 100%

   The binary file viewer with destripe preprocessing selected.

Available modes
---------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Mode
     - Description
   * - **raw**
     - Unprocessed voltage straight from the file. Use this as a baseline
       to see what the signal looks like before any filtering.
   * - **destripe**
     - IBL destriping algorithm. Removes correlated noise patterns across
       channels that are common in Neuropixels recordings.
   * - **butterworth**
     - 3rd-order Butterworth high-pass filter at 300 Hz. Isolates the
       action potential (AP) band by removing slow drift.
   * - **broadband**
     - High-pass filter at 2 Hz over a 3-second window. Reveals the
       local field potential (LFP) band alongside spiking activity.

Comparing preprocessing with SpikeInterface
--------------------------------------------

viewephys integrates naturally with
`SpikeInterface <https://spikeinterface.readthedocs.io/>`_, letting you
visualise data at any stage of a SpikeInterface preprocessing pipeline.

.. code-block:: python

   import spikeinterface.extractors as si_extractors
   import spikeinterface.preprocessing as si_prepro
   from viewephys.gui import viewephys, create_app

   app = create_app()

   rec_raw = si_extractors.read_spikeglx("/path/to/data", stream_id="imec0.ap")
   fs = rec_raw.get_sampling_frequency()

   rec_filt = si_prepro.bandpass_filter(rec_raw, freq_min=300, freq_max=6000)
   rec_cmr  = si_prepro.common_reference(rec_filt, operator="median")

   # SpikeInterface returns (time, channel) — viewephys needs (channel, time)
   view_filt = viewephys(rec_filt.get_traces().T, fs=fs, title="bandpass")
   view_cmr  = viewephys(rec_cmr.get_traces().T,  fs=fs, title="CMR")

   app.exec()

.. note::

   SpikeInterface returns arrays in ``(time, channel)`` shape.
   viewephys expects ``(channel, time)``, so always transpose with ``.T``.
