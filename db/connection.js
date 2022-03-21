const mysql = require('mysql2');
const util  = require('util');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employee_management_db'
},
console.log('Connected to database')
);

connection.connect(function(err){
    if(err){
        console.error(err);
        return
    }
    
})

connection.query = util.promisify(connection.query);

module.exports = connection;
