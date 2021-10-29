import { createContext } from 'react';

const IDLE_THRESHOLD: number = 1000;
const CANCEL_AFTER: number = 60;

class IdleDetector {
  private observer: PerformanceObserver;
  private prevLongTask:
    | Pick<PerformanceEntry, 'startTime' | 'duration'>
    | undefined;
  private lastLongTask: Pick<PerformanceEntry, 'startTime' | 'duration'> = {
    // eslint-disable-next-line compat/compat
    startTime: performance.now(),
    duration: 0,
  };
  private cancelAfterMs: number = 0;
  private startTime: number = 0;
  private checking: boolean = false;
  private handlers: Array<(tti: number) => void> = [];

  constructor() {
    this.init();
    this.observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length) {
        this.prevLongTask = this.lastLongTask;
        this.lastLongTask = entries[entries.length - 1];
      }
    });
  }

  public onIdle(fn: (tti: number) => void) {
    this.handlers.push(fn);
    if (!this.checking) {
      this.start();
    }
  }

  private init() {
    this.cancelAfterMs = CANCEL_AFTER * 1000;
    // eslint-disable-next-line compat/compat
    this.startTime = performance.now();
    this.prevLongTask = undefined;
    this.lastLongTask = {
      startTime: this.startTime,
      duration: 0,
    };
  }

  private start() {
    this.checking = true;
    this.init();
    this.observer.observe({ entryTypes: ['longtask'] });
    setTimeout(this.checkIdle.bind(this), IDLE_THRESHOLD);
  }

  private stop(tti: number) {
    this.observer.disconnect();
    const handlers = this.handlers;
    this.handlers = [];
    this.checking = false;
    setTimeout(() => {
      handlers.forEach((fn) => fn(tti));
    }, 50);
  }

  private checkIdle() {
    // 1. There hasn't been any long task in `idleThreshold` time: Interactive from the start.
    // 2. Only 1 long task: Interactive from the end of the only long task.
    // 3. Several long tasks:
    //    3.1 Interactive from the end of prevLongTask if `lastLongTask.start - prevLongTask.end >= idleThreshold`
    //    3.2 Interactive from the end of lastLongTask if `lastLongTask.start - prevLongTask.end < idleThreshold`
    // eslint-disable-next-line compat/compat
    const now = performance.now();
    const lastEnd = this.lastLongTask.startTime + this.lastLongTask.duration;
    const prevEnd = this.prevLongTask
      ? this.prevLongTask.startTime + this.prevLongTask.duration
      : lastEnd;

    if (!this.prevLongTask) {
      this.stop(0);
      return;
    } else if (this.lastLongTask.startTime - prevEnd >= IDLE_THRESHOLD) {
      this.stop(prevEnd - this.startTime);
      return;
    } else if (now - lastEnd >= IDLE_THRESHOLD || this.cancelAfterMs <= 0) {
      this.stop(lastEnd - this.startTime);
      return;
    }

    this.cancelAfterMs = Math.max(
      0,
      this.cancelAfterMs - (now - this.startTime),
    );
    setTimeout(this.checkIdle.bind(this), IDLE_THRESHOLD);
  }
}

export const IDleDetectorContext = createContext(new IdleDetector());
