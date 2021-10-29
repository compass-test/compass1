// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import {
  Background,
  ChecklistTitle,
  ContentWrapper,
  FlexContent,
  OverflowWrapper,
  BodyWrapper,
} from './styled';
import { ChecklistContainer, ChecklistProgressBar } from '../../index';
import { ChecklistContainerProps } from '../checklist-container/ChecklistContainer';
import ChecklistBackground from './ChecklistBackground';
import ChecklistFooter, { ChecklistFooterProps } from './ChecklistFooter';
import ChecklistHeader from './ChecklistHeader';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export interface ChecklistProps {
  title: string;
  isOpen: boolean;
  onClose: (
    e: React.MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  header?: React.ReactNode;
  footer?: ChecklistFooterProps;
  postTasksComponent?: React.ReactNode;
}

export default (props: ChecklistProps & ChecklistContainerProps) => {
  const { title, isOpen, onClose, footer } = props;
  const { tasks, onTaskExpand, expandedTask } = props;
  const { header, postTasksComponent } = props;

  const completedTasks: number = tasks.reduce((acc, task) => {
    return task.completed ? acc + 1 : acc;
  }, 0);

  const percentCompleted: number = completedTasks / tasks.length;
  const completed: boolean = percentCompleted === 1;

  return (
    <>
      {isOpen && (
        <OverflowWrapper>
          <FlexContent>
            <Background done={completed}>
              <ChecklistBackground />
            </Background>
            <ContentWrapper>
              <ChecklistHeader header={header} onClose={onClose} />
              <ChecklistTitle>{title}</ChecklistTitle>
              <BodyWrapper>
                {!completed && (
                  <ChecklistProgressBar value={percentCompleted} />
                )}
                <ChecklistContainer
                  tasks={tasks}
                  expandedTask={expandedTask}
                  onTaskExpand={onTaskExpand}
                />
                {postTasksComponent && postTasksComponent}
              </BodyWrapper>
            </ContentWrapper>
          </FlexContent>
          {footer && <ChecklistFooter {...footer} />}
        </OverflowWrapper>
      )}
    </>
  );
};
