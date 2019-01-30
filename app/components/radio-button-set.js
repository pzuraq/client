import Component from '@ember/component';

export default class RadioButtonSetComponent extends Component {
  select(option) {
    this.set('selected', option);
    this.get('selectOption')(this.get('valueField'), option.value);
  }
}
