export class Collector {
  static from(...things: any) {
    const collector = new Collector();
    for (const thing of things) {
      collector.add(thing);
    }
    return collector.collect();
  }

  private collected: Array<any | any[]>;

  constructor() {
    this.collected = [];
  }

  add(thing: any) {
    if (typeof thing !== 'undefined') {
      if (Array.isArray(thing)) {
        this.collected.push(thing);
      } else {
        this.collected.push([thing]);
      }
    }
  }

  collect() {
    return ([] as any[]).concat(...this.collected);
  }
}
