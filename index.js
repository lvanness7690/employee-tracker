const inquirer = require('inquirer');
const connection = require('./db/connection');
// You will require other modules as you create them

function startApp() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          // Add other options here
        ],
      },
    ]).then((answers) => {
      // Handle response
    });
  }
  
  startApp();
  
  const { viewAllDepartments } = require('./db/dbQueries');

// Inside your inquirer response handling
if (answers.action === 'View all departments') {
  viewAllDepartments().then(([rows]) => {
    console.table(rows);
    startApp(); // Call startApp again to show the menu
  }).catch((err) => {
    console.error(err);
  });
}
