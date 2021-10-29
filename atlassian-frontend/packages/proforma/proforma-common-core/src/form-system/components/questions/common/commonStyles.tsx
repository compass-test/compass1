import styled from 'styled-components';

import { N30 } from '@atlaskit/theme/colors';

export const ChoiceQuestionStyles = styled.div`
  line-height: initial;
`;

export const darkSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: N30,
    borderWidth: '2px',
    borderColor: N30,
    borderRadius: '3px',
  }),
};
