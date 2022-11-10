import Block from '../Block/Block';
import store, { StoreEvents } from './Store';
import isEqual from '../isEqual';

export default function connect<T extends object>(mapStateToProps: (state: any) => any) {
  return function (Component: typeof Block) {
    return class extends Component<T> {
      constructor(props: T) {
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
