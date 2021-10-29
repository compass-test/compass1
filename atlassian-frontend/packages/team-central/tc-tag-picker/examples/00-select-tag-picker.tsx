import React, { useState } from 'react';

import styled from '@emotion/styled';

import { SelectTagPicker, TagSelectOption } from '../src';

import { groupedTagList, tagList } from './test-data';

const defaultTagList: TagSelectOption[] = [tagList[0]];

const Wrapper = styled.div`
  width: calc(100% - 16px);
  padding: 8px;
`;

const Section = styled.section`
  margin-bottom: 16px;
`;

const SectionHeading = styled.h4`
  margin-bottom: 4px;
`;

export default function SelectTagPickerExample() {
  const [tags, setTags] = useState<readonly TagSelectOption[]>(defaultTagList);
  const [groupedTags, setGroupedTags] = useState<readonly TagSelectOption[]>(
    defaultTagList,
  );
  return (
    <Wrapper>
      <Section>
        <SectionHeading>Basic example</SectionHeading>
        <SelectTagPicker
          testId="tc-tag-picker"
          placeholder="Add #tags to help teams search for article"
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
              tagList.filter(tagOption =>
                tagOption.label
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()),
              ),
            );
          }}
          setTags={setTags}
        />
      </Section>
      <Section>
        <SectionHeading>Grouped example</SectionHeading>
        <SelectTagPicker
          testId="tc-tag-picker-2"
          placeholder="Add #tags to help teams search for article"
          tags={groupedTags}
          createTag={inputValue => {
            const option = {
              label: inputValue,
              value: inputValue,
            };
            setGroupedTags(tags => [...tags, option]);
            return Promise.resolve(option);
          }}
          queryTagList={inputValue => {
            return Promise.resolve(
              groupedTagList.filter(tagOption =>
                tagOption.label
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()),
              ),
            );
          }}
          setTags={setGroupedTags}
        />
      </Section>
    </Wrapper>
  );
}
