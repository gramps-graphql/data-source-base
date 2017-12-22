import { MockList } from 'graphql-tools';
import casual from 'casual';

export default {
  // TODO: Update to mock all schema types and fields
  PFX_DataSourceBase: () => ({
    id: casual.uuid,
    name: casual.name,
    lucky_numbers: () => new MockList([0, 3]),
  }),
};
