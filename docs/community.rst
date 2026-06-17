Community
=========

Contributions to viewephys — whether fixing bugs, adding support for new file
formats, improving the documentation, or adding new features — are welcome.

Even with little or no previous experience of software development or
open-source projects, contributions are encouraged. As a community we try to
be particularly welcoming to new contributors. If you are new to open source
software, `How to Contribute to Open Source
<https://opensource.guide/how-to-contribute/>`_ is a good introductory guide.

**Ways to contribute**

- Report a bug or request a feature by opening an issue on
  `GitHub <https://github.com/int-brain-lab/viewephys/issues>`_
- Fix a bug or implement a feature and submit a pull request
- Improve or extend the documentation
- Add support for new file formats

**Workflow**

1. `Fork <https://github.com/int-brain-lab/viewephys/fork>`_ the repository
   on GitHub.
2. Clone your fork and create a new branch:

   .. code-block:: bash

      git clone https://github.com/<your-username>/viewephys.git
      cd viewephys
      git checkout -b my-fix

3. Install the package in editable mode with the development extras:

   .. code-block:: bash

      pip install -e ".[dev]"
      pre-commit install

4. Make your changes, add tests where appropriate, and check code quality:

   .. code-block:: bash

      ruff check src/
      pytest

5. Push your branch and open a pull request against ``main``.

The ``dev`` extras install ``pytest``, ``ruff``, ``mypy``, and
``pre-commit``. Running ``pre-commit install`` ensures linting and formatting
checks run automatically before each commit.

If you are unsure about any step, the
`Neo contributing guide <https://neo.readthedocs.io/en/latest/contributing.html>`_
is a thorough practical reference for the full open-source contribution workflow.

How to Cite
-----------

If you use viewephys in your research, please cite it as:

.. code-block:: text

   Winter, Olivier. viewephys. 2022.
   https://github.com/int-brain-lab/viewephys
   DOI: 10.5281/zenodo (see repository for current DOI)

A ``CITATION.cff`` file is included in the repository for tools that
support automatic citation parsing (e.g. GitHub, Zotero).


