Controls & Navigation
=====================

This page covers how to navigate the viewer and adjust the display
using the keyboard and interface controls.

Navigation window
-----------------

When you open a binary file, a navigation window appears with:

- **Horizontal slider** — drag to scrub through the recording in time
- **Jump to box** — type a time in seconds and press Enter (or click the
  button) to jump directly to that point without losing your current zoom
- **Preprocessing checkboxes** — tick any combination of *raw*, *destripe*,
  *butterworth*, *broadband* to open side-by-side viewer windows

Keyboard shortcuts
-------------------

These shortcuts work inside any open viewer window:

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Shortcut
     - Action
   * - ``Ctrl + Z``
     - Decrease gain by 3 dB — zoom out on the amplitude axis
   * - ``Ctrl + A``
     - Increase gain by 3 dB — zoom in on the amplitude axis
   * - ``Ctrl + P``
     - Link pan, zoom, and gain across all open viewer windows simultaneously

Mouse controls
--------------

Inside a viewer window:

- **Scroll wheel** — zoom in and out
- **Click and drag** — pan across time or channels
- **Right-click** — access the pyqtgraph context menu (export, view options)

Linking multiple windows
------------------------

When you have more than one preprocessing view open, press ``Ctrl + P``
to synchronise them. After linking, panning or zooming in one window
automatically updates all others — useful for directly comparing the
effect of different preprocessing steps at the same time and position.
