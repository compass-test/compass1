import { v4 as uuid } from 'uuid';

export function getOptimisticId(): string {
  return uuid();
}

export function optimisticFields() {
  return {
    id: getOptimisticId(),
    _isOptimistic: true,
  };
}
