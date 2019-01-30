import { tagName } from "@ember-decorators/component";
import { sort } from "@ember-decorators/object/computed";
import Component from '@ember/component';

@tagName('')
export default class CategoryChooserComponent extends Component {
  categories = null;
  addon = null;
  categorySorting = ['displayName:asc'];

  @sort('categories', 'categorySorting')
  sortedCategories;
}
