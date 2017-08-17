import { MockList } from 'graphql-tools';
import resolvers, { cfaTypeResolver } from '../src/resolvers';

const mockContext = {
  CloudFoundryApp: {
    connector: {
      addBluemixToken: jest.fn(),
    },
    getAppByGuid: id => Promise.resolve(id),
    updateAppByGuid: (appGuid, updates) =>
      Promise.resolve({
        body: {
          metadata: {
            appGuid,
          },
          entity: {
            updates,
          },
        },
      }),
  },
};

describe('CloudFoundry resolvers', () => {
  it('returns valid resolvers', () => {
    expect(Object.keys(resolvers)).toEqual([
      'queryResolvers',
      'mutationResolvers',
      'dataResolvers',
      'mockResolvers',
    ]);
  });

  describe('queryResolvers', () => {
    describe('CloudFoundryApp', () => {
      it('sets the token and loads the app by GUID', () => {
        expect.assertions(1);

        return expect(
          resolvers.queryResolvers.CloudFoundryApp(
            'req',
            { appGuid: 'abc1234' },
            mockContext,
          ),
        ).resolves.toEqual('abc1234');
      });
    });
  });

  describe('mutationResolvers', () => {
    const mutations = resolvers.mutationResolvers;

    test('UpdateCloudFoundryApp()', async () => {
      expect.assertions(1);

      const result = await mutations.UpdateCloudFoundryApp(
        'req',
        { appGuid: 'abcd1234', updates: { foo: 'test' } },
        mockContext,
      );

      expect(result).toEqual({ appGuid: 'abcd1234', updates: { foo: 'test' } });
    });
  });

  describe('dataResolvers', () => {
    describe('CFA_CloudFoundryAppSummary', () => {
      const resolver = resolvers.dataResolvers.CFA_CloudFoundryAppSummary;

      it('aliases the guid to appGuid', () => {
        expect(resolver.appGuid({ guid: '1234' })).toEqual('1234');
      });

      it('JSON-encodes the environment_json field', () => {
        expect(
          resolver.environment_json({ environment_json: { test: 'foo' } }),
        ).toEqual('{"test":"foo"}');
      });

      it('JSON-encodes the docker_credentials_json field', () => {
        expect(
          resolver.docker_credentials_json({
            docker_credentials_json: { test: 'foo' },
          }),
        ).toEqual('{"test":"foo"}');
      });
    });

    describe('CFA_CloudFoundryAppUpdate', () => {
      const resolver = resolvers.dataResolvers.CFA_CloudFoundryAppUpdate;

      it('aliases the guid to appGuid', () => {
        expect(resolver.appGuid({ guid: '1234' })).toEqual('1234');
      });

      it('JSON-encodes the environment_json field', () => {
        expect(
          resolver.environment_json({ environment_json: { test: 'foo' } }),
        ).toEqual('{"test":"foo"}');
      });

      it('JSON-encodes the docker_credentials_json field', () => {
        expect(
          resolver.docker_credentials_json({
            docker_credentials_json: { test: 'foo' },
          }),
        ).toEqual('{"test":"foo"}');
      });
    });

    describe('CFA_Route', () => {
      const resolver = resolvers.dataResolvers.CFA_Route;

      it('aliases the guid to routerGuid', () => {
        expect(resolver.routerGuid({ guid: '1234' })).toEqual('1234');
      });
    });

    describe('CFA_ConnectedService', () => {
      const resolver = resolvers.dataResolvers.CFA_ConnectedService;

      it('aliases the guid to serviceGuid', () => {
        expect(resolver.serviceGuid({ guid: '1234' })).toEqual('1234');
      });
    });

    describe('CFA_ServicePlan', () => {
      const resolver = resolvers.dataResolvers.CFA_ServicePlan;

      it('aliases the guid to servicePlanGuid', () => {
        expect(resolver.servicePlanGuid({ guid: '1234' })).toEqual('1234');
      });
    });

    describe('CFA_Domain', () => {
      const resolver = resolvers.dataResolvers.CFA_Domain;

      it('aliases the guid to domainGuid', () => {
        expect(resolver.domainGuid({ guid: '1234' })).toEqual('1234');
      });

      it('returns the router guid/type or null if undefined', () => {
        expect(resolver.router_group_guid({})).toBe(null);
        expect(
          resolver.router_group_guid({ router_group_guid: 'some-guid' }),
        ).toEqual('some-guid');

        expect(resolver.router_group_type({})).toBe(null);
        expect(
          resolver.router_group_type({ router_group_type: 'some-type' }),
        ).toEqual('some-type');
      });
    });

    describe('CFA_Service', () => {
      const resolver = resolvers.dataResolvers.CFA_Service;

      it('aliases the guid to serviceGuid', () => {
        expect(resolver.serviceGuid({ guid: '1234' })).toEqual('1234');
      });
    });
  });

  describe('mockResolvers', () => {
    /*
     * So, basically mock resolvers just need to return values without
     * exploding. To that end, we’ll just check that the mock response returns
     * the proper fields.
     */
    describe('CFA_CloudFoundryAppSummary', () => {
      const mockResolvers = resolvers.mockResolvers.CFA_CloudFoundryAppSummary();

      it('returns the expected fields', () => {
        expect(Object.keys(mockResolvers)).toEqual([
          'appGuid',
          'name',
          'production',
          'space_guid',
          'stack_guid',
          'buildpack',
          'detected_buildpack',
          'environment_json',
          'memory',
          'instances',
          'disk_quota',
          'version',
          'command',
          'console',
          'debug',
          'staging_task_id',
          'package_state',
          'health_check_http_endpoint',
          'health_check_type',
          'health_check_timeout',
          'staging_failed_reason',
          'staging_failed_description',
          'diego',
          'docker_image',
          'package_updated_at',
          'detected_start_command',
          'enable_ssh',
          'ports',
          'routes',
          'running_instances',
          'services',
          'available_domains',
        ]);
      });

      it('returns a MockList for the routes', () => {
        expect(mockResolvers.routes()).toBeInstanceOf(MockList);
      });

      it('returns a MockList for the services', () => {
        expect(mockResolvers.services()).toBeInstanceOf(MockList);
      });

      it('returns a MockList for the availabledomains', () => {
        expect(mockResolvers.available_domains()).toBeInstanceOf(MockList);
      });
    });

    describe('CFA_CloudFoundryAppUpdate', () => {
      const mockResolvers = resolvers.mockResolvers.CFA_CloudFoundryAppUpdate();

      it('returns the expected fields', () => {
        expect(Object.keys(mockResolvers)).toEqual([
          'appGuid',
          'name',
          'production',
          'space_guid',
          'stack_guid',
          'buildpack',
          'detected_buildpack',
          'environment_json',
          'memory',
          'instances',
          'disk_quota',
          'version',
          'command',
          'console',
          'debug',
          'staging_task_id',
          'package_state',
          'health_check_http_endpoint',
          'health_check_type',
          'health_check_timeout',
          'staging_failed_reason',
          'staging_failed_description',
          'diego',
          'docker_image',
          'package_updated_at',
          'detected_start_command',
          'enable_ssh',
          'ports',
          'url',
          'created_at',
          'updated_at',
          'space_url',
          'stack_url',
          'routes_url',
          'events_url',
          'service_bindings_url',
          'route_mappings_url',
        ]);
      });
    });

    describe('CFA_Route', () => {
      const mockResolvers = resolvers.mockResolvers.CFA_Route();

      it('returns the expected fields', () => {
        expect(Object.keys(mockResolvers)).toEqual([
          'routerGuid',
          'host',
          'port',
          'path',
          'domain',
        ]);
      });

      it('returns the expected subfields on the domain object', () => {
        expect(Object.keys(mockResolvers.domain)).toEqual([
          'domainGuid',
          'name',
        ]);
      });
    });

    describe('CFA_ConnectedService', () => {
      const mockResolvers = resolvers.mockResolvers.CFA_ConnectedService();

      it('returns the expected fields', () => {
        expect(Object.keys(mockResolvers)).toEqual([
          'serviceGuid',
          'name',
          'bound_app_count',
          'last_operation',
          'dashboard_url',
          'service_plan',
        ]);
      });

      it('returns the expected subfields on the last_operation object', () => {
        expect(Object.keys(mockResolvers.last_operation)).toEqual([
          'type',
          'state',
          'description',
          'updated_at',
          'created_at',
        ]);
      });

      it('returns the expected subfields on the service_plan object', () => {
        expect(Object.keys(mockResolvers.service_plan)).toEqual([
          'servicePlanGuid',
          'name',
          'service',
        ]);
      });

      it('returns the expected subfields on the service_plan.service object', () => {
        expect(Object.keys(mockResolvers.service_plan.service)).toEqual([
          'serviceGuid',
          'label',
          'provider',
          'version',
        ]);
      });
    });

    describe('CFA_Domain', () => {
      const mockResolvers = resolvers.mockResolvers.CFA_Domain();

      it('returns the expected fields', () => {
        expect(Object.keys(mockResolvers)).toEqual([
          'domainGuid',
          'name',
          'router_group_guid',
          'router_group_type',
        ]);
      });
    });
  });
});

describe('cfaTypeResolver', () => {
  const responseBody = {
    guid: 'some-app-guid',
    name: 'some-app-name',
  };

  it('returns the correct type', () => {
    const withRoutesField = {
      ...responseBody,
      routes: [],
    };

    expect(cfaTypeResolver(withRoutesField)).toEqual(
      'CFA_CloudFoundryAppSummary',
    );

    const withUrlField = {
      ...responseBody,
      url: '/v2/apps/some-app-guid',
    };

    expect(cfaTypeResolver(withUrlField)).toEqual('CFA_CloudFoundryAppUpdate');
  });

  it('returns null if neither field(s) is/are detected', () => {
    expect(cfaTypeResolver({})).toBe(null);
  });
});
