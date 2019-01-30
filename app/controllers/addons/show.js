import { computed } from "@ember-decorators/object";
import { readOnly, alias } from "@ember-decorators/object/computed";
import Controller from '@ember/controller';
import moment from 'moment';

export default class ShowController extends Controller {
  @alias('model.addon')
  addon;

  @alias('addon.latestReview')
  latestReview;

  @computed('addon.versions')
  get sortedAddonVersions() {
    return (this.get('addon.versions') || []).sortBy('released').reverse();
  }

  @readOnly('addon.latestAddonVersion')
  latestVersion;

  @computed('latestVersion.released')
  get isLatestReleaseInLast3Months() {
    if (!this.get('latestVersion.released')) {
      return false;
    }
    let threeMonthsAgo = moment().subtract(3, 'months');
    return moment(this.get('latestVersion.released')).isAfter(threeMonthsAgo);
  }

  @computed('latestReview.version.version', 'latestVersion.version')
  get isLatestReviewForLatestVersion() {
    return this.get('latestReview.version.version') === this.get('latestVersion.version');
  }

  @computed('model.latestTestResult.version', 'latestVersion')
  get isTestResultForLatestVersion() {
    return this.get('model.latestTestResult.version.version') === this.get('latestVersion.version');
  }

  @computed('addon.hasInvalidGithubRepo', 'addon.githubStats.firstCommitDate')
  get hasGithubData() {
    return !this.get('addon.hasInvalidGithubRepo') && this.get('addon.githubStats.firstCommitDate');
  }
}
