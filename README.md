# plggs.github.io
## By: Blake Boris & Sebastian Strempfer
### Also available at https://bblake.info & https://blakeboris.com
A site for displaying bits of my information in a more appealing fashion than ones and zeros.

### How it works
the layout file containing the `<head>`, footer, and navbar is saved in `_layouts/`. All `.html` files starting with
```
---
layout: default
title: Title
css: [css, file, names, from, /css/, without, .scss]
js: [js, file, names, from, /script/, without, .js]
---
```
will be wrapped in it.<br>
*Note: variables can be left blank when not used*

> Be careful what file encoding you use. `UTF-8 with BOM` / 'UTF 8 with signature' will NOT work. 
> I would suggest using `UTF-8` / `UTF-8 without signature`.
