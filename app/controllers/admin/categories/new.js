import { action } from "@ember-decorators/object";
import { sort, filterBy } from "@ember/object/computed";
import Controller from '@ember/controller';

export default class NewController extends Controller {
  newCategoryName = '';
  newCategoryDescription = '';
  newCategoryPosition = '';
  categorySorting = ['position:asc'];

  @filterBy('model.categories', 'parent', null)
  topLevelCategories;

  @sort('topLevelCategories', 'categorySorting')
  sortedTopLevelCategories;

  @action
  addCategory() {
    let newCategory = this.get('store').createRecord('category', {
      name: this.get('newCategoryName'),
      description: this.get('newCategoryDescription'),
      position: this.get('newCategoryPosition')
    });
    newCategory.save().then(() => {
      this.transitionToRoute('admin.categories.index');
    }).catch((message) => {
      newCategory.deleteRecord();
      alert(message);
    });
  }
}
