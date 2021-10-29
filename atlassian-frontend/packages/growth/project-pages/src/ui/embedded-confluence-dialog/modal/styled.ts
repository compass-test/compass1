import styled from 'styled-components';
import { N30, N100A } from '@atlaskit/theme/colors';
import { gridSize, layers } from '@atlaskit/theme/constants';

export const CustomModalHeader = styled.div`
  display: flex;
  position: relative;
  padding: ${gridSize() * 1.5}px ${gridSize() * 2.5}px;
  margin-bottom: ${gridSize() * 1.25}px;
  border-bottom: 1px solid ${N30};
  justify-content: space-between;
`;

export const ModalBodyViewWrapper = styled.div`
  flex-grow: 1;
  && {
    padding: 0 ${gridSize() * 2.5}px;
  }
`;

export const ModalBodyEditWrapper = styled.div`
  flex-grow: 1;
  && {
    padding: 0;
    overflow-y: hidden;
  }
`;

export const ModalContainer = styled.div`
  && {
    width: calc(100vw - 120px);
    padding: 1px; // needed to display border-radius in edit mode
  }
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// this is an extra modal blanket covering everything behind our modal to
// darken it when an inner modal is being shown in the embedded component
export const ModalOuterBlanket = styled.div`
  height: 100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  left: 0;

  z-index: ${layers.modal()};
  background-color: ${N100A};
`;

// this is a blanket on top of the components inside our modal but under the
// iframe, so it darkens just the right components when an inner modal is
// being shown in the embedded component
export const ModalInnerBlanket = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 0;
  background-color: ${N100A};
`;
