import { User } from '../../userPicker/providers/useMentionResource';
import { transformFormData } from '../transformFormData';

describe('transformFormData', () => {
  it('returns the value when given form data that is an object with a value property', () => {
    const formData = { milestone: { value: 'summit' } };
    expect(transformFormData(formData)).toEqual({ milestone: 'summit' });
  });

  it('returns an id when given a form data containing a User', () => {
    const formData: { user: User } = {
      user: { id: '007', name: 'James Bond', avatarUrl: '/img' },
    };
    expect(transformFormData(formData)).toEqual({ user: '007' });
  });

  it('returns an array of values when given form data containing objects with a value property', () => {
    const formData = { selected: [{ value: 1 }, { value: 2 }] };
    expect(transformFormData(formData)).toEqual({ selected: [1, 2] });
  });

  it('returns an array of ids when given form data containing an array of Users', () => {
    const formData: { users: User[] } = {
      users: [
        { id: '123', name: 'Nathan', avatarUrl: '/img' },
        { id: '456', name: 'Yeet', avatarUrl: '/img2' },
      ],
    };
    expect(transformFormData(formData)).toEqual({
      users: ['123', '456'],
    });
  });
});
