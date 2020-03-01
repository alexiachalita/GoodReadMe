function generateMarkdown(data) {
  return `
Title: ${data.title}
Description: ${data.description}
Table of Contents: ${data.contents}
Photo: (${data.avatarUrl})
Installation: ${data.installation}
Usage Required: ${data.usage}
Contributers: ${data.contributers}
Tests: ${data.tests}
Badges: ${data.badges}

Licensing: This project is licensed under ${data.license}
`;
}

module.exports = generateMarkdown;
