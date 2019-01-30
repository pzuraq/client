import Route from '@ember/routing/route';

export default class TopRoute extends Route {
  beforeModel() {
    this.transitionTo('lists.top-addons');
  }
}
