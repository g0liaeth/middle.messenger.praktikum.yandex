import { PlainObject } from '../../types/commonTypes';
// import Block from '../Block/Block';
import Store from './Store';
// import isEqual from '../isEqual';

export default function connect<BeforeProps, MSPType extends (state: PlainObject) => PlainObject>(
  mapStateToProps: MSPType,
) {
  const store = new Store();
  // console.log('coonect store', store);

  return function (Component: any) {
    // eslint-disable-next-line prefer-const
    let state = mapStateToProps(store.getState());
    // console.log(Component.toString(), state);

    return class extends Component<BeforeProps & typeof state> {
      constructor(tag?: string, props?: BeforeProps & typeof state) {
        super(tag, { ...props, ...state });
        // store.on(StoreEvents.Updated, () => {
        //   const newState = mapStateToProps(store.getState());
        //   // console.log(Component.toString(), newState);

        //   if (!isEqual(state, newState)) {
        //     this.setProps({ ...newState });
        //     state = newState;
        //   }
        //   // //todo think about it
        //   // this.emit(Block.EVENTS.FLOW_RENDER);
        // });
      }
    };
  };
}
