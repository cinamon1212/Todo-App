import { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

class TaskFilter extends Component {
  render() {
    const { filterActive, filterAll, filterCompleted } = this.props;

    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={filterAll}>
            All
          </button>
        </li>
        <li>
          <button onClick={filterActive}>Active</button>
        </li>
        <li>
          <button onClick={filterCompleted}>Completed</button>
        </li>
      </ul>
    );
  }
}

TaskFilter.propTypes = {
  filterActive: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
};

export default TaskFilter;
