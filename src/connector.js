import { GraphQLConnector } from '@gramps/gramps-express';

// TODO: change `YourDataSourceConnector` to a descriptive name
export default class YourDataSourceConnector extends GraphQLConnector {
  /**
   * TODO: describe this API endpoint
   * @member {string}
   */
  apiBaseUri = `http://localhost:3000`;
}
