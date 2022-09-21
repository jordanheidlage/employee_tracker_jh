const connection = require("../config/connection")

class Join {
    constructor(connection) {
        this.connection = connection;
    }
    findEmployees() {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(mgr.first_name, " ",mgr.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee as mgr ON mgr.id = employee.manager_id');
    }
    findDepartments(){
        return this.connection.promise().query('SELECT * FROM department ORDER BY department.id');
    }
    findRoles(){
        return this.connection.promise().query('SELECT * FROM role ORDER BY role.id');
    }
    insertDepartment(department){
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }
    insertRole(role){
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }
    insertEmployee(employee){
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }
    deleteEmployee(employee){
        return this.connection.promise().query('DELETE FROM employee SET ?', employee);
    }
    updateEmployee(employee, role){
        return this.connection.promise().query('UPDATE employee SET employee.role_id = ? WHERE employee.id = ?', employee, role);
    }
}

module.exports = new Join(connection);