import Handlebars from 'handlebars';
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
  protected id: string;
  protected eventBus: EventBus;
  protected props: TProps;

  constructor(props: TProps) {
    this._element = document.createElement('div');
    this.id = makeUUID();
    this.eventBus = new EventBus();
    this.props = this._makePropsProxy({ ...props, __id: this.id });
    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  protected init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount() {
    return;
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    this.componentDidUpdate(oldProps, newProps);
    if (Object.keys({ ...oldProps, ...newProps }).every((key) => oldProps[key] === newProps[key])) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    return;
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return;
  }

  private _render() {
    const fragment = this.render();

    this._element = fragment as HTMLElement;
  }

  protected render(): ChildNode | null {
    return null;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _makePropsProxy(props: TProps & { __id: string }): TProps {
    return new Proxy(props, {
      get(target: TProps & { __id: string }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: TProps & { __id: string }, prop: string, value: any) {
        const oldProps = { ...target };
        target[prop] = value;

        this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },

      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  public generateTemplate(source: string, props: TProps) {
    const parser = new DOMParser();

    return parser.parseFromString(Handlebars.compile(source)(props), 'text/html').body.firstChild;
  }

  public getContent(): HTMLElement {
    return this._element;
  }
}
