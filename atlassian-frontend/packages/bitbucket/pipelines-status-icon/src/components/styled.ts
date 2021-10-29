import styled, { keyframes } from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

const fadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;
const spin = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(1080deg); }
`;
export const Wrapper = styled.span`
  display: flex;
  line-height: 16px;
  transition: opacity 1s ease-in;
  font-weight: bold;
  svg {
    width: 16px;
    height: 16px;
    margin: 0 5px;
    transform-origin: 50%;
  }
  &[data-state='pending'] {
    color: ${colors.B300};
    animation: ${fadeIn} 0.25s ease-in;
  }
  &[data-state='failed'] {
    color: ${colors.R400};
    animation: ${fadeIn} 0.25s ease-in;
  }
  &[data-state='success'],
  &[data-state='rerun'],
  &[data-state='paused'] {
    color: ${colors.G400};
    animation: ${fadeIn} 0.25s ease-in;
  }
  &[data-state='halted'],
  &[data-state='stopped'] {
    color: ${colors.Y400};
    animation: ${fadeIn} 0.25s ease-in;
  }
  &[data-state='redeploy'] {
    color: ${colors.G400};
    svg {
      overflow: visible;
    }
  }
  &[data-state='failed_redeploy'] {
    color: ${colors.R400};
    svg {
      overflow: visible;
    }
  }
  &[data-state='building'] {
    color: ${colors.B300};
    svg {
      animation: fadein 0.25s ease-in, ${spin} 2.5s infinite ease-in-out;
    }
  }
  &[data-state='complete'] {
    svg {
      width: 16px;
      height: 16px;
      margin: 0 5px;
    }
  }
  &[data-state='default'] {
    svg {
      width: 14px;
      height: 14px;
      padding: 1px;
      margin: 0 5px;
    }
  }
`;
