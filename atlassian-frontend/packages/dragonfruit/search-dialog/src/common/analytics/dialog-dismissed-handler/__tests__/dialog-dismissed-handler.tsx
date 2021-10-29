import React from 'react';
import { shallow } from 'enzyme';
import { DialogDismissedHandlerComponent as DialogDismissedHandler } from '../dialog-dismissed-handler';

describe('DialogDismissedHandler', () => {
  const onDialogClosed = jest.fn();

  const commonProps = {
    isExpanded: false,
    onDialogClosed,
  };

  beforeEach(() => {
    onDialogClosed.mockReset();
  });

  it('should not fire analytics on mount', () => {
    shallow(<DialogDismissedHandler {...commonProps} />);

    expect(onDialogClosed).not.toHaveBeenCalled();
  });

  it('should fire analytics when closed', () => {
    const wrapper = shallow(
      <DialogDismissedHandler {...commonProps} isExpanded />,
    );

    wrapper.setProps({
      isExpanded: false,
    });

    expect(onDialogClosed).toHaveBeenCalled();
  });

  it('should not fire analytics when opened', () => {
    const wrapper = shallow(<DialogDismissedHandler {...commonProps} />);

    wrapper.setProps({
      isExpanded: true,
    });

    expect(onDialogClosed).not.toHaveBeenCalled();
  });
});
