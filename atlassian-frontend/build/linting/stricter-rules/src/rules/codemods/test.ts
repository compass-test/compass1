import rule from './index';
import { FileToData } from '../../types';

const execute = (files: FileToData) =>
  rule.onProject({
    dependencies: {},
    files,
    rootPath: '/',
    config: { workspaces: [], teams: {} },
  });

describe('codemods', () => {
  test('No errors for versioned codemod prefixes', () => {
    expect(execute({ '/foo/bar/codemods/1.0.0-change-prop': {} })).toHaveLength(
      0,
    );
    expect(
      execute({ '/foo/bar/codemods/optimistic-1.0.0-change-prop': {} }),
    ).toHaveLength(0);
  });

  test('No errors for versioned codemod prefix directories', () => {
    expect(
      execute({ '/foo/bar/codemods/1.0.0-change-prop/index.ts': {} }),
    ).toHaveLength(0);
    expect(
      execute({
        '/foo/bar/codemods/optimistic-1.0.0-change-prop/index.ts': {},
      }),
    ).toHaveLength(0);
  });

  test('No errors for next codemod prefixes', () => {
    expect(execute({ '/foo/bar/codemods/next-change-prop': {} })).toHaveLength(
      0,
    );
    expect(
      execute({ '/foo/bar/codemods/optimistic-next-change-prop': {} }),
    ).toHaveLength(0);
  });

  test('No errors for next codemod prefix directories', () => {
    expect(
      execute({ '/foo/bar/codemods/next-change-prop/index.ts': {} }),
    ).toHaveLength(0);
    expect(
      execute({ '/foo/bar/codemods/optimistic-next-change-prop/index.ts': {} }),
    ).toHaveLength(0);
  });

  test('No errors for non-index codemod directory files', () => {
    expect(
      execute({ '/foo/bar/codemods/change-prop/helpers.ts': {} }),
    ).toHaveLength(0);
    expect(
      execute({ '/foo/bar/codemods/change-prop/helpers.ts': {} }),
    ).toHaveLength(0);
  });

  test('Errors for invalid prefixes', () => {
    const errors = execute({ '/foo/bar/codemods/alpha-change-prop': {} });
    expect(errors).toHaveLength(1);
    expect(errors).toMatchInlineSnapshot(`
      Array [
        "Invalid codemod name: alpha-change-prop (foo/bar/codemods/alpha-change-prop).
      Codemod name must be prefixed with \\"next-\\" or a valid semver version. Non-automatic codemods may also use an \\"optimistic-\\" prefix in addition to the mandatory next/version prefix",
      ]
    `);
  });

  test('Errors for invalid prefixes after optimistic', () => {
    const errors = execute({
      '/foo/bar/codemods/optimistic-alpha-change-prop': {},
    });
    expect(errors).toHaveLength(1);
    expect(errors).toMatchInlineSnapshot(`
      Array [
        "Invalid codemod name: optimistic-alpha-change-prop (foo/bar/codemods/optimistic-alpha-change-prop).
      Codemod name must be prefixed with \\"next-\\" or a valid semver version. Non-automatic codemods may also use an \\"optimistic-\\" prefix in addition to the mandatory next/version prefix",
      ]
    `);
  });

  test('Errors for codemods without any prefix', () => {
    const errors = execute({ '/foo/bar/codemods/helpers': {} });
    expect(errors).toHaveLength(1);
    expect(errors).toMatchInlineSnapshot(`
      Array [
        "Invalid codemod name: helpers (foo/bar/codemods/helpers).
      Codemod name must be prefixed with \\"next-\\" or a valid semver version. Non-automatic codemods may also use an \\"optimistic-\\" prefix in addition to the mandatory next/version prefix",
      ]
    `);
  });

  test('Errors for codemod directories with invalid prefix', () => {
    const errors = execute({
      '/foo/bar/codemods/alpha-change-prop/index.ts': {},
    });
    expect(errors).toHaveLength(1);
    expect(errors).toMatchInlineSnapshot(`
      Array [
        "Invalid codemod name: alpha-change-prop (foo/bar/codemods/alpha-change-prop/index.ts).
      Codemod name must be prefixed with \\"next-\\" or a valid semver version. Non-automatic codemods may also use an \\"optimistic-\\" prefix in addition to the mandatory next/version prefix",
      ]
    `);
  });
});
