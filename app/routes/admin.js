import Route from '@ember/routing/route';

export default class AdminRoute extends Route {
  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    }
  }

  titleToken() {
    return 'Admin';
  }
}
