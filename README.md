<a href="https://gramps.js.org/"><img src="https://gramps.js.org/assets/img/gramps-banner.png" alt="GrAMPS · An easier way to manage the data sources powering your GraphQL server" width="450"></a>

# GrAMPS GraphQL Data Source Base

[![Build Status](https://travis-ci.org/gramps-graphql/data-source-base.svg?branch=master)](https://travis-ci.org/gramps-graphql/data-source-base) [![Maintainability](https://api.codeclimate.com/v1/badges/1858e5dd8acfad0d4540/maintainability)](https://codeclimate.com/github/gramps-graphql/data-source-base/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1858e5dd8acfad0d4540/test_coverage)](https://codeclimate.com/github/gramps-graphql/data-source-base/test_coverage) [![npm version](https://img.shields.io/npm/v/@gramps/data-source-base.svg?style=flat)](https://www.npmjs.com/package/@gramps/data-source-base) [![Greenkeeper badge](https://badges.greenkeeper.io/gramps-graphql/data-source-base.svg)](https://greenkeeper.io/)

A boilerplate and minimal example for a [GrAMPS data source](https://gramps.js.org/data-source/data-source-overview/).

## Quickstart

Set up a local data source in seconds with:

```bash
# 💥 zero dependencies! no global installs! create a new data source
npx graphql-cli create -b gramps-graphql/data-source-base data-source-mydata

# 📂 move into the newly-created data source
cd $_

# 🚀 start the GraphQL Playground with your spankin’ new data source
yarn dev
```

> **NOTE:** We recommend prefixing data source projects with `data-source-` for clarity and the eventual support of CLI tools to add data sources to your gateway. So if you’re creating a user management data source for the Acme company, we recommend `data-source-acme-users` or `data-source-acmeusers` as a directory/repo name.

> **ALSO NOTE:** `$_` is a handy shortcut for using the last argument passed to the previous command. It [also does other stuff](https://unix.stackexchange.com/questions/280453/understand-the-meaning-of), but that's a rabbit hole for another time.

After running `yarn dev`, you’ll see a message with URLs for the GraphQL gateway and the [GraphQL Playground](https://github.com/graphcool/graphql-playground). Open the Playground link (usually http://localhost:8080/playground if you don’t already have something running on port 8080), then run a query:

```graphql
{
    getById(id: 123) {
        id
        name
        lucky_numbers
    }
}
```

### To Develop with Mock Data

Add the `--mock` flag to enable mock data, which is helpful for working offline.

```sh
# Start the gateway with mock data
yarn dev --mock
```

See `src/mocks.js` to modify your mock resolvers.

> **NOTE:** For more information on the GrAMPS CLI and its available options, [check out the docs](https://gramps.js.org/cli/cli-overview/).

### To Run the Tests

GrAMPS data sources start you off with 100% test coverage so you can build high-reliability GraphQL servers without a bunch of setup work.

Run the tests with:

```bash
yarn test
```

## What's Inside?

Inside, you’ll find:

* **Schema** — type definitions for GraphQL to interpret the data (see the
  [GraphQL docs on schemas](http://graphql.org/learn/schema/))
* **Resolvers** — functions to map the results of calls to model methods to
  the schema
* **Mock Resolvers** — mock functions for offline development
* **Context** — an object with methods to interact with data that is passed to resolver functions

Each file contains a `TODO` comment explaining the changes you’ll need to make to create a working data source.

The goal of this repo is to provide enough code to allow a working example of a data source and its related tests, but to limit how much boilerplate needs to be edited to get your own data source implemented.

## Code Quality and Continuous Integration

To help ensure a reliable, easy-to-maintain data source, this example also includes:

* Configuration for Travis CI (for automated testing) and Code Climate
  (for quality analysis)
* Starts you off right with test coverage at 💯
* Provides testing helpers for common resolver testing patterns
* Comes with docs! https://gramps.js.org/data-source/data-source-overview/

### Notes for Developers

Currently, there is no watch capability (PRs welcome!), so the service needs to be stopped (`control` + `C`) and restarted (`yarn dev`) to reflect new changes to the data source.
