import {
  getCurrentInstance,
  nextTick,
  onMounted,
  readonly,
  ref,
  watch
} from "./chunk-Q5PGHB6G.js";

// node_modules/@primeuix/styled/index.mjs
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toConsumableArray$2(r) {
  return _arrayWithoutHoles$2(r) || _iterableToArray$2(r) || _unsupportedIterableToArray$3(r) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
  }
}
function _iterableToArray$2(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$2(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$3(r);
}
function _arrayLikeToArray$3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
var SharedUtils = {
  object: {
    isEmpty: function isEmpty(value) {
      return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$3(value) === "object" && Object.keys(value).length === 0;
    },
    isNotEmpty: function isNotEmpty(value) {
      return !this.isEmpty(value);
    },
    isFunction: function isFunction(value) {
      return !!(value && value.constructor && value.call && value.apply);
    },
    isObject: function isObject(value) {
      var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
    },
    isArray: function isArray(value) {
      var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return Array.isArray(value) && (empty || value.length !== 0);
    },
    isString: function isString(value) {
      var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return typeof value === "string" && (empty || value !== "");
    },
    isNumber: function isNumber(value) {
      return !isNaN(value);
    },
    toFlatCase: function toFlatCase(str) {
      return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
    },
    toKebabCase: function toKebabCase(str) {
      return this.isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, function(c, i) {
        return i === 0 ? c : "-" + c.toLowerCase();
      }).toLowerCase() : str;
    },
    toTokenKey: function toTokenKey(str) {
      return this.isString(str) ? str.replace(/[A-Z]/g, function(c, i) {
        return i === 0 ? c : "." + c.toLowerCase();
      }).toLowerCase() : str;
    },
    merge: function merge(value1, value2) {
      if (this.isArray(value1)) {
        value1.push.apply(value1, _toConsumableArray$2(value2 || []));
      } else if (this.isObject(value1)) {
        Object.assign(value1, value2);
      }
    },
    mergeKeysByRegex: function mergeKeysByRegex() {
      var _this = this;
      var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var regex = arguments.length > 2 ? arguments[2] : void 0;
      var mergedObj = _objectSpread$2({}, target);
      Object.keys(source).forEach(function(key) {
        if (_this.test(regex, key)) {
          if (_this.isObject(source[key]) && key in target && _this.isObject(target[key])) {
            mergedObj[key] = _this.mergeKeysByRegex(target[key], source[key], regex);
          } else {
            mergedObj[key] = source[key];
          }
        } else {
          mergedObj[key] = source[key];
        }
      });
      return mergedObj;
    },
    mergeKeys: function mergeKeys() {
      var _this2 = this;
      var _mergeKeys = function _mergeKeys2() {
        var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var mergedObj = _objectSpread$2({}, target);
        Object.keys(source).forEach(function(key) {
          if (_this2.isObject(source[key]) && key in target && _this2.isObject(target[key])) {
            mergedObj[key] = _mergeKeys2(target[key], source[key]);
          } else {
            mergedObj[key] = source[key];
          }
        });
        return mergedObj;
      };
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return args.reduce(function(acc, obj, i) {
        return i === 0 ? obj : _mergeKeys(acc, obj);
      }, {});
    },
    getItemValue: function getItemValue(obj) {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
    },
    getOptionValue: function getOptionValue(options) {
      var _this3 = this;
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var fKeys = this.toFlatCase(key).split(".");
      var fKey = fKeys.shift();
      return fKey ? this.isObject(options) ? this.getOptionValue(this.getItemValue(options[Object.keys(options).find(function(k) {
        return _this3.toFlatCase(k) === fKey;
      }) || ""], params), fKeys.join("."), params) : void 0 : this.getItemValue(options, params);
    },
    test: function test(regex, str) {
      if (regex) {
        var match = regex.test(str);
        regex.lastIndex = 0;
        return match;
      }
      return false;
    },
    toValue: function toValue(value) {
      return this.isObject(value) && value.hasOwnProperty("value") && value.hasOwnProperty("type") ? value.value : value;
    },
    toUnit: function toUnit(value) {
      var _this4 = this;
      var variable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var excludedProperties = ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"];
      if (!excludedProperties.some(function(property) {
        return variable.endsWith(property);
      })) {
        var val = "".concat(value).trim();
        var valArr = val.split(" ");
        return valArr.map(function(v) {
          return _this4.isNumber(v) ? "".concat(v, "px") : v;
        }).join(" ");
      }
      return value;
    },
    toNormalizePrefix: function toNormalizePrefix(prefix) {
      return prefix.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
    },
    toNormalizeVariable: function toNormalizeVariable() {
      var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var variable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      return this.toNormalizePrefix("".concat(this.isString(prefix, false) && this.isString(variable, false) ? "".concat(prefix, "-") : prefix).concat(variable));
    },
    getVariableName: function getVariableName() {
      var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var variable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      return "--".concat(this.toNormalizeVariable(prefix, variable));
    },
    getVariableValue: function getVariableValue(value) {
      var _this5 = this;
      var variable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var prefix = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      var excludedKeyRegexes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [];
      var fallback = arguments.length > 4 ? arguments[4] : void 0;
      if (this.isString(value)) {
        var regex = /{([^}]*)}/g;
        var val = value.trim();
        if (this.test(regex, val)) {
          var _val = val.replaceAll(regex, function(v) {
            var path = v.replace(/{|}/g, "");
            var keys = path.split(".").filter(function(_v) {
              return !excludedKeyRegexes.some(function(_r) {
                return _this5.test(_r, _v);
              });
            });
            return "var(".concat(_this5.getVariableName(prefix, _this5.toKebabCase(keys.join("-")))).concat(_this5.isNotEmpty(fallback) ? ", ".concat(fallback) : "", ")");
          });
          var calculationRegex = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
          var cleanedVarRegex = /var\([^)]+\)/g;
          return this.test(calculationRegex, _val.replace(cleanedVarRegex, "0")) ? "calc(".concat(_val, ")") : _val;
        }
        return this.toUnit(val, variable);
      } else if (this.isNumber(value)) {
        return this.toUnit(value, variable);
      }
      return void 0;
    },
    getComputedValue: function getComputedValue() {
      var _this6 = this;
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var value = arguments.length > 1 ? arguments[1] : void 0;
      if (this.isString(value)) {
        var regex = /{([^}]*)}/g;
        var val = value.trim();
        return this.test(regex, val) ? val.replaceAll(regex, function(v) {
          return _this6.getOptionValue(obj, v.replace(/{|}/g, ""));
        }) : val;
      } else if (this.isNumber(value)) {
        return value;
      }
      return void 0;
    },
    setProperty: function setProperty(properties, key, value) {
      if (this.isString(key, false)) {
        properties.push("".concat(key, ":").concat(value, ";"));
      }
    },
    getRule: function getRule(selector, properties) {
      if (selector) {
        return "".concat(selector, "{").concat(properties, "}");
      }
      return "";
    },
    minifyCSS: function minifyCSS(css3) {
      return css3 ? css3.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":") : css3;
    }
  },
  dom: {
    isClient: function isClient() {
      return !!(typeof window !== "undefined" && window.document && window.document.createElement);
    },
    addClass: function addClass(element, className) {
      if (element && className && !this.hasClass(element, className)) {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
      }
    },
    removeClass: function removeClass(element, className) {
      if (element && className) {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
      }
    },
    hasClass: function hasClass(element, className) {
      if (element) {
        if (element.classList) return element.classList.contains(className);
        else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
      }
      return false;
    },
    removeMultipleClasses: function removeMultipleClasses(element, classNames) {
      var _this7 = this;
      if (element && classNames) {
        [classNames].flat().filter(Boolean).forEach(function(cNames) {
          return cNames.split(" ").forEach(function(className) {
            return _this7.removeClass(element, className);
          });
        });
      }
    }
  }
};
function createService() {
  var allHandlers = /* @__PURE__ */ new Map();
  return {
    on: function on(type, handler2) {
      var handlers = allHandlers.get(type);
      if (!handlers) handlers = [handler2];
      else handlers.push(handler2);
      allHandlers.set(type, handlers);
      return this;
    },
    off: function off(type, handler2) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
      return this;
    },
    emit: function emit(type, evt) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map(function(handler2) {
          handler2(evt);
        });
      }
    }
  };
}
var ThemeService = createService();
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _toConsumableArray$1(r) {
  return _arrayWithoutHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$2(r) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
  }
}
function _iterableToArray$1(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$1(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$2(r);
}
function _arrayLikeToArray$2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Theme = {
  defaults: {
    variable: {
      prefix: "p",
      selector: ":root",
      excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states)$/gi
    },
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false
    }
  },
  _theme: void 0,
  _layerNames: /* @__PURE__ */ new Set(),
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  _loadingStyles: /* @__PURE__ */ new Set(),
  _tokens: {},
  update: function update() {
    var newValues = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var theme3 = newValues.theme;
    if (theme3) {
      this._theme = _objectSpread$1(_objectSpread$1({}, theme3), {}, {
        options: _objectSpread$1(_objectSpread$1({}, this.defaults.options), theme3.options)
      });
      this._tokens = ThemeUtils.createTokens(this.preset, this.defaults);
      this.clearLoadedStyleNames();
    }
  },
  get theme() {
    return this._theme;
  },
  get preset() {
    var _this$theme;
    return ((_this$theme = this.theme) === null || _this$theme === void 0 ? void 0 : _this$theme.preset) || {};
  },
  get options() {
    var _this$theme2;
    return ((_this$theme2 = this.theme) === null || _this$theme2 === void 0 ? void 0 : _this$theme2.options) || {};
  },
  get tokens() {
    return this._tokens;
  },
  getTheme: function getTheme() {
    return this.theme;
  },
  setTheme: function setTheme(newValue) {
    this.update({
      theme: newValue
    });
    ThemeService.emit("theme:change", newValue);
  },
  getPreset: function getPreset() {
    return this.preset;
  },
  setPreset: function setPreset(newValue) {
    this._theme = _objectSpread$1(_objectSpread$1({}, this.theme), {}, {
      preset: newValue
    });
    this._tokens = ThemeUtils.createTokens(newValue, this.defaults);
    this.clearLoadedStyleNames();
    ThemeService.emit("preset:change", newValue);
    ThemeService.emit("theme:change", this.theme);
  },
  getOptions: function getOptions() {
    return this.options;
  },
  setOptions: function setOptions(newValue) {
    this._theme = _objectSpread$1(_objectSpread$1({}, this.theme), {}, {
      options: newValue
    });
    this.clearLoadedStyleNames();
    ThemeService.emit("options:change", newValue);
    ThemeService.emit("theme:change", this.theme);
  },
  getLayerNames: function getLayerNames() {
    return _toConsumableArray$1(this._layerNames);
  },
  setLayerNames: function setLayerNames(layerName) {
    this._layerNames.add(layerName);
  },
  getLoadedStyleNames: function getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded: function isStyleNameLoaded(name) {
    return this._loadedStyleNames.has(name);
  },
  setLoadedStyleName: function setLoadedStyleName(name) {
    this._loadedStyleNames.add(name);
  },
  deleteLoadedStyleName: function deleteLoadedStyleName(name) {
    this._loadedStyleNames["delete"](name);
  },
  clearLoadedStyleNames: function clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  },
  getTokenValue: function getTokenValue(tokenPath) {
    return ThemeUtils.getTokenValue(this.tokens, tokenPath, this.defaults);
  },
  getCommon: function getCommon() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var params = arguments.length > 1 ? arguments[1] : void 0;
    return ThemeUtils.getCommon({
      name,
      theme: this.theme,
      params,
      defaults: this.defaults,
      set: {
        layerNames: this.setLayerNames.bind(this)
      }
    });
  },
  getComponent: function getComponent() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var params = arguments.length > 1 ? arguments[1] : void 0;
    var options = {
      name,
      theme: this.theme,
      params,
      defaults: this.defaults,
      set: {
        layerNames: this.setLayerNames.bind(this)
      }
    };
    return ThemeUtils.getPresetC(options);
  },
  getDirective: function getDirective() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var params = arguments.length > 1 ? arguments[1] : void 0;
    var options = {
      name,
      theme: this.theme,
      params,
      defaults: this.defaults,
      set: {
        layerNames: this.setLayerNames.bind(this)
      }
    };
    return ThemeUtils.getPresetD(options);
  },
  getCustomPreset: function getCustomPreset() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var preset = arguments.length > 1 ? arguments[1] : void 0;
    var selector = arguments.length > 2 ? arguments[2] : void 0;
    var params = arguments.length > 3 ? arguments[3] : void 0;
    var options = {
      name,
      preset,
      options: this.options,
      selector,
      params,
      defaults: this.defaults,
      set: {
        layerNames: this.setLayerNames.bind(this)
      }
    };
    return ThemeUtils.getPreset(options);
  },
  getLayerOrderCSS: function getLayerOrderCSS() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return ThemeUtils.getLayerOrder(name, this.options, {
      names: this.getLayerNames()
    }, this.defaults);
  },
  transformCSS: function transformCSS() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var css3 = arguments.length > 1 ? arguments[1] : void 0;
    var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "style";
    var mode = arguments.length > 3 ? arguments[3] : void 0;
    return ThemeUtils.transformCSS(name, css3, mode, type, this.options, {
      layerNames: this.setLayerNames.bind(this)
    }, this.defaults);
  },
  getCommonStyleSheet: function getCommonStyleSheet() {
    var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var params = arguments.length > 1 ? arguments[1] : void 0;
    var props = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return ThemeUtils.getCommonStyleSheet({
      name,
      theme: this.theme,
      params,
      props,
      defaults: this.defaults,
      set: {
        layerNames: this.setLayerNames.bind(this)
      }
    });
  },
  getStyleSheet: function getStyleSheet(name, params) {
    var props = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return ThemeUtils.getStyleSheet({
      name,
      theme: this.theme,
      params,
      props,
      defaults: this.defaults,
      set: {
        layerNames: this.setLayerNames.bind(this)
      }
    });
  },
  onStyleMounted: function onStyleMounted(name) {
    this._loadingStyles.add(name);
  },
  onStyleUpdated: function onStyleUpdated(name) {
    this._loadingStyles.add(name);
  },
  onStyleLoaded: function onStyleLoaded(event, _ref) {
    var name = _ref.name;
    if (this._loadingStyles.size) {
      this._loadingStyles["delete"](name);
      ThemeService.emit("theme:".concat(name, ":load"), event);
      !this._loadingStyles.size && ThemeService.emit("theme:load");
    }
  }
};
var $dt = function $dt2(tokenPath) {
  var _variable$match;
  var theme3 = Theme.getTheme();
  var variable = dtwt(theme3, tokenPath, void 0, "variable");
  var name = (_variable$match = variable.match(/--[\w-]+/g)) === null || _variable$match === void 0 ? void 0 : _variable$match[0];
  var value = dtwt(theme3, tokenPath, void 0, "value");
  return {
    name,
    variable,
    value
  };
};
var dt = function dt2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return dtwt.apply(void 0, [Theme.getTheme()].concat(args));
};
var dtwt = function dtwt2() {
  var theme3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var tokenPath = arguments.length > 1 ? arguments[1] : void 0;
  var fallback = arguments.length > 2 ? arguments[2] : void 0;
  var type = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "variable";
  if (tokenPath) {
    var _ref = Theme.defaults || {}, VARIABLE = _ref.variable, OPTIONS = _ref.options;
    var _ref2 = (theme3 === null || theme3 === void 0 ? void 0 : theme3.options) || OPTIONS || {}, prefix = _ref2.prefix, transform = _ref2.transform;
    var regex = /{([^}]*)}/g;
    var token = SharedUtils.object.test(regex, tokenPath) ? tokenPath : "{".concat(tokenPath, "}");
    var isStrictTransform = type === "value" || transform === "strict";
    return isStrictTransform ? Theme.getTokenValue(tokenPath) : SharedUtils.object.getVariableValue(token, void 0, prefix, [VARIABLE.excludedKeyRegex], fallback);
  }
  return "";
};
function _slicedToArray$1(r, e) {
  return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}
