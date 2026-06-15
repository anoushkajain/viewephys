Spike Picking
=============

viewephys includes a manual spike-picking mode for marking events of interest
directly on the voltage traces. Picks are stored as a pandas DataFrame that
you can access and export from Python.

Enabling pick mode
------------------

Open a viewer window, then go to **Pick → Pick** in the menu bar.
A checkmark appears next to the menu item when picking is active.

Mouse controls in pick mode
----------------------------

.. list-table::
   :widths: 45 55
   :header-rows: 1

   * - Action
     - Effect
   * - **Left click**
     - Place a marker. The viewer automatically snaps to the nearest
       voltage peak within a small window around the click.
   * - **Ctrl + left click**
     - Place a marker at the exact click position, without peak snapping.
   * - **Shift + left click**
     - Remove the nearest existing marker.
   * - **Right click**
     - Increment the spike group number.
   * - **Space**
     - Increment the spike group number (same as right click).

.. note::

   The snap window scales with your current zoom level, so zooming in
   gives you finer control over which peak is selected.

Spike groups
------------

Spikes can be assigned to numbered groups, which is useful for labelling
different unit types or events separately. Press **Space** or right-click
to move to the next group before placing the next marker.

Accessing picks from Python
----------------------------

Picked spikes are stored as a ``pandas.DataFrame`` on the viewer object:

.. code-block:: python

   picks = viewer.ctrl.model.pickspikes.picks

The DataFrame has four columns:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Column
     - Description
   * - ``sample``
     - Sample index of the picked event
   * - ``trace``
     - Channel (trace) index
   * - ``amp``
     - Voltage amplitude at the picked sample
   * - ``group``
     - Spike group number assigned at pick time

You can export picks to a CSV file directly from Python:

.. code-block:: python

   picks.to_csv("my_picks.csv", index=False)
