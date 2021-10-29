import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { GetScorecardQuery } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
/** TODO COMPASS-1866 Use react-magnetic-di in the create-update-scorecard-controller and use the injectable in the tests
 * We're importing the following hooks from the entry points instead of @atlassian/dragonfruit/graphql:
 * useCreateScorecard
 * useCreateScorecardCriterias
 * useDeleteScorecardCriterias
 * useUpdateScorecard
 * useUpdateScorecardCriterias
 *
 * This is because we need to spy on the calls to the mutations returned by the above hooks. In order to do that,
 * We need to pass the object and methodName to the jest.spyOn method:
 * (https://jestjs.io/docs/jest-object#jestspyonobject-methodname)
 * jest.spyOn(object, methodName).mockImplementation(() => customImplementation)
 * That's why we're importing the hooks from the entry points instead of the graphql package.
 * A possible alternative is to use react-magnetic-di in the controller, then use the injectable method in the tests,
 * We didn't get it working due to time constraint, but will revisit it in https://softwareteams.atlassian.net/browse/COMPASS-1866
 * Please note that this pattern is only a workaround used in current test,
 * You should ALWAYS import the hooks from the graphql package instead of the entry points.
 */
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import * as CreateScorecard from '@atlassian/dragonfruit-graphql/src/graphql/mutations/createScorecard/useCreateScorecard';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import * as CreateCriterias from '@atlassian/dragonfruit-graphql/src/graphql/mutations/createScorecardCriterias/useCreateScorecardCriterias';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import * as DeleteCriterias from '@atlassian/dragonfruit-graphql/src/graphql/mutations/deleteScorecardCriterias/useDeleteScorecardCriterias';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import * as UpdateScorecard from '@atlassian/dragonfruit-graphql/src/graphql/mutations/updateScorecard/useUpdateScorecard';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import * as UpdateCriterias from '@atlassian/dragonfruit-graphql/src/graphql/mutations/updateScorecardCriterias/useUpdateScorecardCriterias';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import * as GetScorecard from '@atlassian/dragonfruit-scorecards/src/services/get-scorecard/main';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { CompassTestProvider } from '@atlassian/dragonfruit-testing/src';

import { mockUpdateFormData } from './mocks';
import * as Helper from './utils';