function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(r) {
  if (Array.isArray(r)) return r;
}
function toVariables(theme3) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var VARIABLE = Theme.defaults.variable;
  var _options$prefix = options.prefix, prefix = _options$prefix === void 0 ? VARIABLE.prefix : _options$prefix, _options$selector = options.selector, selector = _options$selector === void 0 ? VARIABLE.selector : _options$selector, _options$excludedKeyR = options.excludedKeyRegex, excludedKeyRegex = _options$excludedKeyR === void 0 ? VARIABLE.excludedKeyRegex : _options$excludedKeyR;
  var _toVariables2 = function _toVariables4(_theme) {
    var _prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(_theme).reduce(function(acc, _ref) {
      var _ref2 = _slicedToArray$1(_ref, 2), key = _ref2[0], value = _ref2[1];
      var px = SharedUtils.object.test(excludedKeyRegex, key) ? SharedUtils.object.toNormalizeVariable(_prefix) : SharedUtils.object.toNormalizeVariable(_prefix, SharedUtils.object.toKebabCase(key));
      var v = SharedUtils.object.toValue(value);
      if (SharedUtils.object.isObject(v)) {
        var _toVariables22 = _toVariables4(v, px), _variables = _toVariables22.variables, _tokens = _toVariables22.tokens;
        SharedUtils.object.merge(acc["tokens"], _tokens);
        SharedUtils.object.merge(acc["variables"], _variables);
      } else {
        acc["tokens"].push((prefix ? px.replace("".concat(prefix, "-"), "") : px).replaceAll("-", "."));
        SharedUtils.object.setProperty(acc["variables"], SharedUtils.object.getVariableName(px), SharedUtils.object.getVariableValue(v, px, prefix, [excludedKeyRegex]));
      }
      return acc;
    }, {
      variables: [],
      tokens: []
    });
  };
  var _toVariables3 = _toVariables2(theme3, prefix), variables = _toVariables3.variables, tokens = _toVariables3.tokens;
  return {
    value: variables,
    tokens,
    declarations: variables.join(""),
    css: SharedUtils.object.getRule(selector, variables.join(""))
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
var _excluded = ["colorScheme"];
var _excluded2 = ["dark"];
var _excluded3 = ["colorScheme"];
var _excluded4 = ["dark"];
var _excluded5 = ["colorScheme"];
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
var ThemeUtils = {
  regex: {
    rules: {
      "class": {
        pattern: /^\.([a-zA-Z][\w-]*)$/,
        resolve: function resolve(value) {
          return {
            type: "class",
            selector: value,
            matched: this.pattern.test(value.trim())
          };
        }
      },
      attr: {
        pattern: /^\[(.*)\]$/,
        resolve: function resolve2(value) {
          return {
            type: "attr",
            selector: ":root".concat(value),
            matched: this.pattern.test(value.trim())
          };
        }
      },
      media: {
        pattern: /^@media (.*)$/,
        resolve: function resolve3(value) {
          return {
            type: "media",
            selector: "".concat(value, "{:root{[CSS]}}"),
            matched: this.pattern.test(value.trim())
          };
        }
      },
      system: {
        pattern: /^system$/,
        resolve: function resolve4(value) {
          return {
            type: "system",
            selector: "@media (prefers-color-scheme: dark){:root{[CSS]}}",
            matched: this.pattern.test(value.trim())
          };
        }
      },
      custom: {
        resolve: function resolve5(value) {
          return {
            type: "custom",
            selector: value,
            matched: true
          };
        }
      }
    },
    resolve: function resolve6(value) {
      var _this = this;
      var rules = Object.keys(this.rules).filter(function(k) {
        return k !== "custom";
      }).map(function(r) {
        return _this.rules[r];
      });
      return [value].flat().map(function(v) {
        var _rules$map$find;
        return (_rules$map$find = rules.map(function(r) {
          return r.resolve(v);
        }).find(function(rr) {
          return rr.matched;
        })) !== null && _rules$map$find !== void 0 ? _rules$map$find : _this.rules.custom.resolve(v);
      });
    }
  },
  _toVariables: function _toVariables(theme3, options) {
    return toVariables(theme3, {
      prefix: options === null || options === void 0 ? void 0 : options.prefix
    });
  },
  getCommon: function getCommon2(_ref) {
    var _ref$name = _ref.name, name = _ref$name === void 0 ? "" : _ref$name, _ref$theme = _ref.theme, theme3 = _ref$theme === void 0 ? {} : _ref$theme;
    _ref.params;
    var set = _ref.set, defaults = _ref.defaults;
    var preset = theme3.preset, options = theme3.options;
    var primitive_css, primitive_tokens, semantic_css, semantic_tokens;
    if (SharedUtils.object.isNotEmpty(preset)) {
      var _prim_var$declaration, _sRest_var$declaratio, _csRest_var$declarati, _dark_var$declaration;
      var primitive = preset.primitive, semantic = preset.semantic;
      var _ref2 = semantic || {}, colorScheme = _ref2.colorScheme, sRest = _objectWithoutProperties(_ref2, _excluded);
      var _ref3 = colorScheme || {}, dark = _ref3.dark, csRest = _objectWithoutProperties(_ref3, _excluded2);
      var prim_var = SharedUtils.object.isNotEmpty(primitive) ? this._toVariables({
        primitive
      }, options) : {};
      var sRest_var = SharedUtils.object.isNotEmpty(sRest) ? this._toVariables({
        semantic: sRest
      }, options) : {};
      var csRest_var = SharedUtils.object.isNotEmpty(csRest) ? this._toVariables({
        light: csRest
      }, options) : {};
      var dark_var = SharedUtils.object.isNotEmpty(dark) ? this._toVariables({
        dark
      }, options) : {};
      var _ref4 = [(_prim_var$declaration = prim_var.declarations) !== null && _prim_var$declaration !== void 0 ? _prim_var$declaration : "", prim_var.tokens], prim_css = _ref4[0], prim_tokens = _ref4[1];
      var sRest_css = (_sRest_var$declaratio = sRest_var.declarations) !== null && _sRest_var$declaratio !== void 0 ? _sRest_var$declaratio : "", sRest_tokens = sRest_var.tokens || [];
      var csRest_css = (_csRest_var$declarati = csRest_var.declarations) !== null && _csRest_var$declarati !== void 0 ? _csRest_var$declarati : "", csRest_tokens = csRest_var.tokens || [];
      var dark_css = (_dark_var$declaration = dark_var.declarations) !== null && _dark_var$declaration !== void 0 ? _dark_var$declaration : "", dark_tokens = dark_var.tokens || [];
      primitive_css = this.transformCSS(name, prim_css, "light", "variable", options, set, defaults);
      primitive_tokens = prim_tokens;
      var semantic_light_css = this.transformCSS(name, "".concat(sRest_css).concat(csRest_css, "color-scheme:light"), "light", "variable", options, set, defaults);
      var semantic_dark_css = this.transformCSS(name, "".concat(dark_css, "color-scheme:dark"), "dark", "variable", options, set, defaults);
      semantic_css = "".concat(semantic_light_css).concat(semantic_dark_css);
      semantic_tokens = _toConsumableArray(new Set([].concat(_toConsumableArray(sRest_tokens), _toConsumableArray(csRest_tokens), _toConsumableArray(dark_tokens))));
    }
    return {
      primitive: {
        css: primitive_css,
        tokens: primitive_tokens
      },
      semantic: {
        css: semantic_css,
        tokens: semantic_tokens
      }
    };
  },
  getPreset: function getPreset2(_ref5) {
    var _vRest_var$declaratio, _csRest_var$declarati2, _dark_var$declaration2;
    var _ref5$name = _ref5.name, name = _ref5$name === void 0 ? "" : _ref5$name, _ref5$preset = _ref5.preset, preset = _ref5$preset === void 0 ? {} : _ref5$preset, options = _ref5.options;
    _ref5.params;
    var set = _ref5.set, defaults = _ref5.defaults, selector = _ref5.selector;
    var _name = name.replace("-directive", "");
    var colorScheme = preset.colorScheme, vRest = _objectWithoutProperties(preset, _excluded3);
    var _ref6 = colorScheme || {}, dark = _ref6.dark, csRest = _objectWithoutProperties(_ref6, _excluded4);
    var vRest_var = SharedUtils.object.isNotEmpty(vRest) ? this._toVariables(_defineProperty({}, _name, vRest), options) : {};
    var csRest_var = SharedUtils.object.isNotEmpty(csRest) ? this._toVariables(_defineProperty({}, _name, csRest), options) : {};
    var dark_var = SharedUtils.object.isNotEmpty(dark) ? this._toVariables(_defineProperty({}, _name, dark), options) : {};
    var vRest_css = (_vRest_var$declaratio = vRest_var.declarations) !== null && _vRest_var$declaratio !== void 0 ? _vRest_var$declaratio : "", vRest_tokens = vRest_var.tokens || [];
    var csRest_css = (_csRest_var$declarati2 = csRest_var.declarations) !== null && _csRest_var$declarati2 !== void 0 ? _csRest_var$declarati2 : "", csRest_tokens = csRest_var.tokens || [];
    var dark_css = (_dark_var$declaration2 = dark_var.declarations) !== null && _dark_var$declaration2 !== void 0 ? _dark_var$declaration2 : "", dark_tokens = dark_var.tokens || [];
    var tokens = _toConsumableArray(new Set([].concat(_toConsumableArray(vRest_tokens), _toConsumableArray(csRest_tokens), _toConsumableArray(dark_tokens))));
    var light_variable_css = this.transformCSS(_name, "".concat(vRest_css).concat(csRest_css), "light", "variable", options, set, defaults, selector);
    var dark_variable_css = this.transformCSS(_name, dark_css, "dark", "variable", options, set, defaults, selector);
    return {
      css: "".concat(light_variable_css).concat(dark_variable_css),
      tokens
    };
  },
  getPresetC: function getPresetC(_ref7) {
    var _preset$components;
    var _ref7$name = _ref7.name, name = _ref7$name === void 0 ? "" : _ref7$name, _ref7$theme = _ref7.theme, theme3 = _ref7$theme === void 0 ? {} : _ref7$theme, params = _ref7.params, set = _ref7.set, defaults = _ref7.defaults;
    var preset = theme3.preset, options = theme3.options;
    var cPreset = preset === null || preset === void 0 || (_preset$components = preset.components) === null || _preset$components === void 0 ? void 0 : _preset$components[name];
    return this.getPreset({
      name,
      preset: cPreset,
      options,
      params,
      set,
      defaults
    });
  },
  getPresetD: function getPresetD(_ref8) {
    var _preset$directives;
    var _ref8$name = _ref8.name, name = _ref8$name === void 0 ? "" : _ref8$name, _ref8$theme = _ref8.theme, theme3 = _ref8$theme === void 0 ? {} : _ref8$theme, params = _ref8.params, set = _ref8.set, defaults = _ref8.defaults;
    var dName = name.replace("-directive", "");
    var preset = theme3.preset, options = theme3.options;
    var dPreset = preset === null || preset === void 0 || (_preset$directives = preset.directives) === null || _preset$directives === void 0 ? void 0 : _preset$directives[dName];
    return this.getPreset({
      name: dName,
      preset: dPreset,
      options,
      params,
      set,
      defaults
    });
  },
  getColorSchemeOption: function getColorSchemeOption(options, defaults) {
    var _options$darkModeSele;
    return this.regex.resolve((_options$darkModeSele = options.darkModeSelector) !== null && _options$darkModeSele !== void 0 ? _options$darkModeSele : defaults.options.darkModeSelector);
  },
  getLayerOrder: function getLayerOrder(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var params = arguments.length > 2 ? arguments[2] : void 0;
    var cssLayer = options.cssLayer;
    if (cssLayer) {
      var order = SharedUtils.object.getItemValue(cssLayer.order || "primeui", params);
      return "@layer ".concat(order);
    }
    return "";
  },
  getCommonStyleSheet: function getCommonStyleSheet2(_ref9) {
    var _ref9$name = _ref9.name, name = _ref9$name === void 0 ? "" : _ref9$name, _ref9$theme = _ref9.theme, theme3 = _ref9$theme === void 0 ? {} : _ref9$theme, params = _ref9.params, _ref9$props = _ref9.props, props = _ref9$props === void 0 ? {} : _ref9$props, set = _ref9.set, defaults = _ref9.defaults;
    var common = this.getCommon({
      name,
      theme: theme3,
      params,
      set,
      defaults
    });
    var _props = Object.entries(props).reduce(function(acc, _ref10) {
      var _ref11 = _slicedToArray(_ref10, 2), k = _ref11[0], v = _ref11[1];
      return acc.push("".concat(k, '="').concat(v, '"')) && acc;
    }, []).join(" ");
    return Object.entries(common || {}).reduce(function(acc, _ref12) {
      var _ref13 = _slicedToArray(_ref12, 2), key = _ref13[0], value = _ref13[1];
      if (value !== null && value !== void 0 && value.css) {
        var _css = SharedUtils.object.minifyCSS(value === null || value === void 0 ? void 0 : value.css);
        var id = "".concat(key, "-variables");
        acc.push('<style type="text/css" data-primevue-style-id="'.concat(id, '" ').concat(_props, ">").concat(_css, "</style>"));
      }
      return acc;
    }, []).join("");
  },
  getStyleSheet: function getStyleSheet2(_ref14) {
    var _ref15;
    var _ref14$name = _ref14.name, name = _ref14$name === void 0 ? "" : _ref14$name, _ref14$theme = _ref14.theme, theme3 = _ref14$theme === void 0 ? {} : _ref14$theme, params = _ref14.params, _ref14$props = _ref14.props, props = _ref14$props === void 0 ? {} : _ref14$props, set = _ref14.set, defaults = _ref14.defaults;
    var options = {
      name,
      theme: theme3,
      params,
      set,
      defaults
    };
    var preset_css = (_ref15 = name.includes("-directive") ? this.getPresetD(options) : this.getPresetC(options)) === null || _ref15 === void 0 ? void 0 : _ref15.css;
    var _props = Object.entries(props).reduce(function(acc, _ref16) {
      var _ref17 = _slicedToArray(_ref16, 2), k = _ref17[0], v = _ref17[1];
      return acc.push("".concat(k, '="').concat(v, '"')) && acc;
    }, []).join(" ");
    return preset_css ? '<style type="text/css" data-primevue-style-id="'.concat(name, '-variables" ').concat(_props, ">").concat(SharedUtils.object.minifyCSS(preset_css), "</style>") : "";
  },
  createTokens: function createTokens() {
    var _this2 = this;
    var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaults = arguments.length > 1 ? arguments[1] : void 0;
    var parentKey = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var parentPath = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    var tokens = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
    Object.entries(obj).forEach(function(_ref18) {
      var _ref19 = _slicedToArray(_ref18, 2), key = _ref19[0], value = _ref19[1];
      var currentKey = SharedUtils.object.test(defaults.variable.excludedKeyRegex, key) ? parentKey : parentKey ? "".concat(parentKey, ".").concat(SharedUtils.object.toTokenKey(key)) : SharedUtils.object.toTokenKey(key);
      var currentPath = parentPath ? "".concat(parentPath, ".").concat(key) : key;
      if (SharedUtils.object.isObject(value)) {
        _this2.createTokens(value, defaults, currentKey, currentPath, tokens);
      } else {
        tokens[currentKey] || (tokens[currentKey] = {
          paths: [],
          computed: function computed(colorScheme) {
            var tokenPathMap = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            if (colorScheme) {
              var path = this.paths.find(function(p) {
                return p.scheme === colorScheme;
              }) || this.paths.find(function(p) {
                return p.scheme === "none";
              });
              return path === null || path === void 0 ? void 0 : path.computed(colorScheme, tokenPathMap["binding"]);
            }
            return this.paths.map(function(p) {
              return p.computed(p.scheme, tokenPathMap[p.scheme]);
            });
          }
        });
        tokens[currentKey].paths.push({
          path: currentPath,
          value,
          scheme: currentPath.includes("colorScheme.light") ? "light" : currentPath.includes("colorScheme.dark") ? "dark" : "none",
          computed: function computed(colorScheme) {
            var _binding;
            var tokenPathMap = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var regex = /{([^}]*)}/g;
            var computedValue = value;
            tokenPathMap["name"] = this.path;
            tokenPathMap[_binding = "binding"] || (tokenPathMap[_binding] = {});
            if (SharedUtils.object.test(regex, value)) {
              var val = value.trim();
              var _val = val.replaceAll(regex, function(v) {
                var _tokens$path;
                var path = v.replace(/{|}/g, "");
                return (_tokens$path = tokens[path]) === null || _tokens$path === void 0 || (_tokens$path = _tokens$path.computed(colorScheme, tokenPathMap)) === null || _tokens$path === void 0 ? void 0 : _tokens$path.value;
              });
              var calculationRegex = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g;
              var cleanedVarRegex = /var\([^)]+\)/g;
              computedValue = SharedUtils.object.test(calculationRegex, _val.replace(cleanedVarRegex, "0")) ? "calc(".concat(_val, ")") : _val;
            }
            SharedUtils.object.isEmpty(tokenPathMap["binding"]) && delete tokenPathMap["binding"];
            return {
              colorScheme,
              path: this.path,
              paths: tokenPathMap,
              value: computedValue.includes("undefined") ? void 0 : computedValue
            };
          }
        });
      }
    });
    return tokens;
  },
  getTokenValue: function getTokenValue2(tokens, path, defaults) {
    var _tokens$token;
    var normalizePath = function normalizePath2(str) {
      var strArr = str.split(".");
      return strArr.filter(function(s) {
        return !SharedUtils.object.test(defaults.variable.excludedKeyRegex, s.toLowerCase());
      }).join(".");
    };
    var token = normalizePath(path);
    var colorScheme = path.includes("colorScheme.light") ? "light" : path.includes("colorScheme.dark") ? "dark" : void 0;
    var computedValues = [(_tokens$token = tokens[token]) === null || _tokens$token === void 0 ? void 0 : _tokens$token.computed(colorScheme)].flat().filter(function(computed) {
      return computed;
    });
    return computedValues.length === 1 ? computedValues[0].value : computedValues.reduce(function() {
      var acc = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var computed = arguments.length > 1 ? arguments[1] : void 0;
      var cs = computed.colorScheme, rest = _objectWithoutProperties(computed, _excluded5);
      acc[cs] = rest;
      return acc;
    }, void 0);
  },
  transformCSS: function transformCSS2(name, css3, mode, type) {
    var options = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
    var set = arguments.length > 5 ? arguments[5] : void 0;
    var defaults = arguments.length > 6 ? arguments[6] : void 0;
    var selector = arguments.length > 7 ? arguments[7] : void 0;
    if (SharedUtils.object.isNotEmpty(css3)) {
      var cssLayer = options.cssLayer;
      if (type !== "style") {
        var colorSchemeOption = this.getColorSchemeOption(options, defaults);
        var _css = selector ? SharedUtils.object.getRule(selector, css3) : css3;
        css3 = mode === "dark" ? colorSchemeOption.reduce(function(acc, _ref20) {
          var _selector = _ref20.selector;
          if (SharedUtils.object.isNotEmpty(_selector)) {
            acc += _selector.includes("[CSS]") ? _selector.replace("[CSS]", _css) : SharedUtils.object.getRule(_selector, _css);
          }
          return acc;
        }, "") : SharedUtils.object.getRule(selector !== null && selector !== void 0 ? selector : ":root", css3);
      }
      if (cssLayer) {
        var layerOptions = {
          name: "primeui",
          order: "primeui"
        };
        SharedUtils.object.isObject(cssLayer) && (layerOptions.name = SharedUtils.object.getItemValue(cssLayer.name, {
          name,
          type
        }));
        if (SharedUtils.object.isNotEmpty(layerOptions.name)) {
          css3 = SharedUtils.object.getRule("@layer ".concat(layerOptions.name), css3);
          set === null || set === void 0 || set.layerNames(layerOptions.name);
        }
      }
      return css3;
    }
    return "";
  }
};

