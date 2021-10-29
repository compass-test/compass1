import jscodeshift, { ASTPath, JSXElement } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

import {
  addCommentBefore,
  doesIdentifierExist,
  getDefaultSpecifier,
  getJSXAttributesByName,
  getSafeImportName,
  hasImportDeclaration,
  hasImportDeclarationFromAnyPackageEntrypoint,
  removeImport,
  shiftDefaultImport,
} from '../utils/support';

describe('supporting functions', () => {
  describe('has import declaration', () => {
    it('should return false when an import declaration does not exist', () => {
      const code = `import { example } from 'fake-module';`;
      const source = jscodeshift(code);

      const hasImport = hasImportDeclaration(
        jscodeshift,
        source,
        '@atlaskit/theme',
      );
      expect(hasImport).toBeFalsy();
    });

    it('should return true when an import declaration exists', () => {
      const code = `import { colors } from '@atlaskit/theme';`;
      const source = jscodeshift(code);

      const hasImport = hasImportDeclaration(
        jscodeshift,
        source,
        '@atlaskit/theme',
      );
      expect(hasImport).toBeTruthy();
    });
  });

  describe('has import declaration from any package entry point', () => {
    it('should return false when an import declaration does not exist', () => {
      const code = `import { example } from 'fake-module';`;
      const source = jscodeshift(code);

      const hasImport = hasImportDeclarationFromAnyPackageEntrypoint(
        jscodeshift,
        source,
        '@atlaskit/theme',
      );
      expect(hasImport).toBeFalsy();
    });

    it('should return true when an import declaration from the main package exists', () => {
      const code = `import { colors } from '@atlaskit/theme';`;
      const source = jscodeshift(code);

      const hasImport = hasImportDeclarationFromAnyPackageEntrypoint(
        jscodeshift,
        source,
        '@atlaskit/theme',
      );
      expect(hasImport).toBeTruthy();
    });

    it('should return true when an import declaration from any entrypoint exists', () => {
      const colorExample = `import { B100 } from '@atlaskit/theme/colors';`;
      const colorSource = jscodeshift(colorExample);
      const hasColorImport = hasImportDeclarationFromAnyPackageEntrypoint(
        jscodeshift,
        colorSource,
        '@atlaskit/theme',
      );
      expect(hasColorImport).toBeTruthy();

      const typographyExample = `import { B100 } from '@atlaskit/theme/typography';`;
      const typographySource = jscodeshift(typographyExample);
      const hasTypographyImport = hasImportDeclarationFromAnyPackageEntrypoint(
        jscodeshift,
        typographySource,
        '@atlaskit/theme',
      );
      expect(hasTypographyImport).toBeTruthy();
    });
  });

  describe('does identifier exist', () => {
    it('should return true when a varialbe is defined', () => {
      const code = `const a = 10;`;
      const source = jscodeshift(code);

      const existence = doesIdentifierExist(jscodeshift, source, 'a');
      expect(existence).toBeTruthy();
    });

    it('should return false when a varaible is not defined', () => {
      const code = `const a = 10;`;
      const source = jscodeshift(code);

      const existence = doesIdentifierExist(jscodeshift, source, 'b');
      expect(existence).toBeFalsy();
    });
  });

  describe('shift default import', () => {
    it('shift default name', () => {
      const code = `import Button from '@atlaskit/button';`;

      const source = jscodeshift(code);
      const defaultName = getDefaultSpecifier(
        jscodeshift,
        source,
        '@atlaskit/button',
      );

      if (defaultName == null) {
        return;
      }

      shiftDefaultImport(
        jscodeshift,
        source,
        defaultName,
        '@atlaskit/button',
        '@atlaskit/button/custom-theme-button',
      );

      const converted = source.toSource();
      expect(converted).toEqual(
        `import Button from "@atlaskit/button/custom-theme-button";`,
      );
    });

    it('shift alias name', () => {
      const code = `import AKButton from '@atlaskit/button';`;

      const source = jscodeshift(code);
      const defaultName = getDefaultSpecifier(
        jscodeshift,
        source,
        '@atlaskit/button',
      );

      if (defaultName == null) {
        return;
      }

      shiftDefaultImport(
        jscodeshift,
        source,
        defaultName,
        '@atlaskit/button',
        '@atlaskit/button/custom-theme-button',
      );

      const converted = source.toSource();
      expect(converted).toEqual(
        `import AKButton from "@atlaskit/button/custom-theme-button";`,
      );
    });
  });

  describe('remove import', () => {
    it('should remove import statement', () => {
      const code = `import Button from '@atlaskit/button';`;
      const source = jscodeshift(code);
      removeImport(jscodeshift, source, '@atlaskit/button');
      const converted = source.toSource();
      expect(converted).toEqual(``);
    });

    it('should not touch the source when it is not the right package', () => {
      const code = `import Button from '@atlaskit/button';`;
      const source = jscodeshift(code);
      removeImport(jscodeshift, source, '@atlaskit/tag');
      const converted = source.toSource();
      expect(converted).toEqual(`import Button from '@atlaskit/button';`);
    });
  });

  describe('add comment before', () => {
    it('add comment to block', () => {
      const code = `import Button from '@atlaskit/button';`;
      const source = jscodeshift(code);

      addCommentBefore(jscodeshift, source, 'hello world');

      const converted = source.toSource();
      expect(converted).toEqual(
        `/* TODO: (from codemod) hello world */\nimport Button from '@atlaskit/button';`,
      );
    });

    it('add inline comment', () => {
      const code = `
      import Button from '@atlaskit/button';
      const MyButton = (props) => {
        const a = 10;
        return (<Button {...props} />);
      }
      export default MyButton;
      `;

      const source = jscodeshift(code);
      const variable = source.findVariableDeclarators('a');
      addCommentBefore(jscodeshift, variable, 'defining variable a');

      const converted = source.toSource();
      expect(converted).toEqual(
        `
      import Button from '@atlaskit/button';
      const MyButton = (props) => {
        const /* TODO: (from codemod) defining variable a */
        a = 10;
        return (<Button {...props} />);
      }
      export default MyButton;
      `,
      );
    });
  });

  describe('get safe import name', () => {
    it('should return a fallback import name when desired name was already used', () => {
      const code = `import Breadcrumbs from '@material-ui/Breadcrumbs';
      import BreadcrumbsStateless from '@atlaskit/breadcrumbs';`;
      const base = jscodeshift(code);
      const currentDefaultSpecifierName = getDefaultSpecifier(
        jscodeshift,
        base,
        '@atlaskit/button',
      );
      const desiredName = 'Breadcrumbs';
      const fallbackName = 'DSBreadcrumbs';
      const j = jscodeshift;
      const safeImportName = getSafeImportName({
        j,
        base,
        currentDefaultSpecifierName,
        desiredName,
        fallbackName,
      });

      expect(safeImportName).toEqual(fallbackName);
    });

    it('should return desired name when it was not used', () => {
      const code = `import BreadcrumbsStateless from '@atlaskit/breadcrumbs';`;
      const base = jscodeshift(code);
      const currentDefaultSpecifierName = getDefaultSpecifier(
        jscodeshift,
        base,
        '@atlaskit/button',
      );
      const desiredName = 'Breadcrumbs';
      const fallbackName = '';
      const j = jscodeshift;
      const safeImportName = getSafeImportName({
        j,
        base,
        currentDefaultSpecifierName,
        desiredName,
        fallbackName,
      });

      expect(safeImportName).toEqual(desiredName);
    });
  });

  describe('get jsx attributes by name', () => {
    it('should return a collection of attributes matching the name from the element passed as arguments', () => {
      const code = `
      <ModalDialog appearance="warning">
        {content}
      </ModalDialog>
      `;

      const source = jscodeshift(code) as Collection<Node>;
      const element = source.findJSXElements('ModalDialog').get() as ASTPath<
        JSXElement
      >;
      const attributes = getJSXAttributesByName(
        jscodeshift,
        element,
        'appearance',
      );

      expect(attributes.length).toEqual(1);
      expect(attributes.get('value').value.value).toEqual('warning');
    });

    it('should return attributes ONLY for the parent element', () => {
      const code = `
      <ModalDialog appearance="warning">
        <SectionMessage appearance="information">
          {content}
        </SectionMessage>
      </ModalDialog>
      `;

      const source = jscodeshift(code) as Collection<Node>;
      const element = source.findJSXElements('ModalDialog').get() as ASTPath<
        JSXElement
      >;
      const attributes = getJSXAttributesByName(
        jscodeshift,
        element,
        'appearance',
      );

      expect(attributes.length).toEqual(1);
      expect(attributes.get('value').value.value).toEqual('warning');
    });
  });
});
