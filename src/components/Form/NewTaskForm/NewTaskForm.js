import './NewTaskForm.css';
import { Component } from 'react';

export default class NewTaskForm extends Component {
  render() {
    return (
      <input
        type="text"
        className="new-todo"
        placeholder="Task"
        onChange={this.props.onLabelChange}
        value={this.props.label}
        autoFocus
      />
    );
  }
}
