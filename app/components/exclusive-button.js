import { tagName } from "@ember-decorators/component";
import Component from '@ember/component';

@tagName('')
export default class ExclusiveButtonComponent extends Component {
  label = '';
  value = null;
  selectedValue = null;
  updateSelectedValue = null;
}
