import { transform } from '..';
import { Project } from 'ts-morph';
import path from 'path';

describe('transform()', () => {
  const project = new Project();
  it('Pick', async () => {
    const filePath = path.join(__dirname, '..', '__fixtures__', 'pick.d.ts');
    const entry = project.addSourceFileAtPath(filePath);
    expect(transform(entry).getText()).toMatchSnapshot();
  });

  it('Omit', async () => {
    const filePath = path.join(__dirname, '..', '__fixtures__', 'omit.d.ts');
    const entry = project.addSourceFileAtPath(filePath);
    expect(transform(entry).getText()).toMatchSnapshot();
  });

  it('React types', async () => {
    const filePath = path.join(__dirname, '..', '__fixtures__', 'react.d.ts');
    const entry = project.addSourceFileAtPath(filePath);
    expect(transform(entry).getText()).toMatchSnapshot();
  });

  it('Getters', async () => {
    const filePath = path.join(__dirname, '..', '__fixtures__', 'getters.d.ts');
    const entry = project.addSourceFileAtPath(filePath);
    expect(transform(entry).getText()).toMatchSnapshot();
  });

  it('Setters', async () => {
    const filePath = path.join(__dirname, '..', '__fixtures__', 'setters.d.ts');
    const entry = project.addSourceFileAtPath(filePath);
    expect(transform(entry).getText()).toMatchSnapshot();
  });

  it('interface extends array with numerical literal', async () => {
    const filePath = path.join(
      __dirname,
      '..',
      '__fixtures__',
      'interface-numerical-literal.d.ts',
    );
    const entry = project.addSourceFileAtPath(filePath);
    expect(transform(entry).getText()).toMatchSnapshot();
  });
});
