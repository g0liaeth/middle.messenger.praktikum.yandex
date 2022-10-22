import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

type Nullable<T> = T | null;
// type TProps = Record<string, unknown>;

export default class Block<TProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _id: Nullable<string> = null;
  private _element: Nullable<HTMLElement> = null;
  private _eventBus: () => EventBus;
  protected props: TProps;

  _meta = null;

  constructor(args: any = {}) {
    const { props, template } = args;
    const eventBus = new EventBus();

    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // _createResources() {
  //   const { tagName } = this._meta;
  //   this._element = this._createDocumentElement(tagName);
  // }

  protected init() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount() {
    return true;
  }

  // dispatchComponentDidMoun() {
  //   this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  // }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (Object.keys({ ...oldProps, ...newProps }).every((key) => oldProps[key] === newProps[key])) {
      return true;
    }
    return;
  }

  public setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): Nullable<HTMLElement> {
    return this._element;
  }

  public get id(): string {
    return this._id;
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstChild as HTMLElement;

    // if (!newElement) {
    //   throw new Error('Плохой элемент');
    // }

    if (this._element) {
      this._removeEventListeners();
      this._element.replaceWith(newElement);
    } else {
      this._element = newElement;
      this._addEventListeners();
    }
  }

  private _addEventListeners() {
    const eventListeners: Record<string, (...args: unknown[]) => void> = this.props.eventListeners;

    if (!eventListeners || !this._element) return;

    Object.entries(eventListeners).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _removeEventListeners() {
    const eventListeners: Record<string, (...args: unknown[]) => void> = this.props.eventListeners;

    if (!eventListeners || !this._element) return;

    Object.entries(eventListeners).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent(): Nullable<HTMLElement> {
    return this.element;
  }

  private _makePropsProxy(props: TProps) {
    const proxyProps = new Proxy(props, {
      get(target: TProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: TProps, prop: string, value: any) {
        const oldProps = { ...target };
        target[prop] = value;
        this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },

      deleteProperty() {
        throw new Error('Нет прав');
      },
    });

    return proxyProps;
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
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
}
