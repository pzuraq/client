import { classNames, tagName } from "@ember-decorators/component";
import { sort } from "@ember-decorators/object/computed";
import Component from '@ember/component';

@tagName('span')
@classNames('category-list', 'test-category-list')
export default class InlineCategoryListComponent extends Component {
  categorySorting = ['totalAddonCount:desc'];

  @sort('categories', 'categorySorting')
  categoriesSortedByAddonCount;
}
