import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import * as MockXMLHttpRequest from 'mock-xmlhttprequest';
import HTTPClient from './HTTPClient';

describe('HTTPClient tests:', () => {
  let MockXhr: typeof MockXMLHttpRequest.MockXhr;

  const httpClient = new HTTPClient('');

  function mockResponse(response: string, status: number) {
    MockXhr.onSend = (xhr) => {
      const responseHeaders = { 'Content-Type': 'application/json' };
      xhr.respond(status, responseHeaders, response);
    };
  }
  const XMLHttpRequestOriginal = global.XMLHttpRequest;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><body><div id="root"></div></body>', {
      url: 'http://localhost:3000',
    });

    global.window = {
      ...dom.window,
      ...global.window,
    };
    global.document = dom.window.document;

    MockXhr = MockXMLHttpRequest.newMockXhr();
    global.XMLHttpRequest = MockXhr;
  });

  it('should send GET', async () => {
    const response = '{"message":"GET runs success"}';
    mockResponse(response, 200);
    const result = await httpClient.get('/mock-url');
    expect(JSON.stringify(result.data)).to.eq(response);
  });

  it('should send POST', async () => {
    const response = '{"message":"POST runs success"}';
    mockResponse(response, 200);
    const result = await httpClient.post('/mock-url');
    expect(JSON.stringify(result.data)).to.eq(response);
  });

  it('should send PUT', async () => {
    const response = '{"message":"PUT runs success"}';
    mockResponse(response, 200);
    const result = await httpClient.put('/mock-url');
    expect(JSON.stringify(result.data)).to.eq(response);
  });

  it('should send DELETE', async () => {
    const response = '{"message":"DELTE runs success"}';
    mockResponse(response, 200);
    const result = await httpClient.delete('/mock-url');
    expect(JSON.stringify(result.data)).to.eq(response);
  });

  afterEach(() => {
    global.XMLHttpRequest = XMLHttpRequestOriginal;
  });
});
