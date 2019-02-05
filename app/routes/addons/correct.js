import Route from '@ember/routing/route';

export default class CorrectRoute extends Route {
  model(params) {
    let name = params.name.replace(/%2F/i, '/');
    return this.get('store').query('addon', { filter: { name }, page: { limit: 1 } }, { reload: true }).then((addons) => {
      return addons.get('firstObject');
    });
  }
}
