import React, { useState, useEffect } from 'react';
import './css/EmployeeList.css'; 

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); 
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  useEffect(() => {
    fetch('https://dummy.restapiexample.com/api/v1/employees')
      .then(response => response.json())
      .then(data => {
       
        if (data.status === "success") {
          setEmployees(data.data);
        } else {
          console.error('API request failed:', data.message);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleDisplayCountChange = (event) => {
    const value = event.target.value === 'All' ? employees.length : parseInt(event.target.value, 10);
    setDisplayCount(value);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * displayCount;
  const indexOfFirstEmployee = indexOfLastEmployee - displayCount;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / displayCount);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select onChange={handleDisplayCountChange} value={displayCount}>
          <option value={10}>Show 10</option>
          <option value={20}>Show 20</option>
          <option value={30}>Show 30</option>
          <option value="All">Show All</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_salary}</td>
              <td>{employee.employee_age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &laquo; Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;
