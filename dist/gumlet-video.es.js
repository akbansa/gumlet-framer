import ke, { useState as vr, useEffect as pr, useMemo as ee } from "react";
import { addPropertyControls as mr, ControlType as O } from "framer";
var q = { exports: {} }, W = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function yr() {
  if (xe) return W;
  xe = 1;
  var c = ke, d = Symbol.for("react.element"), s = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, g = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(T, l, R) {
    var m, _ = {}, C = null, P = null;
    R !== void 0 && (C = "" + R), l.key !== void 0 && (C = "" + l.key), l.ref !== void 0 && (P = l.ref);
    for (m in l) p.call(l, m) && !y.hasOwnProperty(m) && (_[m] = l[m]);
    if (T && T.defaultProps) for (m in l = T.defaultProps, l) _[m] === void 0 && (_[m] = l[m]);
    return { $$typeof: d, type: T, key: C, ref: P, props: _, _owner: g.current };
  }
  return W.Fragment = s, W.jsx = x, W.jsxs = x, W;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function gr() {
  return Pe || (Pe = 1, process.env.NODE_ENV !== "production" && (function() {
    var c = ke, d = Symbol.for("react.element"), s = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), T = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), D = Symbol.iterator, S = "@@iterator";
    function te(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = D && e[D] || e[S];
      return typeof r == "function" ? r : null;
    }
    var j = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Fe("error", e, t);
      }
    }
    function Fe(e, r, t) {
      {
        var n = j.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var Ie = !1, De = !1, Ae = !1, Ue = !1, Ve = !1, ne;
    ne = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === p || e === y || Ve || e === g || e === R || e === m || Ue || e === P || Ie || De || Ae || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === _ || e.$$typeof === x || e.$$typeof === T || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ne || e.getModuleId !== void 0));
    }
    function We(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case p:
          return "Fragment";
        case s:
          return "Portal";
        case y:
          return "Profiler";
        case g:
          return "StrictMode";
        case R:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case T:
            var r = e;
            return ae(r) + ".Consumer";
          case x:
            var t = e;
            return ae(t._context) + ".Provider";
          case l:
            return We(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : k(e.type) || "Memo";
          case C: {
            var i = e, u = i._payload, o = i._init;
            try {
              return k(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, V = 0, oe, ie, ue, le, se, fe, ce;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function Ye() {
      {
        if (V === 0) {
          oe = console.log, ie = console.info, ue = console.warn, le = console.error, se = console.group, fe = console.groupCollapsed, ce = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: de,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        V++;
      }
    }
    function Le() {
      {
        if (V--, V === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: oe
            }),
            info: F({}, e, {
              value: ie
            }),
            warn: F({}, e, {
              value: ue
            }),
            error: F({}, e, {
              value: le
            }),
            group: F({}, e, {
              value: se
            }),
            groupCollapsed: F({}, e, {
              value: fe
            }),
            groupEnd: F({}, e, {
              value: ce
            })
          });
        }
        V < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = j.ReactCurrentDispatcher, J;
    function L(e, r, t) {
      {
        if (J === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            J = n && n[1] || "";
          }
        return `
` + J + e;
      }
    }
    var K = !1, N;
    {
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      N = new Ne();
    }
    function ve(e, r) {
      if (!e || K)
        return "";
      {
        var t = N.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      K = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = G.current, G.current = null, Ye();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (E) {
              n = E;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (E) {
              n = E;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (E) {
            n = E;
          }
          e();
        }
      } catch (E) {
        if (E && n && typeof E.stack == "string") {
          for (var a = E.stack.split(`
`), h = n.stack.split(`
`), f = a.length - 1, v = h.length - 1; f >= 1 && v >= 0 && a[f] !== h[v]; )
            v--;
          for (; f >= 1 && v >= 0; f--, v--)
            if (a[f] !== h[v]) {
              if (f !== 1 || v !== 1)
                do
                  if (f--, v--, v < 0 || a[f] !== h[v]) {
                    var w = `
` + a[f].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && N.set(e, w), w;
                  }
                while (f >= 1 && v >= 0);
              break;
            }
        }
      } finally {
        K = !1, G.current = u, Le(), Error.prepareStackTrace = i;
      }
      var U = e ? e.displayName || e.name : "", I = U ? L(U) : "";
      return typeof e == "function" && N.set(e, I), I;
    }
    function Me(e, r, t) {
      return ve(e, !1);
    }
    function Be(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function M(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Be(e));
      if (typeof e == "string")
        return L(e);
      switch (e) {
        case R:
          return L("Suspense");
        case m:
          return L("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return Me(e.render);
          case _:
            return M(e.type, r, t);
          case C: {
            var n = e, i = n._payload, u = n._init;
            try {
              return M(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var $ = Object.prototype.hasOwnProperty, pe = {}, me = j.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        me.setExtraStackFrame(t);
      } else
        me.setExtraStackFrame(null);
    }
    function qe(e, r, t, n, i) {
      {
        var u = Function.call.bind($);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var h = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw h.name = "Invariant Violation", h;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f) {
              a = f;
            }
            a && !(a instanceof Error) && (B(i), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), B(null)), a instanceof Error && !(a.message in pe) && (pe[a.message] = !0, B(i), b("Failed %s type: %s", t, a.message), B(null));
          }
      }
    }
    var Ge = Array.isArray;
    function z(e) {
      return Ge(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ke(e) {
      try {
        return ye(e), !1;
      } catch {
        return !0;
      }
    }
    function ye(e) {
      return "" + e;
    }
    function ge(e) {
      if (Ke(e))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), ye(e);
    }
    var be = j.ReactCurrentOwner, ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, he, Re;
    function Xe(e) {
      if ($.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if ($.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Qe(e, r) {
      typeof e.ref == "string" && be.current;
    }
    function Ze(e, r) {
      {
        var t = function() {
          he || (he = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          Re || (Re = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function tr(e, r, t, n, i) {
      {
        var u, o = {}, a = null, h = null;
        t !== void 0 && (ge(t), a = "" + t), He(r) && (ge(r.key), a = "" + r.key), Xe(r) && (h = r.ref, Qe(r, i));
        for (u in r)
          $.call(r, u) && !ze.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var f = e.defaultProps;
          for (u in f)
            o[u] === void 0 && (o[u] = f[u]);
        }
        if (a || h) {
          var v = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ze(o, v), h && er(o, v);
        }
        return rr(e, a, h, i, n, be.current, o);
      }
    }
    var X = j.ReactCurrentOwner, _e = j.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(t);
      } else
        _e.setExtraStackFrame(null);
    }
    var H;
    H = !1;
    function Q(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function Ee() {
      {
        if (X.current) {
          var e = k(X.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      return "";
    }
    var Te = {};
    function ar(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Se(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ar(r);
        if (Te[t])
          return;
        Te[t] = !0;
        var n = "";
        e && e._owner && e._owner !== X.current && (n = " It was passed a child from " + k(e._owner.type) + "."), A(e), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function we(e, r) {
      {
        if (typeof e != "object")
          return;
        if (z(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            Q(n) && Se(n, r);
          }
        else if (Q(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = te(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              Q(o.value) && Se(o.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = k(r);
          qe(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !H) {
          H = !0;
          var i = k(r);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), b("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var Oe = {};
    function Ce(e, r, t, n, i, u) {
      {
        var o = $e(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var h = nr();
          h ? a += h : a += Ee();
          var f;
          e === null ? f = "null" : z(e) ? f = "array" : e !== void 0 && e.$$typeof === d ? (f = "<" + (k(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, a);
        }
        var v = tr(e, r, t, i, u);
        if (v == null)
          return v;
        if (o) {
          var w = r.children;
          if (w !== void 0)
            if (n)
              if (z(w)) {
                for (var U = 0; U < w.length; U++)
                  we(w[U], e);
                Object.freeze && Object.freeze(w);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              we(w, e);
        }
        if ($.call(r, "key")) {
          var I = k(e), E = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), Z = E.length > 0 ? "{key: someKey, " + E.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Oe[I + Z]) {
            var cr = E.length > 0 ? "{" + E.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, I, cr, I), Oe[I + Z] = !0;
          }
        }
        return e === p ? ir(v) : or(v), v;
      }
    }
    function ur(e, r, t) {
      return Ce(e, r, t, !0);
    }
    function lr(e, r, t) {
      return Ce(e, r, t, !1);
    }
    var sr = lr, fr = ur;
    Y.Fragment = p, Y.jsx = sr, Y.jsxs = fr;
  })()), Y;
}
var je;
function br() {
  return je || (je = 1, process.env.NODE_ENV === "production" ? q.exports = yr() : q.exports = gr()), q.exports;
}
var re = br();
function hr(c) {
  if (!c) return "";
  const d = new URLSearchParams(), s = (g, y) => {
    y != null && (typeof y == "boolean" ? d.set(g, y ? "true" : "false") : d.set(g, String(y)));
  };
  s("autoplay", c.autoplay), s("loop", c.loop), s("controls", c.controls), s("preload", c.preload), s("muted", c.muted), s("watermark_text", c.watermarkText), s("gm_user_id", c.gmUserId), s("gm_user_name", c.gmUserName);
  const p = d.toString();
  return p ? `?${p}` : "";
}
function Rr({
  videoId: c,
  options: d,
  className: s,
  style: p,
  aspectRatio: g = "16 / 9",
  allowFullscreen: y = !0,
  title: x = "Gumlet Video",
  embedUrlOverride: T,
  resolveEditorUser: l = !0
}) {
  const [R, m] = vr(null);
  pr(() => {
    let S = !1;
    return l ? ((async () => {
      try {
        const j = await (await import("./index-DN_Wzisq.js")).framer.getCurrentUser();
        S || m(j);
      } catch {
      }
    })(), () => {
      S = !0;
    }) : () => {
      S = !0;
    };
  }, [l]);
  const _ = ee(() => {
    const S = d ? { ...d } : void 0;
    return !l || !R ? S : {
      ...S,
      watermarkText: S?.watermarkText ?? R.name ?? R.id,
      gmUserId: S?.gmUserId,
      gmUserName: S?.gmUserName
    };
  }, [d, l, R?.id, R?.name]), C = ee(() => T || `${`https://play.gumlet.io/embed/${encodeURIComponent(c)}`}${hr(_)}`, [c, _, T]), P = {
    position: "relative",
    width: "100%",
    aspectRatio: g,
    ...p
  }, D = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  };
  return /* @__PURE__ */ re.jsx("div", { className: s, style: P, children: /* @__PURE__ */ re.jsx(
    "iframe",
    {
      src: C,
      title: x,
      allow: [
        "autoplay",
        "encrypted-media",
        "picture-in-picture",
        "fullscreen",
        "accelerometer",
        "gyroscope"
      ].filter(Boolean).join("; "),
      allowFullScreen: y,
      style: D
    }
  ) });
}
function _r(c) {
  const d = (c ?? "").trim();
  if (!d) return {};
  try {
    const s = new URL(d);
    if (/play\.gumlet\.io/.test(s.host)) {
      const p = s.pathname.split("/").filter(Boolean), g = p.findIndex((y) => y.toLowerCase() === "embed");
      return g >= 0 && p[g + 1] ? { videoId: decodeURIComponent(p[g + 1]) } : { embedUrlOverride: s.toString() };
    }
    return { embedUrlOverride: s.toString() };
  } catch {
    return { videoId: d };
  }
}
function Er(c) {
  const {
    source: d = "",
    autoplay: s = !1,
    muted: p = !0,
    loop: g = !1,
    controls: y = !0,
    preload: x = !1,
    watermarkText: T = "",
    gmUserId: l = "",
    gmUserName: R = "",
    aspectRatio: m = "16 / 9",
    allowFullscreen: _ = !0,
    title: C = "Gumlet Video"
  } = c, P = ee(() => _r(d), [d]), D = { autoplay: s, loop: g, controls: y, preload: x, muted: p, watermarkText: T, gmUserId: l, gmUserName: R };
  return /* @__PURE__ */ re.jsx(
    Rr,
    {
      videoId: P.videoId ?? "",
      embedUrlOverride: P.embedUrlOverride,
      aspectRatio: m,
      allowFullscreen: _,
      title: C,
      resolveEditorUser: !1,
      options: D
    }
  );
}
mr(Er, {
  source: { type: O.String, title: "Source", defaultValue: "" },
  autoplay: { type: O.Boolean, title: "Autoplay", defaultValue: !1 },
  muted: { type: O.Boolean, title: "Muted", defaultValue: !0 },
  controls: { type: O.Boolean, title: "Controls", defaultValue: !0 },
  loop: { type: O.Boolean, title: "Loop", defaultValue: !1 },
  preload: { type: O.Boolean, title: "Preload", defaultValue: !1 },
  watermarkText: { type: O.String, title: "Watermark", defaultValue: "" },
  gmUserId: { type: O.String, title: "User ID", defaultValue: "" },
  gmUserName: { type: O.String, title: "User Name", defaultValue: "" },
  aspectRatio: { type: O.String, title: "Aspect", defaultValue: "16 / 9" },
  allowFullscreen: { type: O.Boolean, title: "Fullscreen", defaultValue: !0 },
  title: { type: O.String, title: "Title", defaultValue: "Gumlet Video" }
});
export {
  Er as default
};
//# sourceMappingURL=gumlet-video.es.js.map
