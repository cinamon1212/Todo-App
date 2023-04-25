import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

class Task extends Component {
  state = {
    label: '',
    isTimerOn: false,
    min: this.props.min,
    sec: this.props.sec,
    interval: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTimerOn !== this.state.isTimerOn) {
      if (this.state.isTimerOn) {
        const newSec = this.state.sec - 1;

        this.setState({
          sec: newSec,
        });

        this.updateTimer();
      } else clearInterval(this.state.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  updateTimer = () => {
    const intervalId = setInterval(() => {
      let sec = this.state.sec;
      let min = this.state.min;
      let newMin;
      let newSec;

      if (sec && sec !== '00') {
        newSec = sec - 1;
        if (newSec < 10 && newSec >= 0) newSec = `0${newSec}`;
        this.setState({
          sec: newSec,
        });
      } else if ((sec = '00' && min && min !== '00')) {
        newSec = 59;
        if (newSec < 10 && newSec >= 0) newSec = `0${newSec}`;
        newMin = min - 1;
        if (newMin < 10 && newMin >= 0) newMin = `0${newMin}`;
        this.setState({
          sec: newSec,
          min: newMin,
        });
      } else if (sec === '00' && min === '00') {
        this.onTimerPauseClick();
      }

      this.render();
    }, 1000);

    this.setState({
      interval: intervalId,
    });
  };

  onTimerPlayClick = (event) => {
    console.log(event);
    this.setState({
      isTimerOn: true,
    });
  };

  onTimerPauseClick = () => {
    this.setState({
      isTimerOn: false,
    });
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onToggleEdit = (text, id) => {
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

  render() {
    const { description, date, onDeleted, onToggleDone, onEditingSubmit, done, id } = this.props;

    let labelClassNames;

    if (done) {
      labelClassNames = 'done';
    }

    const todoMin = this.state.min;
    const todoSec = this.state.sec;

    let time = `${todoMin}:${todoSec}`;

    const timer =
      todoMin && todoSec ? (
        <span className="created timer-button">
          <button className="icon icon-play" onClick={this.onTimerPlayClick} />
          <button className="icon icon-pause" onClick={this.onTimerPauseClick} />
          {time}
        </span>
      ) : null;

    return (
      <li>
        <div>
          <input className="toggle" type="checkbox" onClick={onToggleDone} id={id} />
          <label htmlFor="random">
            <span className={labelClassNames} onClick={onToggleDone} id="random">
              {description}
            </span>
            {timer}
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
