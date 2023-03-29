import { Component } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';
import './Footer.css';

class Footer extends Component {
  render() {
    const { todo, filterActive, filterAll, filterCompleted, clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todo} items left</span>
        <TaskFilter filterActive={filterActive} filterAll={filterAll} filterCompleted={filterCompleted} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todo: PropTypes.number,
  filterActive: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  todo: 0,
};

export default Footer;
