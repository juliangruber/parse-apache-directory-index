const cheerio = require('cheerio');
const join = require('path').posix.join;

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

  const rows = $('table').find('tr').toArray();

  // Figure out the order of the columns,
  // by looking at the header row.
  // eg { 'Name': 0, 'Last modified': 1, 'Size': 2 }
  const fieldCols = $(rows[0])
    .children('th')
    .toArray()
    .reduce((fieldCols, th, i) =>
        Object.assign(fieldCols, {
          [$(th).text().trim()]: i
        }),
      {});

  // Make sure we at least found a "Name" column
  if (fieldCols['Name'] === undefined) {
    throw new Error('Unable to parse apache index html: cannot identify "Name" column.');
  }

  // Parse fields
  rows
    // Ignore the header row
    .slice(1)
    .forEach((tr) => {
      const $tds = $(tr).find('td');
      const getCol = label => fieldCols[label] === undefined ? null : $tds.eq(fieldCols[label]);
      const getColText = label => getCol(label) && getCol(label).text().trim();

      const path = getCol('Name').children().eq(0).attr('href');
      const name = getColText('Name');

      // Ignore 'Parent Directory' row
      if (name === 'Parent Directory' || !name) return;

      files.push({
        type: path.endsWith('/')
          ? 'directory'
          : 'file',
        name: name,
        path: join(dir, path),
        lastModified: getCol('Last modified') && new Date(getColText('Last modified')),
        size: getCol('Size') && bytes(getColText('Size')),
        description: getColText('Description')
      });
    });

  return { dir, files };
};

