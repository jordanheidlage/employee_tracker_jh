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
    db.insertEmployee().then(([data]))

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
        const departmentArr = data.map(({ id, name }) => ({
            name: name,
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

}