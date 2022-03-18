const db = require('../utils/database');
const addRole = require('./role/addRole');
const route = (choice) => {
    switch (choice){
        case 'Add a new role':
            addRole();
            break;
        case 'showRoles':
            showRoles();
            break;
        case 'addEmployee':
            addEmployee();
            break;
        case 'View all employees':
            showEmployees();
            break;
        case 'changeRole':
            changeRole();
            break;
        case 'addDepartment':
            addDepartment();
            break;
        case 'showDepartments':
            showDepartments();
            break;
        default:
            // Ends program
            db.end()
            break;
    }
}



module.exports =  route;
