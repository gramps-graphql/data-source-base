import schema from './schema.graphql';
import resolvers from './resolvers';
import Connector from './connector';
import Model from './model';

/*
 * For more information on the main data source object, see
 * https://ibm.biz/graphql-data-source-main
 */
export default {
  // TODO: Rename the context to describe the data source.
  context: 'YourDataSource',
  model: new Model({ connector: new Connector() }),
  schema,
  resolvers,
};
