import { capitalizeFirstLetter } from './index';

it(capitalizeFirstLetter.name, () => {
  expect(capitalizeFirstLetter('expiryMonth')).toBe('ExpiryMonth');
});
