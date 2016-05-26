const cheerio = require('cheerio');

module.exports = src => {
  const $ = cheerio.load(src);
  const dir = '/' + $('h1').text().split('/').slice(1).join('/');
  const files = [];
  $('table').find('tr').slice(2, -1).each((_, tr) => {
    const $tds = $(tr).find('td');
    const path = $tds.eq(1).children().eq(0).text();
    files.push({
      type: path[path.length - 1] == '/'
        ? 'directory'
        : 'file',
      name: path.slice(0, path.length - 1),
      path: `${dir}/${path}`,
      lastModified: new Date($tds.eq(2).text().trim()),
      size: $tds.eq(3).text(),
      description: $tds.eq(4).text(),
    });
  });
  return { dir, files };
}