import { ExistingScorecard, useUpdateScorecardController } from './index';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;
describe('useUpdateScorecardController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mutations', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider>
        <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
      </CompassTestProvider>
    );

    describe('updateScorecard', () => {
      it('should update an existing scorecard', async () => {
        const expectedList: Helper.SortedMutationInputs = {
          create: [{ weight: 40, field: 'DESCRIPTION', id: '10000' }],
          update: [{ weight: 30, field: 'OWNER', id: '123' }],
          delete: [{ id: 'delete-id-1' }],
        };

        const fakeData = {
          data: { compass: { updateScorecard: { success: true } } },
        };

        const onCreateScorecard = jest.fn();
        const onUpdateScorecard = jest.fn().mockReturnValue(fakeData);
        const onCreateCriteria = jest.fn().mockReturnValue(fakeData);
        const onUpdateCriteria = jest.fn().mockReturnValue(fakeData);
        const onDeleteCriteria = jest.fn().mockReturnValue(fakeData);

        const createCriteriaSpy = jest
          .spyOn(CreateCriterias, 'useCreateScorecardCriterias')
          .mockReturnValue([onCreateCriteria]);
        const updateCriteriaSpy = jest
          .spyOn(UpdateCriterias, 'useUpdateScorecardCriterias')
          .mockReturnValue([onUpdateCriteria]);
        const deleteCriteriaSpy = jest
          .spyOn(DeleteCriterias, 'useDeleteScorecardCriterias')
          .mockReturnValue([onDeleteCriteria]);
        const createScorecardSpy = jest
          .spyOn(CreateScorecard, 'useCreateScorecard')
          .mockReturnValue([onCreateScorecard]);
        const updateScorecardSpy = jest
          .spyOn(UpdateScorecard, 'useUpdateScorecard')
          .mockReturnValue([onUpdateScorecard]);

        const { result } = renderHook(
          () => useUpdateScorecardController('1234'),
          { wrapper },
        );

        const utilSpy = jest
          .spyOn(Helper, 'sortCriteriaMutations')
          .mockReturnValue(expectedList);
        const spy = jest.spyOn(result.current[0], 'updateScorecard');

        const [{ updateScorecard }] = result.current;

        // We tried passing an async function to the act function, it didn't work.
        // await act(async () => {
        //   updateScorecard(mockCreateFormData, '1234');
        // });
        //
        // This works but you'll get this error when run the test:
        // When testing, code that causes React state updates should be wrapped into act(...):
        // Please be aware if you use the same style in your tests, you'll get the same error
        // When you run tests.
        await updateScorecard(mockUpdateFormData, '1234');

        expect(spy).toHaveBeenCalledTimes(1);

        expect(createCriteriaSpy).toHaveBeenCalled;
        expect(updateCriteriaSpy).toHaveBeenCalled;
        expect(createScorecardSpy).toHaveBeenCalled;
        expect(updateScorecardSpy).toHaveBeenCalled;
        expect(deleteCriteriaSpy).toHaveBeenCalled;
        expect(utilSpy).toHaveBeenCalledTimes(1);

        expect(onCreateCriteria).toHaveBeenCalledWith('1234', {
          criterias: [{ hasDescription: { weight: 40 } }],
        });
        expect(onUpdateCriteria).toHaveBeenCalledWith('1234', {
          criterias: [{ hasOwner: { id: '123', weight: 30 } }],
        });
        expect(onDeleteCriteria).toHaveBeenCalledWith('1234', {
          criterias: [{ id: 'delete-id-1' }],
        });
      });

      it('should allow removing existing owner', async () => {
        const fakeData = {
          data: {
            compass: {
              updateScorecard: {
                success: true,
                errors: [],
                scorecardDetails: {
                  owner: null,
                },
              },
            },
          },
        };
        const onDeleteCriteria = jest.fn().mockReturnValue(fakeData);
        const onUpdateCriteria = jest.fn().mockReturnValue(fakeData);
        const onCreateCriteria = jest.fn().mockReturnValue(fakeData);
        const onUpdateScorecard = jest.fn().mockReturnValue(fakeData);

        const fakeGetScorecard = {
          loading: false,
          error: undefined,
          data: {
            compass: {
              scorecard: {
                __typename: 'CompassScorecard',
                name: 'hello world',
                owner: {
                  accountId: '123',
                  accountStatus: 'active',
                  name: 'John Doe',
                  picture: 'https://gravatar.url',
                },
                componentType: 'SERVICE',
                description: 'hello world',
                importance: 'REQUIRED',
                criterias: [],
              } as ExistingScorecard,
            },
          } as GetScorecardQuery,
        };
        const getScorecardSpy = jest
          .spyOn(GetScorecard, 'default')
          .mockReturnValue(fakeGetScorecard);

        const expectedSortedCriteriaMutations: Helper.SortedMutationInputs = {
          create: [],
          update: [],
          delete: [],
        };
        const utilSpy = jest
          .spyOn(Helper, 'sortCriteriaMutations')
          .mockReturnValue(expectedSortedCriteriaMutations);

        const deleteCriteriaSpy = jest
          .spyOn(DeleteCriterias, 'useDeleteScorecardCriterias')
          .mockReturnValue([onDeleteCriteria]);
        const updateCriteriaSpy = jest
          .spyOn(UpdateCriterias, 'useUpdateScorecardCriterias')
          .mockReturnValue([onUpdateCriteria]);
        const createCriteriaSpy = jest
          .spyOn(CreateCriterias, 'useCreateScorecardCriterias')
          .mockReturnValue([onCreateCriteria]);
        const updateScorecardSpy = jest
          .spyOn(UpdateScorecard, 'useUpdateScorecard')
          .mockReturnValue([onUpdateScorecard]);

        const { result } = renderHook(
          () => useUpdateScorecardController('1234'),
          { wrapper },
        );

        const createUpdateScorecardControllerSpy = jest.spyOn(
          result.current[0],
          'updateScorecard',
        );

        const [{ updateScorecard }] = result.current;

        const mockUpdateScorecardFormData = { owner: null };

        await updateScorecard(mockUpdateScorecardFormData, '1234');

        expect(createUpdateScorecardControllerSpy).toHaveBeenCalledTimes(1);
        expect(getScorecardSpy).toHaveBeenCalledTimes(1);
        expect(utilSpy).toHaveBeenCalledTimes(1);

        expect(deleteCriteriaSpy).not.toHaveBeenCalled;
        expect(updateCriteriaSpy).not.toHaveBeenCalled;
        expect(createCriteriaSpy).not.toHaveBeenCalled;
        expect(updateScorecardSpy).toHaveBeenCalledTimes(1);

        expect(onDeleteCriteria).not.toHaveBeenCalled;
        expect(onUpdateCriteria).not.toHaveBeenCalled;
        expect(onCreateCriteria).not.toHaveBeenCalled;

        expect(onUpdateScorecard).toHaveBeenCalledTimes(1);
      });
    });
  });
});
