import { action } from "@ember-decorators/object";
import Controller from '@ember/controller';

export default class BuildServersController extends Controller {
  newBuildServerName = '';

  @action
  addBuildServer() {
    this.store.createRecord('build-server', { name: this.get('newBuildServerName') }).save();
  }
}
