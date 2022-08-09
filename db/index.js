const connection = require("../config/connection")

class Join {
    constructor(connection) {
        this.connection = connection;
    }
    findEmployees() {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(mgr.first_name, " ",mgr.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee as mgr ON mgr.id = employee.manager_id');
    }
}

module.exports = new Join(connection);