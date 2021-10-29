import React from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import { Popup } from '@atlaskit/editor-common';
import {
  Editor,
  InlineCommentCreateComponentProps,
  EditorContext,
} from '@atlaskit/editor-core';
import { CommentFrame, getInlineCommentId, createComment } from './frame';
import { storyMediaProviderFactory } from '../media-provider';
import { EditorView } from 'prosemirror-view';
import { toJSON } from '@atlaskit/editor-core/src/utils';

type CreateComponentState = {
  commentingValue: string;
};

const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: false,
});

export class ExampleCreateInlineCommentComponent extends React.Component<
  InlineCommentCreateComponentProps,
  CreateComponentState
> {
  state = {
    commentingValue: '',
  };

  createComment = () => {
    const id = getInlineCommentId('id');
    createComment(id, this.state.commentingValue);
    this.props.onCreate(id);
  };

  cancelComment = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  onChange = (editorView: EditorView) => {
    const commentingValue = JSON.stringify(
      toJSON(editorView.state.doc),
      null,
      2,
    );
    this.setState({ commentingValue });
  };

  render() {
    const { dom } = this.props;

    if (!dom) {
      return null;
    }

    const createCommentButton = (
      <Button
        key="save"
        appearance="primary"
        onClick={this.createComment}
        testId="ak-editor-annotation-dummy-save-button"
      >
        Save
      </Button>
    );

    const cancelCommentButton = (
      <Button key="cancel" appearance="subtle" onClick={this.cancelComment}>
        Cancel
      </Button>
    );

    const domOffset = [
      dom ? -(window.innerWidth - dom.getBoundingClientRect().right - 50) : 0,
      20,
    ];

    return (
      <Popup
        target={dom}
        alignY="bottom"
        fitHeight={200}
        fitWidth={200}
        alignX="right"
        offset={domOffset}
      >
        <CommentFrame
          footerButtons={[createCommentButton, cancelCommentButton]}
        >
          <EditorContext>
            <Editor
              appearance="chromeless"
              media={{ provider: mediaProvider }}
              onChange={this.onChange}
            />
          </EditorContext>
        </CommentFrame>
      </Popup>
    );
  }
}
