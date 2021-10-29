/* eslint no-bitwise: 0 no-mixed-operators: 0 */
export default function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const uuid = char === 'x' ? random : (random & 0x3) | 0x8;
    return uuid.toString(16);
  });
}
