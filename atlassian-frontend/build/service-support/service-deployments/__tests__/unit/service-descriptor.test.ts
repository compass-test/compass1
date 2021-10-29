import path from 'path';
import { promises as fsp } from 'fs';
import { createTempDir } from 'jest-fixtures';
import { safeDump } from 'js-yaml';
import { readServiceDescriptor } from '../../commands/utils/files';

const sdInfo = {
  name: 'fake service',
  description: 'Used for testing',
};

describe('Generates Service Deployment Metadata', () => {
  let serviceDir: string;
  beforeEach(async () => {
    serviceDir = await createTempDir();
    jest.clearAllMocks();
  });

  const createServiceDescriptor = async (yaml: string, fileName: string) =>
    fsp.writeFile(path.join(serviceDir, fileName), yaml, 'utf-8');

  test('Throws error for no service descriptor', async () => {
    await expect(readServiceDescriptor('', serviceDir)).rejects.toThrow(
      'No Service Descriptor exists for this service [file name must match *.sd.(yml|yaml)]',
    );
  });

  test('Throws error for no service descriptor with valid name', async () => {
    await createServiceDescriptor('', 'fake-sd.yml');
    await expect(readServiceDescriptor('', serviceDir)).rejects.toThrow(
      'No Service Descriptor exists for this service [file name must match *.sd.(yml|yaml)]',
    );
  });

  test('Throws error for too many files that match valid service descriptor name (and none can be prioritised)', async () => {
    await createServiceDescriptor('', '1.sd.yml');
    await createServiceDescriptor('', '2.sd.yml');
    await expect(readServiceDescriptor('service', serviceDir)).rejects.toThrow(
      'There are multiple Service Descriptors for this service [matching *.sd.(yml|yaml)], but none that can be prioritised [matching <service-name>.sd.(yml|yaml)]',
    );
  });

  test('Returns valid service descriptor in object form', async () => {
    await createServiceDescriptor(safeDump(sdInfo), '1.sd.yml');
    expect(await readServiceDescriptor('service', serviceDir)).toEqual(sdInfo);
  });

  test('Prioritises service-name.sd.yml when there are multiple file that match the glob', async () => {
    await createServiceDescriptor('', '1.sd.yml');
    await createServiceDescriptor(safeDump(sdInfo), 'service.sd.yml');
    expect(await readServiceDescriptor('service', serviceDir)).toEqual(sdInfo);
  });

  test('Throws error for invalid file format', async () => {
    await createServiceDescriptor('just a string', 'service.sd.yml');
    await expect(readServiceDescriptor('service', serviceDir)).rejects.toThrow(
      'The Service Descriptor can not be parsed',
    );
  });
});
