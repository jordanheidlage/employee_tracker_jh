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
            " view all roles",
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
                case "add an employee":
                    addEmployees()
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

function addEmployees() {

}