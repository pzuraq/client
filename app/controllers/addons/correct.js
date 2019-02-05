import { action } from "@ember-decorators/object";
import $ from 'jquery';
import Controller from '@ember/controller';

export default class CorrectController extends Controller {
  @action
  submitCorrection() {
    let controller = this;
    $.post('/api/v2/corrections', {
      name: this.get('name'),
      email: this.get('email'),
      addon: this.get('model.name'),
      correction: this.get('correction')
    }).done(function() {
      controller.transitionToRoute('addons.show', controller.get('model.name'));
    });
  }

  @action
  cancel() {
    this.transitionToRoute('addons.show', this.get('model.name'));
  }
}
