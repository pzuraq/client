import { tagName } from "@ember-decorators/component";
import Component from '@ember/component';

@tagName('')
export default class SearchResultSetComponent extends Component {
  resultsCollapsed = false;

  toggleResultsExpansion() {
    this.toggleProperty('resultsCollapsed');
  }
}
