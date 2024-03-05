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
            case 'Add a role':
                // Assume getDepartments() is a function that fetches departments and formats them for inquirer choices
                const departmentsForRole = await getDepartments(); // This needs to be implemented
                const roleDetails = await addRolePrompt(departmentsForRole);
                await addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
                console.log('New role added!');
                break;
            case 'Add an employee':
                const rolesForEmployee = await getRoles(); // This needs to be implemented
                const managersForEmployee = await getManagers(); // This needs to be implemented
                const employeeDetails = await addEmployeePrompt(rolesForEmployee, managersForEmployee);
                await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
                console.log('New employee added!');
                break;
            case 'Update an employee role':
                const employeesForUpdate = await getEmployees(); // This needs to be implemented
                const rolesForUpdate = await getRoles(); // Reuse getRoles() here
                const updateDetails = await updateEmployeeRolePrompt(employeesForUpdate, rolesForUpdate);
                await updateEmployeeRole(updateDetails.employeeId, updateDetails.roleId);
                console.log("Employee's role updated!");
                break;
            case 'Exit':
                console.log('Exiting Employee Tracker. Goodbye!');
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
    console.log('Database connected.');
    startApp();
});
