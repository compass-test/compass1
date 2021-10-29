import React, { useEffect, useMemo, useState } from 'react';

import Avatar from '@atlaskit/avatar';
import OpenIcon from '@atlaskit/icon/glyph/open';

import { HelpPointerTag } from '../../types';

import HelpPointerActions from './actions';
import BorderlessContent from './borderless-inline-content';
import DefaultContent from './default-content';
import HighlightedContent from './highlighted-content';
import { HEADING_FONT_WEIGHT } from './highlighted-content/styled';
import {
  BorderlessWrapper,
  DefaultLinkTooltip,
  DefaultWrapper,
} from './styled';
import HelpPointerTagComponent from './tag';
import { HelpPointerAppearance, HelpPointerCardProps } from './types';
import { resolveLinkInputToAbsoluteUrl } from './utils';

const HelpPointerCard = (props: HelpPointerCardProps) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cachedSearchTerms, setCachedSearchTerms] = useState<string[]>([]);
  const [cachedMatchingTags, setCachedMatchingTags] = useState<
    HelpPointerTag[]
  >([]);

  const {
    testId,
    icon,
    emojiIcon,
    link,
    name,
    description,
    owner,
    showOwner,
    editable,
    tags,
    tagClickCallback,
    linkClickCallback,
    renderEditModal,
    renderRemoveModal,
    searchTerms,
    appearance = HelpPointerAppearance.default,
    type,
  } = props;

  const compareStringArrays = (a1: string[], a2: string[]) =>
    a1.sort().toString() === a2.sort().toString();

  useEffect(() => {
    setCachedSearchTerms((previousSearchTerms) => {
      const newSearchTerms = [
        ...new Set(
          (searchTerms?.query || '')
            .toLocaleLowerCase()
            .split(' ')
            .filter((term) => term.length > 1),
        ),
      ].slice(0, 5);

      if (!compareStringArrays(newSearchTerms, previousSearchTerms)) {
        return newSearchTerms;
      }
      return previousSearchTerms;
    });
  }, [searchTerms?.query]);

  useEffect(() => {
    setCachedMatchingTags((previousSearchTags) => {
      const newMatchingTags =
        tags?.filter((tag) =>
          searchTerms?.tags
            ?.map((searchTag) => searchTag.name)
            .includes(tag.name),
        ) || [];

      if (
        !compareStringArrays(
          newMatchingTags.map((tag) => tag.uuid),
          previousSearchTags.map((tag) => tag.uuid),
        )
      ) {
        return newMatchingTags;
      }
      return previousSearchTags;
    });
  }, [searchTerms?.tags, tags]);

  const highlightedDescription = useMemo(
    () => (
      <HighlightedContent
        key={'description'}
        searchTerms={cachedSearchTerms}
        content={description || ''}
      />
    ),
    [cachedSearchTerms, description],
  );
  const highlightedName = useMemo(
    () => (
      <HighlightedContent
        key={'name'}
        searchTerms={cachedSearchTerms}
        content={name || ''}
        fontWeight={HEADING_FONT_WEIGHT}
      />
    ),
    [cachedSearchTerms, name],
  );

  const renderHelpPointerActions = useMemo(
    () => (
      <HelpPointerActions
        testId={testId}
        onEdit={renderEditModal && (() => setIsEditModalOpen(true))}
        onRemove={renderRemoveModal && (() => setIsRemoveModalOpen(true))}
      />
    ),
    [testId, renderEditModal, renderRemoveModal],
  );

  const Wrapper =
    appearance === HelpPointerAppearance.borderlessInline
      ? BorderlessWrapper
      : DefaultWrapper;
  const Content =
    appearance === HelpPointerAppearance.borderlessInline
      ? BorderlessContent
      : DefaultContent;

  const matchingTags = useMemo(() => {
    let tagElements =
      cachedMatchingTags
        .map((tag, index) => ({
          name: tag.name,
          highlightedContent: (
            <HighlightedContent
              key={index}
              searchTerms={cachedSearchTerms}
              content={'#' + tag.name}
            />
          ),
        }))
        .map((tagProps, index) => (
          <HelpPointerTagComponent
            {...tagProps}
            key={index}
            tagClickCallback={tagClickCallback}
          />
        )) || [];

    if (showOwner && owner) {
      tagElements.unshift(
        <HelpPointerTagComponent
          key={'team-tag'}
          name={owner.displayName}
          highlightedContent={
            <HighlightedContent
              searchTerms={cachedSearchTerms}
              content={owner.displayName}
            />
          }
          color="greyLight"
          elemBefore={<Avatar size="xsmall" src={owner.avatarUrl} />}
          tagClickCallback={tagClickCallback}
        />,
      );
    }

    return tagElements;
  }, [
    cachedMatchingTags,
    cachedSearchTerms,
    owner,
    showOwner,
    tagClickCallback,
  ]);

  return (
    <>
      <Wrapper
        data-testid={testId}
        href={resolveLinkInputToAbsoluteUrl(link)}
        target={'_blank'}
        onClick={() =>
          linkClickCallback &&
          linkClickCallback({
            titleLength: name?.length || 0,
            descriptionLength: description?.length || 0,
            type: type.valueOf(),
            numTagsMatchingSearch: matchingTags?.length,
            totalTags: tags?.length || 0,
            teamId: owner?.id,
          })
        }
      >
        <Content
          editable={editable}
          name={name}
          description={description}
          highlightedName={highlightedName}
          highlightedDescription={highlightedDescription}
          icon={icon}
          emojiIcon={emojiIcon}
          owner={owner}
          showOwner={showOwner}
          helpPointerActions={renderHelpPointerActions}
          matchingTags={matchingTags}
        />
        {appearance === HelpPointerAppearance.default && (
          <DefaultLinkTooltip className="link-tooltip">
            <OpenIcon label="linkTooltip" />
            {link}
          </DefaultLinkTooltip>
        )}
      </Wrapper>
      {renderEditModal &&
        isEditModalOpen &&
        renderEditModal({
          close: () => setIsEditModalOpen(false),
          target: props,
        })}
      {renderRemoveModal &&
        isRemoveModalOpen &&
        renderRemoveModal({
          close: () => setIsRemoveModalOpen(false),
          target: props,
        })}
    </>
  );
};

export default HelpPointerCard;
