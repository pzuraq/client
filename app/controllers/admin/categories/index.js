import { sort, filterBy } from "@ember/object/computed";
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  categorySorting = ['position:desc'];

  @filterBy('model', 'parent', null)
  unsortedTopLevelCategories;

  @sort('unsortedTopLevelCategories', 'categorySorting')
  topLevelCategories;
}
