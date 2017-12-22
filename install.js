/**
 * This is a helper file for use with the GraphQL CLI. It can be ignored if
 * you’re not working with the GraphQL CLI.
 *
 * @see https://github.com/graphql-cli/graphql-cli
 */
const fs = require('fs');

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, 'utf8');
  const newContents = contents.replace(
    new RegExp(searchValue, 'g'),
    replaceValue,
  );
  fs.writeFileSync(filePath, newContents);
}

module.exports = async ({ project, context }) => {
  const opts = await context.prompt({
    type: 'input',
    name: 'test',
    message: 'Do prompts work in the install script?',
  });

  console.log(opts);

  const templateName = '@gramps/data-source-base';
  replaceInFile('package.json', templateName, project);

  console.log(`\
💥 You’re all set: a new GrAMPS data source has been created!

✅ Next steps:
  1. Change directory: \`cd ${project}\`
  2. Start local server: \`yarn dev\`
  3. Open the GraphQL Playground: http://localhost:8080/playground

💡 Don’t forget to update the following fields in \`package.json\`:
  -  description
  -  contributors
  -  repository
  `);
};
