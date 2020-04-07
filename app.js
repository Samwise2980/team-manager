const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
let holder = "";

function mainPrompt () {
  inquirer
  .prompt([
    {
      type: "list",
      name: "role",
      message: "Who would you like to add?", 
      choices: ["Engineer", "Intern", "All Done"]
    }
  ])
  .then(answers => {
    switch (answers.role){
      case "Engineer":
        engineerPrompt()
        break;
      case "Intern":
        internPrompt()
        break;
      default:
        renderHTML();
        writeFile(holder);
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log("Something went wrong! Please try again.")
    }
  });
}


function renderHTML(){
  holder = render(employees);
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

function writeFile(response){
  fs.writeFile(outputPath, response, function (err) {
    if (err) throw err;
    console.log('Your team has been assembled!');
  });
}

managerPrompt()
