const cheerio = require('cheerio');
const join = require('path').join;

const bytes = (str) => {
  const m = /^\s*([0-9.]+)([A-Z]*)\s*$/.exec(str);
  if (!m) return null;
  const num = Number(m[1]);
  const suf = m[2];
  return suf === 'K' ? num * 1024
    : suf === 'M' ? num * 1024 * 1024
    : suf === 'G' ? num * 1024 * 1024 * 1024
    : num;
};

module.exports = src => {
  const $ = cheerio.load(src);
  const dir = '/' + $('h1').text().split('/').slice(1).join('/');
  const files = [];
  $('table').find('tr').slice(2, -1).each((_, tr) => {
    const $tds = $(tr).find('td');
    const path = $tds.eq(1).children().eq(0).attr('href');
    files.push({
      type: path[path.length - 1] === '/'
        ? 'directory'
        : 'file',
      name: path.slice(0, path.length - 1),
      path: join(dir, path),
      lastModified: new Date($tds.eq(2).text().trim()),
      size: bytes($tds.eq(3).text()),
      description: $tds.eq(4).text()
    });
  });
  return { dir, files };
};

