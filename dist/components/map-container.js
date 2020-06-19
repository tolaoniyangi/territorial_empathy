"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MapContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _react2 = _interopRequireDefault(require("@deck.gl/react"));

var _reselect = require("reselect");

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _mapPopover = _interopRequireDefault(require("./map/map-popover"));

var _mapControl = _interopRequireDefault(require("./map/map-control"));

var _styledComponents = require("./common/styled-components");

var _editor = _interopRequireDefault(require("./editor/editor"));

var _mapboxUtils = require("../layers/mapbox-utils");

var _baseLayer = require("../layers/base-layer");

var _glUtils = require("../utils/gl-utils");

var _mapboxUtils2 = require("../utils/map-style-utils/mapbox-utils");

var _dBuildingLayer = _interopRequireDefault(require("../deckgl-layers/3d-building-layer/3d-building-layer"));

var _defaultSettings = require("../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative'
  },
  top: {
    position: 'absolute',
    top: '0px',
    pointerEvents: 'none'
  }
};
var MAPBOXGL_STYLE_UPDATE = 'style.load';
var MAPBOXGL_RENDER = 'render';
var TRANSITION_DURATION = 0;
MapContainerFactory.deps = [_mapPopover["default"], _mapControl["default"], _editor["default"]];

function MapContainerFactory(MapPopover, MapControl, Editor) {
  var MapContainer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(MapContainer, _Component);

    function MapContainer(_props) {
      var _this;

      (0, _classCallCheck2["default"])(this, MapContainer);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MapContainer).call(this, _props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersSelector", function (props) {
        return props.layers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerDataSelector", function (props) {
        return props.layerData;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapLayersSelector", function (props) {
        return props.mapLayers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerOrderSelector", function (props) {
        return props.layerOrder;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersToRenderSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _this.mapLayersSelector, // {[id]: true \ false}
      function (layers, layerData, mapLayers) {
        return layers.reduce(function (accu, layer, idx) {
          return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, layer.id, layer.shouldRenderLayer(layerData[idx]) && _this._isVisibleMapLayer(layer, mapLayers)));
        }, {});
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filtersSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "polygonFilters", (0, _reselect.createSelector)(_this.filtersSelector, function (filters) {
        return filters.filter(function (f) {
          return f.type === _defaultSettings.FILTER_TYPES.polygon;
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapboxLayersSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _this.layerOrderSelector, _this.layersToRenderSelector, _mapboxUtils.generateMapboxLayers));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCloseMapPopover", function () {
        _this.props.visStateActions.onLayerClick(null);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLayerSetDomain", function (idx, colorDomain) {
        _this.props.visStateActions.layerConfigChange(_this.props.layers[idx], {
          colorDomain: colorDomain
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleMapToggleLayer", function (layerId) {
        var _this$props = _this.props,
            _this$props$index = _this$props.index,
            mapIndex = _this$props$index === void 0 ? 0 : _this$props$index,
            visStateActions = _this$props.visStateActions;
        visStateActions.toggleLayerForMap(mapIndex, layerId);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapboxStyleUpdate", function () {
        // force refresh mapboxgl layers
        _this.previousLayers = {};

        _this._updateMapboxLayers();

        if (typeof _this.props.onMapStyleLoaded === 'function') {
          _this.props.onMapStyleLoaded(_this._map);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setMapboxMap", function (mapbox) {
        if (!_this._map && mapbox) {
          _this._map = mapbox.getMap(); // i noticed in certain context we don't access the actual map element

          if (!_this._map) {
            return;
          } // bind mapboxgl event listener


          _this._map.on(MAPBOXGL_STYLE_UPDATE, _this._onMapboxStyleUpdate);

          _this._map.on(MAPBOXGL_RENDER, function () {
            if (typeof _this.props.onMapRender === 'function') {
              _this.props.onMapRender(_this._map);
            }
          });
        }

        if (_this.props.getMapboxRef) {
          // The parent component can gain access to our MapboxGlMap by
          // providing this callback. Note that 'mapbox' will be null when the
          // ref is unset (e.g. when a split map is closed).
          _this.props.getMapboxRef(mapbox, _this.props.index);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBeforeRender", function (_ref) {
        var gl = _ref.gl;
        (0, _glUtils.setLayerBlending)(gl, _this.props.layerBlending);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderLayer", function (overlays, idx) {
        var _this$props2 = _this.props,
            datasets = _this$props2.datasets,
            layers = _this$props2.layers,
            layerData = _this$props2.layerData,
            hoverInfo = _this$props2.hoverInfo,
            clicked = _this$props2.clicked,
            mapState = _this$props2.mapState,
            interactionConfig = _this$props2.interactionConfig,
            animationConfig = _this$props2.animationConfig;
        var layer = layers[idx];
        var data = layerData[idx];

        var _ref2 = datasets[layer.config.dataId] || {},
            gpuFilter = _ref2.gpuFilter;

        var objectHovered = clicked || hoverInfo;
        var layerCallbacks = {
          onSetLayerDomain: function onSetLayerDomain(val) {
            return _this._onLayerSetDomain(idx, val);
          }
        }; // Layer is Layer class

        var layerOverlay = layer.renderLayer({
          data: data,
          gpuFilter: gpuFilter,
          idx: idx,
          interactionConfig: interactionConfig,
          layerCallbacks: layerCallbacks,
          mapState: mapState,
          animationConfig: animationConfig,
          objectHovered: objectHovered
        });
        return overlays.concat(layerOverlay || []);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewportChange", function (viewState) {
        if (typeof _this.props.onViewStateChange === 'function') {
          _this.props.onViewStateChange(viewState);
        }

        _this.props.mapStateActions.updateMap(viewState);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleMapControl", function (panelId) {
        var _this$props3 = _this.props,
            index = _this$props3.index,
            uiStateActions = _this$props3.uiStateActions;
        uiStateActions.toggleMapControl(panelId, index);
      });
      _this.previousLayers = {// [layers.id]: mapboxLayerConfig
      };
      _this._deck = null;
      return _this;
    }

    (0, _createClass2["default"])(MapContainer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // unbind mapboxgl event listener
        if (this._map) {
          this._map.off(MAPBOXGL_STYLE_UPDATE);

          this._map.off(MAPBOXGL_RENDER);
        }
      }
    }, {
      key: "_isVisibleMapLayer",

      /* component private functions */
      value: function _isVisibleMapLayer(layer, mapLayers) {
        // if layer.id is not in mapLayers, don't render it
        return !mapLayers || mapLayers && mapLayers[layer.id];
      }
    }, {
      key: "_renderMapPopover",

      /* component render functions */

      /* eslint-disable complexity */
      value: function _renderMapPopover(layersToRender) {
        // TODO: move this into reducer so it can be tested
        var _this$props4 = this.props,
            mapState = _this$props4.mapState,
            hoverInfo = _this$props4.hoverInfo,
            clicked = _this$props4.clicked,
            datasets = _this$props4.datasets,
            interactionConfig = _this$props4.interactionConfig,
            layers = _this$props4.layers,
            _this$props4$mousePos = _this$props4.mousePos,
            mousePosition = _this$props4$mousePos.mousePosition,
            coordinate = _this$props4$mousePos.coordinate,
            pinned = _this$props4$mousePos.pinned;

        if (!mousePosition) {
          return null;
        } // if clicked something, ignore hover behavior


        var objectInfo = clicked || hoverInfo;
        var layerHoverProp = null;
        var position = {
          x: mousePosition[0],
          y: mousePosition[1]
        };

        if (interactionConfig.tooltip.enabled && objectInfo && objectInfo.picked) {
          // if anything hovered
          var object = objectInfo.object,
              overlay = objectInfo.layer; // deckgl layer to kepler-gl layer

          var layer = layers[overlay.props.idx];

          if (layer.getHoverData && layersToRender[layer.id]) {
            // if layer is visible and have hovered data
            var dataId = layer.config.dataId;
            var _datasets$dataId = datasets[dataId],
                allData = _datasets$dataId.allData,
                fields = _datasets$dataId.fields;
            var data = layer.getHoverData(object, allData);
            var fieldsToShow = interactionConfig.tooltip.config.fieldsToShow[dataId];
            layerHoverProp = {
              data: data,
              fields: fields,
              fieldsToShow: fieldsToShow,
              layer: layer
            };
          }
        }

        if (pinned || clicked) {
          // project lnglat to screen so that tooltip follows the object on zoom
          var viewport = new _viewportMercatorProject["default"](mapState);
          var lngLat = clicked ? clicked.lngLat : pinned.coordinate;
          position = this._getHoverXY(viewport, lngLat);
        }

        return _react["default"].createElement("div", null, _react["default"].createElement(MapPopover, (0, _extends2["default"])({}, position, {
          layerHoverProp: layerHoverProp,
          coordinate: interactionConfig.coordinate.enabled && ((pinned || {}).coordinate || coordinate),
          freezed: Boolean(clicked || pinned),
          onClose: this._onCloseMapPopover,
          mapW: mapState.width,
          mapH: mapState.height
        })));
      }
      /* eslint-enable complexity */

    }, {
      key: "_getHoverXY",
      value: function _getHoverXY(viewport, lngLat) {
        var screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat);
        return screenCoord && {
          x: screenCoord[0],
          y: screenCoord[1]
        };
      }
    }, {
      key: "_renderDeckOverlay",
      value: function _renderDeckOverlay(layersToRender) {
        var _this2 = this;

        var _this$props5 = this.props,
            mapState = _this$props5.mapState,
            mapStyle = _this$props5.mapStyle,
            layerData = _this$props5.layerData,
            layerOrder = _this$props5.layerOrder,
            layers = _this$props5.layers,
            visStateActions = _this$props5.visStateActions,
            mapboxApiAccessToken = _this$props5.mapboxApiAccessToken,
            mapboxApiUrl = _this$props5.mapboxApiUrl;
        var deckGlLayers = []; // wait until data is ready before render data layers

        if (layerData && layerData.length) {
          // last layer render first
          deckGlLayers = layerOrder.slice().reverse().filter(function (idx) {
            return layers[idx].overlayType === _baseLayer.OVERLAY_TYPE.deckgl && layersToRender[layers[idx].id];
          }).reduce(this._renderLayer, []);
        }

        if (mapStyle.visibleLayerGroups['3d building']) {
          deckGlLayers.push(new _dBuildingLayer["default"]({
            id: '_keplergl_3d-building',
            mapboxApiAccessToken: mapboxApiAccessToken,
            mapboxApiUrl: mapboxApiUrl,
            threeDBuildingColor: mapStyle.threeDBuildingColor,
            updateTriggers: {
              getFillColor: mapStyle.threeDBuildingColor
            }
          }));
        }

        return _react["default"].createElement(_react2["default"], (0, _extends2["default"])({}, this.props.deckGlProps, {
          viewState: mapState,
          id: "default-deckgl-overlay",
          layers: deckGlLayers,
          onBeforeRender: this._onBeforeRender,
          onHover: visStateActions.onLayerHover,
          onClick: visStateActions.onLayerClick,
          ref: function ref(comp) {
            if (comp && comp.deck && !_this2._deck) {
              _this2._deck = comp.deck;
            }
          }
        }));
      }
    }, {
      key: "_updateMapboxLayers",
      value: function _updateMapboxLayers() {
        var mapboxLayers = this.mapboxLayersSelector(this.props);

        if (!Object.keys(mapboxLayers).length && !Object.keys(this.previousLayers).length) {
          return;
        }

        (0, _mapboxUtils.updateMapboxLayers)(this._map, mapboxLayers, this.previousLayers);
        this.previousLayers = mapboxLayers;
      }
    }, {
      key: "_renderMapboxOverlays",
      value: function _renderMapboxOverlays() {
        if (this._map && this._map.isStyleLoaded()) {
          this._updateMapboxLayers();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props6 = this.props,
            mapState = _this$props6.mapState,
            mapStyle = _this$props6.mapStyle,
            mapStateActions = _this$props6.mapStateActions,
            mapLayers = _this$props6.mapLayers,
            layers = _this$props6.layers,
            MapComponent = _this$props6.MapComponent,
            datasets = _this$props6.datasets,
            mapboxApiAccessToken = _this$props6.mapboxApiAccessToken,
            mapboxApiUrl = _this$props6.mapboxApiUrl,
            mapControls = _this$props6.mapControls,
            uiState = _this$props6.uiState,
            uiStateActions = _this$props6.uiStateActions,
            visStateActions = _this$props6.visStateActions,
            editor = _this$props6.editor,
            index = _this$props6.index;
        var layersToRender = this.layersToRenderSelector(this.props);

        if (!mapStyle.bottomMapStyle) {
          // style not yet loaded
          return _react["default"].createElement("div", null);
        }

        var mapProps = _objectSpread({}, mapState, {
          preserveDrawingBuffer: true,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapboxApiUrl: mapboxApiUrl,
          onViewportChange: this._onViewportChange,
          transformRequest: _mapboxUtils2.transformRequest
        });

        var isEdit = uiState.mapControls.mapDraw.active;
        return _react["default"].createElement(_styledComponents.StyledMapContainer, {
          style: MAP_STYLE.container
        }, _react["default"].createElement(MapControl, {
          datasets: datasets,
          dragRotate: mapState.dragRotate,
          isSplit: Boolean(mapLayers),
          isExport: this.props.isExport,
          layers: layers,
          layersToRender: layersToRender,
          mapIndex: index,
          mapControls: mapControls,
          readOnly: this.props.readOnly,
          scale: mapState.scale || 1,
          top: 0,
          editor: editor,
          locale: uiState.locale,
          onTogglePerspective: mapStateActions.togglePerspective,
          onToggleSplitMap: mapStateActions.toggleSplitMap,
          onMapToggleLayer: this._handleMapToggleLayer,
          onToggleMapControl: this._toggleMapControl,
          onSetEditorMode: visStateActions.setEditorMode,
          onSetLocale: uiStateActions.setLocale,
          onToggleEditorVisibility: visStateActions.toggleEditorVisibility
        }), _react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "bottom",
          ref: this._setMapboxMap,
          mapStyle: mapStyle.bottomMapStyle,
          getCursor: this.props.hoverInfo ? function () {
            return 'pointer';
          } : undefined,
          transitionDuration: TRANSITION_DURATION,
          onMouseMove: this.props.visStateActions.onMouseMove
        }), this._renderDeckOverlay(layersToRender), this._renderMapboxOverlays(layersToRender), _react["default"].createElement(Editor, {
          index: index,
          datasets: datasets,
          editor: editor,
          filters: this.polygonFilters(this.props),
          isEnabled: isEdit,
          layers: layers,
          layersToRender: layersToRender,
          onDeleteFeature: visStateActions.deleteFeature,
          onSelect: visStateActions.setSelectedFeature,
          onUpdate: visStateActions.setFeatures,
          onTogglePolygonFilter: visStateActions.setPolygonFilterLayer,
          style: {
            pointerEvents: isEdit ? 'all' : 'none',
            position: 'absolute',
            display: editor.visible ? 'block' : 'none'
          }
        })), mapStyle.topMapStyle && _react["default"].createElement("div", {
          style: MAP_STYLE.top
        }, _react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "top",
          mapStyle: mapStyle.topMapStyle
        }))), this._renderMapPopover(layersToRender));
      }
    }]);
    return MapContainer;
  }(_react.Component);

  (0, _defineProperty2["default"])(MapContainer, "propTypes", {
    // required
    datasets: _propTypes["default"].object,
    interactionConfig: _propTypes["default"].object.isRequired,
    layerBlending: _propTypes["default"].string.isRequired,
    layerOrder: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layerData: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    mapState: _propTypes["default"].object.isRequired,
    mapControls: _propTypes["default"].object.isRequired,
    uiState: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    mousePos: _propTypes["default"].object.isRequired,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    mapboxApiUrl: _propTypes["default"].string,
    visStateActions: _propTypes["default"].object.isRequired,
    mapStateActions: _propTypes["default"].object.isRequired,
    uiStateActions: _propTypes["default"].object.isRequired,
    // optional
    readOnly: _propTypes["default"].bool,
    isExport: _propTypes["default"].bool,
    clicked: _propTypes["default"].object,
    hoverInfo: _propTypes["default"].object,
    mapLayers: _propTypes["default"].object,
    onMapToggleLayer: _propTypes["default"].func,
    onMapStyleLoaded: _propTypes["default"].func,
    onMapRender: _propTypes["default"].func,
    getMapboxRef: _propTypes["default"].func,
    index: _propTypes["default"].number
  });
  (0, _defineProperty2["default"])(MapContainer, "defaultProps", {
    MapComponent: _reactMapGl["default"],
    deckGlProps: {},
    index: 0
  });
  MapContainer.displayName = 'MapContainer';
  return MapContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC1jb250YWluZXIuanMiXSwibmFtZXMiOlsiTUFQX1NUWUxFIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBvc2l0aW9uIiwidG9wIiwicG9pbnRlckV2ZW50cyIsIk1BUEJPWEdMX1NUWUxFX1VQREFURSIsIk1BUEJPWEdMX1JFTkRFUiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJNYXBDb250YWluZXJGYWN0b3J5IiwiZGVwcyIsIk1hcFBvcG92ZXJGYWN0b3J5IiwiTWFwQ29udHJvbEZhY3RvcnkiLCJFZGl0b3JGYWN0b3J5IiwiTWFwUG9wb3ZlciIsIk1hcENvbnRyb2wiLCJFZGl0b3IiLCJNYXBDb250YWluZXIiLCJwcm9wcyIsImxheWVycyIsImxheWVyRGF0YSIsIm1hcExheWVycyIsImxheWVyT3JkZXIiLCJsYXllcnNTZWxlY3RvciIsImxheWVyRGF0YVNlbGVjdG9yIiwibWFwTGF5ZXJzU2VsZWN0b3IiLCJyZWR1Y2UiLCJhY2N1IiwibGF5ZXIiLCJpZHgiLCJpZCIsInNob3VsZFJlbmRlckxheWVyIiwiX2lzVmlzaWJsZU1hcExheWVyIiwiZmlsdGVycyIsImZpbHRlcnNTZWxlY3RvciIsImZpbHRlciIsImYiLCJ0eXBlIiwiRklMVEVSX1RZUEVTIiwicG9seWdvbiIsImxheWVyT3JkZXJTZWxlY3RvciIsImxheWVyc1RvUmVuZGVyU2VsZWN0b3IiLCJnZW5lcmF0ZU1hcGJveExheWVycyIsInZpc1N0YXRlQWN0aW9ucyIsIm9uTGF5ZXJDbGljayIsImNvbG9yRG9tYWluIiwibGF5ZXJDb25maWdDaGFuZ2UiLCJsYXllcklkIiwiaW5kZXgiLCJtYXBJbmRleCIsInRvZ2dsZUxheWVyRm9yTWFwIiwicHJldmlvdXNMYXllcnMiLCJfdXBkYXRlTWFwYm94TGF5ZXJzIiwib25NYXBTdHlsZUxvYWRlZCIsIl9tYXAiLCJtYXBib3giLCJnZXRNYXAiLCJvbiIsIl9vbk1hcGJveFN0eWxlVXBkYXRlIiwib25NYXBSZW5kZXIiLCJnZXRNYXBib3hSZWYiLCJnbCIsImxheWVyQmxlbmRpbmciLCJvdmVybGF5cyIsImRhdGFzZXRzIiwiaG92ZXJJbmZvIiwiY2xpY2tlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJhbmltYXRpb25Db25maWciLCJkYXRhIiwiY29uZmlnIiwiZGF0YUlkIiwiZ3B1RmlsdGVyIiwib2JqZWN0SG92ZXJlZCIsImxheWVyQ2FsbGJhY2tzIiwib25TZXRMYXllckRvbWFpbiIsInZhbCIsIl9vbkxheWVyU2V0RG9tYWluIiwibGF5ZXJPdmVybGF5IiwicmVuZGVyTGF5ZXIiLCJjb25jYXQiLCJ2aWV3U3RhdGUiLCJvblZpZXdTdGF0ZUNoYW5nZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsInBhbmVsSWQiLCJ1aVN0YXRlQWN0aW9ucyIsInRvZ2dsZU1hcENvbnRyb2wiLCJfZGVjayIsIm9mZiIsImxheWVyc1RvUmVuZGVyIiwibW91c2VQb3MiLCJtb3VzZVBvc2l0aW9uIiwiY29vcmRpbmF0ZSIsInBpbm5lZCIsIm9iamVjdEluZm8iLCJsYXllckhvdmVyUHJvcCIsIngiLCJ5IiwidG9vbHRpcCIsImVuYWJsZWQiLCJwaWNrZWQiLCJvYmplY3QiLCJvdmVybGF5IiwiZ2V0SG92ZXJEYXRhIiwiYWxsRGF0YSIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsInZpZXdwb3J0IiwiV2ViTWVyY2F0b3JWaWV3cG9ydCIsImxuZ0xhdCIsIl9nZXRIb3ZlclhZIiwiQm9vbGVhbiIsIl9vbkNsb3NlTWFwUG9wb3ZlciIsIndpZHRoIiwiaGVpZ2h0Iiwic2NyZWVuQ29vcmQiLCJwcm9qZWN0IiwibWFwU3R5bGUiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm1hcGJveEFwaVVybCIsImRlY2tHbExheWVycyIsImxlbmd0aCIsInNsaWNlIiwicmV2ZXJzZSIsIm92ZXJsYXlUeXBlIiwiT1ZFUkxBWV9UWVBFIiwiZGVja2dsIiwiX3JlbmRlckxheWVyIiwidmlzaWJsZUxheWVyR3JvdXBzIiwicHVzaCIsIlRocmVlREJ1aWxkaW5nTGF5ZXIiLCJ0aHJlZURCdWlsZGluZ0NvbG9yIiwidXBkYXRlVHJpZ2dlcnMiLCJnZXRGaWxsQ29sb3IiLCJkZWNrR2xQcm9wcyIsIl9vbkJlZm9yZVJlbmRlciIsIm9uTGF5ZXJIb3ZlciIsImNvbXAiLCJkZWNrIiwibWFwYm94TGF5ZXJzIiwibWFwYm94TGF5ZXJzU2VsZWN0b3IiLCJPYmplY3QiLCJrZXlzIiwiaXNTdHlsZUxvYWRlZCIsIk1hcENvbXBvbmVudCIsIm1hcENvbnRyb2xzIiwidWlTdGF0ZSIsImVkaXRvciIsImJvdHRvbU1hcFN0eWxlIiwibWFwUHJvcHMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJvblZpZXdwb3J0Q2hhbmdlIiwiX29uVmlld3BvcnRDaGFuZ2UiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiaXNFZGl0IiwibWFwRHJhdyIsImFjdGl2ZSIsImRyYWdSb3RhdGUiLCJpc0V4cG9ydCIsInJlYWRPbmx5Iiwic2NhbGUiLCJsb2NhbGUiLCJ0b2dnbGVQZXJzcGVjdGl2ZSIsInRvZ2dsZVNwbGl0TWFwIiwiX2hhbmRsZU1hcFRvZ2dsZUxheWVyIiwiX3RvZ2dsZU1hcENvbnRyb2wiLCJzZXRFZGl0b3JNb2RlIiwic2V0TG9jYWxlIiwidG9nZ2xlRWRpdG9yVmlzaWJpbGl0eSIsIl9zZXRNYXBib3hNYXAiLCJ1bmRlZmluZWQiLCJvbk1vdXNlTW92ZSIsIl9yZW5kZXJEZWNrT3ZlcmxheSIsIl9yZW5kZXJNYXBib3hPdmVybGF5cyIsInBvbHlnb25GaWx0ZXJzIiwiZGVsZXRlRmVhdHVyZSIsInNldFNlbGVjdGVkRmVhdHVyZSIsInNldEZlYXR1cmVzIiwic2V0UG9seWdvbkZpbHRlckxheWVyIiwidmlzaWJsZSIsInRvcE1hcFN0eWxlIiwiX3JlbmRlck1hcFBvcG92ZXIiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwiYXJyYXlPZiIsImFueSIsImJvb2wiLCJvbk1hcFRvZ2dsZUxh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LFdBQVcsRUFBRSxFQUZPO0FBR3BCeEYsSUFBQUEsS0FBSyxFQUFFO0FBSGEsR0FuQ2tEO0FBc2MxRS9CLEVBQUFBLFlBQVksQ0FBQ2tMLFdBQWIsR0FBMkIsY0FBM0I7QUFFQSxTQUFPbEwsWUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gbGlicmFyaWVzXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTWFwYm94R0xNYXAgZnJvbSAncmVhY3QtbWFwLWdsJztcbmltcG9ydCBEZWNrR0wgZnJvbSAnQGRlY2suZ2wvcmVhY3QnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IFdlYk1lcmNhdG9yVmlld3BvcnQgZnJvbSAndmlld3BvcnQtbWVyY2F0b3ItcHJvamVjdCc7XG5cbi8vIGNvbXBvbmVudHNcbmltcG9ydCBNYXBQb3BvdmVyRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlcic7XG5pbXBvcnQgTWFwQ29udHJvbEZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9tYXAvbWFwLWNvbnRyb2wnO1xuaW1wb3J0IHtTdHlsZWRNYXBDb250YWluZXJ9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IEVkaXRvckZhY3RvcnkgZnJvbSAnLi9lZGl0b3IvZWRpdG9yJztcblxuLy8gdXRpbHNcbmltcG9ydCB7Z2VuZXJhdGVNYXBib3hMYXllcnMsIHVwZGF0ZU1hcGJveExheWVyc30gZnJvbSAnbGF5ZXJzL21hcGJveC11dGlscyc7XG5pbXBvcnQge09WRVJMQVlfVFlQRX0gZnJvbSAnbGF5ZXJzL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtzZXRMYXllckJsZW5kaW5nfSBmcm9tICd1dGlscy9nbC11dGlscyc7XG5pbXBvcnQge3RyYW5zZm9ybVJlcXVlc3R9IGZyb20gJ3V0aWxzL21hcC1zdHlsZS11dGlscy9tYXBib3gtdXRpbHMnO1xuXG4vLyBkZWZhdWx0LXNldHRpbmdzXG5pbXBvcnQgVGhyZWVEQnVpbGRpbmdMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzLzNkLWJ1aWxkaW5nLWxheWVyLzNkLWJ1aWxkaW5nLWxheWVyJztcbmltcG9ydCB7RklMVEVSX1RZUEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IE1BUF9TVFlMRSA9IHtcbiAgY29udGFpbmVyOiB7XG4gICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfSxcbiAgdG9wOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZSdcbiAgfVxufTtcblxuY29uc3QgTUFQQk9YR0xfU1RZTEVfVVBEQVRFID0gJ3N0eWxlLmxvYWQnO1xuY29uc3QgTUFQQk9YR0xfUkVOREVSID0gJ3JlbmRlcic7XG5jb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMDtcblxuTWFwQ29udGFpbmVyRmFjdG9yeS5kZXBzID0gW01hcFBvcG92ZXJGYWN0b3J5LCBNYXBDb250cm9sRmFjdG9yeSwgRWRpdG9yRmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hcENvbnRhaW5lckZhY3RvcnkoTWFwUG9wb3ZlciwgTWFwQ29udHJvbCwgRWRpdG9yKSB7XG4gIGNsYXNzIE1hcENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIC8vIHJlcXVpcmVkXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGludGVyYWN0aW9uQ29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllckJsZW5kaW5nOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBsYXllck9yZGVyOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBDb250cm9sczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdWlTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1vdXNlUG9zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWFwYm94QXBpVXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHVpU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgICAgIC8vIG9wdGlvbmFsXG4gICAgICByZWFkT25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBpc0V4cG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBjbGlja2VkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgaG92ZXJJbmZvOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgbWFwTGF5ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgb25NYXBUb2dnbGVMYXllcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvbk1hcFN0eWxlTG9hZGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTWFwUmVuZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIGdldE1hcGJveFJlZjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBpbmRleDogUHJvcFR5cGVzLm51bWJlclxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgTWFwQ29tcG9uZW50OiBNYXBib3hHTE1hcCxcbiAgICAgIGRlY2tHbFByb3BzOiB7fSxcbiAgICAgIGluZGV4OiAwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7XG4gICAgICAgIC8vIFtsYXllcnMuaWRdOiBtYXBib3hMYXllckNvbmZpZ1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fZGVjayA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAvLyB1bmJpbmQgbWFwYm94Z2wgZXZlbnQgbGlzdGVuZXJcbiAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgdGhpcy5fbWFwLm9mZihNQVBCT1hHTF9TVFlMRV9VUERBVEUpO1xuICAgICAgICB0aGlzLl9tYXAub2ZmKE1BUEJPWEdMX1JFTkRFUik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGF5ZXJzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5sYXllcnM7XG4gICAgbGF5ZXJEYXRhU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5sYXllckRhdGE7XG4gICAgbWFwTGF5ZXJzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5tYXBMYXllcnM7XG4gICAgbGF5ZXJPcmRlclNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMubGF5ZXJPcmRlcjtcbiAgICBsYXllcnNUb1JlbmRlclNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyc1NlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllckRhdGFTZWxlY3RvcixcbiAgICAgIHRoaXMubWFwTGF5ZXJzU2VsZWN0b3IsXG4gICAgICAvLyB7W2lkXTogdHJ1ZSBcXCBmYWxzZX1cbiAgICAgIChsYXllcnMsIGxheWVyRGF0YSwgbWFwTGF5ZXJzKSA9PlxuICAgICAgICBsYXllcnMucmVkdWNlKFxuICAgICAgICAgIChhY2N1LCBsYXllciwgaWR4KSA9PiAoe1xuICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgIFtsYXllci5pZF06XG4gICAgICAgICAgICAgIGxheWVyLnNob3VsZFJlbmRlckxheWVyKGxheWVyRGF0YVtpZHhdKSAmJiB0aGlzLl9pc1Zpc2libGVNYXBMYXllcihsYXllciwgbWFwTGF5ZXJzKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICApO1xuXG4gICAgZmlsdGVyc1NlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVycztcbiAgICBwb2x5Z29uRmlsdGVycyA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuZmlsdGVyc1NlbGVjdG9yLCBmaWx0ZXJzID0+XG4gICAgICBmaWx0ZXJzLmZpbHRlcihmID0+IGYudHlwZSA9PT0gRklMVEVSX1RZUEVTLnBvbHlnb24pXG4gICAgKTtcblxuICAgIG1hcGJveExheWVyc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyc1NlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllckRhdGFTZWxlY3RvcixcbiAgICAgIHRoaXMubGF5ZXJPcmRlclNlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllcnNUb1JlbmRlclNlbGVjdG9yLFxuICAgICAgZ2VuZXJhdGVNYXBib3hMYXllcnNcbiAgICApO1xuXG4gICAgLyogY29tcG9uZW50IHByaXZhdGUgZnVuY3Rpb25zICovXG4gICAgX2lzVmlzaWJsZU1hcExheWVyKGxheWVyLCBtYXBMYXllcnMpIHtcbiAgICAgIC8vIGlmIGxheWVyLmlkIGlzIG5vdCBpbiBtYXBMYXllcnMsIGRvbid0IHJlbmRlciBpdFxuICAgICAgcmV0dXJuICFtYXBMYXllcnMgfHwgKG1hcExheWVycyAmJiBtYXBMYXllcnNbbGF5ZXIuaWRdKTtcbiAgICB9XG5cbiAgICBfb25DbG9zZU1hcFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2sobnVsbCk7XG4gICAgfTtcblxuICAgIF9vbkxheWVyU2V0RG9tYWluID0gKGlkeCwgY29sb3JEb21haW4pID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLmxheWVyQ29uZmlnQ2hhbmdlKHRoaXMucHJvcHMubGF5ZXJzW2lkeF0sIHtcbiAgICAgICAgY29sb3JEb21haW5cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfaGFuZGxlTWFwVG9nZ2xlTGF5ZXIgPSBsYXllcklkID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleDogbWFwSW5kZXggPSAwLCB2aXNTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcbiAgICAgIHZpc1N0YXRlQWN0aW9ucy50b2dnbGVMYXllckZvck1hcChtYXBJbmRleCwgbGF5ZXJJZCk7XG4gICAgfTtcblxuICAgIF9vbk1hcGJveFN0eWxlVXBkYXRlID0gKCkgPT4ge1xuICAgICAgLy8gZm9yY2UgcmVmcmVzaCBtYXBib3hnbCBsYXllcnNcbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7fTtcbiAgICAgIHRoaXMuX3VwZGF0ZU1hcGJveExheWVycygpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBTdHlsZUxvYWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uTWFwU3R5bGVMb2FkZWQodGhpcy5fbWFwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3NldE1hcGJveE1hcCA9IG1hcGJveCA9PiB7XG4gICAgICBpZiAoIXRoaXMuX21hcCAmJiBtYXBib3gpIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwYm94LmdldE1hcCgpO1xuICAgICAgICAvLyBpIG5vdGljZWQgaW4gY2VydGFpbiBjb250ZXh0IHdlIGRvbid0IGFjY2VzcyB0aGUgYWN0dWFsIG1hcCBlbGVtZW50XG4gICAgICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJpbmQgbWFwYm94Z2wgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5fbWFwLm9uKE1BUEJPWEdMX1NUWUxFX1VQREFURSwgdGhpcy5fb25NYXBib3hTdHlsZVVwZGF0ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFwLm9uKE1BUEJPWEdMX1JFTkRFUiwgKCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbk1hcFJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk1hcFJlbmRlcih0aGlzLl9tYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmdldE1hcGJveFJlZikge1xuICAgICAgICAvLyBUaGUgcGFyZW50IGNvbXBvbmVudCBjYW4gZ2FpbiBhY2Nlc3MgdG8gb3VyIE1hcGJveEdsTWFwIGJ5XG4gICAgICAgIC8vIHByb3ZpZGluZyB0aGlzIGNhbGxiYWNrLiBOb3RlIHRoYXQgJ21hcGJveCcgd2lsbCBiZSBudWxsIHdoZW4gdGhlXG4gICAgICAgIC8vIHJlZiBpcyB1bnNldCAoZS5nLiB3aGVuIGEgc3BsaXQgbWFwIGlzIGNsb3NlZCkuXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TWFwYm94UmVmKG1hcGJveCwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9vbkJlZm9yZVJlbmRlciA9ICh7Z2x9KSA9PiB7XG4gICAgICBzZXRMYXllckJsZW5kaW5nKGdsLCB0aGlzLnByb3BzLmxheWVyQmxlbmRpbmcpO1xuICAgIH07XG5cbiAgICAvKiBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9ucyAqL1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICAgIF9yZW5kZXJNYXBQb3BvdmVyKGxheWVyc1RvUmVuZGVyKSB7XG4gICAgICAvLyBUT0RPOiBtb3ZlIHRoaXMgaW50byByZWR1Y2VyIHNvIGl0IGNhbiBiZSB0ZXN0ZWRcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIG1vdXNlUG9zOiB7bW91c2VQb3NpdGlvbiwgY29vcmRpbmF0ZSwgcGlubmVkfVxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmICghbW91c2VQb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGNsaWNrZWQgc29tZXRoaW5nLCBpZ25vcmUgaG92ZXIgYmVoYXZpb3JcbiAgICAgIGNvbnN0IG9iamVjdEluZm8gPSBjbGlja2VkIHx8IGhvdmVySW5mbztcbiAgICAgIGxldCBsYXllckhvdmVyUHJvcCA9IG51bGw7XG4gICAgICBsZXQgcG9zaXRpb24gPSB7eDogbW91c2VQb3NpdGlvblswXSwgeTogbW91c2VQb3NpdGlvblsxXX07XG5cbiAgICAgIGlmIChpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmVuYWJsZWQgJiYgb2JqZWN0SW5mbyAmJiBvYmplY3RJbmZvLnBpY2tlZCkge1xuICAgICAgICAvLyBpZiBhbnl0aGluZyBob3ZlcmVkXG4gICAgICAgIGNvbnN0IHtvYmplY3QsIGxheWVyOiBvdmVybGF5fSA9IG9iamVjdEluZm87XG5cbiAgICAgICAgLy8gZGVja2dsIGxheWVyIHRvIGtlcGxlci1nbCBsYXllclxuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1tvdmVybGF5LnByb3BzLmlkeF07XG5cbiAgICAgICAgaWYgKGxheWVyLmdldEhvdmVyRGF0YSAmJiBsYXllcnNUb1JlbmRlcltsYXllci5pZF0pIHtcbiAgICAgICAgICAvLyBpZiBsYXllciBpcyB2aXNpYmxlIGFuZCBoYXZlIGhvdmVyZWQgZGF0YVxuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNvbmZpZzoge2RhdGFJZH1cbiAgICAgICAgICB9ID0gbGF5ZXI7XG4gICAgICAgICAgY29uc3Qge2FsbERhdGEsIGZpZWxkc30gPSBkYXRhc2V0c1tkYXRhSWRdO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5nZXRIb3ZlckRhdGEob2JqZWN0LCBhbGxEYXRhKTtcbiAgICAgICAgICBjb25zdCBmaWVsZHNUb1Nob3cgPSBpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXTtcblxuICAgICAgICAgIGxheWVySG92ZXJQcm9wID0ge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGZpZWxkcyxcbiAgICAgICAgICAgIGZpZWxkc1RvU2hvdyxcbiAgICAgICAgICAgIGxheWVyXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGlubmVkIHx8IGNsaWNrZWQpIHtcbiAgICAgICAgLy8gcHJvamVjdCBsbmdsYXQgdG8gc2NyZWVuIHNvIHRoYXQgdG9vbHRpcCBmb2xsb3dzIHRoZSBvYmplY3Qgb24gem9vbVxuICAgICAgICBjb25zdCB2aWV3cG9ydCA9IG5ldyBXZWJNZXJjYXRvclZpZXdwb3J0KG1hcFN0YXRlKTtcbiAgICAgICAgY29uc3QgbG5nTGF0ID0gY2xpY2tlZCA/IGNsaWNrZWQubG5nTGF0IDogcGlubmVkLmNvb3JkaW5hdGU7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5fZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE1hcFBvcG92ZXJcbiAgICAgICAgICAgIHsuLi5wb3NpdGlvbn1cbiAgICAgICAgICAgIGxheWVySG92ZXJQcm9wPXtsYXllckhvdmVyUHJvcH1cbiAgICAgICAgICAgIGNvb3JkaW5hdGU9e1xuICAgICAgICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZy5jb29yZGluYXRlLmVuYWJsZWQgJiYgKChwaW5uZWQgfHwge30pLmNvb3JkaW5hdGUgfHwgY29vcmRpbmF0ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyZWV6ZWQ9e0Jvb2xlYW4oY2xpY2tlZCB8fCBwaW5uZWQpfVxuICAgICAgICAgICAgb25DbG9zZT17dGhpcy5fb25DbG9zZU1hcFBvcG92ZXJ9XG4gICAgICAgICAgICBtYXBXPXttYXBTdGF0ZS53aWR0aH1cbiAgICAgICAgICAgIG1hcEg9e21hcFN0YXRlLmhlaWdodH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgICBfZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KSB7XG4gICAgICBjb25zdCBzY3JlZW5Db29yZCA9ICF2aWV3cG9ydCB8fCAhbG5nTGF0ID8gbnVsbCA6IHZpZXdwb3J0LnByb2plY3QobG5nTGF0KTtcbiAgICAgIHJldHVybiBzY3JlZW5Db29yZCAmJiB7eDogc2NyZWVuQ29vcmRbMF0sIHk6IHNjcmVlbkNvb3JkWzFdfTtcbiAgICB9XG5cbiAgICBfcmVuZGVyTGF5ZXIgPSAob3ZlcmxheXMsIGlkeCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBhbmltYXRpb25Db25maWdcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaWR4XTtcbiAgICAgIGNvbnN0IGRhdGEgPSBsYXllckRhdGFbaWR4XTtcbiAgICAgIGNvbnN0IHtncHVGaWx0ZXJ9ID0gZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0gfHwge307XG5cbiAgICAgIGNvbnN0IG9iamVjdEhvdmVyZWQgPSBjbGlja2VkIHx8IGhvdmVySW5mbztcbiAgICAgIGNvbnN0IGxheWVyQ2FsbGJhY2tzID0ge1xuICAgICAgICBvblNldExheWVyRG9tYWluOiB2YWwgPT4gdGhpcy5fb25MYXllclNldERvbWFpbihpZHgsIHZhbClcbiAgICAgIH07XG5cbiAgICAgIC8vIExheWVyIGlzIExheWVyIGNsYXNzXG4gICAgICBjb25zdCBsYXllck92ZXJsYXkgPSBsYXllci5yZW5kZXJMYXllcih7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdwdUZpbHRlcixcbiAgICAgICAgaWR4LFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbGF5ZXJDYWxsYmFja3MsXG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBhbmltYXRpb25Db25maWcsXG4gICAgICAgIG9iamVjdEhvdmVyZWRcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb3ZlcmxheXMuY29uY2F0KGxheWVyT3ZlcmxheSB8fCBbXSk7XG4gICAgfTtcblxuICAgIF9yZW5kZXJEZWNrT3ZlcmxheShsYXllcnNUb1JlbmRlcikge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgICAgICBtYXBib3hBcGlVcmxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBsZXQgZGVja0dsTGF5ZXJzID0gW107XG4gICAgICAvLyB3YWl0IHVudGlsIGRhdGEgaXMgcmVhZHkgYmVmb3JlIHJlbmRlciBkYXRhIGxheWVyc1xuICAgICAgaWYgKGxheWVyRGF0YSAmJiBsYXllckRhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGxhc3QgbGF5ZXIgcmVuZGVyIGZpcnN0XG4gICAgICAgIGRlY2tHbExheWVycyA9IGxheWVyT3JkZXJcbiAgICAgICAgICAuc2xpY2UoKVxuICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgaWR4ID0+IGxheWVyc1tpZHhdLm92ZXJsYXlUeXBlID09PSBPVkVSTEFZX1RZUEUuZGVja2dsICYmIGxheWVyc1RvUmVuZGVyW2xheWVyc1tpZHhdLmlkXVxuICAgICAgICAgIClcbiAgICAgICAgICAucmVkdWNlKHRoaXMuX3JlbmRlckxheWVyLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXBTdHlsZS52aXNpYmxlTGF5ZXJHcm91cHNbJzNkIGJ1aWxkaW5nJ10pIHtcbiAgICAgICAgZGVja0dsTGF5ZXJzLnB1c2goXG4gICAgICAgICAgbmV3IFRocmVlREJ1aWxkaW5nTGF5ZXIoe1xuICAgICAgICAgICAgaWQ6ICdfa2VwbGVyZ2xfM2QtYnVpbGRpbmcnLFxuICAgICAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBtYXBib3hBcGlVcmwsXG4gICAgICAgICAgICB0aHJlZURCdWlsZGluZ0NvbG9yOiBtYXBTdHlsZS50aHJlZURCdWlsZGluZ0NvbG9yLFxuICAgICAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IHtcbiAgICAgICAgICAgICAgZ2V0RmlsbENvbG9yOiBtYXBTdHlsZS50aHJlZURCdWlsZGluZ0NvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERlY2tHTFxuICAgICAgICAgIHsuLi50aGlzLnByb3BzLmRlY2tHbFByb3BzfVxuICAgICAgICAgIHZpZXdTdGF0ZT17bWFwU3RhdGV9XG4gICAgICAgICAgaWQ9XCJkZWZhdWx0LWRlY2tnbC1vdmVybGF5XCJcbiAgICAgICAgICBsYXllcnM9e2RlY2tHbExheWVyc31cbiAgICAgICAgICBvbkJlZm9yZVJlbmRlcj17dGhpcy5fb25CZWZvcmVSZW5kZXJ9XG4gICAgICAgICAgb25Ib3Zlcj17dmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJIb3Zlcn1cbiAgICAgICAgICBvbkNsaWNrPXt2aXNTdGF0ZUFjdGlvbnMub25MYXllckNsaWNrfVxuICAgICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcCAmJiBjb21wLmRlY2sgJiYgIXRoaXMuX2RlY2spIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVjayA9IGNvbXAuZGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlTWFwYm94TGF5ZXJzKCkge1xuICAgICAgY29uc3QgbWFwYm94TGF5ZXJzID0gdGhpcy5tYXBib3hMYXllcnNTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGlmICghT2JqZWN0LmtleXMobWFwYm94TGF5ZXJzKS5sZW5ndGggJiYgIU9iamVjdC5rZXlzKHRoaXMucHJldmlvdXNMYXllcnMpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1hcGJveExheWVycyh0aGlzLl9tYXAsIG1hcGJveExheWVycywgdGhpcy5wcmV2aW91c0xheWVycyk7XG5cbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSBtYXBib3hMYXllcnM7XG4gICAgfVxuXG4gICAgX3JlbmRlck1hcGJveE92ZXJsYXlzKCkge1xuICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuaXNTdHlsZUxvYWRlZCgpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hcGJveExheWVycygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9vblZpZXdwb3J0Q2hhbmdlID0gdmlld1N0YXRlID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vblZpZXdTdGF0ZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uVmlld1N0YXRlQ2hhbmdlKHZpZXdTdGF0ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm1hcFN0YXRlQWN0aW9ucy51cGRhdGVNYXAodmlld1N0YXRlKTtcbiAgICB9O1xuXG4gICAgX3RvZ2dsZU1hcENvbnRyb2wgPSBwYW5lbElkID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleCwgdWlTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcblxuICAgICAgdWlTdGF0ZUFjdGlvbnMudG9nZ2xlTWFwQ29udHJvbChwYW5lbElkLCBpbmRleCk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcExheWVycyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBNYXBDb21wb25lbnQsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgbWFwYm94QXBpVXJsLFxuICAgICAgICBtYXBDb250cm9scyxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgZWRpdG9yLFxuICAgICAgICBpbmRleFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IGxheWVyc1RvUmVuZGVyID0gdGhpcy5sYXllcnNUb1JlbmRlclNlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgICBpZiAoIW1hcFN0eWxlLmJvdHRvbU1hcFN0eWxlKSB7XG4gICAgICAgIC8vIHN0eWxlIG5vdCB5ZXQgbG9hZGVkXG4gICAgICAgIHJldHVybiA8ZGl2IC8+O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXBQcm9wcyA9IHtcbiAgICAgICAgLi4ubWFwU3RhdGUsXG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcGJveEFwaVVybCxcbiAgICAgICAgb25WaWV3cG9ydENoYW5nZTogdGhpcy5fb25WaWV3cG9ydENoYW5nZSxcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNFZGl0ID0gdWlTdGF0ZS5tYXBDb250cm9scy5tYXBEcmF3LmFjdGl2ZTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZE1hcENvbnRhaW5lciBzdHlsZT17TUFQX1NUWUxFLmNvbnRhaW5lcn0+XG4gICAgICAgICAgPE1hcENvbnRyb2xcbiAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgIGRyYWdSb3RhdGU9e21hcFN0YXRlLmRyYWdSb3RhdGV9XG4gICAgICAgICAgICBpc1NwbGl0PXtCb29sZWFuKG1hcExheWVycyl9XG4gICAgICAgICAgICBpc0V4cG9ydD17dGhpcy5wcm9wcy5pc0V4cG9ydH1cbiAgICAgICAgICAgIGxheWVycz17bGF5ZXJzfVxuICAgICAgICAgICAgbGF5ZXJzVG9SZW5kZXI9e2xheWVyc1RvUmVuZGVyfVxuICAgICAgICAgICAgbWFwSW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgbWFwQ29udHJvbHM9e21hcENvbnRyb2xzfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XG4gICAgICAgICAgICBzY2FsZT17bWFwU3RhdGUuc2NhbGUgfHwgMX1cbiAgICAgICAgICAgIHRvcD17MH1cbiAgICAgICAgICAgIGVkaXRvcj17ZWRpdG9yfVxuICAgICAgICAgICAgbG9jYWxlPXt1aVN0YXRlLmxvY2FsZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVQZXJzcGVjdGl2ZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXA9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVTcGxpdE1hcH1cbiAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e3RoaXMuX2hhbmRsZU1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgb25Ub2dnbGVNYXBDb250cm9sPXt0aGlzLl90b2dnbGVNYXBDb250cm9sfVxuICAgICAgICAgICAgb25TZXRFZGl0b3JNb2RlPXt2aXNTdGF0ZUFjdGlvbnMuc2V0RWRpdG9yTW9kZX1cbiAgICAgICAgICAgIG9uU2V0TG9jYWxlPXt1aVN0YXRlQWN0aW9ucy5zZXRMb2NhbGV9XG4gICAgICAgICAgICBvblRvZ2dsZUVkaXRvclZpc2liaWxpdHk9e3Zpc1N0YXRlQWN0aW9ucy50b2dnbGVFZGl0b3JWaXNpYmlsaXR5fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE1hcENvbXBvbmVudFxuICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAga2V5PVwiYm90dG9tXCJcbiAgICAgICAgICAgIHJlZj17dGhpcy5fc2V0TWFwYm94TWFwfVxuICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlLmJvdHRvbU1hcFN0eWxlfVxuICAgICAgICAgICAgZ2V0Q3Vyc29yPXt0aGlzLnByb3BzLmhvdmVySW5mbyA/ICgpID0+ICdwb2ludGVyJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbj17VFJBTlNJVElPTl9EVVJBVElPTn1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbk1vdXNlTW92ZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVyRGVja092ZXJsYXkobGF5ZXJzVG9SZW5kZXIpfVxuICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hcGJveE92ZXJsYXlzKGxheWVyc1RvUmVuZGVyKX1cbiAgICAgICAgICAgIDxFZGl0b3JcbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGVkaXRvcj17ZWRpdG9yfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXt0aGlzLnBvbHlnb25GaWx0ZXJzKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICBpc0VuYWJsZWQ9e2lzRWRpdH1cbiAgICAgICAgICAgICAgbGF5ZXJzPXtsYXllcnN9XG4gICAgICAgICAgICAgIGxheWVyc1RvUmVuZGVyPXtsYXllcnNUb1JlbmRlcn1cbiAgICAgICAgICAgICAgb25EZWxldGVGZWF0dXJlPXt2aXNTdGF0ZUFjdGlvbnMuZGVsZXRlRmVhdHVyZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3Zpc1N0YXRlQWN0aW9ucy5zZXRTZWxlY3RlZEZlYXR1cmV9XG4gICAgICAgICAgICAgIG9uVXBkYXRlPXt2aXNTdGF0ZUFjdGlvbnMuc2V0RmVhdHVyZXN9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlUG9seWdvbkZpbHRlcj17dmlzU3RhdGVBY3Rpb25zLnNldFBvbHlnb25GaWx0ZXJMYXllcn1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc0VkaXQgPyAnYWxsJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBlZGl0b3IudmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9NYXBDb21wb25lbnQ+XG4gICAgICAgICAge21hcFN0eWxlLnRvcE1hcFN0eWxlICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e01BUF9TVFlMRS50b3B9PlxuICAgICAgICAgICAgICA8TWFwQ29tcG9uZW50IHsuLi5tYXBQcm9wc30ga2V5PVwidG9wXCIgbWFwU3R5bGU9e21hcFN0eWxlLnRvcE1hcFN0eWxlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7dGhpcy5fcmVuZGVyTWFwUG9wb3ZlcihsYXllcnNUb1JlbmRlcil9XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBNYXBDb250YWluZXIuZGlzcGxheU5hbWUgPSAnTWFwQ29udGFpbmVyJztcblxuICByZXR1cm4gTWFwQ29udGFpbmVyO1xufVxuIl19