// node_modules/@primevue/core/utils/index.mjs
function _createForOfIteratorHelper$1(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray$32(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t["return"] || t["return"]();
    } finally {
      if (u) throw o;
    }
  } };
}
function _toConsumableArray$3(r) {
  return _arrayWithoutHoles$3(r) || _iterableToArray$3(r) || _unsupportedIterableToArray$32(r) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$3(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$32(r);
}
function _typeof$32(o) {
  "@babel/helpers - typeof";
  return _typeof$32 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$32(o);
}
function _slicedToArray$12(r, e) {
  return _arrayWithHoles$12(r) || _iterableToArrayLimit$12(r, e) || _unsupportedIterableToArray$32(r, e) || _nonIterableRest$12();
}
function _nonIterableRest$12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$32(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$32(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$32(r, a) : void 0;
  }
}
function _arrayLikeToArray$32(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$12(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$12(r) {
  if (Array.isArray(r)) return r;
}
var DomHandler = {
  innerWidth: function innerWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  width: function width(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  getWindowScrollTop: function getWindowScrollTop() {
    var doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft: function getWindowScrollLeft() {
    var doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth: function getOuterWidth(el, margin) {
    if (el) {
      var width2 = el.offsetWidth;
      if (margin) {
        var style = getComputedStyle(el);
        width2 += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width2;
    }
    return 0;
  },
  getOuterHeight: function getOuterHeight(el, margin) {
    if (el) {
      var height = el.offsetHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight: function getClientHeight(el, margin) {
    if (el) {
      var height = el.clientHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport: function getViewport() {
    var win = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
    return {
      width: w,
      height: h
    };
  },
  getOffset: function getOffset(el) {
    if (el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function index(element) {
    if (element) {
      var _this$getParentNode;
      var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
      var num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === element) return num;
        if (children[i].nodeType === 1) num++;
      }
    }
    return -1;
  },
  addMultipleClasses: function addMultipleClasses(element, classNames) {
    var _this = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this.addClass(element, className);
        });
      });
    }
  },
  removeMultipleClasses: function removeMultipleClasses2(element, classNames) {
    var _this2 = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this2.removeClass(element, className);
        });
      });
    }
  },
  addClass: function addClass2(element, className) {
    if (element && className && !this.hasClass(element, className)) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    }
  },
  removeClass: function removeClass2(element, className) {
    if (element && className) {
      if (element.classList) element.classList.remove(className);
      else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass: function hasClass2(element, className) {
    if (element) {
      if (element.classList) return element.classList.contains(className);
      else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  addStyles: function addStyles(element) {
    var styles = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (element) {
      Object.entries(styles).forEach(function(_ref) {
        var _ref2 = _slicedToArray$12(_ref, 2), key = _ref2[0], value = _ref2[1];
        return element.style[key] = value;
      });
    }
  },
  find: function find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle: function findSingle(element, selector) {
    return this.isElement(element) ? element.matches(selector) ? element : element.querySelector(selector) : null;
  },
  createElement: function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (type) {
      var element = document.createElement(type);
      this.setAttributes(element, attributes);
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      element.append.apply(element, children);
      return element;
    }
    return void 0;
  },
  setAttribute: function setAttribute(element) {
    var attribute = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var value = arguments.length > 2 ? arguments[2] : void 0;
    if (this.isElement(element) && value !== null && value !== void 0) {
      element.setAttribute(attribute, value);
    }
  },
  setAttributes: function setAttributes(element) {
    var _this3 = this;
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(element)) {
      var computedStyles = function computedStyles2(rule, value) {
        var _element$$attrs, _element$$attrs2;
        var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
        return [value].flat().reduce(function(cv, v) {
          if (v !== null && v !== void 0) {
            var type = _typeof$32(v);
            if (type === "string" || type === "number") {
              cv.push(v);
            } else if (type === "object") {
              var _cv = Array.isArray(v) ? computedStyles2(rule, v) : Object.entries(v).map(function(_ref3) {
                var _ref4 = _slicedToArray$12(_ref3, 2), _k = _ref4[0], _v = _ref4[1];
                return rule === "style" && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(_v) : !!_v ? _k : void 0;
              });
              cv = _cv.length ? cv.concat(_cv.filter(function(c) {
                return !!c;
              })) : cv;
            }
          }
          return cv;
        }, styles);
      };
      Object.entries(attributes).forEach(function(_ref5) {
        var _ref6 = _slicedToArray$12(_ref5, 2), key = _ref6[0], value = _ref6[1];
        if (value !== void 0 && value !== null) {
          var matchedEvent = key.match(/^on(.+)/);
          if (matchedEvent) {
            element.addEventListener(matchedEvent[1].toLowerCase(), value);
          } else if (key === "p-bind") {
            _this3.setAttributes(element, value);
          } else {
            value = key === "class" ? _toConsumableArray$3(new Set(computedStyles("class", value))).join(" ").trim() : key === "style" ? computedStyles("style", value).join(";").trim() : value;
            (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
            element.setAttribute(key, value);
          }
        }
      });
    }
  },
  getAttribute: function getAttribute(element, name) {
    if (this.isElement(element)) {
      var value = element.getAttribute(name);
      if (!isNaN(value)) {
        return +value;
      }
      if (value === "true" || value === "false") {
        return value === "true";
      }
      return value;
    }
    return void 0;
  },
  isAttributeEquals: function isAttributeEquals(element, name, value) {
    return this.isElement(element) ? this.getAttribute(element, name) === value : false;
  },
  isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
    return !this.isAttributeEquals(element, name, value);
  },
  getHeight: function getHeight(el) {
    if (el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth: function getWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width2;
    }
    return 0;
  },
  absolutePosition: function absolutePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var elementOuterHeight = elementDimensions.height;
      var elementOuterWidth = elementDimensions.width;
      var targetOuterHeight = target.offsetHeight;
      var targetOuterWidth = target.offsetWidth;
      var targetOffset = target.getBoundingClientRect();
      var windowScrollTop = this.getWindowScrollTop();
      var windowScrollLeft = this.getWindowScrollLeft();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        origin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
      }
      if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(".concat($dt("anchor.gutter", "2px").variable, " * -1)") : $dt("anchor.gutter").variable);
    }
  },
  relativePosition: function relativePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var targetHeight = target.offsetHeight;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        origin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(".concat($dt("anchor.gutter", "2px").variable, " * -1)") : $dt("anchor.gutter").variable);
    }
  },
  nestedPosition: function nestedPosition(element, level) {
    if (element) {
      var parentItem = element.parentElement;
      var elementOffset = this.getOffset(parentItem);
      var viewport = this.getViewport();
      var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
      var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
      var left;
      if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
        if (parseInt(elementOffset.left, 10) < sublistWidth) {
          if (level % 2 === 1) {
            left = parseInt(elementOffset.left, 10) ? "-" + parseInt(elementOffset.left, 10) + "px" : "100%";
          } else if (level % 2 === 0) {
            left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + "px";
          }
        } else {
          left = "-100%";
        }
      } else {
        left = "100%";
      }
      element.style.top = "0px";
      element.style.left = left;
    }
  },
  getParentNode: function getParentNode(element) {
    var parent = element === null || element === void 0 ? void 0 : element.parentNode;
    if (parent && parent instanceof ShadowRoot && parent.host) {
      parent = parent.host;
    }
    return parent;
  },
  getParents: function getParents(element) {
    var parents = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var parent = this.getParentNode(element);
    return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
  },
  getScrollableParents: function getScrollableParents(element) {
    var scrollableParents = [];
    if (element) {
      var parents = this.getParents(element);
      var overflowRegex = /(auto|scroll)/;
      var overflowCheck = function overflowCheck2(node) {
        try {
          var styleDeclaration = window["getComputedStyle"](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
        } catch (err) {
          return false;
        }
      };
      var _iterator = _createForOfIteratorHelper$1(parents), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var parent = _step.value;
          var scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
          if (scrollSelectors) {
            var selectors = scrollSelectors.split(",");
            var _iterator2 = _createForOfIteratorHelper$1(selectors), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var selector = _step2.value;
                var el = this.findSingle(parent, selector);
                if (el && overflowCheck(el)) {
                  scrollableParents.push(el);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions: function getHiddenElementDimensions(element) {
    if (element) {
      var dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn: function fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      var last = +/* @__PURE__ */ new Date();
      var opacity = 0;
      var tick = function tick2() {
        opacity = +element.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +/* @__PURE__ */ new Date();
        if (+opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick2) || setTimeout(tick2, 16);
        }
      };
      tick();
    }
  },
  fadeOut: function fadeOut(element, ms) {
    if (element) {
      var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      var fading = setInterval(function() {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent: function getUserAgent() {
    return navigator.userAgent;
  },
  appendChild: function appendChild(element, target) {
    if (this.isElement(target)) target.appendChild(element);
    else if (target.el && target.elElement) target.elElement.appendChild(element);
    else throw new Error("Cannot append " + target + " to " + element);
  },
  isElement: function isElement(obj) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$32(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof$32(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView: function scrollInView(container, item) {
    var borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    var paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    var scroll = container.scrollTop;
    var elementHeight = container.clientHeight;
    var itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection: function clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
        window.getSelection().removeAllRanges();
      }
    } else if (document["selection"] && document["selection"].empty) {
      try {
        document["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection: function getSelection() {
    if (window.getSelection) return window.getSelection().toString();
    else if (document.getSelection) return document.getSelection().toString();
    else if (document["selection"]) return document["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth: function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
    var scrollDiv = document.createElement("div");
    this.addStyles(scrollDiv, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-9999px"
    });
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
    return window.innerWidth - document.documentElement.offsetWidth;
  },
  getBrowser: function getBrowser() {
    if (!this.browser) {
      var matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent: function resolveUserAgent() {
    var ua = navigator.userAgent.toLowerCase();
    var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible: function isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod: function invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist: function isExist(element) {
    return !!(element !== null && typeof element !== "undefined" && element.nodeName && this.getParentNode(element));
  },
  isClient: function isClient2() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  },
  focus: function focus(el, options) {
    el && document.activeElement !== el && el.focus(options);
  },
  isFocusableElement: function isFocusableElement(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(element) ? element.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector)) : false;
  },
  getFocusableElements: function getFocusableElements(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var focusableElements = this.find(element, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector));
    var visibleFocusableElements = [];
    var _iterator3 = _createForOfIteratorHelper$1(focusableElements), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var focusableElement = _step3.value;
        if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden") visibleFocusableElements.push(focusableElement);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement: function getLastFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
    var focusableElements = this.getFocusableElements(container, selector);
    var index2 = focusableElements.length > 0 ? focusableElements.findIndex(function(el) {
      return el === element;
    }) : -1;
    var nextIndex = index2 > -1 && focusableElements.length >= index2 + 1 ? index2 + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    while (previousElement) {
      if (previousElement.matches(selector)) {
        return previousElement;
      } else {
        previousElement = previousElement.previousElementSibling;
      }
    }
    return null;
  },
  getNextElementSibling: function getNextElementSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    while (nextElement) {
      if (nextElement.matches(selector)) {
        return nextElement;
      } else {
        nextElement = nextElement.nextElementSibling;
      }
    }
    return null;
  },
  isClickable: function isClickable(element) {
    if (element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === "INPUT" || targetNode === "TEXTAREA" || targetNode === "BUTTON" || targetNode === "A" || parentNode === "INPUT" || parentNode === "TEXTAREA" || parentNode === "BUTTON" || parentNode === "A" || !!element.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return false;
  },
  applyStyle: function applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (var prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS: function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
  },
  isAndroid: function isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  },
  isTouchDevice: function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function hasCSSAnimation(element) {
    if (element) {
      var style = getComputedStyle(element);
      var animationDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
      return animationDuration > 0;
    }
    return false;
  },
  hasCSSTransition: function hasCSSTransition(element) {
    if (element) {
      var style = getComputedStyle(element);
      var transitionDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
      return transitionDuration > 0;
    }
    return false;
  },
  exportCSV: function exportCSV(csv, filename) {
    var blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      var link = document.createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        window.open(encodeURI(csv));
      }
    }
  },
  blockBodyScroll: function blockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    document.body.style.setProperty($dt("scrollbar.width").name, this.calculateBodyScrollbarWidth() + "px");
    this.addClass(document.body, className);
  },
  unblockBodyScroll: function unblockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    document.body.style.removeProperty($dt("scrollbar.width").name);
    this.removeClass(document.body, className);
  }
};
function _typeof$22(o) {
  "@babel/helpers - typeof";
  return _typeof$22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$22(o);
}
function _classCallCheck$1(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$1(o.key), o);
  }
}
function _createClass$1(e, r, t) {
  return r && _defineProperties$1(e.prototype, r), t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$22(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$22(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$22(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ConnectedOverlayScrollHandler = function() {
  function ConnectedOverlayScrollHandler2(element) {
    var listener = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    _classCallCheck$1(this, ConnectedOverlayScrollHandler2);
    this.element = element;
    this.listener = listener;
  }
  return _createClass$1(ConnectedOverlayScrollHandler2, [{
    key: "bindScrollListener",
    value: function bindScrollListener() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (var i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollableParents) {
        for (var i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener("scroll", this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
}();
function primebus() {
  var allHandlers = /* @__PURE__ */ new Map();
  return {
    on: function on(type, handler2) {
      var handlers = allHandlers.get(type);
      if (!handlers) handlers = [handler2];
      else handlers.push(handler2);
      allHandlers.set(type, handlers);
    },
    off: function off(type, handler2) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit: function emit(type, evt) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map(function(handler2) {
          handler2(evt);
        });
      }
    }
  };
}
function _slicedToArray2(r, e) {
  return _arrayWithHoles2(r) || _iterableToArrayLimit2(r, e) || _unsupportedIterableToArray$22(r, e) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles2(r) {
  if (Array.isArray(r)) return r;
}
function _toConsumableArray$22(r) {
  return _arrayWithoutHoles$22(r) || _iterableToArray$22(r) || _unsupportedIterableToArray$22(r) || _nonIterableSpread$22();
}
function _nonIterableSpread$22() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$22(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$22(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$22(r);
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray$22(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t["return"] || t["return"]();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray$22(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$22(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$22(r, a) : void 0;
  }
}
function _arrayLikeToArray$22(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
var ObjectUtils = {
  equals: function equals(obj1, obj2, field) {
    if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else return this.deepEquals(obj1, obj2);
  },
  deepEquals: function deepEquals(a, b) {
    if (a === b) return true;
    if (a && b && _typeof$1(a) == "object" && _typeof$1(b) == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; ) if (!this.deepEquals(a[i], b[i])) return false;
        return true;
      }
      if (arrA != arrB) return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData: function resolveFieldData(data, field) {
    if (!data || !field) {
      return null;
    }
    try {
      var value = data[field];
      if (this.isNotEmpty(value)) return value;
    } catch (_unused) {
    }
    if (Object.keys(data).length) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        var fields = field.split(".");
        var _value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (_value == null) {
            return null;
          }
          _value = _value[fields[i]];
        }
        return _value;
      }
    }
    return null;
  },
  getItemValue: function getItemValue2(obj) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
  },
  filter: function filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      var _iterator = _createForOfIteratorHelper(value), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          var _iterator2 = _createForOfIteratorHelper(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return filteredItems;
  },
  reorderArray: function reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList: function findIndexInList(value, list) {
    var index2 = -1;
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index2 = i;
          break;
        }
      }
    }
    return index2;
  },
  contains: function contains(value, list) {
    if (value != null && list && list.length) {
      var _iterator3 = _createForOfIteratorHelper(list), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var val = _step3.value;
          if (this.equals(value, val)) return true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  insertIntoOrderedArray: function insertIntoOrderedArray(item, index2, arr, sourceArr) {
    if (arr.length > 0) {
      var injected = false;
      for (var i = 0; i < arr.length; i++) {
        var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index2) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents: function removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp: function getVNodeProp(vnode, prop) {
    if (vnode) {
      var props = vnode.props;
      if (props) {
        var kebabProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
        return vnode.type["extends"].props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
      }
    }
    return null;
  },
  toFlatCase: function toFlatCase2(str) {
    return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  },
  toKebabCase: function toKebabCase2(str) {
    return this.isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, function(c, i) {
      return i === 0 ? c : "-" + c.toLowerCase();
    }).toLowerCase() : str;
  },
  toCapitalCase: function toCapitalCase(str) {
    return this.isString(str, {
      empty: false
    }) ? str[0].toUpperCase() + str.slice(1) : str;
  },
  isEmpty: function isEmpty2(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1(value) === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty: function isNotEmpty2(value) {
    return !this.isEmpty(value);
  },
  isFunction: function isFunction2(value) {
    return !!(value && value.constructor && value.call && value.apply);
  },
  isObject: function isObject2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
  },
  isDate: function isDate(value) {
    return value instanceof Date && value.constructor === Date;
  },
  isArray: function isArray2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return Array.isArray(value) && (empty || value.length !== 0);
  },
  isString: function isString2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return typeof value === "string" && (empty || value !== "");
  },
  isPrintableCharacter: function isPrintableCharacter() {
    var _char = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function findLast(arr, callback) {
    var item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch (_unused2) {
        item = _toConsumableArray$22(arr).reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function findLastIndex(arr, callback) {
    var index2 = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index2 = arr.findLastIndex(callback);
      } catch (_unused3) {
        index2 = arr.lastIndexOf(_toConsumableArray$22(arr).reverse().find(callback));
      }
    }
    return index2;
  },
  sort: function sort(value1, value2) {
    var order = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var comparator = arguments.length > 3 ? arguments[3] : void 0;
    var nullSortOrder = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    var result = this.compare(value1, value2, comparator, order);
    var finalSortOrder = order;
    if (this.isEmpty(value1) || this.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }
    return finalSortOrder * result;
  },
  compare: function compare(value1, value2, comparator) {
    var order = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
    var result = -1;
    var emptyValue1 = this.isEmpty(value1);
    var emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2) result = 0;
    else if (emptyValue1) result = order;
    else if (emptyValue2) result = -order;
    else if (typeof value1 === "string" && typeof value2 === "string") result = comparator(value1, value2);
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  },
  localeComparator: function localeComparator() {
    return new Intl.Collator(void 0, {
      numeric: true
    }).compare;
  },
  nestedKeys: function nestedKeys() {
    var _this = this;
    var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(obj).reduce(function(o, _ref) {
      var _ref2 = _slicedToArray2(_ref, 2), key = _ref2[0], value = _ref2[1];
      var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
      _this.isObject(value) ? o = o.concat(_this.nestedKeys(value, currentKey)) : o.push(currentKey);
      return o;
    }, []);
  },
  stringify: function stringify(value) {
    var _this2 = this;
    var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    var currentIndent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var currentIndentStr = " ".repeat(currentIndent);
    var nextIndentStr = " ".repeat(currentIndent + indent);
    if (this.isArray(value)) {
      return "[" + value.map(function(v) {
        return _this2.stringify(v, indent, currentIndent + indent);
      }).join(", ") + "]";
    } else if (this.isDate(value)) {
      return value.toISOString();
    } else if (this.isFunction(value)) {
      return value.toString();
    } else if (this.isObject(value)) {
      return "{\n" + Object.entries(value).map(function(_ref3) {
        var _ref4 = _slicedToArray2(_ref3, 2), k = _ref4[0], v = _ref4[1];
        return "".concat(nextIndentStr).concat(k, ": ").concat(_this2.stringify(v, indent, currentIndent + indent));
      }).join(",\n") + "\n".concat(currentIndentStr) + "}";
    } else {
      return JSON.stringify(value);
    }
  },
  minifyCSS: function minifyCSS2(css3) {
    return css3 ? css3.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":") : css3;
  }
};
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function _toConsumableArray$12(r) {
  return _arrayWithoutHoles$12(r) || _iterableToArray$12(r) || _unsupportedIterableToArray$12(r) || _nonIterableSpread$12();
}
function _nonIterableSpread$12() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$12(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$12(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$12(r, a) : void 0;
  }
}
function _iterableToArray$12(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$12(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$12(r);
}
function _arrayLikeToArray$12(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey2(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _default = function() {
  function _default2(_ref) {
    var init = _ref.init, type = _ref.type;
    _classCallCheck(this, _default2);
    _defineProperty2(this, "helpers", void 0);
    _defineProperty2(this, "type", void 0);
    this.helpers = new Set(init);
    this.type = type;
  }
  return _createClass(_default2, [{
    key: "add",
    value: function add(instance) {
      this.helpers.add(instance);
    }
  }, {
    key: "update",
    value: function update2() {
    }
  }, {
    key: "delete",
    value: function _delete(instance) {
      this.helpers["delete"](instance);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.helpers.clear();
    }
  }, {
    key: "get",
    value: function get(parentInstance, slots) {
      var children = this._get(parentInstance, slots);
      var computed = children ? this._recursive(_toConsumableArray$12(this.helpers), children) : null;
      return ObjectUtils.isNotEmpty(computed) ? computed : null;
    }
  }, {
    key: "_isMatched",
    value: function _isMatched(instance, key) {
      var _parent$vnode;
      var parent = instance === null || instance === void 0 ? void 0 : instance.parent;
      return (parent === null || parent === void 0 || (_parent$vnode = parent.vnode) === null || _parent$vnode === void 0 ? void 0 : _parent$vnode.key) === key || parent && this._isMatched(parent, key) || false;
    }
  }, {
    key: "_get",
    value: function _get(parentInstance, slots) {
      var _ref2, _ref2$default;
      return ((_ref2 = slots || (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$slots)) === null || _ref2 === void 0 || (_ref2$default = _ref2["default"]) === null || _ref2$default === void 0 ? void 0 : _ref2$default.call(_ref2)) || null;
    }
  }, {
    key: "_recursive",
    value: function _recursive() {
      var _this = this;
      var helpers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var children = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      var components = [];
      children.forEach(function(child) {
        if (child.children instanceof Array) {
          components = components.concat(_this._recursive(components, child.children));
        } else if (child.type.name === _this.type) {
          components.push(child);
        } else if (ObjectUtils.isNotEmpty(child.key)) {
          components = components.concat(helpers.filter(function(c) {
            return _this._isMatched(c, child.key);
          }).map(function(c) {
            return c.vnode;
          }));
        }
      });
      return components;
    }
  }]);
}();
var lastIds = {};
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  if (!lastIds.hasOwnProperty(prefix)) {
    lastIds[prefix] = 0;
  }
  lastIds[prefix]++;
  return "".concat(prefix).concat(lastIds[prefix]);
}
function _toConsumableArray2(r) {
  return _arrayWithoutHoles2(r) || _iterableToArray2(r) || _unsupportedIterableToArray2(r) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
  }
}
function _iterableToArray2(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles2(r) {
  if (Array.isArray(r)) return _arrayLikeToArray2(r);
}
function _arrayLikeToArray2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function handler() {
  var zIndexes = [];
  var generateZIndex = function generateZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 999;
    var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key,
      value: newZIndex
    });
    return newZIndex;
  };
  var revertZIndex = function revertZIndex2(zIndex) {
    zIndexes = zIndexes.filter(function(obj) {
      return obj.value !== zIndex;
    });
  };
  var getCurrentZIndex = function getCurrentZIndex2(key, autoZIndex) {
    return getLastZIndex(key, autoZIndex).value;
  };
  var getLastZIndex = function getLastZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return _toConsumableArray2(zIndexes).reverse().find(function(obj) {
      return autoZIndex ? true : obj.key === key;
    }) || {
      key,
      value: baseZIndex
    };
  };
  var getZIndex = function getZIndex2(el) {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: function set(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: function getCurrent(key) {
      return getCurrentZIndex(key, true);
    }
  };
}
var ZIndexUtils = handler();

// node_modules/@primevue/core/usestyle/index.mjs
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty3(e, r, t) {
  return (r = _toPropertyKey3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey3(t) {
  var i = _toPrimitive3(t, "string");
  return "symbol" == _typeof3(i) ? i : i + "";
}
function _toPrimitive3(t, r) {
  if ("object" != _typeof3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance()) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}
var _id = 0;
function useStyle(css3) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css3);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? window.document : void 0;
  var _options$document = options.document, document2 = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$first = options.first, first = _options$first === void 0 ? false : _options$first, _options$onMounted = options.onMounted, onStyleMounted2 = _options$onMounted === void 0 ? void 0 : _options$onMounted, _options$onUpdated = options.onUpdated, onStyleUpdated2 = _options$onUpdated === void 0 ? void 0 : _options$onUpdated, _options$onLoad = options.onLoad, onStyleLoaded2 = _options$onLoad === void 0 ? void 0 : _options$onLoad, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load2 = function load3(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document2) return;
    var _styleProps = _objectSpread(_objectSpread({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document2.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document2.getElementById(_id2) || document2.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css3;
      DomHandler.setAttributes(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      first ? document2.head.prepend(styleRef.value) : document2.head.appendChild(styleRef.value);
      DomHandler.setAttribute(styleRef.value, "data-primevue-style-id", _name);
      DomHandler.setAttributes(styleRef.value, _styleProps);
      styleRef.value.onload = function(event) {
        return onStyleLoaded2 === null || onStyleLoaded2 === void 0 ? void 0 : onStyleLoaded2(event, {
          name: _name
        });
      };
      onStyleMounted2 === null || onStyleMounted2 === void 0 || onStyleMounted2(_name);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
      onStyleUpdated2 === null || onStyleUpdated2 === void 0 || onStyleUpdated2(_name);
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document2 || !isLoaded.value) return;
    stop();
    DomHandler.isExist(styleRef.value) && document2.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load2);
  return {
    id,
    name,
    el: styleRef,
    css: cssRef,
    unload,
    load: load2,
    isLoaded: readonly(isLoaded)
  };
}

// node_modules/@primevue/core/base/style/index.mjs
function _typeof4(o) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof4(o);
}
function _slicedToArray3(r, e) {
  return _arrayWithHoles3(r) || _iterableToArrayLimit3(r, e) || _unsupportedIterableToArray3(r, e) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray3(r, a) : void 0;
  }
}
function _arrayLikeToArray3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles3(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty4(e, r, t) {
  return (r = _toPropertyKey4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey4(t) {
  var i = _toPrimitive4(t, "string");
  return "symbol" == _typeof4(i) ? i : i + "";
}
function _toPrimitive4(t, r) {
  if ("object" != _typeof4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var theme = function theme2(_ref) {
  var dt3 = _ref.dt;
  return "\n* {\n    box-sizing: border-box;\n}\n\n/* Non vue overlay animations */\n.p-connected-overlay {\n    opacity: 0;\n    transform: scaleY(0.8);\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-connected-overlay-visible {\n    opacity: 1;\n    transform: scaleY(1);\n}\n\n.p-connected-overlay-hidden {\n    opacity: 0;\n    transform: scaleY(1);\n    transition: opacity 0.1s linear;\n}\n\n/* Vue based overlay animations */\n.p-connected-overlay-enter-from {\n    opacity: 0;\n    transform: scaleY(0.8);\n}\n\n.p-connected-overlay-leave-to {\n    opacity: 0;\n}\n\n.p-connected-overlay-enter-active {\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-connected-overlay-leave-active {\n    transition: opacity 0.1s linear;\n}\n\n/* Toggleable Content */\n.p-toggleable-content-enter-from,\n.p-toggleable-content-leave-to {\n    max-height: 0;\n}\n\n.p-toggleable-content-enter-to,\n.p-toggleable-content-leave-from {\n    max-height: 1000px;\n}\n\n.p-toggleable-content-leave-active {\n    overflow: hidden;\n    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n}\n\n.p-toggleable-content-enter-active {\n    overflow: hidden;\n    transition: max-height 1s ease-in-out;\n}\n\n.p-disabled,\n.p-disabled * {\n    cursor: default;\n    pointer-events: none;\n    user-select: none;\n}\n\n.p-disabled,\n.p-component:disabled {\n    opacity: ".concat(dt3("disabled.opacity"), ";\n}\n\n.pi {\n    font-size: ").concat(dt3("icon.size"), ";\n}\n\n.p-icon {\n    width: ").concat(dt3("icon.size"), ";\n    height: ").concat(dt3("icon.size"), ";\n}\n\n.p-overlay-mask {\n    background: ").concat(dt3("mask.background"), ";\n    color: ").concat(dt3("mask.color"), ";\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.p-overlay-mask-enter {\n    animation: p-overlay-mask-enter-animation ").concat(dt3("mask.transition.duration"), " forwards;\n}\n\n.p-overlay-mask-leave {\n    animation: p-overlay-mask-leave-animation ").concat(dt3("mask.transition.duration"), " forwards;\n}\n\n@keyframes p-overlay-mask-enter-animation {\n    from {\n        background: transparent;\n    }\n    to {\n        background: ").concat(dt3("mask.background"), ";\n    }\n}\n@keyframes p-overlay-mask-leave-animation {\n    from {\n        background: ").concat(dt3("mask.background"), ";\n    }\n    to {\n        background: transparent;\n    }\n}\n");
};
var css = function css2(_ref2) {
  var dt3 = _ref2.dt;
  return "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: ".concat(dt3("scrollbar.width"), ";\n}\n");
};
var classes = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css,
  theme,
  classes,
  inlineStyles,
  load: function load(style) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var transform = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(cs) {
      return cs;
    };
    var computedStyle = transform(ObjectUtils.getItemValue(style, {
      dt
    }));
    return computedStyle ? useStyle(ObjectUtils.minifyCSS(computedStyle), _objectSpread2({
      name: this.name
    }, options)) : {};
  },
  loadCSS: function loadCSS() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, options);
  },
  loadTheme: function loadTheme() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.theme, options, function(computedStyle) {
      return Theme.transformCSS(options.name || _this.name, computedStyle);
    });
  },
  getCommonTheme: function getCommonTheme(params) {
    return Theme.getCommon(this.name, params);
  },
  getComponentTheme: function getComponentTheme(params) {
    return Theme.getComponent(this.name, params);
  },
  getDirectiveTheme: function getDirectiveTheme(params) {
    return Theme.getDirective(this.name, params);
  },
  getPresetTheme: function getPresetTheme(preset, selector, params) {
    return Theme.getCustomPreset(this.name, preset, selector, params);
  },
  getLayerOrderThemeCSS: function getLayerOrderThemeCSS() {
    return Theme.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function getStyleSheet3() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _css = ObjectUtils.getItemValue(this.css, {
        dt
      });
      var _style = ObjectUtils.minifyCSS("".concat(_css).concat(extendedCSS));
      var _props = Object.entries(props).reduce(function(acc, _ref3) {
        var _ref4 = _slicedToArray3(_ref3, 2), k = _ref4[0], v = _ref4[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(_style, "</style>");
    }
    return "";
  },
  getCommonThemeStyleSheet: function getCommonThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Theme.getCommonStyleSheet(this.name, params, props);
  },
  getThemeStyleSheet: function getThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var css3 = [Theme.getStyleSheet(this.name, params, props)];
    if (this.theme) {
      var name = this.name === "base" ? "global-style" : "".concat(this.name, "-style");
      var _css = ObjectUtils.getItemValue(this.theme, {
        dt
      });
      var _style = ObjectUtils.minifyCSS(Theme.transformCSS(name, _css));
      var _props = Object.entries(props).reduce(function(acc, _ref5) {
        var _ref6 = _slicedToArray3(_ref5, 2), k = _ref6[0], v = _ref6[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      css3.push('<style type="text/css" data-primevue-style-id="'.concat(name, '" ').concat(_props, ">").concat(_style, "</style>"));
    }
    return css3.join("");
  },
  extend: function extend(style) {
    return _objectSpread2(_objectSpread2({}, this), {}, {
      css: void 0,
      theme: void 0
    }, style);
  }
};

export {
  ThemeService,
  Theme,
  DomHandler,
  ConnectedOverlayScrollHandler,
  primebus,
  ObjectUtils,
  UniqueComponentId,
  ZIndexUtils,
  BaseStyle
};
//# sourceMappingURL=chunk-BRIU7XZZ.js.map
