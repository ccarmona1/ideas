import SearchEmployees from '../searchEmployees';
import EmployeeDetails from '../employee/employeeDetails';
import { memo, useState } from 'react';
import style from './index.module.css';
import Card from '../common/card';

const MemoSearchEmployees = memo(SearchEmployees);

const Dashboard = () => {
  console.count('Dashboard');

  const [selectedEmployee, setSelectedEmployee] = useState();

  const handleCloseComponent = () => {
    setSelectedEmployee(undefined);
  };

  return (
    <div className={style.dashboard}>
      <Card>
        <MemoSearchEmployees
          handleSelectEmployee={setSelectedEmployee}
        ></MemoSearchEmployees>
      </Card>
      {selectedEmployee && (
        <Card>
          <EmployeeDetails
            handleCloseComponent={handleCloseComponent}
            employee={selectedEmployee}
          ></EmployeeDetails>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
