import Route from '@ember/routing/route';

export default class AddonsNeedingReviewRoute extends Route {
  model() {
    return this.get('store').query('addon', { filter: { notReviewed: true, isWip: false }, sort: '-latestVersionDate' });
  }
}
