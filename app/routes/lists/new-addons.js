import Route from '@ember/routing/route';

export default class NewAddonsRoute extends Route {
  model() {
    return this.get('store').query('addon', { page: { limit: 100 }, sort: '-publishedDate', include: 'categories' });
  }
}
