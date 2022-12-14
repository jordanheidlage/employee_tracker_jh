const inquirer = require("inquirer")
require('console.table')
const db = require('./db')

menu()



function menu() {
    inquirer.prompt({
        type: "list",
        name: "menu",
        message: "choose the following options:",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "delete an employee",
            "update an employee role",
            'Exit'
        ]

    })
        .then(response => {

            switch (response.menu) {
                case "view all employees":
                    viewEmployees()
                    break;
                case "view all departments":
                    viewDepartments()
                    break;
                case "view all roles":
                    viewRoles()
                    break;
                case "add an employee":
                    addEmployees()
                    break;
                case "delete an employee":
                    deleteEmployees()
                    break;
                case "add a department":
                    addDepartments()
                    break;
                case "add a role":
                    addRoles()
                    break;
                case "update an employee role":
                    updateRole()
                    break;
                default:
                    process.exit()
            }


        })
}

function viewEmployees() {
    db.findEmployees().then(([data]) => {
        console.table(data)
    }).then(() => menu())
}
function viewDepartments() {
    db.findDepartments().then(([data]) => {
        console.table(data)
    }).then(() => menu())
}
function viewRoles() {
    db.findRoles().then(([data]) => {
        console.table(data)
    }).then(() => menu())
}
function addEmployees() {
    db.findRoles().then(([data]) => {
        let roleArray = data.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        db.findEmployees().then(([data]) => {
            let managerArray = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id
            }))
            
            managerArray.unshift({ name: 'null', value: null });
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What's the employees first name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What's the employees last name?"
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What's the employees role?",
                    choices: roleArray
                    // dropdown list of roles
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "What's the manager's id?",
                    choices: managerArray
                    // dropdown list of managers
                },
            ])

                .then((answer) => {
                    console.log(answer);
                    db.insertEmployee(answer)
                }).then(() => menu())
        })
    })
}
function deleteEmployees() {
    db.findEmployees().then(([data]) => {
        const employeeArray = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }));
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "What's the name of the employee that you're removing from the system?",
                choices: employeeArray
            },
        ])
            .then((answer) => {
                console.log(answer);
                db.deleteEmployee(answer.employee)
            }).then(() => menu())
    }
    )
}
function addDepartments() {
    //    add department prompt - name of new department
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What's the name of the new department?",
        },
    ])
        .then((answer) => {
            console.log(answer);
            db.insertDepartment(answer)
        }).then(() => menu())
}
function addRoles() {
    // select which department to add role to
    db.findDepartments().then(([data]) => {
        const departmentArr = data.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What's the name of the new role?",
            },
            {
                name: "salary",
                type: "input",
                message: "What's the salary of the new role?",
            },
            {
                name: "department_id",
                type: "list",
                message: "What's the department of the new role?",
                choices: departmentArr
            },
        ])
            .then((answer) => {
                console.log(answer);
                db.insertRole(answer)
            }).then(() => menu())
    }
    )
}
function updateRole() {
    db.findEmployees().then(([data]) => {
        const empArray = data.map(({ id, first_name, last_name }) => ({
            name: first_name + last_name,
            value: id
        }));
        db.findRoles().then(([data]) => {
            const roleArray = data.map(({ id, title }) => ({
                name: title,
                value: id
            }))

            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Which employee would you like to update roles?",
                    choices: empArray
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "Which role would you like to update this employee to?",
                    choices: roleArray
                }

            ])
                .then((answer) => {
                    console.log(answer);
                    db.updateEmployee(answer.employee, answer.role_id)
                }).then(() => menu())
        })
    })

}