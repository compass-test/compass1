import { Release } from '../../../common/types';

import { Props as ModalContentProps } from './releases-modal-content/types';

type Modify<T, R> = Omit<T, keyof R> & R;

export type Props = Modify<
  ModalContentProps,
  {
    onSubmit?: (value: Release['id'][]) => void;
    onChange?: (value: Release['id'][]) => void;
  }
>;
