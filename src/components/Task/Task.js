import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

class Task extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    };

    this.onLabelChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    };

    this.onToggleEdit = (text, id) => {
      const form = document.getElementById(`form-${id}`);
      const task = form.parentElement.childNodes[0];
      const label = task.querySelector('.done');

      if (!label) {
        form.classList.remove('hidden');

        task.classList.add('hidden');

        this.setState({
          label: text,
        });
      } else return;
    };
  }

  render() {
    const { description, date, onDeleted, onToggleDone, onEditingSubmit, done, id } = this.props;

    let labelClassNames;

    if (done) {
      labelClassNames = 'done';
    }

    return (
      <li>
        <div>
          <input className="toggle" type="checkbox" onClick={onToggleDone} id={id} />
          <label>
            <span className={labelClassNames} onClick={onToggleDone}>
              {description}
            </span>

            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={() => this.onToggleEdit(description, id)}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        <form className="hidden" onSubmit={onEditingSubmit} id={`form-${id}`}>
          <input type="text" className="edit" onChange={this.onLabelChange} value={this.state.label}></input>
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  description: PropTypes.string,
  date: PropTypes.number,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditingSubmit: PropTypes.func.isRequired,
  done: PropTypes.bool,
  id: PropTypes.number,
};

export default Task;
