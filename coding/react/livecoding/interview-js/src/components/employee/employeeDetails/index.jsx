const EmployeeDetails = ({ employee, handleCloseComponent }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>{employee.name}</td>
            <td>{employee.id}</td>
            <td>{employee.details}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => handleCloseComponent()}>Close</button>
    </>
  );
};

export default EmployeeDetails;
