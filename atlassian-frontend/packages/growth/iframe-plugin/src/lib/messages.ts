export enum SpaEvents {
  Handshake = 'handshake',
  Ready = 'ready',
  Message = 'message',
  AnalyticEvent = 'analytic-event',
  ErrorBoundary = 'error-boundary',
}

export enum HostEvents {
  Error = 'error',
  Message = 'message',
  AnalyticEvent = 'analytic-event',
  Handshake = 'handshake',
}

export enum Source {
  Child = 'child',
  Parent = 'parent',
}
