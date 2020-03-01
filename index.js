require('dotenv').config();
const api = require('./api');
const generateMarkdown = require('./generateMarkdown');
const inquirer = require('inquirer');
const fs = require('fs');


const questionStrings = [
    'What is your github project title?',
    'What is your github project description?',
    'What is your github project licensed under?',
    'What is your github project table of contents?',
    'How is your github project installed?',
    'How is this application used?',
    'Who contributers to your github project?',
    'How are you running tests on your github project?',
    'What badges does your github project have?',

    
];

async function askQuestions() {
    try {
    const questions = questionStrings.map(q=> ({ name: q, type: 'input' }));
    const answers = await inquirer.prompt(questions);
    return questionStrings.map(question => answers[question]);
    } catch(err) {
        console.log('Error prompting user questions', err);
    }  
}

async function getUsername() {
    try {
        const answer = await inquirer
            .prompt([
                {
                    name: "What is your github username?",
                    type: "input"
                }
            ]);
        const data = await api.getUser(answer["What is your github username?"]);
        return data;
    } catch (err) {
        console.log('Error fetching github data', err);
    }
}

function writeToFile(fileName, data) {
    fs.appendFile(fileName, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

async function init() {
    const data = {};
    const { avatar_url }= await getUsername();
    data.avatarUrl = avatar_url;
    const answers = await askQuestions();
    data.title = answers[0];
    data.description = answers[1];
    data.license = answers[2];
    data.contents = answers[3];
    data.installation = answers[4];
    data.usage = answers[5];
    data.contributers = answers[6];
    data.tests = answers[7];
    data.badges = answers[8];



    const str = generateMarkdown(data);
    writeToFile('readme.md', str);
}

init();
