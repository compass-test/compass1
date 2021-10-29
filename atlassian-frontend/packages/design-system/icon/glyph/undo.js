"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _base = require("@atlaskit/icon/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UndoIcon = props => /*#__PURE__*/_react.default.createElement(_base.Icon, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M5.138 13.026a.98.98 0 00.386 1.366 1.066 1.066 0 001.421-.371C8.051 12.167 10.104 11 12.37 11c2.437 0 4.619 1.351 5.648 3.429.246.498.868.71 1.388.473.519-.238.74-.833.493-1.333C18.528 10.802 15.618 9 12.37 9c-3.02 0-5.759 1.557-7.232 4.026z"/><path d="M4.5 10v3.9c0 .607.494 1.1 1.102 1.1h3.896a1 1 0 100-2H6.503v-3A1 1 0 004.5 10z"/></g></svg>`
}, props));

UndoIcon.displayName = 'UndoIcon';
var _default = UndoIcon;
exports.default = _default;