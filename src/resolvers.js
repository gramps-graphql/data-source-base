import { MockList } from 'graphql-tools';
import casual from 'casual';

/*
 * For more information on data source resolvers, see
 * https://ibm.biz/graphql-data-source-resolvers
 */

export default {
  // Queries (where does the data come from?)
  queryResolvers: {
    // TODO: Update query resolver name(s) to match schema queries
    YourDataSource: (rootValue, { id }, context) =>
      new Promise((resolve, reject) => {
        // TODO: Update to use the model and call the proper method.
        context.YourDataSource
          .getById(id)
          .then(resolve)
          .catch(reject);
      }),
  },

  // Data fields (which data from the response goes to which field?)
  dataResolvers: {
    // TODO: Update to reference the schema type(s) and field(s).
    PFX_YourDataSource: {
      // If a field isn’t always set, but it shouldn’t break the response, make it nullable.
      name: data => data.name || null,
    },
  },

  // Mock data (How can I get real-feeling fake data while working offline?)
  mockResolvers: {
    // TODO: Update to mock all schema fields and types.
    PFX_YourDataSource: () => ({
      id: casual.uuid,
      name: casual.name,
      lucky_numbers: () => new MockList([0, 3]),
    }),
  },
};
