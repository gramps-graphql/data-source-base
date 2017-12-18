import dataSource from '../src';

// TODO: Update the data source name.
const DATA_SOURCE_NAME = 'DataSourceBase';

describe(`Data Source: ${DATA_SOURCE_NAME}`, () => {
  it('contains a namespace property', () => {
    expect(dataSource.namespace).toBe(DATA_SOURCE_NAME);
  });

  it('contains a context property', () => {
    expect(dataSource.context).toBeTruthy();
  });

  it('contains a typeDefs property', () => {
    expect(dataSource.typeDefs).toBeTruthy();
  });

  it('contains a resolvers property', () => {
    expect(dataSource.resolvers).toBeTruthy();
  });

  it('contains a mocks property', () => {
    expect(dataSource.mocks).toBeTruthy();
  });
});
