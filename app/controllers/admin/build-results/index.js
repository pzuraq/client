import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';
import moment from 'moment';

export default class IndexController extends Controller {
  queryParams = ['date'];
  buildResultSorting = ['testsRunAt:desc'];

  @sort('model', 'buildResultSorting')
  sortedBuildResults;

  @computed('date')
  get formattedDisplayDate() {
    return moment(this.get('date'))
      .utc()
      .format('YYYY-MM-DD');
  }

  @computed('date')
  get formattedPreviousDate() {
    let date = this.get('date');
    return moment(date)
      .subtract(1, 'day')
      .format('YYYY-MM-DD');
  }

  @computed('date')
  get formattedFollowingDate() {
    let date = this.get('date');
    return moment(date)
      .add(1, 'day')
      .format('YYYY-MM-DD');
  }

  @computed('date')
  get showFollowingDayLink() {
    let dateFromParam = moment(this.get('date'));
    let currentDate = moment();
    return !dateFromParam.isSame(currentDate, 'day');
  }
}
