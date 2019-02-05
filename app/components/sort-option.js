import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { action } from '@ember-decorators/object';
import Component from '@ember/component';

@tagName('')
export default class SortOptionComponent extends Component {
  @computed('selectedSort', 'key')
  get isSelected() {
    return this.get('selectedSort') === this.get('key');
  }

  @action
  sortBy(key) {
    this.sendAction('sortBy', key);
  }
}
