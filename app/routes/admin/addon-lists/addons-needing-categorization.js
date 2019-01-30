import Route from '@ember/routing/route';

export default class AddonsNeedingCategorizationRoute extends Route {
  model() {
    return this.get('store').query('addon', { filter: { isWip: false, notCategorized: true }, sort: '-latestVersionDate' });
  }
}
