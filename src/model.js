import {
  GraphQLModel,
  BluemixGraphQLError,
} from '@console/graphql-data-source-helpers';

/*
 * For more information on data source models, see
 * https://ibm.biz/graphql-data-source-model
 */

// TODO: change `YourDataSourceModel` to a descriptive name
export default class YourDataSourceModel extends GraphQLModel {
  /**
   * Loads a thing by its ID
   * @param  {String}  id  the ID of the thing to load
   * @return {Promise}     resolves with the loaded user data
   */
  getById(id) {
    return this.connector
      .get(`/data/${id}`)
      .catch(res => this.handleError(res));
  }

  /**
   * Throws a BluemixGraphQLError using information from the error response.
   *
   * @see https://ibm.biz/graphql-helpers
   *
   * @param  {object} response  an error response
   * @return {void}
   */
  handleError(response) {
    // TODO: map your endpoint’s error response to the BluemixGraphQL
    throw BluemixGraphQLError({
      // An HTTP status code (e.g. 404).
      statusCode: response.statusCode,
      // A human-readable description of what went wrong (e.g. "Page not found").
      description: response.error.description,
      // An error code for looking up troubleshooting info (e.g. "MyApp_Err_NotFound").
      errorCode: response.error.error_code,
      // The endpoint that GraphQL was attempting to load (e.g. "https://api.example.org/user/123").
      targetEndpoint: response.options.uri,
      // The class where the error originated. (Don’t change this.)
      graphqlModel: this.constructor.name,
    });
  }
}
