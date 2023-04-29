import { useState } from 'react';

import './Form.css';

export function Form({ addItem }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [itemId, setItemId] = useState(0);

  const onLabelChange = (event) => {
    event.target.value = event.target.value.slice(0, 7).toLowerCase();

    setLabel(event.target.value);
  };

  const setMinItem = (event) => {
    setMin(event.target.value);
  };

  const setSecItem = (event) => {
    setSec(event.target.value);
  };

  const createTodo = (text, min, sec) => {
    const elem = {
      id: itemId,
      done: false,
      hidden: false,
      date: Date.now(),
      description: text,
      min: min,
      sec: sec,
    };

    setItemId((id) => id + 1);

    return elem;
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const item = createTodo(label, min, sec);
      addItem(item);

      setLabel('');
      setMin('');
      setSec('');
    }
  };

  const onInputMin = (event) => {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
    event.target.value = event.target.value.slice(0, 3);
    if (event.target.value[0] === '0') event.target.value = '';
  };

  const onInputSec = (event) => {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
    event.target.value = event.target.value.slice(0, 2);
    if (event.target.value >= 60) event.target.value = 59;

    if (event.target.value[0] === '0') event.target.value = '';
  };

  const onChangeFunctions = [onLabelChange, setMinItem, setSecItem];
  const inputPlaceholders = ['Task', 'Min', 'Sec'];
  const values = [label, min, sec];

  return (
    <div className="new-todo-div" onKeyDown={onKeyDown}>
      {inputPlaceholders.map((elem, i) => {
        const inputValue = values[i];

        let inputClass = '';

        if (!i) inputClass = 'new-todo';
        else inputClass = 'new-todo-form__timer';

        return (
          <input
            key={elem}
            className={inputClass}
            value={inputValue}
            placeholder={inputPlaceholders[i]}
            onChange={onChangeFunctions[i]}
            autoFocus={!i ? true : false}
            onInput={i === 1 ? onInputMin : i === 2 ? onInputSec : null}
          />
        );
      })}
    </div>
  );
}
