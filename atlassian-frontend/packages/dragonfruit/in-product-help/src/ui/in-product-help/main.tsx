import React, { useState } from 'react';

import algoliasearch from 'algoliasearch';

import Help, { ARTICLE_TYPE, articleId, RelatedArticles } from '@atlaskit/help';
import { RightSidePanel } from '@atlaskit/right-side-panel';
import { DisplayFeedback } from '@atlassian/dragonfruit-components';

import { useHelp } from '../../controllers/help-context-controller';

import { HelpFooter } from './footer';
import { HelpButton } from './help-button';
import { HomeOptions } from './menu-options';
import { ContentWrapper } from './styled';

type HelpMenuContentProps = {
  onCloseButtonClick: () => void;
};

const PRODUCT_NAME = 'Compass';

const SEARCH_EXTERNAL_URL = 'https://developer.atlassian.com/cloud/compass/';

const HelpMenuContent = (props: HelpMenuContentProps) => {
  // Initializing search solution used by in-product help
  // These are our index keys for algolia, which allow us to search in Atlassian specifically
  const client = algoliasearch(
    '8K6J5OJIQW',
    'c982b4b1a6ca921131d35edb63359b8c',
  );
  const index = client.initIndex('product_help_prod');
  // routeGroup and routeName are used to display relevant articles based on where the user is in the app.
  // Compass currently does not have this set up but these parameters are required to get the initial list of articles to appear
  const algoliaParameters = {
    routeGroup: '',
    routeName: '',
    PRODUCT_NAME,
  };

  const { onCloseButtonClick } = props;

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const [{ articleId }, { setArticleId }] = useHelp();

  const onGetHelpArticle = async (articleId: articleId): Promise<any> => {
    return new Promise((resolve, reject) => {
      index.search(
        {
          filters: `objectID:${articleId.id}`,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }

          if (res) {
            const article = res.hits[0];

            if (article) {
              resolve(article);
            } else {
              reject(`not found`);
            }
          } else {
            reject(`No internet connection`);
          }
        },
      );
    });
  };

  const getRelatedArticle = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const facetFilters = [
        `productName:${PRODUCT_NAME}`,
        'routes.routeGroup:-hide',
        'routes.routeName:-hide',
      ];
      index.search(
        {
          // @ts-ignore
          facetFilters,
        },
        (err: any, res: any) => {
          if (err) {
            reject(err);
          }
          resolve(res.hits);
        },
      );
    });
  };

  const onSearch = async (query: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      index
        .search({ query, filters: `productName:${PRODUCT_NAME}` })
        .then(result => {
          resolve(result.hits);
        })
        .catch(function (error) {
          reject(error.message);
        });
    });
  };

  const articleIdSetter = (articleId: articleId): void => {
    setArticleId(articleId.id);
  };

  const handleOnCloseButtonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    onCloseButtonClick();
  };

  return (
    <div data-testid={articleId}>
      <RightSidePanel isOpen={true} attachPanelTo="help-panel">
        <ContentWrapper>
          <Help
            helpArticle={{
              onGetHelpArticle,
            }}
            navigation={{
              articleId: {
                id: articleId || '',
                type: ARTICLE_TYPE.HELP_ARTICLE,
              },
              articleIdSetter,
            }}
            search={{
              onSearch,
              searchExternalUrl: SEARCH_EXTERNAL_URL,
            }}
            relatedArticles={{
              routeGroup: algoliaParameters.routeGroup,
              routeName: algoliaParameters.routeName,
              onGetRelatedArticles: getRelatedArticle,
            }}
            header={{
              onCloseButtonClick: handleOnCloseButtonClick,
            }}
            home={{
              homeOptions: HomeOptions({
                openFeedbackModal: () => setIsFeedbackModalOpen(true),
              }),
            }}
            footer={<HelpFooter />}
          >
            <RelatedArticles
              onRelatedArticlesListItemClick={(event, analytics, article) => {
                articleIdSetter({
                  id: article.id || '',
                  type: ARTICLE_TYPE.HELP_ARTICLE,
                });
              }}
              onGetRelatedArticles={getRelatedArticle}
              routeGroup={algoliaParameters.routeGroup}
              routeName={algoliaParameters.routeName}
            />
          </Help>
        </ContentWrapper>
      </RightSidePanel>
      {isFeedbackModalOpen && (
        <DisplayFeedback onClose={() => setIsFeedbackModalOpen(false)} />
      )}
    </div>
  );
};

export const HelpMenu = () => {
  const [{ isHelpOpen: isOpen }, { toggleHelp }] = useHelp();

  return (
    <>
      <HelpButton testId="dragonfruit.help.navbar-help-icon" />
      {isOpen && <HelpMenuContent onCloseButtonClick={toggleHelp} />}
    </>
  );
};
