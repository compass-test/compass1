export class InMemoryStore implements Storage {
  _data: { [key: string]: string } = {};

  length = 0;

  setItem = (key: string, value: string) => {
    this._data[key] = value;
    this.length = Object.keys(this._data).length;
    return value;
  };

  getItem = (key: string): string | null => {
    if (key in this._data) {
      return this._data[key];
    }
    return null;
  };

  removeItem = (key: string) => {
    if (key in this._data) {
      delete this._data[key];
    }
    this.length = Object.keys(this._data).length;
    return null;
  };

  clear = () => {
    this._data = {};
    this.length = 0;
  };

  key = (index: number) => Object.keys(this._data)[index];
}

export default new InMemoryStore();
