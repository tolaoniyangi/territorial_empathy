"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _window = require("global/window");

var _redux = require("redux");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reselect = require("reselect");

var _keplerglConnect = require("../connect/keplergl-connect");

var _reactIntl = require("react-intl");

var _localization = require("../localization");

var _context = require("./context");

var VisStateActions = _interopRequireWildcard(require("../actions/vis-state-actions"));

var MapStateActions = _interopRequireWildcard(require("../actions/map-state-actions"));

var MapStyleActions = _interopRequireWildcard(require("../actions/map-style-actions"));

var UIStateActions = _interopRequireWildcard(require("../actions/ui-state-actions"));

var ProviderActions = _interopRequireWildcard(require("../actions/provider-actions"));

var _defaultSettings = require("../constants/default-settings");

var _userFeedbacks = require("../constants/user-feedbacks");

var _sidePanel = _interopRequireDefault(require("./side-panel"));

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _bottomWidget = _interopRequireDefault(require("./bottom-widget"));

var _modalContainer = _interopRequireDefault(require("./modal-container"));

var _plotContainer = _interopRequireDefault(require("./plot-container"));

var _notificationPanel = _interopRequireDefault(require("./notification-panel"));

var _geocoderPanel = _interopRequireDefault(require("./geocoder-panel"));

var _utils = require("../utils/utils");

var _mapboxUtils = require("../utils/mapbox-utils");

var _base = require("../styles/base");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: ", ";\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// Maybe we should think about exporting this or creating a variable
// as part of the base.js theme
var GlobalStyle = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.fontFamily;
}, function (props) {
  return props.theme.fontWeight;
}, function (props) {
  return props.theme.fontSize;
}, function (props) {
  return props.theme.lineHeight;
}, function (props) {
  return props.theme.labelColor;
});

KeplerGlFactory.deps = [_bottomWidget["default"], _geocoderPanel["default"], _mapContainer["default"], _modalContainer["default"], _sidePanel["default"], _plotContainer["default"], _notificationPanel["default"]];

