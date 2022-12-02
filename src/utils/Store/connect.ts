import { PlainObject } from '../../types/commonTypes';
// import Block from '../Block/Block';
import Store, { StoreEvents } from './Store';
import isEqual from '../isEqual';

export default function connect<BeforeProps, MSPType extends (state: PlainObject) => PlainObject>(
  mapStateToProps: MSPType,
) {
  const store = new Store();

  return function (Component: any) {
    let state = mapStateToProps(store.getState());

    return class extends Component<BeforeProps & typeof state> {
      constructor(tag?: string, props?: BeforeProps & typeof state) {
        super(tag, { ...props, ...state });
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
          }
        });
      }
    };
  };
}
