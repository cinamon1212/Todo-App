import { useState } from 'react';

import { NewTaskField } from '../NewTaskField/NewTaskField';
import { TaskList } from '../TaskList/TaskList';
import { Footer } from '../Footer/Footer';

import './App.css';
// import { el } from 'date-fns/locale';

export function App() {
  const [todoData, setTodoData] = useState([]);

  const deleteItem = (id) => {
    const i = todoData.findIndex((el) => el.id === id);

    const newArr = [...todoData];
    newArr.splice(i, 1);

    setTodoData(newArr);
  };

  const addItem = (item) => {
    let newArr = [...todoData];
    newArr.push(item);

    setTodoData(newArr);
  };

  const onToggleDone = (id) => {
    const newArr = [...todoData];
    newArr.forEach((elem) => {
      if (elem.id === id) elem.done = !elem.done;
    });

    setTodoData(newArr);
  };

  const onEditingSubmit = (event, id, editContainer) => {
    if (event.key === 'Enter') {
      const todoInput = event.target;

      const newArr = [...todoData];

      newArr.forEach((element) => {
        if (element.id === id) {
          element.description = todoInput.value;
        }
      });

      setTodoData(newArr);

      const container = editContainer.current;

      const task = container.parentElement.childNodes[0];

      container.classList.add('hidden');

      task.classList.remove('hidden');
    } else return;
  };

  const filterChange = (event) => {
    const lastFilter = document.querySelector('.selected');
    lastFilter.classList.remove('selected');

    const btn = event.target;
    btn.classList.add('selected');
  };

  const filterActive = (event) => {
    filterChange(event);

    const newArr = [...todoData];

    newArr.forEach((element) => {
      if (element.done) element.hidden = true;
      else element.hidden = false;
    });

    setTodoData(newArr);
  };

  const filterAll = (event) => {
    filterChange(event);

    const newArr = [...todoData];

    newArr.forEach((element) => {
      element.hidden = false;
    });

    setTodoData(newArr);
  };

  const filterCompleted = (event) => {
    filterChange(event);

    const newArr = [...todoData];

    newArr.forEach((element) => {
      if (element.done) element.hidden = false;
      else element.hidden = true;
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
        <NewTaskField addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onEditingSubmit={onEditingSubmit}
          onToggleDone={onToggleDone}
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
