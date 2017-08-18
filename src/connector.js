import { GraphQLConnector } from '@console/graphql-data-source-helpers';

// TODO: change `YourDataSourceConnector` to a descriptive name
export default class YourDataSourceConnector extends GraphQLConnector {
  /**
   * TODO: describe this API endpoint
   * @member {string}
   */
  apiBaseUri = `https://example.org/v2`;
}
