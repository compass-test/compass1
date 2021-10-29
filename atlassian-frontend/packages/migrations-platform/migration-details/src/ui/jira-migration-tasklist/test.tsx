import React from 'react';

import {
  BoundFunctions,
  cleanup,
  queries,
  render,
  RenderResult,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ErrorAttachmentsOnlyButUsersSelected,
  ErrorSkipProjectsButReferencedUsersSelected,
  InitialState,
  InitialStateWithUsersAndGroupsDisabled,
  SelectedProjects,
  SelectedProjectsAndUsersGroups,
  SelectedProjectsWithUsersAndGroupsDisabled,
  SkippedProjects,
  WithAppsCountMoreThanZero,
  WithAppsCountZero,
  WithARErrorAttachmentsOnlyButPlansAndUsersSelected,
  WithARErrorAttachmentsOnlyButPlansSelected,
  WithARErrorAttachmentsOnlyButUsersSelected,
  WithARErrorConfigOnlyButPlansSelected,
  WithARInitialState,
  WithARSelectedPlans,
  WithARSelectedPlansAndProjects,
  WithARSelectedPlansAndProjectsAndUsers,
  WithARSkippedPlansAttachmentsOnly,
  WithARSkippedPlansConfigOnly,
  WithARSkippedPlansSelectedUsersConfigOnly,
  WithNoAppSelectionMade,
  WithoutApps,
} from './examples';

