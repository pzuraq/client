import Route from '@ember/routing/route';

export default class InvalidRepoUrlRoute extends Route {
  model() {
    return this.get('store').query('addon', { filter: { missingRepoUrl: true }, sort: '-latestVersionDate' });
  }
}
