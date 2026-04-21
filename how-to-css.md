# Overrride book theme's CSS

https://chatgpt.com/share/69e6bce8-1238-83ea-9963-46463b11408e

Yes. I consulted the theme source, and there is a concrete, source-based answer.

The key file is the theme’s grid stylesheet:

* `styles/grid-system.css` in `jupyter-book/myst-theme`
  raw link: `https://raw.githubusercontent.com/jupyter-book/myst-theme/main/styles/grid-system.css` ([GitHub][1])

That file shows that the theme’s page layout is **CSS grid**, not flexbox, for the article/content shell. It defines these root layout classes:

* `.article-grid`
* `.article-left-grid`
* `.article-center-grid`

and, crucially, it sets the default placement of direct children to the **body** column:

```css
.article-grid > *,
.article-left-grid > *,
.article-center-grid > * {
  @apply col-body;
}
```

That comes straight from the source. ([GitHub][1])

So the documented/source-grounded way to make the main content wider is to override that default placement from **`body`** to **`page`**. The repo’s own issue tracker shows exactly that idea. In issue #526, a maintainer describes “moving from `body` to `page`” with this rule:

```css
.article-grid > *,
.article-left-grid > *,
.article-center-grid > * {
  grid-column: page;
}
```

That is the closest thing I found to the exact answer you wanted. It is not guesswork; it is directly reflected in the theme’s own grid model and discussed in the repo. ([GitHub][2])

So, in your `myst.yml`:

```yaml
site:
  options:
    style: ./css/overrides.css
```

and in `css/overrides.css`:

```css
.article-grid > *,
.article-left-grid > *,
.article-center-grid > * {
  grid-column: page;
}
```

The reason this works is also visible in the source. The theme defines named grid-column aliases including `body`, `page`, `body-outset`, `page-right`, and others in the Tailwind theme extension used by the book theme. `page` is wider than `body`; the source defines both as distinct named grid columns. ([GitHub][3])

There are two related facts worth knowing:

First, the MyST docs officially support adding your own stylesheet through `site.options.style`. That part is documented. ([MyST Markdown][4])

Second, the theme’s docs also document built-in grid classes such as `col-page`, and the Storybook docs describe `article-center-grid` as a symmetrical version of the layout grid. ([jupyter-book.github.io][5])

One caveat from the repo: issue #526 says the **frontmatter/title block** in the book theme does not fully respond to this grid change, so the main article content may widen while the title/frontmatter area stays narrower unless that part is separately adjusted. ([GitHub][2])

The links you asked for:

* Official MyST styling docs: ([MyST Markdown][6])
* Official MyST theme/template docs: ([MyST Markdown][4])
* Theme repo: ([GitHub][7])
* Raw grid stylesheet in the repo: ([GitHub][1])

So the short, source-based answer is: **override the default grid placement from `body` to `page`**. That is the selector and the setting you were looking for.

[1]: https://raw.githubusercontent.com/jupyter-book/myst-theme/main/styles/grid-system.css "raw.githubusercontent.com"
[2]: https://github.com/jupyter-book/myst-theme/issues/526?utm_source=chatgpt.com "Frontmatter block does not use grid layout in book-theme #526"
[3]: https://raw.githubusercontent.com/jupyter-book/myst-theme/main/styles/index.js "raw.githubusercontent.com"
[4]: https://mystmd.org/guide/website-templates "Website Themes & Templates - MyST Markdown"
[5]: https://jupyter-book.github.io/myst-theme/?path=%2Fdocs%2Fcomponents-grid-system--docs&utm_source=chatgpt.com "Components / Grid-System - Docs ⋅ Storybook"
[6]: https://mystmd.org/guide/website-style "Styles and CSS Classes - MyST Markdown"
[7]: https://github.com/jupyter-book/myst-theme "GitHub - jupyter-book/myst-theme: Packages for creating MyST websites themes using React and Remix · GitHub"

