# `Checklist Component`

A reusable item container for showing pending and completed tasks.

This package contains a few smaller reusable components, including an accordion-item, button, and progress bar.
This README will cover usage of most of them. See the storybook examples in `checklist.stories.tsx` to get a better idea
of the usage / component interaction.

## Usage

### Accordion Item

An accordion item is a simple, collapsible item container. While expanded it will show the content inside, otherwise
just the header contents will be shown. There is a transition for opening and closing. Here's a sample usage of it.

```typescript jsx
import {
  AccordionItem,
  AccordionDescriptionWrapper,
  ACCORDION_CLASS_NAME,
} from '@atlassiansox/checklist';

<AccordionItem
  id="1"
  onClick={() => console.log('item clicked!')}
  expanded={true}
>
  <>
    <h4>A Sample Title</h4>
    <AccordionDescriptionWrapper>
      <p>Some content in here!</p>
    </AccordionDescriptionWrapper>
  </>
</AccordionItem>;
```

You should use the `AccordionDescriptionWrapper` component that is exported out from `AccordionItem` as it contains the
CSS properties for `react-transition-group` to function properly with smooth animations.

If you wish to override the transitions with your own, you may implement your own as long as it follows the
`react-transition-group` conventions.

```typescript jsx
import { ACCORDION_CLASS_NAME } from '@atlassiansox/checklist';

export const accordionDescriptionWrapper = styled.div`
  padding: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 200ms, padding 200ms, opacity 200ms;
  max-height: 0;
  box-sizing: content-box;

  // you'll need this -enter
  .${ACCORDION_CLASS_NAME}-enter & {
    max-height: 0;
    opacity: 0;
  }

  // and styling for -enter-active and -enter-done
  .${ACCORDION_CLASS_NAME}-enter-active, .${ACCORDION_CLASS_NAME}-enter-done & {
    max-height: 400px;
    opacity: 1;
  }
`;
```

### Checklist Item

A child JSX Element for `AccordionItem` from above. Here, each title is accompanied by a check mark icon (complete or not),
a title, and the body of the item. This component is the building block for `ChecklistContainer` which wraps this inside
of `AccordionItem`.

```typescript jsx
import { ChecklistItem } from '@atlassiansox/checklist';

<ChecklistItem id="1" title="Task Number 1" completed={false}>
  <p>Content in here!</p>
</ChecklistItem>;
```

And here's what the final implementation looks like under the hood inside `ChecklistContainer`.

```typescript jsx
import { AccordionItem, ChecklistItem, Task } from '@atlassiansox/checklist';

const task: Task = { id: '1', completed: true, title: 'Task 1' };

<AccordionItem
  key={task.id}
  id={task.id}
  expanded={true}
  onClick={(id: Task['id']) => console.log(id)}
>
  <ChecklistItem {...task}>
    <p>Content in here!</p>
  </ChecklistItem>
</AccordionItem>;
```

### Checklist Container

A container for holding Checklist items, `ChecklistItem`. You can pass in a task array, which task is currently expanded, and a callback
when a task is selected.

```typescript jsx
import { ChecklistContainer, ChecklistItem, Task } from "@atlassiansox/checklist";

const sampleTaskList: Task[] = [{id: "1", completed: true, title: "Task 1"}]

<ChecklistContainer
    tasks={sampleTaskList}
    expandedTask={sampleTaskList[0].id}
    onTaskExpand={(id: Task['id']) => console.log(id)}
/>
```

### Checklist

A stateless checklist component that composes of a `ChecklistContainer` and other functional components like
`ChecklistProgressBar` and `ChecklistFooter`.

```typescript jsx
import { Checklist, Task } from "@atlassiansox/checklist";

const sampleTaskList: Task[] = [{id: "1", completed: true, title: "Task 1"}]

<Checklist
    title={'Welcome to Confluence'}
    subtitle={`I am a subtitle`}
    tasks={sampleTaskList}
    isOpen={true}
    onClose={() => console.log("close me!")}
    footer={{
        title: 'Finished with this list?',
        dismissTitle: 'Remove it',
        onDismiss: () => console.log("dismiss me!"),
    }}
    expandedTask={sampleTaskList[0].id}
    onTaskExpand={(id: Task['id'] => console.log(id))}
    postTasksComponent={<div>a custom component positioned right after the tasks</div>}
/>
```

### Misc

Feel free to reach out to @brandon on slack for further support / questions.
