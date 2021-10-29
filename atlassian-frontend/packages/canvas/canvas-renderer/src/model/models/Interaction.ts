import { Vector2 } from '../../common/math/Vector2';

export type Interaction =
  | DragInteraction
  | DragStartInteraction
  | DragEndInteraction
  | PanInteraction
  | ZoomInteraction
  | InsertInteraction
  | ConvertInteraction
  | ConnectInteraction
  | DblclickInteraction;

type InteractionDefinition<
  InteractionType extends string,
  InteractionPayload = unknown
> = {
  type: InteractionType;
  payload: InteractionPayload;
};

export type PositionPayload = { position: Vector2 };
export type ZoomPayload = { delta: number };

export type DragInteraction = InteractionDefinition<'drag', PositionPayload>;
export type DragStartInteraction = InteractionDefinition<
  'drag-start',
  PositionPayload
>;
export type DragEndInteraction = InteractionDefinition<
  'drag-end',
  PositionPayload
>;
export type DblclickInteraction = InteractionDefinition<
  'dbl-click',
  PositionPayload
>;

export type PanInteraction = InteractionDefinition<'pan', PositionPayload>;
export type ZoomInteraction = InteractionDefinition<'zoom', ZoomPayload>;
export type InsertInteraction = InteractionDefinition<'insert'>;
export type ConvertInteraction = InteractionDefinition<'convert'>;
export type ConnectInteraction = InteractionDefinition<'connect'>;
