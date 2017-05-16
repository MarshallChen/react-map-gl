'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _class3, _temp; // Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _mapboxGl = require('mapbox-gl');

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _d3Selection = require('d3-selection');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _mapInteractions = require('./map-interactions.react');

var _mapInteractions2 = _interopRequireDefault(_mapInteractions);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _styleUtils = require('./utils/style-utils');

var _diffStyles2 = require('./utils/diff-styles');

var _diffStyles3 = _interopRequireDefault(_diffStyles2);

var _transform = require('./utils/transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function noop() {}

// Note: Max pitch is a hard coded value (not a named constant) in transform.js
var MAX_PITCH = 60;
var PITCH_MOUSE_THRESHOLD = 20;
var PITCH_ACCEL = 1.2;

var PROP_TYPES = {
  /**
    * The latitude of the center of the map.
    */
  latitude: _react.PropTypes.number.isRequired,
  /**
    * The longitude of the center of the map.
    */
  longitude: _react.PropTypes.number.isRequired,
  /**
    * The tile zoom level of the map.
    */
  zoom: _react.PropTypes.number.isRequired,
  /**
    * The maximum tile zoom level of the map. Defaults to 20.
    * Increasing this will allow you to zoom further into the map but should
    * only be used if you know what you are doing past zoom 20. The default
    * map styles won't render anything useful past 20.
    */
  maxZoom: _react.PropTypes.number,
  /**
    * The Mapbox style the component should use. Can either be a string url
    * or a MapboxGL style Immutable.Map object.
    */
  mapStyle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.instanceOf(_immutable2.default.Map)]),
  /**
    * The Mapbox API access token to provide to mapbox-gl-js. This is required
    * when using Mapbox provided vector tiles and styles.
    */
  mapboxApiAccessToken: _react.PropTypes.string,
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onChangeViewport: _react.PropTypes.func,
  /**
    * The width of the map.
    */
  width: _react.PropTypes.number.isRequired,
  /**
    * The height of the map.
    */
  height: _react.PropTypes.number.isRequired,
  /**
    * Is the component currently being dragged. This is used to show/hide the
    * drag cursor. Also used as an optimization in some overlays by preventing
    * rendering while dragging.
    */
  isDragging: _react.PropTypes.bool,
  /**
    * Required to calculate the mouse projection after the first click event
    * during dragging. Where the map is depends on where you first clicked on
    * the map.
    */
  startDragLngLat: _react.PropTypes.array,
  /**
    * Called when a feature is hovered over. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    * @callback
    * @param {array} features - The array of features the mouse is over.
    */
  onHoverFeatures: _react.PropTypes.func,
  /**
    * Defaults to TRUE
    * Set to false to enable onHoverFeatures to be called regardless if
    * there is an actual feature at x, y. This is useful to emulate
    * "mouse-out" behaviors on features.
    */
  ignoreEmptyFeatures: _react.PropTypes.bool,

  /**
    * Show attribution control or not.
    */
  attributionControl: _react.PropTypes.bool,

  /**
   * Called when the map is clicked. The handler is called with the clicked
   * coordinates (https://www.mapbox.com/mapbox-gl-js/api/#LngLat) and the
   * screen coordinates (https://www.mapbox.com/mapbox-gl-js/api/#PointLike).
   */
  onClick: _react.PropTypes.func,

  /**
    * Called when a feature is clicked on. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    */
  onClickFeatures: _react.PropTypes.func,

  /**
    * Radius to detect features around a clicked point. Defaults to 15.
    */
  clickRadius: _react.PropTypes.number,

  /**
    * Passed to Mapbox Map constructor which passes it to the canvas context.
    * This is unseful when you want to export the canvas as a PNG.
    */
  preserveDrawingBuffer: _react.PropTypes.bool,

  /**
    * There are still known issues with style diffing. As a temporary stopgap,
    * add the option to prevent style diffing.
    */
  preventStyleDiffing: _react.PropTypes.bool,

  /**
    * Enables perspective control event handling
    */
  perspectiveEnabled: _react.PropTypes.bool,

  /**
    * Specify the bearing of the viewport
    */
  bearing: _react.PropTypes.number,

  /**
    * Specify the pitch of the viewport
    */
  pitch: _react.PropTypes.number,

  /**
    * Specify the altitude of the viewport camera
    * Unit: map heights, default 1.5
    * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
    */
  altitude: _react.PropTypes.number,

  /**
    * The load callback is called when all dependencies have been loaded and
    * the map is ready.
    */
  onLoad: _react.PropTypes.func

};

var DEFAULT_PROPS = {
  mapStyle: 'mapbox://styles/mapbox/light-v9',
  onChangeViewport: null,
  mapboxApiAccessToken: _config2.default.DEFAULTS.MAPBOX_API_ACCESS_TOKEN,
  preserveDrawingBuffer: false,
  attributionControl: true,
  ignoreEmptyFeatures: true,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  clickRadius: 15,
  maxZoom: 20
};

