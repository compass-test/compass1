import { StoreActionApi } from 'react-sweet-state';

import { ModalState } from './types';

export const setOnCloseHandler = (onCloseHandler: () => void) => ({
  setState,
}: StoreActionApi<ModalState>) => {
  setState({ onCloseHandler });
};
