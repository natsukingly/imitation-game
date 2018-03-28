'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _exifJs = require('exif-js');

var _exifJs2 = _interopRequireDefault(_exifJs);

var _exif2css = require('exif2css');

var _exif2css2 = _interopRequireDefault(_exif2css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var snakeToCamelCaseKeys = function snakeToCamelCaseKeys(obj) {
  return Object.keys(obj).map(function (k) {
    return _defineProperty({}, k.replace(/(-\w)/g, function (m) {
      return m[1].toUpperCase();
    }), obj[k]);
  }).reduce(function (a, b) {
    return _extends({}, a, b);
  }, {});
};

var ExifOrientationImg = function (_Component) {
  _inherits(ExifOrientationImg, _Component);

  function ExifOrientationImg() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, ExifOrientationImg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ExifOrientationImg.__proto__ || Object.getPrototypeOf(ExifOrientationImg)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      orientation: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExifOrientationImg, [{
    key: '_onImageLoaded',
    value: function _onImageLoaded() {
      var _this2 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var _args = _toArray(args),
          event = _args[0],
          otherArgs = _args.slice(1);

      var imageElement = event.target;
      var onLoad = this.props.onLoad;

      // Fix for an issue affecting exif-js: see https://github.com/exif-js/exif-js/issues/95

      var windowImage = window.Image;
      window.Image = null;

      // Do the actual EXIF operations
      if (!_exifJs2.default.getData(imageElement, function () {
        _this2.setState({
          orientation: _exifJs2.default.getTag(imageElement, 'Orientation')
        });
        onLoad && onLoad.apply(undefined, [event].concat(_toConsumableArray(otherArgs)));
      })) {
        onLoad && onLoad.apply(undefined, [event].concat(_toConsumableArray(otherArgs)));
      }

      // Re-establish the reference
      window.Image = windowImage;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          src = _props.src,
          alt = _props.alt,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          onLoad = _props.onLoad,
          imgProps = _objectWithoutProperties(_props, ['src', 'alt', 'style', 'onLoad']);

      var orientation = this.state.orientation;


      return _react2.default.createElement('img', _extends({
        onLoad: this._onImageLoaded.bind(this),
        src: src,
        alt: alt,
        style: _extends({}, orientation ? snakeToCamelCaseKeys((0, _exif2css2.default)(orientation)) : {}, style)
      }, imgProps));
    }
  }]);

  return ExifOrientationImg;
}(_react.Component);

exports.default = ExifOrientationImg;
//# sourceMappingURL=ExifOrientationImg.js.map