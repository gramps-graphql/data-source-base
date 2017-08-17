import dataSource from '../src';
import Model from '../src/model';

describe('Data Source: CloudFoundryApp', () => {
  it('returns a context type', () => {
    expect(dataSource.context).toBe('CloudFoundryApp');
  });

  it('returns a model', () => {
    expect(dataSource.model).toBeInstanceOf(Model);
  });

  it('returns a schema', () => {
    expect(dataSource.schema).toBeTruthy();
  });

  it('returns a resolver object', () => {
    expect(Object.keys(dataSource.resolvers)).toEqual([
      'queryResolvers',
      'mutationResolvers',
      'dataResolvers',
      'mockResolvers',
    ]);
  });
});
