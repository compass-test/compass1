import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import noop from 'lodash/noop';
import {
  AnalyticsSource,
  ScreenTypes,
  connectUIAnalytics,
  ComponentWithAnalytics,
} from '../../common/analytics/util';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import messages from './messages';
import { Props, State } from './types';
import { Button } from './styled';
const DropdownMenuWithAnalytics = ComponentWithAnalytics('moreMenu', {
  onOpenChange: 'openChange',
})(DropdownMenu);

const DropdownItemWithAnalytics = ComponentWithAnalytics('dropdownItem', {
  onClick: 'clicked',
})(DropdownItem);

class MoreMenu extends Component<Props, State> {
  static defaultProps = {
    triggerConnectToSpace: noop,
  };

  state = {
    isOpen: false,
  };

  updateIsOpen = ({ isOpen }: any, analyticsEvent: UIAnalyticsEvent) => {
    const { isOpen: prevIsOpen } = this.state;
    const { onOpenChange } = this.props;
    if (prevIsOpen !== isOpen) {
      this.setState({ isOpen });
      onOpenChange(isOpen, analyticsEvent);
    }
  };

  handleClick = (_: any, analyticsEvent: UIAnalyticsEvent) => {
    const {
      triggerConnectToSpace,
      onDropdownItemClick,
      isSpaceConnected,
    } = this.props;
    triggerConnectToSpace();
    onDropdownItemClick(isSpaceConnected, analyticsEvent);
  };

  createTriggerButton() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { isOpen: isSelected } = this.state;

    const icon = <MoreIcon label={formatMessage(messages.label)} />;
    return <Button iconBefore={icon} isSelected={isSelected} />;
  }

  render() {
    const {
      isSpaceConnected,
      intl: { formatMessage },
    } = this.props;
    const triggerButton = this.createTriggerButton();

    const labelConnectedSpace = formatMessage(
      messages.menuConnectDifferentSpace,
    );

    const label = formatMessage(messages.menuConnectSpace);

    const content = (
      <DropdownMenuWithAnalytics
        position="bottom right"
        trigger={triggerButton}
        onOpenChange={this.updateIsOpen}
      >
        <DropdownItemGroup>
          <DropdownItemWithAnalytics onClick={this.handleClick}>
            {isSpaceConnected ? labelConnectedSpace : label}
          </DropdownItemWithAnalytics>
        </DropdownItemGroup>
      </DropdownMenuWithAnalytics>
    );
    return content;
  }
}

export default AnalyticsSource(
  'moreMenu',
  ScreenTypes.DROPDOWN,
)(
  connectUIAnalytics({
    onOpenChange: (isOpened: any) => ({ name: 'dropdown', isOpened }),
    onDropdownItemClick: (isSpaceConnected: any) => ({
      name: 'connectSpace',
      isSpaceConnected,
    }),
  })(injectIntl(MoreMenu)),
);
