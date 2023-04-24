export default function TimerMinForm({ setMin, min }) {
  function onInput(event) {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
    event.target.value = event.target.value.slice(0, 3);
    if (event.target.value[0] === '0') event.target.value = '';
  }

  return (
    <input
      type="text"
      className="new-todo-form__timer"
      placeholder="Min"
      onChange={setMin}
      onInput={onInput}
      value={min}
    />
  );
}
