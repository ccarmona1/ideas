import { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';

export const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    state: '',
  });
  const [state, dispatcher] = useContext(TaskContext);

  const handleCreate = (e) => {
    e.preventDefault();
    console.log('create');
    const currentTasksCount = state?.tasks?.length ?? 0;
    dispatcher({
      type: 'CREATE',
      payload: { ...newTask, id: currentTasksCount + 1 },
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log('cancel');
    setNewTask({
      name: '',
      description: '',
      state: '',
    });
  };

  const handleChangeInput = (e) => {
    setNewTask((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        <label htmlFor="name"></label>
        <input
          id="name"
          required
          placeholder="Name"
          value={newTask.name}
          onChange={handleChangeInput}
        ></input>
      </div>
      <div>
        <label htmlFor="description"></label>
        <input
          id="description"
          required
          placeholder="Description"
          value={newTask.description}
          onChange={handleChangeInput}
        ></input>
      </div>
      <div>
        <label htmlFor="state"></label>
        <input
          id="state"
          required
          placeholder="State"
          value={newTask.state}
          onChange={handleChangeInput}
        ></input>
      </div>
      <div>
        <button>Create</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};