describe('<JiraMigrationTasklist />', () => {
  it('should show enabled projects, disabled users and groups and Check for errors button for initial state', () => {
    const { getByText, getByTestId } = render(<InitialState />);

    expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

    const projectsCard = getByText('Projects').closest('section');
    const projectsSelectButton = within(projectsCard!).getByTestId(
      'buttonSelect',
    );
    expect(projectsSelectButton).toBeInTheDocument();
    expect(projectsSelectButton).toBeEnabled();

    const projectsSkipButton = within(projectsCard!).getByTestId('buttonSkip');
    expect(projectsSkipButton).toBeInTheDocument();
    expect(projectsSkipButton).toBeEnabled();

    expect(
      within(projectsCard!).getByText('No projects selected'),
    ).toBeInTheDocument();

    const usersAndGroupsCard = getByText('Users and groups').closest('section');
    const usersAndGroupsSelectButton = within(usersAndGroupsCard!).getByTestId(
      'buttonSelect',
    );
    expect(usersAndGroupsSelectButton).toBeDisabled();

    expect(
      within(usersAndGroupsCard!).getByText(
        'No users, groups, or group membership selected',
      ),
    ).toBeInTheDocument();
  });

  it('should show enabled users and groups when projects are selected', () => {
    const { getByText, getByTestId } = render(<SelectedProjects />);

    expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

    const projectsCard = getByText('Projects').closest('section');
    const projectsEditButton = within(projectsCard!).getByTestId('buttonEdit');

    expect(projectsEditButton).toBeInTheDocument();
    expect(projectsEditButton).toBeEnabled();

    expect(within(projectsCard!).getByText('12 projects')).toBeInTheDocument();
    expect(
      within(projectsCard!).getByText(
        'Only configuration for the selected projects.',
      ),
    ).toBeInTheDocument();

    const usersAndGroupsCard = getByText('Users and groups').closest('section');
    const usersAndGroupsSelectButton = within(usersAndGroupsCard!).getByTestId(
      'buttonSelect',
    );
    expect(usersAndGroupsSelectButton).toBeEnabled();

    expect(
      within(usersAndGroupsCard!).getByText(
        'No users, groups, or group membership selected',
      ),
    ).toBeInTheDocument();
  });

  it('should show enabled check for error button when both projects and users and groups are selected', () => {
    const { getByTestId, getByText } = render(
      <SelectedProjectsAndUsersGroups />,
    );
    expect(getByTestId('buttonCheckForErrors')).toBeEnabled();

    const projectsCard = getByText('Projects').closest('section');
    const projectsEditButton = within(projectsCard!).getByTestId('buttonEdit');
    expect(projectsEditButton).toBeInTheDocument();
    expect(projectsEditButton).toBeEnabled();

    expect(within(projectsCard!).getByText('12 projects')).toBeInTheDocument();
    expect(
      within(projectsCard!).getByText(
        'Only configuration for the selected projects.',
      ),
    ).toBeInTheDocument();

    const usersAndGroupsCard = getByText('Users and groups').closest('section');
    const usersAndGroupsEditButton = within(usersAndGroupsCard!).getByTestId(
      'buttonEdit',
    );
    expect(usersAndGroupsEditButton).toBeInTheDocument();
    expect(usersAndGroupsEditButton).toBeEnabled();

    expect(
      within(usersAndGroupsCard!).getByText(
        'Only users and groups related to selected projects',
      ),
    ).toBeInTheDocument();
  });

  it('should show enabled users and groups when skipping projects', () => {
    const { getByText, getByTestId } = render(<SkippedProjects />);

    expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

    const projectsCard = getByText('Projects').closest('section');
    const projectsEditButton = within(projectsCard!).getByTestId('buttonEdit');

    expect(projectsEditButton).toBeInTheDocument();
    expect(projectsEditButton).toBeEnabled();

    expect(within(projectsCard!).getByText('0 projects')).toBeInTheDocument();
    expect(
      within(projectsCard!).getByText('You haven’t selected any projects.'),
    ).toBeInTheDocument();

    const usersAndGroupsCard = getByText('Users and groups').closest('section');
    const usersAndGroupsSelectButton = within(usersAndGroupsCard!).getByTestId(
      'buttonSelect',
    );
    expect(usersAndGroupsSelectButton).toBeEnabled();

    expect(
      within(usersAndGroupsCard!).getByText(
        'No users, groups, or group membership selected',
      ),
    ).toBeInTheDocument();
  });

  describe('when 0 projects selected and referenced users and groups selected', () => {
    let component: RenderResult;
    let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;
    let handleSelectAllUsersAndGroupsFix: () => void;
    let handleSkipUsersAndGroupsFix: () => void;

    beforeEach(() => {
      handleSelectAllUsersAndGroupsFix = jest.fn();
      handleSkipUsersAndGroupsFix = jest.fn();
      component = render(
        <ErrorSkipProjectsButReferencedUsersSelected
          onSelectAllUsersAndGroups={handleSelectAllUsersAndGroupsFix}
          onSkipUsersAndGroups={handleSkipUsersAndGroupsFix}
        />,
      );
      usersAndGroupsTaskCard = within(
        component.getByText('Users and groups').closest('section')!,
      );
    });

    it('should show error message', () => {
      expect(
        component.getByText('Invalid users and groups selection'),
      ).toBeInTheDocument();
    });

    it('should show editable projects taskcard with 0 projects selected', () => {
      const projectsCard = component.getByText('Projects').closest('section');
      const projectsEditButton = within(projectsCard!).getByTestId(
        'buttonEdit',
      );
      expect(projectsEditButton).toBeInTheDocument();
      expect(projectsEditButton).toBeEnabled();
      expect(within(projectsCard!).getByText('0 projects')).toBeInTheDocument();
    });

    describe('within Users and Groups taskcard', () => {
      it('should show error icon', () => {
        expect(usersAndGroupsTaskCard.getByRole('img')).toHaveAttribute(
          'aria-label',
          'Error',
        );
      });

      it('should show select all users and groups button', () => {
        expect(
          usersAndGroupsTaskCard.getByText('Select all users and groups'),
        ).toBeEnabled();
      });

      it('should fire correct fix-error handler when fix button is clicked', () => {
        const fixErrorButton = usersAndGroupsTaskCard.getByTestId(
          'buttonFixError',
        );
        userEvent.click(fixErrorButton);

        expect(handleSelectAllUsersAndGroupsFix).toHaveBeenCalledTimes(1);
        expect(handleSkipUsersAndGroupsFix).not.toHaveBeenCalled();
      });
    });

    it('should disable Check for Errors button', () => {
      expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
    });
  });

  describe('when attachments-only but referenced/all users and groups selected', () => {
    let component: RenderResult;
    let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;
    let handleSelectAllUsersAndGroupsFix: () => void;
    let handleSkipUsersAndGroupsFix: () => void;

    beforeEach(() => {
      handleSelectAllUsersAndGroupsFix = jest.fn();
      handleSkipUsersAndGroupsFix = jest.fn();
      component = render(
        <ErrorAttachmentsOnlyButUsersSelected
          onSelectAllUsersAndGroups={handleSelectAllUsersAndGroupsFix}
          onSkipUsersAndGroups={handleSkipUsersAndGroupsFix}
        />,
      );
      usersAndGroupsTaskCard = within(
        component.getByText('Users and groups').closest('section')!,
      );
    });

    it('should disable Check for Errors button', () => {
      expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
    });

    it('should show error message ', () => {
      expect(component.getByText('Invalid selection')).toBeInTheDocument();
      [
        /Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection./,
      ].forEach((errorDescriptionFragment) => {
        expect(
          component.queryAllByText(
            (_, node) =>
              node.textContent!.match(errorDescriptionFragment) !== null,
          ).length,
        ).toBeGreaterThan(0);
      });
      expect(component.queryByText(/skip plans/)).not.toBeInTheDocument();
    });

    describe('within Users and Groups taskcard', () => {
      it('should show error icon', () => {
        expect(usersAndGroupsTaskCard.getByRole('img')).toHaveAttribute(
          'aria-label',
          'Error',
        );
      });

      it('should show skip button', () => {
        expect(
          usersAndGroupsTaskCard.getByText('Skip all users and groups'),
        ).toBeEnabled();
      });

      it('should fire correct fix-error handler when fix button is clicked', () => {
        const fixErrorButton = usersAndGroupsTaskCard.getByTestId(
          'buttonFixError',
        );
        expect(fixErrorButton).toBeInTheDocument();
        userEvent.click(fixErrorButton);

        expect(handleSelectAllUsersAndGroupsFix).not.toHaveBeenCalled();
        expect(handleSkipUsersAndGroupsFix).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should disable "Check for errors" button when no projects are selected but users and groups are disabled', () => {
    const { getByTestId, getByText } = render(
      <InitialStateWithUsersAndGroupsDisabled />,
    );

    expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

    const projectsCard = getByText('Projects').closest('section');
    const projectsSelectButton = within(projectsCard!).getByTestId(
      'buttonSelect',
    );
    expect(projectsSelectButton).toBeInTheDocument();
    expect(projectsSelectButton).toBeEnabled();
    const projectsSkipButton = within(projectsCard!).getByTestId('buttonSkip');
    expect(projectsSkipButton).toBeInTheDocument();
    expect(projectsSkipButton).toBeEnabled();
    expect(
      within(projectsCard!).getByText('No projects selected'),
    ).toBeInTheDocument();

    const usersAndGroupsCard = getByText('Users and groups').closest('section');
    const usersAndGroupsSelectButton = within(usersAndGroupsCard!).getByTestId(
      'buttonSelect',
    );
    expect(usersAndGroupsSelectButton).toBeDisabled();
    expect(
      getByText(
        'Feature flag enabled - no users, groups, or group membership can be migrated',
      ),
    ).toBeInTheDocument();
  });

  it('should enable "Check for errors" button when projects are selected and users and groups are disabled', () => {
    const { getByTestId, getByText } = render(
      <SelectedProjectsWithUsersAndGroupsDisabled />,
    );

    expect(getByTestId('buttonCheckForErrors')).toBeEnabled();

    const projectsCard = getByText('Projects').closest('section');
    const projectsEditButton = within(projectsCard!).getByTestId('buttonEdit');
    expect(projectsEditButton).toBeInTheDocument();
    expect(projectsEditButton).toBeEnabled();
    expect(within(projectsCard!).getByText('12 projects')).toBeInTheDocument();

    const usersAndGroupsCard = getByText('Users and groups').closest('section');
    const usersAndGroupsSelectButton = within(usersAndGroupsCard!).getByTestId(
      'buttonSelect',
    );
    expect(usersAndGroupsSelectButton).toBeDisabled();
    expect(
      getByText(
        'Feature flag enabled - no users, groups, or group membership can be migrated',
      ),
    ).toBeInTheDocument();
  });

  describe('with Advanced Roadmaps task', () => {
    it('should show enabled AR task and disabled projects and users-and-groups task for initial state', () => {
      const { getByText, getByTestId } = render(<WithARInitialState />);

      expect(getByText('Advanced Roadmaps plans')).toBeInTheDocument();
      expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

      const arCard = getByText('Advanced Roadmaps plans').closest('section');
      const arSelectButton = within(arCard!).getByTestId('buttonSelect');
      expect(arSelectButton).toBeInTheDocument();
      expect(arSelectButton).toBeEnabled();
      const arSkipButton = within(arCard!).getByTestId('buttonSkip');
      expect(arSkipButton).toBeInTheDocument();
      expect(arSkipButton).toBeEnabled();
      expect(
        within(arCard!).getByText('No plans selected'),
      ).toBeInTheDocument();

      const projectsCard = getByText('Projects').closest('section');
      const projectsSelectButton = within(projectsCard!).getByTestId(
        'buttonSelect',
      );
      const projectsSkipButton = within(projectsCard!).queryByTestId(
        'buttonSkip',
      );
      expect(projectsSelectButton).toBeInTheDocument();
      expect(projectsSelectButton).toBeDisabled();
      expect(projectsSkipButton).not.toBeInTheDocument();
      expect(
        within(projectsCard!).getByText('No projects selected'),
      ).toBeInTheDocument();

      const usersAndGroupsCard = getByText('Users and groups').closest(
        'section',
      );
      expect(
        within(usersAndGroupsCard!).getByText(
          'No users, groups, or group membership selected',
        ),
      ).toBeInTheDocument();
      const usersAndGroupsSelectButton = within(
        usersAndGroupsCard!,
      ).getByTestId('buttonSelect');
      expect(usersAndGroupsSelectButton).toBeInTheDocument();
      expect(usersAndGroupsSelectButton).toBeDisabled();
    });

    it('should show edit AR task and enabled projects task when plans selected', () => {
      const { getByText, getByTestId } = render(<WithARSelectedPlans />);

      expect(getByText('Advanced Roadmaps plans')).toBeInTheDocument();
      expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

      const arCard = getByText('Advanced Roadmaps plans').closest('section');
      const arEditButton = within(arCard!).getByTestId('buttonEdit');
      expect(arEditButton).toBeInTheDocument();
      expect(arEditButton).toBeEnabled();
      const arSkipButton = within(arCard!).queryByTestId('buttonSkip');
      expect(arSkipButton).not.toBeInTheDocument();
      expect(within(arCard!).getByText('22 plans')).toBeInTheDocument();

      const projectsCard = getByText('Projects').closest('section');
      const projectsSelectButton = within(projectsCard!).getByTestId(
        'buttonSelect',
      );
      expect(projectsSelectButton).toBeInTheDocument();
      expect(projectsSelectButton).toBeEnabled();
      const projectsSkipButton = within(projectsCard!).getByTestId(
        'buttonSkip',
      );
      expect(projectsSkipButton).toBeInTheDocument();
      expect(projectsSkipButton).toBeEnabled();
      expect(
        within(projectsCard!).getByText('No projects selected'),
      ).toBeInTheDocument();

      const usersAndGroupsCard = getByText('Users and groups').closest(
        'section',
      );
      const usersAndGroupsSelectButton = within(
        usersAndGroupsCard!,
      ).getByTestId('buttonSelect');
      expect(usersAndGroupsSelectButton).toBeInTheDocument();
      expect(usersAndGroupsSelectButton).toBeDisabled();
      expect(
        within(usersAndGroupsCard!).getByText(
          'No users, groups, or group membership selected',
        ),
      ).toBeInTheDocument();
    });

    it('should show edit AR task edit projects task and enabled users and groups task when plans and projects selected', () => {
      const { getByText, getByTestId } = render(
        <WithARSelectedPlansAndProjects />,
      );

      expect(getByText('Advanced Roadmaps plans')).toBeInTheDocument();
      expect(getByTestId('buttonCheckForErrors')).toBeDisabled();

      const arCard = getByText('Advanced Roadmaps plans').closest('section');
      const arEditButton = within(arCard!).getByTestId('buttonEdit');
      expect(arEditButton).toBeInTheDocument();
      expect(arEditButton).toBeEnabled();
      const arSkipButton = within(arCard!).queryByTestId('buttonSkip');
      expect(arSkipButton).not.toBeInTheDocument();
      expect(within(arCard!).getByText('22 plans')).toBeInTheDocument();

      const projectsCard = getByText('Projects').closest('section');
      const projectsEditButton = within(projectsCard!).getByTestId(
        'buttonEdit',
      );
      expect(projectsEditButton).toBeInTheDocument();
      expect(projectsEditButton).toBeEnabled();
      expect(
        within(projectsCard!).getByText('12 projects'),
      ).toBeInTheDocument();

      const usersAndGroupsCard = getByText('Users and groups').closest(
        'section',
      );
      const usersAndGroupsSelectButton = within(
        usersAndGroupsCard!,
      ).getByTestId('buttonSelect');
      expect(usersAndGroupsSelectButton).toBeInTheDocument();
      expect(usersAndGroupsSelectButton).toBeEnabled();
      expect(
        within(usersAndGroupsCard!).getByText(
          'No users, groups, or group membership selected',
        ),
      ).toBeInTheDocument();
    });

    it('should show enabled check for error button when AR, projects and users and groups are selected', () => {
      const { getByTestId, getByText } = render(
        <WithARSelectedPlansAndProjectsAndUsers />,
      );

      expect(getByTestId('buttonCheckForErrors')).toBeEnabled();

      const arCard = getByText('Advanced Roadmaps plans').closest('section');
      const arEditButton = within(arCard!).getByTestId('buttonEdit');
      expect(arEditButton).toBeInTheDocument();
      expect(arEditButton).toBeEnabled();
      const arSkipButton = within(arCard!).queryByTestId('buttonSkip');
      expect(arSkipButton).not.toBeInTheDocument();
      expect(within(arCard!).getByText('22 plans')).toBeInTheDocument();

      const projectsCard = getByText('Projects').closest('section');
      const projectsEditButton = within(projectsCard!).getByTestId(
        'buttonEdit',
      );
      expect(projectsEditButton).toBeInTheDocument();
      expect(projectsEditButton).toBeEnabled();
      expect(
        within(projectsCard!).getByText('12 projects'),
      ).toBeInTheDocument();

      const usersAndGroupsCard = getByText('Users and groups').closest(
        'section',
      );
      const usersAndGroupsEditButton = within(usersAndGroupsCard!).getByTestId(
        'buttonEdit',
      );
      expect(usersAndGroupsEditButton).toBeInTheDocument();
      expect(usersAndGroupsEditButton).toBeEnabled();
      expect(
        within(usersAndGroupsCard!).getByText(
          'Only users and groups related to selected projects',
        ),
      ).toBeInTheDocument();
    });

    it('should disable check for error button when no selection has been made for apps', () => {
      const { getByTestId } = render(<WithNoAppSelectionMade />);

      expect(getByTestId('buttonCheckForErrors')).toBeDisabled();
    });

    it('should enable check for error button when no apps data is passed in', () => {
      const { getByTestId } = render(<WithoutApps />);

      expect(getByTestId('buttonCheckForErrors')).toBeEnabled();
    });

    it('should enable check for error button when apps count is 0', () => {
      const { getByTestId } = render(<WithAppsCountZero />);

      expect(getByTestId('buttonCheckForErrors')).toBeEnabled();
    });

    it('should enable check for error button when apps count is more than 0', () => {
      const { getByTestId } = render(<WithAppsCountMoreThanZero />);

      expect(getByTestId('buttonCheckForErrors')).toBeEnabled();
    });

    describe('when attachments-only and AR plans skipped', () => {
      var component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let projectsTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;

      beforeEach(() => {
        component = render(<WithARSkippedPlansAttachmentsOnly />);
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        projectsTaskcard = within(
          component.getByText('Projects').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should enable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeEnabled();
      });

      it('should not show error message', () => {
        expect(
          component.queryByText('Invalid selection'),
        ).not.toBeInTheDocument();
        expect(
          component.queryByText(
            /Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection./,
          ),
        ).not.toBeInTheDocument();
      });

      describe('within AR taskcard', () => {
        it('should show correct message', () => {
          expect(
            arTaskcard.getByText(
              'Since only project attachments are selected, no plans can be migrated.',
            ),
          ).toBeInTheDocument();
        });

        it('should not show error icon', () => {
          expect(arTaskcard.getByRole('img')).not.toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show disabled select button', () => {
          expect(arTaskcard.getByTestId('buttonSelect')).toBeInTheDocument();
          expect(arTaskcard.getByTestId('buttonSelect')).toBeDisabled();
        });
      });

      it('should show enabled Projects edit button and correct text', () => {
        expect(projectsTaskcard.getByText('12 projects')).toBeInTheDocument();
        expect(
          projectsTaskcard.getByText(
            'Only attachments for the selected projects.',
          ),
        ).toBeInTheDocument();
        expect(projectsTaskcard.getByTestId('buttonEdit')).toBeInTheDocument();
        expect(projectsTaskcard.getByTestId('buttonEdit')).toBeEnabled();
      });

      describe('within Users and Groups taskcard', () => {
        it('should show correct message', () => {
          expect(
            usersAndGroupsTaskCard.getByText(
              'Since only project attachments are selected, no users, groups, or group membership can be migrated.',
            ),
          ).toBeInTheDocument();
        });

        it('should disable Select button', () => {
          expect(
            usersAndGroupsTaskCard.getByTestId('buttonSelect'),
          ).toBeDisabled();
        });
      });
    });

    describe('when config-only and AR plans skipped', () => {
      var component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let projectsTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;

      beforeEach(() => {
        component = render(<WithARSkippedPlansConfigOnly />);
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        projectsTaskcard = within(
          component.getByText('Projects').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should disable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
      });

      it('should not show error message', () => {
        expect(
          component.queryByText('Invalid selection'),
        ).not.toBeInTheDocument();
        expect(
          component.queryByText(
            /Since you are migrating configuration only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Configuration only selection./,
          ),
        ).not.toBeInTheDocument();
      });

      describe('within AR taskcard', () => {
        it('should show correct message', () => {
          expect(
            arTaskcard.getByText(
              'Since only project configuration is selected, no plans can be migrated.',
            ),
          ).toBeInTheDocument();
        });

        it('should not show error icon', () => {
          expect(arTaskcard.getByRole('img')).not.toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show disabled select button', () => {
          expect(arTaskcard.getByTestId('buttonSelect')).toBeInTheDocument();
          expect(arTaskcard.getByTestId('buttonSelect')).toBeDisabled();
        });
      });

      it('should show enabled Projects edit button and correct text', () => {
        expect(projectsTaskcard.getByText('12 projects')).toBeInTheDocument();
        expect(
          projectsTaskcard.getByText(
            'Only configuration for the selected projects.',
          ),
        ).toBeInTheDocument();
        expect(projectsTaskcard.getByTestId('buttonEdit')).toBeInTheDocument();
        expect(projectsTaskcard.getByTestId('buttonEdit')).toBeEnabled();
      });

      describe('within Users and Groups taskcard', () => {
        it('should show correct message', () => {
          expect(
            usersAndGroupsTaskCard.getByText(
              'No users, groups, or group membership selected',
            ),
          ).toBeInTheDocument();
        });

        it('should enable Select button', () => {
          expect(
            usersAndGroupsTaskCard.getByTestId('buttonSelect'),
          ).toBeEnabled();
        });
      });
    });

    describe('when config-only and AR plans skipped and users selected', () => {
      var component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let projectsTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;

      beforeEach(() => {
        component = render(<WithARSkippedPlansSelectedUsersConfigOnly />);
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        projectsTaskcard = within(
          component.getByText('Projects').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should enable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeEnabled();
      });

      it('should not show error message', () => {
        expect(
          component.queryByText('Invalid selection'),
        ).not.toBeInTheDocument();
        expect(
          component.queryByText(
            /Since you are migrating configuration only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Configuration only selection./,
          ),
        ).not.toBeInTheDocument();
      });

      describe('within AR taskcard', () => {
        it('should show correct message', () => {
          expect(
            arTaskcard.getByText(
              'Since only project configuration is selected, no plans can be migrated.',
            ),
          ).toBeInTheDocument();
        });

        it('should not show error icon', () => {
          expect(arTaskcard.getByRole('img')).not.toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show disabled select button', () => {
          expect(arTaskcard.getByTestId('buttonSelect')).toBeInTheDocument();
          expect(arTaskcard.getByTestId('buttonSelect')).toBeDisabled();
        });
      });

      it('should show enabled Projects edit button and correct text', () => {
        expect(projectsTaskcard.getByText('12 projects')).toBeInTheDocument();
        expect(
          projectsTaskcard.getByText(
            'Only configuration for the selected projects.',
          ),
        ).toBeInTheDocument();
        expect(projectsTaskcard.getByTestId('buttonEdit')).toBeInTheDocument();
        expect(projectsTaskcard.getByTestId('buttonEdit')).toBeEnabled();
      });

      describe('within Users and Groups taskcard', () => {
        it('should show correct message', () => {
          expect(
            usersAndGroupsTaskCard.getByText(
              'All users and groups from the Jira directory',
            ),
          ).toBeInTheDocument();
        });

        it('should enable Edit button', () => {
          expect(
            usersAndGroupsTaskCard.getByTestId('buttonEdit'),
          ).toBeEnabled();
        });
      });
    });

    describe('when attachments-only and AR plans selected', () => {
      const handleUnselectAllPlans = jest.fn();
      var component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;

      beforeEach(() => {
        component = render(
          <WithARErrorAttachmentsOnlyButPlansSelected
            onUnselectAllPlans={handleUnselectAllPlans}
          />,
        );
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should show error message', () => {
        expect(component.getByText('Invalid selection')).toBeInTheDocument();
        [
          /Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection./,
        ].forEach((errorDescriptionFragment) => {
          expect(
            component.queryAllByText(
              (_, node) =>
                node.textContent!.match(errorDescriptionFragment) !== null,
            ).length,
          ).toBeGreaterThan(0);
        });
        expect(
          component.queryByText(/skip migrating all users and groups/),
        ).not.toBeInTheDocument();
      });

      describe('within AR taskcard', () => {
        it('should show error icon', () => {
          expect(arTaskcard.getByRole('img')).toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show skip button', () => {
          expect(arTaskcard.getByText('Skip plans')).toBeEnabled();
        });

        it('should fire unselectAllPlans handler when fix button is clicked', () => {
          const fixErrorButton = arTaskcard.getByTestId('buttonFixError');
          expect(fixErrorButton).toBeInTheDocument();
          userEvent.click(fixErrorButton);

          expect(handleUnselectAllPlans).toHaveBeenCalledTimes(1);
        });
      });

      describe('within Users and Groups taskcard', () => {
        it('should show correct message', () => {
          expect(
            usersAndGroupsTaskCard.getByText(
              'Since only project attachments are selected, no users, groups, or group membership can be migrated.',
            ),
          ).toBeInTheDocument();
        });

        it('should disable Select button', () => {
          expect(usersAndGroupsTaskCard.getByText('Select')).toBeDisabled();
        });
      });

      it('should disable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
      });
    });

    describe('when attachments-only and referenced/all users and groups selected', () => {
      let component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;
      let handleSelectAllUsersAndGroupsFix: () => void;
      let handleSkipUsersAndGroupsFix: () => void;

      beforeEach(() => {
        handleSelectAllUsersAndGroupsFix = jest.fn();
        handleSkipUsersAndGroupsFix = jest.fn();
        component = render(
          <WithARErrorAttachmentsOnlyButUsersSelected
            onSelectAllUsersAndGroups={handleSelectAllUsersAndGroupsFix}
            onSkipUsersAndGroups={handleSkipUsersAndGroupsFix}
          />,
        );
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should show error message ', () => {
        expect(component.getByText('Invalid selection')).toBeInTheDocument();
        [
          /Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection./,
        ].forEach((errorDescriptionFragment) => {
          expect(
            component.queryAllByText(
              (_, node) =>
                node.textContent!.match(errorDescriptionFragment) !== null,
            ).length,
          ).toBeGreaterThan(0);
        });
        expect(component.queryByText(/skip plans/)).not.toBeInTheDocument();
      });

      describe('within AR taskcard', () => {
        it('should show correct message', () => {
          expect(
            arTaskcard.getByText(
              `Since only project attachments are selected, no plans can be migrated.`,
            ),
          ).toBeInTheDocument();
        });

        it('should disable Select button', () => {
          expect(arTaskcard.getByText('Select')).toBeDisabled();
        });

        it(`should hide the Skip plans button`, () => {
          expect(arTaskcard.queryByText(`Skip plans`)).not.toBeInTheDocument();
        });
      });

      describe('within Users and Groups taskcard', () => {
        it('should show error icon', () => {
          expect(usersAndGroupsTaskCard.getByRole('img')).toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show skip button', () => {
          expect(
            usersAndGroupsTaskCard.getByText('Skip all users and groups'),
          ).toBeEnabled();
        });

        it('should fire correct fix-error handler when fix button is clicked', () => {
          const fixErrorButton = usersAndGroupsTaskCard.getByTestId(
            'buttonFixError',
          );
          expect(fixErrorButton).toBeInTheDocument();
          userEvent.click(fixErrorButton);

          expect(handleSelectAllUsersAndGroupsFix).not.toHaveBeenCalled();
          expect(handleSkipUsersAndGroupsFix).toHaveBeenCalledTimes(1);
        });
      });

      it('should disable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
      });

      [undefined, { numberOfPlans: 0 }].forEach(
        (advancedRoadmapsTaskDataSelection) => {
          it('should disable Select button when not migrating plans', () => {
            cleanup();
            const component = render(
              <WithARErrorAttachmentsOnlyButUsersSelected
                advancedRoadmapsTaskDataSelection={
                  advancedRoadmapsTaskDataSelection
                }
              />,
            );
            const arTaskcard = within(
              component
                .getByText('Advanced Roadmaps plans')
                .closest('section')!,
            );
            expect(arTaskcard.getByText('Select')).toBeDisabled();
          });
        },
      );
    });

    describe('when attachments-only, AR plans, and referenced users and groups selected', () => {
      let component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;
      beforeEach(() => {
        component = render(
          <WithARErrorAttachmentsOnlyButPlansAndUsersSelected />,
        );
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should show error message', () => {
        expect(component.getByText('Invalid selection')).toBeInTheDocument();
        [
          /Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection./,
        ].forEach((errorDescriptionFragment) => {
          expect(
            component.queryAllByText(
              (_, node) =>
                node.textContent!.match(errorDescriptionFragment) !== null,
            ).length,
          ).toBeGreaterThan(0);
        });
      });

      describe('within AR taskcard', () => {
        it('should show error icon', () => {
          expect(arTaskcard.getByRole('img')).toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show skip button', () => {
          expect(arTaskcard.getByText('Skip plans')).toBeEnabled();
        });
      });

      describe('within Users and Groups taskcard', () => {
        it('should show error icon', () => {
          expect(usersAndGroupsTaskCard.getByRole('img')).toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show skip button', () => {
          expect(
            usersAndGroupsTaskCard.getByText('Skip all users and groups'),
          ).toBeEnabled();
        });
      });

      it('should disable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
      });
    });

    describe('when config-only and AR plans selected', () => {
      const handleUnselectAllPlans = jest.fn();
      var component: RenderResult;
      let arTaskcard: BoundFunctions<typeof queries>;
      let projectsTaskcard: BoundFunctions<typeof queries>;
      let usersAndGroupsTaskCard: BoundFunctions<typeof queries>;

      beforeEach(() => {
        component = render(
          <WithARErrorConfigOnlyButPlansSelected
            onUnselectAllPlans={handleUnselectAllPlans}
          />,
        );
        arTaskcard = within(
          component.getByText('Advanced Roadmaps plans').closest('section')!,
        );
        projectsTaskcard = within(
          component.getByText('Projects').closest('section')!,
        );
        usersAndGroupsTaskCard = within(
          component.getByText('Users and groups').closest('section')!,
        );
      });

      it('should show error message', () => {
        expect(component.getByText('Invalid selection')).toBeInTheDocument();
        expect(
          component.getByText(
            /Since you are migrating configuration only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Configuration only selection./,
          ),
        ).toBeInTheDocument();
      });

      describe('within AR taskcard', () => {
        it('should show error icon', () => {
          expect(arTaskcard.getByRole('img')).toHaveAttribute(
            'aria-label',
            'Error',
          );
        });

        it('should show skip button', () => {
          expect(arTaskcard.getByText('Skip plans')).toBeEnabled();
        });

        it('should fire unselectAllPlans handler when fix button is clicked', () => {
          const fixErrorButton = arTaskcard.getByTestId('buttonFixError');
          expect(fixErrorButton).toBeInTheDocument();
          userEvent.click(fixErrorButton);

          expect(handleUnselectAllPlans).toHaveBeenCalledTimes(1);
        });
      });

      describe('within Projectts taskcard', () => {
        it('should show correct message', () => {
          expect(projectsTaskcard.getByText('12 projects')).toBeInTheDocument();
          expect(
            projectsTaskcard.getByText(
              'Only configuration for the selected projects.',
            ),
          ).toBeInTheDocument();
        });

        it('should enable Edit button', () => {
          expect(projectsTaskcard.getByTestId('buttonEdit')).toBeEnabled();
        });
      });

      describe('within Users and Groups taskcard', () => {
        it('should show correct message', () => {
          expect(
            usersAndGroupsTaskCard.getByText(
              'No users, groups, or group membership selected',
            ),
          ).toBeInTheDocument();
        });

        it('should enable Select button', () => {
          expect(
            usersAndGroupsTaskCard.getByTestId('buttonSelect'),
          ).toBeEnabled();
        });
      });

      it('should disable Check for Errors button', () => {
        expect(component.getByTestId('buttonCheckForErrors')).toBeDisabled();
      });
    });
  });

  [
    <InitialState />,
    <SelectedProjects />,
    <SelectedProjectsAndUsersGroups />,
  ].forEach((component) => {
    it('should not show error message for non-error state', () => {
      const { queryByText } = render(component);

      expect(queryByText('Invalid selection')).not.toBeInTheDocument();
      expect(
        queryByText(
          `Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection.`,
        ),
      ).not.toBeInTheDocument();
    });
  });
});