function KeplerGlFactory(BottomWidget, GeoCoderPanel, MapContainer, ModalContainer, SidePanel, PlotContainer, NotificationPanel) {
  var KeplerGL =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(KeplerGL, _Component);

    function KeplerGL() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, KeplerGL);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(KeplerGL)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "root", (0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "themeSelector", function (props) {
        return props.theme;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableThemeSelector", (0, _reselect.createSelector)(_this.themeSelector, function (theme) {
        return (0, _typeof2["default"])(theme) === 'object' ? _objectSpread({}, _base.theme, {}, theme) : theme === _defaultSettings.THEME.light ? _base.themeLT : theme === _defaultSettings.THEME.base ? _base.themeBS : theme;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableProviders", (0, _reselect.createSelector)(function (props) {
        return props.cloudProviders;
      }, function (providers) {
        return Array.isArray(providers) && providers.length ? {
          hasStorage: providers.some(function (p) {
            return p.hasPrivateStorage();
          }),
          hasShare: providers.some(function (p) {
            return p.hasSharingUrl();
          })
        } : {};
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_loadMapStyle", function () {
        var defaultStyles = Object.values(_this.props.mapStyle.mapStyles); // add id to custom map styles if not given

        var customStyles = (_this.props.mapStyles || []).map(function (ms) {
          return _objectSpread({}, ms, {
            id: ms.id || (0, _utils.generateHashId)()
          });
        });
        var allStyles = [].concat((0, _toConsumableArray2["default"])(customStyles), (0, _toConsumableArray2["default"])(defaultStyles)).reduce(function (accu, style) {
          var hasStyleObject = style.style && (0, _typeof2["default"])(style.style) === 'object';
          accu[hasStyleObject ? 'toLoad' : 'toRequest'][style.id] = style;
          return accu;
        }, {
          toLoad: {},
          toRequest: {}
        });

        _this.props.mapStyleActions.loadMapStyles(allStyles.toLoad);

        _this.props.mapStyleActions.requestMapStyles(allStyles.toRequest);
      });
      return _this;
    }

    (0, _createClass2["default"])(KeplerGL, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._validateMapboxToken();

        this._loadMapStyle(this.props.mapStyles);

        this._handleResize(this.props);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if ( // if dimension props has changed
        this.props.height !== prevProps.height || this.props.width !== prevProps.width || // react-map-gl will dispatch updateViewport after this._handleResize is called
        // here we check if this.props.mapState.height is sync with props.height
        this.props.height !== this.props.mapState.height) {
          this._handleResize(this.props);
        }
      }
    }, {
      key: "_validateMapboxToken",

      /* private methods */
      value: function _validateMapboxToken() {
        var mapboxApiAccessToken = this.props.mapboxApiAccessToken;

        if (!(0, _mapboxUtils.validateToken)(mapboxApiAccessToken)) {
          _window.console.warn(_userFeedbacks.MISSING_MAPBOX_TOKEN);
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          _window.console.warn('width and height is required');

          return;
        }

        this.props.mapStateActions.updateMap({
          width: width / (1 + Number(this.props.mapState.isSplit)),
          height: height
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            id = _this$props.id,
            appName = _this$props.appName,
            version = _this$props.version,
            appWebsite = _this$props.appWebsite,
            onSaveMap = _this$props.onSaveMap,
            onViewStateChange = _this$props.onViewStateChange,
            width = _this$props.width,
            height = _this$props.height,
            mapboxApiAccessToken = _this$props.mapboxApiAccessToken,
            mapboxApiUrl = _this$props.mapboxApiUrl,
            getMapboxRef = _this$props.getMapboxRef,
            mapStyle = _this$props.mapStyle,
            mapState = _this$props.mapState,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            providerState = _this$props.providerState,
            visStateActions = _this$props.visStateActions,
            mapStateActions = _this$props.mapStateActions,
            mapStyleActions = _this$props.mapStyleActions,
            uiStateActions = _this$props.uiStateActions,
            providerActions = _this$props.providerActions,
            dispatch = _this$props.dispatch;
        var availableProviders = this.availableProviders(this.props);
        var filters = visState.filters,
            layers = visState.layers,
            splitMaps = visState.splitMaps,
            layerOrder = visState.layerOrder,
            layerBlending = visState.layerBlending,
            layerClasses = visState.layerClasses,
            interactionConfig = visState.interactionConfig,
            datasets = visState.datasets,
            layerData = visState.layerData,
            hoverInfo = visState.hoverInfo,
            clicked = visState.clicked,
            mousePos = visState.mousePos,
            animationConfig = visState.animationConfig,
            mapInfo = visState.mapInfo;
        var notificationPanelFields = {
          removeNotification: uiStateActions.removeNotification,
          notifications: uiState.notifications
        };
        var sideFields = {
          appName: appName,
          version: version,
          appWebsite: appWebsite,
          datasets: datasets,
          filters: filters,
          layers: layers,
          layerOrder: layerOrder,
          layerClasses: layerClasses,
          interactionConfig: interactionConfig,
          mapStyle: mapStyle,
          mapInfo: mapInfo,
          layerBlending: layerBlending,
          onSaveMap: onSaveMap,
          uiState: uiState,
          mapStyleActions: mapStyleActions,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          width: this.props.sidePanelWidth,
          availableProviders: availableProviders,
          mapSaved: providerState.mapSaved
        };
        var mapFields = {
          datasets: datasets,
          getMapboxRef: getMapboxRef,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapboxApiUrl: mapboxApiUrl,
          mapState: mapState,
          uiState: uiState,
          editor: visState.editor,
          mapStyle: mapStyle,
          mapControls: uiState.mapControls,
          layers: layers,
          layerOrder: layerOrder,
          layerData: layerData,
          layerBlending: layerBlending,
          filters: filters,
          interactionConfig: interactionConfig,
          hoverInfo: hoverInfo,
          clicked: clicked,
          mousePos: mousePos,
          readOnly: uiState.readOnly,
          onViewStateChange: onViewStateChange,
          uiStateActions: uiStateActions,
          visStateActions: visStateActions,
          mapStateActions: mapStateActions,
          animationConfig: animationConfig
        };
        var isSplit = splitMaps && splitMaps.length > 1;
        var containerW = mapState.width * (Number(isSplit) + 1);
        var mapContainers = !isSplit ? [_react["default"].createElement(MapContainer, (0, _extends2["default"])({
          key: 0,
          index: 0
        }, mapFields, {
          mapLayers: null
        }))] : splitMaps.map(function (settings, index) {
          return _react["default"].createElement(MapContainer, (0, _extends2["default"])({
            key: index,
            index: index
          }, mapFields, {
            mapLayers: splitMaps[index].layers
          }));
        });
        var isExporting = uiState.currentModal === _defaultSettings.EXPORT_IMAGE_ID || uiState.currentModal === _defaultSettings.SAVE_MAP_ID || uiState.currentModal === _defaultSettings.SHARE_MAP_ID || uiState.currentModal === _defaultSettings.OVERWRITE_MAP_ID;
        var theme = this.availableThemeSelector(this.props);
        return _react["default"].createElement(_context.RootContext.Provider, {
          value: this.root
        }, _react["default"].createElement(_reactIntl.IntlProvider, {
          locale: uiState.locale,
          messages: _localization.messages[uiState.locale]
        }, _react["default"].createElement(_styledComponents.ThemeProvider, {
          theme: theme
        }, _react["default"].createElement(GlobalStyle, {
          width: width,
          height: height,
          className: "kepler-gl",
          id: "kepler-gl__".concat(id),
          ref: this.root
        }, _react["default"].createElement(NotificationPanel, notificationPanelFields), !uiState.readOnly && _react["default"].createElement(SidePanel, sideFields), _react["default"].createElement("div", {
          className: "maps",
          style: {
            display: 'flex'
          }
        }, mapContainers), isExporting && _react["default"].createElement(PlotContainer, {
          width: width,
          height: height,
          exportImageSetting: uiState.exportImage,
          mapFields: mapFields,
          addNotification: uiStateActions.addNotification,
          startExportingImage: uiStateActions.startExportingImage,
          setExportImageDataUri: uiStateActions.setExportImageDataUri,
          setExportImageError: uiStateActions.setExportImageError
        }), !uiState.readOnly && interactionConfig.geocoder.enabled && _react["default"].createElement(GeoCoderPanel, {
          isGeocoderEnabled: interactionConfig.geocoder.enabled,
          mapboxApiAccessToken: mapboxApiAccessToken,
          dispatch: dispatch
        }), _react["default"].createElement(BottomWidget, {
          filters: filters,
          datasets: datasets,
          uiState: uiState,
          layers: layers,
          animationConfig: animationConfig,
          visStateActions: visStateActions,
          sidePanelWidth: uiState.readOnly ? 0 : this.props.sidePanelWidth + _defaultSettings.DIMENSIONS.sidePanel.margin.left,
          containerW: containerW
        }), _react["default"].createElement(ModalContainer, {
          mapStyle: mapStyle,
          visState: visState,
          mapState: mapState,
          uiState: uiState,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapboxApiUrl: mapboxApiUrl,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          mapStyleActions: mapStyleActions,
          providerActions: providerActions,
          rootNode: this.root.current,
          containerW: containerW,
          containerH: mapState.height,
          providerState: this.props.providerState // User defined cloud provider props
          ,
          cloudProviders: this.props.cloudProviders,
          onExportToCloudSuccess: this.props.onExportToCloudSuccess,
          onLoadCloudMapSuccess: this.props.onLoadCloudMapSuccess,
          onLoadCloudMapError: this.props.onLoadCloudMapError,
          onExportToCloudError: this.props.onExportToCloudError
        })))));
      }
    }]);
    return KeplerGL;
  }(_react.Component);

  (0, _defineProperty2["default"])(KeplerGL, "defaultProps", {
    mapStyles: [],
    mapStylesReplaceDefault: false,
    mapboxApiUrl: _defaultSettings.DEFAULT_MAPBOX_API_URL,
    width: 800,
    height: 800,
    appName: _defaultSettings.KEPLER_GL_NAME,
    version: _defaultSettings.KEPLER_GL_VERSION,
    sidePanelWidth: _defaultSettings.DIMENSIONS.sidePanel.width,
    theme: {},
    cloudProviders: []
  });
  (0, _defineProperty2["default"])(KeplerGL, "contextType", _context.RootContext);
  return (0, _keplerglConnect.connect)(mapStateToProps, makeMapDispatchToProps)((0, _styledComponents.withTheme)(KeplerGL));
}

function mapStateToProps() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread({}, props, {
    visState: state.visState,
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    uiState: state.uiState,
    providerState: state.providerState
  });
}

var defaultUserActions = {};

