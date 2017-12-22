export default {
  Query: {
    // TODO: Update query resolver name and args to match the schema
    // TODO: Update the context method to load the correct data
    getById: (_, { id }, context) => context.getById(id),
  },
  // TODO: Update to map data to your schema type(s) and field(s)
  PFX_DataSourceBase: {
    name: data => data.name || null,
  },
};
