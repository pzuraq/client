import { attribute, tagName } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';

@tagName('time')
export default class RelativeTimeComponent extends Component {
  date = null;

  @computed('date')
  @attribute("title")
  get isoDate() {
    let date = this.get('date');
    return date ? date.toISOString() : null;
  }
}
