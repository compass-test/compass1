export function convertPipelineStatus(state: any): string {
  return convertStatus(state, false);
}

export function convertStepStatus(state: any): string {
  return convertStatus(state, true);
}

function convertStatus(state: any, usePendingStage: any): string {
  if (!state || !state.name) {
    return '';
  }
  if (state.name === 'IN_PROGRESS' && state.stage) {
    return state.stage.name;
  }
  if (state.name === 'PENDING' && usePendingStage && state.stage) {
    return state.stage.name;
  }
  if (state.name === 'COMPLETED' && state.result) {
    if (state.result.name === 'ERROR') {
      return 'SYSTEM_ERROR';
    }
    return state.result.name;
  }
  return state.name;
}
