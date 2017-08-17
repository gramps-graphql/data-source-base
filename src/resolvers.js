import { MockList } from 'graphql-tools';
import casual from 'casual';

const objectHasFields = (obj, fields) => {
  const keys = Object.keys(obj);
  return keys.some(field => fields.includes(field));
};

const summaryFields = [
  'routes',
  'running_instances',
  'services',
  'available_domains',
];

const updateFields = [
  'url',
  'created_at',
  'updated_at',
  'space_url',
  'stack_url',
  'routes_url',
  'events_url',
  'service_bindings_url',
  'route_mappings_url',
];

export const cfaTypeResolver = obj => {
  if (objectHasFields(obj, summaryFields)) {
    return 'CFA_CloudFoundryAppSummary';
  }

  if (objectHasFields(obj, updateFields)) {
    return 'CFA_CloudFoundryAppUpdate';
  }

  return null;
};

export default {
  // Queries (where does the data come from?)
  queryResolvers: {
    CloudFoundryApp: ({ req }, { appGuid }, context) =>
      new Promise((resolve, reject) => {
        // Add the Bluemix token to the headers.
        context.CloudFoundryApp.connector.addBluemixToken(req);

        // Get the requested data and resolve the promise.
        context.CloudFoundryApp
          .getAppByGuid(appGuid)
          .then(resolve)
          .catch(reject);
      }),
  },

  mutationResolvers: {
    UpdateCloudFoundryApp: ({ req }, { appGuid, updates }, context) =>
      new Promise((resolve, reject) => {
        // Add the Bluemix token to the headers.
        context.CloudFoundryApp.connector.addBluemixToken(req);
        // Get the requested data and resolve the promise.
        context.CloudFoundryApp
          .updateAppByGuid(appGuid, updates)
          .then(response => {
            resolve({
              ...response.body.metadata,
              ...response.body.entity,
            });
          })
          .catch(reject);
      }),
  },

  // Data fields (which data from the response goes to which field?)
  dataResolvers: {
    CFA_CloudFoundryApp: {
      __resolveType: cfaTypeResolver,
    },
    CFA_CloudFoundryAppSummary: {
      appGuid: data => data.guid,
      environment_json: data => JSON.stringify(data.environment_json),
      docker_credentials_json: data =>
        JSON.stringify(data.docker_credentials_json),
    },
    CFA_CloudFoundryAppUpdate: {
      appGuid: data => data.guid,
      environment_json: data => JSON.stringify(data.environment_json),
      docker_credentials_json: data =>
        JSON.stringify(data.docker_credentials_json),
    },
    CFA_Route: {
      routerGuid: route => route.guid,
    },
    CFA_ConnectedService: {
      serviceGuid: connectedService => connectedService.guid,
    },
    CFA_ServicePlan: {
      servicePlanGuid: servicePlan => servicePlan.guid,
    },
    CFA_Domain: {
      domainGuid: domain => domain.guid,
      router_group_guid: domain => domain.router_group_guid || null,
      router_group_type: domain => domain.router_group_type || null,
    },
    CFA_Service: {
      serviceGuid: service => service.guid,
    },
  },

  // Mock data (How can I get real-feeling fake data while working offline?)
  mockResolvers: {
    CFA_CloudFoundryAppSummary: () => ({
      appGuid: casual.uuid,
      name: casual.array_of_words(3).join('-'),
      production: casual.coin_flip,
      space_guid: casual.uuid,
      stack_guid: casual.uuid,
      buildpack: null,
      detected_buildpack:
        'SDK for Node.js(TM) (ibm-node.js-4.8.0, buildpack-v3.11-20170303-1144)',
      environment_json: {},
      memory: casual.integer(0, 1024),
      instances: casual.integer(0, 1024),
      disk_quota: casual.integer(0, 1024),
      version: casual.uuid,
      command: 'node app.js',
      console: casual.coin_flip,
      debug: null,
      staging_task_id: casual.uuid,
      package_state: 'STAGED',
      health_check_http_endpoint: casual.uuid,
      health_check_type: 'port',
      health_check_timeout: null,
      staging_failed_reason: null,
      staging_failed_description: null,
      diego: casual.coin_flip,
      docker_image: null,
      package_updated_at: casual.date(),
      detected_start_command: './vendor/initial_startup.rb',
      enable_ssh: true,
      ports: null,
      // Implementation Fields
      routes: () => new MockList([1, 4]),
      running_instances: casual.integer(0, 10),
      services: () => new MockList([0, 8]),
      available_domains: () => new MockList([1, 8]),
    }),

    CFA_CloudFoundryAppUpdate: () => ({
      appGuid: casual.uuid,
      name: casual.array_of_words(3).join('-'),
      production: casual.coin_flip,
      space_guid: casual.uuid,
      stack_guid: casual.uuid,
      buildpack: null,
      detected_buildpack:
        'SDK for Node.js(TM) (ibm-node.js-4.8.0, buildpack-v3.11-20170303-1144)',
      environment_json: {},
      memory: casual.integer(0, 1024),
      instances: casual.integer(0, 1024),
      disk_quota: casual.integer(0, 1024),
      version: casual.uuid,
      command: 'node app.js',
      console: casual.coin_flip,
      debug: null,
      staging_task_id: casual.uuid,
      package_state: 'STAGED',
      health_check_http_endpoint: casual.uuid,
      health_check_type: 'port',
      health_check_timeout: null,
      staging_failed_reason: null,
      staging_failed_description: null,
      diego: casual.coin_flip,
      docker_image: null,
      package_updated_at: casual.date(),
      detected_start_command: './vendor/initial_startup.rb',
      enable_ssh: true,
      ports: null,
      // Implementation Fields
      url: casual.url,
      created_at: `${casual.date('YYYY-MM-DD')}T${casual.time('HH:mm:ss')}Z`,
      updated_at: `${casual.date('YYYY-MM-DD')}T${casual.time('HH:mm:ss')}Z`,
      space_url: casual.url,
      stack_url: casual.url,
      routes_url: casual.url,
      events_url: casual.url,
      service_bindings_url: casual.url,
      route_mappings_url: casual.url,
    }),

    CFA_Route: () => ({
      routerGuid: casual.uuid,
      host: casual.array_of_words(3).join('-'),
      port: null,
      path: '',
      domain: {
        domainGuid: casual.uuid,
        name: casual.array_of_words(3).join('-'),
      },
    }),

    CFA_ConnectedService: () => ({
      serviceGuid: casual.uuid,
      name: casual.array_of_words(3).join('-'),
      bound_app_count: casual.integer(0, 10),
      last_operation: {
        type: casual.word,
        state: casual.word,
        description: casual.sentence,
        updated_at: casual.date(),
        created_at: casual.date(),
      },
      dashboard_url: casual.url,
      service_plan: {
        servicePlanGuid: casual.uuid,
        name: casual.array_of_words(3).join('-'),
        service: {
          serviceGuid: casual.uuid,
          label: casual.word,
          provider: null,
          version: null,
        },
      },
    }),

    CFA_Domain: () => ({
      domainGuid: casual.uuid,
      name: casual.array_of_words(3).join('-'),
      router_group_guid: null,
      router_group_type: null,
    }),
  },
};
