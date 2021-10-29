import React, { PropsWithChildren } from 'react';

import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';
import { N500 } from '@atlaskit/theme/colors';

import { IconPositionWrapper, Link, Wrapper } from './styled';

type Props = PropsWithChildren<{
  onClick: () => void;
  actionLabel: string;
  icon?: React.ReactNode;
  testId?: string;
}>;

export const ContentSectionEmptyState: React.FC<Props> = (props: Props) => {
  const { onClick, actionLabel, icon, testId, children } = props;
  return (
    <Wrapper onClick={onClick} aria-label={actionLabel} data-testid={testId}>
      <IconPositionWrapper>
        {icon ? (
          icon
        ) : (
          <EditorAddIcon label="" size="small" primaryColor={N500} />
        )}
      </IconPositionWrapper>
      <Link>{children}</Link>
    </Wrapper>
  );
};
