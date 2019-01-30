import { computed } from "@ember-decorators/object";
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default class ApplicationEmberObject extends JSONAPIAdapter {
  namespace = 'api/v2';
  coalesceFindRequests = true;

  @computed('session.{isAuthenticated,header}')
  get headers() {
    if (this.get('session.isAuthenticated')) {
      return this.get('session.header');
    }
  }

  shouldBackgroundReloadRecord() {
    return false;
  }

  shouldBackgroundReloadAll() {
    return false;
  }
}
