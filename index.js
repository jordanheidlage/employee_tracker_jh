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
    db.findRoles().then(([data]) => {
         roleArray = data.map(({ id, title }) => ({
            name: title,
            value: id
        }));
    })
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
            message: "What's the employees role id?",
            choices: roleArray
            // dropdown list of roles
        },
        {
            name: "manager_id",
            type: "input",
            message: "What's the manager's id?"
            // dropdown list of managers
        },
    ])
    .then((answer)=>{
        console.log(answer);
        db.insertEmployee(answer)
    }).then(() => menu ())
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
        const newRole = data.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        inquirer.prompt([
            {
                name: "title",
                type: "list",
                message: "What role should be updated?",
                choices: newRole
            },

        ])
    })
    // USE ADDROLES TO FIGURE THIS OUT

}