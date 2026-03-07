typeof window < "u" && ((window.__svelte ??= {}).v ??= new Set()).add("5");
let e = !1;
function t() {
	e = !0;
}
t();
const n = {}, r = Symbol();
var i = Array.isArray, a = Array.prototype.indexOf, o = Array.prototype.includes, s = Array.from, c = Object.keys, l = Object.defineProperty, u = Object.getOwnPropertyDescriptor, d = Object.getOwnPropertyDescriptors, f = Object.prototype, p = Array.prototype, m = Object.getPrototypeOf, h = Object.isExtensible;
const g = () => {};
function _(e) {
	return e();
}
function v(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function y() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
const b = 1024, x = 2048, S = 4096, ee = 8192, te = 32768, ne = 65536, C = 1 << 19, re = 1 << 20, ie = 65536, ae = 1 << 21, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("legacy props"), le = Symbol(""), w = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ue = !!globalThis.document?.contentType && globalThis.document.contentType.includes("xml");
function de(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
function fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function me() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function he(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ge() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _e() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ye() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function be() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function xe() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Se() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ce(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function we() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let T = !1;
function Te(e) {
	T = e;
}
let E;
function D(e) {
	if (e === null) throw Ce(), n;
	return E = e;
}
function Ee() {
	return D(Rt(E));
}
function De(e) {
	if (T) {
		if (Rt(E) !== null) throw Ce(), n;
		E = e;
	}
}
function Oe(e = 1) {
	if (T) {
		for (var t = e, n = E; t--;) n = Rt(n);
		E = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = E;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = Rt(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw Ce(), n;
	return e.data;
}
function je(e) {
	return e === this.v;
}
function Me(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ne(e) {
	return !Me(e, this.v);
}
let O = null;
function Pe(e) {
	O = e;
}
function Fe(t, n = !1, r) {
	O = {
		p: O,
		i: !1,
		c: null,
		e: null,
		s: t,
		x: null,
		l: e && !n ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function Ie(e) {
	var t = O, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Xt(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, O = t.p, e ?? {};
}
function Le() {
	return !e || O !== null && O.l === null;
}
var Re = [];
function ze() {
	var e = Re;
	Re = [], v(e);
}
function k(e) {
	if (Re.length === 0 && !Je) {
		var t = Re;
		queueMicrotask(() => {
			t === Re && ze();
		});
	}
	Re.push(e);
}
function Be() {
	for (; Re.length > 0;) ze();
}
function Ve(e) {
	var t = q;
	if (t === null) return W.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	A(e, t);
}
function A(e, t) {
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
var He = ~(S | 3072);
function j(e, t) {
	e.f = e.f & He | t;
}
function Ue(e) {
	e.f & 512 || e.deps === null ? j(e, b) : j(e, S);
}
function We(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ie, We(t.deps));
}
function Ge(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), We(e.deps), j(e, b);
}
var Ke = new Set();
let M = null, N = null;
var P = [], qe = null;
let Je = !1, Ye = null;
var Xe = 1, Ze = class e {
	id = Xe++;
	current = new Map();
	previous = new Map();
	#e = new Set();
	#t = new Set();
	#n = 0;
	#r = 0;
	#i = null;
	#a = new Set();
	#o = new Set();
	#s = new Map();
	is_fork = !1;
	#c = !1;
	#l() {
		return this.is_fork || this.#r > 0;
	}
	skip_effect(e) {
		this.#s.has(e) || this.#s.set(e, {
			d: [],
			m: []
		});
	}
	unskip_effect(e) {
		var t = this.#s.get(e);
		if (t) {
			this.#s.delete(e);
			for (var n of t.d) j(n, x), I(n);
			for (n of t.m) j(n, S), I(n);
		}
	}
	process(e) {
		P = [], this.apply();
		var t = Ye = [], n = [];
		for (let r of e) this.#u(r, t, n);
		if (Ye = null, this.#l()) {
			this.#d(n), this.#d(t);
			for (let [e, t] of this.#s) it(e, t);
		} else {
			M = null;
			for (let e of this.#e) e(this);
			this.#e.clear(), this.#n === 0 && this.#f(), tt(n), tt(t), this.#a.clear(), this.#o.clear(), this.#i?.resolve();
		}
		N = null;
	}
	#u(e, t, n) {
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0, o = a && (i & 1024) != 0, s = (i & ee) !== 0;
			if (!(o || this.#s.has(r)) && r.fn !== null) {
				a ? s || (r.f ^= b) : i & 4 ? t.push(r) : i & 16777224 && s ? n.push(r) : Dn(r) && (Mn(r), i & 16 && (this.#o.add(r), s && j(r, x)));
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
	#d(e) {
		for (var t = 0; t < e.length; t += 1) Ge(e[t], this.#a, this.#o);
	}
	capture(e, t) {
		t !== r && !this.previous.has(e) && this.previous.set(e, t), e.f & 8388608 || (this.current.set(e, e.v), N?.set(e, e.v));
	}
	activate() {
		M = this, this.apply();
	}
	deactivate() {
		M === this && (M = null, N = null);
	}
	flush() {
		if (P.length > 0) M = this, $e();
		else if (this.#n === 0 && !this.is_fork) {
			for (let e of this.#e) e(this);
			this.#e.clear(), this.#f(), this.#i?.resolve();
		}
		this.deactivate();
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
	}
	#f() {
		if (Ke.size > 1) {
			this.previous.clear();
			var e = M, t = N, n = !0;
			for (let e of Ke) {
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
					var r = P;
					P = [];
					let n = new Set(), a = new Map();
					for (let e of t) nt(e, i, n, a);
					if (P.length > 0) {
						M = e, e.apply();
						for (let t of P) e.#u(t, [], []);
						e.deactivate();
					}
					P = r;
				}
			}
			M = e, N = t;
		}
		this.#s.clear(), Ke.delete(this);
	}
	increment(e) {
		this.#n += 1, e && (this.#r += 1);
	}
	decrement(e) {
		--this.#n, e && --this.#r, !this.#c && (this.#c = !0, k(() => {
			this.#c = !1, this.#l() ? P.length > 0 && this.flush() : this.revive();
		}));
	}
	revive() {
		for (let e of this.#a) this.#o.delete(e), j(e, x), I(e);
		for (let e of this.#o) j(e, S), I(e);
		this.flush();
	}
	oncommit(e) {
		this.#e.add(e);
	}
	ondiscard(e) {
		this.#t.add(e);
	}
	settled() {
		return (this.#i ??= y()).promise;
	}
	static ensure() {
		if (M === null) {
			let t = M = new e();
			Ke.add(M), Je || k(() => {
				M === t && t.flush();
			});
		}
		return M;
	}
	apply() {}
};
function Qe(e) {
	var t = Je;
	Je = !0;
	try {
		var n;
		for (e && (M !== null && $e(), n = e());;) {
			if (Be(), P.length === 0 && (M?.flush(), P.length === 0)) return qe = null, n;
			$e();
		}
	} finally {
		Je = t;
	}
}
function $e() {
	try {
		for (var e = 0; P.length > 0;) {
			var t = Ze.ensure();
			e++ > 1e3 && et(), t.process(P), L.clear();
		}
	} finally {
		P = [], qe = null, Ye = null;
	}
}
function et() {
	try {
		ge();
	} catch (e) {
		A(e, qe);
	}
}
let F = null;
function tt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Dn(r) && (F = new Set(), Mn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && fn(r), F?.size > 0)) {
				L.clear();
				for (let e of F) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) F.has(n) && (F.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Mn(n);
					}
				}
				F.clear();
			}
		}
		F = null;
	}
}
function nt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? nt(i, t, n, r) : e & 4194320 && !(e & 2048) && rt(i, t, r) && (j(i, x), I(i));
	}
}
function rt(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (o.call(t, r)) return !0;
		if (r.f & 2 && rt(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function I(e) {
	var t = qe = e, n = t.b;
	if (n?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
		n.defer_effect(e);
		return;
	}
	for (; t.parent !== null;) {
		t = t.parent;
		var r = t.f;
		if (Ye !== null && t === q && !(e.f & 8)) return;
		if (r & 96) {
			if (!(r & 1024)) return;
			t.f ^= b;
		}
	}
	P.push(t);
}
function it(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), j(e, b);
		for (var n = e.first; n !== null;) it(n, t), n = n.next;
	}
}
function at(e) {
	let t = 0, n = wt(0), r;
	return () => {
		qt() && ($(n), an(() => (t === 0 && (r = Fn(() => e(() => Ot(n)))), t += 1, () => {
			k(() => {
				--t, t === 0 && (r?.(), r = void 0, Ot(n));
			});
		})));
	};
}
var ot = ne | C;
function st(e, t, n, r) {
	new ct(e, t, n, r);
}
var ct = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = T ? E : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = new Set();
	#p = new Set();
	#m = null;
	#h = at(() => (this.#m = wt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = q;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = q.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = sn(() => {
			if (T) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ot), T && (this.#e = E);
	}
	#g() {
		try {
			this.#a = V(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = V(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = V(() => e(this.#e)), k(() => {
			var e = this.#c = document.createDocumentFragment(), t = It();
			e.append(t), this.#a = this.#x(() => (Ze.ensure(), V(() => this.#r(t)))), this.#u === 0 && (this.#e.before(e), this.#c = null, pn(this.#o, () => {
				this.#o = null;
			}), this.#b());
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = V(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				_n(this.#a, e);
				let t = this.#n.pending;
				this.#o = V(() => t(this.#e));
			} else this.#b();
		} catch (e) {
			this.error(e);
		}
	}
	#b() {
		this.is_pending = !1;
		for (let e of this.#f) j(e, x), I(e);
		for (let e of this.#p) j(e, S), I(e);
		this.#f.clear(), this.#p.clear();
	}
	defer_effect(e) {
		Ge(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = q, n = W, r = O;
		J(this.#i), K(this.#i), Pe(this.#i.ctx);
		try {
			return e();
		} catch (e) {
			return Ve(e), null;
		} finally {
			J(t), K(n), Pe(r);
		}
	}
	#S(e) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(), this.#o && pn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e) {
		this.#S(e), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, k(() => {
			this.#d = !1, this.#m && Et(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), $(this.#m);
	}
	error(e) {
		var t = this.#n.onerror;
		let n = this.#n.failed;
		if (!t && !n) throw e;
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), T && (D(this.#t), Oe(), D(ke()));
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				we();
				return;
			}
			r = !0, i && Se(), this.#s !== null && pn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				Ze.ensure(), this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				A(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				Ze.ensure();
				try {
					return V(() => {
						var t = q;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return A(e, this.#i.parent), null;
				}
			}));
		};
		k(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				A(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => A(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
function lt(e, t, n, r) {
	let i = Le() ? pt : ht;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = q, s = ut(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		s();
		try {
			r(e);
		} catch (e) {
			o.f & 16384 || A(e, o);
		}
		dt();
	}
	if (n.length === 0) {
		c.then(() => l(t.map(i)));
		return;
	}
	function u() {
		s(), Promise.all(n.map((e) => mt(e))).then((e) => l([...t.map(i), ...e])).catch((e) => A(e, o));
	}
	c ? c.then(u) : u();
}
function ut() {
	var e = q, t = W, n = O, r = M;
	return function(i = !0) {
		J(e), K(t), Pe(n), i && r?.activate();
	};
}
function dt(e = !0) {
	J(null), K(null), Pe(null), e && M?.deactivate();
}
function ft() {
	var e = q.b, t = M, n = e.is_rendered();
	return e.update_pending_count(1), t.increment(n), () => {
		e.update_pending_count(-1), t.decrement(n);
	};
}
function pt(e) {
	var t = 2 | x, n = W !== null && W.f & 2 ? W : null;
	return q !== null && (q.f |= C), {
		ctx: O,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: r,
		wv: 0,
		parent: n ?? q,
		ac: null
	};
}
function mt(e, t, n) {
	q === null && fe();
	var i = void 0, a = wt(r), o = !W, s = new Map();
	return rn(() => {
		var t = y();
		i = t.promise;
		try {
			Promise.resolve(e()).then(t.resolve, t.reject).finally(dt);
		} catch (e) {
			t.reject(e), dt();
		}
		var n = M;
		if (o) {
			var r = ft();
			s.get(n)?.reject(w), s.delete(n), s.set(n, t);
		}
		let c = (e, t = void 0) => {
			if (n.activate(), t) t !== w && (a.f |= oe, Et(a, t));
			else {
				a.f & 8388608 && (a.f ^= oe), Et(a, e);
				for (let [e, t] of s) {
					if (s.delete(e), e === n) break;
					t.reject(w);
				}
			}
			r && r();
		};
		t.promise.then(c, (e) => c(null, e || "unknown"));
	}), Jt(() => {
		for (let e of s.values()) e.reject(w);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
function ht(e) {
	let t = pt(e);
	return t.equals = Ne, t;
}
function gt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function _t(e) {
	for (var t = e.parent; t !== null;) {
		if (!(t.f & 2)) return t.f & 16384 ? null : t;
		t = t.parent;
	}
	return null;
}
function vt(e) {
	var t, n = q;
	J(_t(e));
	try {
		e.f &= ~ie, gt(e), t = kn(e);
	} finally {
		J(n);
	}
	return t;
}
function yt(e) {
	var t = vt(e);
	if (!e.equals(t) && (e.wv = En(), (!M?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
		j(e, b);
		return;
	}
	U || (N === null ? Ue(e) : (qt() || M?.is_fork) && N.set(e, t));
}
function bt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(w), t.teardown = g, t.ac = null, jn(t, 0), ln(t));
}
function xt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && Mn(t);
}
let St = new Set();
const L = new Map();
var Ct = !1;
function wt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: je,
		rv: 0,
		wv: 0
	};
}
function R(e, t) {
	let n = wt(e, t);
	return bn(n), n;
}
function Tt(t, n = !1, r = !0) {
	let i = wt(t);
	return n || (i.equals = Ne), e && r && O !== null && O.l !== null && (O.l.s ??= []).push(i), i;
}
function z(e, t, n = !1) {
	return W !== null && (!G || W.f & 131072) && Le() && W.f & 4325394 && (Y === null || !o.call(Y, e)) && xe(), Et(e, n ? At(t) : t);
}
function Et(e, t) {
	if (!e.equals(t)) {
		var n = e.v;
		U ? L.set(e, t) : L.set(e, n), e.v = t;
		var r = Ze.ensure();
		if (r.capture(e, n), e.f & 2) {
			let t = e;
			e.f & 2048 && vt(t), Ue(t);
		}
		e.wv = En(), kt(e, x), Le() && q !== null && q.f & 1024 && !(q.f & 96) && (Q === null ? xn([e]) : Q.push(e)), !r.is_fork && St.size > 0 && !Ct && Dt();
	}
	return t;
}
function Dt() {
	Ct = !1;
	for (let e of St) e.f & 1024 && j(e, S), Dn(e) && Mn(e);
	St.clear();
}
function Ot(e) {
	z(e, e.v + 1);
}
function kt(e, t) {
	var n = e.reactions;
	if (n !== null) for (var r = Le(), i = n.length, a = 0; a < i; a++) {
		var o = n[a], s = o.f;
		if (!(!r && o === q)) {
			var c = (s & x) === 0;
			if (c && j(o, t), s & 2) {
				var l = o;
				N?.delete(l), s & 65536 || (s & 512 && (o.f |= ie), kt(l, S));
			} else c && (s & 16 && F !== null && F.add(o), I(o));
		}
	}
}
function At(e) {
	if (typeof e != "object" || !e || se in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = new Map(), a = i(e), o = R(0), s = null, c = wn, l = (e) => {
		if (wn === c) return e();
		var t = W, n = wn;
		K(null), Tn(c);
		var r = e();
		return K(t), Tn(n), r;
	};
	return a && n.set("length", R(e.length, s)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && ye();
			var i = n.get(t);
			return i === void 0 ? l(() => {
				var e = R(r.value, s);
				return n.set(t, e), e;
			}) : z(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var i = n.get(t);
			if (i === void 0) {
				if (t in e) {
					let e = l(() => R(r, s));
					n.set(t, e), Ot(o);
				}
			} else z(i, r), Ot(o);
			return !0;
		},
		get(t, i, a) {
			if (i === se) return e;
			var o = n.get(i), c = i in t;
			if (o === void 0 && (!c || u(t, i)?.writable) && (o = l(() => R(At(c ? t[i] : r), s)), n.set(i, o)), o !== void 0) {
				var d = $(o);
				return d === r ? void 0 : d;
			}
			return Reflect.get(t, i, a);
		},
		getOwnPropertyDescriptor(e, t) {
			var i = Reflect.getOwnPropertyDescriptor(e, t);
			if (i && "value" in i) {
				var a = n.get(t);
				a && (i.value = $(a));
			} else if (i === void 0) {
				var o = n.get(t), s = o?.v;
				if (o !== void 0 && s !== r) return {
					enumerable: !0,
					configurable: !0,
					value: s,
					writable: !0
				};
			}
			return i;
		},
		has(e, t) {
			if (t === se) return !0;
			var i = n.get(t), a = i !== void 0 && i.v !== r || Reflect.has(e, t);
			return (i !== void 0 || q !== null && (!a || u(e, t)?.writable)) && (i === void 0 && (i = l(() => R(a ? At(e[t]) : r, s)), n.set(t, i)), $(i) === r) ? !1 : a;
		},
		set(e, t, i, c) {
			var d = n.get(t), f = t in e;
			if (a && t === "length") for (var p = i; p < d.v; p += 1) {
				var m = n.get(p + "");
				m === void 0 ? p in e && (m = l(() => R(r, s)), n.set(p + "", m)) : z(m, r);
			}
			if (d === void 0) (!f || u(e, t)?.writable) && (d = l(() => R(void 0, s)), z(d, At(i)), n.set(t, d));
			else {
				f = d.v !== r;
				var h = l(() => At(i));
				z(d, h);
			}
			var g = Reflect.getOwnPropertyDescriptor(e, t);
			if (g?.set && g.set.call(c, i), !f) {
				if (a && typeof t == "string") {
					var _ = n.get("length"), v = Number(t);
					Number.isInteger(v) && v >= _.v && z(_, v + 1);
				}
				Ot(o);
			}
			return !0;
		},
		ownKeys(e) {
			$(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== r;
			});
			for (var [i, a] of n) a.v !== r && !(i in e) && t.push(i);
			return t;
		},
		setPrototypeOf() {
			be();
		}
	});
}
var jt, Mt, Nt, Pt;
function Ft() {
	if (jt === void 0) {
		jt = window, document, Mt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Nt = u(t, "firstChild").get, Pt = u(t, "nextSibling").get, h(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), h(n) && (n.__t = void 0);
	}
}
function It(e = "") {
	return document.createTextNode(e);
}
function Lt(e) {
	return Nt.call(e);
}
function Rt(e) {
	return Pt.call(e);
}
function zt(e, t) {
	if (!T) return Lt(e);
	var n = Lt(E);
	if (n === null) n = E.appendChild(It());
	else if (t && n.nodeType !== 3) {
		var r = It();
		return n?.before(r), D(r), r;
	}
	return t && Ut(n), D(n), n;
}
function Bt(e) {
	e.textContent = "";
}
function Vt() {
	return !1;
}
function Ht(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function Ut(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function Wt(e) {
	var t = W, n = q;
	K(null), J(null);
	try {
		return e();
	} finally {
		K(t), J(n);
	}
}
function Gt(e) {
	q === null && (W === null && he(e), me()), U && pe(e);
}
function Kt(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function B(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= ee);
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
	if (e & 4) Ye === null ? I(r) : Ye.push(r);
	else if (t !== null) {
		try {
			Mn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ne));
	}
	if (i !== null && (i.parent = n, n !== null && Kt(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function qt() {
	return W !== null && !G;
}
function Jt(e) {
	let t = B(8, null);
	return j(t, b), t.teardown = e, t;
}
function Yt(e) {
	Gt("$effect");
	var t = q.f;
	if (!W && t & 32 && !(t & 32768)) {
		var n = O;
		(n.e ??= []).push(e);
	} else return Xt(e);
}
function Xt(e) {
	return B(4 | re, e);
}
function Zt(e) {
	return Gt("$effect.pre"), B(8 | re, e);
}
function Qt(e) {
	Ze.ensure();
	let t = B(64 | C, e);
	return () => {
		H(t);
	};
}
function $t(e) {
	Ze.ensure();
	let t = B(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? pn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function en(e) {
	return B(4, e);
}
function tn(e, t) {
	var n = O, r = {
		effect: null,
		ran: !1,
		deps: e
	};
	n.l.$.push(r), r.effect = an(() => {
		e(), !r.ran && (r.ran = !0, Fn(t));
	});
}
function nn() {
	var e = O;
	an(() => {
		for (var t of e.l.$) {
			t.deps();
			var n = t.effect;
			n.f & 1024 && n.deps !== null && j(n, S), Dn(n) && Mn(n), t.ran = !1;
		}
	});
}
function rn(e) {
	return B(4194304 | C, e);
}
function an(e, t = 0) {
	return B(8 | t, e);
}
function on(e, t = [], n = [], r = []) {
	lt(r, t, n, (t) => {
		B(8, () => e(...t.map($)));
	});
}
function sn(e, t = 0) {
	return B(16 | t, e);
}
function V(e) {
	return B(32 | C, e);
}
function cn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = U, n = W;
		yn(!0), K(null);
		try {
			t.call(null);
		} finally {
			yn(e), K(n);
		}
	}
}
function ln(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Wt(() => {
			e.abort(w);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function un(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (dn(e.nodes.start, e.nodes.end), n = !0), ln(e, t && !n), jn(e, 0), j(e, 16384);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	cn(e);
	var i = e.parent;
	i !== null && i.first !== null && fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function dn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : Rt(e);
		e.remove(), e = n;
	}
}
function fn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function pn(e, t, n = !0) {
	var r = [];
	mn(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function mn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ee;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next, o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
			mn(i, t, o ? n : !1), i = a;
		}
	}
}
function hn(e) {
	gn(e, !0);
}
function gn(e, t) {
	if (e.f & 8192) {
		e.f ^= ee;
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			gn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function _n(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : Rt(n);
		t.append(n), n = i;
	}
}
var vn = !1;
let U = !1;
function yn(e) {
	U = e;
}
let W = null, G = !1;
function K(e) {
	W = e;
}
let q = null;
function J(e) {
	q = e;
}
let Y = null;
function bn(e) {
	W !== null && (Y === null ? Y = [e] : Y.push(e));
}
var X = null, Z = 0;
let Q = null;
function xn(e) {
	Q = e;
}
let Sn = 1;
var Cn = 0;
let wn = Cn;
function Tn(e) {
	wn = e;
}
function En() {
	return ++Sn;
}
function Dn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ie), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Dn(a) && yt(a), a.wv > e.wv) return !0;
		}
		t & 512 && N === null && j(e, b);
	}
	return !1;
}
function On(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Y !== null && o.call(Y, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? On(a, t, !1) : t === a && (n ? j(a, x) : a.f & 1024 && j(a, S), I(a));
	}
}
function kn(e) {
	var t = X, n = Z, r = Q, i = W, a = Y, o = O, s = G, c = wn, l = e.f;
	X = null, Z = 0, Q = null, W = l & 96 ? null : e, Y = null, Pe(e.ctx), G = !1, wn = ++Cn, e.ac !== null && (Wt(() => {
		e.ac.abort(w);
	}), e.ac = null);
	try {
		e.f |= ae;
		var u = e.fn, d = u();
		e.f |= te;
		var f = e.deps, p = M?.is_fork;
		if (X !== null) {
			var m;
			if (p || jn(e, Z), f !== null && Z > 0) for (f.length = Z + X.length, m = 0; m < X.length; m++) f[Z + m] = X[m];
			else e.deps = f = X;
			if (qt() && e.f & 512) for (m = Z; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Z < f.length && (jn(e, Z), f.length = Z);
		if (Le() && Q !== null && !G && f !== null && !(e.f & 6146)) for (m = 0; m < Q.length; m++) On(Q[m], e);
		if (i !== null && i !== e) {
			if (Cn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Cn;
			if (t !== null) for (let e of t) e.rv = Cn;
			Q !== null && (r === null ? r = Q : r.push(...Q));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (e) {
		return Ve(e);
	} finally {
		e.f ^= ae, X = t, Z = n, Q = r, W = i, Y = a, Pe(o), G = s, wn = c;
	}
}
function An(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = a.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (X === null || !o.call(X, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512, s.f &= ~ie), Ue(s), bt(s), jn(s, 0);
	}
}
function jn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) An(e, n[r]);
}
function Mn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		j(e, b);
		var n = q, r = vn;
		q = e, vn = !0;
		try {
			t & 16777232 ? un(e) : ln(e), cn(e);
			var i = kn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Sn;
		} finally {
			vn = r, q = n;
		}
	}
}
function $(e) {
	var t = (e.f & 2) != 0;
	if (null?.add(e), W !== null && !G && !(q !== null && q.f & 16384) && (Y === null || !o.call(Y, e))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < Cn && (e.rv = Cn, X === null && n !== null && n[Z] === e ? Z++ : X === null ? X = [e] : X.push(e));
		else {
			(W.deps ??= []).push(e);
			var r = e.reactions;
			r === null ? e.reactions = [W] : o.call(r, W) || r.push(W);
		}
	}
	if (U && L.has(e)) return L.get(e);
	if (t) {
		var i = e;
		if (U) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Pn(i)) && (a = vt(i)), L.set(i, a), a;
		}
		var s = (i.f & 512) == 0 && !G && W !== null && (vn || (W.f & 512) != 0), c = (i.f & te) === 0;
		Dn(i) && (s && (i.f |= 512), yt(i)), s && !c && (xt(i), Nn(i));
	}
	if (N?.has(e)) return N.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Nn(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (xt(t), Nn(t));
}
function Pn(e) {
	if (e.v === r) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (L.has(t) || t.f & 2 && Pn(t)) return !0;
	return !1;
}
function Fn(e) {
	var t = G;
	try {
		return G = !0, e();
	} finally {
		G = t;
	}
}
function In(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (se in e) Ln(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && se in n && Ln(n);
		}
	}
}
function Ln(e, t = new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Ln(e[n], t);
		} catch {}
		let n = m(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = d(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
const Rn = Symbol("events"), zn = new Set(), Bn = new Set();
function Vn(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Wn.call(t, e), !e.cancelBubble) return Wt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? k(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Hn(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Vn(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Jt(() => {
		t.removeEventListener(e, o, a);
	});
}
var Un = null;
function Wn(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Un = e;
	var o = 0, s = Un === e && e[Rn];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Rn] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		c <= u && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		l(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var d = W, f = q;
		K(null), J(null);
		try {
			for (var p, m = []; a !== null;) {
				var h = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var g = a[Rn]?.[r];
					g != null && (!a.disabled || e.target === a) && g.call(a, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble || h === t || h === null) break;
				a = h;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[Rn] = t, delete e.currentTarget, K(d), J(f);
		}
	}
}
var Gn = globalThis?.window?.trustedTypes && globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Kn(e) {
	return Gn?.createHTML(e) ?? e;
}
function qn(e) {
	var t = Ht("template");
	return t.innerHTML = Kn(e.replaceAll("<!>", "<!---->")), t.content;
}
function Jn(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
function Yn(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (T) return Jn(E, null), E;
		i === void 0 && (i = qn(a ? e : "<!>" + e), n || (i = Lt(i)));
		var t = r || Mt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = Lt(t), s = t.lastChild;
			Jn(o, s);
		} else Jn(t, t);
		return t;
	};
}
function Xn(e, t) {
	if (T) {
		var n = q;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = E), Ee();
		return;
	}
	e !== null && e.before(t);
}
[..."allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Zn = ["touchstart", "touchmove"];
function Qn(e) {
	return Zn.includes(e);
}
function $n(e, t) {
	return nr(e, t);
}
function er(e, t) {
	Ft(), t.intro = t.intro ?? !1;
	let r = t.target, i = T, a = E;
	try {
		for (var o = Lt(r); o && (o.nodeType !== 8 || o.data !== "[");) o = Rt(o);
		if (!o) throw n;
		Te(!0), D(o);
		let i = nr(e, {
			...t,
			anchor: o
		});
		return Te(!1), i;
	} catch (i) {
		if (i instanceof Error && i.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw i;
		return i !== n && console.warn("Failed to hydrate: ", i), t.recover === !1 && _e(), Ft(), Bt(r), Te(!1), $n(e, t);
	} finally {
		Te(i), D(a);
	}
}
var tr = new Map();
function nr(e, { target: t, anchor: r, props: i = {}, events: a, context: o, intro: c = !0, transformError: l }) {
	Ft();
	var u = void 0, d = $t(() => {
		var c = r ?? t.appendChild(It());
		st(c, { pending: () => {} }, (t) => {
			Fe({});
			var r = O;
			if (o && (r.c = o), a && (i.$$events = a), T && Jn(t, null), u = e(t, i) || {}, T && (q.nodes.end = E, E === null || E.nodeType !== 8 || E.data !== "]")) throw Ce(), n;
			Ie();
		}, l);
		var d = new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = Qn(r);
					for (let e of [t, document]) {
						var a = tr.get(e);
						a === void 0 && (a = new Map(), tr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Wn, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(s(zn)), Bn.add(f), () => {
			for (var e of d) for (let r of [t, document]) {
				var n = tr.get(r), i = n.get(e);
				--i == 0 ? (r.removeEventListener(e, Wn), n.delete(e), n.size === 0 && tr.delete(r)) : n.set(e, i);
			}
			Bn.delete(f), c !== r && c.parentNode?.removeChild(c);
		};
	});
	return rr.set(u, d), u;
}
var rr = new WeakMap();
function ir(e, t) {
	let n = rr.get(e);
	return n ? (rr.delete(e), n(t)) : Promise.resolve();
}
var ar = class {
	anchor;
	#e = new Map();
	#t = new Map();
	#n = new Map();
	#r = new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) hn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && !(r.effect.f & 8192) && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (H(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e) || r.f & 8192) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						_n(r, t), t.append(It()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), pn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M, r = Vt();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = It();
			i.append(a), this.#n.set(e, {
				effect: V(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, V(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else T && (this.anchor = E), this.#a(n);
	}
};
function or(t) {
	O === null && de("onMount"), e && O.l !== null ? sr(O).m.push(t) : Yt(() => {
		let e = Fn(t);
		if (typeof e == "function") return e;
	});
}
function sr(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
function cr(e, t, n = !1) {
	var r;
	T && (r = E, Ee());
	var i = new ar(e), a = n ? ne : 0;
	function o(e, t) {
		if (T) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				D(a), i.anchor = a, Te(!1), i.ensure(e, t), Te(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	sn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
function lr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ur(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function dr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ur)), i && c.push(...Object.keys(i).map(ur));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ur(e.substring(l, u).trim());
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
		return r && (n += lr(r)), i && (n += lr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
function fr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function pr(e, t, n, r) {
	var i = e.__style;
	if (T || i !== t) {
		var a = dr(t, r);
		(!T || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e.__style = t;
	} else r && (Array.isArray(r) ? (fr(e, n?.[0], r[0]), fr(e, n?.[1], r[1], "important")) : fr(e, n, r));
	return r;
}
var mr = Symbol("is custom element"), hr = Symbol("is html"), gr = ue ? "link" : "LINK";
function _r(e, t, n, r) {
	var i = vr(e);
	T && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === gr) || i[t] !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && br(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function vr(e) {
	return e.__attributes ??= {
		[mr]: e.nodeName.includes("-"),
		[hr]: e.namespaceURI === "http://www.w3.org/1999/xhtml"
	};
}
var yr = new Map();
function br(e) {
	var t = e.getAttribute("is") || e.nodeName, n = yr.get(t);
	if (n) return n;
	yr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = d(i), r) r[o].set && n.push(o);
		i = m(i);
	}
	return n;
}
function xr(e, t) {
	return e === t || e?.[se] === t;
}
function Sr(e = {}, t, n, r) {
	return en(() => {
		var i, a;
		return an(() => {
			i = a, a = r?.() || [], Fn(() => {
				e !== n(...a) && (t(e, ...a), i && xr(n(...i), e) && t(null, ...i));
			});
		}), () => {
			k(() => {
				a && xr(n(...a), e) && t(null, ...a);
			});
		};
	}), e;
}
function Cr(e = !1) {
	let t = O, n = t.l.u;
	if (!n) return;
	let r = () => In(t.s);
	if (e) {
		let e = 0, n = {}, i = pt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => $(i);
	}
	n.b.length && Zt(() => {
		wr(t, r), v(n.b);
	}), Yt(() => {
		let e = Fn(() => n.m.map(_));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Yt(() => {
		wr(t, r), v(n.a);
	});
}
function wr(e, t) {
	if (e.l.s) for (let t of e.l.s) $(t);
	t();
}
var Tr = !1;
function Er(e) {
	var t = Tr;
	try {
		return Tr = !1, [e(), Tr];
	} finally {
		Tr = t;
	}
}
function Dr(t, n, r, i) {
	var a = !e || (r & 2) != 0, o = (r & 8) != 0, s = (r & 16) != 0, c = i, l = !0, d = () => (l && (l = !1, c = s ? Fn(i) : i), c), f;
	if (o) {
		var p = se in t || ce in t;
		f = u(t, n)?.set ?? (p && n in t ? (e) => t[n] = e : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Er(() => t[n]) : m = t[n], m === void 0 && i !== void 0 && (m = d(), f && (a && ve(n), f(m)));
	var g = a ? () => {
		var e = t[n];
		return e === void 0 ? d() : (l = !0, e);
	} : () => {
		var e = t[n];
		return e !== void 0 && (c = void 0), e === void 0 ? c : e;
	};
	if (a && !(r & 4)) return g;
	if (f) {
		var _ = t.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!a || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (r & 1 ? pt : ht)(() => (v = !1, g()));
	o && $(y);
	var b = q;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? $(y) : a && o ? At(e) : e;
			return z(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return U && v || b.f & 16384 ? y.v : $(y);
	});
}
function Or(e) {
	return new kr(e);
}
var kr = class {
	#e;
	#t;
	constructor(e) {
		var t = new Map(), n = (e, n) => {
			var r = Tt(n, !1, !1);
			return t.set(e, r), r;
		};
		let r = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, r) {
				return $(t.get(r) ?? n(r, Reflect.get(e, r)));
			},
			has(e, r) {
				return r === ce ? !0 : ($(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
			},
			set(e, r, i) {
				return z(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i);
			}
		});
		this.#t = (e.hydrate ? er : $n)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError
		}), (!e?.props?.$$host || e.sync === !1) && Qe(), this.#e = r.$$events;
		for (let e of Object.keys(this.#t)) e === "$set" || e === "$destroy" || e === "$on" || l(this, e, {
			get() {
				return this.#t[e];
			},
			set(t) {
				this.#t[e] = t;
			},
			enumerable: !0
		});
		this.#t.$set = (e) => {
			Object.assign(r, e);
		}, this.#t.$destroy = () => {
			ir(this.#t);
		};
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, t) {
		this.#e[e] = this.#e[e] || [];
		let n = (...e) => t.call(this, ...e);
		return this.#e[e].push(n), () => {
			this.#e[e] = this.#e[e].filter((e) => e !== n);
		};
	}
	$destroy() {
		this.#t.$destroy();
	}
}, Ar;
typeof HTMLElement == "function" && (Ar = class extends HTMLElement {
	$$ctor;
	$$s;
	$$c;
	$$cn = !1;
	$$d = {};
	$$r = !1;
	$$p_d = {};
	$$l = {};
	$$l_u = new Map();
	$$me;
	$$shadowRoot = null;
	constructor(e, t, n) {
		super(), this.$$ctor = e, this.$$s = t, n && (this.$$shadowRoot = this.attachShadow(n));
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
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function e(e) {
				return (t) => {
					let n = Ht("slot");
					e !== "default" && (n.name = e), Xn(t, n);
				};
			}
			let t = {}, n = Mr(this);
			for (let r of this.$$s) r in n && (r === "default" && !this.$$d.children ? (this.$$d.children = e(r), t.default = !0) : t[r] = e(r));
			for (let e of this.attributes) {
				let t = this.$$g_p(e.name);
				t in this.$$d || (this.$$d[t] = jr(t, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			this.$$c = Or({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: t,
					$$host: this
				}
			}), this.$$me = Qt(() => {
				an(() => {
					this.$$r = !0;
					for (let e of c(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let t = jr(e, this.$$d[e], this.$$p_d, "toAttribute");
						t == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, t);
					}
					this.$$r = !1;
				});
			});
			for (let e in this.$$l) for (let t of this.$$l[e]) {
				let n = this.$$c.$on(e, t);
				this.$$l_u.set(t, n);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(e, t, n) {
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = jr(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return c(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function jr(e, t, n, r) {
	let i = n[e]?.type;
	if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e]) return t;
	if (r === "toAttribute") switch (i) {
		case "Object":
		case "Array": return t == null ? null : JSON.stringify(t);
		case "Boolean": return t ? "" : null;
		case "Number": return t ?? null;
		default: return t;
	}
	else switch (i) {
		case "Object":
		case "Array": return t && JSON.parse(t);
		case "Boolean": return t;
		case "Number": return t == null ? t : +t;
		default: return t;
	}
}
function Mr(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function Nr(e, t, n, r, i, a) {
	let o = class extends Ar {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return c(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return c(t).forEach((e) => {
		l(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = jr(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				r && (u(r, e)?.get ? r[e] = n : r.$set({ [e]: n }));
			}
		});
	}), r.forEach((e) => {
		l(o.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
var Pr = Yn("<img draggable=\"false\"/>"), Fr = Yn("<p>Loading...</p>"), Ir = Yn("<div class=\"tenuuki-spin-viewer\"><!></div>");
function Lr(e, t) {
	Fe(t, !1);
	let n = Tt(), r = Dr(t, "options", 28, () => ({ images: [] })), i = Tt(0), a = 0, o = Tt(), s = Tt(), c, l = [], u = [], d = 0, f = !1, p = Tt(!1), m = 0, h = 0, g = 0, _ = [], v, y = (e, t) => (e % t + t) % t, b = () => r()?.direction === -1 ? 1 : -1, x = () => Math.min((r()?.initialFrame ?? 1) - 1, r().images.length - 1), S = (e, t, n) => Array.from({ length: t }, (t, i) => e.replace(`{${r().replacementToken}}`, String(i + 1).padStart(n, "0"))), ee = (e) => {
		u[e] || (u[e] = !0, d++, ne());
	}, te = (e = 10, t = 50) => {
		let n = 0, i = () => {
			for (let t = n; t < n + e && t < r().images.length; t++) {
				let e = new Image();
				u[t] = !1, e.onload = () => ee(t), e.onerror = () => {
					console.warn(`[TenuukiSpinViewer] Failed to load image ${t}`), ee(t);
				}, e.src = r().images[t], l[t] = e;
			}
			n += e, n < r().images.length && setTimeout(i, t);
		};
		i();
	}, ne = () => {
		if (f || !r().initialSpin) return;
		let e = r().images.length, t = C(), n = x(), i = !0;
		for (let r = t; r !== y(n + b(), e); r = y(r + b(), e)) if (!u[r]) {
			i = !1;
			break;
		}
		i && (f = !0, re());
	}, C = () => {
		let e = r().images.length;
		return y(x() - Math.round((r().spinOffset ?? 0) % 360 / 360 * e), e);
	}, re = () => {
		if (!r().initialSpin) return;
		c && clearInterval(c);
		let e = r().images.length, t = C(), n = x(), o = b();
		z(i, t), a = t, c = setInterval(() => {
			z(i, y($(i) + o, e)), a = $(i), $(i) === n && (clearInterval(c), c = void 0);
		}, r().frameInterval ?? 60);
	}, ie = () => {
		v && cancelAnimationFrame(v), v = void 0, g = 0;
	}, ae = () => {
		let e = r().images.length;
		if (e === 0 || Math.abs(g) < .1) return;
		let t = performance.now(), n = (r) => {
			let o = (r - t) / 1e3;
			t = r, a = y(a + g * o, e), z(i, Math.floor(a)), g *= .92 ** (o * 60), v = Math.abs(g) >= .01 ? requestAnimationFrame(n) : void 0;
		};
		v = requestAnimationFrame(n);
	}, oe = (e) => r().axis === "y" ? e.clientY : e.clientX, se = (e) => {
		r().draggable !== !1 && (z(p, !0), m = oe(e), h = a, _ = [{
			coord: m,
			time: performance.now()
		}], c &&= (clearInterval(c), void 0), ie(), $(o) && $(o).setPointerCapture(e.pointerId), window.addEventListener("pointermove", ce), window.addEventListener("pointerup", le), window.addEventListener("pointercancel", le));
	}, ce = (e) => {
		if (!$(p)) return;
		let t = r().images.length, n = oe(e), o = (n - m) * b();
		a = y(h + o / 2, t), z(i, Math.floor(a)), _.push({
			coord: n,
			time: performance.now()
		}), _.length > 5 && _.shift();
	}, le = (e) => {
		if ($(p)) {
			if (z(p, !1), window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", le), window.removeEventListener("pointercancel", le), $(o) && $(o).releasePointerCapture(e.pointerId), _.length >= 2) {
				let e = _[0], t = _[_.length - 1], n = (t.time - e.time) / 1e3, r = t.coord - e.coord;
				n > 0 && (g = r / 2 / n * b(), Math.abs(g) > .1 && ae());
			}
			_ = [];
		}
	};
	or(() => {
		if (!$(s)) return;
		let e = $(s).parentElement;
		if (!e) return {};
		let t = e.getAttribute("data-image-base-url");
		console.log("image base: ", t);
		let n = parseInt(e.getAttribute("data-image-count") || "0", 10), o = parseInt(e.getAttribute("data-image-number-padding") || "4", 10);
		return r(r().axis = e.getAttribute("data-axis") === "y" ? "y" : "x", !0), r(r().direction = e.getAttribute("data-direction") === "-1" ? -1 : 1, !0), r(r().draggable = e.getAttribute("data-draggable") !== "false", !0), r(r().initialSpin = e.getAttribute("data-initial-spin") !== "false", !0), r(r().spinOffset = parseInt(e.getAttribute("data-spin-offset") || "0", 10), !0), r(r().initialFrame = parseInt(e.getAttribute("data-initial-frame") || "1", 10), !0), r(r().frameInterval = 60, !0), r(r().replacementToken = e.getAttribute("data-replacement-token") || "frame", !0), t && n > 0 && r(r().images = S(t, n, o), !0), z(i, r().initialSpin ? C() : 0), a = $(i), te(), () => {
			c && clearInterval(c), ie();
		};
	}), tn(() => (In(r()), $(i)), () => {
		z(n, r().images?.[$(i)] || "");
	}), nn();
	var w = {
		get options() {
			return r();
		},
		set options(e) {
			r(e), Qe();
		}
	};
	Cr();
	var ue = Ir(), de = zt(ue), fe = (e) => {
		var t = Pr();
		Sr(t, (e) => z(o, e), () => $(o)), on(() => {
			_r(t, "src", $(n)), _r(t, "alt", `Spinner frame ${$(i) ?? ""}`), pr(t, `
        cursor: ${$(p) ? "grabbing" : "grab"};
        user-select: none;
        touch-action: none;
      `);
		}), Hn("pointerdown", t, se), Xn(e, t);
	}, pe = (e) => {
		Xn(e, Fr());
	};
	return cr(de, (e) => {
		$(n) ? e(fe) : e(pe, -1);
	}), De(ue), Sr(ue, (e) => z(s, e), () => $(s)), Xn(e, ue), Ie(w);
}
customElements.define("tenuuki-spin-viewer", Nr(Lr, { options: {} }, [], []));
