const inquirer = require('inquirer');
const fs = require('fs');
let licenseURL;

// Page content
const generateREADME = (answers) =>
  `# ${answers.projectName}
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  Launch App: <a href="${answers.deployedURL}">${answers.deployedURL}</a><br />
  ## Description<br />
  ${answers.projectDescription}<br />
  ## Installation Instructions<br />
  ${answers.projectInstallation}<br />
  ## Usage Instructions<br />
  ${answers.projectUsage}<br />
  ## Contributions<br />
  ${answers.projectContributions}<br />
  ## Testing<br />
  ${answers.projectTesting}<br />
  ## License<br />
  ${answers.projectLicense}<br />
`  

// Prompt user for input.
inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'deployedURL',
      message: 'Enter full deployed URL:',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Describe the project (2-3 sentences):',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'projectInstallation',
      message: 'Enter installation instructions:',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'projectUsage',
      message: 'Enter instructions for use:',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'projectContributions',
      message: 'Which people, libraries, resources, etc. helped development?',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'projectTesting',
      message: 'How can end users test this project?',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'list',
      choices: ["MIT License", "Apache License", "Mozilla Public License"],
      name: 'projectLicense',
      message: 'Choose a license:',

    },
])

    .then((answers) => {
    let licenseMarkup = answers.projectLicense
    
    if (licenseMarkup == 'MIT License') {
      answers.projectLicense = `Use of this project is subject to the terms and conditions of the <a href="https://www.mit.edu/~amini/LICENSE.md">MIT License</a>.`
    }
    if (licenseMarkup == 'Apache License') {
      answers.projectLicense = `Use of this project is subject to the terms and conditions of the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License</a>.`;
      licenseURL = `https://opensource.org/licenses/Apache-2.0`
    }
    if (licenseMarkup == 'Mozilla Public License') {
      answers.projectLicense = `Use of this project is subject to the terms and conditions of the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License</a>.`
    }



    const mdPageContent = generateREADME(answers);
    
    fs.writeFile('./testing/README.md', mdPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );
  });
