import { MockList } from 'graphql-tools';

/**
 * Creates a test for each field to ensure it returns a MockList.
 * @param  {Object} resolver    GraphQL mock resolver object
 * @param  {Array}  fieldArray  fields to check
 * @return {Array}              an array of test results
 */
const expectMockList = (resolver, fieldArray) =>
  fieldArray.map(field =>
    it(`returns a MockList for the ${field} field`, () =>
      expect(resolver[field]()).toBeInstanceOf(MockList)),
  );

export default expectMockList;
