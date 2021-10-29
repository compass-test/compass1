// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/no-set-state-inside-render', rule, {
  valid: [
    `class ValidComponent extends React.Component {
        state = {someState: false};
        render() {
          return(
            <button onClick={()=>{this.setState({someState: true})}}/>
          )
        }
      }`,
    `class ValidComponent extends React.Component {
        state = {someState: false};
        someMethod() {
          this.setState({someState: true})
        }

        render() {}
      }`,
  ],
  invalid: [
    {
      code: `
        class InvalidComponent extends React.Component {
          state = {someState: false};

          render() {
            this.setState({someState: true})
          }
        }`,
      errors: [
        {
          messageId: 'noSetStateInsideRender',
        },
      ],
    },
  ],
});
