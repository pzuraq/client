import { action } from "@ember-decorators/object";
import Component from '@ember/component';

export default class LoginFormComponent extends Component {
  @action
  login() {
    this.sendAction('loginAction', this.get('email'), this.get('password'));
  }
}
