import Controller from '@ember/controller';
import { computed } from "@ember-decorators/object";
import { readOnly, oneWay } from "@ember-decorators/object/computed";
import { inject } from "@ember-decorators/service";
import { lists } from 'ember-observer/services/admin-lists';

const possibleLists = Object.keys(lists).map((key) => {
  return { title: lists[key].title, key }
});

export default class ReviewController extends Controller {
  queryParams = ['list'];
  list = null;

  @inject()
  adminLists;

  @inject()
  router;

  @readOnly('adminLists.find.lastSuccessful.value.addons')
  addons;

  possibleLists = possibleLists;

  @oneWay('model.key')
  selectedListKey;

  @computed('selectedListKey')
  get selectedList() {
    return possibleLists.find(l => l.key === this.get('selectedListKey'));
  }

  selectList(list) {
    this.set('selectedListKey', list.key);
    this.get('router').transitionTo('admin.review', { queryParams: { list: list.key } });
  }
}
