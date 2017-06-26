let _uniqueId = 0;

// Deep copy - Anything not a plain object (subclass, function, array, etc) will be copied by reference
function _copyObj(obj) {
	let key, value, copy = {};
	for (key in obj) {
		value = obj[key];
		if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
			value = _copyObj(value);
		}
		copy[key] = value;
	}
	return copy;
}

// Copy attributes into the first object argument given a number of additional object arguments
function _extend(obj) {
	let i, key, other;
	for (i = 1; i < arguments.length; ++i) {
		other = arguments[i];
		for (key in other) {
			obj[key] = other[key];
		}
	}
	return obj;
}

// Copy own attributes into the first object argument given a number of additional object arguments
function _extendOwn(obj) {
	let i, key, other;
	for (i = 1; i < arguments.length; ++i) {
		other = arguments[i];
		for (key in other) {
			if (other.hasOwnProperty(key)) {
				obj[key] = other[key];
			}
		}
	}
	return obj;
}

function _matches(attrs) {
	attrs = _extendOwn({}, attrs);
	return function(obj) {
		for (let key in Object.keys(attrs)) {
			if (!(key in obj)) {
				return false;
			}
		}
		return true;
	};
}

function _each(obj, cb, ctx) {
	if (Array.isArray(obj)) {
		obj.forEach(cb, ctx);
	} else if (obj) {
		for (let key in obj) {
			cb.call(ctx, obj[key], key, obj);
		}
	}
};

export const bind = (func, ...args) => { return Function.prototype.bind.apply(func, args); };
export const clone = (obj) => _copyObj(obj);
export const contains = (arr, item, start) => (arr.indexOf(item) > (start || 0))
export const create = (proto, props) => _extendOwn(Object.create(proto), props);
export const defaults = (obj, ...defaults) => { const combined = _extend({}, ...defaults); _each(combined, (val, key) => { if (obj[key] === void(0)) obj[key] = val; }); return obj };
export const defer = (func) => setTimeout(func, 0);
export const escape = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/`/g, '&#x60;');
export const each = _each;
export const every = (obj, pred, ctx) => { let pass = true; _each(obj, (val) => { pass = pass && pred.call(ctx, val); }); return pass; };
export const extend = _extend;
export const extendOwn = _extendOwn;
export const filter = (obj, pred, ctx) => { const items = []; _each(obj, (val) => { if (pred.call(ctx, val)) items.push(val); }); return items; };
export const find = (obj, pred, ctx) => { let item; _each(obj, (val) => { if (pred.call(ctx, val)) item = val; }); return item; };
export const first = (arr) => (arr && arr[0]);
export const has = (obj, key) => (obj != null && hasOwnProperty.call(obj, key));
export const indexOf = (arr, item) => arr.indexOf(item);
export const isArray = (obj) => Array.isArray(obj);
export const isEqual = (a, b) => (a === b);
export const isEmpty = (obj) => (!obj || (obj.length === void(0) && Object.keys(obj).length === 0) || (obj.length === 0));
export const isFunction = (obj) => (typeof obj === 'function');
export const isObject = (obj) => (obj && typeof obj === 'object' || typeof obj === 'function');
export const isRegExp = (obj) => (obj instanceof RegExp);
export const isString = (obj) => (typeof obj === 'string');
export const iteratee = _matches;
export const keys = (obj) => (typeof obj === 'object' ? Object.keys(obj) : []);
export const last = (arr) => (arr && arr[arr.length - 1]);
export const lastIndexOf = (arr, item) => arr.lastIndexOf(item);
export const map = (obj, iter, ctx) => { const items = []; _each(obj, (val, key, obj) => { items.push(iter.call(ctx, val, key, obj)); }); return items; };
export const matcher = _matches;
export const once = (func) => { let done = false; let value; return function() { if (done) return value; done = true; return value = func.apply(this, arguments); }; };
export const pick = (obj, ...keys) => { const items = []; _each(obj, (val, key) => { if (key in keys) items.push(val); }); return items; };
export const reduce = (obj, iter, memo, ctx) => { _each(obj, (val, key, obj) => { memo = iter.call(ctx, memo, val, key, obj); }); return memo; };
export const result = (obj, prop) => ((obj || void(0)) && (typeof obj[prop] === 'function' ? obj[prop].call(obj) : obj[prop]));
export const size = (obj) => (obj.length === void(0) ? Object.keys(obj || {}).length : obj.length);
export const some = (obj, pred, ctx) => !!find(obj, pred, ctx);
export const uniqueId = (prefix) => (prefix + String(_uniqueId++));
export const values = (obj) => { const items = []; _each(obj, (val) => { items.push(val); }); return items; };

// Aliases
export const all = every;
export const any = some;
export const assign = extendOwn;
export const collect = map;
export const inject = reduce;
export const foldl = reduce;
export const detect = find;
export const forEach = each;
export const includes = contains;
export const matches = matcher;
export const select = filter;
