// Include packages needed for this application

// npm package for interactive command line user interfaces
const inquirer = require('inquirer');
// this is our connection to the DB
const db = require('./db/connection'); 

// main menu function to prompt the user for their choice of action
function mainMenu() {
    inquirer.prompt({
        name: 'action',
        // Use list type for single selection
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    })
    .then((answer) => {

    // Logic to call functions that query database
    //  and show data to user or update data in DB
    switch (answer.action) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        case 'Exit':

            // Close the database connection before exiting
            db.end((err) => {
                if (err) {
                    console.error('Error closing the database connection', err);
                } else {
                    console.log('Database connection closed.');
                    // Exit the application gracefully
                    process.exit();
                }
            });
            break;
        }
    });
}

// Function to view all departments in DB
function viewDepartments() {

    // query DB for department table
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

// Function to view all roles in  DB
function viewRoles() {

    // query DB for role table
    db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

// Function to view all employees in DB
function viewEmployees() {

    // query DB for employee table
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

// Function to add a department to DB
function addDepartment() {

    inquirer.prompt([
      {
        name: 'departmentName',
        type: 'input',
        message: 'What is the name of the department?'
      }

    ]).then(answer => {

        // SQL query to insert the new department
        const sql = `INSERT INTO department (departmentName) VALUES (?)`;
        db.query(sql, answer.departmentName, (err, result) => {
        if (err) throw err;
        console.log(`Added ${answer.departmentName} to the database`);
        // viewDepartments(); // to confirm department was added to DB
        mainMenu();
        });
    }).catch(error => console.error(error));
}

// Function to add a role to DB
function addRole() {

    // fetch departments to allow the user to select which one the role belongs to
    db.query('SELECT * FROM department', (err, departments) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'What is the title of the role?'
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'What is the salary for this role?',
          // Ensure input is a number
          validate: value => !isNaN(value) ? true : 'Please enter a number'
        },
        {
          name: 'departmentId',
          type: 'list',
          choices: departments.map(dept => ({ name: dept.departmentName, value: dept.departmentId })),
          message: 'Which department does this role belong to?'
        }

      ]).then(answers => {

        // SQL query to insert the new role
        const sql = `INSERT INTO role (roleTitle, roleSalary, departmentId) VALUES (?, ?, ?)`;
        const params = [answers.roleTitle, answers.roleSalary, answers.departmentId];
        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log(`Added ${answers.roleTitle} to the database`);
        //   viewRoles(); // to confirm role was added to DB
          mainMenu();
        });
      }).catch(error => console.error(error));
    });
  }
  
// Function to add an employee to DB
function addEmployee() {

    // fetch roles for the user to select the employee's role
    let sql = `SELECT roleId, roleTitle FROM role`;
    db.query(sql, (err, roles) => {
        if (err) throw err;
        roles = roles.map(role => ({ name: role.roleTitle, value: role.roleId }));

        // fetch employees to allow the user to select the manager for the new employee
        sql = `SELECT employeeId, CONCAT(firstName, ' ', lastName) AS fullName FROM employee`;
        db.query(sql, (err, employees) => {
            if (err) throw err;
            // Option for no manager
            employees.push({ name: 'None', value: null });
            employees = employees.map(emp => ({ name: emp.fullName, value: emp.employeeId }));

            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employee\'s first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employee\'s last name?'
                },
                {
                    name: 'roleId',
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    choices: roles
                },
                {
                    name: 'managerId',
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    choices: employees
                }

            ]).then(answers => {

                // SQL query to insert the new employee
                sql = `INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)`;
                const params = [answers.firstName, answers.lastName, answers.roleId, answers.managerId];
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.firstName} ${answers.lastName} to the database`);
                    // viewEmployees(); // to confirm employee was added to DB
                    mainMenu();
                });
            }).catch(error => console.error(error));
        });
    });
}

// Function to update an employee role in DB
function updateEmployeeRole() {

    // fetch employees for the user to select which one to update
    db.query(`SELECT employeeId, CONCAT(firstName, ' ', lastName) AS fullName FROM employee`, (err, employees) => {
        if (err) throw err;
        employees = employees.map(emp => ({ name: emp.fullName, value: emp.employeeId }));
        // fetch roles for the user to select the new role
        db.query(`SELECT roleId, roleTitle FROM role`, (err, roles) => {
            if (err) throw err;
            roles = roles.map(role => ({ name: role.roleTitle, value: role.roleId }));

            inquirer.prompt([
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Which employee\'s role do you want to update?',
                    choices: employees
                },
                {
                    name: 'newRoleId',
                    type: 'list',
                    message: 'What is the new role?',
                    choices: roles
                }

            ]).then(answers => {
                
                // SQL query to update the employee's role
                const sql = `UPDATE employee SET roleId = ? WHERE employeeId = ?`;
                const params = [answers.newRoleId, answers.employeeId];
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log(`Employee's role updated in the database`);
                    // viewRoles(); // to confirm employee role was added to DB
                    mainMenu();
                });
            }).catch(error => console.error(error));
        });
    });
}

// Start the application
mainMenu();