import {
  MediaMock,
  generateFilesFromTestData,
} from '@atlaskit/media-test-helpers/media-mock';
import { smallImage, tallImage } from '@atlaskit/media-test-helpers/images';
import { fakeImage } from '@atlaskit/media-test-helpers/mockData';
import { vrVideoDetails } from '@atlaskit/media-test-helpers/exampleMediaItems';

export const testMediaSingle = {
  id: 'a559980d-cd47-43e2-8377-27359fcb905f',
  width: 500,
  height: 374,
};
export const testSmallMediaSingle = {
  id: '52fb8e3a-2265-456f-ae2b-e0058a73a94e',
  width: 500,
  height: 374,
};
export const testMediaSingleGreySvg = {
  id: '8550f88e-6be9-4141-9a36-30e74aaec3ab',
};
export const testMediaGroup = {
  id: 'a3d20d67-14b1-4cfc-8ba8-918bbc8d71e1',
};

export const createEditorMediaMock = (): MediaMock => {
  const mediaMockServer = new MediaMock({
    recents: generateFilesFromTestData([
      {
        name: 'one.svg',
        dataUri: fakeImage,
      },
      {
        name: 'two.svg',
        dataUri: fakeImage,
      },
      {
        name: 'three.svg',
        dataUri: fakeImage,
      },
      {
        name: 'four.svg',
        dataUri: fakeImage,
      },
      {
        name: 'five.svg',
        dataUri: fakeImage,
      },
      {
        name: 'recents_tall_image.jpeg',
        dataUri: tallImage,
      },
    ]),
    MediaServicesSample: generateFilesFromTestData([
      {
        id: testMediaSingleGreySvg.id,
        name: 'one.svg',
        dataUri: fakeImage,
      },
      {
        id: testMediaSingle.id,
        name: 'tall_image.jpeg',
        dataUri: tallImage,
      },
      vrVideoDetails,
      {
        id: testSmallMediaSingle.id,
        name: 'small_image.png',
        dataUri: smallImage,
      },
      vrVideoDetails,
      {
        id: testMediaGroup.id,
        name: 'text_file.txt',
        mediaType: 'doc',
      },
    ]),
  });

  return mediaMockServer;
};
