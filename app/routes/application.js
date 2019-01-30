import { action } from "@ember-decorators/object";
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  beforeModel() {
    this.get('session').fetch();
  }

  @action
  login(email, password) {
    let route = this;
    this.get('session').open(email, password).then(function() {
      route.transitionTo('admin.index');
    });
  }

  model() {
    return {
      categories: this.get('store').findAll('category', { include: 'subcategories,parent' })
    };
  }

  title(tokens) {
    let tokenStr = tokens.join(' | ');
    if (tokenStr) {
      return `${tokenStr} - Ember Observer`;
    } else {
      return 'Ember Observer';
    }
  }
}
