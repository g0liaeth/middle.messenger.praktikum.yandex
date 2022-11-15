import { Indexed } from '../../types/commonTypes';
import cloneDeep from '../cloneDeep';
import EventBus from '../EventBus/EventBus';
import isEqual from '../isEqual';
import setProp from '../setProp';
import { INITIAL_STATE } from './initialState/initialState';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private _state: Indexed = {};

  constructor() {
    super();
    this._state = INITIAL_STATE;
  }

  public getState() {
    return this._state;
  }

  public setState(path: string, value: unknown) {
    const oldState = cloneDeep(this._state);
    setProp(this._state, path, value);
    if (!isEqual(oldState, this._state)) {
      this.emit(StoreEvents.Updated);
    }
  }
}

export default new Store();
