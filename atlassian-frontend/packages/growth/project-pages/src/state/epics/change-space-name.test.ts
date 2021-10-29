import testEpic from '../../common/util/test-epic';
import {
  changeSpaceName,
  generateSpaceKey,
  noValidKey,
  toggleSpaceNameInvalid,
  updateSpaceName,
  updateSuggestedKey,
} from '../actions';
import changeSpaceNameEpic from './change-space-name';

const validName = 'Test';
const shortName = 'X';
const symbolsName = '!$!#%$$$ ?!';
const whitespaceName = ' \t ';

describe('change space name epic', () => {
  test('should emit the correct actions with expected payload when the length of name is greater than 1', () =>
    testEpic({
      arrange: (input$: any) => changeSpaceNameEpic(input$),
      act: (input$: any) => {
        input$.next(changeSpaceName(validName));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateSuggestedKey(null),
          updateSpaceName(validName),
          toggleSpaceNameInvalid(false),
          generateSpaceKey(validName),
        ]);
      },
    }));

  test('should emit the correct actions with expected payload when the length of name is equal to 1', () =>
    testEpic({
      arrange: (input$: any) => changeSpaceNameEpic(input$),
      act: (input$: any) => {
        input$.next(changeSpaceName(shortName));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateSuggestedKey(null),
          updateSpaceName(shortName),
          toggleSpaceNameInvalid(false),
          generateSpaceKey(shortName),
        ]);
      },
    }));

  test('should emit the correct actions with expected payload when the name is just symbols', () =>
    testEpic({
      arrange: (input$: any) => changeSpaceNameEpic(input$),
      act: (input$: any) => {
        input$.next(changeSpaceName(symbolsName));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateSuggestedKey(null),
          updateSpaceName(symbolsName),
          toggleSpaceNameInvalid(false),
          noValidKey(),
        ]);
      },
    }));

  test('should emit the correct actions with expected payload when the name is just whitespace', () =>
    testEpic({
      arrange: (input$: any) => changeSpaceNameEpic(input$),
      act: (input$: any) => {
        input$.next(changeSpaceName(whitespaceName));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateSuggestedKey(null),
          updateSpaceName(whitespaceName),
          toggleSpaceNameInvalid(true),
          noValidKey(),
        ]);
      },
    }));
});
