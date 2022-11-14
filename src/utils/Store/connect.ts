import Block from '../Block/Block';
import store, { StoreEvents } from './Store';
import isEqual from '../isEqual';

export default function connect<T extends object>(mapStateToProps: (state: any) => any) {
  return function (Component: typeof Block) {
    let state = mapStateToProps(store.getState());
    console.log(state);

    return class extends Component<T> {
      constructor(props: T) {
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          // console.log(state);

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
            // console.log(this.props);
          }
        });
      }
    };
  };
}
