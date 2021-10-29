/** @jsx ForgeUI.createElement */
import ForgeUI, {
  render,
  Avatar,
  AvatarStack,
  Button,
  ButtonSet,
  Checkbox,
  CheckboxGroup,
  Text,
  Fragment,
  useAction,
  Option,
  Select,
  Form,
  TextField,
  TextArea,
  UserPicker,
  RadioGroup,
  Radio,
  DatePicker,
  useState,
  ModalDialog,
  SectionMessage,
} from '@forge/ui';

import { ForgeElement } from '@atlassian/forge-ui-types';

interface AppState {
  currentModal: 'none' | 'form' | 'modal';
  formData: object;
  appearance?: 'warning' | 'danger';
  width?: 'small' | 'medium' | 'large' | 'x-large';
}

interface CloseAction {
  type: 'close';
}
interface OpenAction {
  type: 'open';
}
interface OpenFormAction {
  type: 'openForm';
  appearance?: 'warning' | 'danger';
  width?: 'small' | 'medium' | 'large' | 'x-large';
}

interface SubmitAction {
  type: 'submit';
  formData: object;
}
type Action = CloseAction | OpenAction | OpenFormAction | SubmitAction;

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'open':
      return { ...state, currentModal: 'modal' };
    case 'openForm': {
      return {
        ...state,
        currentModal: 'form',
        appearance: action.appearance,
        width: action.width,
      };
    }
    case 'close':
      return {
        ...state,
        currentModal: 'none',
      };
    case 'submit': {
      return {
        ...state,
        currentModal: 'none',
        formData: action.formData,
      };
    }
    default:
      throw new Error('action');
  }
}

const MyModal = ({
  state,
  dispatch,
}: {
  state: AppState;
  dispatch: (action?: Action) => void;
}) => {
  if (state.currentModal !== 'modal') {
    return null;
  }
  return (
    <ModalDialog
      header="My Modal without a form"
      appearance="danger"
      width="small"
      onClose={() => dispatch({ type: 'close' })}
    >
      <Avatar accountId="aaid-pete" />
      <AvatarStack>
        <Avatar accountId="aaid-kang" />
        <Avatar accountId="aaid-pete" />
      </AvatarStack>
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <SectionMessage title="Section message">
        <Text content="section message text" format="plaintext" />
      </SectionMessage>
      <SectionMessage title="Section message">
        <Text content="section message text" format="plaintext" />
      </SectionMessage>
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
      <Text content="modal text" format="plaintext" />
    </ModalDialog>
  );
};

const MyFormModal = ({
  state,
  dispatch,
}: {
  state: AppState;
  dispatch: (action?: Action) => void;
}) => {
  const [buttonState, setButtonState] = useState('click a button');
  if (state.currentModal !== 'form') {
    return null;
  }
  return (
    <ModalDialog
      header="My Form Modal"
      onClose={() => dispatch({ type: 'close' })}
      appearance={state.appearance}
      width={state.width}
    >
      <Form
        actionButtons={[
          <Button
            text="Go back"
            onClick={() => setButtonState('Go back clicked')}
          />,
        ]}
        onSubmit={(evtData) => {
          dispatch({ type: 'submit', formData: evtData });
        }}
        submitButtonText="yeet"
      >
        <Text content="Form modal" format="plaintext" />
        <TextField name="textfield" label="Text field" />
        <TextArea name="textarea" label="Text area" />
        <UserPicker name="userpicker" label="User picker" />
        <RadioGroup name="radiogroup" label="Radio group">
          <Radio label="Small" value="s" />
          <Radio label="Medium" value="m" />
          <Radio label="Large" value="l" />
        </RadioGroup>
        <CheckboxGroup name="checkboxgroup" label="Checkbox group">
          <Checkbox label="Mushroom" value="mushroom" />
          <Checkbox label="Pineapple" value="pineapple" />
          <Checkbox label="Ham" value="ham" />
        </CheckboxGroup>
        <DatePicker name="datepicker" label="Date picker" />
        <Select name="select" label="Select">
          <Option value="22" label="twenty-two" />
          <Option value="29" label="twenty-nine" />
          <Option value="30" label="thirty" />
        </Select>

        <Text content={buttonState} />
        <SpacePicker />
        <ButtonSet>
          <Button text="a" onClick={() => setButtonState('a')} />
          <Button text="b" onClick={() => setButtonState('b')} />
          <Button text="c" onClick={() => setButtonState('c')} />
        </ButtonSet>
      </Form>
    </ModalDialog>
  );
};

const SpacePicker = ('SpacePicker' as unknown) as (props: any) => ForgeElement;

const App = () => {
  const [state, dispatch] = useAction<AppState, Action>(appReducer, {
    currentModal: 'none',
    formData: {},
    appearance: undefined,
  });

  return (
    <Fragment>
      <Text content="Modal app demo" format="plaintext" />
      <Button
        onClick={() => dispatch({ type: 'open' })}
        text="Open danger modal without Form"
      />
      <Text
        content={JSON.stringify(state.formData, null, 2)}
        format="plaintext"
      />
      <Form
        onSubmit={(formData) => {
          const { appearance, width } = formData;
          dispatch({
            type: 'openForm',
            appearance: ['warning', 'danger'].includes(appearance)
              ? appearance
              : undefined,
            width: ['small', 'medium', 'large', 'x-large'].includes(width)
              ? width
              : undefined,
          });
        }}
        submitButtonText="Open modal with form"
      >
        <SpacePicker />
        <RadioGroup name="appearance" label="Appearance">
          <Radio label="Default" value="default" defaultChecked />
          <Radio label="Warning" value="warning" />
          <Radio label="Danger" value="danger" />
        </RadioGroup>
        <RadioGroup name="width" label="Width">
          <Radio label="Small" value="small" />
          <Radio label="Medium" value="medium" defaultChecked />
          <Radio label="Large" value="large" />
          <Radio label="Extra large" value="x-large" />
        </RadioGroup>
      </Form>
      <MyModal state={state} dispatch={dispatch} />
      <MyFormModal state={state} dispatch={dispatch} />
    </Fragment>
  );
};

export const run = render(<App />);
