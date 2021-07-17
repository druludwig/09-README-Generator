const inquirer = require('inquirer');
const fs = require('fs');
let licenseURL;
let licenseBadge;

// Page content
const generateREADME = (answers) =>
  `# ${answers.projectName}
  Launch App: <a href="${answers.deployedURL}">${answers.deployedURL}</a> <br />
  ${licenseURL}<br />
  ## Description<br />
  ${answers.projectDescription}<br />
  ## Contents
  - [Description](#Description)
  - [Installation](#Installation)
  - [Instructions](#Instructions)
  - [Contributions](#Contributions)
  - [Testing](#Testing)
  - [License](#License)
  - [Questions](#Questions?)
 
  ## Installation<br />
  ${answers.projectInstallation}<br />
  ## Instructions<br />
  ${answers.projectUsage}<br />
  ## Contributions<br />
  ${answers.projectContributions}<br />
  ## Testing<br />
  ${answers.projectTesting}<br />
  ## License<br />
  ${answers.projectLicense}<br />
  ## Questions?<br />
  - Please email any questions to: <a href="mailto:${answers.email}">${answers.email}</a>
  - Find me on GitHub: <a href="https://github.com/${answers.github}">${answers.github}</a><br />
  <br />

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
      message: 'Describe the project (Use <br /> for a new line):',
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
      message: 'Enter installation instructions (Use <br /> for a new line):',
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
      message: 'Enter instructions for use (Use <br /> for a new line):',
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
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter Github username:',
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("This field is required.");
        }
        return true;
      }
    },
])

// Build page based on responses
    .then((answers) => {
    let licenseMarkup = answers.projectLicense
    if (licenseMarkup == 'MIT License') {
      answers.projectLicense = `Use of this project is subject to the terms and conditions of the <a href="https://www.mit.edu/~amini/LICENSE.md">MIT License</a>.`;
      licenseURL = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
    }
    if (licenseMarkup == 'Apache License') {
      answers.projectLicense = `Use of this project is subject to the terms and conditions of the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License</a>.`;
      licenseURL = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
    }
    if (licenseMarkup == 'Mozilla Public License') {
      answers.projectLicense = `Use of this project is subject to the terms and conditions of the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License</a>.`;
      licenseURL = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
    }

    const mdPageContent = generateREADME(answers);
    
    fs.writeFile('./testing/README.md', mdPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );
  });
