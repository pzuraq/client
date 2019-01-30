import Route from '@ember/routing/route';

export default class DetailRoute extends Route {
  model({ id }) {
    return this.store.findRecord('test-result', id, {
      include: [
        'ember-version-compatibilities',
        'version',
        'version.addon'
      ].join(',')
    });
  }
}
