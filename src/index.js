import typeDefs from './schema.graphql';
import context from './context';
import resolvers from './resolvers';
import mocks from './mocks';

/*
 * For more information on the main data source object, see
 * https://ibm.biz/graphql-data-source-main
 */
export default {
  // TODO: Rename the context to describe the data source.
  namespace: 'DataSourceBase',
  context,
  typeDefs,
  resolvers,
  mocks,
};
