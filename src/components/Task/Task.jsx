import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import { getPadTime } from '../../helpers/getPadTime';

import './Task.css';

export function Task({ description, date, onDeleted, onEditingSubmit, onToggleDone, done, id, min, sec, hidden }) {
  const minutes = Number(min);
  const seconds = Number(sec);

  const [label, setLabel] = useState('');
  const [isTimerOn, setTimerValue] = useState(false);

  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [intervalId, setIntervalId] = useState();

  const hiddenContainer = useRef();

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

  const onToggleEdit = (text) => {
    const editContainer = hiddenContainer.current;

    const task = editContainer.parentElement.childNodes[0];
    const label = task.querySelector('.done');

    if (!label) {
      editContainer.classList.remove('hidden');

      task.classList.add('hidden');

      setLabel(text);
    } else return;
  };

  const todoMin = getPadTime(Math.floor(timeLeft / 60));

  const todoSec = getPadTime(timeLeft - todoMin * 60);

  let time = `${todoMin}:${todoSec}`;

  const timer =
    minutes || seconds ? (
      <span className="created timer-button">
        <button className="icon icon-play" onClick={onTimerPlayClick} />
        <button className="icon icon-pause" onClick={onTimerPauseClick} />
        {time}
      </span>
    ) : null;

  return (
    <li className={hidden ? 'hidden-todo' : null}>
      <div className="todo">
        <label className="todo-check" onChange={() => onToggleDone(id)}>
          <input className="toggle" type="checkbox" />
          <span className={done ? 'done' : null}>{description}</span>
        </label>
        <div className="todo__main-part">
          {timer}
          <span className="created">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              addSuffix: true,
            })}`}
          </span>

          <button className="icon icon-edit" onClick={() => onToggleEdit(description, id)}></button>
          <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
        </div>
      </div>

      <div className="hidden" onKeyDown={() => onEditingSubmit(event, id, hiddenContainer)} ref={hiddenContainer}>
        <input type="text" className="edit" onChange={onLabelChange} value={label}></input>
      </div>
    </li>
  );
}

Task.propTypes = {
  description: PropTypes.string,
  date: PropTypes.number,
  onDeleted: PropTypes.func.isRequired,
  onEditingSubmit: PropTypes.func.isRequired,
  done: PropTypes.bool,
  id: PropTypes.number,
};
