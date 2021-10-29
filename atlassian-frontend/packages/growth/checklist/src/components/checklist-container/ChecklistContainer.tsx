// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import CheckListItem, { Task } from '../checklist-item/ChecklistItem';
import { AccordionItem } from '../..';

export interface ChecklistContainerProps {
  tasks: Task[];
  onTaskExpand: (id: Task['id']) => void;
  expandedTask?: Task['id'];
}

export default ({
  tasks,
  onTaskExpand,
  expandedTask,
}: ChecklistContainerProps) => (
  <>
    {tasks.map((task) => {
      const isOpen: boolean = task.id === expandedTask;
      return (
        <AccordionItem
          key={task.id}
          id={task.id}
          expanded={isOpen}
          onClick={onTaskExpand}
        >
          <CheckListItem {...task} />
        </AccordionItem>
      );
    })}
  </>
);
