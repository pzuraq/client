import { action, computed } from "@ember-decorators/object";
import { inject as service } from "@ember-decorators/service";
import Controller from '@ember/controller';
import { alias } from "@ember-decorators/object/computed";

export default class ShowController extends Controller {
  @service('apiAjax')
  ajax;

  @alias('model')
  buildResult;

  @alias('buildResult.version')
  addonVersion;

  @alias('addonVersion.addon')
  addon;

  hasRetriedBuild = false;

  @computed('buildResult.succeeded', 'buildResult.statusMessage')
  get buildStatus() {
    if (this.get('buildResult.succeeded')) {
      return 'succeeded';
    }
    return this.get('buildResult.statusMessage');
  }

  @computed('buildResult.succeeded', 'hasRetriedBuild')
  get canRetryBuild() {
    return !this.get('buildResult.succeeded') && !this.get('hasRetriedBuild');
  }

  @action
  retryBuild() {
    this.set('hasRetriedBuild', true);
    this.get('ajax').post(`test_results/${this.get('buildResult.id')}/retry`).catch(() => this.get('hasRetriedBuild', false));
  }
}
