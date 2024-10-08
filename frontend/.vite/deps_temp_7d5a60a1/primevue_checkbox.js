import {
  script as script3
} from "./chunk-7LFHR2SY.js";
import {
  script as script2
} from "./chunk-3JOQOVOE.js";
import {
  script
} from "./chunk-O5MRJC6F.js";
import {
  BaseStyle,
  ObjectUtils
} from "./chunk-BRIU7XZZ.js";
import {
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  normalizeClass,
  openBlock,
  renderSlot,
  resolveComponent
} from "./chunk-Q5PGHB6G.js";

// node_modules/@primevue/icons/minus/index.mjs
var script4 = {
  name: "MinusIcon",
  "extends": script2
};
var _hoisted_1 = createBaseVNode("path", {
  d: "M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2 = [_hoisted_1];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2, 16);
}
script4.render = render;

// node_modules/primevue/checkbox/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-checkbox {\n    position: relative;\n    display: inline-flex;\n    user-select: none;\n    vertical-align: bottom;\n    width: ".concat(dt("checkbox.width"), ";\n    height: ").concat(dt("checkbox.height"), ";\n}\n\n.p-checkbox-input {\n    cursor: pointer;\n    appearance: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    opacity: 0;\n    z-index: 1;\n    outline: 0 none;\n    border: 1px solid transparent;\n    border-radius: ").concat(dt("checkbox.border.radius"), ";\n}\n\n.p-checkbox-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: ").concat(dt("checkbox.border.radius"), ";\n    border: 1px solid ").concat(dt("checkbox.border.color"), ";\n    background: ").concat(dt("checkbox.background"), ";\n    width: ").concat(dt("checkbox.width"), ";\n    height: ").concat(dt("checkbox.width"), ";\n    transition: background ").concat(dt("checkbox.transition.duration"), ", color ").concat(dt("checkbox.transition.duration"), ", border-color ").concat(dt("checkbox.transition.duration"), ", box-shadow ").concat(dt("checkbox.transition.duration"), ", outline-color ").concat(dt("checkbox.transition.duration"), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt("checkbox.shadow"), ";\n}\n\n.p-checkbox-icon {\n    transition-duration: ").concat(dt("checkbox.transition.duration"), ";\n    color: ").concat(dt("checkbox.icon.color"), ";\n    font-size: ").concat(dt("checkbox.icon.size"), ";\n    width: ").concat(dt("checkbox.icon.size"), ";\n    height: ").concat(dt("checkbox.icon.size"), ";\n}\n\n.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.hover.border.color"), ";\n}\n\n.p-checkbox-checked .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.checked.border.color"), ";\n    background: ").concat(dt("checkbox.checked.background"), ";\n}\n\n.p-checkbox-checked .p-checkbox-icon {\n    color: ").concat(dt("checkbox.icon.checked.color"), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    background: ").concat(dt("checkbox.checked.hover.background"), ";\n    border-color: ").concat(dt("checkbox.checked.hover.border.color"), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {\n    color: ").concat(dt("checkbox.icon.checked.hover.color"), ";\n}\n\n.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.focus.border.color"), ";\n    box-shadow: ").concat(dt("checkbox.focus.ring.shadow"), ";\n    outline: ").concat(dt("checkbox.focus.ring.width"), " ").concat(dt("checkbox.focus.ring.style"), " ").concat(dt("checkbox.focus.ring.color"), ";\n    outline-offset: ").concat(dt("checkbox.focus.ring.offset"), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.checked.focus.border.color"), ";\n}\n\n.p-checkbox.p-invalid > .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.invalid.border.color"), ";\n}\n\n.p-checkbox.p-variant-filled .p-checkbox-box {\n    background: ").concat(dt("checkbox.filled.background"), ";\n}\n\n.p-checkbox-checked.p-variant-filled .p-checkbox-box {\n    background: ").concat(dt("checkbox.checked.background"), ";\n}\n\n.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    background: ").concat(dt("checkbox.checked.hover.background"), ";\n}\n\n.p-checkbox.p-disabled {\n    opacity: 1;\n}\n\n.p-checkbox.p-disabled .p-checkbox-box {\n    background: ").concat(dt("checkbox.disabled.background"), ";\n}\n\n.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {\n    color: ").concat(dt("checkbox.icon.disabled.color"), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-checkbox p-component", {
      "p-checkbox-checked": instance.checked,
      "p-disabled": props.disabled,
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled" || instance.$primevue.config.inputVariant === "filled"
    }];
  },
  box: "p-checkbox-box",
  input: "p-checkbox-input",
  icon: "p-checkbox-icon"
};
var CheckboxStyle = BaseStyle.extend({
  name: "checkbox",
  theme,
  classes
});

