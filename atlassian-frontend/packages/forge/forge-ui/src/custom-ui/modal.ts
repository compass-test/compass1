const ModalSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
} as const;

type ModalSizesType = typeof ModalSizes[keyof typeof ModalSizes];
type ModalDimensions = { height: string; minHeight?: string };

const modalDimensions: {
  [viewportSize in ModalSizesType]: ModalDimensions;
} = {
  [ModalSizes.SMALL]: { height: '20vh', minHeight: '320px' },
  [ModalSizes.MEDIUM]: { height: '40vh', minHeight: '520px' },
  [ModalSizes.LARGE]: { height: '70vh', minHeight: '720px' },
  [ModalSizes.XLARGE]: { height: '90vh' },
};

export const getModalDimensions = (size: ModalSizesType): ModalDimensions =>
  modalDimensions[size];
