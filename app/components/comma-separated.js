import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@tagName('span')
export default class CommaSeparatedComponent extends Component {
  @computed('list.lastObject', 'item')
  get separator() {
    if (this.get('list.lastObject') === this.get('item')) {
      return '';
    } else {
      return ', ';
    }
  }
}
