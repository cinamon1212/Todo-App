import './NewTaskForm.css';
import { Component } from 'react';

export default class NewTaskForm extends Component {
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

    this.onSubmit = (event) => {
      event.preventDefault();

      const inputValue = event.target.childNodes[0].value;

      if (inputValue.trim() === '') return;

      this.props.addItem(this.state.label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        />
      </form>
    );
  }
}
