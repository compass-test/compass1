import { onClientEntry } from '../../gatsby-browser';

jest.mock('../../feature-flags.tsx', () => ({
  testFlagInitialFalse: false,
  testFlagInitialTrue: true,
}));

describe('the initialization behavior for flags', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('should be initialized if it does not exist', () => {
    expect(window.localStorage.getItem('ff-testFlagInitialTrue')).toBeNull();
    expect(window.localStorage.getItem('ff-testFlagInitialFalse')).toBeNull();
    onClientEntry();
    expect(window.localStorage.getItem('ff-testFlagInitialTrue')).toBe('true');
    expect(window.localStorage.getItem('ff-testFlagInitialFalse')).toBe(
      'false',
    );
  });

  it('should stay true ...', () => {
    window.localStorage.setItem('ff-testFlagInitialTrue', 'true');
    expect(window.localStorage.getItem('ff-testFlagInitialTrue')).toBe('true');
    onClientEntry();
    expect(window.localStorage.getItem('ff-testFlagInitialTrue')).toBe('true');
  });

  it('should stay false ...', () => {
    window.localStorage.setItem('ff-testFlagInitialFalse', 'false');
    expect(window.localStorage.getItem('ff-testFlagInitialFalse')).toBe(
      'false',
    );
    onClientEntry();
    expect(window.localStorage.getItem('ff-testFlagInitialFalse')).toBe(
      'false',
    );
  });

  it('should force the default state on client entry if the default state is true', () => {
    window.localStorage.setItem('ff-testFlagInitialTrue', 'false');
    expect(window.localStorage.getItem('ff-testFlagInitialTrue')).toBe('false');
    onClientEntry();
    expect(window.localStorage.getItem('ff-testFlagInitialTrue')).toBe('true');
  });

  it("should not reset the user's choice if the default is false", () => {
    // User has toggled flag
    // Flag that is false by default is now true
    window.localStorage.setItem('ff-testFlagInitialFalse', 'true');
    expect(window.localStorage.getItem('ff-testFlagInitialFalse')).toBe('true');
    onClientEntry();
    expect(window.localStorage.getItem('ff-testFlagInitialFalse')).toBe('true');
  });
});
