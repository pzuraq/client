import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class EditRoute extends Route {
  model(params) {
    let categories = this.modelFor('admin.categories');
    return hash({
      categories,
      category: this.get('store').peekAll('category').findBy('slug', params.slug)
    });
  }
}
