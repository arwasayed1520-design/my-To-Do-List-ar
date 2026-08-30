const STORAGE_KEY = 'todos';

const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const button = document.getElementById('button');
  const list = document.getElementById('list');

  const render = (todos) => {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
      const item = document.createElement('li');
      item.className = todo.done ? 'todo-item done' : 'todo-item';

      const span = document.createElement('span');
      span.textContent = todo.text;
      item.appendChild(span);

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const check = document.createElement('button');
      check.className = 'btn-check';
      check.textContent = '✓';
      check.title = 'تم';
      check.addEventListener('click', () => {
        const updated = loadTodos();
        updated[index].done = !updated[index].done;
        saveTodos(updated);
        render(updated);
      });

      const remove = document.createElement('button');
      remove.className = 'btn-remove';
      remove.textContent = '✕';
      remove.title = 'حذف';
      remove.addEventListener('click', () => {
        const updated = loadTodos();
        updated.splice(index, 1);
        saveTodos(updated);
        render(updated);
      });

      actions.appendChild(check);
      actions.appendChild(remove);
      item.appendChild(actions);
      list.appendChild(item);
    });
  };

  let todos = loadTodos().map((t) =>
    typeof t === 'string' ? { text: t, done: false } : t
  );
  render(todos);

  button.addEventListener('click', () => {
    const value = input.value.trim();
    if (value === '') return;

    todos.push({ text: value, done: false });
    saveTodos(todos);
    render(todos);

    input.value = '';
  });
});
