import { GraphQLModel } from '@console/graphql-data-source-helpers';
import Model from '../src/model';
import Connector from '../src/connector';

jest.mock('../src/connector', () =>
  jest.fn(() => ({
    get: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
  })),
);

const connector = new Connector();
const model = new Model({ connector });

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

describe('CloudFoundry Model', () => {
  it('inherits the GraphQLModel class', () => {
    expect(model).toBeInstanceOf(GraphQLModel);
  });

  describe('getAppByGuid()', () => {
    it('calls the correct endpoint with a given GUID', () => {
      const spy = jest.spyOn(connector, 'get');

      model.getAppByGuid('1234');
      expect(spy).toHaveBeenCalledWith('/apps/1234/summary');
    });

    it('throws a BluemixGraphQLError if something goes wrong', async () => {
      expect.assertions(1);

      model.connector.get.mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      try {
        await model.getAppByGuid('1234');
      } catch (error) {
        expect(error.isBoom).toEqual(true);
      }
    });
  });

  describe('updateAppByGuid()', () => {
    it('sends a request to the proper endpoint', () => {
      const spy = jest.spyOn(connector, 'put');

      model.updateAppByGuid('1234', {
        foo: 'bar',
        environment_json: [{ key: 'key', value: 'value' }],
      });

      expect(spy).toHaveBeenCalledWith('/apps/1234', {
        foo: 'bar',
        environment_json: { key: 'value' },
      });
    });

    it('will not override env vars unless provided', () => {
      const spy = jest.spyOn(connector, 'put');

      model.updateAppByGuid('1234', {
        foo: 'bar',
      });

      expect(spy).toHaveBeenCalledWith('/apps/1234', {
        foo: 'bar',
      });
    });

    it('throws a BluemixGraphQLError if something goes wrong', async () => {
      expect.assertions(1);

      model.connector.put.mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      try {
        await model.updateAppByGuid('1234', {});
      } catch (error) {
        expect(error.isBoom).toEqual(true);
      }
    });
  });

  describe('handleError()', () => {
    it('converts a Cloud Foundry error into a BluemixGraphQLError', async () => {
      expect.assertions(6);

      model.connector.get.mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      try {
        await model.getAppByGuid(1234);
      } catch (error) {
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
          'CloudFoundryAppModel',
        );
      }
    });
  });
});
