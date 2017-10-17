import { GraphQLModel, GrampsError } from '@gramps/gramps-express';

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
    return this.connector.get(`/data/${id}`).catch(res =>
      this.throwError(res, {
        description: 'This is an example call. Add your own!',
        docsLink:
          'https://gramps-graphql.github.io/gramps-express/data-source/tutorial/',
      }),
    );
  }

  /**
   * Throws a custom GrAMPS error.
   * @param  {Object}  error            the API error
   * @param  {Object?} customErrorData  additional error data to display
   * @return {void}
   */
  throwError(error, customErrorData = {}) {
    // TODO Edit these defaults to be helpful for people using your data source.
    const defaults = {
      statusCode: error.statusCode || 500,
      errorCode: `${this.constructor.name}_Error`,
      description: error.message || 'Something went wrong.',
      targetEndpoint: error.options ? error.options.uri : null,
      graphqlModel: this.constructor.name,
      docsLink: null,
    };

    throw GrampsError({
      ...defaults,
      ...customErrorData,
    });
  }
}
