# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents\
* [Description](#description)
* [Installation](#installation)
* [Technologies Used](#technologies-used)
* [Application Demo](#application-demo)
* [Usage](#usage)
* [Feature](#features)
* [Credits](#credits)
* [License](#license)

## Description

The Employee Tracker is a command-line application built to manage a company's employee database, using Node.js, Inquirer, and MySQL. This easy-to-use interface allows non-developers to easily view and interact with information stored in databases, effectively organizing and planning business operations.

## Installation

To install the Employee Tracker, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install all the necessary dependencies.
3. Ensure you have MySQL installed and running on your local machine.
4. Set up your MySQL database using the schema provided in the `schema.sql` file.
5. (Optional) Populate your database with initial data using the `seeds.sql` file.
6. Create a `.env` file in the root directory and fill in your MySQL credentials like so:
7. Run `node index.js` to start the application.

## Usage

After installation, run the application with `node index.js`. You will be presented with a menu of options to:

- View all departments, roles, and employees
- Add a department, role, or employee
- Update an employee role

Navigate through the prompts to manage your employee database.

## Features

- Interactive prompts for managing the employee database
- Viewing and updating tables of departments, roles, and employees
- Adding new departments, roles, and employees to the database

## Credits

Developed by Leighton Van Ness.

## License

Please refer to the license in the repo.



