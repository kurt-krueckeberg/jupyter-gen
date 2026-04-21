# Various Explanations


## MyST Templates Repo

[MyST Templates](https://github.com/myst-templates#templates)

See also

[MyST Grid-System](https://jupyter-book.github.io/myst-theme/?path=/docs/components-grid-system--docs)


## How to View Built html Project

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
