import { GraphQLModel } from '@console/gramps';
import Model from '../src/model';
import Connector from '../src/connector';

// Mock the connector because we’re only testing the model here.
jest.mock('../src/connector', () =>
  jest.fn(() => ({
    get: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
  })),
);

// TODO: Update the data source name.
const DATA_SOURCE_NAME = 'YourDataSource';

const connector = new Connector();
const model = new Model({ connector });

// TODO: Update this error to match the error format returned by your endpoint.
const mockError = {
  statusCode: 401,
  error: {
    description: 'test error',
    error_code: 'TEST_ERROR',
  },
  options: {
    uri: 'https://example.org/',
  },
};

describe(`${DATA_SOURCE_NAME}Model`, () => {
  it('inherits the GraphQLModel class', () => {
    expect(model).toBeInstanceOf(GraphQLModel);
  });

  // TODO: Update this test to use your model’s method(s).
  describe('getById()', () => {
    it('calls the correct endpoint with a given ID', () => {
      const spy = jest.spyOn(connector, 'get');

      model.getById('1234');
      expect(spy).toHaveBeenCalledWith('/data/1234');
    });

    it('throws a BluemixGraphQLError if something goes wrong', async () => {
      expect.assertions(1);

      model.connector.get.mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      try {
        // TODO: Update to use one of your model’s methods.
        await model.getById('1234');
      } catch (error) {
        expect(error.isBoom).toEqual(true);
      }
    });
  });

  describe('handleError()', () => {
    it('converts an error from the endpoint into a BluemixGraphQLError', async () => {
      expect.assertions(6);

      /*
       * To simulate a failed call, we tell Jest to return a rejected Promise
       * with our mock error.
       */
      model.connector.get.mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      try {
        // TODO: Update to use one of your model’s methods.
        await model.getById(1234);
      } catch (error) {
        // Check that BluemixGraphQLError properly received the error detail.
        expect(error).toHaveProperty('isBoom', true);
        expect(error.output).toHaveProperty('statusCode', 401);
        expect(error.output.payload).toHaveProperty(
          'description',
          'test error',
        );
        expect(error.output.payload).toHaveProperty('errorCode', 'TEST_ERROR');
        expect(error.output.payload).toHaveProperty(
          'targetEndpoint',
          'https://example.org/',
        );
        expect(error.output.payload).toHaveProperty(
          'graphqlModel',
          `${DATA_SOURCE_NAME}Model`,
        );
      }
    });
  });
});
