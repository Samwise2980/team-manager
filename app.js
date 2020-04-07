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
let employees = [];

function mainPrompt () {
  inquirer
  .prompt([
    {
      type: "list",
      name: "role",
      message: "Who would you like to add?", 
      choices: ["Manager", "Engineer", "Intern", "All Done"]
    }
  ])
  .then(answers => {
    switch (answers.role){
      case "Manager":
        managerPrompt()
        break;
      case "Engineer":
        engineerPrompt()
        break;
      case "Intern":
        internPrompt()
        break;
      default:
        render(employees);
        break;
    }
  }).then(response => {
    
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log("Something went wrong! Please try again.")
    }
  });
}


function managerPrompt(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is the managers name?", 
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is the managers email?", 
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the managers ID?", 
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is the managers Office Number?", 
    }
  ])
  .then(answers => {
    const newManger = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)
    employees.push(newManger);
    mainPrompt ();
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log("Something went wrong! Please try again.")
    }
  });
}


function engineerPrompt(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is the engineers name?", 
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the engineers email?", 
    },
    {
      type: "input",
      name: "engineerID",
      message: "What is the engineers ID?", 
    },
    {
      type: "input",
      name: "engineerGitHub",
      message: "What is the engineers GitHub name?", 
    }
  ])
  .then(answers => {
    const newEngineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGitHub)
    employees.push(newEngineer);
    mainPrompt ();
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log("Something went wrong! Please try again.")
    }
  });
}


function internPrompt(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "internName",
      message: "What is the interns name?", 
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is the interns email?", 
    },
    {
      type: "input",
      name: "internID",
      message: "What is the interns ID?", 
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is the name of the interns school name?", 
    }
  ])
  .then(answers => {
    const newIntern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
    employees.push(newIntern);
    mainPrompt ();
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log("Something went wrong! Please try again.")
    }
  });
}

mainPrompt();
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

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
