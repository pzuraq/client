import Route from '@ember/routing/route';

export default class AddonsHiddenRoute extends Route {
  model() {
    return this.get('store').query('addon', { filter: { hidden: true }, sort: '-latestVersionDate' });
  }
}
