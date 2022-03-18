const inquirer =  require('inquirer');
const db = require('../../utils/database');
const index = require('../index');
const server = require('../../server');

const addRole = () => {
    console.log(server)
    inquirer
    .prompt([
        {
            type:'input',
            name:'newRole',
            message:'Enter the name of the new role: '
        },
        {
            type:'number',
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
        // intAns = parseInt(answers.salary)
        db.query(
            `INSERT INTO role (name,salary,department) VALUES ('${answers.newRole}',${answers.salary},'${answers.department}')`,
            function(err,results,fields){
                // console.error(err);
                // console.log(results);
                // console.log(fields);
            }
        )
        server.mainMen();
    })
    // Name of role?
    // Salary of role
    // What department does role belong to
}

module.exports = addRole;