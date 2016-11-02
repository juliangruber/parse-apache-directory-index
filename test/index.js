const parse = require('..');
const fs = require('fs');
const test = require('tap').test;

test('should parse apache directory index files', t => {
  const index = fs.readFileSync(`${__dirname}/fixture/apache-index.html`, 'utf8');

  t.deepEqual(parse(index), {
    dir: '/foo/bar',
    files: [
      {
        name: 'folderA/',
        type: 'directory',
        path: '/foo/bar/folderA/',
        description: 'The very first folder',
        size: null,
        lastModified: new Date('25-May-2016 11:53')
      },
      {
        name: 'folderB/',
        type: 'directory',
        path: '/foo/bar/folderB/',
        size: 5662310.4,
        lastModified: new Date('19-May-2016 17:57'),
        description: ''
      },
      {
        name: 'fileA.zip',
        type: 'file',
        path: '/foo/bar/fileA.zip',
        size: 57344,
        lastModified: new Date('28-May-2009 15:09'),
        description: ''
      },
      {
        name: 'fileB.zip',
        type: 'file',
        path: '/foo/bar/fileB.zip',
        size: 662528,
        lastModified: new Date('28-May-2009 17:32'),
        description: ''
      }
    ]
  });
  t.end();
});

test('should parse apache directory index files (alt format)', t => {
  const index = fs.readFileSync(`${__dirname}/fixture/apache-index-alt.html`, 'utf8');

  t.deepEqual(parse(index), {
    dir: '/foo/bar',
    files: [
      {
        name: 'folderA/',
        type: 'directory',
        path: '/foo/bar/folderA/',
        description: null,
        size: null,
        lastModified: new Date('20-Sep-2016 20:33')
      },
      {
        name: 'folderB/',
        type: 'directory',
        path: '/foo/bar/folderB/',
        size: null,
        lastModified: new Date('20-Sep-2016 20:33'),
        description: null
      },
      {
        name: 'fileA.zip',
        type: 'file',
        path: '/foo/bar/fileA.zip',
        size: 57344,
        lastModified: new Date('05-Sep-2016 20:41'),
        description: null
      },
      {
        name: 'fileB.zip',
        type: 'file',
        path: '/foo/bar/fileB.zip',
        size: 662528,
        lastModified: new Date('06-Sep-2016 06:14'),
        description: null
      }
    ]
  });
  t.end();
});
