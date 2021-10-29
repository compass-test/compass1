export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const calcTextFieldActionSubjectId = (name: string) =>
  `stripeCreditCard${capitalizeFirstLetter(name)}TextField`;
