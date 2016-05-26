
# parse-apache-directory-index

Parse an HTML Apache directory index.

## Usage

```js
const parse = require('parse-apache-directory-index');

console.log(parse(`
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
  <html>
   <head>
     <title>Index of /foo/bar</title>
      </head>
       <body>
       <h1>Index of /foo/bar</h1>
       <table><tr><th><img src="/icons/blank.gif" alt="[ICO]"></th><th><a href="?C=N;O=D">Name</a></th><th><a href="?C=M;O=A">Last modified</a></th><th><a href="?C=S;O=A">Size</a></th><th><a href="?C=D;O=A">Description</a></th></tr><tr><th colspan="5"><hr></th></tr>
       <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="beep/">beep/</a>           </td><td align="right">25-May-2016 11:53  </td><td align="right">  - </td><td>&nbsp;</td></tr>
       <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="boop20160518/">boop20160518/</a>        </td><td align="right">19-May-2016 17:57  </td><td align="right">  - </td><td>&nbsp;</td></tr>
       <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="jazz20160518/">jazz20160518/</a>         </td><td align="right">19-May-2016 19:04  </td><td align="right">  - </td><td>&nbsp;</td></tr>
       <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="punk20160518/">punk20160518/</a>    </td><td align="right">19-May-2016 17:47  </td><td align="right">  - </td><td>&nbsp;</td></tr>
       <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="space20160518/">space20160518/</a>       </td><td align="right">19-May-2016 19:03  </td><td align="right">  - </td><td>&nbsp;</td></tr>
       <tr><th colspan="5"><hr></th></tr>
       </table>
       </body></html>
       `));
```

```bash
$ node example.js
{ dir: '/foo/bar',
  files:
   [ { type: 'directory',
       name: 'beep',
       path: '/foo/bar/beep/',
       lastModified: 2016-05-25T09:53:00.000Z,
       size: null,
       description: ' ' },
     { type: 'directory',
       name: 'boop20160518',
       path: '/foo/bar/boop20160518/',
       lastModified: 2016-05-19T15:57:00.000Z,
       size: null,
       description: ' ' },
     { type: 'directory',
       name: 'jazz20160518',
       path: '/foo/bar/jazz20160518/',
       lastModified: 2016-05-19T17:04:00.000Z,
       size: null,
       description: ' ' },
     { type: 'directory',
       name: 'punk20160518',
       path: '/foo/bar/punk20160518/',
       lastModified: 2016-05-19T15:47:00.000Z,
       size: null,
       description: ' ' },
     { type: 'directory',
       name: 'space20160518',
       path: '/foo/bar/space20160518/',
       lastModified: 2016-05-19T17:03:00.000Z,
       size: null,
       description: ' ' } ] }
```

## License

  MIT
