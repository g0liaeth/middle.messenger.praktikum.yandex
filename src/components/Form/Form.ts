import { FormPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Form extends Block<FormPropsType> {
  constructor(props: FormPropsType) {
    super('form', props);
  }

  render() {
    const source = `{{{ formItems }}}`;

    return compileComponent(source, this._props);
  }
}
