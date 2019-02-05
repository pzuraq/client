import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember-decorators/service';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';

class Router extends EmberRouter.extend(RouterScroll) {
  location = config.locationType;
  rootURL = config.rootURL;

  @service()
  metrics;

  willTransition() {
    super.willTransition(...arguments);
    performance.mark('willTransition');
  }

  didTransition() {
    super.didTransition(...arguments);
    this._trackPage();
    performance.mark('didTransition');
  }

  previousPage = null;

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      let page = document.location.pathname;
      let title = this.getWithDefault('currentRouteName', 'unknown');
      let previousPage = this.get('previousPage');
      let hasQuery = /query=/.test(document.location.search);

      if (hasQuery) {
        page = `${page}/?query=`;
      }

      if (page !== previousPage) {
        this.set('previousPage', page);
        get(this, 'metrics').trackPage({ page, title });
      }
    });
  }
}

Router.map(function() {
  this.route('categories', function() {
    this.route('show', { path: '/:slug' });
  });

  this.route('addons', function() {
    this.route('correct', { path: '/*name/correct' });
    this.route('show', { path: '/*name' });
    this.route('top', { path: '/lists/top' });
  });

  this.route('lists', function() {
    this.route('top-addons');
    this.route('new-addons');
    this.route('recently-scored-addons');
    this.route('invalid-repo-url');
  });

  this.route('maintainers', function() {
    this.route('show', { path: '/:name' });
  });

  this.route('code-search');

  this.route('canary-test-results', function() {
    this.route('date', { path: '/:date' });
    this.route('detail', { path: '/:id/detail' });
  });

  this.route('login');
  this.route('admin', function() {
    this.route('categories', function() {
      this.route('index', { path: '/' });
      this.route('new');
      this.route('edit', { path: '/:slug' });
    });
    this.route('build-servers');
    this.route('build-results', function() {
      this.route('show', { path: '/:id' });
    });

    this.route('addon-lists', function() {
      this.route('addons-needing-categorization');
      this.route('addons-needing-review');
      this.route('addons-needing-rereview');
      this.route('addons-hidden');
      this.route('addons-wip');
    });

    this.route('review', function() {
      this.route('addon', { path: '/*name' });
    });
  });

  this.route('about');

  this.route('model-not-found');
  this.route('not-found', { path: '/*path' });
});

export default Router;
