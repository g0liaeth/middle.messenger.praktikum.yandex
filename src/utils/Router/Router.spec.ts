// import { expect } from 'chai';
// import { JSDOM } from 'jsdom';
// import * as sinon from 'sinon';
// import { BlockInheritor } from '../../types/commonTypes';
// import Router from './Router';

// describe('Router tests:', () => {
//   beforeEach(() => {
//     const dom = new JSDOM('<!DOCTYPE html><body><div id="root"></div></body>', {
//       url: 'http://localhost:3000',
//     });

//     global.window = {
//       ...dom.window,
//       ...global.window,
//     };
//     global.document = dom.window.document;
//   });

//   describe('create instance', () => {
//     it('can create an instance', () => {
//       const router = new Router('#root');
//       expect(router).to.not.be.null;
//       expect(router).to.not.be.undefined;
//     });

//     it('should be a singleton', () => {
//       const router1 = new Router('#root');
//       const router2 = new Router('#root');

//       expect(router1).to.eq(router2);
//     });
//   });

//   describe('use', () => {
//     it('should return instance of router', () => {
//       const router = new Router('#root');
//       const result = router.use('/mock-path', {} as BlockInheritor, {});
//       expect(router).to.eq(result);
//     });
//   });

//   describe('go', () => {
//     it('should change path in browser history', () => {
//       const router = new Router('#root');
//       router.use('/mock-path', {} as BlockInheritor, {});
//       router.go('/test');

//       expect(global.window.location.pathname).to.eq('/test');
//     });
//   });

//   describe('back', () => {
//     it('should call window.history.back()', () => {
//       const router = new Router('#root');
//       const backSpy = sinon.spy(global.window.history, 'back');
//       router.back();
//       expect(backSpy.called).to.be.true;
//     });
//   });

//   describe('forward', () => {
//     it('should call window.history.forward()', () => {
//       const router = new Router('#root');
//       const forwardSpy = sinon.spy(global.window.history, 'forward');
//       router.forward();
//       expect(forwardSpy.called).to.be.true;
//     });
//   });

//   describe('getRoute', () => {
//     it('should return specified route', () => {
//       const router = new Router('#root');
//       router.use('/mock-path', {} as BlockInheritor, {});
//       const result = router.getRoute('/mock-path');
//       expect(result).to.not.be.null;
//       expect(result).not.to.be.undefined;
//     });
//   });
// });
