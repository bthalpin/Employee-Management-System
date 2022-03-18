const inquirer =  require('inquirer');
const db = require('../../utils/database');

const showRoles = (callback=null) => {
     return new Promise((resolve,reject)=> {
         
         db.query(
             'SELECT * FROM role;',
             (err,results,fields)=>{
                 if(err){
                     reject(new Error('Error'))
                 }else{
                     resolve(results)
                 }
                //  allRoles = results
                 // console.log(allRoles)  
                 
             }
         )

     })
    
}

module.exports = showRoles;