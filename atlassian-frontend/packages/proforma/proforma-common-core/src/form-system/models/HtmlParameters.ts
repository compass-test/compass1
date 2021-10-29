export const isHtmlExtension = (extension: any): boolean =>
  (extension as HtmlParameters).htmlContent !== undefined;

export interface HtmlParameters {
  id: number;
  htmlContent?: string;
}
