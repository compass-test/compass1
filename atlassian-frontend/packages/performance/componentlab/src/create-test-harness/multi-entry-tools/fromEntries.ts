// @ts-nocheck
/*
  This file is a copy of build/monorepo-utils/multi-entry-tools/utils/fromEntries.js
  This is a temporary workaround as multi-entry-tools is a private package and we cannot
  have private packages as dependencies.

  This is currently being addressed in https://product-fabric.atlassian.net/browse/AFP-2524
*/

// TODO: Ask Marco amd MB if still needed
// Object.fromEntries polyfill, remove when upgraded to node 10
export default function fromEntries(iterable /*: Array<any> */) {
  return [...iterable].reduce(
    (obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }),
    {},
  );
}
