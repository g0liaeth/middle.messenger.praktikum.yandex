import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { BasePropsType } from '../../types/componentTypes';
import Block from './Block';
import compileComponent from './compileComponent';

class MockBlock extends Block<BasePropsType> {
  constructor(tag?: string, props?: BasePropsType) {
    super(tag, props);
  }

  render() {
    return compileComponent('testText', this._props);
  }
}

describe('Block tests:', () => {
  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><body><div id="root"></div></body>', {
      url: 'http://localhost:3000',
    });

    global.window = {
      ...dom.window,
      ...global.window,
    };
    global.document = dom.window.document;
  });

  describe('create instance', () => {
    it('can create an instance', () => {
      const block = new MockBlock('main', { class: 'wow' });
      expect(block).to.not.be.null;
      expect(block).to.not.be.undefined;
    });
  });

  describe('setProps', () => {
    it('setProps change component props', () => {
      const block = new MockBlock('main', { class: 'wow' });
      block.setProps({ test: '123' });
      //@ts-expect-error ???
      expect(block._props.test).to.eq('123');
    });
  });

  describe('render', () => {
    it('render returns correct content', () => {
      const block = new MockBlock('div', { class: 'wow' });
      expect(block.getContent().innerHTML).to.eq('testText');
    });

    it('render set attributes to html tag', () => {
      const block = new MockBlock('main', { class: 'wow' });
      expect(block.getContent().classList.contains('wow')).to.be.true;
    });
  });
});
