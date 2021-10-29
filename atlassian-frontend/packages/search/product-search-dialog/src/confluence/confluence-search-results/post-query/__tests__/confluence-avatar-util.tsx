import FileTypes16File16ArchiveIcon from '@atlaskit/icon-file-type/glyph/archive/16';
import FileTypes16File16AudioIcon from '@atlaskit/icon-file-type/glyph/audio/16';
import FileTypes16File16ExcelSpreadsheetIcon from '@atlaskit/icon-file-type/glyph/excel-spreadsheet/16';
import FileTypes16File16GenericIcon from '@atlaskit/icon-file-type/glyph/generic/16';
import FileTypes16File16ImageIcon from '@atlaskit/icon-file-type/glyph/image/16';
import FileTypes16File16PdfDocumentIcon from '@atlaskit/icon-file-type/glyph/pdf-document/16';
import FileTypes16File16PowerpointPresentationIcon from '@atlaskit/icon-file-type/glyph/powerpoint-presentation/16';
import FileTypes16File16SourceCodeIcon from '@atlaskit/icon-file-type/glyph/source-code/16';
import FileTypes16File16VideoIcon from '@atlaskit/icon-file-type/glyph/video/16';
import FileTypes16File16WordDocumentIcon from '@atlaskit/icon-file-type/glyph/word-document/16';
import React from 'react';
import { createPageBlogAttachmentResults } from '../../../../__tests__/__fixtures__/mock-search-results';
import { ConfluenceAttachment } from '../../../clients';
import { getAvatarForConfluenceObjectResult } from '../confluence-avatar-util';

const TEST_FILE_PREFIXES = [
  '',
  'test123',
  '©©©!@#$%^&*()',
  'test.zip',
  'test.jpeg',
];

/**
 * Given a list of file extensions, return an array of test filenames containing
 * those file extensions to test against.
 */
function generateTestCasesForExtensions(extensionsToTest: Array<string>) {
  // generate a 2d array of filenames
  const tests = extensionsToTest.map((extension: string) => {
    return TEST_FILE_PREFIXES.map((prefix) => `${prefix}.${extension}`);
  });
  // flatten the array, done
  return ([] as Array<string>).concat(...tests);
}

describe('confluence-avatar-util', () => {
  function executeTest(
    fileName: string,
    iconClass: string,
    ExpectedAvatar: React.ComponentClass<any>,
  ) {
    const [result] = createPageBlogAttachmentResults(1).items;

    const confluenceResult = {
      ...result,
      contentType: ConfluenceAttachment,
      name: fileName,
      iconClass: iconClass,
    };

    // assert correct icon is returned with correct props
    const avatar = getAvatarForConfluenceObjectResult(confluenceResult);
    expect(avatar).toEqual(<ExpectedAvatar label={fileName} />);
  }

  function describeTestGroup(
    groupType: string,
    testExtensions: string[],
    cqlIconClass: string,
    quickNavIconClass: string,
    expectedAvatar: React.ComponentClass<any, any>,
  ) {
    describe(`${groupType} attachments`, () => {
      const testCases = generateTestCasesForExtensions(testExtensions);
      testCases.forEach((testFileName) => {
        it(`file name should be correctly mapped to the ${groupType} attachment icon: ${testFileName}`, () => {
          executeTest(testFileName, cqlIconClass, expectedAvatar);
          executeTest(testFileName, quickNavIconClass, expectedAvatar);
        });
      });
    });
  }

  [
    {
      id: 'image',
      quickNavIconClass: 'content-type-attachment-image',
      cqlIconClass: 'icon-file-image',
      extensions: ['gif', 'jpeg', 'jpg', 'png'],
      expectedAvatar: FileTypes16File16ImageIcon,
    },
    {
      id: 'audio',
      quickNavIconClass: 'content-type-attachment-multimedia',
      cqlIconClass: 'icon-file-multimedia',
      extensions: ['wma', 'wmv', 'ram', 'mp3'],
      expectedAvatar: FileTypes16File16AudioIcon,
    },
    {
      id: 'code',
      quickNavIconClass: 'content-type-attachment-code',
      cqlIconClass: 'icon-file-code',
      extensions: ['xml', 'html', 'js', 'css', 'java', 'jar', 'war', 'ear'],
      expectedAvatar: FileTypes16File16SourceCodeIcon,
    },
    {
      id: 'document',
      quickNavIconClass: 'content-type-attachment-document',
      cqlIconClass: 'icon-file-document',
      extensions: ['docx', 'dotx', 'doc', 'dot'],
      expectedAvatar: FileTypes16File16WordDocumentIcon,
    },
    {
      id: 'pdf',
      quickNavIconClass: 'content-type-attachment-pdf',
      cqlIconClass: 'icon-file-pdf',
      extensions: ['pdf'],
      expectedAvatar: FileTypes16File16PdfDocumentIcon,
    },
    {
      id: 'presentation',
      quickNavIconClass: 'content-type-attachment-presentation',
      cqlIconClass: 'icon-file-presentation',
      extensions: ['pptx', 'ppsx', 'potx', 'pot', 'ppt', 'pptm'],
      expectedAvatar: FileTypes16File16PowerpointPresentationIcon,
    },
    {
      id: 'spreadsheet',
      quickNavIconClass: 'content-type-attachment-excel',
      cqlIconClass: 'icon-file-presentation',
      extensions: ['xlt', 'xls', 'xlsm', 'xlsx', 'xlst'],
      expectedAvatar: FileTypes16File16ExcelSpreadsheetIcon,
    },
    {
      id: 'video',
      quickNavIconClass: 'content-type-attachment-multimedia',
      cqlIconClass: 'icon-file-video',
      extensions: ['mov', 'mpeg', 'mpg', 'mp4', 'avi'],
      expectedAvatar: FileTypes16File16VideoIcon,
    },
    {
      id: 'zip',
      quickNavIconClass: 'content-type-attachment-zip',
      cqlIconClass: 'icon-file-zip',
      extensions: ['zip'],
      expectedAvatar: FileTypes16File16ArchiveIcon,
    },
    {
      id: 'generic',
      quickNavIconClass: 'dummy-unmatched-icon-class',
      cqlIconClass: 'dummy-unmatched-icon-class',
      extensions: ['unknown', 'test'],
      expectedAvatar: FileTypes16File16GenericIcon,
    },
  ].forEach((testGroup) => {
    describeTestGroup(
      testGroup.id,
      testGroup.extensions,
      testGroup.cqlIconClass,
      testGroup.quickNavIconClass,
      testGroup.expectedAvatar,
    );
  });
});
