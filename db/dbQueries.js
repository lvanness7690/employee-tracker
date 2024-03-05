const connection = require('./connection');

function viewAllDepartments() {
  return connection.promise().query('SELECT * FROM department');
}

module.exports = { viewAllDepartments };
