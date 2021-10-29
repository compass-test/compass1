import styled from 'styled-components';
import { N20 } from '@atlaskit/theme/colors';
import { getIconSize } from './utils';

interface TemplateIconProps {
  backgroundColor?: string;
  size: 'small' | 'medium';
}

// we can't just use Avatar since that takes an icon URL
export const TemplateIcon = styled.div<TemplateIconProps>`
  box-sizing: border-box;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${(props) => getIconSize(props.size)}px;
  min-width: ${(props) => getIconSize(props.size)}px;
  border-radius: 4px;
  text-align: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : N20};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

// wrapper that consume all available viewport height and negates the 40px side padding
export const ProjectPagesImprovementWrapper = styled.div`
  display: flex;
  position: relative;
  height: calc(
    100vh - 56px
  ); /* at least consume the whole height minus top nav */
  margin: 0 -40px; /* consume the page container padding */
`;

// create a div that fills available space except leave margin for the sidebar
export const MainContainer = styled.div`
  margin-right: 320px; /* width of the sidebar */
  height: 100%;
  flex: 1 1 auto;
  overflow-x: auto;
`;

// create a div that scrolls on overflow
export const MainContent = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0 40px;
`;
