require('dotenv').config();
const inquirer = require('inquirer');
const connection = require('./db/connection');
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./db/dbQueries'); // Make sure to implement these in dbQueries.js

function startApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                // Add more options as needed
                'Exit'
            ],
        },
    ]).then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments().then(([rows]) => {
                    console.table(rows);
                    startApp();
                }).catch((err) => {
                    console.error(err);
                });
                break;
            case 'View all roles':
                viewAllRoles().then(([rows]) => {
                    console.table(rows);
                    startApp();
                }).catch((err) => {
                    console.error(err);
                });
                break;
            case 'View all employees':
                viewAllEmployees().then(([rows]) => {
                    console.table(rows);
                    startApp();
                }).catch((err) => {
                    console.error(err);
                });
                break;
            case 'Add a department':
                // This would be a call to another function that handles the prompt and database insertion
                // e.g., addDepartment();
                console.log('Add a department functionality goes here');
                startApp();
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                console.log(`Invalid action: ${answer.action}`);
                startApp();
        }
    });
}

startApp();
