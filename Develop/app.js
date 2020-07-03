// require packages and js files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array to store employees
let employeeArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member
function generateTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "teamSelection",
        choices: ["Manager", "Engineer", "Intern", "I don't want to add any more team members"],
      },
    ])
    .then((response) => {
      console.log(response);
      // Manager Questions displayed when user selects Manager
      if (response.teamSelection === "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your manager's name?",
              name: "name",
            },
            {
              type: "input",
              message: "What is your manager's id number?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your manager's email address?",
              name: "email",
            },
            {
              type: "input",
              message: "What is your manager's office number?",
              name: "officeNumber",
            },
          ])
          .then((response) => {
            console.log(response);
            // Store the responses from user input using Manager class
            let manager = new Manager(
              response.name,
              response.id,
              response.email,
              response.officeNumber
            );
            console.log(manager);
            // after pushing response to array, call function to ask user initial question
            employeeArray.push(manager);
            generateTeam();
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
      // Engineer Questions displayed when user selects Engineer
      else if (response.teamSelection === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Engineer's name?",
              name: "name",
            },
            {
              type: "input",
              message: "What is your Engineer's id number?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your Engineer's email address?",
              name: "email",
            },
            {
              type: "input",
              message: "What is your Engineer's github username?",
              name: "github",
            },
          ])
          .then((response) => {
            console.log(response);
            // Store the responses from user input using Engineer class
            let engineer = new Engineer(
              response.name,
              response.id,
              response.email,
              response.github
            );
            console.log(engineer);
            // PUSH the response to the employee array
            employeeArray.push(engineer);
            // call the function again to ask initial question to user
            generateTeam();
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
        // Intern Questions displayed when user selects Intern
      } else if (response.teamSelection === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Intern's name?",
              name: "name",
            },
            {
              type: "input",
              message: "What is your Intern's id number?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your Intern's email address?",
              name: "email",
            },
            {
              type: "input",
              message: "Where does your Intern attend school?",
              name: "school",
            },
          ])
          .then((response) => {
            console.log(response);
            // Store the responses from user input using Intern class
            let intern = new Intern(
              response.name,
              response.id,
              response.email,
              response.school
            );
            console.log(intern);
            // PUSH the response to the employee array
            employeeArray.push(intern);
            // call the function again to ask initial question to user
            generateTeam();
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      } else if (response.teamSelection === "I don't want to add any more team members") {
        console.log("Finished generating team!");
        // Write file that renders user input to team.html
        fs.writeFile("./output/team.html", render(employeeArray), function (err) {
          if (err) {
            throw err;
          }
          console.log("successfully wrote into output folder");
        });
      }
    });
}
//Calling to run function
generateTeam();
