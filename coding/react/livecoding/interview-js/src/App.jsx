import styles from './App.module.css';
import { Card } from './components/common/card/Card';
import { CreateTask } from './components/createTask/CreateTask';
import { ListTask } from './components/listTask/listTask';
import { SummaryTask } from './components/summaryTask/summaryTask';
import { TaskContext } from './context/TaskContext';
import { useTasks } from './hooks/useTasks';

function App() {
  console.count('App');

  const [state, dispatcher] = useTasks();

  return (
    <TaskContext.Provider value={[state, dispatcher]}>
      <div className={styles.dashboard}>
        <Card>
          <CreateTask></CreateTask>
        </Card>
        <div className="summary">
          <Card>
            <ListTask></ListTask>
            <SummaryTask></SummaryTask>
          </Card>
        </div>
      </div>
    </TaskContext.Provider>
  );
}

export default App;
