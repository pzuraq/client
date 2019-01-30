import { action } from "@ember-decorators/object";
import Component from '@ember/component';

export default class ScoreDetailComponent extends Component {
  showExplanation = false;

  @action
  toggleExplainScore() {
    this.toggleProperty('showExplanation');
  }
}
