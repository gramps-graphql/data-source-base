import schema from './schema.graphql';
import resolvers from './resolvers';
import Connector from './connector';
import Model from './model';

export default {
  // This is used to reference the model (e.g. context.YourModel.getAll())
  context: 'CloudFoundryApp',
  model: new Model({ connector: new Connector() }),
  schema,
  resolvers,
};
