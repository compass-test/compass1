import React from 'react';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import ButtonGroup from '@atlaskit/button/button-group';

export const getInlineCommentId = (uuid?: string) => `inline-comment-${uuid}`;

const avatarImg = `data:image/jpeg;base64,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`;

export function CommentFrame(props: {
  children?: any;
  footerButtons?: any[];
  headerButtons?: any[];
}) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100px',
        width: '260px',
        overflow: 'hidden',
        margin: '8px',
        padding: '8px',
        boxSizing: 'border-box',
        border: '1px solid #e2e2e2',
      }}
    >
      <div style={{ display: 'flex' }}>
        <AvatarItem
          avatar={<Avatar src={avatarImg} presence="online" />}
          key={'fry@planetexpress.com'}
          primaryText={'Phillip J. Fry'}
          secondaryText={'fry@planetexpress.com'}
        />
        <ButtonGroup>{props.headerButtons}</ButtonGroup>
      </div>
      <div style={{ padding: '4px' }}>{props.children}</div>
      <div style={{ padding: '4px' }}>
        <ButtonGroup>{props.footerButtons}</ButtonGroup>
      </div>
    </div>
  );
}

export const createComment = (id: string, content: string) => {
  window.localStorage.setItem(id, content);
};

export const fetchComment = (id: string): string => {
  return window.localStorage.getItem(id) || `Comment text for annotation ${id}`;
};

export const deleteComment = (id: string) => {
  window.localStorage.removeItem(id);
};
