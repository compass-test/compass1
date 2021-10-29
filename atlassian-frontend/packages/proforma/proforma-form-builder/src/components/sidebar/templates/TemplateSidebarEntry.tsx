import React, { FC } from 'react';

// TODO: Work out what to do with template icons:
// "@fortawesome/fontawesome-svg-core": "^1.2.32",
// "@fortawesome/free-brands-svg-icons": "^5.15.1",
// "@fortawesome/pro-solid-svg-icons": "^5.15.1",
// "@fortawesome/react-fontawesome": "^0.1.11",

// import {
//   findIconDefinition,
//   IconDefinition,
//   IconLookup,
//   IconName,
//   library,
// } from '@fortawesome/fontawesome-svg-core';
// import {
//   faAtlassian,
//   faBitbucket,
//   faConfluence,
//   faJira,
// } from '@fortawesome/free-brands-svg-icons';
// import { fas } from '@fortawesome/pro-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Lozenge from '@atlaskit/lozenge';
import { ButtonItem, Section } from '@atlaskit/menu';

import { GroupedFormsIndex } from '../../helpers/templateHelpers';

import {
  IntlTemplateSidebarMessages,
  TemplateSidebarMessage,
} from './TemplateSidebarMessages.intl';

// library.add(fas, faAtlassian, faJira, faConfluence, faBitbucket);

interface TemplateSidebarEntryProps {
  subGroup: GroupedFormsIndex;
  onClick: (fileName: string) => void;
}

// const defaultIcon = {
//   faKey: 'file',
//   fgColor: 'white',
//   bgColor: '#172b4d',
// };
//
// const defaultIconLookup: IconLookup = {
//   prefix: 'fas',
//   iconName: defaultIcon.faKey as IconName,
// };
//
// const getIcon = (iconName?: string): IconDefinition => {
//   let iconLookup: IconLookup = {
//     prefix: 'fas',
//     iconName: iconName as IconName,
//   };
//   let iconDefinition: IconDefinition | undefined;
//   if (iconName) {
//     // search in solid icons
//     iconDefinition = findIconDefinition(iconLookup);
//     if (iconDefinition) {
//       return iconDefinition;
//     }
//
//     // search in brand icons
//     iconLookup.prefix = 'fab';
//     iconDefinition = findIconDefinition(iconLookup);
//     if (iconDefinition) {
//       return iconDefinition;
//     }
//   }
//
//   // fallback to default icon
//   iconLookup = defaultIconLookup;
//   iconDefinition = findIconDefinition(iconLookup);
//   return iconDefinition;
// };

export const TemplateSidebarEntry: FC<TemplateSidebarEntryProps> = ({
  subGroup,
  onClick,
}) => {
  return (
    <>
      <Section title={subGroup.subGroup} hasSeparator>
        {subGroup.description && (
          <DescriptionWrapper>{subGroup.description}</DescriptionWrapper>
        )}
        {subGroup.items.map(template => {
          // const iconDefinition = template.faIcon
          //   ? getIcon(template.faIcon.faKey)
          //   : getIcon();
          return (
            <ButtonItem
              onClick={() => onClick(template.id)}
              // iconBefore={
              //   <FontAwesomeIcon
              //     icon={iconDefinition}
              //     style={{
              //       color:
              //         template.faIcon && template.faIcon.fgColor
              //           ? template.faIcon.fgColor
              //           : defaultIcon.fgColor,
              //       backgroundColor:
              //         template.faIcon && template.faIcon.bgColor
              //           ? template.faIcon.bgColor
              //           : defaultIcon.bgColor,
              //       padding: '8px',
              //       width: '18px',
              //       height: '18px',
              //       borderRadius: '5px',
              //     }}
              //   />
              // }
              iconAfter={
                template.new && (
                  <>
                    <Lozenge appearance="success">
                      <FormattedMessage
                        {...IntlTemplateSidebarMessages[
                          TemplateSidebarMessage.New
                        ]}
                      />
                    </Lozenge>
                    &nbsp;
                  </>
                )
              }
            >
              {template.name}
            </ButtonItem>
          );
        })}
      </Section>
    </>
  );
};

const DescriptionWrapper = styled.div`
  font-size: 12px;
  color: rgb(107, 119, 140);
  padding-left: 20px;
  position: relative;
  top: -8px;
`;
