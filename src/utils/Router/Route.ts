import renderDOM from '../Block/renderDOM';
import Block from '../Block/Block';
import { BlockInheritor, IProps } from '../../types/commonTypes';

export default class Route {
  private _pathname: string;
  private _blockClass: BlockInheritor;
  private _block: Block<any> | null;
  private _props: IProps;
  private _tag = 'div';

  constructor(pathname: string, view: BlockInheritor, tag: string, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._tag = tag !== undefined ? tag : this._tag;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  public match(pathname: string) {
    return pathname === this._pathname;
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass(this._tag, this._props.props);

      renderDOM(this._props.rootQuery, this._block as Block<any>);
      return;
    }

    this._block.show();
  }
}
