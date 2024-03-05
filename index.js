require('dotenv').config();
const inquirer = require('inquirer');
const connection = require('./db/connection');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./db/dbQueries');
const {
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt,
} = require('./prompts');

async function startApp() {
  try {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    });

    switch (action) {
      case 'View all departments':
        const [departments] = await viewAllDepartments();
        console.table(departments);
        break;
      case 'View all roles':
        const [roles] = await viewAllRoles();
        console.table(roles);
        break;
      case 'View all employees':
        const [employees] = await viewAllEmployees();
        console.table(employees);
        break;
      case 'Add a department':
        const newDepartment = await addDepartmentPrompt();
        await addDepartment(newDepartment.departmentName);
        console.log('New department added!');
        break;
      case 'Add a role':
        // Assume getDepartments is a function you have created in dbQueries.js that fetches departments and formats them for inquirer choices.
        const departments = await viewAllDepartments();
        const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
        const newRole = await addRolePrompt(departmentChoices);
        await addRole(newRole.title, newRole.salary, newRole.departmentId);
        console.log('New role added!');
        break;
      case 'Add an employee':
        // Similar to above, you'll need to get roles and format them, as well as get potential managers and format them for inquirer choices.
        // const roles = await getRoles(); // Function to implement
        // const employees = await getEmployees(); // Function to implement
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
        const managerChoices = employees.map(emp => ({ name: emp.first_name + ' ' + emp.last_name, value: emp.id })).concat({ name: 'None', value: null });
        const newEmployee = await addEmployeePrompt(roleChoices, managerChoices);
        await addEmployee(newEmployee.firstName, newEmployee.lastName, newEmployee.roleId, newEmployee.managerId);
        console.log('New employee added!');
        break;
      case 'Update an employee role':
        // Similar to 'Add an employee', you'll need to fetch and prepare data for the inquirer choices.
        const updateEmployee = await updateEmployeeRolePrompt(employees, roles);
        await updateEmployeeRole(updateEmployee.employeeId, updateEmployee.newRoleId);
        console.log("Employee's role updated!");
        break;
      case 'Exit':
        console.log('Goodbye!');
        connection.end();
        return;
      default:
        console.log(`Invalid action: ${action}`);
    }
  } catch (error) {
    console.error('Error during operation:', error);
  }

  startApp(); // Loop back to start unless the user exits
}

startApp();
