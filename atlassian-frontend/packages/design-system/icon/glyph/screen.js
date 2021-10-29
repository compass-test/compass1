"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _base = require("@atlaskit/icon/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ScreenIcon = props => /*#__PURE__*/_react.default.createElement(_base.Icon, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M3 6.009C3 4.899 3.893 4 4.995 4h14.01C20.107 4 21 4.902 21 6.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 013 13.991V6.01zM5 14h14V6H5v8z" fill-rule="nonzero"/><path d="M10 17h4v3h-4zm-1 3.5a.5.5 0 01.491-.5h5.018a.5.5 0 01.491.5v.5H9v-.5z"/></g></svg>`
}, props));

ScreenIcon.displayName = 'ScreenIcon';
var _default = ScreenIcon;
exports.default = _default;