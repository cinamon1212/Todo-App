import PropTypes from 'prop-types';

import './TaskFilter.css';

export function TaskFilter(props) {
  const filterValuesArray = ['All', 'Active', 'Completed'];

  return (
    <ul className="filters">
      {Object.values(props).map((onClick, i) => {
        let className = '';
        if (!i) className = 'selected';
        return (
          <li key={filterValuesArray[i]}>
            <button className={className ? className : null} onClick={onClick}>
              {filterValuesArray[i]}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TaskFilter.propTypes = {
  filterActive: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
};
