import Route from '@ember/routing/route';

export default class ShowRoute extends Route {
  model(params) {
    return this.store.findRecord('test-result', params.id, {
      include: 'version,version.addon'
    });
  }
}
