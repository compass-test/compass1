import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { gridSize } from '@atlaskit/theme/constants';

interface Props {
  label: string;
  isCollapsed?: boolean;
}

const SMALL_SIZE = `${gridSize() * 2}px`;
const MEDIUM_SIZE = `${gridSize() * 3}px`;

export const PlanIcon: React.FunctionComponent<Props & InjectedIntlProps> = ({
  label,
  isCollapsed,
}) => {
  // Wrapping span below is to avoid issue with image not sized properly for post-query images loaded later
  return (
    <span aria-label={label}>
      <svg
        height={isCollapsed ? MEDIUM_SIZE : SMALL_SIZE}
        width={isCollapsed ? MEDIUM_SIZE : SMALL_SIZE}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#42526E"
          d="M10 8a1 1 0 000 2h4a1 1 0 100-2h-4zM10 12a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM10 14a1 1 0 100 2h2a1 1 0 100-2h-2z"
        />
        <path
          fill="#42526E"
          fillRule="evenodd"
          d="M8 4a2 2 0 012-2h4a2 2 0 012 2h1a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h1zm6 3a2 2 0 001.732-1H17v12H7V6h1.268A2 2 0 0010 7h4zm0-3h-4v1h4V4z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
};

export default injectIntl(PlanIcon);
