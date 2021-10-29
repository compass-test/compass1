import React from 'react';
import { Suspense } from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import FormCondition from '..';
import { Form } from '../../form';
import { CheckboxGroup } from '../../checkbox';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

describe('FormCondition component', () => {
  const FormComponent = ({
    areChildrenPersisted,
  }: {
    areChildrenPersisted: boolean;
  }) => {
    return (
      <Suspense fallback="loading">
        <Form
          forgeDoc={{
            type: 'Form',
            key: 'Form.0',
            props: {},
            children: [
              {
                type: 'CheckboxGroup',
                key: 'CheckboxGroup.0',
                props: {
                  name: 'checkbox',
                  label: 'test',
                  options: [
                    {
                      key: 'Checkbox1',
                      label: 'checked',
                      value: 'checked',
                    },
                  ],
                },
                children: [],
              },
              {
                type: 'FormCondition',
                key: 'FormCondition.0',
                props: {
                  when: 'checkbox',
                  is: ['checked'],
                  areChildrenPersisted,
                },
                children: [],
              },
              {
                type: 'Text',
                key: 'Text.0',
                props: {
                  content: 'form',
                },
                children: [],
              },
            ],
          }}
          dispatch={jest.fn()}
          render={(forgeDoc) => {
            if (forgeDoc.type === 'CheckboxGroup') {
              // @ts-ignore
              return <CheckboxGroup {...forgeDoc.props} key={forgeDoc.key} />;
            } else if (forgeDoc.type === 'FormCondition') {
              return (
                // @ts-ignore
                <FormCondition {...forgeDoc.props} key={forgeDoc.key}>
                  children
                </FormCondition>
              );
            } else if (forgeDoc.type === 'Text') {
              return forgeDoc.props?.content;
            }
          }}
        />
      </Suspense>
    );
  };

  it('Conditionally renders children', async () => {
    const { findByText, getByText, getByLabelText } = render(
      <FormComponent areChildrenPersisted={false} />,
    );
    await findByText('form');
    const checkbox = await waitForElement(() => getByLabelText('checked'));
    expect(() => getByText('children')).toThrowError();
    fireEvent.click(checkbox);
    expect(getByText('children').innerText).toBe('children');
  });

  it('Preserves children in DOM if areChildrenPersisted is true', async () => {
    const { findByText, getByText, getByLabelText } = render(
      <FormComponent areChildrenPersisted={true} />,
    );
    await findByText('form');
    const checkbox = await waitForElement(() => getByLabelText('checked'));
    const children = getByText('children');
    expect(children.innerText).toBe('children');
    expect(children).toHaveStyle('display:none');
    fireEvent.click(checkbox);
    expect(children).toHaveStyle('display:block');
  });
});
