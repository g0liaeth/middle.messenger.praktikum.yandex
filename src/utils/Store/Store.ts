import { Indexed } from '../../types/commonTypes';
import EventBus from '../EventBus/EventBus';
import setProp from '../setProp';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private _state: Indexed = {};

  constructor() {
    super();
    this._state = {
      user: {
        id: null,
      },
    };
  }

  public getState() {
    return this._state;
  }

  public setState(path: string, value: unknown) {
    setProp(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
