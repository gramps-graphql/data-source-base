import { GraphQLConnector } from '@console/graphql-data-source-helpers';
import Connector from '../src/connector';

const connector = new Connector();

describe('CloudFoundry Connector', () => {
  it('inherits the GraphQLConnector class', () => {
    expect(connector).toBeInstanceOf(GraphQLConnector);
  });

  it('uses the appropriate URL', () => {
    expect(connector.apiBaseUri).toBe(`https://api.${process.env.cfDomain}/v2`);
  });
});
