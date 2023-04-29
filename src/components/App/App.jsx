import { useState } from 'react';

import { Form } from '../Form/Form';
import { TaskList } from '../TaskList/TaskList';
import { Footer } from '../Footer/Footer';

import './App.css';

export function App() {
  const [todoData, setTodoData] = useState([]);

  const deleteItem = (id) => {
    const i = todoData.findIndex((el) => el.id === id);

    const newArr = JSON.parse(JSON.stringify(todoData));
    newArr.splice(i, 1);

    setTodoData(newArr);
  };

  const addItem = (item) => {
    let newArr = JSON.parse(JSON.stringify(todoData));
    newArr.push(item);

    setTodoData(newArr);
  };

  const onToggleDone = (id) => {
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

    setTodoData(newArr);
  };

  const onEditingSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    form.classList.add('hidden');

    let inputValue = form.childNodes[0].value;

    const task = form.parentElement.childNodes[0];
    task.classList.remove('hidden');

    const newArr = JSON.parse(JSON.stringify(todoData));

    const id = Number(form.id.slice(5));

    newArr.forEach((element) => {
      if (element.id === id) {
        element.description = inputValue;
      }
    });

    setTodoData(newArr);
  };

  const filterChange = (event) => {
    const lastFilter = document.querySelector('.selected');
    lastFilter.classList.remove('selected');

    const btn = event.target;
    btn.classList.add('selected');

    const newArr = JSON.parse(JSON.stringify(todoData));

    newArr.forEach((element) => {
      element.hidden = false;
      const div = document.getElementById(`${element.id}`).parentNode;
      div.classList.remove('hidden');
    });
  };

  const filterActive = (event) => {
    filterChange(event);

    const newArr = JSON.parse(JSON.stringify(todoData));

    newArr.forEach((element) => {
      if (element.done) {
        element.hidden = !element.hidden;

        const div = document.getElementById(`${element.id}`).parentNode;

        div.classList.add('hidden');
      }
    });

    setTodoData(newArr);
  };

  const filterAll = (event) => {
    filterChange(event);
  };

  const filterCompleted = (event) => {
    filterChange(event);

    const newArr = JSON.parse(JSON.stringify(todoData));

    newArr.forEach((element) => {
      if (!element.done) {
        element.hidden = !element.hidden;

        const div = document.getElementById(`${element.id}`).parentNode;

        div.classList.add('hidden');
      }
    });

    setTodoData(newArr);
  };

  const clearCompleted = () => {
    const newArr = [];

    todoData.forEach((element) => {
      if (!element.done) {
        newArr.push(element);
      }
    });

    setTodoData(newArr);
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEditingSubmit={onEditingSubmit}
        />
        <Footer
          todo={todoCount}
          filterActive={filterActive}
          filterAll={filterAll}
          filterCompleted={filterCompleted}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}
