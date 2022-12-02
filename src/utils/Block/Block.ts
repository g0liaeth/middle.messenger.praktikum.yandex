/* eslint-disable @typescript-eslint/no-empty-function */
import { v4 as makeUUID } from 'uuid';
import EventBus from '../EventBus/EventBus';
import isEqual from '../isEqual';

export default abstract class Block<T> extends EventBus {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _props: T & { __id: string };
  _id: string;
  _element: HTMLElement;
  _meta: { tag: string; props: T };
  _setUpdate: boolean;
  _childs: any;
  _attributes: any;
  _events: any;

  constructor(tag = 'div', props = {} as T) {
    super();
    this._id = makeUUID();
    this._props = this._makePropsProxy({ ...props, __id: this._id });
    this._meta = { tag, props };
    //todo dont forget to optimize, no need to iterate several times
    this._childs = this._getChildsFromProps(props);
    this._attributes = this._getAttributesFromProps(props);
    this._events = this._getEventsFromProps(props);
    this._registerEvents();
    this.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this.on(Block.EVENTS.INIT, this._init.bind(this));
    this.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this._element = this._createDocumentElement(this._meta.tag);
    this.emit(Block.EVENTS.FLOW_RENDER);
  }

  _createDocumentElement(tag: string): HTMLElement {
    const element = document.createElement(tag);

    // if (this._props.settings.withInternalId) {
    //   this._element.setAttribute('data-id', this._id);
    // }

    return element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block as unknown as HTMLElement);
    this._addEvents();
    this._addAttributes();
    this.emit(Block.EVENTS.FLOW_CDM);
  }

  protected render() {}

  _addEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element.addEventListener(eventName, this._events[eventName]);
    });
  }

  _removeEvents() {
    if (!this._events || !this._element) {
      return;
    }

    Object.keys(this._events).forEach((eventName) => {
      this._element.removeEventListener(eventName, this._events[eventName]);
    });
  }

  _addAttributes() {
    // console.log(this._element);

    Object.entries(this._attributes).forEach(([key, value]) => {
      this._element.setAttribute(key, value as string);
    });
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) {
      this.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return !isEqual(oldProps, newProps);
  }

  public getId(): string {
    return this._id;
  }

  public getContent(): HTMLElement {
    return this._element;
  }

  setProps(newProps: any) {
    if (!newProps) {
      return;
    }

    // console.log(newProps);

    this._setUpdate = false;
    const oldProps = { ...this._props };

    if (Object.values(newProps).length) {
      Object.assign(this._props, newProps);
    }

    if (this._setUpdate) {
      this.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
      this._setUpdate = false;
    }
  }

  _makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof typeof props];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }
        return true;
      },
    });
  }

  public show() {
    const element = this.getContent();
    if (element) {
      element.classList.remove('hidden-block');
    }
  }

  public hide() {
    const element = this.getContent();

    if (element) {
      // console.log('block-hiding', element);
      element.classList.add('hidden-block');
    }
  }

  // public destroy() {
  //   const element = this.getContent();
  //   element.innerHTML = '';
  // }

  _getChildsFromProps(props: any) {
    const childrens: any = {};

    Object.keys(props).forEach((key) => {
      if (props[key] instanceof Block) {
        childrens[key] = props[key];
      }
    });

    return childrens;
  }

  _getAttributesFromProps(props: any) {
    // console.log(props);

    const attributes: any = {};

    Object.keys(props).forEach((key) => {
      if (
        !(props[key] instanceof Block) &&
        typeof props[key] !== 'object' &&
        typeof props[key] !== 'function'
      ) {
        attributes[key] = props[key];
      }
    });
    return attributes;
  }

  _getEventsFromProps(props: any) {
    const events: any = {};

    Object.keys(props).forEach((key) => {
      if (key.match(/^on/g)) {
        events[key.toLowerCase().substring(2)] = props[key];
      }
    });

    return events;
  }
}
