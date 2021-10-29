import React from 'react';

import { action } from '@storybook/addon-actions';

import AvatarContentAction, {
  ContentTypeDecorator,
  LinkWrapper,
  TextOverflowWrapper,
} from './index';

const placeholder = 'http://placehold.it/24x24';

const AVATAR = (
  <img src={placeholder} style={{ width: '24px', height: '24px' }} />
);

export const AvatarContentActionExample = () => (
  <div style={{ width: '200px' }}>
    <AvatarContentAction avatar={AVATAR}>With avatar</AvatarContentAction>
    <AvatarContentAction
      avatar={AVATAR}
      action={<a onClick={action('Clicked')}>Action</a>}
    >
      With action
    </AvatarContentAction>
    <AvatarContentAction avatar={AVATAR}>
      With veryyyy longggg contentttt
    </AvatarContentAction>
    <AvatarContentAction avatar={AVATAR}>
      <TextOverflowWrapper>
        With veryyyy longggg contentttt overflow hidden
      </TextOverflowWrapper>
    </AvatarContentAction>
    <AvatarContentAction
      avatar={AVATAR}
      action={<a onClick={action('Clicked')}>Action</a>}
    >
      <TextOverflowWrapper>
        With action and veryyyy longggg contentttt overflow hidden
      </TextOverflowWrapper>
    </AvatarContentAction>
    <AvatarContentAction avatar={AVATAR}>
      <LinkWrapper onClick={action('Clicked')}>With link wrapper</LinkWrapper>
    </AvatarContentAction>
    <AvatarContentAction avatar={AVATAR}>
      <TextOverflowWrapper>
        <LinkWrapper onClick={action('Clicked')}>
          With veryyyy longggg link wrapper overflow hidden
        </LinkWrapper>
      </TextOverflowWrapper>
    </AvatarContentAction>
    <AvatarContentAction avatar={AVATAR}>
      <ContentTypeDecorator type={'Type'}>
        <TextOverflowWrapper>
          <LinkWrapper>Content</LinkWrapper>
        </TextOverflowWrapper>
      </ContentTypeDecorator>
    </AvatarContentAction>
    <AvatarContentAction avatar={AVATAR}>
      <ContentTypeDecorator type={'Type'}>
        <TextOverflowWrapper>
          <LinkWrapper>Longggg content with a type</LinkWrapper>
        </TextOverflowWrapper>
      </ContentTypeDecorator>
    </AvatarContentAction>
    <AvatarContentAction
      avatar={AVATAR}
      action={<a onClick={action('Clicked')}>Action</a>}
    >
      <ContentTypeDecorator type={'Type'}>
        <TextOverflowWrapper>
          <LinkWrapper>Longggg content with a type</LinkWrapper>
        </TextOverflowWrapper>
      </ContentTypeDecorator>
    </AvatarContentAction>
  </div>
);

AvatarContentActionExample.displayName = 'AvatarContentAction Example';
