import Block from '../Block/Block';
import store, { StoreEvents } from './Store';
import isEqual from '../isEqual';

export default function connect<T extends object>(mapStateToProps: (state: any) => any) {
  return function (Component: typeof Block) {
    const state = mapStateToProps(store.getState());
    // console.log(state);

    // let state = store.getState();

    return class extends Component<T> {
      constructor(props: T) {
        // console.log(props);
        super({ ...props, ...state });
        // console.log(this.props);
        store.on(StoreEvents.Updated, () => {
          // const mappedNewState = mapStateToProps(newState);
          // console.log(state);
          // console.log(newState);
          // console.log(mappedNewState);
          // this.setProps({ ...newState });
          this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
          // state = newState;
          // if (!isEqual(state, newState)) {
          //   this.setProps({ ...newState });
          //   state = newState;
          // }
        });
      }
    };
  };
}
