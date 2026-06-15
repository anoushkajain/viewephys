Tutorials
=========

These examples show the main ways to load data into viewephys.
All examples can also be found in the `examples/
<https://github.com/int-brain-lab/viewephys/tree/main/examples>`_ folder
of the repository.

Load a NumPy array (IPython / Jupyter)
---------------------------------------

viewephys can be used through the Python console or IPython, allowing you
to create multiple instances of the viewer at once.

.. code-block:: python

   # In IPython, enable the Qt event loop first:
   %gui qt

   import numpy as np
   from viewephys.gui import viewephys

   # Simulate one second of Neuropixels data: 384 channels at 30 kHz
   nc, ns, fs = 384, 50000, 30000
   data = np.random.randn(nc, ns) / 1e6  # values in volts

   ve = viewephys(data, fs=fs)

   # Open multiple windows at once — each must have a unique title
   ve2 = viewephys(data * 50, fs=fs, title="plot 2")

.. figure:: view_rand_array.png
   :alt: Two viewephys windows showing a NumPy array
   :width: 100%

   Two viewer windows displaying the same array at different gain levels.

Opening a binary file through a script
---------------------------------------

.. note::

   When running through a script (not IPython), you must instantiate the
   Qt application yourself using ``create_app()``, and call ``app.exec()``
   at the end — otherwise the window closes immediately.

.. code-block:: python

   from viewephys.gui import EphysBinViewer, create_app

   app = create_app()

   viewer = EphysBinViewer(r"/path/to/your/recording.ap.bin")

   app.exec()

Load a NumPy array through a script
--------------------------------------

.. code-block:: python

   import numpy as np
   from viewephys.gui import viewephys, create_app

   app = create_app()

   nc, ns, fs = 384, 50000, 30000
   data = np.random.randn(nc, ns) / 1e6  # values in volts

   ve  = viewephys(data, fs=fs)
   ve2 = viewephys(data * 50, fs=fs, title="plot 2")

   app.exec()
