import Route from '@ember/routing/route';

export default class BuildServersRoute extends Route {
  model() {
    return this.store.findAll('build-server');
  }
}
