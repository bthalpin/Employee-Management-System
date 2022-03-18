const inquirer =  require('inquirer');
const db = require('../../utils/database');
const showRoles = require('../role/showRoles');

const addEmployee = (callback) => {
    // first name
    // last name
    // selectRole
    // Select manager
    const allRoles = showRoles()
    allRoles.then((data)=>{

        inquirer
        .prompt([
            {
                type:'input',
                name:'firstName',
                message:'Enter your first name: '
            },
            {
                type:'input',
                name:'lastName',
                message:'Enter your last name: '
            },
            {
                type:'list',
                name:'role',
                message:'Select role: ',
                choices:data
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
            callback();
        })
        // Name of role?
        // Salary of role
        // What department does role belong to
    })
}

module.exports = addEmployee;