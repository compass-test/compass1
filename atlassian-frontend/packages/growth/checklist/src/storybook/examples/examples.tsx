// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, number, text } from '@storybook/addon-knobs';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionDescriptionWrapper,
  AccordionHeaderWrapper,
  ChecklistItem,
  ChecklistContainer,
  ChecklistProgressBar,
  ChecklistButton,
  Checklist,
  Task,
} from '../..';
import Button from '@atlaskit/button/standard-button';
import {
  numberOfTasksCompleted,
  sampleQuickStartItems,
  sampleTaskList,
} from '../helpers/ChecklistUtils';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import {
  ChecklistInteractionManagerWrapper,
  CustomHeaderButtonWrapper,
  CustomHeaderWrapper,
  FooterWrapper,
} from './styled';
import { IntlProvider } from 'react-intl';

const stories = storiesOf('Onboarding Checklist', module);

const ExtraContent = ({ maxHeight }: { maxHeight?: number }) =>
  maxHeight ? (
    <>
      <p style={{ marginTop: maxHeight ? 100 : 0 }}>A little more content!</p>
      <p style={{ marginTop: maxHeight ? 100 : 0 }}>A little more content!</p>
      <p style={{ marginTop: maxHeight ? 100 : 0 }}>A little more content!</p>
      <p style={{ marginTop: maxHeight ? 100 : 0 }}>The last content!</p>
    </>
  ) : null;

stories.add('Accordion Item Button', () => {
  return (
    <div style={{ width: 400, margin: 10 }}>
      <AccordionItemButton>Button</AccordionItemButton>
    </div>
  );
});

stories.add('Accordion Item Button disabled', () => {
  return (
    <div style={{ width: 400, margin: 10 }}>
      <AccordionItemButton isDisabled>Button</AccordionItemButton>
    </div>
  );
});

stories.add('Accordion Item Component', () => {
  const maxHeight = boolean('specify max height', false)
    ? number('maxHeight', 400)
    : undefined;
  return (
    <div style={{ width: 400, margin: 10 }}>
      <AccordionItem
        id={'1'}
        onClick={action('Item clicked')}
        expanded={boolean('isExpanded', true)}
      >
        <>
          <AccordionHeaderWrapper>
            <h4 style={{ marginTop: 0 }}>A Sample Title</h4>
          </AccordionHeaderWrapper>
          <AccordionDescriptionWrapper maxHeight={maxHeight}>
            <p>Some content in here!</p>
            <ExtraContent maxHeight={maxHeight} />
          </AccordionDescriptionWrapper>
        </>
      </AccordionItem>
    </div>
  );
});

stories.add('Checklist Item Component', () => {
  const maxHeight = boolean('specify max height', false)
    ? number('maxHeight', 400)
    : undefined;
  return (
    <div style={{ width: 400, margin: 10 }}>
      <AccordionItem
        id={'1'}
        onClick={action('Item clicked')}
        expanded={boolean('isExpanded', true)}
      >
        <ChecklistItem
          id={'1'}
          title={'Start here'}
          completed
          maxHeight={maxHeight}
        >
          <>
            <iframe
              src="https://www.youtube.com/embed/5iFfQVWktCA"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Create and Share Pages"
              width={'100%'}
            />
            <ExtraContent maxHeight={maxHeight} />
          </>
        </ChecklistItem>
      </AccordionItem>
    </div>
  );
});

stories.add('Checklist Container', () => {
  const ChecklistContainerManager = () => {
    const [selectedTask, setSelectedTask] = useState(sampleTaskList[0].id);
    return (
      <div style={{ width: 400 }}>
        <ChecklistContainer
          tasks={sampleTaskList}
          expandedTask={selectedTask}
          onTaskExpand={setSelectedTask}
        />
      </div>
    );
  };
  return <ChecklistContainerManager />;
});