// node_modules/primevue/checkbox/index.mjs
var script$1 = {
  name: "BaseCheckbox",
  "extends": script,
  props: {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
      type: String,
      "default": null
    },
    indeterminate: {
      type: Boolean,
      "default": false
    },
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    required: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: CheckboxStyle,
  provide: function provide() {
    return {
      $pcCheckbox: this,
      $parentInstance: this
    };
  }
};
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
var script5 = {
  name: "Checkbox",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:modelValue", "change", "focus", "blur", "update:indeterminate"],
  data: function data() {
    return {
      d_indeterminate: this.indeterminate
    };
  },
  watch: {
    indeterminate: function indeterminate(newValue) {
      this.d_indeterminate = newValue;
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      var _this = this;
      if (!this.disabled && !this.readonly) {
        var newModelValue;
        if (this.binary) {
          newModelValue = this.d_indeterminate ? this.trueValue : this.checked ? this.falseValue : this.trueValue;
        } else {
          if (this.checked || this.d_indeterminate) newModelValue = this.modelValue.filter(function(val) {
            return !ObjectUtils.equals(val, _this.value);
          });
          else newModelValue = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [this.value]) : [this.value];
        }
        if (this.d_indeterminate) {
          this.d_indeterminate = false;
          this.$emit("update:indeterminate", this.d_indeterminate);
        }
        this.$emit("update:modelValue", newModelValue);
        this.$emit("change", event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.$emit("blur", event);
    }
  },
  computed: {
    checked: function checked() {
      return this.d_indeterminate ? false : this.binary ? this.modelValue === this.trueValue : ObjectUtils.contains(this.value, this.modelValue);
    }
  },
  components: {
    CheckIcon: script3,
    MinusIcon: script4
  }
};
var _hoisted_12 = ["data-p-checked", "data-p-indeterminate", "data-p-disabled"];
var _hoisted_22 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label", "aria-invalid", "aria-checked"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  var _component_MinusIcon = resolveComponent("MinusIcon");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, $options.getPTOptions("root"), {
    "data-p-checked": $options.checked,
    "data-p-indeterminate": $data.d_indeterminate || void 0,
    "data-p-disabled": _ctx.disabled
  }), [createBaseVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.value,
    name: _ctx.name,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    required: _ctx.required,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || void 0,
    "aria-checked": $data.d_indeterminate ? "mixed" : void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions("input")), null, 16, _hoisted_22), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("box")
  }, $options.getPTOptions("box")), [renderSlot(_ctx.$slots, "icon", {
    checked: $options.checked,
    "class": normalizeClass(_ctx.cx("icon"))
  }, function() {
    return [$options.checked ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
      key: 0,
      "class": _ctx.cx("icon")
    }, $options.getPTOptions("icon")), null, 16, ["class"])) : $data.d_indeterminate ? (openBlock(), createBlock(_component_MinusIcon, mergeProps({
      key: 1,
      "class": _ctx.cx("icon")
    }, $options.getPTOptions("icon")), null, 16, ["class"])) : createCommentVNode("", true)];
  })], 16)], 16, _hoisted_12);
}
script5.render = render2;
export {
  script5 as default
};
//# sourceMappingURL=primevue_checkbox.js.map
