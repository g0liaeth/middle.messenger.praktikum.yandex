import { Indexed } from '../../types/commonTypes';
import cloneDeep from '../cloneDeep';
import EventBus from '../EventBus/EventBus';
import isEqual from '../isEqual';
import setProp from '../setProp';
import { INITIAL_STATE } from './initialState/initialState';

export enum StoreEvents {
  Updated = 'updated',
}

export default class Store extends EventBus {
  private _state: Indexed = {};
  static _instance: Store | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_initialState?: any) {
    if (Store._instance) {
      return Store._instance;
    }
    super();
    this._state = INITIAL_STATE;
    Store._instance = this;
    console.log('store constructed');
  }

  public getState() {
    return this._state;
  }

  public setState(path: string, value: unknown) {
    console.log('state changed');

    const oldState = cloneDeep(this._state);

    setProp(this._state, path, value);

    if (!isEqual(oldState, this._state)) {
      this.emit(StoreEvents.Updated);
    }
  }
}
