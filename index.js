const cheerio = require('cheerio');
const path = require('path');

const bytes = (str) => {
  const m = /^\s*([0-9.]+)([A-Z]*)\s*$/.exec(str);
  if (!m) return null;
  const num = Number(m[1]);
  const suf = m[2];
  return suf == 'K' ? num * 1024
    : suf == 'M' ? num * 1024 * 1024
    : suf == 'G' ? num * 1024 * 1024 * 1024
    : num;
};

module.exports = src => {
  const $ = cheerio.load(src);
  const dir = '/' + $('h1').text().split('/').slice(1).join('/');
  
  const rows = $('table').find('tr').toArray();
  const files = rows
    .filter(tr => (
      $(tr).find('td').length === 5 &&
      !(/Parent Directory/i.test($(tr).text()))
    ))
    .map(tr => {
      const $tds = $(tr).find('td');

      const $name = $tds.eq(1);
      const $lastMod = $tds.eq(2);
      const $size = $tds.eq(3);
      const $descr = $tds.eq(4);

      const filePath = $name.children('a').eq(0).attr('href');

      return {
        type: filePath.endsWith('/') ? 'directory' : 'file',
        name: $name.text().trim(),
        path: path.join(dir, filePath),
        relPath: filePath,
        lastModified: new Date($lastMod.text().trim()),
        size: bytes($size.text()),
        description: $descr.text().trim()
      };
    });

  return { dir, files };
};

