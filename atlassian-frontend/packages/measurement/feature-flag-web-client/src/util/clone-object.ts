export default function cloneObject<T>(obj: T): T {
  const str = JSON.stringify(obj);
  return JSON.parse(str);
}
