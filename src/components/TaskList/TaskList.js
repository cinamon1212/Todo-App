import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onEditingSubmit } = this.props;

    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <Task
            key={todo.id}
            {...todo}
            onDeleted={() => onDeleted(todo.id)}
            onToggleDone={() => onToggleDone(todo.id)}
            onEditingSubmit={onEditingSubmit}
          />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditingSubmit: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: {},
};

export default TaskList;
