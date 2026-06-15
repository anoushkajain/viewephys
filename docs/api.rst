API Reference
=============

This page documents the public API for using viewephys programmatically.

.. note::

   All imports are from ``viewephys.gui`` unless otherwise stated.

----

viewephys()
-----------

The main entry point for displaying a NumPy array in an interactive viewer.

.. code-block:: python

   from viewephys.gui import viewephys

   viewer = viewephys(data, fs, channels=None, title="ephys", t0=0.0, colormap=None)

**Parameters**

.. list-table::
   :widths: 20 15 65
   :header-rows: 1

   * - Parameter
     - Type
     - Description
   * - ``data``
     - ``np.ndarray``
     - Array of shape ``(n_channels, n_samples)`` in volts.
   * - ``fs``
     - ``float``
     - Sampling frequency in Hz.
   * - ``channels``
     - ``dict``, optional
     - Trace header dictionary with channel geometry. Defaults to a
       standard Neuropixels 1.0 layout.
   * - ``title``
     - ``str``, optional
     - Window title. Use different titles to open multiple windows
       simultaneously. Defaults to ``"ephys"``.
   * - ``t0``
     - ``float``, optional
     - Start time of the data in seconds. Used to label the time axis
       correctly when displaying a chunk of a longer recording.
   * - ``colormap``
     - ``str`` or colormap object, optional
     - A named colormap (e.g. ``"PuOr"`` from colorcet or matplotlib)
       to override the default colour scheme.

**Returns** ``EphysViewer``

----

EphysBinViewer
--------------

Opens a SpikeGLX binary file (``.bin`` or ``.cbin``) in a navigation window
with preprocessing controls.

.. code-block:: python

   from viewephys.gui import EphysBinViewer, create_app

   app = create_app()
   viewer = EphysBinViewer("/path/to/recording.ap.bin")
   app.exec()

**Constructor parameters**

.. list-table::
   :widths: 20 15 65
   :header-rows: 1

   * - Parameter
     - Type
     - Description
   * - ``bin_file``
     - ``str`` or ``Path``, optional
     - Path to the binary file to load on startup. If omitted, an empty
       window opens and the file can be loaded via **File → Open**.

----

EphysViewer
-----------

The viewer window returned by :func:`viewephys`. You do not normally
instantiate this directly.

**Key methods**

``add_header_times(times, name)``
   Overlay behaviour events (e.g. stimulus times) as vertical markers
   in the horizontal header panel above the traces.

   - ``times`` — ``np.ndarray`` of event times in seconds
   - ``name`` — ``str`` label for the event series

``save_current_plot(filename)``
   Save the currently visible trace plot to an image file.

   - ``filename`` — ``str`` path to the output file (e.g. ``"plot.png"``)

**Picks**

   Spike picks made in pick mode are stored at:

   .. code-block:: python

      viewer.ctrl.model.pickspikes.picks  # pandas DataFrame

----

create_app()
------------

Creates (or retrieves) the Qt application instance. Must be called before
any viewer window is created in a script.

.. code-block:: python

   from viewephys.gui import create_app

   app = create_app()
   # ... create viewers ...
   app.exec()

Returns the ``QApplication`` instance. Safe to call multiple times —
returns the existing instance if one already exists.
