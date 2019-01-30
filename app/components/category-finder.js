import { sort, filterBy } from "@ember-decorators/object/computed";
import Component from '@ember/component';

export default class CategoryFinderComponent extends Component {
  categorySorting = ['position:asc'];
  categoryLinkRoute = 'categories.show';

  @filterBy('categories', 'parent', null)
  topLevelCategories;

  @sort('topLevelCategories', 'categorySorting')
  sortedTopLevelCategories;
}
