import { gt } from "@ember-decorators/object/computed";
import { action, computed } from "@ember-decorators/object";
import { inject as service } from "@ember-decorators/service";
import Component from '@ember/component';

export default class AddonVersionListComponent extends Component {
  showAll = false;

  @service()
  emberVersions;

  @computed('versions', 'showAll')
  get showingVersions() {
    if (this.get('showAll')) {
      return this.get('versions');
    }
    return (this.get('versions') || []).slice(0, 10);
  }

  @computed('emberVersions.versionData', 'showingVersions.lastObject')
  get emberVersionDataAfterOldestShowingAddonVersion() {
    let oldestVersionDate = this.get('showingVersions.lastObject.released');
    return this.get('emberVersions.versionData').filter(function(version) {
      return version.released > oldestVersionDate;
    });
  }

  @computed('emberVersionDataAfterOldestShowingAddonVersion', 'showingVersions')
  get combinedVersions() {
    return (this.get('emberVersionDataAfterOldestShowingAddonVersion') || []).concat(this.get('showingVersions')).sortBy('released').reverse();
  }

  @gt('versions.length', 10)
  moreThan10Versions;

  @computed('moreThan10Versions', 'showAll')
  get thereAreHiddenVersions() {
    return this.get('moreThan10Versions') && !this.get('showAll');
  }

  @action
  showAllVersions() {
    this.set('showAll', true);
  }
}
