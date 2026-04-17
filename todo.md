# TODOES

The Sphinx Book themse doesn't support the type of navigaton I created in
Antora, but Jupyter Book 2 does. However, Jupyter Book 2 using MyST whose
table support does not support tables with a cell that spans rows, which
can be achived in Sphinx using flatTables found in the linuxdoc extension.

The solution is to have convert2jup.py convert tables with cells that spand
rows into raw html tables and include them in the MyST markdown file.

The workflow is:

We will convert each file to MyST Markdown as usual. When the converter
encounters a table with cells that span rows, it should preserve the full
original `.adoc` file, save that specific table as a sidecar `.source.adoc`
fragment, generate a matching raw HTML table fragment, and have the
generated `.md` file include that HTML fragment as shown below:

```md id="9s6ed8"
::::{table} My caption

:::{include} _table-artifacts/FRI-D-1825a-table-01.html
:::

::::
```
