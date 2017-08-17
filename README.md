# Bluemix GraphQL Data Source: CloudFoundryApp

This data source exposes parts of the [Cloud Foundry API](https://apidocs.cloudfoundry.org/253/) via the [Bluemix GraphQL](https://github.ibm.com/bluemix/graphql) µ-service.

For more information about what data sources are and how they work, see https://ibm.biz/graphql-data-source

## Development

First, clone the repository and install dependencies:

```sh
# Clone the repo and move into the directory folder
git clone git@github.ibm.com:bluemix/graphql-data-source-cloudfoundryapp.git
cd graphql-data-source-cloudfoundryapp/

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
