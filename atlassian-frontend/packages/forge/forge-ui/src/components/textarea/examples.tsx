import React from 'react';
import TextArea from './';

export const basic = () => (
  <>
    <TextArea label="Message" name="message" defaultValue="initial value" />
    <TextArea
      label="Message with placeholder"
      name="message-with-placeholder"
      placeholder="enter message to send"
      isRequired
    />
  </>
);
