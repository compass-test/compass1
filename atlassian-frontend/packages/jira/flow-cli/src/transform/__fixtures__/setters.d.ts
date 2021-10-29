export default class ErrorReporter {
  private handlerStorage;
  captureMessage(msg: string, tags?: ErrorReporterTags): void;
  captureException(err: Error, tags?: ErrorReporterTags): void;
  set handler(handler: ErrorReportingHandler | null);
}
