import { action } from "@ember-decorators/object";
import Route from '@ember/routing/route';

export default class ShowRoute extends Route {
  model(params) {
    return this.get('store').query('maintainer', { filter: { name: params.name } }).then((maintainers) => {
      return maintainers.get('firstObject');
    });
  }

  titleToken(model) {
    return model.get('name');
  }

  @action
  error() {
    this.replaceWith('model-not-found');
  }
}
