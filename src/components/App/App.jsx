import { Component } from 'react';

import { Form } from '../Form/Form';
import { TaskList } from '../TaskList/TaskList';
import { Footer } from '../Footer/Footer';

import './App.css';

export class App extends Component {
  state = {
    todoData: [],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((el) => el.id === id);

      const newArr = JSON.parse(JSON.stringify(todoData));
      newArr.splice(i, 1);

      return {
        todoData: newArr,
      };
    });
  };

  addItem = (item) => {
    this.setState(({ todoData }) => {
      let newArr = JSON.parse(JSON.stringify(todoData));
      newArr.push(item);

      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((el) => el.id === id);

      let newArr = JSON.parse(JSON.stringify(todoData));

      newArr.forEach((item, index) => {
        if (i === index) item.done = !todoData[i].done;
      });

      const checkbox = document.getElementById(`${id}`);

      if (!todoData[i].done) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }

      return {
        todoData: newArr,
      };
    });
  };

  onEditingSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    form.classList.add('hidden');

    let inputValue = form.childNodes[0].value;

    const task = form.parentElement.childNodes[0];
    task.classList.remove('hidden');

    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData));

      const id = Number(form.id.slice(5));

      newArr.forEach((element) => {
        if (element.id === id) {
          element.description = inputValue;
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  filterChange = (event) => {
    const lastFilter = document.querySelector('.selected');
    lastFilter.classList.remove('selected');

    const btn = event.target;
    btn.classList.add('selected');

    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData));

      newArr.forEach((element) => {
        element.hidden = false;
        const div = document.getElementById(`${element.id}`).parentNode;
        div.classList.remove('hidden');
      });
    });
  };

  filterActive = (event) => {
    this.filterChange(event);

    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData));

      newArr.forEach((element) => {
        if (element.done) {
          element.hidden = !element.hidden;

          const div = document.getElementById(`${element.id}`).parentNode;

          div.classList.add('hidden');
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  filterAll = (event) => {
    this.filterChange(event);
  };

  filterCompleted = (event) => {
    this.filterChange(event);

    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData));

      newArr.forEach((element) => {
        if (!element.done) {
          element.hidden = !element.hidden;

          const div = document.getElementById(`${element.id}`).parentNode;

          div.classList.add('hidden');
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = [];

      todoData.forEach((element) => {
        if (!element.done) {
          newArr.push(element);
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const { todoData } = this.state;

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Form addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditingSubmit={this.onEditingSubmit}
          />
          <Footer
            todo={todoCount}
            filterActive={this.filterActive}
            filterAll={this.filterAll}
            filterCompleted={this.filterCompleted}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
