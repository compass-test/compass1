/**
 * Size of icons.
 * This is dupliated from `packages/design-system/icon/src/types.ts` so
 * we don't introduce a circular dependency on the package.
 */
export type Size = 'small' | 'medium' | 'large' | 'xlarge';

export interface IconBuildConfig {
  /**
   * Source of your SVGs.
   */
  srcDir: string;

  /**
   * Directory to save the processed SVGs to.
   */
  processedDir: string;

  /**
   * Deirectory to save the generated React Glyphs to.
   */
  destDir: string;

  /**
   * Glob to match your SVGs in `srcDir`.
   */
  glob: string;

  /**
   * Max width of the SVG.
   */
  maxWidth: number;

  /**
   * Max height of the SVG.
   */
  maxHeight: number;

  /**
   * Size of the icon when wanting to set a specific one.
   * When set consumers will not be able to size the output glyph
   * themselves - effectively removing the `size` prop from the component.
   */
  size?: Size;

  /**
   * When set will use this entrypoint for generated glyph base icon components.
   */
  baseIconEntryPoint?: string;

  /**
   * Fixed width of the icon.
   * When using this and `height` together consumers will not be able to size the output glyph
   * themselves - effectively removing the `size` prop from the component.
   */
  width?: number;

  /**
   * Fixed height of the icon.
   * When using this and `width` together consumers will not be able to size the output glyph
   * themselves - effectively removing the `size` prop from the component.
   */
  height?: number;

  /**
   * Disables color props from appearing on the generated icon glyphs.
   */
  isColorsDisabled?: boolean;
}

export interface IconOutput {
  /**
   * Location of the output icon glyph.
   */
  fileKey: string;

  /**
   * Name of the glyph.
   */
  displayName: string;
}

export interface CustomSVGOPlugin {
  /**
   * "full" will call the plugin with the entire AST
   * "perItem" will call the plugin per item
   */
  type: 'full' | 'perItem';

  /**
   * `true` enables the plugin,
   * `false` disabled the plugin
   */
  active: boolean;

  /**
   * Description of the plugin
   */
  description: string;

  /**
   * Plugin function.
   *
   * @param node
   */
  fn(node: any, params?: any): any;

  /**
   * Set default params to pass to the plugin.
   */
  params?: any;
}

/**
 * This only exists because it isn't exported from `svgo`.
 */
export interface OptimizedSvg {
  data: string;
  info: {
    width: string;
    height: string;
  };
  path?: string;
}
