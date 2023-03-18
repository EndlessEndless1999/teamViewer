const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let team = [];
let finish = false;


// TODO: Write Code to gather information about the development team members, and render the HTML file.
function init(){
    inquirer
  .prompt([
    {
        type: 'input',
        name: 'ManagerName',
        message: 'Please enter the team managers name.'
    },
    {
        type: 'input',
        name: 'ManagerId',
        message: 'Please enter the team managers ID.'
    },
    {
        type: 'input',
        name: 'ManagerEmail',
        message: 'Please enter the team managers email.'
    },
    {
        type: 'input',
        name: 'ManagerOffice',
        message: 'Please enter the team managers office number.'
    },
    {
        type: 'list',
        name: 'Options',
        message: 'Please select a role to add to the team.',
        choices: ['Add an Engineer', 'Add an Intern', 'Finalise Team']
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const teamManager = new Manager(answers.ManagerName, answers.ManagerId, answers.ManagerEmail, answers.ManagerOffice);
    



    team.push(teamManager);

    checkAnswer(answers);



    
  });

}

function checkAnswer(answers){
  if (answers.Options === 'Finalise Team'){
    finish = true;
    update();
  }
  else if (answers.Options === 'Add an Engineer'){
    addEngineer();
  }
  else{
    addIntern();
  }
}

function addEngineer(){
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'EngineerName',
        message: 'Please enter the Engineers name.'
    },
    {
        type: 'input',
        name: 'EngineerId',
        message: 'Please enter the Engineers ID.'
    },
    {
        type: 'input',
        name: 'EngineerEmail',
        message: 'Please enter the Engineer email.'
    },
    {
        type: 'input',
        name: 'EngineerGithub',
        message: 'Please enter the Engineer Github.'
    },
    {
        type: 'list',
        name: 'Options',
        message: 'Please select a role to add to the team.',
        choices: ['Add an Engineer', 'Add an Intern', 'Finalise Team']
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const newEngineer = new Engineer(answers.EngineerName, answers.EngineerId, answers.EngineerEmail, answers.EngineerGithub);
    



    team.push(newEngineer);

    checkAnswer(answers);
  });

}


function addIntern(){
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'InternName',
        message: 'Please enter the Intern name.'
    },
    {
        type: 'input',
        name: 'InternId',
        message: 'Please enter the Intern ID.'
    },
    {
        type: 'input',
        name: 'InternEmail',
        message: 'Please enter the Intern email.'
    },
    {
        type: 'input',
        name: 'InternSchool',
        message: 'Please enter the Intern school.'
    },
    {
        type: 'list',
        name: 'Options',
        message: 'Please select a role to add to the team.',
        choices: ['Add an Engineer', 'Add an Intern', 'Finalise Team']
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const newIntern = new Manager(answers.InternName, answers.InternId, answers.InternEmail, answers.InternSchool);
    



    team.push(newIntern);

    checkAnswer(answers);



  
  });

}


function update(){
  if (finish){
    let html = render(team);
    fs.writeFileSync('./index.html', html);
  }
}

init();


