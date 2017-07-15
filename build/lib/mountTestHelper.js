'use strict';

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = _jsdom2.default.jsdom('<!doctype html><html><body></body></html>'); // Need this just to use mount for enzyme

global.document = doc;
global.window = doc.defaultView;