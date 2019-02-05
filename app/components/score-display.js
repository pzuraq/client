import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@tagName('')
export default class ScoreDisplayComponent extends Component {
  @computed('addon.score')
  get hasNumericScore() {
    let score = this.get('addon.score');
    return typeof score === 'number';
  }
}
