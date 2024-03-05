const inquirer = require('inquirer');

function getEmployeePrompts() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What's the employee's first name?",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What's the employee's last name?",
    },
    // Add other prompts as needed
  ]);
}

module.exports = { getEmployeePrompts };
