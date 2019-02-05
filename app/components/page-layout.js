import { resolve } from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';

export default class PageLayoutComponent extends Component {
  showHeaderSearch = true;
  searchTerm = null;

  @service()
  store;

  @service()
  session;

  @service()
  routing;

  @service()
  metrics;

  @service('search')
  searchService;

  @computed()
  get categories() {
    return this.get('store').peekAll('category');
  }

  goSearch(term) {
    if (!isBlank(term)) {
      this.get('metrics').trackEvent({
        category: 'Header search',
        action: `Search on ${document.location.pathname}`,
        label: this.get('searchTerm'),
      });
      this.get('routing').transitionTo('index', {
        queryParams: { query: term },
      });
    }
  }

  @(task(function*(term) {
    if (term.length === 0) {
      return resolve([]);
    }

    yield timeout(250);

    this.get('metrics').trackEvent({
      category: 'Header autocomplete',
      action: `Autocomplete on ${document.location.pathname}`,
      label: term,
    });
    let results = yield this.get('searchService.searchAddonNames').perform(
      term
    );
    let limitedResults = results.slice(0, 5);
    if (!limitedResults.length) {
      return [
        {
          noResults: true,
          isFullSearchLink: true,
        },
      ];
    }

    limitedResults.insertAt(1, { isFullSearchLink: true });
    return limitedResults;
  }).restartable())
  searchForAddons;

  @task(function*(selected, options) {
    if (selected.isFullSearchLink) {
      this.goSearch(options.searchText);
    } else {
      this.set('selectedAddon', selected);
      yield this.get('routing').transitionTo('addons.show', selected);
      this.set('selectedAddon', null);
    }
  })
  goToAddon;

  logoutUser() {
    this.get('session')
      .close()
      .finally(() => {
        this.get('routing').transitionTo('index');
      });
  }
}
