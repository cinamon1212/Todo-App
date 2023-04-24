export default function TimerSecForm({ setSec, sec }) {
  function onInput(event) {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
    event.target.value = event.target.value.slice(0, 2);
    if (event.target.value >= 60) event.target.value = 59;

    if (event.target.value[0] === '0') event.target.value = '';
  }

  return (
    <input
      type="text"
      className="new-todo-form__timer"
      placeholder="Sec"
      onChange={setSec}
      onInput={onInput}
      value={sec}
    />
  );
}
