import { useEffect, useReducer } from 'react';
import { taskReducer } from '../reducer/taskReducer';

export const useTasks = () => {
  const [state, dispatcher] = useReducer(taskReducer, {});

  useEffect(() => {
    const tasksInMemory = localStorage.getItem('tasks');

    const tasks =
      typeof tasksInMemory === 'string' ? JSON.parse(tasksInMemory) : [];

    dispatcher({ type: 'REPLACE', payload: tasks });
  }, [dispatcher]);

  return [state, dispatcher];
};
