import {
  GraphQLModel,
  BluemixGraphQLError,
} from '@console/graphql-data-source-helpers';

const formatEnvVars = unformattedVars => {
  const envVars = {};

  unformattedVars.forEach(keyValuePair => {
    envVars[keyValuePair.key] = keyValuePair.value;
  });

  return envVars;
};

export default class CloudFoundryAppModel extends GraphQLModel {
  /**
   * Loads GitHub data for a given user
   * @param  {String}  username the username to load
   * @return {Promise}          resolves with the loaded user data
   */
  getAppByGuid(appGuid) {
    return this.connector
      .get(`/apps/${appGuid}/summary`)
      .catch(res => this.handleError(res));
  }

  updateAppByGuid(appGuid, updates) {
    // Only include env vars if they are passed-in/defined to avoid overriding them.
    const safeUpdates =
      updates.environment_json !== undefined
        ? {
            ...updates,
            environment_json: formatEnvVars(updates.environment_json),
          }
        : updates;

    return this.connector
      .put(`/apps/${appGuid}`, safeUpdates)
      .catch(res => this.handleError(res));
  }

  handleError(response) {
    throw BluemixGraphQLError({
      statusCode: response.statusCode,
      description: response.error.description,
      errorCode: response.error.error_code,
      targetEndpoint: response.options.uri,
      graphqlModel: this.constructor.name,
    });
  }
}
