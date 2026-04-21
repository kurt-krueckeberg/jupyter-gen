# Various Explanations

## MyST Templates Repo

[MyST Templates](https://github.com/myst-templates#templates)

See also

[MyST Grid-System](https://jupyter-book.github.io/myst-theme/?path=/docs/components-grid-system--docs)


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

## How to Clone, Build the Book Theme

1. Clone and build do the `npm run build`.

```bash
cd ~
git clone https://github.com/jupyter-book/myst-theme.git
cd ~/myst-theme
npm install
npm run build
```

2. Change a book theme file.

The .adoc to .md converter `convert2jupbook2.py` added the class
**image-override** to every image directive:

``` {figure}
:class: image-override
```

which this new version of the theme file below will detect.

```bash
# 3. Replace the contents of entry.client.tsx with the working code
cat > ~/myst-theme/themes/book/app/entry.client.tsx <<'EOF'
import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

function initImageOverrideClicks() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const img = target.closest(
      'img.image-override, figure.image-override img, .image-override img'
    ) as HTMLImageElement | null;

    if (!img) return;

    if (img.closest('a')) return;

    const src = img.currentSrc || img.getAttribute('src');
    if (!src) return;

    window.open(src, '_blank', 'noopener,noreferrer');
  });
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );

    initImageOverrideClicks();
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
EOF
```

3. Build the theme.

```bash
make build-book
```

4. Update the `mystl.yml` to use the local book theme by adding this:

```yml
site:
  template: ../myst-theme/.deploy/book/template.yml
```

5. Rebuild your Jupyter Book site

```bash
cd ~/jup
jupyter book build --html
```

6. Serve the built site locally

```bash
python3 -m http.server 8000 --directory ~/jup/_build/html
```

7. Open in browser

```bash
http://localhost:8000
```
