import { EditorProps } from '@atlaskit/editor-core';
import {
  compareScreenshot,
  CustomSnapshotIdentifier,
  disableAllSideEffects,
  getExampleUrl,
  navigateToUrl,
  PuppeteerPage,
  PuppeteerSerializable,
  SideEffectOptions,
} from '@atlaskit/visual-regression/helper';

export async function animationFrame(page: any) {
  // Give browser time to render, waitForFunction by default fires on RAF.
  await page.waitForFunction('1 === 1');
}

export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 600;
export const editorFullPageContentSelector =
  '.fabric-editor-popup-scroll-parent';
const pmSelector = '.ProseMirror';

export enum Device {
  Default = 'Default',
  LaptopHiDPI = 'LaptopHiDPI',
  LaptopMDPI = 'LaptopMDPI',
  iPadPro = 'iPadPro',
  iPad = 'iPad',
  iPhonePlus = 'iPhonePlus',
}

export const deviceViewPorts = {
  [Device.Default]: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
  [Device.LaptopHiDPI]: { width: 1440, height: 900 },
  [Device.LaptopMDPI]: { width: 1280, height: 800 },
  [Device.iPadPro]: { width: 1024, height: 1366 },
  [Device.iPad]: { width: 768, height: 1024 },
  [Device.iPhonePlus]: { width: 414, height: 736 },
};

interface Threshold {
  tolerance?: number;
  useUnsafeThreshold?: boolean;
}

export interface EventHooks {
  /**
   * A hook which is called after navigation to the test page.
   * Example usage: setup performance marks post-navigation.
   */
  onNavigateToUrl?: () => Promise<void>;
  /**
   * A hook which is called straight after a call to render the TWP Editor.
   * Example usage: check how long the it takes for the page to become idle.
   */
  onEditorMountCalled?: () => Promise<void>;
}

type InitEditorWithADFOptions = {
  appearance: Appearance;
  adf?: Object;
  device?: Device;
  viewport?: { width: number; height: number };
  editorProps?: EditorProps;
  allowSideEffects?: SideEffectOptions;
  withSidebar?: boolean;
  withContextPanel?: boolean;
  forceReload?: boolean;
  invalidAltTextValues?: string[];
  hooks?: EventHooks;
};

export enum Appearance {
  fullWidth = 'full-width',
  fullPage = 'full-page',
  comment = 'comment',
  mobile = 'mobile',
}

export type MountOptions = {
  withSidebar?: boolean;
  i18n?: {
    locale: string;
  };
  withContextPanel?: boolean;
  invalidAltTextValues?: string[];
  hooks?: EventHooks;
};

async function takeSnapshot(
  page: PuppeteerPage,
  threshold: Threshold = {},
  selector: string = editorFullPageContentSelector,
  customSnapshotIdentifier?: CustomSnapshotIdentifier,
) {
  const { tolerance, useUnsafeThreshold } = threshold;
  const editor = await page.$(selector);

  // Wait for a frame because we are using RAF to throttle floating toolbar render
  await animationFrame(page);

  // Try to take a screenshot of only the editor.
  // Otherwise take the whole page.
  const image = editor ? await editor.screenshot() : await page.screenshot();

  return compareScreenshot(image as string, tolerance, {
    useUnsafeThreshold,
    customSnapshotIdentifier,
  });
}

export const snapshot = async (
  page: PuppeteerPage,
  threshold: Threshold = {},
  selector: string = editorFullPageContentSelector,
) => {
  await takeSnapshot(page, threshold, selector);
};

export const initEditorWithAdf = async (
  page: PuppeteerPage,
  options: InitEditorWithADFOptions,
) => {
  const mountOptions: MountOptions = {
    withSidebar: options.withSidebar,
    invalidAltTextValues: options.invalidAltTextValues,
    hooks: options.hooks,
  };

  await setupEditor(page, options, mountOptions);
};

async function setupEditor(
  page: PuppeteerPage,
  options: Omit<InitEditorWithADFOptions, 'withSidebar'>,
  mountOptions: MountOptions,
) {
  const {
    appearance,
    adf = {},
    device = Device.Default,
    viewport,
    editorProps = {},
    allowSideEffects = {},
    withContextPanel,
    forceReload,
  } = options;

  const { withSidebar = false, invalidAltTextValues, hooks } = mountOptions;
  await page.bringToFront();
  const url = getExampleUrl('editor', 'editor-referentiality', 'testing');

  // Chrome adjusts screen/CSS viewport but not layout viewport with setViewport.
  // Try this if you're adjusting screen resolution in your test and snapshots look odd.
  await navigateToUrl(page, url, !forceReload);

  // Set the viewport to the right one
  if (viewport) {
    await page.setViewport(viewport);
  } else {
    await page.setViewport(deviceViewPorts[device]);
  }

  // For any actions to be taken prior to mounting the editor.
  if (hooks?.onNavigateToUrl) {
    await hooks?.onNavigateToUrl();
  }

  // Mount the editor with the right attributes
  await mountEditor(
    page,
    {
      appearance: appearance,
      ...editorProps,
      defaultValue: JSON.stringify(adf),
    },
    { withSidebar, withContextPanel, invalidAltTextValues },
  );

  // For any actions to be taken prior straight after mounting of the editor.
  if (hooks?.onEditorMountCalled) {
    await hooks?.onEditorMountCalled();
  }

  // We disable possible side effects, like animation, transitions and caret cursor,
  // because we cannot control and affect snapshots
  // You can override this disabling if you are sure that you need it in your test
  await disableAllSideEffects(page, allowSideEffects);
}

export async function mountEditor(
  page: PuppeteerPage,
  props: any,
  mountOptions: MountOptions = {},
) {
  await page.evaluate(
    (props: EditorProps, mountOptions: MountOptions) => {
      return new Promise<void>((resolve) => {
        function waitAndCall() {
          if ((window as any).__mountEditor) {
            (window as any).__mountEditor(props, mountOptions);
            resolve();
          } else {
            // There is no need to implement own timeout, if done() is not called on time,
            // webdriver will throw with own timeout.
            setTimeout(waitAndCall, 20);
          }
        }
        waitAndCall();
      });
    },
    props,
    mountOptions as PuppeteerSerializable,
  );
  await page.waitForSelector(pmSelector);
}
