const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Management System" }).render();

  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        // Bonus
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        // Bonus
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        // Bonus
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        //  Bonus
        {
          name: "Remove Role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        //  Bonus
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return deleteEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return deleteDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return deleteRole();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewEmployeesByManager(){
  const manager = await db.getManager();
  
  const managerChoices = manager.map(({ id, first_name,last_name }) => {
    return {name:`${first_name} ${last_name}`,value:id}

  });
  const { managerId}  = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which manager would you like to see employees for?",
      choices: managerChoices
    }
  ]);
  const selectedManager = await db.findOne('employee',managerId)
  const employees = await db.findAllEmployeesByManager(managerId);
  if(employees.length){
    console.log(`\nEmployees with ${selectedManager[0].first_name} ${selectedManager[0].last_name} as a manager: \n`);
    console.table(employees);

  } else {
    console.log('\n');
    console.log(`There are currently no managers\n`)
  }
  
  loadMainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();
  
  const departmentChoices = departments.map(({ id, name }) => {
    return {name:name,value:id}
  });

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const employees = await db.findAllEmployeesByDepartment(departmentId);
  if (employees.length){
    console.log("\n");
    console.table(employees);
  } else {
    console.table('\nThere are currently no employees in this department.\n');
    
  }

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => {
    return {name:`${first_name} ${last_name}`,value:id}
  });

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

async function updateEmployeeManager (){
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => {
    return {name:`${first_name} ${last_name}`,value:id}
  });

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to update the manager for?",
      choices: employeeChoices
    }
  ]);
  const managers = await db.findAllPossibleManagers(employeeId);
  const managerChoices = managers.map(({ id, first_name, last_name }) => {
    return {name:`${first_name} ${last_name}`,value:id}
  });
  const employee = await db.findOne('employee',employeeId);
  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: `Select the employee you want as ${employee[0].first_name} ${employee[0].last_name}'s manager: `,
      choices: managerChoices
    }
  ]);
  db.updateEmployeeManager(employeeId,managerId)
  
  const manager = await db.findOne('employee',managerId);
  console.log(`\n${employee[0].first_name} ${employee[0].last_name}'s manager was changed to ${manager[0].first_name} ${manager[0].last_name}\n`)
  loadMainPrompts();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function addRole() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);

  console.log(`\nAdded ${role.title} to the database\n`);

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await db.createDepartment(department);

  console.log(`\nAdded ${department.name} to the database\n`);

  loadMainPrompts();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => {
    return {name:`${first_name} ${last_name}`,value:id}
  });
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `\nAdded ${employee.first_name} ${employee.last_name} to the database\n`
  );

  loadMainPrompts();
}

async function deleteEmployee () {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({id,first_name,last_name})=>{
    return {name:`${first_name} ${last_name}`,value:id}
  })
  const {employee} = await prompt([
    {
      type:'list',
      name: "employee",
      message: "Which employee would you like to delete?",
      choices:employeeChoices
    }
  ]);
  const deletedEmployee = await db.findOne('employee',employee)
  await db.removeEmployee(employee)
  console.log(
    `\n${deletedEmployee[0].first_name} ${deletedEmployee[0].last_name} removed from the database\n`
  );
  loadMainPrompts();
}

async function deleteRole () {
  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({id,title})=>{
    return {name:`${title}`,value:id}
  })
  const {role} = await prompt([
    {
      type:'list',
      name: "role",
      message: "Which role would you like to delete?",
      choices:roleChoices
    }
  ]);
  const deletedRole = await db.findOne('role',role)
  await db.removeOne('role',role)
  console.log(
    `\n${deletedRole[0].title} removed from the database\n`
  );
  loadMainPrompts();
}

async function deleteDepartment () {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({id,name})=>{
    return {name:`${name}`,value:id}
  })
  const {department} = await prompt([
    {
      type:'list',
      name: "department",
      message: "Which department would you like to delete?",
      choices:departmentChoices
    }
  ]);
  const deletedDepartment = await db.findOne('department',department)
  await db.removeOne('department',department)
  console.log(
    `\n${deletedDepartment[0].name} removed from the database\n`
  );
  loadMainPrompts();
}

function quit() {
  console.log("Thank you for using Employee Management Systems. Goodbye!");
  process.exit();
}

init()

