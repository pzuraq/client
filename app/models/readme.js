import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default class ReadmeEmberObject extends Model {
  @attr('string')
  contents;
}
