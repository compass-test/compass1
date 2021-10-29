import React, { useState } from 'react';

import styled from '@emotion/styled';

import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';
import { N20, N40 } from '@atlaskit/theme/colors';
import { fontSize } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

import { PopupTagPicker, TagSelectOptions } from '../src';
import { HashTag } from '../src/common/ui/hash-tag';

import { groupedTagList, tagList } from './test-data';

const defaultTagList: TagSelectOptions = [
  // @ts-ignore
  groupedTagList[1].options[0],
];

const Wrapper = styled.div`
  width: calc(100% - 16px);
  padding: 8px;
`;

const Section = styled.div`
  padding: 16px;
  background-color: ${token(
    'color.background.subtleBorderedNeutral.resting',
    N20,
  )};
  border: 1px solid ${token('color.border.neutral', N40)};
`;

const H4 = styled.h4`
  font-size: ${fontSize()}px;
  margin-bottom: 16px;
`;

const HeadingSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const PickerAndResults = (props: {
  title: string;
  placement?: any;
  closeMenuOnSelect?: boolean;
  tagList: TagSelectOptions;
}) => {
  const [tags, setTags] = useState<TagSelectOptions>(defaultTagList);

  return (
    <>
      <HeadingSection>
        <H4>{props.title}</H4>
        <PopupTagPicker
          testId="tc-popup-tag-picker"
          closeMenuOnSelect={props.closeMenuOnSelect}
          popperProps={{
            placement: props.placement,
          }}
          target={({ ref }) => {
            return (
              <Button
                appearance="primary"
                ref={ref}
                spacing="compact"
                iconBefore={<AddIcon label="Add topic" size="small" />}
              />
            );
          }}
          tags={tags}
          createTag={inputValue => {
            const option = {
              label: inputValue,
              value: inputValue,
            };
            setTags(tags => [...tags, option]);
            return Promise.resolve(option);
          }}
          queryTagList={inputValue => {
            return Promise.resolve(
              props.tagList.filter(tagOption => {
                // @ts-ignore
                if (tagOption.options) {
                  // @ts-ignore
                  return tagOption.options.filter(to => {
                    return to.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase());
                  });
                } else {
                  return tagOption.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase());
                }
              }),
            );
          }}
          setTags={setTags}
        />
      </HeadingSection>
      {tags.map(tag => {
        return (
          <HashTag
            label={tag.label}
            isRemovable
            onBeforeRemoveAction={() => {
              setTags(tags => {
                const idx = tags.findIndex(tg => tg.label === tag.label);
                const clonedArray = [...tags];
                clonedArray.splice(idx, 1);
                return clonedArray;
              });
              return false;
            }}
          />
        );
      })}
    </>
  );
};

export default function PopupTagPickerExample() {
  return (
    <Wrapper>
      <Section>
        <PickerAndResults
          title="Grouped Topics (position: bottom-end, close on select: false)"
          tagList={groupedTagList}
          placement="bottom-end"
          closeMenuOnSelect={false}
        />
      </Section>

      <Section style={{ marginTop: 300 }}>
        <PickerAndResults
          title="Topics (position: top-end)"
          tagList={tagList}
          placement="top-end"
        />
      </Section>
    </Wrapper>
  );
}
