import {
  getInputSkeletonQuery,
  setInputSkeletonQuery,
  getInputSkeletonFocus,
  setInputSkeletonIsFocus,
  getInputSkeletonSelection,
  setInputSkeletonSelection,
} from '../query-store';

describe('InputSkeleton Getters and Setters', () => {
  beforeEach(() => {
    window.inputSkeletonState = {
      query: 'test',
      placeholder: '',
      isFocused: true,
      selectionStart: 1,
      selectionEnd: 2,
      selectionDirection: 'forward',
      listeners: [],
    };
  });

  describe('getInputSkeletonQuery', () => {
    it('should return query string from inputSkeletonState', () => {
      const output = getInputSkeletonQuery();
      expect(output).toBe('test');
    });
    it('should return empty query string with no inputSkeletonState', () => {
      delete window.inputSkeletonState;
      const output = getInputSkeletonQuery();
      expect(output).toBe('');
    });
  });

  describe('getInputSkeletonFocus', () => {
    it('should return focus state from inputSkeletonState', () => {
      const output = getInputSkeletonFocus();
      expect(output).toBe(true);
    });
    it('should return false with no inputSkeletonState', () => {
      delete window.inputSkeletonState;
      const output = getInputSkeletonFocus();
      expect(output).toBe(false);
    });
  });

  describe('getInputSkeletonSelection', () => {
    it('should return focus state from inputSkeletonState', () => {
      const output = getInputSkeletonSelection();
      expect(output.selectionStart).toBe(1);
      expect(output.selectionEnd).toBe(2);
      expect(output.selectionDirection).toBe('forward');
    });
    it('should return 0 index with no inputSkeletonState', () => {
      delete window.inputSkeletonState;
      const output = getInputSkeletonSelection();
      expect(output.selectionStart).toBe(0);
      expect(output.selectionEnd).toBe(0);
      expect(output.selectionDirection).toBe('none');
    });
  });

  describe('setInputSkeletonQuery', () => {
    it('should set query string only if inputSkeletonState exists', () => {
      const testString = 'still a test';
      setInputSkeletonQuery(testString);
      expect(window.inputSkeletonState?.query).toBe(testString);
    });
  });

  describe('setInputSkeletonIsFocus', () => {
    it('should set focused state only if inputSkeletonState exists', () => {
      setInputSkeletonIsFocus(false);
      expect(window.inputSkeletonState?.isFocused).toBe(false);
    });
  });

  describe('setInputSkeletonSelection', () => {
    it('should set focused state only if inputSkeletonState exists', () => {
      setInputSkeletonSelection(3, 4, 'backward');
      expect(window.inputSkeletonState?.selectionStart).toBe(3);
      expect(window.inputSkeletonState?.selectionEnd).toBe(4);
      expect(window.inputSkeletonState?.selectionDirection).toBe('backward');
    });
  });
});
