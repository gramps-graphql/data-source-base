import resolvers from '../src/resolvers';
import expectNullable from './helpers/expectNullable';

describe('Data Source Resolvers', () => {
  describe('query resolvers', () => {
    describe('getById()', () => {
      it('loads a thing by its ID', () => {
        expect.assertions(1);

        const mockContext = {
          getById: id => Promise.resolve(id),
        };

        return expect(
          resolvers.Query.getById({}, { id: 123 }, mockContext),
        ).resolves.toEqual(123);
      });
    });
  });

  describe('PFX_DataSourceBase', () => {
    const resolver = resolvers.PFX_DataSourceBase;

    expectNullable(resolver, ['name']);
  });
});
