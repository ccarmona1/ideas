import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

export const ListTask = () => {
  const [state, dispatcher] = useContext(TaskContext);

  const tasks = state.tasks ?? [];

  const handleDelete = (taskId) => {
    dispatcher({ type: 'DELETE', payload: taskId });
  };

  const handleUpdate = (updatedTask) => {
    dispatcher({ type: 'UPDATE', payload: updatedTask });
  };

  return (
    <>
      {tasks.length > 0 ? (
        <>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>State</th>
                <th>Action</th>
              </tr>
              {tasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.state}</td>
                    <td>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleUpdate({
                            ...task,
                            state: (task?.state ?? 0) + 1,
                          })
                        }
                      >
                        Cambiar estado
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>Please create a task</>
      )}
    </>
  );
};
