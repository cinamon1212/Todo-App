import { Component } from 'react';

import NewTaskForm from './NewTaskForm/NewTaskForm';
import TimerMinForm from './TimerMinForm/TimerMinForm';
import TimerSecForm from './TimerSecForm/TimerSecForm';

import './Form.css';

export default class Form extends Component {
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

  onSubmit = (event) => {
    event.preventDefault();

    const inputValue = event.target.childNodes[0].value;

    if (inputValue.trim() === '') return;

    let min = this.state.min;
    let sec = this.state.sec;

    if (min === '' && sec !== '00') min = '00';
    if (sec === '' && min !== '00') sec = '00';

    if (min < 10 && min > 0) min = `0${min}`;
    if (sec < 10 && sec > 0) sec = `0${sec}`;

    this.props.addItem(this.state.label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <NewTaskForm onLabelChange={this.onLabelChange} label={this.state.label} />
        <TimerMinForm setMin={this.setMin} min={this.state.min} />
        <TimerSecForm setSec={this.setSec} sec={this.state.sec} />
        <button type="submit" className="new-todo-form__submit" />
      </form>
    );
  }
}
