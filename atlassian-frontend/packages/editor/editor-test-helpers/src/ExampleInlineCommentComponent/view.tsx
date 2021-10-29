import React from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import { Popup } from '@atlaskit/editor-common';
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { InlineCommentViewComponentProps } from '@atlaskit/editor-core';
import { AnnotationTypes } from '@atlaskit/adf-schema';
import { CommentFrame, deleteComment, fetchComment } from './frame';

export class ExampleViewInlineCommentComponent extends React.Component<
  InlineCommentViewComponentProps
> {
  onDelete = (id: string) => () => {
    deleteComment(id);
    if (this.props.onDelete) {
      this.props.onDelete(id);
    }
  };

  onResolve = (id: string) => () => {
    this.props.onResolve(id);
  };

  onClose = () => () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { dom, annotations } = this.props;

    const comments = annotations.filter(
      (annotation) => annotation.type === AnnotationTypes.INLINE_COMMENT,
    );

    if (!dom || comments.length === 0) {
      return null;
    }

    const ResolveComment = (id: string) => (
      <Button key="resolve" appearance="primary" onClick={this.onResolve(id)}>
        Resolve
      </Button>
    );

    const DeleteComment = (id: string) => (
      <Button
        key="remove"
        appearance="subtle"
        onClick={this.onDelete(id)}
        iconBefore={<EditorRemoveIcon label="remove comment" />}
      />
    );

    const CloseComment = () => (
      <Button
        key="close"
        testId="ak-editor-annotation-dummy-close-button"
        appearance="subtle"
        onClick={this.onClose()}
        iconBefore={<EditorCloseIcon label="close comment" />}
      />
    );

    return (
      <Popup
        target={dom}
        alignY="bottom"
        fitHeight={200}
        fitWidth={200}
        alignX={'right'}
        offset={[
          dom
            ? -(window.innerWidth - dom.getBoundingClientRect().right - 50)
            : 0,
          20,
        ]}
      >
        {comments.map((comment) => (
          <CommentFrame
            headerButtons={[CloseComment()]}
            footerButtons={[
              ResolveComment(comment.id),
              DeleteComment(comment.id),
            ]}
            key={comment.id}
          >
            {fetchComment(comment.id)}
          </CommentFrame>
        ))}
      </Popup>
    );
  }
}
