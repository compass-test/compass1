import { Controlled as Codemirror } from 'react-codemirror2';
import styled, { injectGlobal } from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation, gridSize } from '@atlaskit/theme';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';

// Code mirror addons
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/yaml/yaml');
require('codemirror/addon/display/autorefresh');
require('codemirror/addon/lint/lint');
require('codemirror/addon/hint/show-hint.js');

export const StyledCodemirror = styled(Codemirror)`
  width: 100%;

  .CodeMirror.cm-s-default {
    height: calc(100vh - 300px);
    min-height: 500px;
    font: 500 11px/1.5 Monaco, Consolas, 'Andale Mono WT', 'Andale Mono',
      'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono',
      'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L',
      'Courier New', Courier, monospace;

    .cm-comment {
      color: ${colors.R500};
    }
    .cm-atom {
      color: ${colors.P400};
    }

    .CodeMirror-wrap pre.CodeMirror-line {
      word-break: break-all;
    }

    /* Editor addons */
    .CodeMirror-linenumber {
      padding-right: ${gridSize()}px;
    }
    .CodeMirror-gutter.CodeMirror-linenumbers {
      width: ${gridSize() * 4}px;
    }

    /* Lint markers (dots in gutter) */
    .CodeMirror-lint-markers {
      width: ${gridSize() * 2}px;
    }

    .CodeMirror-lint-marker-error,
    .CodeMirror-lint-marker-warning {
      background-repeat: no-repeat;
      cursor: pointer;
      display: inline-block;
      margin: 0 0 2px 10px;
      height: ${gridSize() * 2}px;
      width: ${gridSize() * 2}px;
      vertical-align: middle;
      position: relative;
    }

    /* Lint mark (squiggly line under offending text) */
    .CodeMirror-lint-mark-error,
    .CodeMirror-lint-mark-warning {
      background-position: left bottom;
      background-repeat: repeat-x;
    }
    .CodeMirror-lint-mark-error {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==');
    }
    .CodeMirror-lint-mark-warning.warning-style {
      color: ${colors.R200};
    }
  }
`;

injectGlobal`
  /* Lint tooltip wrapper */
  .CodeMirror-lint-tooltip {
    ${elevation.e200()}
    background: #fff;
    color: ${colors.N500};
    border-radius: 4px;
    font: 400 11px/1.5 -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Noto Sans, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
    overflow: hidden;
    padding: ${gridSize()}px;
    position: fixed;
    white-space: pre;
    white-space: pre-wrap;
    z-index: 1000;
    max-width: 600px;
    opacity: 0;
    transition: opacity 0.4s;

    .CodeMirror-lint-message-warning,
    .CodeMirror-lint-message-error {
      &:after {
        left: 10px;
        width: 10px;
        height: 10px;
        margin-top: -5px;
      }
    }
  }

  /* Lint message */
  .CodeMirror-lint-message-error,
  .CodeMirror-lint-message-warning {
    padding-left: 18px;
    background-position: top left;
    background-repeat: no-repeat;
  }

  /* Lint marker and message combination */
  .CodeMirror-lint-marker-error,
  .CodeMirror-lint-message-error,
  .CodeMirror-lint-marker-warning,
  .CodeMirror-lint-message-warning {
    &:after {
      display: block;
      content: '';
      border-radius: 10px;
      width: 6px;
      height: 6px;
      position: absolute;
      top: 50%;
      margin-top: -4px;
    }
  }

  .CodeMirror-lint-marker-error,
  .CodeMirror-lint-message-error {
    &:after {
      background: ${colors.Y200};
    }
  }

  .CodeMirror-lint-marker-warning,
  .CodeMirror-lint-message-warning {
    &:after {
      background: ${colors.B200};
    }
  }

  .CodeMirror .bidi-replacement {
    background: ${colors.Y75};
    color: #7F5F01; // non-standard
    cursor: pointer;
    margin: 0 4px;
    padding: 0 2px;
  }
`;

export default StyledCodemirror;
