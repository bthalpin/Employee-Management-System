const mysql = require('mysql2');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'ems'
},
console.log('Connected to database')
);

db.connect(function(err){
    if(err){
        console.error(err);
        return
    }
    
})


module.exports = db;
