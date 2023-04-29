import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import { getPadTime } from '../../helpers/getPadTime';

import './Task.css';

export function Task({ description, date, onDeleted, onToggleDone, onEditingSubmit, done, id, min, sec }) {
  const minutes = Number(min);
  const seconds = Number(sec);

  const [label, setLabel] = useState('');
  const [isTimerOn, setTimerValue] = useState(false);

  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (isTimerOn) {
      const int = setInterval(() => {
        setTimeLeft((time) => (time >= 1 ? time - 1 : 0));
      }, 1000);
      setIntervalId(int);
    } else clearInterval(intervalId);

    return () => clearInterval(intervalId);
  }, [isTimerOn]);

  const onTimerPlayClick = () => {
    setTimerValue(true);
  };

  const onTimerPauseClick = () => {
    setTimerValue(false);
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onToggleEdit = (text, id) => {
    const form = document.getElementById(`form-${id}`);
    const task = form.parentElement.childNodes[0];
    const label = task.querySelector('.done');

    if (!label) {
      form.classList.remove('hidden');

      task.classList.add('hidden');

      setLabel(text);
    } else return;
  };

  let labelClassNames;

  if (done) {
    labelClassNames = 'done';
  }

  const todoMin = getPadTime(Math.floor(timeLeft / 60));

  const todoSec = getPadTime(timeLeft - todoMin * 60);

  let time = `${todoMin}:${todoSec}`;

  const timer =
    todoMin && todoSec ? (
      <span className="created timer-button">
        <button className="icon icon-play" onClick={onTimerPlayClick} />
        <button className="icon icon-pause" onClick={onTimerPauseClick} />
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
        <button className="icon icon-edit" onClick={() => onToggleEdit(description, id)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>

      <form className="hidden" onSubmit={onEditingSubmit} id={`form-${id}`}>
        <input type="text" className="edit" onChange={onLabelChange} value={label}></input>
      </form>
    </li>
  );
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
