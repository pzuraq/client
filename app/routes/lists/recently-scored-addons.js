import Route from '@ember/routing/route';

export default class RecentlyScoredAddonsRoute extends Route {
  model() {
    return this.get('store').query('addon', { page: { limit: 100 }, filter: { recentlyReviewed: true }, include: 'categories' });
  }
}
