import Component from '@ember/component';
import { computed } from '@ember/object';
import { action } from '@ember-decorators/object';

export default class StatsBarComponent extends Component {
  showBadgeText = false;

  @computed('addon.license')
  get licenseUrl() {
    return `https://spdx.org/licenses/${this.get('addon.license')}`;
  }

  @computed('addon.name')
  get installCommandText() {
    return `ember install ${this.get('addon.name')}`;
  }

  @action
  toggleBadgeText() {
    this.toggleProperty('showBadgeText');
  }
}
