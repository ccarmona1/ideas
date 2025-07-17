import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

export const SummaryTask = () => {
  const [state] = useContext(TaskContext);

  const tasks = state?.tasks ?? [];
  const completedTasks = tasks.filter((task) => task.state > 5).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div>
      <div>Number of tasks: {tasks.length}</div>
      <div>Number of completed tasks: {completedTasks}</div>
      <div>Number of pending tasks: {pendingTasks}</div>
    </div>
  );
};
