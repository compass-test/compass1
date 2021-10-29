export enum ErrorContext {
  I18nAccessPathKey = 'err.access.path',
  I18nEntityConnectionKey = 'err.entity.connection',
  I18nEntityFormKey = 'err.entity.form',
  I18nEntityIssueKey = 'err.entity.issue',
  I18nEntityIssueCreateKey = 'err.entity.issue.create',
  I18nEntityPreferredFormKey = 'err.entity.preferredform',
  I18nEntityProjectKey = 'err.entity.project',
  I18nEntityProjectAutomationKey = 'err.entity.project.automation',
  I18nEntityRequestTypeKey = 'err.entity.requesttype',
  I18nEntityServiceDeskKey = 'err.entity.servicedesk',
  I18nJwtParseKey = 'err.jwt.parse',
  I18nJwtSignatureKey = 'err.jwt.signed',
  I18nJwtVerifyKey = 'err.jwt.verify',
  I18nInternalServerError = 'err.server.internal',
  I18nUnknownContextError = 'err.context.unknown',
}

export function ErrorContextOf(context?: string): ErrorContext {
  switch (context) {
    case ErrorContext.I18nAccessPathKey:
      return ErrorContext.I18nAccessPathKey;
    case ErrorContext.I18nEntityConnectionKey:
      return ErrorContext.I18nEntityConnectionKey;
    case ErrorContext.I18nEntityFormKey:
      return ErrorContext.I18nEntityFormKey;
    case ErrorContext.I18nEntityIssueKey:
      return ErrorContext.I18nEntityIssueKey;
    case ErrorContext.I18nEntityIssueCreateKey:
      return ErrorContext.I18nEntityIssueCreateKey;
    case ErrorContext.I18nEntityPreferredFormKey:
      return ErrorContext.I18nEntityPreferredFormKey;
    case ErrorContext.I18nEntityProjectKey:
      return ErrorContext.I18nEntityProjectKey;
    case ErrorContext.I18nEntityProjectAutomationKey:
      return ErrorContext.I18nEntityProjectAutomationKey;
    case ErrorContext.I18nEntityRequestTypeKey:
      return ErrorContext.I18nEntityRequestTypeKey;
    case ErrorContext.I18nEntityServiceDeskKey:
      return ErrorContext.I18nEntityServiceDeskKey;
    case ErrorContext.I18nJwtParseKey:
      return ErrorContext.I18nJwtParseKey;
    case ErrorContext.I18nJwtSignatureKey:
      return ErrorContext.I18nJwtSignatureKey;
    case ErrorContext.I18nJwtVerifyKey:
      return ErrorContext.I18nJwtVerifyKey;
    case ErrorContext.I18nInternalServerError:
      return ErrorContext.I18nInternalServerError;
    default:
      return ErrorContext.I18nUnknownContextError;
  }
}
