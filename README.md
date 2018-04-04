# plggs.github.io
## By: Blake Boris & Sebastion Strempfer
### Also available at https://bblake.info
A site for displaying bits of my information in a more appealing fashion than ones and zeros.

### How it works
all of the `<head>`, your navigation bar, and footer is in the index.html file and nowhere else. 
To create a new page, just add the content as `html` file into `/sites/` (you can place them in folders within `/sites/` too). 
To create a link to that page, just make the `href` `#path/to/file/within/sites/filename` (filename without `.html`).

The title of a page will be automatically generated as `[last part of url after /] - Blake Boris`. A custom title can be set by including `[TITLE]you title[/TITLE]` somewhere in the file of that site (preferable in a comment). An example is in `home.html`.

- `main.scss` is included in ALL pages, as well as `page-loader.js`
- the `---` in the `.scss` files are necessary for some reason for jekyll to render them
