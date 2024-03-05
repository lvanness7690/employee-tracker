const mysql = require('mysql2');
require('dotenv').config(); // If using dotenv for environment variables

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username, e.g., 'root'
  password: 'L3!ght@n', // Replace with your MySQL password
  database: 'employee_tracker'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
