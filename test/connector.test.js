import { GraphQLConnector } from '@gramps/gramps-express';
import Connector from '../src/connector';

// TODO: Update the data source name.
const DATA_SOURCE_NAME = 'YourDataSource';
const connector = new Connector();

describe(`${DATA_SOURCE_NAME}Connector`, () => {
  it('inherits the GraphQLConnector class', () => {
    expect(connector).toBeInstanceOf(GraphQLConnector);
  });

  it('uses the appropriate URL', () => {
    // TODO: Update the data source API endpoint.
    expect(connector.apiBaseUri).toBe(`https://example.org/v2`);
  });
});
