const parse = require('../../index');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('parseApacheDirectoryIndex', () => {

  it('should parse an apache directory index', () => {
    const indexHtmlPath = path.join(__dirname, '../fixtures/index.html');
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    assert.deepStrictEqual(parse(indexHtml), {
      dir: '/foo/bar',
      files: [
        {
          name: 'folderA/',
          type: 'directory',
          path: '/foo/bar/folderA/',
          relPath: 'folderA/',
          description: 'The very first folder',
          size: null,
          lastModified: new Date('25-May-2016 11:53')
        },
        {
          name: 'folderB/',
          type: 'directory',
          path: '/foo/bar/folderB/',
          relPath: 'folderB/',
          size: 5662310.4,
          lastModified: new Date('19-May-2016 17:57'),
          description: ''
        },
        {
          name: 'fileA.zip',
          type: 'file',
          path: '/foo/bar/fileA.zip',
          relPath: 'fileA.zip',
          size: 57344,
          lastModified: new Date('28-May-2009 15:09'),
          description: ''
        },
        {
          name: 'fileB.zip',
          type: 'file',
          path: '/foo/bar/fileB.zip',
          relPath: 'fileB.zip',
          size: 662528,
          lastModified: new Date('28-May-2009 17:32'),
          description: ''
        }
      ]
    })
  });

});