import React from 'react';

import { mount } from 'enzyme';

import Button from '@atlaskit/button';
import { ErrorMessage } from '@atlaskit/form';
import Spinner from '@atlaskit/spinner';
import { KnownHost, PublicKey } from '@atlassian/pipelines-models';

import KnownHosts from '../../KnownHosts';

describe('KnownHosts component', () => {
  const defaultProps = {
    knownHosts: [],
    publicKey: new PublicKey(),
    createKnownHost: jest.fn(),
    deleteKnownHost: jest.fn(),
    getPublicKey: jest.fn(),
    clearPublicKey: jest.fn(),
    isFetchingKnownHosts: false,
    isFetchingPublicKey: false,
  };

  const setFieldValue = (component: any, value: any) => {
    component.find('input[name="hostname"]').instance().value = value;
    component.find('input[name="hostname"]').simulate('change', {
      target: { value },
    });
  };

  it('should not submit form with empty values', () => {
    const createKnownHost = jest.fn();
    const component = mount(
      <KnownHosts {...{ ...defaultProps, createKnownHost }} />,
    );
    component.find('form').simulate('submit');
    expect(createKnownHost).not.toHaveBeenCalled();
  });

  it('should call createKnownHost prop method on add host button click', () => {
    const createKnownHost = jest.fn();
    const component = mount(
      <KnownHosts
        {...{
          ...defaultProps,
          createKnownHost,
          publicKey: new PublicKey({ key: 'foo', md5_fingerprint: 'bar' }),
        }}
      />,
    );
    setFieldValue(component.find('input[name="hostname"]'), 'baz');
    component.find('form').simulate('submit');
    expect(createKnownHost).toHaveBeenCalledWith({
      hostname: 'baz',
      public_key: new PublicKey({ key: 'foo', md5_fingerprint: 'bar' }),
    });
  });

  it('should call getPublicKey prop method on fetch button click', () => {
    const getPublicKey = jest.fn();
    const component = mount(
      <KnownHosts {...{ ...defaultProps, getPublicKey }} />,
    );
    setFieldValue(component.find('input[name="hostname"]'), 'baz');
    component.find('form').simulate('submit');
    expect(getPublicKey).toHaveBeenCalledWith('baz');
  });

  it('should set form as invalid on creating known host error', () => {
    const knownHosts = [new KnownHost({ error: { message: 'foo' } })];
    const component = mount(
      <KnownHosts {...{ ...defaultProps, knownHosts }} />,
    );
    expect(component.find(ErrorMessage).text()).toEqual(
      'Failed to add known host',
    );
  });

  it('should set form as invalid on fetching public key error', () => {
    const publicKey = new PublicKey({ error: { message: 'foo' } });
    const component = mount(<KnownHosts {...{ ...defaultProps, publicKey }} />);
    expect(component.find(ErrorMessage).text()).toEqual(
      'Unable to fetch fingerprints, check host SSH connection and try again',
    );
  });

  it('should render no hosts message', () => {
    const component = mount(<KnownHosts {...{ ...defaultProps }} />);
    expect(component.find('table').text()).toContain(
      'You haven’t added a host yet',
    );
  });

  it('should render spinner when hosts are loading', () => {
    const component = mount(
      <KnownHosts {...{ ...defaultProps, isFetchingKnownHosts: true }} />,
    );
    expect(component.find(Spinner)).toHaveLength(1);
  });

  it('should render hosts list', () => {
    const component = mount(
      <KnownHosts
        {...{
          ...defaultProps,
          knownHosts: [
            new KnownHost({
              hostname: 'foo',
              public_key: new PublicKey({ md5_fingerprint: 'bar' }),
            }),
            new KnownHost({
              hostname: 'baz:22',
              public_key: new PublicKey({ md5_fingerprint: 'bax' }),
            }),
          ],
        }}
      />,
    );

    expect(component.html()).toContain('<td>foo</td><td>bar</td><td></td>');
    expect(component.html()).toContain('<td>baz:22</td><td>bax</td><td></td>');
  });

  it('should call deleteKnownHost prop method on attempt to remove known host', () => {
    const deleteKnownHost = jest.fn();
    const knownHost = new KnownHost({
      uuid: 'foo',
      hostname: 'foo',
      public_key: new PublicKey({ md5_fingerprint: 'bar' }),
    });
    const component = mount(
      <KnownHosts
        {...{ ...defaultProps, deleteKnownHost, knownHosts: [knownHost] }}
      />,
    );
    component.find('table').first().find(Button).simulate('click');
    expect(deleteKnownHost).toHaveBeenCalledWith(knownHost, 0);
  });
});
