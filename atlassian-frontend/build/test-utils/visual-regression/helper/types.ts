import { Page, WaitForSelectorOptions } from 'puppeteer';
import type { MatchImageSnapshotOptions } from 'jest-image-snapshot';
// Export puppeteer types to avoid consumers of @atlaskit/visual-regression
// from having to change from a transitive dependency to a direct dev dependency.
// These come from the @types/puppeteer package.
export type {
  KeyInput as PuppeteerKeyInput,
  Page as PuppeteerPage,
  ScreenshotOptions as PuppeteerScreenshotOptions,
  Serializable as PuppeteerSerializable,
  ElementHandle as PuppeteerElementHandle,
} from 'puppeteer';
export type PuppeteerWaitForOptions = {
  polling?: 'raf' | 'mutation' | number;
} & WaitForSelectorOptions;

// even though Page extends EventEmitter, TS complained about page.removeListener
export type PageEventEmitter = Page & NodeJS.EventEmitter;

export type LoadPageOptions = {
  reloadSameUrl?: boolean;
  disabledSideEffects?: SideEffectOptions;
};

export type SideEffectOptions = {
  cursor?: boolean;
  animation?: boolean;
  transition?: boolean;
  scroll?: boolean;
};

export interface CompareScreenshotOptions {
  useUnsafeThreshold?: boolean;
  customSnapshotIdentifier?: CustomSnapshotIdentifier;
}

export type CustomSnapshotIdentifier = MatchImageSnapshotOptions['customSnapshotIdentifier'];

export type ExampleConfig = {
  team: string;
  package: string;
  exampleName: string;
};
