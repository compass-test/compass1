/** @jsx ForgeUI.createElement */
import ForgeUI, {
  render,
  Button,
  Checkbox,
  CheckboxGroup,
  Text,
  Option,
  Select,
  Form,
  TextArea,
  UserPicker,
  RadioGroup,
  Radio,
  DatePicker,
  useState,
  InlineDialog,
} from '@forge/ui';

const App = () => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<undefined | any>(undefined);

  if (!formData) {
    return (
      <InlineDialog>
        <Form onSubmit={setFormData} submitButtonText="yeet">
          <UserPicker name="name" label="label" />
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
          <CheckboxGroup label="label" name="checkboxgroup">
            <Checkbox label="label1" value="checkbox1" />
            <Checkbox defaultChecked label="label2" value="checkbox2" />
            <Checkbox label="label3" value="checkbox3" />
          </CheckboxGroup>
          <DatePicker name="datepicker" label="date" />
          <TextArea name="textarea" label="textarea" />
          <Select name="select" label="select">
            <Option label="option1" value="option1" />
            <Option label="option2" value="option2" />
            <Option label="option3" value="option3" />
          </Select>
          <Text content={`${count}`} />
          <Button
            onClick={() => {
              setCount(count + 1);
            }}
            text="Increment count"
          />
        </Form>
      </InlineDialog>
    );
  } else {
    return (
      <InlineDialog>
        <Text content={JSON.stringify(formData)} />
      </InlineDialog>
    );
  }
};

export const run = render(<App />);
