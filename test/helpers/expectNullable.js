/**
 * Generates a test for each field to ensure it returns null if it’s not set
 * @param  {Object} resolver    GraphQL resolver object
 * @param  {Array}  fieldArray  field names to check
 * @return {Array}              an array of test results
 */
const expectNullable = (resolver, fieldArray) =>
  fieldArray.map(field =>
    it(`returns null if ${field} doesn’t exist`, () =>
      expect(resolver[field]({})).toBeNull()),
  );

export default expectNullable;
