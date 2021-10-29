/** @jsx jsx */
import AkLozenge from '@atlaskit/lozenge';
import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { SpacePickerOption } from './types';

export const Option: FC<SpacePickerOption> = (props) => {
  const { name, iconUrl, containsExternalCollaborators } = props;
  return (
    <div
      css={css`
        align-items: center;
        justify-content: flex-start;
        display: flex;
        flex-direction: row;
        line-height: 1.2;
        padding: 2px;
      `}
    >
      <SpaceIcon iconUrl={iconUrl} />
      <SpaceName>{name}</SpaceName>
      {containsExternalCollaborators ? <ExternalCollaboratorsLozenge /> : null}
    </div>
  );
};

const SpaceIcon: FC<{ iconUrl: string }> = (props) => {
  const { iconUrl } = props;
  return (
    <div
      css={css`
        display: flex;
        flex: 0 1 auto;
        margin-right: 9px;
        margin-left: 6px;
        opacity: 1;
      `}
    >
      <img
        src={iconUrl}
        css={css`
          width: 18px;
          height: 18px;
        `}
      />
    </div>
  );
};

const SpaceName: FC = ({ children }) => (
  <div
    css={css`
      display: inline-block;
      opacity: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
  >
    {children}
  </div>
);

const ExternalCollaboratorsLozenge = () => (
  <span
    css={css`
      padding-left: 6px;
    `}
  >
    <AkLozenge appearance="new">
      <FormattedMessage
        id="space-selector.external-lozenge"
        defaultMessage="External"
        description="Text for lozenge appearing in search space selector results next to name of spaces which are open to external collaborators"
      />
    </AkLozenge>
  </span>
);