var getDispatch = function getDispatch(dispatch) {
  return dispatch;
};

var getUserActions = function getUserActions(dispatch, props) {
  return props.actions || defaultUserActions;
};

function makeGetActionCreators() {
  return (0, _reselect.createSelector)([getDispatch, getUserActions], function (dispatch, userActions) {
    var _map = [VisStateActions, MapStateActions, MapStyleActions, UIStateActions, ProviderActions].map(function (actions) {
      return (0, _redux.bindActionCreators)(mergeActions(actions, userActions), dispatch);
    }),
        _map2 = (0, _slicedToArray2["default"])(_map, 5),
        visStateActions = _map2[0],
        mapStateActions = _map2[1],
        mapStyleActions = _map2[2],
        uiStateActions = _map2[3],
        providerActions = _map2[4];

    return {
      visStateActions: visStateActions,
      mapStateActions: mapStateActions,
      mapStyleActions: mapStyleActions,
      uiStateActions: uiStateActions,
      providerActions: providerActions,
      dispatch: dispatch
    };
  });
}

function makeMapDispatchToProps() {
  var getActionCreators = makeGetActionCreators();

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var groupedActionCreators = getActionCreators(dispatch, ownProps);
    return _objectSpread({}, groupedActionCreators, {
      dispatch: dispatch
    });
  };

  return mapDispatchToProps;
}
/**
 * Override default kepler.gl actions with user defined actions using the same key
 */


