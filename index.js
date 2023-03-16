const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "business_db",
});

//contstruct db queries ? What all needs to be queried and what functions should they be placed in?

//db.query for SELECT * employees (i.e. view all employees)

//db.query for ADD employee ()

//db.query for UPDATE employee role

//db.query for View all roles

//db.query for ADD role

//db.query for View all Departments

//db.query for ADD department

// final function 'function init()' most likely, to restart the prompt when the user selects "Restart(?)" and exits out of the CLI app when the user selects "Quit".
// const initQuestions = [{
//     type: "list",
//     name: "userchoice",
//     message: "What would you like to do?",
//     choices: Object.prompt.
// }];

// construct inquirer prompt - What should this look like / how many do I want?  Just 1 and switch statement? Or multiple prompts and no switch statement?
const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "userchoice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      switch (data.userchoice) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Quit":
          console.log("G'bye");
          process.exit();
      }
    });
};

const viewAllEmployees = () => {
  console.log("View all Employees Selected");
  db.query("SELECT * FROM employee", (err, results) => {
    err ? console.error(err) : console.log("\n");
    console.table(results);
  });
  promptUser();
};

const addEmployee = () => {
  promptUser();
};

const updateEmployeeRole = () => {
  promptUser();
};

const viewAllRoles = () => {
  promptUser();
};

const addRole = () => {
  promptUser();
};

const viewAllDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(results);
  });
  promptUser();
};

const addDepartment = () => {
  promptUser();
};

promptUser();
// continue to make consts for each case in the switch and call your inquirer prompt inside each
