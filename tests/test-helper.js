/* globals QUnit */
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import './helpers/qunit-assertions';
import './helpers/mock-analytics';

import { extract } from 'ember-es6-class-codemod-dyfactor/test-support/ember-object';

// Add this after all the assets are loaded, just before `start`

if (QUnit.urlParams.runtimedata) {
  extract();
}

setApplication(Application.create(config.APP));

start();
