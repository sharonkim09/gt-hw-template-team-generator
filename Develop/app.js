const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employeeArray = [];

function generateTeam(){inquirer
.prompt({
  type:"list",
  message:"Please select to add team member or No more team member",
  name:"teamSelection",
  choices:[
    "Manager",
    "Engineer",
    "Intern",
    "Done"
  ]
}).then(response =>{
  console.log(response);
  // making prompts for each role 
  if(response.teamSelection === "Manager"){
    inquirer.prompt([{
      type:"input",
      message: "What is your manager's name?",
      name:"name"
    },
    {
      type:"input",
      message: "What is your manager's id number?",
      name:"id"
    },
    {
      type:"input",
      message: "What is your manager's email address?",
      name:"email"
    },
    {
      type:"input",
      message: "What is your manager's office number?",
      name:"officeNumber"
    },
  ]).then((response)=>{
      console.log(response)
    // Store the responses from user input using Manager class
      let manager = new Manager(response.name,response.id,response.email,response.officeNumber)
      console.log(manager)
      // after pushing response to array, call function to ask user initial question
      employeeArray.push(manager)
      generateTeam();
    })
    .catch((err)=>{
      if(err){
        console.log(err)
      }
    })
  }
// user selects Engineer
else if(response.teamSelection === "Engineer"){
    inquirer.prompt([{
      type:"input",
      message: "What is your Engineer's name?",
      name:"name"
    },
    {
      type:"input",
      message: "What is your Engineer's id number?",
      name:"id"
    },
    {
      type:"input",
      message: "What is your Engineer's email address?",
      name:"email"
    },
    {
      type:"input",
      message: "What is your Engineer's github address?",
      name:"githubAddress"
    },
  ]).then((response)=>{
      console.log(response)
    // Store the responses from user input using Engineer class
      let engineer = new Engineer(response.name,response.id,response.email,response.githubAddress)
      console.log(engineer)
      // PUSH the response to the employee array
      employeeArray.push(Engineer)
      // call the function again to ask initial question to user
      generateTeam()
     
    })
    .catch((err)=>{
      if(err){
        console.log(err)
      }
    })

}
else if(response.teamSelection === "Intern"){
  inquirer.prompt([{
    type:"input",
    message: "What is your Intern's name?",
    name:"name"
  },
  {
    type:"input",
    message: "What is your Intern's id number?",
    name:"id"
  },
  {
    type:"input",
    message: "What is your Intern's email address?",
    name:"email"
  },
  {
    type:"input",
    message: "Where does your Intern attend school?",
    name:"school"
  },
]).then((response)=>{
    console.log(response)
  // Store the responses from user input using Engineer class
    let intern = new Intern(response.name,response.id,response.email,response.school)
    console.log(intern)
    // PUSH the response to the employee array
    employeeArray.push(intern)
    // call the function again to ask initial question to user
    generateTeam()
  })
  .catch((err)=>{
    if(err){
      console.log(err)
    }
  })

}
else if(response.teamSelection === "Done"){
  console.log("Finished generating team!")
  
}
})
}
generateTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

