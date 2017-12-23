import context from '../src/context';

describe('Data Source Context', () => {
  describe('getById()', () => {
    it('loads data by its ID', () => {
      expect(context.getById(123)).toEqual({
        id: 123,
        name: 'GrAMPS GraphQL Data Source Base',
        lucky_numbers: [1, 2, 3, 5, 8, 13, 21],
      });
    });
  });
});
