import { action } from "@ember-decorators/object";
import Component from '@ember/component';

export default class AddonReviewFormComponent extends Component {
  questionOptions = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 2 },
    { label: 'N/A', value: 3 },
    { label: 'Unknown', value: 4 }
  ];

  @action
  save() {
    this.sendAction('save', this.get('review'));
  }

  @action
  selectOption(fieldName, value) {
    this.get('review').set(fieldName, value);
  }
}
