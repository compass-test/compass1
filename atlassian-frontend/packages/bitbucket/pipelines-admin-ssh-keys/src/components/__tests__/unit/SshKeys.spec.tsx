import React from 'react';

import { mount } from 'enzyme';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { KeyPair } from '@atlassian/pipelines-models';

import AddKey from '../../AddKey';
import SplashScreen from '../../SplashScreen';
import SshKeys from '../../SshKeys';
import ViewKey from '../../ViewKey';

describe('SshKeys component', () => {
  const defaultProps = {
    keyPair: new KeyPair(),
    createKeyPair: () => {},
    deleteKeyPair: () => {},
    generateKeyPair: () => {},
    isFetchingKeyPair: false,
  };

  it('should render spinner when keys are loading', () => {
    const component = mount(
      <SshKeys {...{ ...defaultProps, isFetchingKeyPair: true }} />,
    );
    expect(component.find(Spinner)).toHaveLength(1);
  });

  it('should render Splash Screen when public key is not set', () => {
    const component = mount(<SshKeys {...{ ...defaultProps }} />);
    expect(component.find(SplashScreen)).toHaveLength(1);
  });

  it('should render Add Key form', () => {
    const component = mount(<SshKeys {...{ ...defaultProps }} />);
    component
      .find(Button)
      .filterWhere((b) => b.text() === 'Use my own keys')
      .simulate('click');
    expect(component.find(AddKey)).toHaveLength(1);
  });

  it('should render View Key form when public key is set', () => {
    const keyPair = new KeyPair({ public_key: 'foo' });
    const component = mount(<SshKeys {...{ ...defaultProps, keyPair }} />);
    expect(component.find(ViewKey)).toHaveLength(1);
  });
});
