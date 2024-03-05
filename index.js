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
    getDepartments,
    getRoles,
    getManagers,
    getEmployees, // Import the getEmployees function
} = require('./db/dbQueries');

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
                const { departmentName } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'Enter the name of the department:',
                        validate: input => input.trim() !== '' ? true : 'Department name cannot be empty.'
                    }
                ]);
                await addDepartment(departmentName);
                console.log('New department added successfully!');
                break;
            case 'Add a role':
                const departmentsForRole = await getDepartments();
                const { title, salary, departmentId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the title of the role:',
                        validate: input => input.trim() !== '' ? true : 'Role title cannot be empty.'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for the role:',
                        validate: input => /^\d+(\.\d{1,2})?$/.test(input) ? true : 'Invalid salary format. Please enter a number.'
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the department for the role:',
                        choices: departmentsForRole
                    }
                ]);
                await addRole(title, salary, departmentId);
                console.log('New role added successfully!');
                break;
            case 'Add an employee':
                const rolesForEmployee = await getRoles();
                const managersForEmployee = await getManagers();
                const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the first name of the employee:',
                        validate: input => input.trim() !== '' ? true : 'First name cannot be empty.'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the last name of the employee:',
                        validate: input => input.trim() !== '' ? true : 'Last name cannot be empty.'
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the role for the employee:',
                        choices: rolesForEmployee
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the manager for the employee:',
                        choices: managersForEmployee
                    }
                ]);
                await addEmployee(firstName, lastName, roleId, managerId);
                console.log('New employee added successfully!');
                break;
            case 'Update an employee role':
                const employeesForUpdate = await getEmployees(); // Fetch employees for selection
                const rolesForUpdate = await getRoles();
                const { employeeId } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the employee whose role you want to update:',
                        choices: employeesForUpdate // Use the fetched employees for selection
                    }
                ]);
                const { newRoleId } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRoleId',
                        message: 'Select the new role for the employee:',
                        choices: rolesForUpdate
                    }
                ]);
                await updateEmployeeRole(employeeId, newRoleId);
                console.log('Employee role updated successfully!');
                break;
            case 'Exit':
                console.log('Exiting the Employee Tracker. Goodbye!');
                connection.end();
                return;
            default:
                console.log('Invalid action. Please choose again.');
                break;
        }
    } catch (error) {
        console.error('Error during operation:', error);
    }
    startApp(); // Re-prompt the user for action after the current action is complete
}

// Establish a database connection and start the application
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
    startApp();
});
