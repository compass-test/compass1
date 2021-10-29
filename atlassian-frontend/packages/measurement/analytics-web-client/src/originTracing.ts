import { originTracingType } from './analyticsWebTypes';
import urlParamExtractor from './urlUtils';


export default class OriginTracing {
  _originStore: any;

  constructor() {
    this._originStore = {};
  }

  handleOriginParameters = (
    originParamHandlerMapping: any,
    historyReplaceFn: any,
  ) => {
    // Collect all the parameter labels to be handled
    const originParamLabelList: string[] = Object.keys(
      originParamHandlerMapping,
    );

    if (!(originParamLabelList.length > 0)) {
      throw new Error('Empty parameter mapping provided');
    }

    // Check if the parameter labels are valid. If any invalid labels are found throw an exception.
    const invalidParams = originParamLabelList.filter(
      (x): x is originTracingType => Object.values<string>(originTracingType).indexOf(x) < 0,
    );

    if (invalidParams.length > 0) {
      throw new Error(
        `Invalid Origin Tracing Parameter(s) supplied: ${invalidParams.join()}!`,
      );
    }
    const isCaptureParam = (_: any, key: any) => originParamLabelList.indexOf(key) >= 0;
    // Capture and remove params from URL
    const capturedURLParams: any = urlParamExtractor(
      isCaptureParam,
      historyReplaceFn,
    );
    // Apply provided handler function to extract origin trace ID from each URL parameter
    const applyHandlerFunction = (key: any) => {
      const x = originParamHandlerMapping[key](capturedURLParams[key]);
      return { [key]: x };
    };
    const extractedOriginID = Object.keys(capturedURLParams)
      .map(applyHandlerFunction)
      .reduce(
        (accumulator, currentValue) => Object.assign(accumulator, currentValue),
        {},
      );
    return extractedOriginID;
  };
}