stories.add('Checklist Progress Bar', () => {
  const ProgressManager = () => {
    const [progress, setProgress] = useState(0.5);

    const onIncrement = (progress: number) => (): void => {
      setProgress(progress + 0.1);
    };

    const onDecrement = (progress: number) => (): void => {
      setProgress(progress - 0.1);
    };

    const containerStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      background: '#eaeaea',
      padding: 20,
      width: 600,
    };

    return (
      <>
        <div style={containerStyle}>
          <ChecklistProgressBar value={progress} />
        </div>
        <Button style={{ margin: 10 }} onClick={onDecrement(progress)}>
          Decrement
        </Button>
        <Button onClick={onIncrement(progress)}>Increment</Button>
      </>
    );
  };
  return <ProgressManager />;
});

stories.add('Checklist Component', () => {
  const ChecklistManager = () => {
    const [checklistState, updateChecklistState] = useState({
      isChecklistOpen: false,
      selectedTask: sampleTaskList[0].id,
    });

    const handleChecklistVisibility = (visible: boolean) => (
      e: React.MouseEvent<HTMLElement>,
    ): void => {
      e.preventDefault();
      updateChecklistState({ ...checklistState, isChecklistOpen: visible });
    };

    const handleSelectedTask = (id: Task['id']) => {
      updateChecklistState({ ...checklistState, selectedTask: id });
    };

    return (
      <>
        <Button
          style={{ margin: 10 }}
          onClick={handleChecklistVisibility(true)}
        >
          Open the checklist!
        </Button>
        <div style={{ width: 400, height: 800 }}>
          <Checklist
            title="Welcome to Confluence"
            tasks={sampleTaskList}
            isOpen={checklistState.isChecklistOpen}
            onClose={handleChecklistVisibility(false)}
            footer={{
              dismissTitle: 'Dismiss Quickstart',
              onDismiss: handleChecklistVisibility(false),
            }}
            expandedTask={checklistState.selectedTask}
            onTaskExpand={handleSelectedTask}
          />
        </div>
      </>
    );
  };

  return <ChecklistManager />;
});

stories.add('Checklist Button', () => {
  return (
    <IntlProvider locale="en">
      <div style={{ margin: 10 }}>
        <ChecklistButton
          isOpen
          title={text('title', 'Learn Confluence')}
          // eslint-disable-next-line no-console
          onClick={() => console.log('clicked!')}
          completed={boolean('completed', false)}
          onDismiss={
            boolean('hasDismissButton', true)
              ? action('Dismiss function called')
              : undefined
          }
        />
      </div>
    </IntlProvider>
  );
});

stories.add('Checklist & Checklist Button Interaction', () => {
  interface ChecklistState {
    isChecklistOpen: boolean;
    selectedTask?: string;
    tasks: Task[];
  }
  const ChecklistInteractionManager = () => {
    const [checklistState, updateChecklistState] = useState<ChecklistState>({
      isChecklistOpen: true,
      selectedTask: sampleQuickStartItems[0].id,
      tasks: [...sampleQuickStartItems],
    });

    const completedTasks: number = numberOfTasksCompleted(checklistState.tasks);
    const completed: boolean =
      completedTasks / checklistState.tasks.length === 1;

    const handleChecklistVisibility = (visible: boolean) => (
      e: React.MouseEvent<HTMLElement>,
    ): void => {
      e.preventDefault();
      updateChecklistState({ ...checklistState, isChecklistOpen: visible });
    };

    const handleSelectedTask = (id: Task['id']): void => {
      if (id) {
        checklistState.tasks[Number(id) - 1].completed = true;
        updateChecklistState({ ...checklistState, selectedTask: id });
      }
    };

    return (
      <>
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <IntlProvider locale="en">
            <ChecklistButton
              title="Quickstart"
              isOpen={!checklistState.isChecklistOpen}
              completed={completed}
              onClick={handleChecklistVisibility(true)}
            />
          </IntlProvider>
        </div>
        <div style={{ width: 400, height: 800 }}>
          <Checklist
            title="Jira Quickstart"
            tasks={checklistState.tasks}
            isOpen={checklistState.isChecklistOpen}
            onClose={handleChecklistVisibility(false)}
            footer={{
              dismissTitle: 'Dismiss Quickstart',
              onDismiss: handleChecklistVisibility(false),
            }}
            expandedTask={checklistState.selectedTask}
            onTaskExpand={handleSelectedTask}
          />
        </div>
      </>
    );
  };

  return <ChecklistInteractionManager />;
});