var MapGL = (0, _pureRenderDecorator2.default)(_class = (_class2 = (_temp = _class3 = function (_Component) {
  _inherits(MapGL, _Component);

  _createClass(MapGL, null, [{
    key: 'supported',
    value: function supported() {
      return _mapboxGl2.default.supported();
    }
  }]);

  function MapGL(props) {
    _classCallCheck(this, MapGL);

    var _this = _possibleConstructorReturn(this, (MapGL.__proto__ || Object.getPrototypeOf(MapGL)).call(this, props));

    _this.state = {
      isSupported: _mapboxGl2.default.supported(),
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
    _this._queryParams = {};
    _mapboxGl2.default.accessToken = props.mapboxApiAccessToken;

    if (!_this.state.isSupported) {
      _this.componentDidMount = noop;
      _this.componentWillReceiveProps = noop;
      _this.componentDidUpdate = noop;
    }
    return _this;
  }

  _createClass(MapGL, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var mapStyle = _immutable2.default.Map.isMap(this.props.mapStyle) ? this.props.mapStyle.toJS() : this.props.mapStyle;

      var map = new _mapboxGl2.default.Map({
        container: this.refs.mapboxMap,
        center: [this.props.longitude, this.props.latitude],
        zoom: this.props.zoom,
        maxZoom: this.props.maxZoom,
        pitch: this.props.pitch,
        bearing: this.props.bearing,
        style: mapStyle,
        interactive: false,
        preserveDrawingBuffer: this.props.preserveDrawingBuffer
        // TODO?
        // attributionControl: this.props.attributionControl
      });

      if (this.props.onLoad) {
        map.once('load', function () {
          return _this2.props.onLoad();
        });
      }

      (0, _d3Selection.select)(map.getCanvas()).style('outline', 'none');

      this._map = map;
      this._updateMapViewport({}, this.props);
      this._callOnChangeViewport(map.transform);
      this._updateQueryParams(mapStyle);
    }

    // New props are comin' round the corner!

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this._updateStateFromProps(this.props, newProps);
      this._updateMapViewport(this.props, newProps);
      this._updateMapStyle(this.props, newProps);
      // Save width/height so that we can check them in componentDidUpdate
      this.setState({
        width: this.props.width,
        height: this.props.height
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // map.resize() reads size from DOM, we need to call after render
      this._updateMapSize(this.state, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._map) {
        this._map.remove();
      }
    }

    // External apps can access map this way

  }, {
    key: '_getMap',
    value: function _getMap() {
      return this._map;
    }

    // Calculate a cursor style

  }, {
    key: '_getCursor',
    value: function _getCursor() {
      var isInteractive = this.props.onChangeViewport || this.props.onClickFeature || this.props.onHoverFeatures;
      if (isInteractive) {
        return this.props.isDragging ? _config2.default.CURSOR.GRABBING : this.state.isHovering ? _config2.default.CURSOR.POINTER : _config2.default.CURSOR.GRAB;
      }
      return 'inherit';
    }
  }, {
    key: '_updateStateFromProps',
    value: function _updateStateFromProps(oldProps, newProps) {
      _mapboxGl2.default.accessToken = newProps.mapboxApiAccessToken;
      this.setState({
        startDragLngLat: newProps.startDragLngLat
      });
    }

    // Hover and click only query layers whose interactive property is true
    // If no interactivity is specified, query all layers

  }, {
    key: '_updateQueryParams',
    value: function _updateQueryParams(mapStyle) {
      var interactiveLayerIds = (0, _styleUtils.getInteractiveLayerIds)(mapStyle);
      this._queryParams = interactiveLayerIds.length === 0 ? {} : { layers: interactiveLayerIds };
    }

    // Update a source in the map style

  }, {
    key: '_updateSource',
    value: function _updateSource(map, update) {
      var newSource = update.source.toJS();
      if (newSource.type === 'geojson') {
        var oldSource = map.getSource(update.id);
        if (oldSource.type === 'geojson') {
          // update data if no other GeoJSONSource options were changed
          var oldOpts = oldSource.workerOptions;
          if ((newSource.maxzoom === undefined || newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) && (newSource.buffer === undefined || newSource.buffer === oldOpts.geojsonVtOptions.buffer) && (newSource.tolerance === undefined || newSource.tolerance === oldOpts.geojsonVtOptions.tolerance) && (newSource.cluster === undefined || newSource.cluster === oldOpts.cluster) && (newSource.clusterRadius === undefined || newSource.clusterRadius === oldOpts.superclusterOptions.radius) && (newSource.clusterMaxZoom === undefined || newSource.clusterMaxZoom === oldOpts.superclusterOptions.maxZoom)) {
            oldSource.setData(newSource.data);
            return;
          }
        }
      }

      map.removeSource(update.id);
      map.addSource(update.id, newSource);
    }

    // Individually update the maps source and layers that have changed if all
    // other style props haven't changed. This prevents flicking of the map when
    // styles only change sources or layers.
    /* eslint-disable max-statements, complexity */

  }, {
    key: '_setDiffStyle',
    value: function _setDiffStyle(prevStyle, nextStyle) {
      var prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
      var nextKeysMap = styleKeysMap(nextStyle);
      function styleKeysMap(style) {
        return style.map(function () {
          return true;
        }).delete('layers').delete('sources').toJS();
      }
      function propsOtherThanLayersOrSourcesDiffer() {
        var prevKeysList = Object.keys(prevKeysMap);
        var nextKeysList = Object.keys(nextKeysMap);
        if (prevKeysList.length !== nextKeysList.length) {
          return true;
        }
        // `nextStyle` and `prevStyle` should not have the same set of props.
        if (nextKeysList.some(function (key) {
          return prevStyle.get(key) !== nextStyle.get(key);
        }
        // But the value of one of those props is different.
        )) {
          return true;
        }
        return false;
      }

      var map = this._map;

      if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
        map.setStyle(nextStyle.toJS());
        return;
      }

      var _diffStyles = (0, _diffStyles3.default)(prevStyle, nextStyle),
          sourcesDiff = _diffStyles.sourcesDiff,
          layersDiff = _diffStyles.layersDiff;

      // TODO: It's rather difficult to determine style diffing in the presence
      // of refs. For now, if any style update has a ref, fallback to no diffing.
      // We can come back to this case if there's a solid usecase.


      if (layersDiff.updates.some(function (node) {
        return node.layer.get('ref');
      })) {
        map.setStyle(nextStyle.toJS());
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sourcesDiff.enter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var enter = _step.value;

          map.addSource(enter.id, enter.source.toJS());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = sourcesDiff.update[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var update = _step2.value;

          this._updateSource(map, update);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = sourcesDiff.exit[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var exit = _step3.value;

          map.removeSource(exit.id);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = layersDiff.exiting[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _exit = _step4.value;

          if (map.style.getLayer(_exit.id)) {
            map.removeLayer(_exit.id);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = layersDiff.updates[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _update = _step5.value;

          if (!_update.enter) {
            // This is an old layer that needs to be updated. Remove the old layer
            // with the same id and add it back again.
            map.removeLayer(_update.id);
          }
          map.addLayer(_update.layer.toJS(), _update.before);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
    /* eslint-enable max-statements, complexity */

  }, {
    key: '_updateMapStyle',
    value: function _updateMapStyle(oldProps, newProps) {
      var mapStyle = newProps.mapStyle;
      var oldMapStyle = oldProps.mapStyle;
      if (mapStyle !== oldMapStyle) {
        if (_immutable2.default.Map.isMap(mapStyle)) {
          if (this.props.preventStyleDiffing) {
            this._map.setStyle(mapStyle.toJS());
          } else {
            this._setDiffStyle(oldMapStyle, mapStyle);
          }
        } else {
          this._map.setStyle(mapStyle);
        }
        this._updateQueryParams(mapStyle);
      }
    }
  }, {
    key: '_updateMapViewport',
    value: function _updateMapViewport(oldProps, newProps) {
      var viewportChanged = newProps.latitude !== oldProps.latitude || newProps.longitude !== oldProps.longitude || newProps.zoom !== oldProps.zoom || newProps.pitch !== oldProps.pitch || newProps.zoom !== oldProps.bearing || newProps.altitude !== oldProps.altitude;

      if (viewportChanged) {
        this._map.jumpTo({
          center: [newProps.longitude, newProps.latitude],
          zoom: newProps.zoom,
          bearing: newProps.bearing,
          pitch: newProps.pitch
        });

        // TODO - jumpTo doesn't handle altitude
        if (newProps.altitude !== oldProps.altitude) {
          this._map.transform.altitude = newProps.altitude;
        }
      }
    }

    // Note: needs to be called after render (e.g. in componentDidUpdate)

  }, {
    key: '_updateMapSize',
    value: function _updateMapSize(oldProps, newProps) {
      var sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;

      // if (sizeChanged) {
      this._map.resize();
      // this._callOnChangeViewport(this._map.transform);
      // }
    }

    // Calculates a new pitch and bearing from a position (coming from an event)

  }, {
    key: '_calculateNewPitchAndBearing',
    value: function _calculateNewPitchAndBearing(_ref) {
      var pos = _ref.pos,
          startPos = _ref.startPos,
          startBearing = _ref.startBearing,
          startPitch = _ref.startPitch;

      var xDelta = pos[0] - startPos[0];
      var bearing = startBearing + 180 * xDelta / this.props.width;

      var pitch = startPitch;
      var yDelta = pos[1] - startPos[1];
      if (yDelta > 0) {
        // Dragging downwards, gradually decrease pitch
        if (Math.abs(this.props.height - startPos[1]) > PITCH_MOUSE_THRESHOLD) {
          var scale = yDelta / (this.props.height - startPos[1]);
          pitch = (1 - scale) * PITCH_ACCEL * startPitch;
        }
      } else if (yDelta < 0) {
        // Dragging upwards, gradually increase pitch
        if (startPos[1] > PITCH_MOUSE_THRESHOLD) {
          // Move from 0 to 1 as we drag upwards
          var yScale = 1 - pos[1] / startPos[1];
          // Gradually add until we hit max pitch
          pitch = startPitch + yScale * (MAX_PITCH - startPitch);
        }
      }

      // console.debug(startPitch, pitch);
      return {
        pitch: Math.max(Math.min(pitch, MAX_PITCH), 0),
        bearing: bearing
      };
    }

    // Helper to call props.onChangeViewport

  }, {
    key: '_callOnChangeViewport',
    value: function _callOnChangeViewport(transform) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.props.onChangeViewport) {
        this.props.onChangeViewport(_extends({
          latitude: transform.center.lat,
          longitude: (0, _transform.mod)(transform.center.lng + 180, 360) - 180,
          zoom: transform.zoom,
          pitch: transform.pitch,
          bearing: (0, _transform.mod)(transform.bearing + 180, 360) - 180,

          isDragging: this.props.isDragging,
          startDragLngLat: this.props.startDragLngLat,
          startBearing: this.props.startBearing,
          startPitch: this.props.startPitch

        }, opts));
      }
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(opts) {
      this._onMouseDown(opts);
    }
  }, {
    key: '_onTouchDrag',
    value: function _onTouchDrag(opts) {
      this._onMouseDrag(opts);
    }
  }, {
    key: '_onTouchRotate',
    value: function _onTouchRotate(opts) {
      this._onMouseRotate(opts);
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(opts) {
      this._onMouseUp(opts);
    }
  }, {
    key: '_onTouchTap',
    value: function _onTouchTap(opts) {
      this._onMouseClick(opts);
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(_ref2) {
      var pos = _ref2.pos;
      var transform = this._map.transform;

      var _unprojectFromTransfo = (0, _transform.unprojectFromTransform)(transform, new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))()),
          lng = _unprojectFromTransfo.lng,
          lat = _unprojectFromTransfo.lat;

      this._callOnChangeViewport(transform, {
        isDragging: true,
        startDragLngLat: [lng, lat],
        startBearing: transform.bearing,
        startPitch: transform.pitch
      });
    }
  }, {
    key: '_onMouseDrag',
    value: function _onMouseDrag(_ref3) {
      var pos = _ref3.pos;

      if (!this.props.onChangeViewport) {
        return;
      }

      // take the start lnglat and put it where the mouse is down.
      (0, _assert2.default)(this.props.startDragLngLat, '`startDragLngLat` prop is required ' + 'for mouse drag behavior to calculate where to position the map.');

      var transform = (0, _transform.cloneTransform)(this._map.transform);

      var _props$startDragLngLa = _slicedToArray(this.props.startDragLngLat, 2),
          lng = _props$startDragLngLa[0],
          lat = _props$startDragLngLa[1];

      transform.setLocationAtPoint({ lng: lng, lat: lat }, new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))());
      this._callOnChangeViewport(transform, { isDragging: true });
    }
  }, {
    key: '_onMouseRotate',
    value: function _onMouseRotate(_ref4) {
      var pos = _ref4.pos,
          startPos = _ref4.startPos;

      if (!this.props.onChangeViewport || !this.props.perspectiveEnabled) {
        return;
      }

      var _props = this.props,
          startBearing = _props.startBearing,
          startPitch = _props.startPitch;

      (0, _assert2.default)(typeof startBearing === 'number', '`startBearing` prop is required for mouse rotate behavior');
      (0, _assert2.default)(typeof startPitch === 'number', '`startPitch` prop is required for mouse rotate behavior');

      var _calculateNewPitchAnd = this._calculateNewPitchAndBearing({
        pos: pos,
        startPos: startPos,
        startBearing: startBearing,
        startPitch: startPitch
      }),
          pitch = _calculateNewPitchAnd.pitch,
          bearing = _calculateNewPitchAnd.bearing;

      var transform = (0, _transform.cloneTransform)(this._map.transform);
      transform.bearing = bearing;
      transform.pitch = pitch;

      this._callOnChangeViewport(transform, { isDragging: true });
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(_ref5) {
      var pos = _ref5.pos;

      if (!this.props.onHoverFeatures) {
        return;
      }
      var features = this._map.queryRenderedFeatures(new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))(), this._queryParams);
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.setState({ isHovering: features.length > 0 });
      this.props.onHoverFeatures(features);
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(opt) {
      this._callOnChangeViewport(this._map.transform, {
        isDragging: false,
        startDragLngLat: null,
        startBearing: null,
        startPitch: null
      });
    }
  }, {
    key: '_onMouseClick',
    value: function _onMouseClick(_ref6) {
      var pos = _ref6.pos;

      if (!this.props.onClickFeatures && !this.props.onClick) {
        return;
      }

      if (this.props.onClick) {
        var point = new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))();
        var latLong = this._map.unproject(point);
        // TODO - Do we really want to expose a mapbox "Point" in our interface?
        this.props.onClick(latLong, point);
      }

      if (this.props.onClickFeatures) {
        // Radius enables point features, like marker symbols, to be clicked.
        var size = this.props.clickRadius;
        var bbox = [[pos[0] - size, pos[1] - size], [pos[0] + size, pos[1] + size]];
        var features = this._map.queryRenderedFeatures(bbox, this._queryParams);
        if (!features.length && this.props.ignoreEmptyFeatures) {
          return;
        }
        this.props.onClickFeatures(features);
      }
    }
  }, {
    key: '_onZoom',
    value: function _onZoom(_ref7) {
      var pos = _ref7.pos,
          scale = _ref7.scale;

      var point = new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))();
      var transform = (0, _transform.cloneTransform)(this._map.transform);
      var around = (0, _transform.unprojectFromTransform)(transform, point);
      transform.zoom = transform.scaleZoom(this._map.transform.scale * scale);
      transform.setLocationAtPoint(around, point);
      this._callOnChangeViewport(transform, { isDragging: true });
    }
  }, {
    key: '_onZoomEnd',
    value: function _onZoomEnd() {
      this._callOnChangeViewport(this._map.transform, { isDragging: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          width = _props2.width,
          height = _props2.height,
          style = _props2.style;

      var mapStyle = _extends({}, style, {
        width: width,
        height: height,
        cursor: this._getCursor()
      });

      var content = [_react2.default.createElement('div', { key: 'map', ref: 'mapboxMap',
        style: mapStyle, className: className }), _react2.default.createElement(
        'div',
        { key: 'overlays', className: 'overlays',
          style: { position: 'absolute', left: 0, top: 0 } },
        this.props.children
      )];

      if (this.state.isSupported && this.props.onChangeViewport) {
        content = _react2.default.createElement(
          _mapInteractions2.default,
          {
            onMouseDown: this._onMouseDown,
            onMouseDrag: this._onMouseDrag,
            onMouseRotate: this._onMouseRotate,
            onMouseUp: this._onMouseUp,
            onMouseMove: this._onMouseMove,
            onMouseClick: this._onMouseClick,
            onTouchStart: this._onTouchStart,
            onTouchDrag: this._onTouchDrag,
            onTouchRotate: this._onTouchRotate,
            onTouchEnd: this._onTouchEnd,
            onTouchTap: this._onTouchTap,
            onZoom: this._onZoom,
            onZoomEnd: this._onZoomEnd,
            width: this.props.width,
            height: this.props.height },
          content
        );
      }

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, this.props.style, {
            width: this.props.width,
            height: this.props.height,
            position: 'relative'
          }) },
        content
      );
    }
  }]);

  return MapGL;
}(_react.Component), _class3.propTypes = PROP_TYPES, _class3.defaultProps = DEFAULT_PROPS, _temp), (_applyDecoratedDescriptor(_class2.prototype, '_onTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchStart'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchDrag'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchRotate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchRotate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchEnd'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchTap', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchTap'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseDrag'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseRotate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseRotate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseMove'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseUp'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseClick', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onZoom', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onZoom'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onZoomEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onZoomEnd'), _class2.prototype)), _class2)) || _class;

exports.default = MapGL;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXAucmVhY3QuanMiXSwibmFtZXMiOlsibm9vcCIsIk1BWF9QSVRDSCIsIlBJVENIX01PVVNFX1RIUkVTSE9MRCIsIlBJVENIX0FDQ0VMIiwiUFJPUF9UWVBFUyIsImxhdGl0dWRlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImxvbmdpdHVkZSIsInpvb20iLCJtYXhab29tIiwibWFwU3R5bGUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJpbnN0YW5jZU9mIiwiTWFwIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJvbkNoYW5nZVZpZXdwb3J0IiwiZnVuYyIsIndpZHRoIiwiaGVpZ2h0IiwiaXNEcmFnZ2luZyIsImJvb2wiLCJzdGFydERyYWdMbmdMYXQiLCJhcnJheSIsIm9uSG92ZXJGZWF0dXJlcyIsImlnbm9yZUVtcHR5RmVhdHVyZXMiLCJhdHRyaWJ1dGlvbkNvbnRyb2wiLCJvbkNsaWNrIiwib25DbGlja0ZlYXR1cmVzIiwiY2xpY2tSYWRpdXMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJwcmV2ZW50U3R5bGVEaWZmaW5nIiwicGVyc3BlY3RpdmVFbmFibGVkIiwiYmVhcmluZyIsInBpdGNoIiwiYWx0aXR1ZGUiLCJvbkxvYWQiLCJERUZBVUxUX1BST1BTIiwiREVGQVVMVFMiLCJNQVBCT1hfQVBJX0FDQ0VTU19UT0tFTiIsIk1hcEdMIiwic3VwcG9ydGVkIiwicHJvcHMiLCJzdGF0ZSIsImlzU3VwcG9ydGVkIiwiaXNIb3ZlcmluZyIsInN0YXJ0QmVhcmluZyIsInN0YXJ0UGl0Y2giLCJfcXVlcnlQYXJhbXMiLCJhY2Nlc3NUb2tlbiIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsImlzTWFwIiwidG9KUyIsIm1hcCIsImNvbnRhaW5lciIsInJlZnMiLCJtYXBib3hNYXAiLCJjZW50ZXIiLCJzdHlsZSIsImludGVyYWN0aXZlIiwib25jZSIsImdldENhbnZhcyIsIl9tYXAiLCJfdXBkYXRlTWFwVmlld3BvcnQiLCJfY2FsbE9uQ2hhbmdlVmlld3BvcnQiLCJ0cmFuc2Zvcm0iLCJfdXBkYXRlUXVlcnlQYXJhbXMiLCJuZXdQcm9wcyIsIl91cGRhdGVTdGF0ZUZyb21Qcm9wcyIsIl91cGRhdGVNYXBTdHlsZSIsInNldFN0YXRlIiwiX3VwZGF0ZU1hcFNpemUiLCJyZW1vdmUiLCJpc0ludGVyYWN0aXZlIiwib25DbGlja0ZlYXR1cmUiLCJDVVJTT1IiLCJHUkFCQklORyIsIlBPSU5URVIiLCJHUkFCIiwib2xkUHJvcHMiLCJpbnRlcmFjdGl2ZUxheWVySWRzIiwibGVuZ3RoIiwibGF5ZXJzIiwidXBkYXRlIiwibmV3U291cmNlIiwic291cmNlIiwidHlwZSIsIm9sZFNvdXJjZSIsImdldFNvdXJjZSIsImlkIiwib2xkT3B0cyIsIndvcmtlck9wdGlvbnMiLCJtYXh6b29tIiwidW5kZWZpbmVkIiwiZ2VvanNvblZ0T3B0aW9ucyIsImJ1ZmZlciIsInRvbGVyYW5jZSIsImNsdXN0ZXIiLCJjbHVzdGVyUmFkaXVzIiwic3VwZXJjbHVzdGVyT3B0aW9ucyIsInJhZGl1cyIsImNsdXN0ZXJNYXhab29tIiwic2V0RGF0YSIsImRhdGEiLCJyZW1vdmVTb3VyY2UiLCJhZGRTb3VyY2UiLCJwcmV2U3R5bGUiLCJuZXh0U3R5bGUiLCJwcmV2S2V5c01hcCIsInN0eWxlS2V5c01hcCIsIm5leHRLZXlzTWFwIiwiZGVsZXRlIiwicHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIiLCJwcmV2S2V5c0xpc3QiLCJPYmplY3QiLCJrZXlzIiwibmV4dEtleXNMaXN0Iiwic29tZSIsImdldCIsImtleSIsInNldFN0eWxlIiwic291cmNlc0RpZmYiLCJsYXllcnNEaWZmIiwidXBkYXRlcyIsIm5vZGUiLCJsYXllciIsImVudGVyIiwiX3VwZGF0ZVNvdXJjZSIsImV4aXQiLCJleGl0aW5nIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImFkZExheWVyIiwiYmVmb3JlIiwib2xkTWFwU3R5bGUiLCJfc2V0RGlmZlN0eWxlIiwidmlld3BvcnRDaGFuZ2VkIiwianVtcFRvIiwic2l6ZUNoYW5nZWQiLCJyZXNpemUiLCJwb3MiLCJzdGFydFBvcyIsInhEZWx0YSIsInlEZWx0YSIsIk1hdGgiLCJhYnMiLCJzY2FsZSIsInlTY2FsZSIsIm1heCIsIm1pbiIsIm9wdHMiLCJsYXQiLCJsbmciLCJfb25Nb3VzZURvd24iLCJfb25Nb3VzZURyYWciLCJfb25Nb3VzZVJvdGF0ZSIsIl9vbk1vdXNlVXAiLCJfb25Nb3VzZUNsaWNrIiwic2V0TG9jYXRpb25BdFBvaW50IiwiX2NhbGN1bGF0ZU5ld1BpdGNoQW5kQmVhcmluZyIsImZlYXR1cmVzIiwicXVlcnlSZW5kZXJlZEZlYXR1cmVzIiwib3B0IiwicG9pbnQiLCJsYXRMb25nIiwidW5wcm9qZWN0Iiwic2l6ZSIsImJib3giLCJhcm91bmQiLCJzY2FsZVpvb20iLCJjbGFzc05hbWUiLCJjdXJzb3IiLCJfZ2V0Q3Vyc29yIiwiY29udGVudCIsInBvc2l0aW9uIiwibGVmdCIsInRvcCIsImNoaWxkcmVuIiwiX29uTW91c2VNb3ZlIiwiX29uVG91Y2hTdGFydCIsIl9vblRvdWNoRHJhZyIsIl9vblRvdWNoUm90YXRlIiwiX29uVG91Y2hFbmQiLCJfb25Ub3VjaFRhcCIsIl9vblpvb20iLCJfb25ab29tRW5kIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O29EQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxJQUFULEdBQWdCLENBQUU7O0FB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Nkosc0JBQVU7QUFKWixZQURGO0FBUUlEO0FBUkosT0FERjtBQWFEOzs7OzZCQWxmTWEsUyxHQUFZekwsVSxVQUNaMEwsWSxHQUFleEosYTs7a0JBUEhHLEsiLCJmaWxlIjoibWFwLnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCBwdXJlUmVuZGVyIGZyb20gJ3B1cmUtcmVuZGVyLWRlY29yYXRvcic7XG5cbmltcG9ydCBtYXBib3hnbCwge1BvaW50fSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHtzZWxlY3R9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCBNYXBJbnRlcmFjdGlvbnMgZnJvbSAnLi9tYXAtaW50ZXJhY3Rpb25zLnJlYWN0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5pbXBvcnQge2dldEludGVyYWN0aXZlTGF5ZXJJZHN9IGZyb20gJy4vdXRpbHMvc3R5bGUtdXRpbHMnO1xuaW1wb3J0IGRpZmZTdHlsZXMgZnJvbSAnLi91dGlscy9kaWZmLXN0eWxlcyc7XG5pbXBvcnQge21vZCwgdW5wcm9qZWN0RnJvbVRyYW5zZm9ybSwgY2xvbmVUcmFuc2Zvcm19IGZyb20gJy4vdXRpbHMvdHJhbnNmb3JtJztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIE5vdGU6IE1heCBwaXRjaCBpcyBhIGhhcmQgY29kZWQgdmFsdWUgKG5vdCBhIG5hbWVkIGNvbnN0YW50KSBpbiB0cmFuc2Zvcm0uanNcbmNvbnN0IE1BWF9QSVRDSCA9IDYwO1xuY29uc3QgUElUQ0hfTU9VU0VfVEhSRVNIT0xEID0gMjA7XG5jb25zdCBQSVRDSF9BQ0NFTCA9IDEuMjtcblxuY29uc3QgUFJPUF9UWVBFUyA9IHtcbiAgLyoqXG4gICAgKiBUaGUgbGF0aXR1ZGUgb2YgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgICovXG4gIGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogVGhlIGxvbmdpdHVkZSBvZiB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgbG9uZ2l0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogVGhlIHRpbGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxuICAgICovXG4gIHpvb206IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBUaGUgbWF4aW11bSB0aWxlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gRGVmYXVsdHMgdG8gMjAuXG4gICAgKiBJbmNyZWFzaW5nIHRoaXMgd2lsbCBhbGxvdyB5b3UgdG8gem9vbSBmdXJ0aGVyIGludG8gdGhlIG1hcCBidXQgc2hvdWxkXG4gICAgKiBvbmx5IGJlIHVzZWQgaWYgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nIHBhc3Qgem9vbSAyMC4gVGhlIGRlZmF1bHRcbiAgICAqIG1hcCBzdHlsZXMgd29uJ3QgcmVuZGVyIGFueXRoaW5nIHVzZWZ1bCBwYXN0IDIwLlxuICAgICovXG4gIG1heFpvb206IFByb3BUeXBlcy5udW1iZXIsXG4gIC8qKlxuICAgICogVGhlIE1hcGJveCBzdHlsZSB0aGUgY29tcG9uZW50IHNob3VsZCB1c2UuIENhbiBlaXRoZXIgYmUgYSBzdHJpbmcgdXJsXG4gICAgKiBvciBhIE1hcGJveEdMIHN0eWxlIEltbXV0YWJsZS5NYXAgb2JqZWN0LlxuICAgICovXG4gIG1hcFN0eWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKEltbXV0YWJsZS5NYXApXG4gIF0pLFxuICAvKipcbiAgICAqIFRoZSBNYXBib3ggQVBJIGFjY2VzcyB0b2tlbiB0byBwcm92aWRlIHRvIG1hcGJveC1nbC1qcy4gVGhpcyBpcyByZXF1aXJlZFxuICAgICogd2hlbiB1c2luZyBNYXBib3ggcHJvdmlkZWQgdmVjdG9yIHRpbGVzIGFuZCBzdHlsZXMuXG4gICAgKi9cbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKlxuICAgICogYG9uQ2hhbmdlVmlld3BvcnRgIGNhbGxiYWNrIGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIHRoZVxuICAgICogbWFwLiBUaGUgb2JqZWN0IHBhc3NlZCB0byB0aGUgY2FsbGJhY2sgY29udGFpbnMgYGxhdGl0dWRlYCxcbiAgICAqIGBsb25naXR1ZGVgIGFuZCBgem9vbWAgYW5kIGFkZGl0aW9uYWwgc3RhdGUgaW5mb3JtYXRpb24uXG4gICAgKi9cbiAgb25DaGFuZ2VWaWV3cG9ydDogUHJvcFR5cGVzLmZ1bmMsXG4gIC8qKlxuICAgICogVGhlIHdpZHRoIG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogSXMgdGhlIGNvbXBvbmVudCBjdXJyZW50bHkgYmVpbmcgZHJhZ2dlZC4gVGhpcyBpcyB1c2VkIHRvIHNob3cvaGlkZSB0aGVcbiAgICAqIGRyYWcgY3Vyc29yLiBBbHNvIHVzZWQgYXMgYW4gb3B0aW1pemF0aW9uIGluIHNvbWUgb3ZlcmxheXMgYnkgcHJldmVudGluZ1xuICAgICogcmVuZGVyaW5nIHdoaWxlIGRyYWdnaW5nLlxuICAgICovXG4gIGlzRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLFxuICAvKipcbiAgICAqIFJlcXVpcmVkIHRvIGNhbGN1bGF0ZSB0aGUgbW91c2UgcHJvamVjdGlvbiBhZnRlciB0aGUgZmlyc3QgY2xpY2sgZXZlbnRcbiAgICAqIGR1cmluZyBkcmFnZ2luZy4gV2hlcmUgdGhlIG1hcCBpcyBkZXBlbmRzIG9uIHdoZXJlIHlvdSBmaXJzdCBjbGlja2VkIG9uXG4gICAgKiB0aGUgbWFwLlxuICAgICovXG4gIHN0YXJ0RHJhZ0xuZ0xhdDogUHJvcFR5cGVzLmFycmF5LFxuICAvKipcbiAgICAqIENhbGxlZCB3aGVuIGEgZmVhdHVyZSBpcyBob3ZlcmVkIG92ZXIuIFVzZXMgTWFwYm94J3NcbiAgICAqIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyBBUEkgdG8gZmluZCBmZWF0dXJlcyB1bmRlciB0aGUgcG9pbnRlcjpcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jTWFwI3F1ZXJ5UmVuZGVyZWRGZWF0dXJlc1xuICAgICogVG8gcXVlcnkgb25seSBzb21lIG9mIHRoZSBsYXllcnMsIHNldCB0aGUgYGludGVyYWN0aXZlYCBwcm9wZXJ0eSBpbiB0aGVcbiAgICAqIGxheWVyIHN0eWxlIHRvIGB0cnVlYC4gU2VlIE1hcGJveCdzIHN0eWxlIHNwZWNcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLXN0eWxlLXNwZWMvI2xheWVyLWludGVyYWN0aXZlXG4gICAgKiBJZiBubyBpbnRlcmFjdGl2ZSBsYXllcnMgYXJlIGZvdW5kIChlLmcuIHVzaW5nIE1hcGJveCdzIGRlZmF1bHQgc3R5bGVzKSxcbiAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIHF1ZXJ5IGFsbCBsYXllcnMuXG4gICAgKiBAY2FsbGJhY2tcbiAgICAqIEBwYXJhbSB7YXJyYXl9IGZlYXR1cmVzIC0gVGhlIGFycmF5IG9mIGZlYXR1cmVzIHRoZSBtb3VzZSBpcyBvdmVyLlxuICAgICovXG4gIG9uSG92ZXJGZWF0dXJlczogUHJvcFR5cGVzLmZ1bmMsXG4gIC8qKlxuICAgICogRGVmYXVsdHMgdG8gVFJVRVxuICAgICogU2V0IHRvIGZhbHNlIHRvIGVuYWJsZSBvbkhvdmVyRmVhdHVyZXMgdG8gYmUgY2FsbGVkIHJlZ2FyZGxlc3MgaWZcbiAgICAqIHRoZXJlIGlzIGFuIGFjdHVhbCBmZWF0dXJlIGF0IHgsIHkuIFRoaXMgaXMgdXNlZnVsIHRvIGVtdWxhdGVcbiAgICAqIFwibW91c2Utb3V0XCIgYmVoYXZpb3JzIG9uIGZlYXR1cmVzLlxuICAgICovXG4gIGlnbm9yZUVtcHR5RmVhdHVyZXM6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgICogU2hvdyBhdHRyaWJ1dGlvbiBjb250cm9sIG9yIG5vdC5cbiAgICAqL1xuICBhdHRyaWJ1dGlvbkNvbnRyb2w6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgbWFwIGlzIGNsaWNrZWQuIFRoZSBoYW5kbGVyIGlzIGNhbGxlZCB3aXRoIHRoZSBjbGlja2VkXG4gICAqIGNvb3JkaW5hdGVzIChodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI0xuZ0xhdCkgYW5kIHRoZVxuICAgKiBzY3JlZW4gY29vcmRpbmF0ZXMgKGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jUG9pbnRMaWtlKS5cbiAgICovXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgICogQ2FsbGVkIHdoZW4gYSBmZWF0dXJlIGlzIGNsaWNrZWQgb24uIFVzZXMgTWFwYm94J3NcbiAgICAqIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyBBUEkgdG8gZmluZCBmZWF0dXJlcyB1bmRlciB0aGUgcG9pbnRlcjpcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jTWFwI3F1ZXJ5UmVuZGVyZWRGZWF0dXJlc1xuICAgICogVG8gcXVlcnkgb25seSBzb21lIG9mIHRoZSBsYXllcnMsIHNldCB0aGUgYGludGVyYWN0aXZlYCBwcm9wZXJ0eSBpbiB0aGVcbiAgICAqIGxheWVyIHN0eWxlIHRvIGB0cnVlYC4gU2VlIE1hcGJveCdzIHN0eWxlIHNwZWNcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLXN0eWxlLXNwZWMvI2xheWVyLWludGVyYWN0aXZlXG4gICAgKiBJZiBubyBpbnRlcmFjdGl2ZSBsYXllcnMgYXJlIGZvdW5kIChlLmcuIHVzaW5nIE1hcGJveCdzIGRlZmF1bHQgc3R5bGVzKSxcbiAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIHF1ZXJ5IGFsbCBsYXllcnMuXG4gICAgKi9cbiAgb25DbGlja0ZlYXR1cmVzOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICAqIFJhZGl1cyB0byBkZXRlY3QgZmVhdHVyZXMgYXJvdW5kIGEgY2xpY2tlZCBwb2ludC4gRGVmYXVsdHMgdG8gMTUuXG4gICAgKi9cbiAgY2xpY2tSYWRpdXM6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAgKiBQYXNzZWQgdG8gTWFwYm94IE1hcCBjb25zdHJ1Y3RvciB3aGljaCBwYXNzZXMgaXQgdG8gdGhlIGNhbnZhcyBjb250ZXh0LlxuICAgICogVGhpcyBpcyB1bnNlZnVsIHdoZW4geW91IHdhbnQgdG8gZXhwb3J0IHRoZSBjYW52YXMgYXMgYSBQTkcuXG4gICAgKi9cbiAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICAqIFRoZXJlIGFyZSBzdGlsbCBrbm93biBpc3N1ZXMgd2l0aCBzdHlsZSBkaWZmaW5nLiBBcyBhIHRlbXBvcmFyeSBzdG9wZ2FwLFxuICAgICogYWRkIHRoZSBvcHRpb24gdG8gcHJldmVudCBzdHlsZSBkaWZmaW5nLlxuICAgICovXG4gIHByZXZlbnRTdHlsZURpZmZpbmc6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgICogRW5hYmxlcyBwZXJzcGVjdGl2ZSBjb250cm9sIGV2ZW50IGhhbmRsaW5nXG4gICAgKi9cbiAgcGVyc3BlY3RpdmVFbmFibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICAqIFNwZWNpZnkgdGhlIGJlYXJpbmcgb2YgdGhlIHZpZXdwb3J0XG4gICAgKi9cbiAgYmVhcmluZzogUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICAqIFNwZWNpZnkgdGhlIHBpdGNoIG9mIHRoZSB2aWV3cG9ydFxuICAgICovXG4gIHBpdGNoOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgICogU3BlY2lmeSB0aGUgYWx0aXR1ZGUgb2YgdGhlIHZpZXdwb3J0IGNhbWVyYVxuICAgICogVW5pdDogbWFwIGhlaWdodHMsIGRlZmF1bHQgMS41XG4gICAgKiBOb24tcHVibGljIEFQSSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LWdsLWpzL2lzc3Vlcy8xMTM3XG4gICAgKi9cbiAgYWx0aXR1ZGU6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAgKiBUaGUgbG9hZCBjYWxsYmFjayBpcyBjYWxsZWQgd2hlbiBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgYmVlbiBsb2FkZWQgYW5kXG4gICAgKiB0aGUgbWFwIGlzIHJlYWR5LlxuICAgICovXG4gIG9uTG9hZDogUHJvcFR5cGVzLmZ1bmNcblxufTtcblxuY29uc3QgREVGQVVMVF9QUk9QUyA9IHtcbiAgbWFwU3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2xpZ2h0LXY5JyxcbiAgb25DaGFuZ2VWaWV3cG9ydDogbnVsbCxcbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IGNvbmZpZy5ERUZBVUxUUy5NQVBCT1hfQVBJX0FDQ0VTU19UT0tFTixcbiAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBmYWxzZSxcbiAgYXR0cmlidXRpb25Db250cm9sOiB0cnVlLFxuICBpZ25vcmVFbXB0eUZlYXR1cmVzOiB0cnVlLFxuICBiZWFyaW5nOiAwLFxuICBwaXRjaDogMCxcbiAgYWx0aXR1ZGU6IDEuNSxcbiAgY2xpY2tSYWRpdXM6IDE1LFxuICBtYXhab29tOiAyMFxufTtcblxuQHB1cmVSZW5kZXJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcEdMIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgc3VwcG9ydGVkKCkge1xuICAgIHJldHVybiBtYXBib3hnbC5zdXBwb3J0ZWQoKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBQUk9QX1RZUEVTO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gREVGQVVMVF9QUk9QUztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNTdXBwb3J0ZWQ6IG1hcGJveGdsLnN1cHBvcnRlZCgpLFxuICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICBpc0hvdmVyaW5nOiBmYWxzZSxcbiAgICAgIHN0YXJ0RHJhZ0xuZ0xhdDogbnVsbCxcbiAgICAgIHN0YXJ0QmVhcmluZzogbnVsbCxcbiAgICAgIHN0YXJ0UGl0Y2g6IG51bGxcbiAgICB9O1xuICAgIHRoaXMuX3F1ZXJ5UGFyYW1zID0ge307XG4gICAgbWFwYm94Z2wuYWNjZXNzVG9rZW4gPSBwcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbjtcblxuICAgIGlmICghdGhpcy5zdGF0ZS5pc1N1cHBvcnRlZCkge1xuICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCA9IG5vb3A7XG4gICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBub29wO1xuICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSBub29wO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IG1hcFN0eWxlID0gSW1tdXRhYmxlLk1hcC5pc01hcCh0aGlzLnByb3BzLm1hcFN0eWxlKSA/XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlLnRvSlMoKSA6XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlO1xuXG4gICAgY29uc3QgbWFwID0gbmV3IG1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IHRoaXMucmVmcy5tYXBib3hNYXAsXG4gICAgICBjZW50ZXI6IFt0aGlzLnByb3BzLmxvbmdpdHVkZSwgdGhpcy5wcm9wcy5sYXRpdHVkZV0sXG4gICAgICB6b29tOiB0aGlzLnByb3BzLnpvb20sXG4gICAgICBtYXhab29tOiB0aGlzLnByb3BzLm1heFpvb20sXG4gICAgICBwaXRjaDogdGhpcy5wcm9wcy5waXRjaCxcbiAgICAgIGJlYXJpbmc6IHRoaXMucHJvcHMuYmVhcmluZyxcbiAgICAgIHN0eWxlOiBtYXBTdHlsZSxcbiAgICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdGhpcy5wcm9wcy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXJcbiAgICAgIC8vIFRPRE8/XG4gICAgICAvLyBhdHRyaWJ1dGlvbkNvbnRyb2w6IHRoaXMucHJvcHMuYXR0cmlidXRpb25Db250cm9sXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkxvYWQpIHtcbiAgICAgIG1hcC5vbmNlKCdsb2FkJywgKCkgPT4gdGhpcy5wcm9wcy5vbkxvYWQoKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KG1hcC5nZXRDYW52YXMoKSkuc3R5bGUoJ291dGxpbmUnLCAnbm9uZScpO1xuXG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3VwZGF0ZU1hcFZpZXdwb3J0KHt9LCB0aGlzLnByb3BzKTtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydChtYXAudHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVRdWVyeVBhcmFtcyhtYXBTdHlsZSk7XG4gIH1cblxuICAvLyBOZXcgcHJvcHMgYXJlIGNvbWluJyByb3VuZCB0aGUgY29ybmVyIVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgdGhpcy5fdXBkYXRlU3RhdGVGcm9tUHJvcHModGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIHRoaXMuX3VwZGF0ZU1hcFZpZXdwb3J0KHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB0aGlzLl91cGRhdGVNYXBTdHlsZSh0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgLy8gU2F2ZSB3aWR0aC9oZWlnaHQgc28gdGhhdCB3ZSBjYW4gY2hlY2sgdGhlbSBpbiBjb21wb25lbnREaWRVcGRhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodFxuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIC8vIG1hcC5yZXNpemUoKSByZWFkcyBzaXplIGZyb20gRE9NLCB3ZSBuZWVkIHRvIGNhbGwgYWZ0ZXIgcmVuZGVyXG4gICAgdGhpcy5fdXBkYXRlTWFwU2l6ZSh0aGlzLnN0YXRlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBFeHRlcm5hbCBhcHBzIGNhbiBhY2Nlc3MgbWFwIHRoaXMgd2F5XG4gIF9nZXRNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBhIGN1cnNvciBzdHlsZVxuICBfZ2V0Q3Vyc29yKCkge1xuICAgIGNvbnN0IGlzSW50ZXJhY3RpdmUgPVxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0IHx8XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2tGZWF0dXJlIHx8XG4gICAgICB0aGlzLnByb3BzLm9uSG92ZXJGZWF0dXJlcztcbiAgICBpZiAoaXNJbnRlcmFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXNEcmFnZ2luZyA/XG4gICAgICAgIGNvbmZpZy5DVVJTT1IuR1JBQkJJTkcgOlxuICAgICAgICAodGhpcy5zdGF0ZS5pc0hvdmVyaW5nID8gY29uZmlnLkNVUlNPUi5QT0lOVEVSIDogY29uZmlnLkNVUlNPUi5HUkFCKTtcbiAgICB9XG4gICAgcmV0dXJuICdpbmhlcml0JztcbiAgfVxuXG4gIF91cGRhdGVTdGF0ZUZyb21Qcm9wcyhvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBtYXBib3hnbC5hY2Nlc3NUb2tlbiA9IG5ld1Byb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhcnREcmFnTG5nTGF0OiBuZXdQcm9wcy5zdGFydERyYWdMbmdMYXRcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEhvdmVyIGFuZCBjbGljayBvbmx5IHF1ZXJ5IGxheWVycyB3aG9zZSBpbnRlcmFjdGl2ZSBwcm9wZXJ0eSBpcyB0cnVlXG4gIC8vIElmIG5vIGludGVyYWN0aXZpdHkgaXMgc3BlY2lmaWVkLCBxdWVyeSBhbGwgbGF5ZXJzXG4gIF91cGRhdGVRdWVyeVBhcmFtcyhtYXBTdHlsZSkge1xuICAgIGNvbnN0IGludGVyYWN0aXZlTGF5ZXJJZHMgPSBnZXRJbnRlcmFjdGl2ZUxheWVySWRzKG1hcFN0eWxlKTtcbiAgICB0aGlzLl9xdWVyeVBhcmFtcyA9IGludGVyYWN0aXZlTGF5ZXJJZHMubGVuZ3RoID09PSAwID8ge30gOlxuICAgICAge2xheWVyczogaW50ZXJhY3RpdmVMYXllcklkc307XG4gIH1cblxuICAvLyBVcGRhdGUgYSBzb3VyY2UgaW4gdGhlIG1hcCBzdHlsZVxuICBfdXBkYXRlU291cmNlKG1hcCwgdXBkYXRlKSB7XG4gICAgY29uc3QgbmV3U291cmNlID0gdXBkYXRlLnNvdXJjZS50b0pTKCk7XG4gICAgaWYgKG5ld1NvdXJjZS50eXBlID09PSAnZ2VvanNvbicpIHtcbiAgICAgIGNvbnN0IG9sZFNvdXJjZSA9IG1hcC5nZXRTb3VyY2UodXBkYXRlLmlkKTtcbiAgICAgIGlmIChvbGRTb3VyY2UudHlwZSA9PT0gJ2dlb2pzb24nKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBkYXRhIGlmIG5vIG90aGVyIEdlb0pTT05Tb3VyY2Ugb3B0aW9ucyB3ZXJlIGNoYW5nZWRcbiAgICAgICAgY29uc3Qgb2xkT3B0cyA9IG9sZFNvdXJjZS53b3JrZXJPcHRpb25zO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKG5ld1NvdXJjZS5tYXh6b29tID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5tYXh6b29tID09PSBvbGRPcHRzLmdlb2pzb25WdE9wdGlvbnMubWF4Wm9vbSkgJiZcbiAgICAgICAgICAobmV3U291cmNlLmJ1ZmZlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBuZXdTb3VyY2UuYnVmZmVyID09PSBvbGRPcHRzLmdlb2pzb25WdE9wdGlvbnMuYnVmZmVyKSAmJlxuICAgICAgICAgIChuZXdTb3VyY2UudG9sZXJhbmNlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS50b2xlcmFuY2UgPT09IG9sZE9wdHMuZ2VvanNvblZ0T3B0aW9ucy50b2xlcmFuY2UpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS5jbHVzdGVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5jbHVzdGVyID09PSBvbGRPcHRzLmNsdXN0ZXIpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS5jbHVzdGVyUmFkaXVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5jbHVzdGVyUmFkaXVzID09PSBvbGRPcHRzLnN1cGVyY2x1c3Rlck9wdGlvbnMucmFkaXVzKSAmJlxuICAgICAgICAgIChuZXdTb3VyY2UuY2x1c3Rlck1heFpvb20gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLmNsdXN0ZXJNYXhab29tID09PSBvbGRPcHRzLnN1cGVyY2x1c3Rlck9wdGlvbnMubWF4Wm9vbSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgb2xkU291cmNlLnNldERhdGEobmV3U291cmNlLmRhdGEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1hcC5yZW1vdmVTb3VyY2UodXBkYXRlLmlkKTtcbiAgICBtYXAuYWRkU291cmNlKHVwZGF0ZS5pZCwgbmV3U291cmNlKTtcbiAgfVxuXG4gIC8vIEluZGl2aWR1YWxseSB1cGRhdGUgdGhlIG1hcHMgc291cmNlIGFuZCBsYXllcnMgdGhhdCBoYXZlIGNoYW5nZWQgaWYgYWxsXG4gIC8vIG90aGVyIHN0eWxlIHByb3BzIGhhdmVuJ3QgY2hhbmdlZC4gVGhpcyBwcmV2ZW50cyBmbGlja2luZyBvZiB0aGUgbWFwIHdoZW5cbiAgLy8gc3R5bGVzIG9ubHkgY2hhbmdlIHNvdXJjZXMgb3IgbGF5ZXJzLlxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cywgY29tcGxleGl0eSAqL1xuICBfc2V0RGlmZlN0eWxlKHByZXZTdHlsZSwgbmV4dFN0eWxlKSB7XG4gICAgY29uc3QgcHJldktleXNNYXAgPSBwcmV2U3R5bGUgJiYgc3R5bGVLZXlzTWFwKHByZXZTdHlsZSkgfHwge307XG4gICAgY29uc3QgbmV4dEtleXNNYXAgPSBzdHlsZUtleXNNYXAobmV4dFN0eWxlKTtcbiAgICBmdW5jdGlvbiBzdHlsZUtleXNNYXAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZS5tYXAoKCkgPT4gdHJ1ZSkuZGVsZXRlKCdsYXllcnMnKS5kZWxldGUoJ3NvdXJjZXMnKS50b0pTKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BzT3RoZXJUaGFuTGF5ZXJzT3JTb3VyY2VzRGlmZmVyKCkge1xuICAgICAgY29uc3QgcHJldktleXNMaXN0ID0gT2JqZWN0LmtleXMocHJldktleXNNYXApO1xuICAgICAgY29uc3QgbmV4dEtleXNMaXN0ID0gT2JqZWN0LmtleXMobmV4dEtleXNNYXApO1xuICAgICAgaWYgKHByZXZLZXlzTGlzdC5sZW5ndGggIT09IG5leHRLZXlzTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvLyBgbmV4dFN0eWxlYCBhbmQgYHByZXZTdHlsZWAgc2hvdWxkIG5vdCBoYXZlIHRoZSBzYW1lIHNldCBvZiBwcm9wcy5cbiAgICAgIGlmIChuZXh0S2V5c0xpc3Quc29tZShcbiAgICAgICAga2V5ID0+IHByZXZTdHlsZS5nZXQoa2V5KSAhPT0gbmV4dFN0eWxlLmdldChrZXkpXG4gICAgICAgIC8vIEJ1dCB0aGUgdmFsdWUgb2Ygb25lIG9mIHRob3NlIHByb3BzIGlzIGRpZmZlcmVudC5cbiAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbWFwID0gdGhpcy5fbWFwO1xuXG4gICAgaWYgKCFwcmV2U3R5bGUgfHwgcHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIoKSkge1xuICAgICAgbWFwLnNldFN0eWxlKG5leHRTdHlsZS50b0pTKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtzb3VyY2VzRGlmZiwgbGF5ZXJzRGlmZn0gPSBkaWZmU3R5bGVzKHByZXZTdHlsZSwgbmV4dFN0eWxlKTtcblxuICAgIC8vIFRPRE86IEl0J3MgcmF0aGVyIGRpZmZpY3VsdCB0byBkZXRlcm1pbmUgc3R5bGUgZGlmZmluZyBpbiB0aGUgcHJlc2VuY2VcbiAgICAvLyBvZiByZWZzLiBGb3Igbm93LCBpZiBhbnkgc3R5bGUgdXBkYXRlIGhhcyBhIHJlZiwgZmFsbGJhY2sgdG8gbm8gZGlmZmluZy5cbiAgICAvLyBXZSBjYW4gY29tZSBiYWNrIHRvIHRoaXMgY2FzZSBpZiB0aGVyZSdzIGEgc29saWQgdXNlY2FzZS5cbiAgICBpZiAobGF5ZXJzRGlmZi51cGRhdGVzLnNvbWUobm9kZSA9PiBub2RlLmxheWVyLmdldCgncmVmJykpKSB7XG4gICAgICBtYXAuc2V0U3R5bGUobmV4dFN0eWxlLnRvSlMoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBlbnRlciBvZiBzb3VyY2VzRGlmZi5lbnRlcikge1xuICAgICAgbWFwLmFkZFNvdXJjZShlbnRlci5pZCwgZW50ZXIuc291cmNlLnRvSlMoKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgdXBkYXRlIG9mIHNvdXJjZXNEaWZmLnVwZGF0ZSkge1xuICAgICAgdGhpcy5fdXBkYXRlU291cmNlKG1hcCwgdXBkYXRlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBleGl0IG9mIHNvdXJjZXNEaWZmLmV4aXQpIHtcbiAgICAgIG1hcC5yZW1vdmVTb3VyY2UoZXhpdC5pZCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZXhpdCBvZiBsYXllcnNEaWZmLmV4aXRpbmcpIHtcbiAgICAgIGlmIChtYXAuc3R5bGUuZ2V0TGF5ZXIoZXhpdC5pZCkpIHtcbiAgICAgICAgbWFwLnJlbW92ZUxheWVyKGV4aXQuaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHVwZGF0ZSBvZiBsYXllcnNEaWZmLnVwZGF0ZXMpIHtcbiAgICAgIGlmICghdXBkYXRlLmVudGVyKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYW4gb2xkIGxheWVyIHRoYXQgbmVlZHMgdG8gYmUgdXBkYXRlZC4gUmVtb3ZlIHRoZSBvbGQgbGF5ZXJcbiAgICAgICAgLy8gd2l0aCB0aGUgc2FtZSBpZCBhbmQgYWRkIGl0IGJhY2sgYWdhaW4uXG4gICAgICAgIG1hcC5yZW1vdmVMYXllcih1cGRhdGUuaWQpO1xuICAgICAgfVxuICAgICAgbWFwLmFkZExheWVyKHVwZGF0ZS5sYXllci50b0pTKCksIHVwZGF0ZS5iZWZvcmUpO1xuICAgIH1cbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzLCBjb21wbGV4aXR5ICovXG5cbiAgX3VwZGF0ZU1hcFN0eWxlKG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIGNvbnN0IG1hcFN0eWxlID0gbmV3UHJvcHMubWFwU3R5bGU7XG4gICAgY29uc3Qgb2xkTWFwU3R5bGUgPSBvbGRQcm9wcy5tYXBTdHlsZTtcbiAgICBpZiAobWFwU3R5bGUgIT09IG9sZE1hcFN0eWxlKSB7XG4gICAgICBpZiAoSW1tdXRhYmxlLk1hcC5pc01hcChtYXBTdHlsZSkpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucHJldmVudFN0eWxlRGlmZmluZykge1xuICAgICAgICAgIHRoaXMuX21hcC5zZXRTdHlsZShtYXBTdHlsZS50b0pTKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3NldERpZmZTdHlsZShvbGRNYXBTdHlsZSwgbWFwU3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tYXAuc2V0U3R5bGUobWFwU3R5bGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fdXBkYXRlUXVlcnlQYXJhbXMobWFwU3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVNYXBWaWV3cG9ydChvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBjb25zdCB2aWV3cG9ydENoYW5nZWQgPVxuICAgICAgbmV3UHJvcHMubGF0aXR1ZGUgIT09IG9sZFByb3BzLmxhdGl0dWRlIHx8XG4gICAgICBuZXdQcm9wcy5sb25naXR1ZGUgIT09IG9sZFByb3BzLmxvbmdpdHVkZSB8fFxuICAgICAgbmV3UHJvcHMuem9vbSAhPT0gb2xkUHJvcHMuem9vbSB8fFxuICAgICAgbmV3UHJvcHMucGl0Y2ggIT09IG9sZFByb3BzLnBpdGNoIHx8XG4gICAgICBuZXdQcm9wcy56b29tICE9PSBvbGRQcm9wcy5iZWFyaW5nIHx8XG4gICAgICBuZXdQcm9wcy5hbHRpdHVkZSAhPT0gb2xkUHJvcHMuYWx0aXR1ZGU7XG5cbiAgICBpZiAodmlld3BvcnRDaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9tYXAuanVtcFRvKHtcbiAgICAgICAgY2VudGVyOiBbbmV3UHJvcHMubG9uZ2l0dWRlLCBuZXdQcm9wcy5sYXRpdHVkZV0sXG4gICAgICAgIHpvb206IG5ld1Byb3BzLnpvb20sXG4gICAgICAgIGJlYXJpbmc6IG5ld1Byb3BzLmJlYXJpbmcsXG4gICAgICAgIHBpdGNoOiBuZXdQcm9wcy5waXRjaFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFRPRE8gLSBqdW1wVG8gZG9lc24ndCBoYW5kbGUgYWx0aXR1ZGVcbiAgICAgIGlmIChuZXdQcm9wcy5hbHRpdHVkZSAhPT0gb2xkUHJvcHMuYWx0aXR1ZGUpIHtcbiAgICAgICAgdGhpcy5fbWFwLnRyYW5zZm9ybS5hbHRpdHVkZSA9IG5ld1Byb3BzLmFsdGl0dWRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE5vdGU6IG5lZWRzIHRvIGJlIGNhbGxlZCBhZnRlciByZW5kZXIgKGUuZy4gaW4gY29tcG9uZW50RGlkVXBkYXRlKVxuICBfdXBkYXRlTWFwU2l6ZShvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBjb25zdCBzaXplQ2hhbmdlZCA9XG4gICAgICBvbGRQcm9wcy53aWR0aCAhPT0gbmV3UHJvcHMud2lkdGggfHwgb2xkUHJvcHMuaGVpZ2h0ICE9PSBuZXdQcm9wcy5oZWlnaHQ7XG5cbiAgICAvLyBpZiAoc2l6ZUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX21hcC5yZXNpemUoKTtcbiAgICAgIC8vIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRoaXMuX21hcC50cmFuc2Zvcm0pO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZXMgYSBuZXcgcGl0Y2ggYW5kIGJlYXJpbmcgZnJvbSBhIHBvc2l0aW9uIChjb21pbmcgZnJvbSBhbiBldmVudClcbiAgX2NhbGN1bGF0ZU5ld1BpdGNoQW5kQmVhcmluZyh7cG9zLCBzdGFydFBvcywgc3RhcnRCZWFyaW5nLCBzdGFydFBpdGNofSkge1xuICAgIGNvbnN0IHhEZWx0YSA9IHBvc1swXSAtIHN0YXJ0UG9zWzBdO1xuICAgIGNvbnN0IGJlYXJpbmcgPSBzdGFydEJlYXJpbmcgKyAxODAgKiB4RGVsdGEgLyB0aGlzLnByb3BzLndpZHRoO1xuXG4gICAgbGV0IHBpdGNoID0gc3RhcnRQaXRjaDtcbiAgICBjb25zdCB5RGVsdGEgPSBwb3NbMV0gLSBzdGFydFBvc1sxXTtcbiAgICBpZiAoeURlbHRhID4gMCkge1xuICAgICAgLy8gRHJhZ2dpbmcgZG93bndhcmRzLCBncmFkdWFsbHkgZGVjcmVhc2UgcGl0Y2hcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLnByb3BzLmhlaWdodCAtIHN0YXJ0UG9zWzFdKSA+IFBJVENIX01PVVNFX1RIUkVTSE9MRCkge1xuICAgICAgICBjb25zdCBzY2FsZSA9IHlEZWx0YSAvICh0aGlzLnByb3BzLmhlaWdodCAtIHN0YXJ0UG9zWzFdKTtcbiAgICAgICAgcGl0Y2ggPSAoMSAtIHNjYWxlKSAqIFBJVENIX0FDQ0VMICogc3RhcnRQaXRjaDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHlEZWx0YSA8IDApIHtcbiAgICAgIC8vIERyYWdnaW5nIHVwd2FyZHMsIGdyYWR1YWxseSBpbmNyZWFzZSBwaXRjaFxuICAgICAgaWYgKHN0YXJ0UG9zWzFdID4gUElUQ0hfTU9VU0VfVEhSRVNIT0xEKSB7XG4gICAgICAgIC8vIE1vdmUgZnJvbSAwIHRvIDEgYXMgd2UgZHJhZyB1cHdhcmRzXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IDEgLSBwb3NbMV0gLyBzdGFydFBvc1sxXTtcbiAgICAgICAgLy8gR3JhZHVhbGx5IGFkZCB1bnRpbCB3ZSBoaXQgbWF4IHBpdGNoXG4gICAgICAgIHBpdGNoID0gc3RhcnRQaXRjaCArIHlTY2FsZSAqIChNQVhfUElUQ0ggLSBzdGFydFBpdGNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmRlYnVnKHN0YXJ0UGl0Y2gsIHBpdGNoKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGl0Y2g6IE1hdGgubWF4KE1hdGgubWluKHBpdGNoLCBNQVhfUElUQ0gpLCAwKSxcbiAgICAgIGJlYXJpbmdcbiAgICB9O1xuICB9XG5cbiAgIC8vIEhlbHBlciB0byBjYWxsIHByb3BzLm9uQ2hhbmdlVmlld3BvcnRcbiAgX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KHtcbiAgICAgICAgbGF0aXR1ZGU6IHRyYW5zZm9ybS5jZW50ZXIubGF0LFxuICAgICAgICBsb25naXR1ZGU6IG1vZCh0cmFuc2Zvcm0uY2VudGVyLmxuZyArIDE4MCwgMzYwKSAtIDE4MCxcbiAgICAgICAgem9vbTogdHJhbnNmb3JtLnpvb20sXG4gICAgICAgIHBpdGNoOiB0cmFuc2Zvcm0ucGl0Y2gsXG4gICAgICAgIGJlYXJpbmc6IG1vZCh0cmFuc2Zvcm0uYmVhcmluZyArIDE4MCwgMzYwKSAtIDE4MCxcblxuICAgICAgICBpc0RyYWdnaW5nOiB0aGlzLnByb3BzLmlzRHJhZ2dpbmcsXG4gICAgICAgIHN0YXJ0RHJhZ0xuZ0xhdDogdGhpcy5wcm9wcy5zdGFydERyYWdMbmdMYXQsXG4gICAgICAgIHN0YXJ0QmVhcmluZzogdGhpcy5wcm9wcy5zdGFydEJlYXJpbmcsXG4gICAgICAgIHN0YXJ0UGl0Y2g6IHRoaXMucHJvcHMuc3RhcnRQaXRjaCxcblxuICAgICAgICAuLi5vcHRzXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmQgX29uVG91Y2hTdGFydChvcHRzKSB7XG4gICAgdGhpcy5fb25Nb3VzZURvd24ob3B0cyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uVG91Y2hEcmFnKG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlRHJhZyhvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaFJvdGF0ZShvcHRzKSB7XG4gICAgdGhpcy5fb25Nb3VzZVJvdGF0ZShvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaEVuZChvcHRzKSB7XG4gICAgdGhpcy5fb25Nb3VzZVVwKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoVGFwKG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlQ2xpY2sob3B0cyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VEb3duKHtwb3N9KSB7XG4gICAgY29uc3Qge3RyYW5zZm9ybX0gPSB0aGlzLl9tYXA7XG4gICAgY29uc3Qge2xuZywgbGF0fSA9IHVucHJvamVjdEZyb21UcmFuc2Zvcm0odHJhbnNmb3JtLCBuZXcgUG9pbnQoLi4ucG9zKSk7XG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCB7XG4gICAgICBpc0RyYWdnaW5nOiB0cnVlLFxuICAgICAgc3RhcnREcmFnTG5nTGF0OiBbbG5nLCBsYXRdLFxuICAgICAgc3RhcnRCZWFyaW5nOiB0cmFuc2Zvcm0uYmVhcmluZyxcbiAgICAgIHN0YXJ0UGl0Y2g6IHRyYW5zZm9ybS5waXRjaFxuICAgIH0pO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbk1vdXNlRHJhZyh7cG9zfSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGFrZSB0aGUgc3RhcnQgbG5nbGF0IGFuZCBwdXQgaXQgd2hlcmUgdGhlIG1vdXNlIGlzIGRvd24uXG4gICAgYXNzZXJ0KHRoaXMucHJvcHMuc3RhcnREcmFnTG5nTGF0LCAnYHN0YXJ0RHJhZ0xuZ0xhdGAgcHJvcCBpcyByZXF1aXJlZCAnICtcbiAgICAgICdmb3IgbW91c2UgZHJhZyBiZWhhdmlvciB0byBjYWxjdWxhdGUgd2hlcmUgdG8gcG9zaXRpb24gdGhlIG1hcC4nKTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNsb25lVHJhbnNmb3JtKHRoaXMuX21hcC50cmFuc2Zvcm0pO1xuICAgIGNvbnN0IFtsbmcsIGxhdF0gPSB0aGlzLnByb3BzLnN0YXJ0RHJhZ0xuZ0xhdDtcbiAgICB0cmFuc2Zvcm0uc2V0TG9jYXRpb25BdFBvaW50KHtsbmcsIGxhdH0sIG5ldyBQb2ludCguLi5wb3MpKTtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0cmFuc2Zvcm0sIHtpc0RyYWdnaW5nOiB0cnVlfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VSb3RhdGUoe3Bvcywgc3RhcnRQb3N9KSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQgfHwgIXRoaXMucHJvcHMucGVyc3BlY3RpdmVFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge3N0YXJ0QmVhcmluZywgc3RhcnRQaXRjaH0gPSB0aGlzLnByb3BzO1xuICAgIGFzc2VydCh0eXBlb2Ygc3RhcnRCZWFyaW5nID09PSAnbnVtYmVyJyxcbiAgICAgICdgc3RhcnRCZWFyaW5nYCBwcm9wIGlzIHJlcXVpcmVkIGZvciBtb3VzZSByb3RhdGUgYmVoYXZpb3InKTtcbiAgICBhc3NlcnQodHlwZW9mIHN0YXJ0UGl0Y2ggPT09ICdudW1iZXInLFxuICAgICAgJ2BzdGFydFBpdGNoYCBwcm9wIGlzIHJlcXVpcmVkIGZvciBtb3VzZSByb3RhdGUgYmVoYXZpb3InKTtcblxuICAgIGNvbnN0IHtwaXRjaCwgYmVhcmluZ30gPSB0aGlzLl9jYWxjdWxhdGVOZXdQaXRjaEFuZEJlYXJpbmcoe1xuICAgICAgcG9zLFxuICAgICAgc3RhcnRQb3MsXG4gICAgICBzdGFydEJlYXJpbmcsXG4gICAgICBzdGFydFBpdGNoXG4gICAgfSk7XG5cbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBjbG9uZVRyYW5zZm9ybSh0aGlzLl9tYXAudHJhbnNmb3JtKTtcbiAgICB0cmFuc2Zvcm0uYmVhcmluZyA9IGJlYXJpbmc7XG4gICAgdHJhbnNmb3JtLnBpdGNoID0gcGl0Y2g7XG5cbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0cmFuc2Zvcm0sIHtpc0RyYWdnaW5nOiB0cnVlfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VNb3ZlKHtwb3N9KSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uSG92ZXJGZWF0dXJlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMuX21hcC5xdWVyeVJlbmRlcmVkRmVhdHVyZXMobmV3IFBvaW50KC4uLnBvcyksIHRoaXMuX3F1ZXJ5UGFyYW1zKTtcbiAgICBpZiAoIWZlYXR1cmVzLmxlbmd0aCAmJiB0aGlzLnByb3BzLmlnbm9yZUVtcHR5RmVhdHVyZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNIb3ZlcmluZzogZmVhdHVyZXMubGVuZ3RoID4gMH0pO1xuICAgIHRoaXMucHJvcHMub25Ib3ZlckZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZVVwKG9wdCkge1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRoaXMuX21hcC50cmFuc2Zvcm0sIHtcbiAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgc3RhcnREcmFnTG5nTGF0OiBudWxsLFxuICAgICAgc3RhcnRCZWFyaW5nOiBudWxsLFxuICAgICAgc3RhcnRQaXRjaDogbnVsbFxuICAgIH0pO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbk1vdXNlQ2xpY2soe3Bvc30pIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25DbGlja0ZlYXR1cmVzICYmICF0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICBjb25zdCBwb2ludCA9IG5ldyBQb2ludCguLi5wb3MpO1xuICAgICAgY29uc3QgbGF0TG9uZyA9IHRoaXMuX21hcC51bnByb2plY3QocG9pbnQpO1xuICAgICAgLy8gVE9ETyAtIERvIHdlIHJlYWxseSB3YW50IHRvIGV4cG9zZSBhIG1hcGJveCBcIlBvaW50XCIgaW4gb3VyIGludGVyZmFjZT9cbiAgICAgIHRoaXMucHJvcHMub25DbGljayhsYXRMb25nLCBwb2ludCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25DbGlja0ZlYXR1cmVzKSB7XG4gICAgICAvLyBSYWRpdXMgZW5hYmxlcyBwb2ludCBmZWF0dXJlcywgbGlrZSBtYXJrZXIgc3ltYm9scywgdG8gYmUgY2xpY2tlZC5cbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnByb3BzLmNsaWNrUmFkaXVzO1xuICAgICAgY29uc3QgYmJveCA9IFtbcG9zWzBdIC0gc2l6ZSwgcG9zWzFdIC0gc2l6ZV0sIFtwb3NbMF0gKyBzaXplLCBwb3NbMV0gKyBzaXplXV07XG4gICAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMuX21hcC5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoYmJveCwgdGhpcy5fcXVlcnlQYXJhbXMpO1xuICAgICAgaWYgKCFmZWF0dXJlcy5sZW5ndGggJiYgdGhpcy5wcm9wcy5pZ25vcmVFbXB0eUZlYXR1cmVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMub25DbGlja0ZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmQgX29uWm9vbSh7cG9zLCBzY2FsZX0pIHtcbiAgICBjb25zdCBwb2ludCA9IG5ldyBQb2ludCguLi5wb3MpO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNsb25lVHJhbnNmb3JtKHRoaXMuX21hcC50cmFuc2Zvcm0pO1xuICAgIGNvbnN0IGFyb3VuZCA9IHVucHJvamVjdEZyb21UcmFuc2Zvcm0odHJhbnNmb3JtLCBwb2ludCk7XG4gICAgdHJhbnNmb3JtLnpvb20gPSB0cmFuc2Zvcm0uc2NhbGVab29tKHRoaXMuX21hcC50cmFuc2Zvcm0uc2NhbGUgKiBzY2FsZSk7XG4gICAgdHJhbnNmb3JtLnNldExvY2F0aW9uQXRQb2ludChhcm91bmQsIHBvaW50KTtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0cmFuc2Zvcm0sIHtpc0RyYWdnaW5nOiB0cnVlfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uWm9vbUVuZCgpIHtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0aGlzLl9tYXAudHJhbnNmb3JtLCB7aXNEcmFnZ2luZzogZmFsc2V9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y2xhc3NOYW1lLCB3aWR0aCwgaGVpZ2h0LCBzdHlsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1hcFN0eWxlID0ge1xuICAgICAgLi4uc3R5bGUsXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGN1cnNvcjogdGhpcy5fZ2V0Q3Vyc29yKClcbiAgICB9O1xuXG4gICAgbGV0IGNvbnRlbnQgPSBbXG4gICAgICA8ZGl2IGtleT1cIm1hcFwiIHJlZj1cIm1hcGJveE1hcFwiXG4gICAgICAgIHN0eWxlPXsgbWFwU3R5bGUgfSBjbGFzc05hbWU9eyBjbGFzc05hbWUgfS8+LFxuICAgICAgPGRpdiBrZXk9XCJvdmVybGF5c1wiIGNsYXNzTmFtZT1cIm92ZXJsYXlzXCJcbiAgICAgICAgc3R5bGU9eyB7cG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMH0gfT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvZGl2PlxuICAgIF07XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pc1N1cHBvcnRlZCAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQpIHtcbiAgICAgIGNvbnRlbnQgPSAoXG4gICAgICAgIDxNYXBJbnRlcmFjdGlvbnNcbiAgICAgICAgICBvbk1vdXNlRG93biA9eyB0aGlzLl9vbk1vdXNlRG93biB9XG4gICAgICAgICAgb25Nb3VzZURyYWcgPXsgdGhpcy5fb25Nb3VzZURyYWcgfVxuICAgICAgICAgIG9uTW91c2VSb3RhdGUgPXsgdGhpcy5fb25Nb3VzZVJvdGF0ZSB9XG4gICAgICAgICAgb25Nb3VzZVVwID17IHRoaXMuX29uTW91c2VVcCB9XG4gICAgICAgICAgb25Nb3VzZU1vdmUgPXsgdGhpcy5fb25Nb3VzZU1vdmUgfVxuICAgICAgICAgIG9uTW91c2VDbGljayA9IHsgdGhpcy5fb25Nb3VzZUNsaWNrIH1cbiAgICAgICAgICBvblRvdWNoU3RhcnQgPXsgdGhpcy5fb25Ub3VjaFN0YXJ0IH1cbiAgICAgICAgICBvblRvdWNoRHJhZyA9eyB0aGlzLl9vblRvdWNoRHJhZyB9XG4gICAgICAgICAgb25Ub3VjaFJvdGF0ZSA9eyB0aGlzLl9vblRvdWNoUm90YXRlIH1cbiAgICAgICAgICBvblRvdWNoRW5kID17IHRoaXMuX29uVG91Y2hFbmQgfVxuICAgICAgICAgIG9uVG91Y2hUYXAgPSB7IHRoaXMuX29uVG91Y2hUYXAgfVxuICAgICAgICAgIG9uWm9vbSA9eyB0aGlzLl9vblpvb20gfVxuICAgICAgICAgIG9uWm9vbUVuZCA9eyB0aGlzLl9vblpvb21FbmQgfVxuICAgICAgICAgIHdpZHRoID17IHRoaXMucHJvcHMud2lkdGggfVxuICAgICAgICAgIGhlaWdodCA9eyB0aGlzLnByb3BzLmhlaWdodCB9PlxuXG4gICAgICAgICAgeyBjb250ZW50IH1cblxuICAgICAgICA8L01hcEludGVyYWN0aW9ucz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgIH0gfT5cblxuICAgICAgICB7IGNvbnRlbnQgfVxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=