import resolvers from '../src/resolvers';
import expectMockFields from './helpers/expectMockFields';
import expectMockList from './helpers/expectMockList';
import expectNullable from './helpers/expectNullable';

// TODO: Update the data source name.
const DATA_SOURCE_NAME = 'YourDataSource';

describe(`${DATA_SOURCE_NAME} resolvers`, () => {
  it('returns valid resolvers', () => {
    expect(Object.keys(resolvers)).toEqual([
      'queryResolvers',
      'dataResolvers',
      'mockResolvers',
    ]);
  });

  describe('queryResolvers', () => {
    describe(DATA_SOURCE_NAME, () => {
      it('loads a thing by its ID', () => {
        expect.assertions(1);

        const req = {};

        // TODO: Update with mock arguments for your model method.
        const args = { id: 'abc1234' };

        // TODO: Update with the data source model name and method(s).
        const mockContext = {
          YourDataSource: {
            // For testing, we mock the model to simply return the ID.
            getById: id => Promise.resolve(id),
          },
        };

        return expect(
          // TODO: Update to use your data source.
          resolvers.queryResolvers.YourDataSource(req, args, mockContext),
        ).resolves.toEqual('abc1234');
      });
    });
  });

  describe('dataResolvers', () => {
    describe('PFX_YourDataSource', () => {
      const resolver = resolvers.dataResolvers.PFX_YourDataSource;

      expectNullable(resolver, ['name']);
    });
  });

  describe('mockResolvers', () => {
    /*
     * So, basically mock resolvers just need to return values without
     * exploding. To that end, we’ll just check that the mock response returns
     * the proper fields.
     */
    describe('PFX_YourDataSource', () => {
      const mockResolvers = resolvers.mockResolvers.PFX_YourDataSource();

      expectMockFields(mockResolvers, ['id', 'name', 'lucky_numbers']);
      expectMockList(mockResolvers, ['lucky_numbers']);
    });
  });
});
