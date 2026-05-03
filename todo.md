# TODO

The converter adoc2myst now calls `convert2jupbook1` and not
`convert2jupbook2`. This is because it converts to Sphinx+MySt and not to
MyST Document Engine + Jupyter Book 2. 

The basic difference.change is that `<<PET-B-1718a, some page>>` is converted 
to 

```{code}
{ref}`some page <PET-M-1773a>`
```

This may or may not work in JB2?
