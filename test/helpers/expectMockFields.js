/**
 * Tests each field in an array to ensure each is mocked.
 * @param  {Object}   resolver    a GraphQL mock resolver
 * @param  {Array}    fieldArray  array of fields to check
 * @return {boolean}              true if the test passed, false otherwise
 */
const expectMockFields = (resolver, fieldArray) =>
  it('returns the proper mock fields', () =>
    expect(Object.keys(resolver)).toEqual(fieldArray));

export default expectMockFields;
