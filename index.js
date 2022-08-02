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

function menu(){

}