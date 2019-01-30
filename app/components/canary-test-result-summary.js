import { readOnly, filter } from "@ember-decorators/object/computed";
import Component from '@ember/component';
import { wrapComputed, computed } from "@ember-decorators/object";
import computedPercent from 'ember-observer/utils/computed-percent';

function computedFormattedPercent(percentPropertyName) {
  return computed(percentPropertyName, function() {
    let value = this.get(percentPropertyName);
    if (!value) {
      return '--';
    }
    value = value.toFixed(2);
    return `${value}%`;
  });
}

export default class CanaryTestResultSummaryComponent extends Component {
  @filter('testResults', (testResult) => {
    return !testResult.get('succeeded');
  })
  errorBuilds;

  @filter('testResults', (testResult) => {
    return testResult.get('succeeded') && !testResult.get('emberVersionCompatibilities.firstObject.compatible');
  })
  failedBuilds;

  @filter('testResults', (testResult) => {
    return testResult.get('succeeded') && testResult.get('emberVersionCompatibilities.firstObject.compatible');
  })
  passedBuilds;

  @readOnly('errorBuilds.length')
  numberOfErrorBuilds;

  @readOnly('failedBuilds.length')
  numberOfFailedBuilds;

  @readOnly('passedBuilds.length')
  numberOfPassedBuilds;

  @readOnly('testResults.length')
  numberOfBuilds;

  @wrapComputed(computedPercent('numberOfErrorBuilds', 'numberOfBuilds'))
  percentOfErrorBuilds;

  @wrapComputed(computedPercent('numberOfFailedBuilds', 'numberOfBuilds'))
  percentOfFailedBuilds;

  @wrapComputed(computedPercent('numberOfPassedBuilds', 'numberOfBuilds'))
  percentOfPassedBuilds;

  @wrapComputed(computedFormattedPercent('percentOfErrorBuilds'))
  formattedPercentOfErrorBuilds;

  @wrapComputed(computedFormattedPercent('percentOfFailedBuilds'))
  formattedPercentOfFailedBuilds;

  @wrapComputed(computedFormattedPercent('percentOfPassedBuilds'))
  formattedPercentOfPassedBuilds;
}
