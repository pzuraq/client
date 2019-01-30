import { tagName } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';

@tagName('span')
export default class RadioButtonComponent extends Component {
  @computed('selected', 'option')
  get isSelected() {
    let selected = this.get('selected');
    let opt = this.get('option');
    if (!selected) {
      return false;
    }
    return opt.value === selected.value;
  }
}
