// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@v0.1.0-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-accessor@v0.1.0-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-write-accessor@v0.2.0-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-constant-function@v0.2.0-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-noop@v0.2.0-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/object-assign@v0.2.0-esm/index.mjs";import{isPrimitive as o}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number@v0.2.0-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.0-esm/index.mjs";import{isPrimitive as m}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-integer@v0.2.0-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.0-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-max@v0.2.0-esm/index.mjs";import{factory as u}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-beta@v0.1.0-esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/symbol-iterator@v0.2.0-esm/index.mjs";import j from"https://cdn.jsdelivr.net/gh/stdlib-js/string-format@v0.1.1-esm/index.mjs";function h(v,g,f){var c,b,x,y,w;if(!o(v))throw new TypeError(j("invalid argument. First argument must be a positive number. Value: `%s`.",v));if(!o(g))throw new TypeError(j("invalid argument. Second argument must be a positive number. Value: `%s`.",g));if(arguments.length>2){if(!d(f))throw new TypeError(j("invalid argument. Options argument must be an object. Value: `%s`.",f));if(c=r({},f),l(c,"iter")){if(!m(c.iter))throw new TypeError(j("invalid option. `%s` option must be a nonnegative integer. Option: `%s`.","iter",c.iter))}else c.iter=a;x=u(v,g,c),void 0===c.prng&&!1!==c.copy&&(c.state=x.state)}else x=u(v,g),c={iter:a,state:x.state};return w=0,e(b={},"next",L),e(b,"return",P),c&&c.prng?(e(b,"seed",null),e(b,"seedLength",null),n(b,"state",s(null),i),e(b,"stateLength",null),e(b,"byteLength",null)):(t(b,"seed",N),t(b,"seedLength",R),n(b,"state",V,O),t(b,"stateLength",E),t(b,"byteLength",T)),e(b,"PRNG",x.PRNG),p&&e(b,p,G),b;function L(){return w+=1,y||w>c.iter?{done:!0}:{value:x(),done:!1}}function P(e){return y=!0,arguments.length?{value:e,done:!0}:{done:!0}}function G(){return h(v,g,c)}function N(){return x.PRNG.seed}function R(){return x.PRNG.seedLength}function E(){return x.PRNG.stateLength}function T(){return x.PRNG.byteLength}function V(){return x.PRNG.state}function O(e){x.PRNG.state=e}}export{h as default};
//# sourceMappingURL=index.mjs.map
