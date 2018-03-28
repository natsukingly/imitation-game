'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orientations = [1, 2, 3, 4, 5, 6, 7, 8];


var Example = function Example() {
  return _react2.default.createElement(
    'div',
    null,
    orientations.map(function (orientation) {
      return _react2.default.createElement(_index2.default, {
        key: 'l' + orientation,
        src: 'https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Landscape_' + orientation + '.jpg',
        alt: 'Landscape ' + orientation
      });
    }),
    orientations.map(function (orientation) {
      return _react2.default.createElement(_index2.default, {
        key: 'p' + orientation,
        src: 'https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Portrait_' + orientation + '.jpg',
        alt: 'Portrait ' + orientation
      });
    })
  );
};

_reactDom2.default.render(_react2.default.createElement(Example, null), document.getElementById('root'));
//# sourceMappingURL=example.js.map