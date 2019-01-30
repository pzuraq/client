import Route from '@ember/routing/route';

export default class AddonsNeedingRereviewRoute extends Route {
  model() {
    return this.get('store').query('addon', { filter: { needsReReview: true }, sort: '-latestVersionDate' });
  }
}
