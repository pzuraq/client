import { computed } from "@ember-decorators/object";
import { alias } from "@ember-decorators/object/computed";
import Controller from '@ember/controller';
import moment from 'moment';

export default class DateController extends Controller {
  @alias('model.date')
  date;

  @computed('date')
  get formattedDisplayDate() {
    return moment(this.get('date')).utc().format('YYYY-MM-DD');
  }

  @computed('date')
  get formattedPreviousDate() {
    let date = this.get('date');
    return moment(date).subtract(1, 'day').format('YYYY-MM-DD');
  }

  @computed('date')
  get formattedFollowingDate() {
    let date = this.get('date');
    return moment(date).add(1, 'day').format('YYYY-MM-DD');
  }

  @computed('date')
  get showFollowingDayLink() {
    let dateFromParam = moment(this.get('date'));
    let currentDate = moment();
    return !dateFromParam.isSame(currentDate, 'day');
  }
}