function mergeActions(actions, userActions) {
  var overrides = {};

  for (var key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return _objectSpread({}, actions, {}, overrides);
}

var _default = KeplerGlFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImxhYmVsQ29sb3IiLCJLZXBsZXJHbEZhY3RvcnkiLCJkZXBzIiwiQm90dG9tV2lkZ2V0RmFjdG9yeSIsIkdlb0NvZGVyUGFuZWxGYWN0b3J5IiwiTWFwQ29udGFpbmVyRmFjdG9yeSIsIk1vZGFsQ29udGFpbmVyRmFjdG9yeSIsIlNpZGVQYW5lbEZhY3RvcnkiLCJQbG90Q29udGFpbmVyRmFjdG9yeSIsIk5vdGlmaWNhdGlvblBhbmVsRmFjdG9yeSIsIkJvdHRvbVdpZGdldCIsIkdlb0NvZGVyUGFuZWwiLCJNYXBDb250YWluZXIiLCJNb2RhbENvbnRhaW5lciIsIlNpZGVQYW5lbCIsIlBsb3RDb250YWluZXIiLCJOb3RpZmljYXRpb25QYW5lbCIsIktlcGxlckdMIiwidGhlbWVTZWxlY3RvciIsImJhc2ljVGhlbWUiLCJUSEVNRSIsImxpZ2h0IiwidGhlbWVMVCIsImJhc2UiLCJ0aGVtZUJTIiwiY2xvdWRQcm92aWRlcnMiLCJwcm92aWRlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJoYXNTdG9yYWdlIiwic29tZSIsInAiLCJoYXNQcml2YXRlU3RvcmFnZSIsImhhc1NoYXJlIiwiaGFzU2hhcmluZ1VybCIsImRlZmF1bHRTdHlsZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXBTdHlsZSIsIm1hcFN0eWxlcyIsImN1c3RvbVN0eWxlcyIsIm1hcCIsIm1zIiwiaWQiLCJhbGxTdHlsZXMiLCJyZWR1Y2UiLCJhY2N1Iiwic3R5bGUiLCJoYXNTdHlsZU9iamVjdCIsInRvTG9hZCIsInRvUmVxdWVzdCIsIm1hcFN0eWxlQWN0aW9ucyIsImxvYWRNYXBTdHlsZXMiLCJyZXF1ZXN0TWFwU3R5bGVzIiwiX3ZhbGlkYXRlTWFwYm94VG9rZW4iLCJfbG9hZE1hcFN0eWxlIiwiX2hhbmRsZVJlc2l6ZSIsInByZXZQcm9wcyIsImhlaWdodCIsIndpZHRoIiwibWFwU3RhdGUiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIkNvbnNvbGUiLCJ3YXJuIiwiTUlTU0lOR19NQVBCT1hfVE9LRU4iLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsImlzU3BsaXQiLCJhcHBOYW1lIiwidmVyc2lvbiIsImFwcFdlYnNpdGUiLCJvblNhdmVNYXAiLCJvblZpZXdTdGF0ZUNoYW5nZSIsIm1hcGJveEFwaVVybCIsImdldE1hcGJveFJlZiIsInVpU3RhdGUiLCJ2aXNTdGF0ZSIsInByb3ZpZGVyU3RhdGUiLCJ2aXNTdGF0ZUFjdGlvbnMiLCJ1aVN0YXRlQWN0aW9ucyIsInByb3ZpZGVyQWN0aW9ucyIsImRpc3BhdGNoIiwiYXZhaWxhYmxlUHJvdmlkZXJzIiwiZmlsdGVycyIsImxheWVycyIsInNwbGl0TWFwcyIsImxheWVyT3JkZXIiLCJsYXllckJsZW5kaW5nIiwibGF5ZXJDbGFzc2VzIiwiaW50ZXJhY3Rpb25Db25maWciLCJkYXRhc2V0cyIsImxheWVyRGF0YSIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJtb3VzZVBvcyIsImFuaW1hdGlvbkNvbmZpZyIsIm1hcEluZm8iLCJub3RpZmljYXRpb25QYW5lbEZpZWxkcyIsInJlbW92ZU5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJzaWRlRmllbGRzIiwic2lkZVBhbmVsV2lkdGgiLCJtYXBTYXZlZCIsIm1hcEZpZWxkcyIsImVkaXRvciIsIm1hcENvbnRyb2xzIiwicmVhZE9ubHkiLCJjb250YWluZXJXIiwibWFwQ29udGFpbmVycyIsInNldHRpbmdzIiwiaW5kZXgiLCJpc0V4cG9ydGluZyIsImN1cnJlbnRNb2RhbCIsIkVYUE9SVF9JTUFHRV9JRCIsIlNBVkVfTUFQX0lEIiwiU0hBUkVfTUFQX0lEIiwiT1ZFUldSSVRFX01BUF9JRCIsImF2YWlsYWJsZVRoZW1lU2VsZWN0b3IiLCJyb290IiwibG9jYWxlIiwibWVzc2FnZXMiLCJkaXNwbGF5IiwiZXhwb3J0SW1hZ2UiLCJhZGROb3RpZmljYXRpb24iLCJzdGFydEV4cG9ydGluZ0ltYWdlIiwic2V0RXhwb3J0SW1hZ2VEYXRhVXJpIiwic2V0RXhwb3J0SW1hZ2VFcnJvciIsImdlb2NvZGVyIiwiZW5hYmxlZCIsIkRJTUVOU0lPTlMiLCJzaWRlUGFuZWwiLCJtYXJnaW4iLCJsZWZ0IiwiY3VycmVudCIsIm9uRXhwb3J0VG9DbG91ZFN1Y2Nlc3MiLCJvbkxvYWRDbG91ZE1hcFN1Y2Nlc3MiLCJvbkxvYWRDbG91ZE1hcEVycm9yIiwib25FeHBvcnRUb0Nsb3VkRXJyb3IiLCJDb21wb25lbnQiLCJtYXBTdHlsZXNSZXBsYWNlRGVmYXVsdCIsIkRFRkFVTFRfTUFQQk9YX0FQSV9VUkwiLCJLRVBMRVJfR0xfTkFNRSIsIktFUExFUl9HTF9WRVJTSU9OIiwiUm9vdENvbnRleHQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYWtlTWFwRGlzcGF0Y2hUb1Byb3BzIiwic3RhdGUiLCJkZWZhdWx0VXNlckFjdGlvbnMiLCJnZXREaXNwYXRjaCIsImdldFVzZXJBY3Rpb25zIiwiYWN0aW9ucyIsIm1ha2VHZXRBY3Rpb25DcmVhdG9ycyIsInVzZXJBY3Rpb25zIiwiVmlzU3RhdGVBY3Rpb25zIiwiTWFwU3RhdGVBY3Rpb25zIiwiTWFwU3R5bGVBY3Rpb25zIiwiVUlTdGF0ZUFjdGlvbnMiLCJQcm92aWRlckFjdGlvbnMiLCJtZXJnZUFjdGlvbnMiLCJnZXRBY3Rpb25DcmVhdG9ycyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm93blByb3BzIiwiZ3JvdXBlZEFjdGlvbkNyZWF0b3JzIiwib3ZlcnJpZGVzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztB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TUFBQUEsY0FBYyxFQUFkQSxjQUpLO0FBS0xDLE1BQUFBLGVBQWUsRUFBZkEsZUFMSztBQU1MQyxNQUFBQSxRQUFRLEVBQVJBO0FBTkssS0FBUDtBQVFELEdBakJNLENBQVA7QUFrQkQ7O0FBRUQsU0FBU2dFLHNCQUFULEdBQWtDO0FBQ2hDLE1BQU1jLGlCQUFpQixHQUFHUixxQkFBcUIsRUFBL0M7O0FBQ0EsTUFBTVMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDL0UsUUFBRCxFQUFXZ0YsUUFBWCxFQUF3QjtBQUNqRCxRQUFNQyxxQkFBcUIsR0FBR0gsaUJBQWlCLENBQUM5RSxRQUFELEVBQVdnRixRQUFYLENBQS9DO0FBRUEsNkJBQ0tDLHFCQURMO0FBRUVqRixNQUFBQSxRQUFRLEVBQVJBO0FBRkY7QUFJRCxHQVBEOztBQVNBLFNBQU8rRSxrQkFBUDtBQUNEO0FBRUQ7Ozs7O0FBR0EsU0FBU0YsWUFBVCxDQUFzQlIsT0FBdEIsRUFBK0JFLFdBQS9CLEVBQTRDO0FBQzFDLE1BQU1XLFNBQVMsR0FBRyxFQUFsQjs7QUFDQSxPQUFLLElBQU1DLEdBQVgsSUFBa0JaLFdBQWxCLEVBQStCO0FBQzdCLFFBQUlBLFdBQVcsQ0FBQ2EsY0FBWixDQUEyQkQsR0FBM0IsS0FBbUNkLE9BQU8sQ0FBQ2UsY0FBUixDQUF1QkQsR0FBdkIsQ0FBdkMsRUFBb0U7QUFDbEVELE1BQUFBLFNBQVMsQ0FBQ0MsR0FBRCxDQUFULEdBQWlCWixXQUFXLENBQUNZLEdBQUQsQ0FBNUI7QUFDRDtBQUNGOztBQUVELDJCQUFXZCxPQUFYLE1BQXVCYSxTQUF2QjtBQUNEOztlQUVjckssZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgY3JlYXRlUmVmfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHN0eWxlZCwge1RoZW1lUHJvdmlkZXIsIHdpdGhUaGVtZX0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtjb25uZWN0IGFzIGtlcGxlckdsQ29ubmVjdH0gZnJvbSAnY29ubmVjdC9rZXBsZXJnbC1jb25uZWN0JztcbmltcG9ydCB7SW50bFByb3ZpZGVyfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7bWVzc2FnZXN9IGZyb20gJy4uL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge1Jvb3RDb250ZXh0fSBmcm9tICdjb21wb25lbnRzL2NvbnRleHQnO1xuXG5pbXBvcnQgKiBhcyBWaXNTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy92aXMtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdHlsZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3R5bGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBVSVN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3VpLXN0YXRlLWFjdGlvbnMnO1xuaW1wb3J0ICogYXMgUHJvdmlkZXJBY3Rpb25zIGZyb20gJ2FjdGlvbnMvcHJvdmlkZXItYWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIEVYUE9SVF9JTUFHRV9JRCxcbiAgRElNRU5TSU9OUyxcbiAgS0VQTEVSX0dMX05BTUUsXG4gIEtFUExFUl9HTF9WRVJTSU9OLFxuICBUSEVNRSxcbiAgREVGQVVMVF9NQVBCT1hfQVBJX1VSTCxcbiAgU0FWRV9NQVBfSUQsXG4gIFNIQVJFX01BUF9JRCxcbiAgT1ZFUldSSVRFX01BUF9JRFxufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge01JU1NJTkdfTUFQQk9YX1RPS0VOfSBmcm9tICdjb25zdGFudHMvdXNlci1mZWVkYmFja3MnO1xuXG5pbXBvcnQgU2lkZVBhbmVsRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwnO1xuaW1wb3J0IE1hcENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9tYXAtY29udGFpbmVyJztcbmltcG9ydCBCb3R0b21XaWRnZXRGYWN0b3J5IGZyb20gJy4vYm90dG9tLXdpZGdldCc7XG5pbXBvcnQgTW9kYWxDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCBQbG90Q29udGFpbmVyRmFjdG9yeSBmcm9tICcuL3Bsb3QtY29udGFpbmVyJztcbmltcG9ydCBOb3RpZmljYXRpb25QYW5lbEZhY3RvcnkgZnJvbSAnLi9ub3RpZmljYXRpb24tcGFuZWwnO1xuaW1wb3J0IEdlb0NvZGVyUGFuZWxGYWN0b3J5IGZyb20gJy4vZ2VvY29kZXItcGFuZWwnO1xuXG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICd1dGlscy91dGlscyc7XG5pbXBvcnQge3ZhbGlkYXRlVG9rZW59IGZyb20gJ3V0aWxzL21hcGJveC11dGlscyc7XG5cbmltcG9ydCB7dGhlbWUgYXMgYmFzaWNUaGVtZSwgdGhlbWVMVCwgdGhlbWVCU30gZnJvbSAnc3R5bGVzL2Jhc2UnO1xuXG4vLyBNYXliZSB3ZSBzaG91bGQgdGhpbmsgYWJvdXQgZXhwb3J0aW5nIHRoaXMgb3IgY3JlYXRpbmcgYSB2YXJpYWJsZVxuLy8gYXMgcGFydCBvZiB0aGUgYmFzZS5qcyB0aGVtZVxuY29uc3QgR2xvYmFsU3R5bGUgPSBzdHlsZWQuZGl2YFxuICBmb250LWZhbWlseTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5mb250RmFtaWx5fTtcbiAgZm9udC13ZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udFdlaWdodH07XG4gIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5mb250U2l6ZX07XG4gIGxpbmUtaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxpbmVIZWlnaHR9O1xuXG4gICosXG4gICo6YmVmb3JlLFxuICAqOmFmdGVyIHtcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICB1bCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICBsaSB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICB9XG5gO1xuXG5LZXBsZXJHbEZhY3RvcnkuZGVwcyA9IFtcbiAgQm90dG9tV2lkZ2V0RmFjdG9yeSxcbiAgR2VvQ29kZXJQYW5lbEZhY3RvcnksXG4gIE1hcENvbnRhaW5lckZhY3RvcnksXG4gIE1vZGFsQ29udGFpbmVyRmFjdG9yeSxcbiAgU2lkZVBhbmVsRmFjdG9yeSxcbiAgUGxvdENvbnRhaW5lckZhY3RvcnksXG4gIE5vdGlmaWNhdGlvblBhbmVsRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gS2VwbGVyR2xGYWN0b3J5KFxuICBCb3R0b21XaWRnZXQsXG4gIEdlb0NvZGVyUGFuZWwsXG4gIE1hcENvbnRhaW5lcixcbiAgTW9kYWxDb250YWluZXIsXG4gIFNpZGVQYW5lbCxcbiAgUGxvdENvbnRhaW5lcixcbiAgTm90aWZpY2F0aW9uUGFuZWxcbikge1xuICBjbGFzcyBLZXBsZXJHTCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIG1hcFN0eWxlczogW10sXG4gICAgICBtYXBTdHlsZXNSZXBsYWNlRGVmYXVsdDogZmFsc2UsXG4gICAgICBtYXBib3hBcGlVcmw6IERFRkFVTFRfTUFQQk9YX0FQSV9VUkwsXG4gICAgICB3aWR0aDogODAwLFxuICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICBhcHBOYW1lOiBLRVBMRVJfR0xfTkFNRSxcbiAgICAgIHZlcnNpb246IEtFUExFUl9HTF9WRVJTSU9OLFxuICAgICAgc2lkZVBhbmVsV2lkdGg6IERJTUVOU0lPTlMuc2lkZVBhbmVsLndpZHRoLFxuICAgICAgdGhlbWU6IHt9LFxuICAgICAgY2xvdWRQcm92aWRlcnM6IFtdXG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGVNYXBib3hUb2tlbigpO1xuICAgICAgdGhpcy5fbG9hZE1hcFN0eWxlKHRoaXMucHJvcHMubWFwU3R5bGVzKTtcbiAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSh0aGlzLnByb3BzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIC8vIGlmIGRpbWVuc2lvbiBwcm9wcyBoYXMgY2hhbmdlZFxuICAgICAgICB0aGlzLnByb3BzLmhlaWdodCAhPT0gcHJldlByb3BzLmhlaWdodCB8fFxuICAgICAgICB0aGlzLnByb3BzLndpZHRoICE9PSBwcmV2UHJvcHMud2lkdGggfHxcbiAgICAgICAgLy8gcmVhY3QtbWFwLWdsIHdpbGwgZGlzcGF0Y2ggdXBkYXRlVmlld3BvcnQgYWZ0ZXIgdGhpcy5faGFuZGxlUmVzaXplIGlzIGNhbGxlZFxuICAgICAgICAvLyBoZXJlIHdlIGNoZWNrIGlmIHRoaXMucHJvcHMubWFwU3RhdGUuaGVpZ2h0IGlzIHN5bmMgd2l0aCBwcm9wcy5oZWlnaHRcbiAgICAgICAgdGhpcy5wcm9wcy5oZWlnaHQgIT09IHRoaXMucHJvcHMubWFwU3RhdGUuaGVpZ2h0XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKHRoaXMucHJvcHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJvb3QgPSBjcmVhdGVSZWYoKTtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBSb290Q29udGV4dDtcblxuICAgIC8qIHNlbGVjdG9ycyAqL1xuICAgIHRoZW1lU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy50aGVtZTtcbiAgICBhdmFpbGFibGVUaGVtZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IodGhpcy50aGVtZVNlbGVjdG9yLCB0aGVtZSA9PlxuICAgICAgdHlwZW9mIHRoZW1lID09PSAnb2JqZWN0J1xuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLmJhc2ljVGhlbWUsXG4gICAgICAgICAgICAuLi50aGVtZVxuICAgICAgICAgIH1cbiAgICAgICAgOiB0aGVtZSA9PT0gVEhFTUUubGlnaHRcbiAgICAgICAgPyB0aGVtZUxUXG4gICAgICAgIDogdGhlbWUgPT09IFRIRU1FLmJhc2VcbiAgICAgICAgPyB0aGVtZUJTXG4gICAgICAgIDogdGhlbWVcbiAgICApO1xuXG4gICAgYXZhaWxhYmxlUHJvdmlkZXJzID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICBwcm9wcyA9PiBwcm9wcy5jbG91ZFByb3ZpZGVycyxcbiAgICAgIHByb3ZpZGVycyA9PlxuICAgICAgICBBcnJheS5pc0FycmF5KHByb3ZpZGVycykgJiYgcHJvdmlkZXJzLmxlbmd0aFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBoYXNTdG9yYWdlOiBwcm92aWRlcnMuc29tZShwID0+IHAuaGFzUHJpdmF0ZVN0b3JhZ2UoKSksXG4gICAgICAgICAgICAgIGhhc1NoYXJlOiBwcm92aWRlcnMuc29tZShwID0+IHAuaGFzU2hhcmluZ1VybCgpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge31cbiAgICApO1xuXG4gICAgLyogcHJpdmF0ZSBtZXRob2RzICovXG4gICAgX3ZhbGlkYXRlTWFwYm94VG9rZW4oKSB7XG4gICAgICBjb25zdCB7bWFwYm94QXBpQWNjZXNzVG9rZW59ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmICghdmFsaWRhdGVUb2tlbihtYXBib3hBcGlBY2Nlc3NUb2tlbikpIHtcbiAgICAgICAgQ29uc29sZS53YXJuKE1JU1NJTkdfTUFQQk9YX1RPS0VOKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlUmVzaXplKHt3aWR0aCwgaGVpZ2h0fSkge1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICFOdW1iZXIuaXNGaW5pdGUoaGVpZ2h0KSkge1xuICAgICAgICBDb25zb2xlLndhcm4oJ3dpZHRoIGFuZCBoZWlnaHQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5tYXBTdGF0ZUFjdGlvbnMudXBkYXRlTWFwKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoIC8gKDEgKyBOdW1iZXIodGhpcy5wcm9wcy5tYXBTdGF0ZS5pc1NwbGl0KSksXG4gICAgICAgIGhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2xvYWRNYXBTdHlsZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucHJvcHMubWFwU3R5bGUubWFwU3R5bGVzKTtcbiAgICAgIC8vIGFkZCBpZCB0byBjdXN0b20gbWFwIHN0eWxlcyBpZiBub3QgZ2l2ZW5cbiAgICAgIGNvbnN0IGN1c3RvbVN0eWxlcyA9ICh0aGlzLnByb3BzLm1hcFN0eWxlcyB8fCBbXSkubWFwKG1zID0+ICh7XG4gICAgICAgIC4uLm1zLFxuICAgICAgICBpZDogbXMuaWQgfHwgZ2VuZXJhdGVIYXNoSWQoKVxuICAgICAgfSkpO1xuXG4gICAgICBjb25zdCBhbGxTdHlsZXMgPSBbLi4uY3VzdG9tU3R5bGVzLCAuLi5kZWZhdWx0U3R5bGVzXS5yZWR1Y2UoXG4gICAgICAgIChhY2N1LCBzdHlsZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhhc1N0eWxlT2JqZWN0ID0gc3R5bGUuc3R5bGUgJiYgdHlwZW9mIHN0eWxlLnN0eWxlID09PSAnb2JqZWN0JztcbiAgICAgICAgICBhY2N1W2hhc1N0eWxlT2JqZWN0ID8gJ3RvTG9hZCcgOiAndG9SZXF1ZXN0J11bc3R5bGUuaWRdID0gc3R5bGU7XG5cbiAgICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgICAgfSxcbiAgICAgICAge3RvTG9hZDoge30sIHRvUmVxdWVzdDoge319XG4gICAgICApO1xuXG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5sb2FkTWFwU3R5bGVzKGFsbFN0eWxlcy50b0xvYWQpO1xuICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZUFjdGlvbnMucmVxdWVzdE1hcFN0eWxlcyhhbGxTdHlsZXMudG9SZXF1ZXN0KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICAvLyBwcm9wc1xuICAgICAgICBpZCxcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgYXBwV2Vic2l0ZSxcbiAgICAgICAgb25TYXZlTWFwLFxuICAgICAgICBvblZpZXdTdGF0ZUNoYW5nZSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcGJveEFwaVVybCxcbiAgICAgICAgZ2V0TWFwYm94UmVmLFxuXG4gICAgICAgIC8vIHJlZHV4IHN0YXRlXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdmlzU3RhdGUsXG4gICAgICAgIHByb3ZpZGVyU3RhdGUsXG5cbiAgICAgICAgLy8gYWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHByb3ZpZGVyQWN0aW9ucyxcbiAgICAgICAgZGlzcGF0Y2hcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCBhdmFpbGFibGVQcm92aWRlcnMgPSB0aGlzLmF2YWlsYWJsZVByb3ZpZGVycyh0aGlzLnByb3BzKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIHNwbGl0TWFwcywgLy8gdGhpcyB3aWxsIHN0b3JlIHN1cHBvcnQgZm9yIHNwbGl0IG1hcCB2aWV3IGlzIG5lY2Vzc2FyeVxuICAgICAgICBsYXllck9yZGVyLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBsYXllckNsYXNzZXMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWQsXG4gICAgICAgIG1vdXNlUG9zLFxuICAgICAgICBhbmltYXRpb25Db25maWcsXG4gICAgICAgIG1hcEluZm9cbiAgICAgIH0gPSB2aXNTdGF0ZTtcblxuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUGFuZWxGaWVsZHMgPSB7XG4gICAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbjogdWlTdGF0ZUFjdGlvbnMucmVtb3ZlTm90aWZpY2F0aW9uLFxuICAgICAgICBub3RpZmljYXRpb25zOiB1aVN0YXRlLm5vdGlmaWNhdGlvbnNcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNpZGVGaWVsZHMgPSB7XG4gICAgICAgIGFwcE5hbWUsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIGFwcFdlYnNpdGUsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGxheWVyQ2xhc3NlcyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBJbmZvLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBvblNhdmVNYXAsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2lkZVBhbmVsV2lkdGgsXG4gICAgICAgIGF2YWlsYWJsZVByb3ZpZGVycyxcbiAgICAgICAgbWFwU2F2ZWQ6IHByb3ZpZGVyU3RhdGUubWFwU2F2ZWRcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1hcEZpZWxkcyA9IHtcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGdldE1hcGJveFJlZixcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcGJveEFwaVVybCxcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIGVkaXRvcjogdmlzU3RhdGUuZWRpdG9yLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbWFwQ29udHJvbHM6IHVpU3RhdGUubWFwQ29udHJvbHMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgaG92ZXJJbmZvLFxuICAgICAgICBjbGlja2VkLFxuICAgICAgICBtb3VzZVBvcyxcbiAgICAgICAgcmVhZE9ubHk6IHVpU3RhdGUucmVhZE9ubHksXG4gICAgICAgIG9uVmlld1N0YXRlQ2hhbmdlLFxuICAgICAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIGFuaW1hdGlvbkNvbmZpZ1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNTcGxpdCA9IHNwbGl0TWFwcyAmJiBzcGxpdE1hcHMubGVuZ3RoID4gMTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclcgPSBtYXBTdGF0ZS53aWR0aCAqIChOdW1iZXIoaXNTcGxpdCkgKyAxKTtcblxuICAgICAgY29uc3QgbWFwQ29udGFpbmVycyA9ICFpc1NwbGl0XG4gICAgICAgID8gWzxNYXBDb250YWluZXIga2V5PXswfSBpbmRleD17MH0gey4uLm1hcEZpZWxkc30gbWFwTGF5ZXJzPXtudWxsfSAvPl1cbiAgICAgICAgOiBzcGxpdE1hcHMubWFwKChzZXR0aW5ncywgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxNYXBDb250YWluZXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICB7Li4ubWFwRmllbGRzfVxuICAgICAgICAgICAgICBtYXBMYXllcnM9e3NwbGl0TWFwc1tpbmRleF0ubGF5ZXJzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKTtcblxuICAgICAgY29uc3QgaXNFeHBvcnRpbmcgPVxuICAgICAgICB1aVN0YXRlLmN1cnJlbnRNb2RhbCA9PT0gRVhQT1JUX0lNQUdFX0lEIHx8XG4gICAgICAgIHVpU3RhdGUuY3VycmVudE1vZGFsID09PSBTQVZFX01BUF9JRCB8fFxuICAgICAgICB1aVN0YXRlLmN1cnJlbnRNb2RhbCA9PT0gU0hBUkVfTUFQX0lEIHx8XG4gICAgICAgIHVpU3RhdGUuY3VycmVudE1vZGFsID09PSBPVkVSV1JJVEVfTUFQX0lEO1xuXG4gICAgICBjb25zdCB0aGVtZSA9IHRoaXMuYXZhaWxhYmxlVGhlbWVTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFJvb3RDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt0aGlzLnJvb3R9PlxuICAgICAgICAgIDxJbnRsUHJvdmlkZXIgbG9jYWxlPXt1aVN0YXRlLmxvY2FsZX0gbWVzc2FnZXM9e21lc3NhZ2VzW3VpU3RhdGUubG9jYWxlXX0+XG4gICAgICAgICAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgICAgICA8R2xvYmFsU3R5bGVcbiAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwia2VwbGVyLWdsXCJcbiAgICAgICAgICAgICAgICBpZD17YGtlcGxlci1nbF9fJHtpZH1gfVxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5yb290fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPE5vdGlmaWNhdGlvblBhbmVsIHsuLi5ub3RpZmljYXRpb25QYW5lbEZpZWxkc30gLz5cbiAgICAgICAgICAgICAgICB7IXVpU3RhdGUucmVhZE9ubHkgJiYgPFNpZGVQYW5lbCB7Li4uc2lkZUZpZWxkc30gLz59XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXBzXCIgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCd9fT5cbiAgICAgICAgICAgICAgICAgIHttYXBDb250YWluZXJzfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtpc0V4cG9ydGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICA8UGxvdENvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICBleHBvcnRJbWFnZVNldHRpbmc9e3VpU3RhdGUuZXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgIG1hcEZpZWxkcz17bWFwRmllbGRzfVxuICAgICAgICAgICAgICAgICAgICBhZGROb3RpZmljYXRpb249e3VpU3RhdGVBY3Rpb25zLmFkZE5vdGlmaWNhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFeHBvcnRpbmdJbWFnZT17dWlTdGF0ZUFjdGlvbnMuc3RhcnRFeHBvcnRpbmdJbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgc2V0RXhwb3J0SW1hZ2VEYXRhVXJpPXt1aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRJbWFnZURhdGFVcml9XG4gICAgICAgICAgICAgICAgICAgIHNldEV4cG9ydEltYWdlRXJyb3I9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlRXJyb3J9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgeyF1aVN0YXRlLnJlYWRPbmx5ICYmIGludGVyYWN0aW9uQ29uZmlnLmdlb2NvZGVyLmVuYWJsZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgPEdlb0NvZGVyUGFuZWxcbiAgICAgICAgICAgICAgICAgICAgaXNHZW9jb2RlckVuYWJsZWQ9e2ludGVyYWN0aW9uQ29uZmlnLmdlb2NvZGVyLmVuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuPXttYXBib3hBcGlBY2Nlc3NUb2tlbn1cbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2g9e2Rpc3BhdGNofVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxCb3R0b21XaWRnZXRcbiAgICAgICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgICB1aVN0YXRlPXt1aVN0YXRlfVxuICAgICAgICAgICAgICAgICAgbGF5ZXJzPXtsYXllcnN9XG4gICAgICAgICAgICAgICAgICBhbmltYXRpb25Db25maWc9e2FuaW1hdGlvbkNvbmZpZ31cbiAgICAgICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgc2lkZVBhbmVsV2lkdGg9e1xuICAgICAgICAgICAgICAgICAgICB1aVN0YXRlLnJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNpZGVQYW5lbFdpZHRoICsgRElNRU5TSU9OUy5zaWRlUGFuZWwubWFyZ2luLmxlZnRcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8TW9kYWxDb250YWluZXJcbiAgICAgICAgICAgICAgICAgIG1hcFN0eWxlPXttYXBTdHlsZX1cbiAgICAgICAgICAgICAgICAgIHZpc1N0YXRlPXt2aXNTdGF0ZX1cbiAgICAgICAgICAgICAgICAgIG1hcFN0YXRlPXttYXBTdGF0ZX1cbiAgICAgICAgICAgICAgICAgIHVpU3RhdGU9e3VpU3RhdGV9XG4gICAgICAgICAgICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbj17bWFwYm94QXBpQWNjZXNzVG9rZW59XG4gICAgICAgICAgICAgICAgICBtYXBib3hBcGlVcmw9e21hcGJveEFwaVVybH1cbiAgICAgICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgdWlTdGF0ZUFjdGlvbnM9e3VpU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgbWFwU3R5bGVBY3Rpb25zPXttYXBTdHlsZUFjdGlvbnN9XG4gICAgICAgICAgICAgICAgICBwcm92aWRlckFjdGlvbnM9e3Byb3ZpZGVyQWN0aW9uc31cbiAgICAgICAgICAgICAgICAgIHJvb3ROb2RlPXt0aGlzLnJvb3QuY3VycmVudH1cbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAgICAgICBjb250YWluZXJIPXttYXBTdGF0ZS5oZWlnaHR9XG4gICAgICAgICAgICAgICAgICBwcm92aWRlclN0YXRlPXt0aGlzLnByb3BzLnByb3ZpZGVyU3RhdGV9XG4gICAgICAgICAgICAgICAgICAvLyBVc2VyIGRlZmluZWQgY2xvdWQgcHJvdmlkZXIgcHJvcHNcbiAgICAgICAgICAgICAgICAgIGNsb3VkUHJvdmlkZXJzPXt0aGlzLnByb3BzLmNsb3VkUHJvdmlkZXJzfVxuICAgICAgICAgICAgICAgICAgb25FeHBvcnRUb0Nsb3VkU3VjY2Vzcz17dGhpcy5wcm9wcy5vbkV4cG9ydFRvQ2xvdWRTdWNjZXNzfVxuICAgICAgICAgICAgICAgICAgb25Mb2FkQ2xvdWRNYXBTdWNjZXNzPXt0aGlzLnByb3BzLm9uTG9hZENsb3VkTWFwU3VjY2Vzc31cbiAgICAgICAgICAgICAgICAgIG9uTG9hZENsb3VkTWFwRXJyb3I9e3RoaXMucHJvcHMub25Mb2FkQ2xvdWRNYXBFcnJvcn1cbiAgICAgICAgICAgICAgICAgIG9uRXhwb3J0VG9DbG91ZEVycm9yPXt0aGlzLnByb3BzLm9uRXhwb3J0VG9DbG91ZEVycm9yfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvR2xvYmFsU3R5bGU+XG4gICAgICAgICAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICAgICAgICAgPC9JbnRsUHJvdmlkZXI+XG4gICAgICAgIDwvUm9vdENvbnRleHQuUHJvdmlkZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBrZXBsZXJHbENvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYWtlTWFwRGlzcGF0Y2hUb1Byb3BzKSh3aXRoVGhlbWUoS2VwbGVyR0wpKTtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlID0ge30sIHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgdmlzU3RhdGU6IHN0YXRlLnZpc1N0YXRlLFxuICAgIG1hcFN0eWxlOiBzdGF0ZS5tYXBTdHlsZSxcbiAgICBtYXBTdGF0ZTogc3RhdGUubWFwU3RhdGUsXG4gICAgdWlTdGF0ZTogc3RhdGUudWlTdGF0ZSxcbiAgICBwcm92aWRlclN0YXRlOiBzdGF0ZS5wcm92aWRlclN0YXRlXG4gIH07XG59XG5cbmNvbnN0IGRlZmF1bHRVc2VyQWN0aW9ucyA9IHt9O1xuY29uc3QgZ2V0RGlzcGF0Y2ggPSBkaXNwYXRjaCA9PiBkaXNwYXRjaDtcbmNvbnN0IGdldFVzZXJBY3Rpb25zID0gKGRpc3BhdGNoLCBwcm9wcykgPT4gcHJvcHMuYWN0aW9ucyB8fCBkZWZhdWx0VXNlckFjdGlvbnM7XG5cbmZ1bmN0aW9uIG1ha2VHZXRBY3Rpb25DcmVhdG9ycygpIHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yKFtnZXREaXNwYXRjaCwgZ2V0VXNlckFjdGlvbnNdLCAoZGlzcGF0Y2gsIHVzZXJBY3Rpb25zKSA9PiB7XG4gICAgY29uc3QgW3Zpc1N0YXRlQWN0aW9ucywgbWFwU3RhdGVBY3Rpb25zLCBtYXBTdHlsZUFjdGlvbnMsIHVpU3RhdGVBY3Rpb25zLCBwcm92aWRlckFjdGlvbnNdID0gW1xuICAgICAgVmlzU3RhdGVBY3Rpb25zLFxuICAgICAgTWFwU3RhdGVBY3Rpb25zLFxuICAgICAgTWFwU3R5bGVBY3Rpb25zLFxuICAgICAgVUlTdGF0ZUFjdGlvbnMsXG4gICAgICBQcm92aWRlckFjdGlvbnNcbiAgICBdLm1hcChhY3Rpb25zID0+IGJpbmRBY3Rpb25DcmVhdG9ycyhtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpLCBkaXNwYXRjaCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgcHJvdmlkZXJBY3Rpb25zLFxuICAgICAgZGlzcGF0Y2hcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbWFrZU1hcERpc3BhdGNoVG9Qcm9wcygpIHtcbiAgY29uc3QgZ2V0QWN0aW9uQ3JlYXRvcnMgPSBtYWtlR2V0QWN0aW9uQ3JlYXRvcnMoKTtcbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IGdyb3VwZWRBY3Rpb25DcmVhdG9ycyA9IGdldEFjdGlvbkNyZWF0b3JzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZ3JvdXBlZEFjdGlvbkNyZWF0b3JzLFxuICAgICAgZGlzcGF0Y2hcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBtYXBEaXNwYXRjaFRvUHJvcHM7XG59XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCBrZXBsZXIuZ2wgYWN0aW9ucyB3aXRoIHVzZXIgZGVmaW5lZCBhY3Rpb25zIHVzaW5nIHRoZSBzYW1lIGtleVxuICovXG5mdW5jdGlvbiBtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVzID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHVzZXJBY3Rpb25zKSB7XG4gICAgaWYgKHVzZXJBY3Rpb25zLmhhc093blByb3BlcnR5KGtleSkgJiYgYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBvdmVycmlkZXNba2V5XSA9IHVzZXJBY3Rpb25zW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsuLi5hY3Rpb25zLCAuLi5vdmVycmlkZXN9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJHbEZhY3Rvcnk7XG4iXX0=