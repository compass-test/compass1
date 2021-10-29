// eslint-disable-next-line import/no-extraneous-dependencies
import '@compiled/jest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';

declare global {
  namespace jest {
    interface StyleRuleOptions {
      target?: string;
      media?: string;
    }

    interface Matchers<R> {
      /**
       * Compare two ProseMirror Node objects (documents) for equality.
       * Two documents are equal if they have the same JSON representation (same structure of nodes and marks)
       */
      toEqualDocument(expected: any): R;
      toEqualDocumentAndSelection(expected: any): R;
      toMatchDocSnapshot(): R;
      toMatchProdImageSnapshot(opts?: {
        failureThreshold?: string;
        failureThresholdType?: string;
        customSnapshotIdentifier?: MatchImageSnapshotOptions['customSnapshotIdentifier'];
      }): R;
      toMatchCustomSnapshot(testName: string): R;
      toMatchCustomDocSnapshot(testName: string): R;
      toHaveStyleDeclaration(
        property: string,
        value: string | number,
        options?: StyleRuleOptions,
      ): R;

      toBeInTheDocument(): R;
      toHaveFocus(): R;

      /**
       * Jest Styled Components Matchers
       */
      toMatchStyledComponentsSnapshot(): void;
      toHaveStyleRule(
        property: string,
        value?: any,
        options?: {
          media?: string;
          modifier?: string;
        },
      ): void;

      // Used by @atlaskit/locale
      toBeDateWithYear(testYear: number): R;

      //Used by smartSelect
      toMatchCall(...expectedPayload: any): R;
    }

    interface VisualMatchOptions {
      threshold?: number;
    }

    interface Matchers<R, T extends ElementHandle> {
      toMatchVisually(expected: T, options?: VisualMatchOptions): Promise<R>;
    }

    interface Matchers<R> {
      /**
       * @summary
       * Assert presense or absence of modules in the development bundle
       *
       * @description
       * Check if a given module id is included in the development bundle
       * Can optionally narrow down to list of chunks
       *
       * A precondition of the matcher is a running webpack dev server.
       * In absence of the appropriate endpoint the matcher will pass,
       * effectively skipping the test.
       *
       * @example
       * ```ts
       * expect('enzyme').not.toBeBundled();
       * ```
       * @example
       * ```ts
       * expect('highlight.js').not.toBeBundled({
       *   chunks: ['main']
       * });
       * ```
       */
      toBeBundled(options?: { chunks: string[] }): Promise<R>;
    }

    interface Expect {
      // Used by @atlaskit/locale
      toBeDateWithYear(testYear: number): any;
    }
  }
}
