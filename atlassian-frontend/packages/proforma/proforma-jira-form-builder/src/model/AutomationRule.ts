export enum RuleActionType {
  changeStatus = 'changeStatus',
  addForm = 'addForm',
  preventStatusChange = 'preventStatusChange',
  preventStatusChangeUnlessThisFormIsAttached = 'preventStatusChangeUnlessThisFormIsAttached',
}

export enum RuleActionTypeMessage {
  changeStatus = 'ActionLabelChangeStatus',
  addForm = 'ActionLabelAddForm',
  preventStatusChange = 'ActionLabelPreventStatusChange',
  preventStatusChangeUnlessThisFormIsAttached = 'ActionLabelPreventStatusChangeUnlessThisFormIsAttached',
}
