const connection = require('./connection');

const viewAllDepartments = () => {
  return connection.promise().query('SELECT * FROM department');
};

const viewAllRoles = () => {
  return connection.promise().query(
    'SELECT role.id, role.title, department.name AS department, role.salary ' +
    'FROM role ' +
    'INNER JOIN department ON role.department_id = department.id'
  );
};

const viewAllEmployees = () => {
  return connection.promise().query(
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, ' +
    'department.name AS department, role.salary, ' +
    'CONCAT(manager.first_name, " ", manager.last_name) AS manager ' +
    'FROM employee ' +
    'LEFT JOIN role ON employee.role_id = role.id ' +
    'LEFT JOIN department ON role.department_id = department.id ' +
    'LEFT JOIN employee manager ON manager.id = employee.manager_id'
  );
};

const addDepartment = (departmentName) => {
  return connection.promise().query(
    'INSERT INTO department (name) VALUES (?)', [departmentName]
  );
};

const addRole = (title, salary, departmentId) => {
  return connection.promise().query(
    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
    [title, salary, departmentId]
  );
};

const addEmployee = (firstName, lastName, roleId, managerId) => {
  return connection.promise().query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [firstName, lastName, roleId, managerId || null] // Allows null for no manager
  );
};

const updateEmployeeRole = (employeeId, newRoleId) => {
  return connection.promise().query(
    'UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]
  );
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
