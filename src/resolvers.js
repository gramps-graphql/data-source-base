export default {
  Query: {
    // TODO: Update query resolver name(s) to match schema queries
    getById: (_, { id }, context) =>
      // TODO: Update to use the model and call the proper method.
      context.getById(id),
  },
  // TODO: Update to reference the schema type(s) and field(s).
  PFX_DataSourceBase: {
    name: data => data.name || null,
  },
};
