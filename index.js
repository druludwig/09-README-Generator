const inquirer = require('inquirer');
const fs = require('fs');

const generateHTML = (readmeContent) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>${readmeContent.name} | Profile</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${readmeContent.name}</h1>
    <p class="lead">I am from ${readmeContent.location}.</p>
    <p class="lead">${readmeContent.biography}.</p>
    <h3><span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">GitHub: My username is <a href="https://github.com/${readmeContent.github}">${readmeContent.github}</a></li>
      <li class="list-group-item">LinkedIn: <a href="https://www.linkedin.com/in/${readmeContent.linkedin}">View my LinkedIn</a></li>
    </ul>
  </div>
</div>
</body>
</html>`

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name:',
    },
    {
      type: 'input',
      name: 'location',
      message: 'Enter city:',
    },
    {
      type: 'input',
      name: 'biography',
      message: 'Enter a short Bio:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username:',
    },
    {
      type: 'input',
      name: 'linkedin',
      message: 'Enter your LinkedIn username:',
    },
  ])

  .then((readmeContent) => {
    const htmlPageContent = generateHTML(readmeContent);

    fs.writeFile('index.html', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
  });
