"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _base = require("@atlaskit/icon/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BookIcon = props => /*#__PURE__*/_react.default.createElement(_base.Icon, Object.assign({
  dangerouslySetGlyph: `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M7 6.002v9.996c0 .546.446 1.002.995 1.002h8.01c.54 0 .995-.449.995-1.002V6.002C17 5.456 16.554 5 16.005 5h-8.01C7.455 5 7 5.449 7 6.002zm-2 0A3.005 3.005 0 017.995 3h8.01A3.003 3.003 0 0119 6.002v9.996A3.005 3.005 0 0116.005 19h-8.01A3.003 3.003 0 015 15.998V6.002z" fill-rule="nonzero"/><path d="M9 7h6v4H9zm0 6h6v2H9zm1 7.857V20H7v.857L8.5 20l1.5.857zM7 18h3v2H7z"/></g></svg>`
}, props));

BookIcon.displayName = 'BookIcon';
var _default = BookIcon;
exports.default = _default;