import { classNames, tagName } from "@ember-decorators/component";
import Component from '@ember/component';

@tagName('fieldset')
@classNames('note', 'test-addon-note')
export default class AddonNoteComponent extends Component {
  content = '';
}
