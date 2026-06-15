Controls reference
==================

This page is the complete reference for all keyboard shortcuts, mouse
interactions, and menu controls in viewephys.

For a shorter introduction to navigation, see :doc:`quickstart`.

----

Keyboard shortcuts
------------------

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Shortcut
     - Action
   * - ``Ctrl + A``
     - Increase display gain by 3 dB
   * - ``Ctrl + Z``
     - Decrease display gain by 3 dB
   * - ``Ctrl + P``
     - Link displays in multi-window mode (synchronises pan, zoom, and gain)
   * - ``Space``
     - Increment spike group number (pick mode only)

----

Mouse controls
--------------

.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Action
     - Effect
   * - Scroll wheel
     - Pan through time
   * - Click and drag
     - Pan through time
   * - Ctrl + scroll
     - Zoom in / out on time axis
   * - Vertical scroll
     - Navigate channels
   * - Hover over trace
     - Updates channel number and voltage in the bottom-left status bar

----

Display modes
-------------

Switch between modes using the radio buttons on the left panel:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Mode
     - Description
   * - **Density** *(default)*
     - Renders signal intensity as pixel brightness. Best for an overview
       of all channels at once — noise bands, dead channels, and active
       regions are immediately visible.
   * - **Wiggle**
     - Renders each channel as a waveform trace. Best for inspecting
       individual waveform shapes and verifying spike morphology.

----

Pick mode
---------

Enable pick mode via **Pick → Pick** in the menu bar.

.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Action
     - Effect
   * - Left click
     - Set a pick point at the cursor position
   * - Shift + left click
     - Remove a pick point
   * - Ctrl + left click
     - Set a point without snapping to the nearest maximum
   * - ``Space``
     - Increment the spike group number

----

Multi-window mode
-----------------

Open multiple viewephys windows (e.g. raw vs destriped) and press
``Ctrl + P`` to link them. Panning, zooming, and gain changes then
synchronise across all linked windows.

.. code-block:: python

   from viewephys.gui import viewephys
   import numpy as np

   # Two windows linked for comparison
   raw   = np.random.randn(384, 30_000) / 1e6
   clean = raw * 0.5  # simulated destriped data

   w = {}
   w['raw']   = viewephys(raw,   fs=30_000, title='raw')
   w['clean'] = viewephys(clean, fs=30_000, title='destriped')
   # Press Ctrl+P in either window to link them

----

Jump to a time point
--------------------

At the bottom of the viewer, the **Jump to** field lets you navigate
directly to a specific time:

1. Enter a time in **seconds** in the text box
2. Click **Go**

The trace view jumps to that position immediately.

----

Status bar
----------

The three values in the bottom-left of the viewer update as you move
the cursor over the trace:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Value
     - Meaning
   * - First number
     - Voltage at cursor position (Volts)
   * - Second number
     - Signal value in display units
   * - Third number *(bold)*
     - Channel number at cursor position