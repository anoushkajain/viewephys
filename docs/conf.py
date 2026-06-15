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

html_theme = "pydata_sphinx_theme"
html_static_path = ["_static"]
html_logo = "_static/viewephys.svg"
html_title = "viewephys"

html_theme_options = {
    "github_url": "https://github.com/int-brain-lab/viewephys",
    "navbar_end": ["navbar-icon-links"],
    "logo": {
        "text": "viewephys",
        "image_light": "_static/viewephys.svg",
        "image_dark": "_static/viewephys.svg",
    },
    "pygments_light_style": "friendly",
    "pygments_dark_style": "monokai",
}

