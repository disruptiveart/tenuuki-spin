if (typeof window < "u") {
	var e, t, n, r;
	((t = (e = (r = (n = window).__svelte) == null ? n.__svelte = {} : r).v) == null ? e.v = new Set() : t).add("5");
}
let i = !1;
function a() {
	i = !0;
}
a();
const o = {}, s = Symbol(), c = "http://www.w3.org/1999/xhtml";
var l = Array.isArray, u = Array.prototype.indexOf, d = Array.prototype.includes, f = Array.from, p = Object.keys, m = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyDescriptors, _ = Object.prototype, v = Array.prototype, y = Object.getPrototypeOf, b = Object.isExtensible;
const x = () => {};
function ee(e) {
	return e();
}
function te(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function ne() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function re(e) {
	"@babel/helpers - typeof";
	return re = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, re(e);
}
function ie(e, t) {
	if (re(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (re(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ae(e) {
	var t = ie(e, "string");
	return re(t) == "symbol" ? t : t + "";
}
function S(e, t, n) {
	return (t = ae(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var oe;
const C = 1024, w = 2048, T = 4096, se = 8192, ce = 32768, le = 65536, ue = 1 << 19, de = 1 << 20, fe = 65536, pe = 1 << 21, me = 1 << 23, he = Symbol("$state"), ge = Symbol("legacy props"), _e = Symbol(""), ve = new class extends Error {
	constructor(...e) {
		super(...e), S(this, "name", "StaleReactionError"), S(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
	}
}(), ye = !!((oe = globalThis.document) != null && oe.contentType) && globalThis.document.contentType.includes("xml");
function be(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
function xe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Se(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ce() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function we(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Te() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ee() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function De(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Oe() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ke() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ae() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function je() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Me(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ne() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let E = !1;
function Pe(e) {
	E = e;
}
let D;
function Fe(e) {
	if (e === null) throw Me(), o;
	return D = e;
}
function Ie() {
	return Fe(Vn(D));
}
function Le(e) {
	if (E) {
		if (Vn(D) !== null) throw Me(), o;
		D = e;
	}
}
function Re(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = Vn(n);
		D = n;
	}
}
function ze(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = Vn(n);
		e && n.remove(), n = i;
	}
}
function Be(e) {
	if (!e || e.nodeType !== 8) throw Me(), o;
	return e.data;
}
function Ve(e) {
	return e === this.v;
}
function He(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ue(e) {
	return !He(e, this.v);
}
function We(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ge(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? We(Object(n), !0).forEach(function(t) {
			S(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : We(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
let O = null;
function Ke(e) {
	O = e;
}
function qe(e, t = !1, n) {
	O = {
		p: O,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		l: i && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function Je(e) {
	var t = O, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) $n(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, O = t.p, e == null ? {} : e;
}
function Ye() {
	return !i || O !== null && O.l === null;
}
var Xe = [];
function Ze() {
	var e = Xe;
	Xe = [], te(e);
}
function Qe(e) {
	if (Xe.length === 0 && !ut) {
		var t = Xe;
		queueMicrotask(() => {
			t === Xe && Ze();
		});
	}
	Xe.push(e);
}
function $e() {
	for (; Xe.length > 0;) Ze();
}
function et(e) {
	var t = q;
	if (t === null) return W.f |= me, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	tt(e, t);
}
function tt(e, t) {
	for (; t !== null;) {
		if (t.f & 128) {
			if (!(t.f & 32768)) throw e;
			try {
				t.b.error(e);
				return;
			} catch (t) {
				e = t;
			}
		}
		t = t.parent;
	}
	throw e;
}
var nt = ~(T | 3072);
function k(e, t) {
	e.f = e.f & nt | t;
}
function rt(e) {
	e.f & 512 || e.deps === null ? k(e, C) : k(e, T);
}
function it(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= fe, it(t.deps));
}
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), it(e.deps), k(e, C);
}
function ot(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function st(e, t) {
	ot(e, t), t.add(e);
}
function A(e, t, n) {
	ot(e, t), t.set(e, n);
}
function j(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function M(e, t) {
	return e.get(j(e, t));
}
function N(e, t, n) {
	return e.set(j(e, t), n), n;
}
var ct = new Set();
let P = null, F = null;
var I = [], lt = null;
let ut = !1, dt = null;
var ft = 1, pt = new WeakMap(), mt = new WeakMap(), ht = new WeakMap(), gt = new WeakMap(), _t = new WeakMap(), vt = new WeakMap(), yt = new WeakMap(), bt = new WeakMap(), xt = new WeakMap(), St = new WeakSet(), Ct = class e {
	constructor() {
		st(this, St), S(this, "id", ft++), S(this, "current", new Map()), S(this, "previous", new Map()), A(this, pt, new Set()), A(this, mt, new Set()), A(this, ht, 0), A(this, gt, 0), A(this, _t, null), A(this, vt, new Set()), A(this, yt, new Set()), A(this, bt, new Map()), S(this, "is_fork", !1), A(this, xt, !1);
	}
	skip_effect(e) {
		M(bt, this).has(e) || M(bt, this).set(e, {
			d: [],
			m: []
		});
	}
	unskip_effect(e) {
		var t = M(bt, this).get(e);
		if (t) {
			M(bt, this).delete(e);
			for (var n of t.d) k(n, w), Ft(n);
			for (n of t.m) k(n, T), Ft(n);
		}
	}
	process(e) {
		I = [], this.apply();
		var t = dt = [], n = [];
		for (let r of e) j(St, this, Tt).call(this, r, t, n);
		if (dt = null, j(St, this, wt).call(this)) {
			j(St, this, Et).call(this, n), j(St, this, Et).call(this, t);
			for (let [e, t] of M(bt, this)) It(e, t);
		} else {
			var r;
			P = null;
			for (let e of M(pt, this)) e(this);
			M(pt, this).clear(), M(ht, this) === 0 && j(St, this, Dt).call(this), Mt(n), Mt(t), M(vt, this).clear(), M(yt, this).clear(), (r = M(_t, this)) == null || r.resolve();
		}
		F = null;
	}
	capture(e, t) {
		t !== s && !this.previous.has(e) && this.previous.set(e, t), e.f & 8388608 || (this.current.set(e, e.v), F == null || F.set(e, e.v));
	}
	activate() {
		P = this, this.apply();
	}
	deactivate() {
		P === this && (P = null, F = null);
	}
	flush() {
		if (I.length > 0) P = this, kt();
		else if (M(ht, this) === 0 && !this.is_fork) {
			var e;
			for (let e of M(pt, this)) e(this);
			M(pt, this).clear(), j(St, this, Dt).call(this), (e = M(_t, this)) == null || e.resolve();
		}
		this.deactivate();
	}
	discard() {
		for (let e of M(mt, this)) e(this);
		M(mt, this).clear();
	}
	increment(e) {
		N(ht, this, M(ht, this) + 1), e && N(gt, this, M(gt, this) + 1);
	}
	decrement(e) {
		N(ht, this, M(ht, this) - 1), e && N(gt, this, M(gt, this) - 1), !M(xt, this) && (N(xt, this, !0), Qe(() => {
			N(xt, this, !1), j(St, this, wt).call(this) ? I.length > 0 && this.flush() : this.revive();
		}));
	}
	revive() {
		for (let e of M(vt, this)) M(yt, this).delete(e), k(e, w), Ft(e);
		for (let e of M(yt, this)) k(e, T), Ft(e);
		this.flush();
	}
	oncommit(e) {
		M(pt, this).add(e);
	}
	ondiscard(e) {
		M(mt, this).add(e);
	}
	settled() {
		var e;
		return ((e = M(_t, this)) == null ? N(_t, this, ne()) : e).promise;
	}
	static ensure() {
		if (P === null) {
			let t = P = new e();
			ct.add(P), ut || Qe(() => {
				P === t && t.flush();
			});
		}
		return P;
	}
	apply() {}
};
function wt() {
	return this.is_fork || M(gt, this) > 0;
}
function Tt(e, t, n) {
	e.f ^= C;
	for (var r = e.first; r !== null;) {
		var i = r.f, a = (i & 96) != 0, o = a && (i & 1024) != 0, s = (i & se) !== 0;
		if (!(o || M(bt, this).has(r)) && r.fn !== null) {
			a ? s || (r.f ^= C) : i & 4 ? t.push(r) : i & 16777224 && s ? n.push(r) : Mr(r) && (Lr(r), i & 16 && (M(yt, this).add(r), s && k(r, w)));
			var c = r.first;
			if (c !== null) {
				r = c;
				continue;
			}
		}
		for (; r !== null;) {
			var l = r.next;
			if (l !== null) {
				r = l;
				break;
			}
			r = r.parent;
		}
	}
}
function Et(e) {
	for (var t = 0; t < e.length; t += 1) at(e[t], M(vt, this), M(yt, this));
}
function Dt() {
	if (ct.size > 1) {
		this.previous.clear();
		var e = P, t = F, n = !0;
		for (let e of ct) {
			if (e === this) {
				n = !1;
				continue;
			}
			let t = [];
			for (let [r, i] of this.current) {
				if (e.current.has(r)) if (n && i !== e.current.get(r)) e.current.set(r, i);
				else continue;
				t.push(r);
			}
			if (t.length === 0) continue;
			let i = [...e.current.keys()].filter((e) => !this.current.has(e));
			if (i.length > 0) {
				var r = I;
				I = [];
				let n = new Set(), a = new Map();
				for (let e of t) Nt(e, i, n, a);
				if (I.length > 0) {
					P = e, e.apply();
					for (let t of I) j(St, e, Tt).call(e, t, [], []);
					e.deactivate();
				}
				I = r;
			}
		}
		P = e, F = t;
	}
	M(bt, this).clear(), ct.delete(this);
}
function Ot(e) {
	var t = ut;
	ut = !0;
	try {
		var n;
		for (e && (P !== null && kt(), n = e());;) {
			if ($e(), I.length === 0 && (P == null || P.flush(), I.length === 0)) return lt = null, n;
			kt();
		}
	} finally {
		ut = t;
	}
}
function kt() {
	try {
		for (var e = 0; I.length > 0;) {
			var t = Ct.ensure();
			e++ > 1e3 && At(), t.process(I), wn.clear();
		}
	} finally {
		I = [], lt = null, dt = null;
	}
}
function At() {
	try {
		Te();
	} catch (e) {
		tt(e, lt);
	}
}
let jt = null;
function Mt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Mr(r) && (jt = new Set(), Lr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && hr(r), (jt == null ? void 0 : jt.size) > 0)) {
				wn.clear();
				for (let e of jt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) jt.has(n) && (jt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Lr(n);
					}
				}
				jt.clear();
			}
		}
		jt = null;
	}
}
function Nt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Nt(i, t, n, r) : e & 4194320 && !(e & 2048) && Pt(i, t, r) && (k(i, w), Ft(i));
	}
}
function Pt(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (d.call(t, r)) return !0;
		if (r.f & 2 && Pt(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function Ft(e) {
	var t = lt = e, n = t.b;
	if (n != null && n.is_pending && e.f & 16777228 && !(e.f & 32768)) {
		n.defer_effect(e);
		return;
	}
	for (; t.parent !== null;) {
		t = t.parent;
		var r = t.f;
		if (dt !== null && t === q && !(e.f & 8)) return;
		if (r & 96) {
			if (!(r & 1024)) return;
			t.f ^= C;
		}
	}
	I.push(t);
}
function It(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), k(e, C);
		for (var n = e.first; n !== null;) It(n, t), n = n.next;
	}
}
function Lt(e) {
	let t = 0, n = En(0), r;
	return () => {
		Xn() && (Q(n), sr(() => (t === 0 && (r = Br(() => e(() => jn(n)))), t += 1, () => {
			Qe(() => {
				--t, t === 0 && (r == null || r(), r = void 0, jn(n));
			});
		})));
	};
}
var Rt = le | ue;
function zt(e, t, n, r) {
	new $t(e, t, n, r);
}
var L = new WeakMap(), Bt = new WeakMap(), Vt = new WeakMap(), Ht = new WeakMap(), R = new WeakMap(), Ut = new WeakMap(), z = new WeakMap(), Wt = new WeakMap(), Gt = new WeakMap(), Kt = new WeakMap(), qt = new WeakMap(), Jt = new WeakMap(), Yt = new WeakMap(), Xt = new WeakMap(), Zt = new WeakMap(), Qt = new WeakMap(), B = new WeakSet(), $t = class {
	constructor(e, t, n, r) {
		var i, a;
		st(this, B), S(this, "parent", void 0), S(this, "is_pending", !1), S(this, "transform_error", void 0), A(this, L, void 0), A(this, Bt, E ? D : null), A(this, Vt, void 0), A(this, Ht, void 0), A(this, R, void 0), A(this, Ut, null), A(this, z, null), A(this, Wt, null), A(this, Gt, null), A(this, Kt, 0), A(this, qt, 0), A(this, Jt, !1), A(this, Yt, new Set()), A(this, Xt, new Set()), A(this, Zt, null), A(this, Qt, Lt(() => (N(Zt, this, En(M(Kt, this))), () => {
			N(Zt, this, null);
		}))), N(L, this, e), N(Vt, this, t), N(Ht, this, (e) => {
			var t = q;
			t.b = this, t.f |= 128, n(e);
		}), this.parent = q.b, this.transform_error = (i = r == null ? (a = this.parent) == null ? void 0 : a.transform_error : r) == null ? ((e) => e) : i, N(R, this, lr(() => {
			if (E) {
				let e = M(Bt, this);
				Ie();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					j(B, this, tn).call(this, t);
				} else t ? j(B, this, nn).call(this) : j(B, this, en).call(this);
			} else j(B, this, rn).call(this);
		}, Rt)), E && N(L, this, D);
	}
	defer_effect(e) {
		at(e, M(Yt, this), M(Xt, this));
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!M(Vt, this).pending;
	}
	update_pending_count(e) {
		j(B, this, sn).call(this, e), N(Kt, this, M(Kt, this) + e), !(!M(Zt, this) || M(Jt, this)) && (N(Jt, this, !0), Qe(() => {
			N(Jt, this, !1), M(Zt, this) && kn(M(Zt, this), M(Kt, this));
		}));
	}
	get_effect_pending() {
		return M(Qt, this).call(this), Q(M(Zt, this));
	}
	error(e) {
		var t = M(Vt, this).onerror;
		let n = M(Vt, this).failed;
		if (!t && !n) throw e;
		M(Ut, this) && (U(M(Ut, this)), N(Ut, this, null)), M(z, this) && (U(M(z, this)), N(z, this, null)), M(Wt, this) && (U(M(Wt, this)), N(Wt, this, null)), E && (Fe(M(Bt, this)), Re(), Fe(ze()));
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ne();
				return;
			}
			r = !0, i && je(), M(Wt, this) !== null && gr(M(Wt, this), () => {
				N(Wt, this, null);
			}), j(B, this, on).call(this, () => {
				Ct.ensure(), j(B, this, rn).call(this);
			});
		}, o = (e) => {
			try {
				i = !0, t == null || t(e, a), i = !1;
			} catch (e) {
				tt(e, M(R, this) && M(R, this).parent);
			}
			n && N(Wt, this, j(B, this, on).call(this, () => {
				Ct.ensure();
				try {
					return ur(() => {
						var t = q;
						t.b = this, t.f |= 128, n(M(L, this), () => e, () => a);
					});
				} catch (e) {
					return tt(e, M(R, this).parent), null;
				}
			}));
		};
		Qe(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				tt(e, M(R, this) && M(R, this).parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => tt(e, M(R, this) && M(R, this).parent)) : o(t);
		});
	}
};
function en() {
	try {
		N(Ut, this, ur(() => M(Ht, this).call(this, M(L, this))));
	} catch (e) {
		this.error(e);
	}
}
function tn(e) {
	let t = M(Vt, this).failed;
	t && N(Wt, this, ur(() => {
		t(M(L, this), () => e, () => () => {});
	}));
}
function nn() {
	let e = M(Vt, this).pending;
	e && (this.is_pending = !0, N(z, this, ur(() => e(M(L, this)))), Qe(() => {
		var e = N(Gt, this, document.createDocumentFragment()), t = zn();
		e.append(t), N(Ut, this, j(B, this, on).call(this, () => (Ct.ensure(), ur(() => M(Ht, this).call(this, t))))), M(qt, this) === 0 && (M(L, this).before(e), N(Gt, this, null), gr(M(z, this), () => {
			N(z, this, null);
		}), j(B, this, an).call(this));
	}));
}
function rn() {
	try {
		if (this.is_pending = this.has_pending_snippet(), N(qt, this, 0), N(Kt, this, 0), N(Ut, this, ur(() => {
			M(Ht, this).call(this, M(L, this));
		})), M(qt, this) > 0) {
			var e = N(Gt, this, document.createDocumentFragment());
			br(M(Ut, this), e);
			let t = M(Vt, this).pending;
			N(z, this, ur(() => t(M(L, this))));
		} else j(B, this, an).call(this);
	} catch (e) {
		this.error(e);
	}
}
function an() {
	this.is_pending = !1;
	for (let e of M(Yt, this)) k(e, w), Ft(e);
	for (let e of M(Xt, this)) k(e, T), Ft(e);
	M(Yt, this).clear(), M(Xt, this).clear();
}
function on(e) {
	var t = q, n = W, r = O;
	wr(M(R, this)), K(M(R, this)), Ke(M(R, this).ctx);
	try {
		return e();
	} catch (e) {
		return et(e), null;
	} finally {
		wr(t), K(n), Ke(r);
	}
}
function sn(e) {
	if (!this.has_pending_snippet()) {
		if (this.parent) {
			var t;
			j(B, t = this.parent, sn).call(t, e);
		}
		return;
	}
	N(qt, this, M(qt, this) + e), M(qt, this) === 0 && (j(B, this, an).call(this), M(z, this) && gr(M(z, this), () => {
		N(z, this, null);
	}), M(Gt, this) && (M(L, this).before(M(Gt, this)), N(Gt, this, null)));
}
function cn(e, t) {
	this.v = e, this.k = t;
}
function ln(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof cn;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" ? "return" : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(a.done ? "return" : "normal", n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i("throw", e);
		}
	}
	function i(e, i) {
		switch (e) {
			case "return":
				t.resolve({
					value: i,
					done: !0
				});
				break;
			case "throw":
				t.reject(i);
				break;
			default: t.resolve({
				value: i,
				done: !1
			});
		}
		(t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
ln.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, ln.prototype.next = function(e) {
	return this._invoke("next", e);
}, ln.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, ln.prototype.return = function(e) {
	return this._invoke("return", e);
};
function un(e, t, n, r) {
	let i = Ye() ? mn : gn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = q, s = dn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		s();
		try {
			r(e);
		} catch (e) {
			o.f & 16384 || tt(e, o);
		}
		fn();
	}
	if (n.length === 0) {
		c.then(() => l(t.map(i)));
		return;
	}
	function u() {
		s(), Promise.all(n.map((e) => hn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => tt(e, o));
	}
	c ? c.then(u) : u();
}
function dn() {
	var e = q, t = W, n = O, r = P;
	return function(i = !0) {
		wr(e), K(t), Ke(n), i && (r == null || r.activate());
	};
}
function fn(e = !0) {
	wr(null), K(null), Ke(null), e && (P == null || P.deactivate());
}
function pn() {
	var e = q.b, t = P, n = e.is_rendered();
	return e.update_pending_count(1), t.increment(n), () => {
		e.update_pending_count(-1), t.decrement(n);
	};
}
function mn(e) {
	var t = 2 | w, n = W !== null && W.f & 2 ? W : null;
	return q !== null && (q.f |= ue), {
		ctx: O,
		deps: null,
		effects: null,
		equals: Ve,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: s,
		wv: 0,
		parent: n == null ? q : n,
		ac: null
	};
}
function hn(e, t, n) {
	q === null && xe();
	var r = void 0, i = En(s), a = !W, o = new Map();
	return or(() => {
		var t = ne();
		r = t.promise;
		try {
			Promise.resolve(e()).then(t.resolve, t.reject).finally(fn);
		} catch (e) {
			t.reject(e), fn();
		}
		var n = P;
		if (a) {
			var s, c = pn();
			(s = o.get(n)) == null || s.reject(ve), o.delete(n), o.set(n, t);
		}
		let l = (e, t = void 0) => {
			if (n.activate(), t) t !== ve && (i.f |= me, kn(i, t));
			else {
				i.f & 8388608 && (i.f ^= me), kn(i, e);
				for (let [e, t] of o) {
					if (o.delete(e), e === n) break;
					t.reject(ve);
				}
			}
			c && c();
		};
		t.promise.then(l, (e) => l(null, e || "unknown"));
	}), Zn(() => {
		for (let e of o.values()) e.reject(ve);
	}), new Promise((e) => {
		function t(n) {
			function a() {
				n === r ? e(i) : t(r);
			}
			n.then(a, a);
		}
		t(r);
	});
}
function gn(e) {
	let t = mn(e);
	return t.equals = Ue, t;
}
function _n(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) U(t[n]);
	}
}
function vn(e) {
	for (var t = e.parent; t !== null;) {
		if (!(t.f & 2)) return t.f & 16384 ? null : t;
		t = t.parent;
	}
	return null;
}
function yn(e) {
	var t, n = q;
	wr(vn(e));
	try {
		e.f &= ~fe, _n(e), t = Pr(e);
	} finally {
		wr(n);
	}
	return t;
}
function bn(e) {
	var t = yn(e);
	if (!e.equals(t) && (e.wv = jr(), (!(P != null && P.is_fork) || e.deps === null) && (e.v = t, e.deps === null))) {
		k(e, C);
		return;
	}
	Sr || (F === null ? rt(e) : (Xn() || P != null && P.is_fork) && F.set(e, t));
}
function xn(e) {
	if (e.effects !== null) {
		for (let r of e.effects) if (r.teardown || r.ac) {
			var t, n;
			(t = r.teardown) == null || t.call(r), (n = r.ac) == null || n.abort(ve), r.teardown = x, r.ac = null, Ir(r, 0), fr(r);
		}
	}
}
function Sn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && Lr(t);
}
let Cn = new Set();
const wn = new Map();
var Tn = !1;
function En(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ve,
		rv: 0,
		wv: 0
	};
}
function Dn(e, t) {
	let n = En(e, t);
	return Tr(n), n;
}
function On(e, t = !1, n = !0) {
	let r = En(e);
	if (t || (r.equals = Ue), i && n && O !== null && O.l !== null) {
		var a, o;
		((o = (a = O.l).s) == null ? a.s = [] : o).push(r);
	}
	return r;
}
function V(e, t, n = !1) {
	return W !== null && (!G || W.f & 131072) && Ye() && W.f & 4325394 && (J === null || !d.call(J, e)) && Ae(), kn(e, n ? Nn(t) : t);
}
function kn(e, t) {
	if (!e.equals(t)) {
		var n = e.v;
		Sr ? wn.set(e, t) : wn.set(e, n), e.v = t;
		var r = Ct.ensure();
		if (r.capture(e, n), e.f & 2) {
			let t = e;
			e.f & 2048 && yn(t), rt(t);
		}
		e.wv = jr(), Mn(e, w), Ye() && q !== null && q.f & 1024 && !(q.f & 96) && (Z === null ? Er([e]) : Z.push(e)), !r.is_fork && Cn.size > 0 && !Tn && An();
	}
	return t;
}
function An() {
	Tn = !1;
	for (let e of Cn) e.f & 1024 && k(e, T), Mr(e) && Lr(e);
	Cn.clear();
}
function jn(e) {
	V(e, e.v + 1);
}
function Mn(e, t) {
	var n = e.reactions;
	if (n !== null) for (var r = Ye(), i = n.length, a = 0; a < i; a++) {
		var o = n[a], s = o.f;
		if (!(!r && o === q)) {
			var c = (s & w) === 0;
			if (c && k(o, t), s & 2) {
				var l = o;
				F == null || F.delete(l), s & 65536 || (s & 512 && (o.f |= fe), Mn(l, T));
			} else c && (s & 16 && jt !== null && jt.add(o), Ft(o));
		}
	}
}
function Nn(e) {
	if (typeof e != "object" || !e || he in e) return e;
	let t = y(e);
	if (t !== _ && t !== v) return e;
	var n = new Map(), r = l(e), i = Dn(0), a = null, o = kr, c = (e) => {
		if (kr === o) return e();
		var t = W, n = kr;
		K(null), Ar(o);
		var r = e();
		return K(t), Ar(n), r;
	};
	return r && n.set("length", Dn(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Oe();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = Dn(r.value, a);
				return n.set(t, e), e;
			}) : V(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => Dn(s, a));
					n.set(t, e), jn(i);
				}
			} else V(r, s), jn(i);
			return !0;
		},
		get(t, r, i) {
			var o;
			if (r === he) return e;
			var l = n.get(r), u = r in t;
			if (l === void 0 && (!u || (o = h(t, r)) != null && o.writable) && (l = c(() => Dn(Nn(u ? t[r] : s), a)), n.set(r, l)), l !== void 0) {
				var d = Q(l);
				return d === s ? void 0 : d;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = Q(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a == null ? void 0 : a.v;
				if (a !== void 0 && o !== s) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			var r;
			if (t === he) return !0;
			var i = n.get(t), o = i !== void 0 && i.v !== s || Reflect.has(e, t);
			return (i !== void 0 || q !== null && (!o || (r = h(e, t)) != null && r.writable)) && (i === void 0 && (i = c(() => Dn(o ? Nn(e[t]) : s, a)), n.set(t, i)), Q(i) === s) ? !1 : o;
		},
		set(e, t, o, l) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = o; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => Dn(s, a)), n.set(f + "", p)) : V(p, s);
			}
			if (u === void 0) {
				var m;
				(!d || (m = h(e, t)) != null && m.writable) && (u = c(() => Dn(void 0, a)), V(u, Nn(o)), n.set(t, u));
			} else {
				d = u.v !== s;
				var g = c(() => Nn(o));
				V(u, g);
			}
			var _ = Reflect.getOwnPropertyDescriptor(e, t);
			if (_ != null && _.set && _.set.call(l, o), !d) {
				if (r && typeof t == "string") {
					var v = n.get("length"), y = Number(t);
					Number.isInteger(y) && y >= v.v && V(v, y + 1);
				}
				jn(i);
			}
			return !0;
		},
		ownKeys(e) {
			Q(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== s;
			});
			for (var [r, a] of n) a.v !== s && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			ke();
		}
	});
}
var Pn, Fn, In, Ln;
function Rn() {
	if (Pn === void 0) {
		Pn = window, document, Fn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		In = h(t, "firstChild").get, Ln = h(t, "nextSibling").get, b(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), b(n) && (n.__t = void 0);
	}
}
function zn(e = "") {
	return document.createTextNode(e);
}
function Bn(e) {
	return In.call(e);
}
function Vn(e) {
	return Ln.call(e);
}
function Hn(e, t) {
	if (!E) return Bn(e);
	var n = Bn(D);
	if (n === null) n = D.appendChild(zn());
	else if (t && n.nodeType !== 3) {
		var r = zn();
		return n == null || n.before(r), Fe(r), r;
	}
	return t && Kn(n), Fe(n), n;
}
function Un(e) {
	e.textContent = "";
}
function Wn() {
	return !1;
}
function Gn(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t == null ? c : t, e, r);
}
function Kn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function qn(e) {
	var t = W, n = q;
	K(null), wr(null);
	try {
		return e();
	} finally {
		K(t), wr(n);
	}
}
function Jn(e) {
	q === null && (W === null && we(e), Ce()), Sr && Se(e);
}
function Yn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function H(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= se);
	var r = {
		ctx: O,
		deps: null,
		nodes: null,
		f: e | 2560,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	}, i = r;
	if (e & 4) dt === null ? Ft(r) : dt.push(r);
	else if (t !== null) {
		try {
			Lr(r);
		} catch (e) {
			throw U(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= le));
	}
	if (i !== null && (i.parent = n, n !== null && Yn(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a, o = W;
		((a = o.effects) == null ? o.effects = [] : a).push(i);
	}
	return r;
}
function Xn() {
	return W !== null && !G;
}
function Zn(e) {
	let t = H(8, null);
	return k(t, C), t.teardown = e, t;
}
function Qn(e) {
	Jn("$effect");
	var t = q.f;
	if (!W && t & 32 && !(t & 32768)) {
		var n, r = O;
		((n = r.e) == null ? r.e = [] : n).push(e);
	} else return $n(e);
}
function $n(e) {
	return H(4 | de, e);
}
function er(e) {
	return Jn("$effect.pre"), H(8 | de, e);
}
function tr(e) {
	Ct.ensure();
	let t = H(64 | ue, e);
	return () => {
		U(t);
	};
}
function nr(e) {
	Ct.ensure();
	let t = H(64 | ue, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? gr(t, () => {
			U(t), n(void 0);
		}) : (U(t), n(void 0));
	});
}
function rr(e) {
	return H(4, e);
}
function ir(e, t) {
	var n = O, r = {
		effect: null,
		ran: !1,
		deps: e
	};
	n.l.$.push(r), r.effect = sr(() => {
		e(), !r.ran && (r.ran = !0, Br(t));
	});
}
function ar() {
	var e = O;
	sr(() => {
		for (var t of e.l.$) {
			t.deps();
			var n = t.effect;
			n.f & 1024 && n.deps !== null && k(n, T), Mr(n) && Lr(n), t.ran = !1;
		}
	});
}
function or(e) {
	return H(4194304 | ue, e);
}
function sr(e, t = 0) {
	return H(8 | t, e);
}
function cr(e, t = [], n = [], r = []) {
	un(r, t, n, (t) => {
		H(8, () => e(...t.map(Q)));
	});
}
function lr(e, t = 0) {
	return H(16 | t, e);
}
function ur(e) {
	return H(32 | ue, e);
}
function dr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Sr, n = W;
		Cr(!0), K(null);
		try {
			t.call(null);
		} finally {
			Cr(e), K(n);
		}
	}
}
function fr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && qn(() => {
			e.abort(ve);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : U(n, t), n = r;
	}
}
function pr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || U(t), t = n;
	}
}
function U(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (mr(e.nodes.start, e.nodes.end), n = !0), fr(e, t && !n), Ir(e, 0), k(e, 16384);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	dr(e);
	var i = e.parent;
	i !== null && i.first !== null && hr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function mr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : Vn(e);
		e.remove(), e = n;
	}
}
function hr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function gr(e, t, n = !0) {
	var r = [];
	_r(e, r, !0);
	var i = () => {
		n && U(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function _r(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= se;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next, o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
			_r(i, t, o ? n : !1), i = a;
		}
	}
}
function vr(e) {
	yr(e, !0);
}
function yr(e, t) {
	if (e.f & 8192) {
		e.f ^= se;
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			yr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function br(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : Vn(n);
		t.append(n), n = i;
	}
}
var xr = !1;
let Sr = !1;
function Cr(e) {
	Sr = e;
}
let W = null, G = !1;
function K(e) {
	W = e;
}
let q = null;
function wr(e) {
	q = e;
}
let J = null;
function Tr(e) {
	W !== null && (J === null ? J = [e] : J.push(e));
}
var Y = null, X = 0;
let Z = null;
function Er(e) {
	Z = e;
}
let Dr = 1;
var Or = 0;
let kr = Or;
function Ar(e) {
	kr = e;
}
function jr() {
	return ++Dr;
}
function Mr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~fe), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Mr(a) && bn(a), a.wv > e.wv) return !0;
		}
		t & 512 && F === null && k(e, C);
	}
	return !1;
}
function Nr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(J !== null && d.call(J, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Nr(a, t, !1) : t === a && (n ? k(a, w) : a.f & 1024 && k(a, T), Ft(a));
	}
}
function Pr(e) {
	var t = Y, n = X, r = Z, i = W, a = J, o = O, s = G, c = kr, l = e.f;
	Y = null, X = 0, Z = null, W = l & 96 ? null : e, J = null, Ke(e.ctx), G = !1, kr = ++Or, e.ac !== null && (qn(() => {
		e.ac.abort(ve);
	}), e.ac = null);
	try {
		e.f |= pe;
		var u = e.fn, d = u();
		e.f |= ce;
		var f = e.deps, p = P == null ? void 0 : P.is_fork;
		if (Y !== null) {
			var m;
			if (p || Ir(e, X), f !== null && X > 0) for (f.length = X + Y.length, m = 0; m < Y.length; m++) f[X + m] = Y[m];
			else e.deps = f = Y;
			if (Xn() && e.f & 512) for (m = X; m < f.length; m++) {
				var h, g;
				((g = (h = f[m]).reactions) == null ? h.reactions = [] : g).push(e);
			}
		} else !p && f !== null && X < f.length && (Ir(e, X), f.length = X);
		if (Ye() && Z !== null && !G && f !== null && !(e.f & 6146)) for (m = 0; m < Z.length; m++) Nr(Z[m], e);
		if (i !== null && i !== e) {
			if (Or++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Or;
			if (t !== null) for (let e of t) e.rv = Or;
			Z !== null && (r === null ? r = Z : r.push(...Z));
		}
		return e.f & 8388608 && (e.f ^= me), d;
	} catch (e) {
		return et(e);
	} finally {
		e.f ^= pe, Y = t, X = n, Z = r, W = i, J = a, Ke(o), G = s, kr = c;
	}
}
function Fr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = u.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Y === null || !d.call(Y, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~fe), rt(a), xn(a), Ir(a, 0);
	}
}
function Ir(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Fr(e, n[r]);
}
function Lr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		k(e, C);
		var n = q, r = xr;
		q = e, xr = !0;
		try {
			t & 16777232 ? pr(e) : fr(e), dr(e);
			var i = Pr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Dr;
		} finally {
			xr = r, q = n;
		}
	}
}
function Q(e) {
	var t = (e.f & 2) != 0;
	if (W !== null && !G && !(q !== null && q.f & 16384) && (J === null || !d.call(J, e))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < Or && (e.rv = Or, Y === null && n !== null && n[X] === e ? X++ : Y === null ? Y = [e] : Y.push(e));
		else {
			var r, i;
			((i = (r = W).deps) == null ? r.deps = [] : i).push(e);
			var a = e.reactions;
			a === null ? e.reactions = [W] : d.call(a, W) || a.push(W);
		}
	}
	if (Sr && wn.has(e)) return wn.get(e);
	if (t) {
		var o = e;
		if (Sr) {
			var s = o.v;
			return (!(o.f & 1024) && o.reactions !== null || zr(o)) && (s = yn(o)), wn.set(o, s), s;
		}
		var c = (o.f & 512) == 0 && !G && W !== null && (xr || (W.f & 512) != 0), l = (o.f & ce) === 0;
		Mr(o) && (c && (o.f |= 512), bn(o)), c && !l && (Sn(o), Rr(o));
	}
	if (F != null && F.has(e)) return F.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Rr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t;
		((t = n.reactions) == null ? n.reactions = [] : t).push(e), n.f & 2 && !(n.f & 512) && (Sn(n), Rr(n));
	}
}
function zr(e) {
	if (e.v === s) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (wn.has(t) || t.f & 2 && zr(t)) return !0;
	return !1;
}
function Br(e) {
	var t = G;
	try {
		return G = !0, e();
	} finally {
		G = t;
	}
}
function Vr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (he in e) Hr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && he in n && Hr(n);
		}
	}
}
function Hr(e, t = new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Hr(e[n], t);
		} catch (e) {}
		let n = y(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = g(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch (e) {}
			}
		}
	}
}
const Ur = Symbol("events"), Wr = new Set(), Gr = new Set();
function Kr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Yr.call(t, e), !e.cancelBubble) return qn(() => n == null ? void 0 : n.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Qe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function qr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Kr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Zn(() => {
		t.removeEventListener(e, o, a);
	});
}
var Jr = null;
function Yr(e) {
	var t, n = this, r = n.ownerDocument, i = e.type, a = ((t = e.composedPath) == null ? void 0 : t.call(e)) || [], o = a[0] || e.target;
	Jr = e;
	var s = 0, c = Jr === e && e[Ur];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (n === document || n === window)) {
			e[Ur] = n;
			return;
		}
		var u = a.indexOf(n);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== n) {
		m(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || r;
			}
		});
		var d = W, f = q;
		K(null), wr(null);
		try {
			for (var p, h = []; o !== null;) {
				var g = o.assignedSlot || o.parentNode || o.host || null;
				try {
					var _, v = (_ = o[Ur]) == null ? void 0 : _[i];
					v != null && (!o.disabled || e.target === o) && v.call(o, e);
				} catch (e) {
					p ? h.push(e) : p = e;
				}
				if (e.cancelBubble || g === n || g === null) break;
				o = g;
			}
			if (p) {
				for (let e of h) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[Ur] = n, delete e.currentTarget, K(d), wr(f);
		}
	}
}
var Xr, Zr = ((Xr = globalThis) == null || (Xr = Xr.window) == null ? void 0 : Xr.trustedTypes) && globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Qr(e) {
	var t;
	return (t = Zr == null ? void 0 : Zr.createHTML(e)) == null ? e : t;
}
function $r(e) {
	var t = Gn("template");
	return t.innerHTML = Qr(e.replaceAll("<!>", "<!---->")), t.content;
}
function ei(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
function ti(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (E) return ei(D, null), D;
		i === void 0 && (i = $r(a ? e : "<!>" + e), n || (i = Bn(i)));
		var t = r || Fn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = Bn(t), s = t.lastChild;
			ei(o, s);
		} else ei(t, t);
		return t;
	};
}
function ni(e, t) {
	if (E) {
		var n = q;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = D), Ie();
		return;
	}
	e !== null && e.before(t);
}
[..."allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var ri = ["touchstart", "touchmove"];
function ii(e) {
	return ri.includes(e);
}
function ai(e, t) {
	return ci(e, t);
}
function oi(e, t) {
	var n;
	Rn(), t.intro = (n = t.intro) == null ? !1 : n;
	let r = t.target, i = E, a = D;
	try {
		for (var s = Bn(r); s && (s.nodeType !== 8 || s.data !== "[");) s = Vn(s);
		if (!s) throw o;
		Pe(!0), Fe(s);
		let n = ci(e, Ge(Ge({}, t), {}, { anchor: s }));
		return Pe(!1), n;
	} catch (n) {
		if (n instanceof Error && n.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw n;
		return n !== o && console.warn("Failed to hydrate: ", n), t.recover === !1 && Ee(), Rn(), Un(r), Pe(!1), ai(e, t);
	} finally {
		Pe(i), Fe(a);
	}
}
var si = new Map();
function ci(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: s = !0, transformError: c }) {
	Rn();
	var l = void 0, u = nr(() => {
		var s = n == null ? t.appendChild(zn()) : n;
		zt(s, { pending: () => {} }, (t) => {
			qe({});
			var n = O;
			if (a && (n.c = a), i && (r.$$events = i), E && ei(t, null), l = e(t, r) || {}, E && (q.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Me(), o;
			Je();
		}, c);
		var u = new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = ii(r);
					for (let e of [t, document]) {
						var a = si.get(e);
						a === void 0 && (a = new Map(), si.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Yr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(f(Wr)), Gr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = si.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Yr), r.delete(e), r.size === 0 && si.delete(n)) : r.set(e, i);
			}
			if (Gr.delete(d), s !== n) {
				var a;
				(a = s.parentNode) == null || a.removeChild(s);
			}
		};
	});
	return li.set(l, u), l;
}
var li = new WeakMap();
function ui(e, t) {
	let n = li.get(e);
	return n ? (li.delete(e), n(t)) : Promise.resolve();
}
var di = new WeakMap(), fi = new WeakMap(), $ = new WeakMap(), pi = new WeakMap(), mi = new WeakMap(), hi = new WeakMap(), gi = new WeakMap(), _i = class {
	constructor(e, t = !0) {
		S(this, "anchor", void 0), A(this, di, new Map()), A(this, fi, new Map()), A(this, $, new Map()), A(this, pi, new Set()), A(this, mi, !0), A(this, hi, (e) => {
			if (M(di, this).has(e)) {
				var t = M(di, this).get(e), n = M(fi, this).get(t);
				if (n) vr(n), M(pi, this).delete(t);
				else {
					var r = M($, this).get(t);
					r && !(r.effect.f & 8192) && (M(fi, this).set(t, r.effect), M($, this).delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
				}
				for (let [t, n] of M(di, this)) {
					if (M(di, this).delete(t), t === e) break;
					let r = M($, this).get(n);
					r && (U(r.effect), M($, this).delete(n));
				}
				for (let [e, r] of M(fi, this)) {
					if (e === t || M(pi, this).has(e) || r.f & 8192) continue;
					let i = () => {
						if (Array.from(M(di, this).values()).includes(e)) {
							var t = document.createDocumentFragment();
							br(r, t), t.append(zn()), M($, this).set(e, {
								effect: r,
								fragment: t
							});
						} else U(r);
						M(pi, this).delete(e), M(fi, this).delete(e);
					};
					M(mi, this) || !n ? (M(pi, this).add(e), gr(r, i, !1)) : i();
				}
			}
		}), A(this, gi, (e) => {
			M(di, this).delete(e);
			let t = Array.from(M(di, this).values());
			for (let [e, n] of M($, this)) t.includes(e) || (U(n.effect), M($, this).delete(e));
		}), this.anchor = e, N(mi, this, t);
	}
	ensure(e, t) {
		var n = P, r = Wn();
		if (t && !M(fi, this).has(e) && !M($, this).has(e)) if (r) {
			var i = document.createDocumentFragment(), a = zn();
			i.append(a), M($, this).set(e, {
				effect: ur(() => t(a)),
				fragment: i
			});
		} else M(fi, this).set(e, ur(() => t(this.anchor)));
		if (M(di, this).set(n, e), r) {
			for (let [t, r] of M(fi, this)) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of M($, this)) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(M(hi, this)), n.ondiscard(M(gi, this));
		} else E && (this.anchor = D), M(hi, this).call(this, n);
	}
};
function vi(e) {
	O === null && be("onMount"), i && O.l !== null ? yi(O).m.push(e) : Qn(() => {
		let t = Br(e);
		if (typeof t == "function") return t;
	});
}
function yi(e) {
	var t, n = e.l;
	return (t = n.u) == null ? n.u = {
		a: [],
		b: [],
		m: []
	} : t;
}
function bi(e, t, n = !1) {
	var r;
	E && (r = D, Ie());
	var i = new _i(e), a = n ? le : 0;
	function o(e, t) {
		if (E) {
			var n = Be(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ze();
				Fe(a), i.anchor = a, Pe(!1), i.ensure(e, t), Pe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	lr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
function xi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Si(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ci(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Si)), i && c.push(...Object.keys(i).map(Si));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Si(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += xi(r)), i && (n += xi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
function wi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ti(e, t, n, r) {
	var i = e.__style;
	if (E || i !== t) {
		var a = Ci(t, r);
		(!E || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e.__style = t;
	} else r && (Array.isArray(r) ? (wi(e, n == null ? void 0 : n[0], r[0]), wi(e, n == null ? void 0 : n[1], r[1], "important")) : wi(e, n, r));
	return r;
}
var Ei = Symbol("is custom element"), Di = Symbol("is html"), Oi = ye ? "link" : "LINK";
function ki(e, t, n, r) {
	var i = Ai(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Oi) || i[t] !== (i[t] = n) && (t === "loading" && (e[_e] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Mi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ai(e) {
	var t;
	return (t = e.__attributes) == null ? e.__attributes = {
		[Ei]: e.nodeName.includes("-"),
		[Di]: e.namespaceURI === c
	} : t;
}
var ji = new Map();
function Mi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ji.get(t);
	if (n) return n;
	ji.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = g(i), r) r[o].set && n.push(o);
		i = y(i);
	}
	return n;
}
var Ni, Pi = new WeakMap(), Fi = new WeakMap(), Ii = new WeakMap(), Li = new WeakSet(), Ri = class {
	constructor(e) {
		st(this, Li), A(this, Pi, new WeakMap()), A(this, Fi, void 0), A(this, Ii, void 0), N(Ii, this, e);
	}
	observe(e, t) {
		var n = M(Pi, this).get(e) || new Set();
		return n.add(t), M(Pi, this).set(e, n), j(Li, this, zi).call(this).observe(e, M(Ii, this)), () => {
			var n = M(Pi, this).get(e);
			n.delete(t), n.size === 0 && (M(Pi, this).delete(e), M(Fi, this).unobserve(e));
		};
	}
};
Ni = Ri;
function zi() {
	var e;
	return (e = M(Fi, this)) == null ? N(Fi, this, new ResizeObserver((e) => {
		for (var t of e) {
			Ni.entries.set(t.target, t);
			for (var n of M(Pi, this).get(t.target) || []) n(t);
		}
	})) : e;
}
S(Ri, "entries", new WeakMap());
function Bi(e, t) {
	return e === t || (e == null ? void 0 : e[he]) === t;
}
function Vi(e = {}, t, n, r) {
	return rr(() => {
		var i, a;
		return sr(() => {
			i = a, a = (r == null ? void 0 : r()) || [], Br(() => {
				e !== n(...a) && (t(e, ...a), i && Bi(n(...i), e) && t(null, ...i));
			});
		}), () => {
			Qe(() => {
				a && Bi(n(...a), e) && t(null, ...a);
			});
		};
	}), e;
}
function Hi(e = !1) {
	let t = O, n = t.l.u;
	if (!n) return;
	let r = () => Vr(t.s);
	if (e) {
		let e = 0, n = {}, i = mn(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => Q(i);
	}
	n.b.length && er(() => {
		Ui(t, r), te(n.b);
	}), Qn(() => {
		let e = Br(() => n.m.map(ee));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Qn(() => {
		Ui(t, r), te(n.a);
	});
}
function Ui(e, t) {
	if (e.l.s) for (let t of e.l.s) Q(t);
	t();
}
var Wi = !1;
function Gi(e) {
	var t = Wi;
	try {
		return Wi = !1, [e(), Wi];
	} finally {
		Wi = t;
	}
}
function Ki(e, t, n, r) {
	var a = !i || (n & 2) != 0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = () => (l && (l = !1, c = s ? Br(r) : r), c), d;
	if (o) {
		var f, p, m = he in e || ge in e;
		d = (f = (p = h(e, t)) == null ? void 0 : p.set) == null ? m && t in e ? (n) => e[t] = n : void 0 : f;
	}
	var g, _ = !1;
	o ? [g, _] = Gi(() => e[t]) : g = e[t], g === void 0 && r !== void 0 && (g = u(), d && (a && De(t), d(g)));
	var v = a ? () => {
		var n = e[t];
		return n === void 0 ? u() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (a && !(n & 4)) return v;
	if (d) {
		var y = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!a || !t || y || _) && d(t ? v() : e), e) : v();
		});
	}
	var b = !1, x = (n & 1 ? mn : gn)(() => (b = !1, v()));
	o && Q(x);
	var ee = q;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Q(x) : a && o ? Nn(e) : e;
			return V(x, n), b = !0, c !== void 0 && (c = n), e;
		}
		return Sr && b || ee.f & 16384 ? x.v : Q(x);
	});
}
function qi(e) {
	return new Xi(e);
}
var Ji = new WeakMap(), Yi = new WeakMap(), Xi = class {
	constructor(e) {
		var t, n;
		A(this, Ji, void 0), A(this, Yi, void 0);
		var r = new Map(), i = (e, t) => {
			var n = On(t, !1, !1);
			return r.set(e, n), n;
		};
		let a = new Proxy(Ge(Ge({}, e.props || {}), {}, { $$events: {} }), {
			get(e, t) {
				var n;
				return Q((n = r.get(t)) == null ? i(t, Reflect.get(e, t)) : n);
			},
			has(e, t) {
				var n;
				return t === ge ? !0 : (Q((n = r.get(t)) == null ? i(t, Reflect.get(e, t)) : n), Reflect.has(e, t));
			},
			set(e, t, n) {
				var a;
				return V((a = r.get(t)) == null ? i(t, n) : a, n), Reflect.set(e, t, n);
			}
		});
		N(Yi, this, (e.hydrate ? oi : ai)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: a,
			context: e.context,
			intro: (t = e.intro) == null ? !1 : t,
			recover: e.recover,
			transformError: e.transformError
		})), (!(!(e == null || (n = e.props) == null) && n.$$host) || e.sync === !1) && Ot(), N(Ji, this, a.$$events);
		for (let e of Object.keys(M(Yi, this))) e === "$set" || e === "$destroy" || e === "$on" || m(this, e, {
			get() {
				return M(Yi, this)[e];
			},
			set(t) {
				M(Yi, this)[e] = t;
			},
			enumerable: !0
		});
		M(Yi, this).$set = (e) => {
			Object.assign(a, e);
		}, M(Yi, this).$destroy = () => {
			ui(M(Yi, this));
		};
	}
	$set(e) {
		M(Yi, this).$set(e);
	}
	$on(e, t) {
		M(Ji, this)[e] = M(Ji, this)[e] || [];
		let n = (...e) => t.call(this, ...e);
		return M(Ji, this)[e].push(n), () => {
			M(Ji, this)[e] = M(Ji, this)[e].filter((e) => e !== n);
		};
	}
	$destroy() {
		M(Yi, this).$destroy();
	}
}, Zi;
typeof HTMLElement == "function" && (Zi = class extends HTMLElement {
	constructor(e, t, n) {
		super(), S(this, "$$ctor", void 0), S(this, "$$s", void 0), S(this, "$$c", void 0), S(this, "$$cn", !1), S(this, "$$d", {}), S(this, "$$r", !1), S(this, "$$p_d", {}), S(this, "$$l", {}), S(this, "$$l_u", new Map()), S(this, "$$me", void 0), S(this, "$$shadowRoot", null), this.$$ctor = e, this.$$s = t, n && (this.$$shadowRoot = this.attachShadow(n));
	}
	addEventListener(e, t, n) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
			let n = this.$$c.$on(e, t);
			this.$$l_u.set(t, n);
		}
		super.addEventListener(e, t, n);
	}
	removeEventListener(e, t, n) {
		if (super.removeEventListener(e, t, n), this.$$c) {
			let e = this.$$l_u.get(t);
			e && (e(), this.$$l_u.delete(t));
		}
	}
	async connectedCallback() {
		var e = this;
		if (e.$$cn = !0, !e.$$c) {
			if (await Promise.resolve(), !e.$$cn || e.$$c) return;
			function t(e) {
				return (t) => {
					let n = Gn("slot");
					e !== "default" && (n.name = e), ni(t, n);
				};
			}
			let n = {}, r = $i(e);
			for (let i of e.$$s) i in r && (i === "default" && !e.$$d.children ? (e.$$d.children = t(i), n.default = !0) : n[i] = t(i));
			for (let t of e.attributes) {
				let n = e.$$g_p(t.name);
				n in e.$$d || (e.$$d[n] = Qi(n, t.value, e.$$p_d, "toProp"));
			}
			for (let t in e.$$p_d) !(t in e.$$d) && e[t] !== void 0 && (e.$$d[t] = e[t], delete e[t]);
			e.$$c = qi({
				component: e.$$ctor,
				target: e.$$shadowRoot || e,
				props: Ge(Ge({}, e.$$d), {}, {
					$$slots: n,
					$$host: e
				})
			}), e.$$me = tr(() => {
				sr(() => {
					e.$$r = !0;
					for (let n of p(e.$$c)) {
						var t;
						if (!((t = e.$$p_d[n]) != null && t.reflect)) continue;
						e.$$d[n] = e.$$c[n];
						let r = Qi(n, e.$$d[n], e.$$p_d, "toAttribute");
						r == null ? e.removeAttribute(e.$$p_d[n].attribute || n) : e.setAttribute(e.$$p_d[n].attribute || n, r);
					}
					e.$$r = !1;
				});
			});
			for (let t in e.$$l) for (let n of e.$$l[t]) {
				let r = e.$$c.$on(t, n);
				e.$$l_u.set(n, r);
			}
			e.$$l = {};
		}
	}
	attributeChangedCallback(e, t, n) {
		var r;
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = Qi(e, n, this.$$p_d, "toProp"), (r = this.$$c) == null || r.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return p(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function Qi(e, t, n, r) {
	var i;
	let a = (i = n[e]) == null ? void 0 : i.type;
	if (t = a === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e]) return t;
	if (r === "toAttribute") switch (a) {
		case "Object":
		case "Array": return t == null ? null : JSON.stringify(t);
		case "Boolean": return t ? "" : null;
		case "Number": return t == null ? null : t;
		default: return t;
	}
	else switch (a) {
		case "Object":
		case "Array": return t && JSON.parse(t);
		case "Boolean": return t;
		case "Number": return t == null ? t : +t;
		default: return t;
	}
}
function $i(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function ea(e, t, n, r, i, a) {
	let o = class extends Zi {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return p(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return p(t).forEach((e) => {
		m(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = Qi(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				if (r) {
					var i;
					(i = h(r, e)) != null && i.get ? r[e] = n : r.$set({ [e]: n });
				}
			}
		});
	}), r.forEach((e) => {
		m(o.prototype, e, { get() {
			var t;
			return (t = this.$$c) == null ? void 0 : t[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
var ta = ti("<img draggable=\"false\"/>"), na = ti("<p>Loading...</p>"), ra = ti("<div class=\"tenuuki-spin-viewer\"><!></div>");
function ia(e, t) {
	qe(t, !1);
	let n = On(), r = Ki(t, "options", 28, () => ({ images: [] })), i = On(0), a = 0, o = On(), s = On(), c, l = [], u = [], d = 0, f = !1, p = On(!1), m = 0, h = 0, g = 2.5, _ = 0, v = [], y, b = (e, t) => (e % t + t) % t, x = () => {
		var e;
		return ((e = r()) == null ? void 0 : e.direction) === -1 ? 1 : -1;
	}, ee = () => {
		var e, t;
		return Math.min(((e = (t = r()) == null ? void 0 : t.initialFrame) == null ? 1 : e) - 1, r().images.length - 1);
	}, te = (e, t, n) => Array.from({ length: t }, (t, i) => e.replace(`{${r().replacementToken}}`, String(i + 1).padStart(n, "0"))), ne = (e) => {
		u[e] || (u[e] = !0, d++, ie());
	}, re = (e = 10, t = 50) => {
		let n = 0, i = () => {
			for (let t = n; t < n + e && t < r().images.length; t++) {
				let e = new Image();
				u[t] = !1, e.onload = () => ne(t), e.onerror = () => {
					console.warn(`[TenuukiSpinViewer] Failed to load image ${t}`), ne(t);
				}, e.src = r().images[t], l[t] = e;
			}
			n += e, n < r().images.length && setTimeout(i, t);
		};
		i();
	}, ie = () => {
		if (f || !r().initialSpin) return;
		let e = r().images.length, t = ae(), n = ee(), i = !0;
		for (let r = t; r !== b(n + x(), e); r = b(r + x(), e)) if (!u[r]) {
			i = !1;
			break;
		}
		i && (f = !0, S());
	}, ae = () => {
		var e;
		let t = r().images.length;
		return b(ee() - Math.round(((e = r().spinOffset) == null ? 0 : e) % 360 / 360 * t), t);
	}, S = () => {
		var e;
		if (!r().initialSpin) return;
		c && clearInterval(c);
		let t = r().images.length, n = ae(), o = ee(), s = x();
		V(i, n), a = n, c = setInterval(() => {
			V(i, b(Q(i) + s, t)), a = Q(i), Q(i) === o && (clearInterval(c), c = void 0);
		}, (e = r().frameInterval) == null ? 60 : e);
	}, oe = () => {
		y && cancelAnimationFrame(y), y = void 0, _ = 0;
	}, C = () => {
		let e = r().images.length;
		if (e === 0 || Math.abs(_) < .1) return;
		let t = performance.now(), n = (r) => {
			let o = (r - t) / 1e3;
			t = r, a = b(a + _ * o, e), V(i, Math.floor(a)), _ *= .92 ** (o * 60), y = Math.abs(_) >= .01 ? requestAnimationFrame(n) : void 0;
		};
		y = requestAnimationFrame(n);
	}, w = (e) => r().axis === "y" ? e.clientY : e.clientX, T = (e) => {
		r().draggable !== !1 && (V(p, !0), m = w(e), h = a, v = [{
			coord: m,
			time: performance.now()
		}], c && (clearInterval(c), c = void 0), oe(), Q(o) && Q(o).setPointerCapture(e.pointerId), window.addEventListener("pointermove", se), window.addEventListener("pointerup", ce), window.addEventListener("pointercancel", ce));
	}, se = (e) => {
		if (!Q(p)) return;
		let t = r().images.length, n = w(e), o = (n - m) * x();
		a = b(h + o / g, t), V(i, Math.floor(a)), v.push({
			coord: n,
			time: performance.now()
		}), v.length > 2 && v.shift();
	}, ce = (e) => {
		if (Q(p)) {
			if (V(p, !1), window.removeEventListener("pointermove", se), window.removeEventListener("pointerup", ce), window.removeEventListener("pointercancel", ce), Q(o) && Q(o).releasePointerCapture(e.pointerId), v.length >= 2) {
				let e = v[0], t = v[v.length - 1], n = (t.time - e.time) / 1e3, r = t.coord - e.coord;
				n > 0 && (_ = r / g / n * x(), Math.abs(_) > .1 && C());
			}
			v = [];
		}
	};
	vi(() => {
		if (!Q(s)) return;
		let e = Q(s).parentElement;
		if (!e) return {};
		let t = e.getAttribute("data-image-base-url");
		console.log("image base: ", t);
		let n = parseInt(e.getAttribute("data-image-count") || "0", 10), o = parseInt(e.getAttribute("data-image-number-padding") || "4", 10);
		return r(r().axis = e.getAttribute("data-axis") === "y" ? "y" : "x", !0), r(r().direction = e.getAttribute("data-direction") === "-1" ? -1 : 1, !0), r(r().draggable = e.getAttribute("data-draggable") !== "false", !0), r(r().initialSpin = e.getAttribute("data-initial-spin") !== "false", !0), r(r().spinOffset = parseInt(e.getAttribute("data-spin-offset") || "0", 10), !0), r(r().initialFrame = parseInt(e.getAttribute("data-initial-frame") || "1", 10), !0), r(r().frameInterval = 60, !0), r(r().replacementToken = e.getAttribute("data-replacement-token") || "frame", !0), t && n > 0 && r(r().images = te(t, n, o), !0), V(i, r().initialSpin ? ae() : 0), a = Q(i), re(), () => {
			c && clearInterval(c), oe();
		};
	}), ir(() => (Vr(r()), Q(i)), () => {
		var e;
		V(n, ((e = r().images) == null ? void 0 : e[Q(i)]) || "");
	}), ar();
	var le = {
		get options() {
			return r();
		},
		set options(e) {
			r(e), Ot();
		}
	};
	Hi();
	var ue = ra(), de = Hn(ue), fe = (e) => {
		var t = ta();
		Vi(t, (e) => V(o, e), () => Q(o)), cr(() => {
			var e;
			ki(t, "src", Q(n)), ki(t, "alt", `Spinner frame ${(e = Q(i)) == null ? "" : e}`), Ti(t, `
        cursor: ${Q(p) ? "grabbing" : "grab"};
        user-select: none;
        touch-action: none;
      `);
		}), qr("pointerdown", t, T), ni(e, t);
	}, pe = (e) => {
		ni(e, na());
	};
	return bi(de, (e) => {
		Q(n) ? e(fe) : e(pe, -1);
	}), Le(ue), Vi(ue, (e) => V(s, e), () => Q(s)), ni(e, ue), Je(le);
}
customElements.define("tenuuki-spin-viewer", ea(ia, { options: {} }, [], []));
