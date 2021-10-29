import React, { Component, Children } from 'react';
import { useRenderAnalyzer } from '@atlassian/react-render-analyzer';
import keycode from 'keycode';

export const Title = ({ children }) => <h1>{children}</h1>;

export const Entry = ({ children, ...props }) => (
  <div>
    <input placeholder="Type to create task..." {...props} />
  </div>
);

export const TaskList = ({ children }) => (
  <>
    <h3>Tasks</h3>
    <ul>
      {Children.map(children, task => (
        <li>{task}</li>
      ))}
    </ul>
  </>
);

export const Task = ({ children, id, done, onCheck }) => (
  <label htmlFor={id}>
    <input id={id} type="checkbox" checked={done} onChange={onCheck} />
    <span style={done ? { textDecoration: 'line-through' } : undefined}>
      {children}
    </span>
  </label>
);

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      value: '',
      tasks: [
        {
          label: 'Add some more tasks.',
          done: false,
        },
      ],
    };
  }

  render = () => {
    return (
      <>
        <Title>To do</Title>
        <Entry
          value={this.state.value}
          onChange={event =>
            this.setState({
              value: event.target.value,
              tasks: [...this.state.tasks],
            })
          }
          onKeyUp={event => {
            if (keycode(event) === 'enter') {
              this.setState(state => ({
                value: '',
                tasks: [
                  ...state.tasks,
                  {
                    label: state.value,
                    done: false,
                  },
                ],
              }));
            }
          }}
        />
        <TaskList>
          {this.state.tasks.map((task, index) => (
            <Task
              key={index}
              id={index}
              done={task.done}
              onCheck={() =>
                this.setState(state => {
                  const item = state.tasks[index];
                  const next = state.tasks.concat();
                  next.splice(index, 1, {
                    ...item,
                    done: !item.done,
                  });

                  return {
                    tasks: next,
                  };
                })
              }
            >
              {task.label}
            </Task>
          ))}
        </TaskList>
      </>
    );
  };
}

export default () => {
  const Analyzer = useRenderAnalyzer();

  return (
    <Analyzer>
      <App />
    </Analyzer>
  );
};
