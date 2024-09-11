import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<body></body>', { url: 'https://example.org' })


global.structuredClone = (val) => JSON.parse(JSON.stringify(val))
global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
