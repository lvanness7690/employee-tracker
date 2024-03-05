require('dotenv').config();
const inquirer = require('inquirer');
const connection = require('./db/connection');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  // addRole,
  // addEmployee,
  // updateEmployeeRole,
} = require('./db/dbQueries');
const {
  addDepartmentPrompt,
  // addRolePrompt,
  // addEmployeePrompt,
  // updateEmployeeRolePrompt,
} = require('./prompts');

async function startApp() {
  try {
    const { action } = await inquirer.prompt([
      {
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
      },
    ]);

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
        const { departmentName } = await addDepartmentPrompt();
        await addDepartment(departmentName);
        console.log('New department added!');
        break;
      // Implement the remaining cases using the same pattern.
      // Make sure to create the required functions in dbQueries.js and prompts.js
      case 'Exit':
        console.log('Goodbye!');
        connection.end();
        return;
      default:
        console.log(`Invalid action: ${action}`);
        break;
    }
  } catch (error) {
    console.error('Error during operation:', error);
  }

  // Call startApp again to display the menu after an operation has completed
  return startApp();
}

// Establish a database connection and start the application
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected.');
  startApp();
});
