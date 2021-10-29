import { RequestReadState } from '../../../common/types';

import {
  loadReadStateFilterFromLocalStorage,
  saveReadStateFilterToLocalStorage,
} from './index';

describe('local-storage-util', () => {
  describe('loadReadStateFilterFromLocalStorage', () => {
    test('should return unread if unread is saved', () => {
      saveReadStateFilterToLocalStorage(RequestReadState.UNREAD);
      expect(loadReadStateFilterFromLocalStorage()).toEqual(
        RequestReadState.UNREAD,
      );
    });
    test('should return any if any is saved', () => {
      saveReadStateFilterToLocalStorage(RequestReadState.ANY);
      expect(loadReadStateFilterFromLocalStorage()).toEqual(
        RequestReadState.ANY,
      );
    });
    test('should return any if invalid read state is saved', () => {
      saveReadStateFilterToLocalStorage('' as RequestReadState);
      expect(loadReadStateFilterFromLocalStorage()).toEqual(
        RequestReadState.ANY,
      );
      saveReadStateFilterToLocalStorage('NotAReadState' as RequestReadState);
      expect(loadReadStateFilterFromLocalStorage()).toEqual(
        RequestReadState.ANY,
      );
    });
  });
});
