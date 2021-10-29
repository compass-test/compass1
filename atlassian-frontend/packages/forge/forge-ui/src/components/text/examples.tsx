import React from 'react';
import { TextPlain, TextMarkup } from './';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

const threeParagraphs = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut pharetra metus, quis convallis tellus. Sed fringilla dolor eu risus tincidunt faucibus. Nunc elementum velit at sem sagittis porta faucibus nec odio. Etiam aliquet libero vestibulum lorem vehicula, et condimentum justo eleifend. Mauris vehicula, enim in rutrum tincidunt, risus sem bibendum libero, sit amet ultricies nulla metus eget diam. Vivamus ultricies sem id magna facilisis maximus. Phasellus ipsum libero, condimentum sed dapibus id, dapibus sit amet ligula. Proin tempor dui velit, fermentum porta leo tempus non. Aliquam sit amet mollis risus.

In vitae pharetra metus, quis placerat orci. Aliquam erat volutpat. Etiam quis molestie neque, non tristique risus. Curabitur elementum tellus a erat elementum mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur eget odio ac felis molestie cursus in vel neque. Vivamus non aliquam leo. Praesent sed tincidunt turpis.

Donec non dignissim sapien, in auctor risus. Integer at dignissim nisl. Pellentesque ultrices in urna non consequat. Etiam tincidunt dignissim lectus, in maximus metus mattis vitae. Aenean at lacinia metus. Nunc pretium tellus sed condimentum convallis. Sed pellentesque auctor nisi, eget cursus turpis faucibus blandit. In sagittis lectus neque, et malesuada dui commodo sed. Vestibulum interdum interdum vestibulum. Curabitur quis tellus nec nisl facilisis malesuada. Sed augue erat, placerat ut nibh ac, venenatis porta augue. Fusce sapien turpis, sollicitudin sed eleifend ut, imperdiet eget lectus. Maecenas a varius libero. Sed suscipit porttitor mollis.`;

export const plainText = () => <TextPlain content="Hello world!" />;
export const paragraphsOfPlainText = () => (
  <TextPlain content={threeParagraphs} />
);

export function InTextMarkup() {
  return <TextMarkup>Hello world!</TextMarkup>;
}

export const withAlignment = () => {
  return (
    <>
      <TextMarkup align="start">Hello world!</TextMarkup>
      <TextMarkup align="center">Hello world!</TextMarkup>
      <TextMarkup align="end">Hello world!</TextMarkup>
    </>
  );
};
