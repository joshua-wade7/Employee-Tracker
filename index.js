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
          "Quit",
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

//update table to include managers.
const viewAllEmployees = () => {
  console.log("View all Employees Selected");
  db.query(
    `SELECT employee.id,
                  employee.first_name,
                  employee.last_name,
                  role.title,
                  department.name AS department,
                  role.salary,
                  CONCAT (manager.first_name, " ", manager.last_name) AS manager
                  FROM employee
                  LEFT JOIN role ON employee.role_id = role.id
                  LEFT JOIN department ON role.department_id = department.id
                  LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    (err, results) => {
      err ? console.log(err) : console.log("\n");
      console.table(results);
      promptUser();
    }
  );
};

const addEmployee = () => {
  db.query("SELECT * FROM role", (err, roles) => {
    if (err) console.log(err);
    roles = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the first name of new employee",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the last name of new employee",
        },
        {
          type: "list",
          name: "role_id",
          message: "Enter the new role of the employee",
          choices: roles,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Assign a Manager to the new employee",
          choices: [1, 2],
        },
      ])
      .then(({ first_name, last_name, role_id, manager_id }) => {
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`,
          (err, data) => {
            err ? console.log(err) : console.log("Created New Employee");
            promptUser();
          }
        );
      });
  });
};

const updateEmployeeRole = () => {
  db.query(
    `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`,
    (err, data) => {
      db.query(
        "SELECT id AS value, title as name FROM role",
        (err, roleData) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee_id",
                message: "Which employee role do you want to update?",
                choices: data,
              },
              {
                type: "list",
                name: "role_id",
                message:
                  "Which role do you want to assign the selected employee?",
                choices: roleData,
              },
            ])
            .then((data) => {
              let id = data.employee_id;
              let role_id = data.role_id;
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [role_id, id],
                (err, data) => {
                  err ? console.log(err) : console.log("updated employee role");
                  promptUser();
                }
              );
            });
        }
      );
    }
  );
};

const viewAllRoles = () => {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department on role.department_id = department.id",
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log("\n");
      console.table(results);
      promptUser();
    }
  );
};

const addRole = () => {
  db.query("SELECT id AS value, name FROM department", (err, data) => {
    if (err) {
      throw err;
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the title?",
        },
        {
          type: "input",
          name: "salary",
          message: "How much is the salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department will this title belong to?",
          choices: data,
        },
      ])
      .then(({ title, salary, department_id }) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`,
          (err, data) => {
            err ? console.log(err) : console.log("Created new role");
            promptUser();
          }
        );
      });
  });
};

const viewAllDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(results);
    promptUser();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new Department?",
      },
    ])
    .then(({ name }) => {
      db.query(
        `INSERT INTO department (name) VALUES ("${name}")`,
        (err, data) => {
          err ? console.log(err) : console.log("Created New Department");
          promptUser();
        }
      );
    });
};

promptUser();
// continue to make consts for each case in the switch and call your inquirer prompt inside each
