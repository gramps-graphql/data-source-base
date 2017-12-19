import expectMockFields from './helpers/expectMockFields';
import expectMockList from './helpers/expectMockList';
import mocks from '../src/mocks';

describe('mock resolvers', () => {
  /*
    * So, basically mock resolvers just need to return values without
    * exploding. To that end, we’ll just check that the mock response returns
    * the proper fields.
    */
  describe('PFX_DataSourceBase', () => {
    const mockResolvers = mocks.PFX_DataSourceBase();

    expectMockFields(mockResolvers, ['id', 'name', 'lucky_numbers']);
    expectMockList(mockResolvers, ['lucky_numbers']);
  });
});
