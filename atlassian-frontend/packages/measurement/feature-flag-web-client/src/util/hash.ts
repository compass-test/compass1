import jsonStringfy from 'fast-json-stable-stringify';
import { Md5 } from 'ts-md5';

export default function hashObject<T>(obj: T): string {
  return Md5.hashStr(jsonStringfy(obj)) as string;
}
