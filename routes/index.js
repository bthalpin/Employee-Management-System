const db = require('../utils/database');
const addRole = require('./role/addRole');
const showRoles = require('./role/showRoles');
const addEmployee = require('./employee/addEmployee')

const route = (choice,callback) => {
    switch (choice){
        case 'Add a new role':
            addRole(callback);
            break;
        case 'showRoles':
            showRoles(callback)
            .then(data=>{
                console.log(data);
                callback();
            });
            break;
        case 'addEmployee':
            addEmployee(callback);
            break;
        case 'View all employees':
            showEmployees(callback);
            break;
        case 'changeRole':
            changeRole(callback);
            break;
        case 'addDepartment':
            addDepartment(callback);
            break;
        case 'showDepartments':
            showDepartments(callback);
            break;
        default:
            // Ends program
            db.end()
            break;
    }
}



module.exports =  route;
