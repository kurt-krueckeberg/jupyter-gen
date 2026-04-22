# Setting up Jupyter Book 2

## Install

In a python virtual environment do:

```bash
pip install "jupyter-book>=2.0.0"
jupyter book init
```

Alter `mystl.yml`. See [Configuring your project](https://jupyterbook.org/stable/get-started/init/).

## `_static` changes

The CSS code to increase the content area width and to add shadow borders
to images is in `_static/css/overrides.css`.

The sites logo is in the .svg files in `_static`.


## How to View Built html Website

```bash
~/jup main ❯ jupyter book build --hml
~/jup main ❯ python3 -m http.server 8000 --directory ~/jupyter-gen/_build/html 
```

Then open: `http://localhost:8000`.

Alternately, you can do:

```bash
cd ~/jupyter-gen/_build/html
python3 -m http.server 8000
```

## Altering the Book Theme's Default Behavior

See the [setup document](./setup.md)

## Referencing Other Jupyter Book 2 Sites

See [this link](https://jupyterbook.org/stable/get-started/cross-reference/?utm_source=chatgpt.com). 
