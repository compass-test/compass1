type ObserverFunction = (data?: string) => void;

export class ObservableObject<ObjectType> {
  private _observers: ObserverFunction[];
  private _object: ObjectType | null;

  constructor() {
    this._observers = [];
    this._object = null;
  }

  subscribe(fn: ObserverFunction) {
    this._observers.push(fn);

    return () => this.unsubscribe(fn);
  }

  unsubscribe(fn: ObserverFunction) {
    this._observers = this._observers.filter((observerFn) => fn !== observerFn);
  }

  notify() {
    this._observers.forEach((observerFn) => observerFn.call(this));
  }

  get object(): ObjectType | null {
    return this._object;
  }

  set object(value: ObjectType | null) {
    this._object = value;

    this.notify();
  }
}
