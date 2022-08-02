const inquirer=require("inquirer")
const db=require("./config/connection")

db.connect( ()=>{
    menu()
})

const menuQuestion=[
    {
        type:"list",
        name:"menu",
        message:"choose the following options:",
        choices:["view all departments"," view all roles","view all employees","add a department","adda role","add an employee","update an employee role"]

    }
]
const employeeAddQuestions=[
    {
        type:"input",
        name:"first_name",
        message:"what is your first name?",
    },
    {
        type:"input",
        name:"last_name",
        message:"what is your last name?",
    }
]
function menu(){
    inquirer.prompt(menuQuestion)
    .then(response=>{
        if(response.menu==="view all employees"){
            viewEmployees()
        }
        else if(response.menu==="add an employee"){
                addEmployees()
        }
    })
}

function viewEmployees(){
    db.query
}
function addEmployees(){

}