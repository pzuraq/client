import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { action } from '@ember-decorators/object';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';

export default class AddonSourceUsagesComponent extends Component {
  visibleUsageCount = 25;
  showUsages = false;
  usages = null;
  regex = false;
  fileFilter = null;

  @service()
  codeSearch;

  @computed('visibleUsageCount', 'usages')
  get visibleUsages() {
    return this.get('usages').slice(0, this.get('visibleUsageCount'));
  }

  @computed('visibleUsageCount', 'usages')
  get moreUsages() {
    return this.get('visibleUsageCount') < this.get('usages.length');
  }

  @(task(function*() {
    let usages = yield this.get('codeSearch.usages').perform(
      this.get('addon.id'),
      this.get('query'),
      this.get('regex')
    );
    this.set('usages', filterByFilePath(usages, this.get('fileFilter')));
  }).drop())
  fetchUsages;

  @action
  toggleUsages() {
    this.toggleProperty('showUsages');
    if (this.get('showUsages') && this.get('usages') === null) {
      this.get('fetchUsages').perform();
    }
  }

  @action
  viewMore() {
    let newUsageCount = this.get('visibleUsageCount') + 25;
    this.set('visibleUsageCount', newUsageCount);
  }
}

function filterByFilePath(usages, filterTerm) {
  if (isEmpty(filterTerm)) {
    return usages;
  }
  let filterRegex;
  try {
    filterRegex = new RegExp(filterTerm);
  } catch (e) {
    return [];
  }
  return usages.filter(usage => {
    return usage.filename.match(filterRegex);
  });
}
