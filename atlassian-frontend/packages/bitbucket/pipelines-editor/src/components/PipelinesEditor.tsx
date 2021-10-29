import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import CodeMirror, { Editor, EditorChange } from 'codemirror';

import Button from '@atlaskit/button/standard-button';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { pipelinesLint, validator } from '@atlassian/pipelines-yml-validator';

import { BIDI_CHARS_REGEX, DEFAULT_VARIABLES } from '../const';
import { VariablesProps } from '../types';

import PipelinesEditorSidebar from './PipelinesEditorSidebar';
import { Wrapper } from './styled';
import StyledCodemirror from './StyledCodemirror';

type Props = {
  code: string;
  maxStepDuration: number;
  environments: string[][];
  variables: string[];
  onChange?: (onChange: { isValid: boolean; code: string }) => void;
  variablesProps?: VariablesProps;
  showBidiChars?: boolean;
};

const PipelineEditor: React.FC<Props> = ({
  code,
  environments,
  maxStepDuration,
  variables,
  onChange,
  variablesProps,
  showBidiChars,
}) => {
  const editor = useRef(null);

  const [configuration, setConfiguration] = useState(code);
  const [template, setTemplate] = useState(code);
  const [replaceTemplate, setReplaceTemplate] = useState('');

  const environmentVariables = useMemo(
    () => variables.concat(DEFAULT_VARIABLES),
    [variables],
  );

  const validate = useCallback(
    (newCode: string) => {
      const errors = validator(newCode, { environments, maxStepDuration });
      return Array.isArray(errors)
        ? errors.filter((error) => error.type !== 'warning').length === 0
        : true;
    },
    [environments, maxStepDuration],
  );

  const updateCode = useCallback(
    (newCode: string) => {
      if (code !== newCode) {
        setConfiguration(newCode);
      }
      if (onChange) {
        onChange({ code: newCode, isValid: validate(newCode) });
      }
    },
    [code, onChange, validate],
  );

  useEffect(() => {
    updateCode(code);
  }, [updateCode, code]);

  const applyAddons = useCallback(
    (cm: Editor, change: EditorChange) => {
      // Hint environment variables
      const cursor = cm.getDoc().getCursor();
      const line = cm.getLine(cursor.line);
      const re = /\$\S*/g; // get variables with syntax $FOO

      let match = re.exec(line);
      while (match !== null) {
        const text = match[0];
        if (
          change &&
          change.from.ch >= match.index && // target variable being typed
          !environmentVariables.includes(text.substr(1)) // strip $
        ) {
          (cm as any).showHint({
            text,
            from: { line: change.from.line, ch: match.index },
            to: { line: change.to.line, ch: match.index + text.length },
          });
        }
        match = re.exec(line);
      }
    },
    [environmentVariables],
  );

  const buildLinter = useCallback(
    (text: string, annotationsHelper: any, cm: any) =>
      pipelinesLint(text, annotationsHelper, cm, {
        environments,
        maxStepDuration,
      }),
    [environments, maxStepDuration],
  );

  const hintEnvironmentVariables = useCallback(
    (editor: any, options: any) => {
      const list: any[] = [];
      const text = options.text;

      environmentVariables.forEach((variable) => {
        if (
          ('$' + variable).lastIndexOf(text, 0) === 0 &&
          !list.includes(variable)
        ) {
          list.push('$' + variable);
        }
      });

      return { list, from: options.from, to: options.to };
    },
    [environmentVariables],
  );

  const specialCharPlaceholder = useCallback((char: any) => {
    if (BIDI_CHARS_REGEX.test(char)) {
      const displayChar = `<U+${char
        .charCodeAt(0)
        .toString(16)
        .toUpperCase()}>`;
      const title = `Bidirectional characters change the order that text is rendered. This could be used to obscure malicious code.`;

      const replacement = document.createElement('span');
      replacement.className = 'bidi-replacement';
      replacement.title = title;
      replacement.setAttribute('aria-label', title);
      replacement.appendChild(document.createTextNode(displayChar));

      return replacement;
    }

    return CodeMirror.defaults.specialCharPlaceholder(char);
  }, []);

  const options = useMemo(
    () => ({
      lineNumbers: true,
      styleSelectedText: true,
      tabSize: 2,
      smartIndent: true,
      readOnly: false,
      gutters: ['CodeMirror-lint-markers'],
      mode: 'yaml',
      lineWrapping: true,
      lint: buildLinter,
      ...(showBidiChars
        ? {
            specialChars: new RegExp(
              BIDI_CHARS_REGEX.source +
                '|' +
                CodeMirror.defaults.specialChars.source,
              'g',
            ),
            specialCharPlaceholder,
          }
        : {}),
      hintOptions: {
        hint: hintEnvironmentVariables,
        closeOnUnfocus: true,
        completeSingle: false,
      },
      viewportMargin: Infinity,
      extraKeys: {
        Tab: (cm: any) => {
          if (cm.somethingSelected()) {
            cm.indentSelection('add');
          } else {
            const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
            cm.replaceSelection(spaces);
          }
        },
        'Shift-Tab': 'indentLess',
      },
    }),
    [
      buildLinter,
      showBidiChars,
      specialCharPlaceholder,
      hintEnvironmentVariables,
    ],
  );

  const onConfirmChangeTemplate = useCallback(
    (newTemplate) => {
      setTemplate(newTemplate);
      updateCode(newTemplate);
      setReplaceTemplate('');
    },
    [updateCode],
  );

  const shouldOpenDiscardDialog = useCallback(
    (newTemplate) =>
      newTemplate && newTemplate !== template && template !== configuration,
    [template, configuration],
  );

  const onTemplateChange = useCallback(
    (newTemplate: string) => {
      setReplaceTemplate(newTemplate);
      if (!shouldOpenDiscardDialog(newTemplate)) {
        onConfirmChangeTemplate(newTemplate);
      }
    },
    [shouldOpenDiscardDialog, onConfirmChangeTemplate],
  );

  return (
    <Wrapper>
      <StyledCodemirror
        ref={editor.current}
        value={configuration}
        onBeforeChange={(e, change, newCode) => updateCode(newCode)}
        onChange={applyAddons}
        options={options}
      />
      <PipelinesEditorSidebar
        variablesProps={variablesProps}
        onTemplateChange={onTemplateChange}
        code={code}
        updateCode={() => updateCode(code)}
      />
      <ModalTransition>
        {shouldOpenDiscardDialog(replaceTemplate) && (
          <ModalDialog width="small" onClose={() => setReplaceTemplate('')}>
            <ModalHeader>
              <ModalTitle>Are you sure?</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <p>Your changes will be lost. Are you sure you want to leave?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                appearance="subtle"
                onClick={() => setReplaceTemplate('')}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                autoFocus
                onClick={() => onConfirmChangeTemplate(replaceTemplate)}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalDialog>
        )}
      </ModalTransition>
    </Wrapper>
  );
};

export default React.memo(PipelineEditor);
