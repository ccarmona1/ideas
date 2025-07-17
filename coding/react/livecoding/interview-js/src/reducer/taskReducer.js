export const taskReducer = (state, action) => {
  if (action.type === 'REPLACE') {
    return { ...state, tasks: action.payload };
  }

  if (action.type === 'CREATE') {
    const newTask = { ...action.payload };
    const newTasks = [...(state.tasks ?? [])];
    newTasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(newTasks));

    return { ...state, tasks: newTasks };
  }

  if (action.type === 'DELETE') {
    const newTasks = (state.tasks ?? []).filter(
      (task) => task.id !== action.payload
    );

    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(newTasks));

    return { ...state, tasks: newTasks };
  }

  if (action.type === 'UPDATE') {
    const newTasks = (state.tasks ?? []).filter(
      (task) => task.id !== action.payload.id
    );

    newTasks.push(action.payload);

    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(newTasks));

    newTasks.sort((a, b) => a.id - b.id);

    return { ...state, tasks: newTasks };
  }

  return state;
};
