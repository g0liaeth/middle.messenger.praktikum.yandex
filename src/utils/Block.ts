import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

// type Nullable<T> = T | null;

export default class Block<TProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement;
  public id: string;
  private _eventBus: EventBus;
  public props: TProps;

  constructor(props: TProps) {
    this._element = document.createElement('div');
    this.id = makeUUID();
    this._eventBus = new EventBus();
    this.props = this._makePropsProxy({ ...props, __id: this.id });
    this._registerEvents(this._eventBus);
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private init() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(props: any) {
    this.componentDidMount(props);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(props: any) {}

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    // if (Object.keys({ ...oldProps, ...newProps }).every((key) => oldProps[key] === newProps[key])) {
    //   this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    // }
    // return;
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  private _render() {
    const fragment = this.render();
    // console.log(fragment.children);
    
    const newElement = document.createElement('div')

    for (let item of fragment.children) {
      newElement.append(item);
      console.log(item);
      
  }

    // const element = fragment.firstChild;

    // if (!element) {
    //   return;
    // }

    this._element.replaceWith(newElement);
    this._element = newElement;
  }

  protected render() {
    return new DocumentFragment();
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _makePropsProxy(props: any) {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop: string, value: any) {
        if (target[prop] !== value) {
          target[prop] = value;
          self._eventBus.emit(Block.EVENTS.FLOW_CDU);
          return true;
        }
        return true;
      },

      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  public getContent(): HTMLElement {
    return this._element;
  }

  public show() {
    const element = this.getContent();
    if (element) {
      element.style.display = 'block';
    }
  }

  public hide() {
    const element = this.getContent();
    if (element) {
      element.style.display = 'none';
    }
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _removeEventListeners() {
    const { events = {} }: any = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addEventListeners() {
    const { events = {} }: any = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }
}
