"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EditorFactory;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactMapGlDraw = require("react-map-gl-draw");

var _window = _interopRequireDefault(require("global/window"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _defaultSettings = require("../../constants/default-settings");

var _featureActionPanel = _interopRequireDefault(require("./feature-action-panel"));

var _featureStyles = require("./feature-styles");

var _handleStyle = require("./handle-style");

var _constants = require("../../constants");

var _reselect = require("reselect");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  cursor: ", ";\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DELETE_KEY_EVENT_CODE = 46;
var BACKSPACE_KEY_EVENT_CODE = 8;
var ESCAPE_KEY_EVENT_CODE = 27;

var StyledWrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.editor.mode === _constants.EDITOR_MODES.EDIT ? 'pointer' : 'crosshair';
});

var editorLayerFilter = function editorLayerFilter(layer) {
  return _defaultSettings.EDITOR_AVAILABLE_LAYERS.includes(layer.type);
};

EditorFactory.deps = [_featureActionPanel["default"]];

function EditorFactory(FeatureActionPanel) {
  var Editor =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(Editor, _Component);

    function Editor() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, Editor);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Editor)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        showActions: false,
        lastPosition: null
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerSelector", function (props) {
        return props.layers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersToRenderSelector", function (props) {
        return props.layersToRender;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filterSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "selectedFeatureIdSelector", function (props) {
        return (0, _lodash["default"])(props, ['editor', 'selectedFeature', 'id']);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "editorFeatureSelector", function (props) {
        return (0, _lodash["default"])(props, ['editor', 'features']);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "currentFilterSelector", (0, _reselect.createSelector)(_this.filterSelector, _this.selectedFeatureIdSelector, function (filters, selectedFeatureId) {
        return filters.find(function (f) {
          return f.value && f.value.id === selectedFeatureId;
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableLayersSeletor", (0, _reselect.createSelector)(_this.layerSelector, _this.layersToRenderSelector, function (layers, layersToRender) {
        return layers.filter(editorLayerFilter).filter(function (layer) {
          return layersToRender[layer.id];
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "allFeaturesSelector", (0, _reselect.createSelector)(_this.filterSelector, _this.editorFeatureSelector, function (filters, editorFeatures) {
        return filters.filter(function (f) {
          return f.type === _defaultSettings.FILTER_TYPES.polygon;
        }).map(function (f) {
          return f.value;
        }).concat(editorFeatures);
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyPressed", function (event) {
        var isEnabled = _this.props.isEnabled;

        if (!isEnabled) {
          return;
        }

        switch (event.which) {
          case DELETE_KEY_EVENT_CODE:
          case BACKSPACE_KEY_EVENT_CODE:
            _this._onDeleteSelectedFeature();

            break;

          case ESCAPE_KEY_EVENT_CODE:
            _this.props.onSelect(null);

            break;

          default:
            break;
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSelect", function (_ref) {
        var selectedFeatureId = _ref.selectedFeatureId,
            sourceEvent = _ref.sourceEvent;

        var allFeatures = _this.allFeaturesSelector(_this.props);

        _this.setState(_objectSpread({}, sourceEvent.rightButton ? {
          showActions: true,
          lastPosition: {
            x: sourceEvent.changedPointers[0].offsetX,
            y: sourceEvent.changedPointers[0].offsetY
          }
        } : null), function () {
          _this.props.onSelect(allFeatures.find(function (f) {
            return f.id === selectedFeatureId;
          }));
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDeleteSelectedFeature", function () {
        if (_this.state.showActions) {
          _this.setState({
            showActions: false
          });
        }

        var editor = _this.props.editor;
        var _editor$selectedFeatu = editor.selectedFeature,
            selectedFeature = _editor$selectedFeatu === void 0 ? {} : _editor$selectedFeatu;

        _this.props.onDeleteFeature(selectedFeature);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_closeFeatureAction", function () {
        _this.setState({
          showActions: false
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onToggleLayer", function (layer) {
        var selectedFeature = _this.props.editor.selectedFeature;

        if (!selectedFeature) {
          return;
        }

        _this.props.onTogglePolygonFilter(layer, selectedFeature);
      });
      return _this;
    }

    (0, _createClass2["default"])(Editor, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        _window["default"].addEventListener('keydown', this._onKeyPressed);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        _window["default"].removeEventListener('keydown', this._onKeyPressed);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            className = _this$props.className,
            clickRadius = _this$props.clickRadius,
            datasets = _this$props.datasets,
            editor = _this$props.editor,
            onUpdate = _this$props.onUpdate,
            style = _this$props.style;
        var _this$state = this.state,
            lastPosition = _this$state.lastPosition,
            showActions = _this$state.showActions;
        var selectedFeatureId = (0, _lodash["default"])(editor, ['selectedFeature', 'id']);
        var currentFilter = this.currentFilterSelector(this.props);
        var availableLayers = this.availableLayersSeletor(this.props);
        var allFeatures = this.allFeaturesSelector(this.props);
        return _react["default"].createElement(StyledWrapper, {
          editor: editor,
          className: (0, _classnames["default"])('editor', className),
          style: style
        }, _react["default"].createElement(_reactMapGlDraw.Editor, {
          clickRadius: clickRadius,
          mode: editor.mode,
          features: allFeatures,
          selectedFeatureId: selectedFeatureId,
          onSelect: this._onSelect,
          onUpdate: onUpdate,
          getEditHandleShape: _handleStyle.getEditHandleShape,
          getFeatureStyle: _featureStyles.getStyle,
          getEditHandleStyle: _handleStyle.getStyle
        }), showActions && Boolean(selectedFeatureId) ? _react["default"].createElement(FeatureActionPanel, {
          datasets: datasets,
          layers: availableLayers,
          currentFilter: currentFilter,
          onClose: this._closeFeatureAction,
          onDeleteFeature: this._onDeleteSelectedFeature,
          onToggleLayer: this._onToggleLayer,
          position: lastPosition
        }) : null);
      }
    }]);
    return Editor;
  }(_react.Component);

  (0, _defineProperty2["default"])(Editor, "propTypes", {
    filters: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
    datasets: _propTypes["default"].object.isRequired,
    editor: _propTypes["default"].object.isRequired,
    layersToRender: _propTypes["default"].object.isRequired,
    onSelect: _propTypes["default"].func.isRequired,
    onUpdate: _propTypes["default"].func.isRequired,
    onDeleteFeature: _propTypes["default"].func.isRequired,
    onTogglePolygonFilter: _propTypes["default"].func.isRequired,
    index: _propTypes["default"].number,
    classnames: _propTypes["default"].string,
    clickRadius: _propTypes["default"].number,
    isEnabled: _propTypes["default"].bool
  });
  (0, _defineProperty2["default"])(Editor, "defaultProps", {
    clickRadius: _featureStyles.DEFAULT_RADIUS
  });
  Editor.displayName = 'Editor';
  return Editor;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci9lZGl0b3IuanMiXSwibmFtZXMiOlsiREVMRVRFX0tFWV9FVkVOVF9DT0RFIiwiQkFDS1NQQUNFX0tFWV9FVkVOVF9DT0RFIiwiRVNDQVBFX0tFWV9FVkVOVF9DT0RFIiwiU3R5bGVkV3JhcHBlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiZWRpdG9yIiwibW9kZSIsIkVESVRPUl9NT0RFUyIsIkVESVQiLCJlZGl0b3JMYXllckZpbHRlciIsImxheWVyIiwiRURJVE9SX0FWQUlMQUJMRV9MQVlFUlMiLCJpbmNsdWRlcyIsInR5cGUiLCJFZGl0b3JGYWN0b3J5IiwiZGVwcyIsIkZlYXR1cmVBY3Rpb25QYW5lbEZhY3RvcnkiLCJGZWF0dXJlQWN0aW9uUGFuZWwiLCJFZGl0b3IiLCJzaG93QWN0aW9ucyIsImxhc3RQb3NpdGlvbiIsImxheWVycyIsImxheWVyc1RvUmVuZGVyIiwiZmlsdGVycyIsImZpbHRlclNlbGVjdG9yIiwic2VsZWN0ZWRGZWF0dXJlSWRTZWxlY3RvciIsInNlbGVjdGVkRmVhdHVyZUlkIiwiZmluZCIsImYiLCJ2YWx1ZSIsImlkIiwibGF5ZXJTZWxlY3RvciIsImxheWVyc1RvUmVuZGVyU2VsZWN0b3IiLCJmaWx0ZXIiLCJlZGl0b3JGZWF0dXJlU2VsZWN0b3IiLCJlZGl0b3JGZWF0dXJlcyIsIkZJTFRFUl9UWVBFUyIsInBvbHlnb24iLCJtYXAiLCJjb25jYXQiLCJldmVudCIsImlzRW5hYmxlZCIsIndoaWNoIiwiX29uRGVsZXRlU2VsZWN0ZWRGZWF0dXJlIiwib25TZWxlY3QiLCJzb3VyY2VFdmVudCIsImFsbEZlYXR1cmVzIiwiYWxsRmVhdHVyZXNTZWxlY3RvciIsInNldFN0YXRlIiwicmlnaHRCdXR0b24iLCJ4IiwiY2hhbmdlZFBvaW50ZXJzIiwib2Zmc2V0WCIsInkiLCJvZmZzZXRZIiwic3RhdGUiLCJzZWxlY3RlZEZlYXR1cmUiLCJvbkRlbGV0ZUZlYXR1cmUiLCJvblRvZ2dsZVBvbHlnb25GaWx0ZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiX29uS2V5UHJlc3NlZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjbGFzc05hbWUiLCJjbGlja1JhZGl1cyIsImRhdGFzZXRzIiwib25VcGRhdGUiLCJzdHlsZSIsImN1cnJlbnRGaWx0ZXIiLCJjdXJyZW50RmlsdGVyU2VsZWN0b3IiLCJhdmFpbGFibGVMYXllcnMiLCJhdmFpbGFibGVMYXllcnNTZWxldG9yIiwiX29uU2VsZWN0IiwiZ2V0RWRpdEhhbmRsZVNoYXBlIiwiZ2V0RmVhdHVyZVN0eWxlIiwiZ2V0RWRpdEhhbmRsZVN0eWxlIiwiQm9vbGVhbiIsIl9jbG9zZUZlYXR1cmVBY3Rpb24iLCJfb25Ub2dnbGVMYXllciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImluZGV4IiwibnVtYmVyIiwiY2xhc3NuYW1lcyIsInN0cmluZyIsImJvb2wiLCJERUZBVUxUX1JBRElVUyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxxQkFBcUIsR0FBRyxFQUE5QjtBQUNBLElBQU1DLHdCQUF3QixHQUFHLENBQWpDO0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsRUFBOUI7O0FBRUEsSUFBTUMsYUFBYSxHQUFHQyw2QkFBT0MsR0FBVixvQkFDUCxVQUFBQyxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDQyxNQUFOLENBQWFDLElBQWIsS0FBc0JDLHdCQUFhQyxJQUFuQyxHQUEwQyxTQUExQyxHQUFzRCxXQUEzRDtBQUFBLENBREUsQ0FBbkI7O0FBS0EsSUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFB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RCxzQkFBVUUsTUFBNUIsRUFBb0NDLFVBRjNCO0FBR2pCbEIsSUFBQUEsUUFBUSxFQUFFZSxzQkFBVUUsTUFBVixDQUFpQkMsVUFIVjtBQUlqQjlFLElBQUFBLE1BQU0sRUFBRTJFLHNCQUFVRSxNQUFWLENBQWlCQyxVQUpSO0FBS2pCN0QsSUFBQUEsY0FBYyxFQUFFMEQsc0JBQVVFLE1BQVYsQ0FBaUJDLFVBTGhCO0FBTWpCdkMsSUFBQUEsUUFBUSxFQUFFb0Msc0JBQVVJLElBQVYsQ0FBZUQsVUFOUjtBQU9qQmpCLElBQUFBLFFBQVEsRUFBRWMsc0JBQVVJLElBQVYsQ0FBZUQsVUFQUjtBQVFqQjFCLElBQUFBLGVBQWUsRUFBRXVCLHNCQUFVSSxJQUFWLENBQWVELFVBUmY7QUFTakJ6QixJQUFBQSxxQkFBcUIsRUFBRXNCLHNCQUFVSSxJQUFWLENBQWVELFVBVHJCO0FBV2pCRSxJQUFBQSxLQUFLLEVBQUVMLHNCQUFVTSxNQVhBO0FBWWpCQyxJQUFBQSxVQUFVLEVBQUVQLHNCQUFVUSxNQVpMO0FBYWpCeEIsSUFBQUEsV0FBVyxFQUFFZ0Isc0JBQVVNLE1BYk47QUFjakI3QyxJQUFBQSxTQUFTLEVBQUV1QyxzQkFBVVM7QUFkSixHQUZtQztBQUFBLG1DQUNsRHZFLE1BRGtELGtCQW1CaEM7QUFDcEI4QyxJQUFBQSxXQUFXLEVBQUUwQjtBQURPLEdBbkJnQztBQXdLeER4RSxFQUFBQSxNQUFNLENBQUN5RSxXQUFQLEdBQXFCLFFBQXJCO0FBRUEsU0FBT3pFLE1BQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtFZGl0b3IgYXMgRHJhd30gZnJvbSAncmVhY3QtbWFwLWdsLWRyYXcnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0JztcblxuaW1wb3J0IHtFRElUT1JfQVZBSUxBQkxFX0xBWUVSU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IEZlYXR1cmVBY3Rpb25QYW5lbEZhY3RvcnkgZnJvbSAnLi9mZWF0dXJlLWFjdGlvbi1wYW5lbCc7XG5pbXBvcnQge0ZJTFRFUl9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge0RFRkFVTFRfUkFESVVTLCBnZXRTdHlsZSBhcyBnZXRGZWF0dXJlU3R5bGV9IGZyb20gJy4vZmVhdHVyZS1zdHlsZXMnO1xuaW1wb3J0IHtnZXRTdHlsZSBhcyBnZXRFZGl0SGFuZGxlU3R5bGUsIGdldEVkaXRIYW5kbGVTaGFwZX0gZnJvbSAnLi9oYW5kbGUtc3R5bGUnO1xuaW1wb3J0IHtFRElUT1JfTU9ERVN9IGZyb20gJ2NvbnN0YW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmNvbnN0IERFTEVURV9LRVlfRVZFTlRfQ09ERSA9IDQ2O1xuY29uc3QgQkFDS1NQQUNFX0tFWV9FVkVOVF9DT0RFID0gODtcbmNvbnN0IEVTQ0FQRV9LRVlfRVZFTlRfQ09ERSA9IDI3O1xuXG5jb25zdCBTdHlsZWRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgY3Vyc29yOiAke3Byb3BzID0+IChwcm9wcy5lZGl0b3IubW9kZSA9PT0gRURJVE9SX01PREVTLkVESVQgPyAncG9pbnRlcicgOiAnY3Jvc3NoYWlyJyl9O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5jb25zdCBlZGl0b3JMYXllckZpbHRlciA9IGxheWVyID0+IEVESVRPUl9BVkFJTEFCTEVfTEFZRVJTLmluY2x1ZGVzKGxheWVyLnR5cGUpO1xuXG5FZGl0b3JGYWN0b3J5LmRlcHMgPSBbRmVhdHVyZUFjdGlvblBhbmVsRmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVkaXRvckZhY3RvcnkoRmVhdHVyZUFjdGlvblBhbmVsKSB7XG4gIGNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGZpbHRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWQsXG4gICAgICBsYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgZWRpdG9yOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllcnNUb1JlbmRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBvblVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIG9uRGVsZXRlRmVhdHVyZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIG9uVG9nZ2xlUG9seWdvbkZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBjbGFzc25hbWVzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgY2xpY2tSYWRpdXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBpc0VuYWJsZWQ6IFByb3BUeXBlcy5ib29sXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBjbGlja1JhZGl1czogREVGQVVMVF9SQURJVVNcbiAgICB9O1xuXG4gICAgc3RhdGUgPSB7XG4gICAgICBzaG93QWN0aW9uczogZmFsc2UsXG4gICAgICBsYXN0UG9zaXRpb246IG51bGxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5UHJlc3NlZCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5UHJlc3NlZCk7XG4gICAgfVxuXG4gICAgbGF5ZXJTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmxheWVycztcbiAgICBsYXllcnNUb1JlbmRlclNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMubGF5ZXJzVG9SZW5kZXI7XG4gICAgZmlsdGVyU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXJzO1xuICAgIHNlbGVjdGVkRmVhdHVyZUlkU2VsZWN0b3IgPSBwcm9wcyA9PiBnZXQocHJvcHMsIFsnZWRpdG9yJywgJ3NlbGVjdGVkRmVhdHVyZScsICdpZCddKTtcbiAgICBlZGl0b3JGZWF0dXJlU2VsZWN0b3IgPSBwcm9wcyA9PiBnZXQocHJvcHMsIFsnZWRpdG9yJywgJ2ZlYXR1cmVzJ10pO1xuXG4gICAgY3VycmVudEZpbHRlclNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmZpbHRlclNlbGVjdG9yLFxuICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmVJZFNlbGVjdG9yLFxuICAgICAgKGZpbHRlcnMsIHNlbGVjdGVkRmVhdHVyZUlkKSA9PiBmaWx0ZXJzLmZpbmQoZiA9PiBmLnZhbHVlICYmIGYudmFsdWUuaWQgPT09IHNlbGVjdGVkRmVhdHVyZUlkKVxuICAgICk7XG5cbiAgICBhdmFpbGFibGVMYXllcnNTZWxldG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyU2VsZWN0b3IsXG4gICAgICB0aGlzLmxheWVyc1RvUmVuZGVyU2VsZWN0b3IsXG4gICAgICAobGF5ZXJzLCBsYXllcnNUb1JlbmRlcikgPT5cbiAgICAgICAgbGF5ZXJzLmZpbHRlcihlZGl0b3JMYXllckZpbHRlcikuZmlsdGVyKGxheWVyID0+IHtcbiAgICAgICAgICByZXR1cm4gbGF5ZXJzVG9SZW5kZXJbbGF5ZXIuaWRdO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICBhbGxGZWF0dXJlc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmZpbHRlclNlbGVjdG9yLFxuICAgICAgdGhpcy5lZGl0b3JGZWF0dXJlU2VsZWN0b3IsXG4gICAgICAoZmlsdGVycywgZWRpdG9yRmVhdHVyZXMpID0+XG4gICAgICAgIGZpbHRlcnNcbiAgICAgICAgICAuZmlsdGVyKGYgPT4gZi50eXBlID09PSBGSUxURVJfVFlQRVMucG9seWdvbilcbiAgICAgICAgICAubWFwKGYgPT4gZi52YWx1ZSlcbiAgICAgICAgICAuY29uY2F0KGVkaXRvckZlYXR1cmVzKVxuICAgICk7XG5cbiAgICBfb25LZXlQcmVzc2VkID0gZXZlbnQgPT4ge1xuICAgICAgY29uc3Qge2lzRW5hYmxlZH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSBERUxFVEVfS0VZX0VWRU5UX0NPREU6XG4gICAgICAgIGNhc2UgQkFDS1NQQUNFX0tFWV9FVkVOVF9DT0RFOlxuICAgICAgICAgIHRoaXMuX29uRGVsZXRlU2VsZWN0ZWRGZWF0dXJlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRVNDQVBFX0tFWV9FVkVOVF9DT0RFOlxuICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QobnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9vblNlbGVjdCA9ICh7c2VsZWN0ZWRGZWF0dXJlSWQsIHNvdXJjZUV2ZW50fSkgPT4ge1xuICAgICAgY29uc3QgYWxsRmVhdHVyZXMgPSB0aGlzLmFsbEZlYXR1cmVzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgLi4uKHNvdXJjZUV2ZW50LnJpZ2h0QnV0dG9uXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBzaG93QWN0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgIHg6IHNvdXJjZUV2ZW50LmNoYW5nZWRQb2ludGVyc1swXS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgeTogc291cmNlRXZlbnQuY2hhbmdlZFBvaW50ZXJzWzBdLm9mZnNldFlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbClcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoYWxsRmVhdHVyZXMuZmluZChmID0+IGYuaWQgPT09IHNlbGVjdGVkRmVhdHVyZUlkKSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIF9vbkRlbGV0ZVNlbGVjdGVkRmVhdHVyZSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNob3dBY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dBY3Rpb25zOiBmYWxzZX0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7ZWRpdG9yfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7c2VsZWN0ZWRGZWF0dXJlID0ge319ID0gZWRpdG9yO1xuICAgICAgdGhpcy5wcm9wcy5vbkRlbGV0ZUZlYXR1cmUoc2VsZWN0ZWRGZWF0dXJlKTtcbiAgICB9O1xuXG4gICAgX2Nsb3NlRmVhdHVyZUFjdGlvbiA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dBY3Rpb25zOiBmYWxzZX0pO1xuICAgIH07XG5cbiAgICBfb25Ub2dnbGVMYXllciA9IGxheWVyID0+IHtcbiAgICAgIGNvbnN0IHtzZWxlY3RlZEZlYXR1cmV9ID0gdGhpcy5wcm9wcy5lZGl0b3I7XG4gICAgICBpZiAoIXNlbGVjdGVkRmVhdHVyZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcHMub25Ub2dnbGVQb2x5Z29uRmlsdGVyKGxheWVyLCBzZWxlY3RlZEZlYXR1cmUpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7Y2xhc3NOYW1lLCBjbGlja1JhZGl1cywgZGF0YXNldHMsIGVkaXRvciwgb25VcGRhdGUsIHN0eWxlfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IHtsYXN0UG9zaXRpb24sIHNob3dBY3Rpb25zfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmVJZCA9IGdldChlZGl0b3IsIFsnc2VsZWN0ZWRGZWF0dXJlJywgJ2lkJ10pO1xuICAgICAgY29uc3QgY3VycmVudEZpbHRlciA9IHRoaXMuY3VycmVudEZpbHRlclNlbGVjdG9yKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3QgYXZhaWxhYmxlTGF5ZXJzID0gdGhpcy5hdmFpbGFibGVMYXllcnNTZWxldG9yKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3QgYWxsRmVhdHVyZXMgPSB0aGlzLmFsbEZlYXR1cmVzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRXcmFwcGVyIGVkaXRvcj17ZWRpdG9yfSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2VkaXRvcicsIGNsYXNzTmFtZSl9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgPERyYXdcbiAgICAgICAgICAgIGNsaWNrUmFkaXVzPXtjbGlja1JhZGl1c31cbiAgICAgICAgICAgIG1vZGU9e2VkaXRvci5tb2RlfVxuICAgICAgICAgICAgZmVhdHVyZXM9e2FsbEZlYXR1cmVzfVxuICAgICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlSWQ9e3NlbGVjdGVkRmVhdHVyZUlkfVxuICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuX29uU2VsZWN0fVxuICAgICAgICAgICAgb25VcGRhdGU9e29uVXBkYXRlfVxuICAgICAgICAgICAgZ2V0RWRpdEhhbmRsZVNoYXBlPXtnZXRFZGl0SGFuZGxlU2hhcGV9XG4gICAgICAgICAgICBnZXRGZWF0dXJlU3R5bGU9e2dldEZlYXR1cmVTdHlsZX1cbiAgICAgICAgICAgIGdldEVkaXRIYW5kbGVTdHlsZT17Z2V0RWRpdEhhbmRsZVN0eWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3Nob3dBY3Rpb25zICYmIEJvb2xlYW4oc2VsZWN0ZWRGZWF0dXJlSWQpID8gKFxuICAgICAgICAgICAgPEZlYXR1cmVBY3Rpb25QYW5lbFxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGxheWVycz17YXZhaWxhYmxlTGF5ZXJzfVxuICAgICAgICAgICAgICBjdXJyZW50RmlsdGVyPXtjdXJyZW50RmlsdGVyfVxuICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLl9jbG9zZUZlYXR1cmVBY3Rpb259XG4gICAgICAgICAgICAgIG9uRGVsZXRlRmVhdHVyZT17dGhpcy5fb25EZWxldGVTZWxlY3RlZEZlYXR1cmV9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlTGF5ZXI9e3RoaXMuX29uVG9nZ2xlTGF5ZXJ9XG4gICAgICAgICAgICAgIHBvc2l0aW9uPXtsYXN0UG9zaXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1N0eWxlZFdyYXBwZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEVkaXRvci5kaXNwbGF5TmFtZSA9ICdFZGl0b3InO1xuXG4gIHJldHVybiBFZGl0b3I7XG59XG4iXX0=