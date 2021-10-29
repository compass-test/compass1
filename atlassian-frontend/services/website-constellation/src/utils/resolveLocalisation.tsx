export default function resolveLocalisation(target: any) {
  if (!target) {
    return;
  }
  if (typeof target['en-US'] !== 'undefined') {
    return target['en-US'];
  }
  return target;
}
