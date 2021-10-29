import { ObservableObject } from '../ObservableObject';

const props = {
  id: '123',
  message: 'test',
};

it('can subscribe and unsubscribe to props update', () => {
  const mockedHandler = jest.fn();
  const observableObject = new ObservableObject();

  observableObject.subscribe(mockedHandler);
  observableObject.object = props;

  expect(mockedHandler).toHaveBeenCalledTimes(1);
  expect(observableObject.object).toEqual(props);
});

it('can add multiple subscribers to props update', () => {
  const mockedHandler1 = jest.fn();
  const mockedHandler2 = jest.fn();

  const observableObject = new ObservableObject();

  observableObject.subscribe(mockedHandler1);
  observableObject.subscribe(mockedHandler2);

  observableObject.object = props;

  expect(mockedHandler1).toHaveBeenCalledTimes(1);
  expect(mockedHandler2).toHaveBeenCalledTimes(1);
});

it('can unsubscribe specified subsriber', () => {
  const mockedHandler1 = jest.fn();
  const mockedHandler2 = jest.fn();

  const observableObject = new ObservableObject();

  observableObject.subscribe(mockedHandler1);
  observableObject.subscribe(mockedHandler2);

  observableObject.unsubscribe(mockedHandler1);

  observableObject.object = props;

  expect(mockedHandler1).not.toHaveBeenCalled();

  expect(mockedHandler2).toHaveBeenCalledTimes(1);
});
