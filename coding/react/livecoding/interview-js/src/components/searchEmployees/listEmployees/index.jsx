const ListEmployees = ({ employees, handleSelectEmployee }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Open</th>
        </tr>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>
              <button
                role="button"
                onClick={() => handleSelectEmployee(employee)}
              >
                Open
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListEmployees;
