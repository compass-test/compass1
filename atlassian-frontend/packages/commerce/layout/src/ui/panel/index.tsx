import React, { ComponentProps } from 'react';

import Button from '@atlaskit/button/custom-theme-button';
// eslint-disable-next-line import/no-extraneous-dependencies
import EditIcon from '@atlaskit/icon/glyph/edit';

import type { InsetProps } from '../../common/ui/spacing/inset';

import { EditButtonWrapper, Panel } from './styled';

export { Panel } from './styled';

export type EditablePanelCommonProps = InsetProps & {
  testId?: string;
};

export type EditablePanelNoEditProps = EditablePanelCommonProps & {
  onEdit?: undefined;
  editLabel?: undefined;
};

export type EditablePanelWithEditProps = EditablePanelCommonProps & {
  onEdit?: ComponentProps<typeof Button>['onClick'];
  editLabel: string;
};

export type EditablePanelProps =
  | EditablePanelNoEditProps
  | EditablePanelWithEditProps;

export const EditablePanel: React.FC<EditablePanelProps> = ({
  testId,
  children,
  ...props
}) => {
  return (
    <Panel size={props.size}>
      {props.onEdit !== undefined ? (
        <EditButtonWrapper>
          <Button
            testId={testId}
            appearance="subtle-link"
            onClick={props.onEdit}
            iconBefore={<EditIcon label={props.editLabel} size="medium" />}
          ></Button>
        </EditButtonWrapper>
      ) : null}
      {children}
    </Panel>
  );
};

<EditablePanel />;
