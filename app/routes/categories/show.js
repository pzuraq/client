import { action } from "@ember-decorators/object";
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

import measure from '../../utils/measure';

export default class ShowRoute extends Route {
  model(params) {
    return this.modelFor('application').categories.then(() => {
      let category = this.get('store').peekAll('category').findBy('slug', params.slug);
      let addons = this.get('store').query('addon', { filter: { inCategory: category.get('id') }, include: 'categories' });
      return hash({
        category,
        addons
      });
    });
  }

  afterModel = measure;

  titleToken(model) {
    return model.category.get('name');
  }

  @action
  error() {
    this.replaceWith('model-not-found');
  }
}
