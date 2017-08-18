# Bluemix GraphQL Data Source Base

- Provides templates for npm, Travis CI, and SonarQube
- Provides TODO comments next to all items that need to be edited
- Starts with the simplest possible example code to limit how much boilerplate editing is required
- Starts you off right with test coverage at 💯
- Provides testing helpers for common resolver testing patterns
- Comes with docs! https://ibm.biz/graphql-data-source

## Quickstart

```sh
# Clone the repo
git clone git@github.ibm.com:Bluemix/graphql-data-source-base.git graphql-data-source-YOUR_DATA_SOURCE_NAME

# Move into it
cd graphql-data-source-YOUR_DATA_SOURCE_NAME/

# Change the remote repo
git remote set-url origin git@github.ibm.com:Bluemix/YOUR_REPO_NAME.git

# Create a package.json
cp package.TEMPLATE.json package.json

# IMPORTANT: Edit name, description, author, and repository in package.json

# Install dependencies
npm install
```

### To Develop In Local Mode

Start the app with the following command:

```sh
# Run in local mode with mock data
npm run local
```

### To Develop in Atlas Mode

Create `config/app_env_private.json` by duplicating `config/app_env_private.TEMPLATE.json`. Inside, add the required private environment variables.

> **NOTE:** Information on where to get the required environment variables can 
> be found in the "How do I configure my application to use Bluemix?" section 
> of [this FAQ](https://ibm.biz/BdjXjr).

Next, start the app in Atlas mode:

```sh
# Run in Atlas mode with live data
npm run atlas
```

### Notes for Developers

Currently, there is no watch capability (PRs welcome!), so the service needs to be stopped (`control` + `C`) and restarted (`npm run [local|atlas]`) to reflect new changes to the data source.
