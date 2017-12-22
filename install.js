/**
 * This is a helper file for use with the GraphQL CLI. It can be ignored if
 * you’re not working with the GraphQL CLI.
 *
 * @see https://github.com/graphql-cli/graphql-cli
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const globby = require('globby');
const fs = require('fs');
const pkg = require('./package.json');

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, 'utf8');
  const newContents = contents.replace(
    new RegExp(searchValue, 'g'),
    replaceValue,
  );
  fs.writeFileSync(filePath, newContents);
}

function replaceDefaultStringsInFiles(
  { namespace, prefix, templateName, project },
  fileGlob = ['{src,test}/**/*', 'package.json'],
) {
  const sourceFiles = globby.sync(fileGlob);
  const newType = `${prefix}_${namespace}`;
  const placeholder = `GrAMPS Data Source: ${namespace}`;

  sourceFiles.forEach(filePath => {
    replaceInFile(filePath, templateName, project);
    replaceInFile(filePath, 'PFX_DataSourceBase', newType);
    replaceInFile(filePath, 'DataSourceBase', namespace);
    replaceInFile(filePath, 'GrAMPS GraphQL Data Source Base', placeholder);
  });
}

const questions = [
  {
    type: 'input',
    name: 'namespace',
    message: 'Choose a unique namespace. Only letters and numbers are allowed.',
    default: 'MyDataSource',
    validate: input => !input.match(/\W/),
  },
  {
    type: 'input',
    name: 'prefix',
    message: 'Choose a short, unique prefix for your types.',
    default: 'PFX',
  },
];

module.exports = async ({ project, context }) => {
  const opts = await context.prompt(questions);

  replaceDefaultStringsInFiles({ ...opts, templateName: pkg.name, project });

  // eslint-disable-next-line no-console
  console.log(`

💥  You’re all set: a new GrAMPS data source has been created!

💡  Don’t forget to update "description", "contributors", and
   "repository" in \`package.json\` with your own information.

✅  Next steps:
   1. Change directory: \`cd ${project}\`
   2. Start local server: \`yarn dev\`
   3. Open the GraphQL Playground: http://localhost:8080/playground
   4. [BONUS] Set up Code Climate: http://bit.ly/2l0mvp9
  `);
};
