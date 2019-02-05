import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';

export default class ApiAjaxService extends AjaxService {
  @service()
  session;

  namespace = 'api/v2';

  @computed('session.{isAuthenticated,header}')
  get headers() {
    if (this.get('session.isAuthenticated')) {
      return this.get('session.header');
    }
  }
}
