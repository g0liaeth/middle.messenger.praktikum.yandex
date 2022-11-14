import Block from '../Block/Block';
import store, { StoreEvents } from './Store';
import isEqual from '../isEqual';

export default function connect<T extends object>(mapStateToProps: (state: any) => any) {
  return function (Component: typeof Block) {
    let state = mapStateToProps(store.getState());

    return class extends Component<T> {
      constructor(props: T) {
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, (newState: any) => {
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
          }
        });
      }
    };
  };
}
