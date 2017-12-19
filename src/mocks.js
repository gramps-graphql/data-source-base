import { MockList } from 'graphql-tools';
import casual from 'casual';

export default {
  // TODO: Update to mock all schema fields and types.
  PFX_DataSourceBase: () => ({
    id: casual.uuid,
    name: casual.name,
    lucky_numbers: () => new MockList([0, 3]), // casual.array_of_digits(3),
  }),
};
