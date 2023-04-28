import { Component } from 'react';

import './Form.css';

export class Form extends Component {
  id = 0;

  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (event) => {
    event.target.value = event.target.value.slice(0, 7).toLowerCase();

    this.setState({
      label: event.target.value,
    });
  };

  setMin = (event) => {
    this.setState({
      min: event.target.value,
    });
  };

  setSec = (event) => {
    this.setState({
      sec: event.target.value,
    });
  };

  createTodo = (text, min, sec) => {
    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    const elem = {
      id: this.id++,
      done: false,
      hidden: false,
      date: Date.now(),
      description: text,
      min: min,
      sec: sec,
    };

    return elem;
  };

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const { label, min, sec } = this.state;
      const item = this.createTodo(label, min, sec);
      this.props.addItem(item);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  onInputMin(event) {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
    event.target.value = event.target.value.slice(0, 3);
    if (event.target.value[0] === '0') event.target.value = '';
  }

  onInputSec(event) {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
    event.target.value = event.target.value.slice(0, 2);
    if (event.target.value >= 60) event.target.value = 59;

    if (event.target.value[0] === '0') event.target.value = '';
  }

  render() {
    const onChangeFunctions = [this.onLabelChange, this.setMin, this.setSec];
    const inputPlaceholders = ['Task', 'Min', 'Sec'];

    return (
      <div className="new-todo-div" onKeyDown={this.onKeyDown}>
        {Object.entries(this.state).map((elem, i) => {
          const inputValue = elem[1];

          let inputClass = '';

          if (!i) inputClass = 'new-todo';
          else inputClass = 'new-todo-form__timer';

          return (
            <input
              key={elem[0]}
              className={inputClass}
              value={inputValue}
              placeholder={inputPlaceholders[i]}
              onChange={onChangeFunctions[i]}
              autoFocus={!i ? true : false}
              onInput={i === 1 ? this.onInputMin : i === 2 ? this.onInputSec : null}
            />
          );
        })}
      </div>
    );
  }
}
