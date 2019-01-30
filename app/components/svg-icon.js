import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('')
export default class SvgIconComponent extends Component {
  static positionalParams = ['iconName'];
  alignBaseline = true;
}
