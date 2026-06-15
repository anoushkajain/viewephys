project = "viewephys"
copyright = "2024, International Brain Laboratory"
author = "International Brain Laboratory"
release = "1.2.0"

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_copybutton",
    "sphinx_design",
]

exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_theme = "furo"
html_static_path = ["_static"]
html_title = "viewephys"

html_theme_options = {
    "source_repository": "https://github.com/int-brain-lab/viewephys/",
    "source_branch": "main",
    "source_directory": "docs/",
}

