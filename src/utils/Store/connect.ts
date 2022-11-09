import Block from '../Block/Block';
import store, { StoreEvents } from './Store';
import { BasePropsType } from '../../types/componentTypes';
import { Indexed } from '../../types/commonTypes';
import isEqual from '../isEqual';

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: Partial<BasePropsType>) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            console.log(this.props);
          }
          state = newState;
        });
      }
    };
  };
}
