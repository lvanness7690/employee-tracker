const inquirer = require('inquirer');

// Prompt for viewing departments, roles, or employees
const viewOptionsPrompt = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'viewOption',
      message: 'What would you like to view?',
      choices: ['Departments', 'Roles', 'Employees']
    }
  ]);
};

// Prompt for adding a new department
const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department?',
      validate: (input) => input ? true : 'Department name cannot be empty.'
    }
  ]);
};

// Prompt for adding a new role
const addRolePrompt = (departments) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
      validate: (input) => input ? true : 'Role title cannot be empty.'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for the role?',
      validate: (input) => {
        if (isNaN(input) || !input) {
          return 'Please enter a valid number for the salary.';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does this role belong to?',
      choices: departments // This should be an array of departments formatted like [{name: 'Sales', value: 1}, ...]
    }
  ]);
};

// Prompt for adding a new employee
const addEmployeePrompt = (roles, employees) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the new employee's first name?",
      validate: (input) => input ? true : 'First name cannot be empty.'
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the new employee's last name?",
      validate: (input) => input ? true : 'Last name cannot be empty.'
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the new employee's role?",
      choices: roles // This should be an array of roles formatted like [{name: 'Engineer', value: 1}, ...]
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Who is the new employee's manager?",
      choices: employees // This should be an array of employees, including an option for 'None'
    }
  ]);
};

// Prompt for updating an employee's role
const updateEmployeeRolePrompt = (employees, roles) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: "Which employee's role do you want to update?",
      choices: employees // This should be an array of employees formatted like [{name: 'John Doe', value: 1}, ...]
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the employee's new role?",
      choices: roles // This should be an array of roles formatted like [{name: 'Manager', value: 1}, ...]
    }
  ]);
};

module.exports = {
  viewOptionsPrompt,
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt
};
