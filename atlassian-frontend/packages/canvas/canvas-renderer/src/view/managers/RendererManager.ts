import { Renderer, RenderEventListener } from '../renderers/Renderer';

export const eventDelegator = (
  events: (keyof RenderEventListener)[],
  ...renderers: Renderer[]
): RenderEventListener => {
  return events.reduce<RenderEventListener>((prev, current) => {
    prev[current] = (...args: any[]) => {
      renderers.forEach(renderer => (renderer as any)[current]?.(...args));
    };
    return prev;
  }, {} as RenderEventListener);
};