stories.add('Checklist with Custom Footer Wrapper', () => {
  interface ChecklistState {
    isChecklistOpen: boolean;
    selectedTask?: string;
    tasks: Task[];
  }

  const ChecklistInteractionManager = () => {
    const [checklistState] = useState<ChecklistState>({
      isChecklistOpen: true,
      selectedTask: sampleQuickStartItems[0].id,
      tasks: [...sampleQuickStartItems],
    });

    return (
      <>
        <div
          style={{
            position: 'fixed',
            width: 400,
            height: 400,
            top: 10,
          }}
        >
          <Checklist
            title="Jira Quickstart"
            tasks={checklistState.tasks}
            isOpen
            onClose={() => {}}
            onTaskExpand={() => {}}
            footer={{
              onDismiss: () => {},
              dismissTitle: 'Dismiss Quickstart',
              wrapper: FooterWrapper,
            }}
          />
        </div>
      </>
    );
  };

  return <ChecklistInteractionManager />;
});

stories.add('Checklist with Custom body item', () => {
  interface ChecklistState {
    isChecklistOpen: boolean;
    selectedTask?: string;
    tasks: Task[];
  }

  const CustomItem = () => {
    const [text, setText] = useState('Click me!');

    return (
      <div
        style={{
          background: 'white',
          padding: '4px',
          boxShadow:
            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
        }}
        onClick={() =>
          setText(
            'Custom component that can do whatever you want with whatever styling you want as well',
          )
        }
      >
        {text}
      </div>
    );
  };

  const ChecklistInteractionManager = () => {
    const [checklistState] = useState<ChecklistState>({
      isChecklistOpen: true,
      selectedTask: sampleQuickStartItems[0].id,
      tasks: [...sampleQuickStartItems],
    });

    return (
      <>
        <ChecklistInteractionManagerWrapper>
          <Checklist
            title="Jira Quickstart"
            tasks={checklistState.tasks}
            isOpen
            onClose={() => {}}
            onTaskExpand={action('Task expanded')}
            footer={{
              onDismiss: action('Checklist dismissed'),
              dismissTitle: 'Dismiss Quickstart',
              wrapper: FooterWrapper,
            }}
            postTasksComponent={<CustomItem />}
          />
        </ChecklistInteractionManagerWrapper>
      </>
    );
  };

  return <ChecklistInteractionManager />;
});

stories.add('Checklist with Custom header', () => {
  interface ChecklistState {
    isChecklistOpen: boolean;
    selectedTask?: string;
    tasks: Task[];
  }

  const CustomHeader = () => {
    const onClick = action('Go back button clicked');
    return (
      <CustomHeaderWrapper>
        <Button
          iconBefore={
            <ArrowLeftIcon label="go back" primaryColor={colors.N0} />
          }
          title="Button"
          onClick={onClick}
        />
        <CustomHeaderButtonWrapper onClick={onClick}>
          Quickstart
        </CustomHeaderButtonWrapper>
      </CustomHeaderWrapper>
    );
  };

  const ChecklistInteractionManager = () => {
    const [checklistState] = useState<ChecklistState>({
      isChecklistOpen: true,
      selectedTask: sampleQuickStartItems[0].id,
      tasks: [...sampleQuickStartItems],
    });

    return (
      <>
        <ChecklistInteractionManagerWrapper>
          <Checklist
            title="Your Premium plan"
            tasks={checklistState.tasks}
            isOpen
            onClose={action('Checklist closed')}
            onTaskExpand={action('Task expanded')}
            footer={{
              onDismiss: action('Checklist dismissed'),
              dismissTitle: 'Dismiss Quickstart',
              wrapper: FooterWrapper,
            }}
            header={<CustomHeader />}
          />
        </ChecklistInteractionManagerWrapper>
      </>
    );
  };

  return <ChecklistInteractionManager />;
});
