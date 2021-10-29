/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import {
  Task,
  AccordionItemButton,
  AccordionItemButtonText,
  AccordionItemLink,
  AccordionItemContainer,
} from '../..';

export const numberOfTasksCompleted = (tasks: Task[]): number => {
  return tasks.reduce((acc, task) => {
    return task.completed ? acc + 1 : acc;
  }, 0);
};

export const generateTask = (id: string): Task => {
  const complete = Number(id) < 4;
  return {
    id: id,
    completed: complete,
    title: `Task Number ${id}`,
    children: (
      <p>
        {complete
          ? `You completed task ${id}`
          : `You should start on task ${id}`}
      </p>
    ),
  };
};

export const sampleTaskList: Task[] = Array(7)
  .fill(null)
  .map((_, index) => generateTask(String(index + 1)));

/**
 * Sample Quick Start Items - Can be constructed by consumer, for demonstration purposes only.
 */
export const sampleQuickStartItems: Task[] = [
  {
    id: '1',
    completed: true,
    title: `Create a project`,
    children: (
      <AccordionItemContainer>
        <p style={{ fontWeight: 500 }}>
          Viola, you&apos;ve already created a project!
        </p>
        <p style={{ paddingBottom: 15 }}>
          Each Jira project has its own unique issues, sprints, and workflows.
          You can create as many projects as you want.
        </p>
        <AccordionItemButton
          onClick={(e: React.MouseEvent<HTMLElement>, analyticsEvent: any) => {
            e.stopPropagation();
            console.log(analyticsEvent);
            console.log('Create another project button clicked');
          }}
        >
          Create another project
        </AccordionItemButton>
      </AccordionItemContainer>
    ),
  },
  {
    id: '2',
    completed: false,
    title: `Create your first Issue`,
    children: (
      <AccordionItemContainer>
        <p style={{ paddingBottom: 5 }}>
          Issues are individual pieces of work that you assign teammates.
        </p>
        <p style={{ fontWeight: 500, paddingBottom: 15 }}>
          Issues can be tasks or stories.
        </p>
        <AccordionItemLink
          onClick={(e: React.MouseEvent<HTMLElement>, analyticsEvent: any) => {
            e.stopPropagation();
            console.log(analyticsEvent);
            console.log('View Issue Tutorial clicked');
          }}
        >
          View Issue Tutorial
        </AccordionItemLink>
      </AccordionItemContainer>
    ),
  },
  {
    id: '3',
    completed: false,
    title: `Invite your teammates`,
    children: (
      <AccordionItemContainer>
        <p style={{ margin: 0, paddingBottom: 15 }}>Get your team together!</p>
        <AccordionItemButton
          onClick={(e: React.MouseEvent<HTMLElement>, analyticsEvent: any) => {
            e.stopPropagation();
            console.log(analyticsEvent);
            console.log('Send invites button clicked');
          }}
        >
          <AccordionItemButtonText>Send invites</AccordionItemButtonText>
        </AccordionItemButton>
      </AccordionItemContainer>
    ),
  },
  {
    id: '4',
    completed: false,
    title: `Explore integrations`,
    children: (
      <AccordionItemContainer>
        <p style={{ margin: 0, paddingBottom: 15 }}>
          Integrate with the tools you already use.
        </p>
        <AccordionItemButton
          onClick={(e: React.MouseEvent<HTMLElement>, analyticsEvent: any) => {
            e.stopPropagation();
            console.log(analyticsEvent);
            console.log('View Marketplace button clicked');
          }}
        >
          <AccordionItemButtonText>View Marketplace</AccordionItemButtonText>
        </AccordionItemButton>
      </AccordionItemContainer>
    ),
  },
  {
    id: '5',
    completed: false,
    title: `Find help`,
    children: (
      <AccordionItemContainer>
        <p style={{ margin: 0, paddingBottom: 15 }}>
          Get the right level of help, right when you need it.
        </p>
        <AccordionItemButton
          onClick={(e: React.MouseEvent<HTMLElement>, analyticsEvent: any) => {
            e.stopPropagation();
            console.log(analyticsEvent);
            console.log('View Jira support button clicked');
          }}
        >
          <AccordionItemButtonText>View Jira support</AccordionItemButtonText>
        </AccordionItemButton>
        <AccordionItemLink
          href="#"
          style={{ paddingLeft: 15 }}
          onClick={(e: React.MouseEvent<HTMLElement>, analyticsEvent: any) => {
            e.stopPropagation();
            console.log(analyticsEvent);
            console.log('Contact support button clicked');
          }}
        >
          Contact support
        </AccordionItemLink>
      </AccordionItemContainer>
    ),
  },
];
