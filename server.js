const inquirer = require('inquirer');
const mysql = require('mysql2');
const route = require('./routes');
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'password',
//     database:'ems'
// },
// console.log('Connected to database')
// );

// db.connect(function(err){
//     if(err){
//         console.error(err);
//         return
//     }
    
// })
// Add role
const addRole = () => {
    inquirer
    .prompt([
        {
            type:'input',
            name:'newRole',
            message:'Enter the name of the new role: '
        },
        {
            type:'input',
            name:'salary',
            message:'Enter the salary for the new role: '
        },
        {
            type:'input',
            name:'department',
            message:'Enter the department the new role belongs to: '
        },
    ]).then(answers=>{
        console.log(answers);
        db.query(
            `INSERT INTO role (name,salary,department) VALUES ('${answers.newRole}',${parseInt(answers.salary)},'${answers.department}')`,
            function(err,results,fields){
                // console.error(err);
                // console.log(results);
                // console.log(fields);
            }
        )
        mainMenu();
    })
    // Name of role?
    // Salary of role
    // What department does role belong to
}
// View roles
const showRoles = () => {

}
// Add employee
const addEmployee = () => {
    // first name
    // last name
    // selectRole
    // Select manager
}
// View employees
const showEmployees = () =>{

}
// Update employee role 
const changeRole = () => {
    // select employee
    // what role to change to
}
// Add department
const addDepartment = () =>{
    // Whats name of department
    mainMenu()
}
// View departments
const showDepartments = () => {

}
// const route = (choice) => {
//     switch (choice){
//         case 'Add a new role':
//             addRole();
//             break;
//         case 'showRoles':
//             showRoles();
//             break;
//         case 'addEmployee':
//             addEmployee();
//             break;
//         case 'View all employees':
//             showEmployees();
//             break;
//         case 'changeRole':
//             changeRole();
//             break;
//         case 'addDepartment':
//             addDepartment();
//             break;
//         case 'showDepartments':
//             showDepartments();
//             break;
//         default:
//             // Ends program
//             db.end()
//             break;
//     }
// }
const mainMenu =() =>{
    inquirer
        .prompt([
            {
                type:'list',
                name:'choice',
                message:'What would you like to do? ',
                choices:['View all employees','showRoles','addEmployee','Add a new role','done']
            }
        ]).then(answer=>
            {
                route(answer.choice)
            })
}

mainMenu()

module.exports = {
    mainMenu
};
