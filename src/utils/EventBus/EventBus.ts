import { Handler } from '../../types/commonTypes';

export default class EventBus {
  private _listeners: Record<string, Handler[]>;

  constructor() {
    this._listeners = {};
  }

  public on(event: string, callback: Handler) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    if (this._listeners[event].includes(callback)) {
      throw new Error(`Такой подписчик уже зарегистрирован: ${event}: ${callback}`);
    }

    this._listeners[event].push(callback);
  }

  public off(event: string, callback: Handler) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this._listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this._listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
