import { GraphQLConnector } from '@console/graphql-data-source-helpers';

export default class CloudFoundryAppConnector extends GraphQLConnector {
  /**
   * Env-specific API endpoint for Cloud Foundry.
   * @member {string}
   */
  apiBaseUri = `https://api.${process.env.cfDomain}/v2`;
}
