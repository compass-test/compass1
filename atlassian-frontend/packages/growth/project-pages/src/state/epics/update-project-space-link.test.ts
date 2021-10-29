import testEpic from '../../common/util/test-epic';
import {
  fetchConnectedSpaceBlueprints,
  updateProjectSpaceLink,
} from '../actions';
import updateProjectSpaceLinkEpic from './update-project-space-link';

describe('update project space link epic', () => {
  test('should fire the fetch connected space blueprints action if there is a space key', () =>
    testEpic({
      arrange: (input$: any) => updateProjectSpaceLinkEpic(input$),
      act: (input$: any) => {
        input$.next(updateProjectSpaceLink('spacekey', null));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([fetchConnectedSpaceBlueprints()]);
      },
    }));

  test('should not fire any subsequent actions if space key is null', () =>
    testEpic({
      arrange: (input$: any) => updateProjectSpaceLinkEpic(input$),
      act: (input$: any) => {
        input$.next(updateProjectSpaceLink(null, null));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([]);
      },
    }));

  test('should fire the fetch connected space blueprints action upon retry with a space link', () =>
    testEpic({
      arrange: (input$: any) => updateProjectSpaceLinkEpic(input$),
      act: (input$: any) => {
        input$.next(updateProjectSpaceLink(null, null));
        input$.next(updateProjectSpaceLink('spacekey', null));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([fetchConnectedSpaceBlueprints()]);
      },
    }));
});
