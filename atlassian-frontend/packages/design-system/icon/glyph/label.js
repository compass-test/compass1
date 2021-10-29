"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _base = require("@atlaskit/icon/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LabelIcon = props => /*#__PURE__*/_react.default.createElement(_base.Icon, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M11.433 5.428l-4.207.6A2 2 0 005.53 7.727l-.6 4.207a1 1 0 00.281.849l6.895 6.894a.999.999 0 001.414 0l5.657-5.657a1 1 0 000-1.414L12.282 5.71a.998.998 0 00-.849-.283m-.647 5.858A1.666 1.666 0 118.43 8.929a1.666 1.666 0 012.357 2.357" fill="currentColor" fill-rule="evenodd"/></svg>`
}, props));

LabelIcon.displayName = 'LabelIcon';
var _default = LabelIcon;
exports.default = _default;