(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:26Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var etsyItems=[{"count":32202,"results":[{"listing_id":289969977,"state":"active","user_id":46749284,"category_id":69152559,"title":"Ladies Camo Country Pocket Pullover Shot of Whiskey Cup of Tea Country Concert Top Party Drinking","description":":o) Wear this fun top to your next concert...customize any way you like, just let us know so we can accommodate!\n\nHigh quality top...\nA raw-edge, off-the-shoulder neckline will make you want to dance like you&#39;ve never danced before.\n6.49-ounce, 50/46/4 poly/cotton/rayon\nRaglan sleeves\nKangaroo pocket\n\nXS           \t         S\tM\tL\tXL\t2XL\nBust\t                16\t17\t18\t19\t20\t21\nBody Length\t24\t25\t26\t27\t28\t29\nSleeve Length\t26 1/4\t27 3/8\t28\t28 5/8\t29 1/4\t28 7/8\nBUST\nMeasured one inch below armhole.\n\nBODY LENGTH\nMeasured from high point of shoulder from the front.\n\nSLEEVE LENGTH\nStart at center of neck and measure down shoulder, down sleeve to hem.","creation_tsz":1460684025,"ending_tsz":1471224825,"original_creation_tsz":1460684025,"last_modified_tsz":1460684163,"price":"35.00","currency_code":"USD","quantity":100,"tags":[],"category_path":["Clothing","Women"],"category_path_ids":[69150353,69152559],"materials":[],"shop_section_id":18242947,"featured_rank":null,"state_tsz":1460684025,"url":"https://www.etsy.com/listing/289969977/ladies-camo-country-pocket-pullover-shot?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":0,"num_favorers":0,"shipping_template_id":null,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":500,"taxonomy_path":[],"used_manufacturer":false,"Images":[],"Shop":{}},{"listing_id":264549782,"state":"active","user_id":18366368,"category_id":68936442,"title":"Buy Me a Shot. Drinking. Drinking Shirts. Whiskey Shirt. Country Girl Shirt. Country Clothing. Country Shirts. Southern Girl. Country Music.","description":"Buy Me a Shot and Tell Me I&#39;m Hot T-Shirt, super cute alone or layered.\n\nGreat at any music venue or just out for a fun day or night and don&#39;t forget Christmas or Birthday gifts.\n\nI ship Priority, the postal service says expected delivery is 2-3 days once shipped they don&#39;t guarantee that but they have been really good about being on time.\n\n-100% combed and ring-spun cotton (Heathers are - 90% combed and ring-spun cotton 10% poly)\n-30 single 4.2 oz for extreme softness\n-Pre-shrunk for reduced shrinkage\n\nAvailable in Small thru 2XL - unisex fit\n\nSMALL: Chest 34 - 37&quot;\nMEDIUM: Chest 38 - 41&quot;\nLARGE: Chest 42 - 45&quot;\nXLARGE: Chest 46 - 49&quot;\nXXLARGE: Chest 50 - 53&quot;\n\nTo give you an idea of the sizing, my mannequin&#39;s measurements are\nChest 32ish approx. a B+/small C cup\nWaist 26\nHips 34\nAnd in this photo she has a medium on \n\nSo if you want it to fit looser or tighter order accordingly\n\nAlso available in a tank tops...\nhttps://www.etsy.com/listing/236973877/southern-girl-beer-drinkin-girl-tank?ref=shop_home_active_9\nhttps://www.etsy.com/listing/246962038/beer-drinkin-girl-tank-beer-drinkin?ref=listing-shop-header-0\n\nCare instructions - Wash inside out with cold water on delicate cycle and dry on low heat\n\nLet me know if you have any questions before purchasing.\n\nIf you need it sooner let me know and we&#39;ll do our best to accommodate.\n\nYou can view the rest of my store at https://www.etsy.com/shop/SouthernGirlApparel\n\n\nThanks for shopping here at Southern Girl Apparel!!!! \nAnd be sure to check out our website Southerngirlapparel.com\n\n\n*Brightness of image may vary from what you see based on monitor settings*","creation_tsz":1460683698,"ending_tsz":1471224498,"original_creation_tsz":1453154901,"last_modified_tsz":1460683698,"price":"24.00","currency_code":"USD","quantity":20,"tags":["southerngirl","southern tshirt","country clothing","country girl tank","country tank","southern tank","drinking girl","country girl","drinking","drinking shirt","buy me a shot","country music","music festival"],"category_path":["Clothing","Women","Tshirt"],"category_path_ids":[69150353,69152559,68936442],"materials":[],"shop_section_id":15248973,"featured_rank":null,"state_tsz":1453154901,"url":"https://www.etsy.com/listing/264549782/buy-me-a-shot-drinking-drinking-shirts?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":40,"num_favorers":14,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"women","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":559,"taxonomy_path":["Clothing","Women's Clothing","Tops & Tees","T-shirts"],"used_manufacturer":false,"Images":[{"listing_image_id":905823509,"hex_code":"837C74","red":131,"green":124,"blue":116,"hue":32,"saturation":11,"brightness":51,"is_black_and_white":false,"creation_tsz":1453154902,"listing_id":264549782,"rank":1,"url_75x75":"https://img1.etsystatic.com/135/1/9046066/il_75x75.905823509_7823.jpg","url_170x135":"https://img1.etsystatic.com/135/1/9046066/il_170x135.905823509_7823.jpg","url_570xN":"https://img1.etsystatic.com/135/1/9046066/il_570xN.905823509_7823.jpg","url_fullxfull":"https://img1.etsystatic.com/135/1/9046066/il_fullxfull.905823509_7823.jpg","full_height":1008,"full_width":672}],"Shop":{"shop_id":9046066,"shop_name":"SouthernGirlApparel","user_id":18366368,"creation_tsz":1392451292,"title":"SOUTHERN GIRL APPAREL® ","announcement":"We’re big fans of the southern girl look and to us that’s denim, leather and lace and of course tops and gifts with fun sayings, jewelry and handbags.\r\n\r\nTo keep up with all of our latest releases \r\nFollow us on:\r\n\r\nFacebook : https://www.facebook.com/southerngirlapparel\r\n\r\nTwitter: https://twitter.com/sogirlapparel\r\n\r\nsoutherngirlapparel.com\r\n\r\nEnjoy!! And check back often we&#39;re always adding new sayings and items.\r\n","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you so much for your purchase!! I appreciate your business!!\r\n","digital_sale_message":null,"last_updated_tsz":1460683698,"listing_active_count":305,"digital_listing_count":0,"login_name":"SouthernGirlApparel","accepts_custom_requests":false,"policy_welcome":"Welcome to Southern Girl Apparel ® !!! The original trademark registered brand.","policy_payment":"Payment due upon purchase. Taxes are due for purchases from those residing in California.\r\n\r\nWe accept both PAYPAL and DIRECT CHECK OUT via Etsy. \r\n\r\nPaypal allows for payment via Paypal account, credit/debit card or via echeck (echeck takes about a week to clear). If paying by e-check product will not be made or shipped until e-check has cleared. \r\n\r\nDirect check-out via Etsy allows for credit/debit cards directly without any Paypal involvement. \r\n","policy_shipping":"DOMESTIC SHIPPING: We ship USPS Priority and it includes online tracking, I will send you the tracking number once shipped. \r\n\r\nIf you want to upgrade your domestic order to Express mail, PLEASE see listing in my shop marked &quot;Express Shipping&quot; or contact us BEFORE placing your order.\r\n\r\nLarge orders are shipped UPS and require a signature when delivered.\r\n\r\nINTERNATIONAL SHIPPING: Shipping to all other countries will be shipped USPS First Class with no tracking number available. Once items leave the US they are no longer the shop&#39;s responsibility. Customs in your country may charge a fee and will be buyer’s responsibility and will not be paid by Southern Girl Apparel. Please check on your country&#39;s customs rates before purchase.\r\n\r\nPLEASE NOTE that for international shipments, there may be unexpected delays if your package is held at customs. We have no control over shipments after they leave our hands. Buyers are responsible for any import duties imposed by their country of residence. All orders shipped internationally through Etsy include the full purchase price on the customs form.\r\n\r\nSTOLEN AFTER DELIVERY or UNDELIVERABLE DUE TO SHIPPING ADDRESS PROVIDED ON ETSY: Refunds or replacements will *not* be issued for merchandise that has been &quot;delivered&quot; to your requested address, according to the USPS tracking number, but you claim you never received it. I am not responsible for your stolen mail, and will not provide a replacement at my expense or a refund for your missing goods. You can request a signature confirmation at delivery for an additional $2.20 USD. Also, partial refunds (minus original shipping) are issued when an order is returned to me because a delivery attempt was made and a notice was left, but the buyer did not pick up the package or arrange a re-delivery for whatever reason, or an incorrect address was provided by the buyer on Etsy. If you choose to have me re-ship the product back to you, it will be AT YOUR EXPENSE -- no exceptions. \r\n\r\n*PLEASE, PLEASE, PLEASE check your ADDRESS in ETSY prior to purchasing. I ship your purchase to your Etsy address. Sometimes, Etsy will try to add a &quot;Street&quot;, &quot;Terr&quot; or &quot;Drive&quot; to your address. I DO NOT alter your shipping address. Please understand there may be a shipping delay if you do not include the full address as USPS considers this an &quot;Unconfirmed&quot; shipping address. If you realize your address is incorrect after purchase, please convo me ASAP to avoid a delay in shipping and/or not receiving your purchase* \r\n\r\nORDERS LOST IN TRANSIT: In the event that a US order is *lost in transit* by the US Postal Service and has not arrived in 45 days, as verified by the tracking information, you will be offered a refund minus the original shipping charges. I am not responsible for orders listed as &#39;delivered&#39; that are stolen after delivery (see details above). If your international order has not arrived in 45 days, it is likely lost or stolen. I am not responsible for lost or stolen international orders where I can guarantee the box was shipped by providing you with a shipping receipt on paper. Unfortunately, tracking numbers are only available for international orders where expensive priority international mail is used, which I do not offer, as it is always more expensive than the cost of my goods.\r\n","policy_refunds":"We do want you to be perfectly happy with your purchase but if for some reason you are not I do allow a one time exchange on most items, just send it back to me, be sure to include a note of what size you want. And we will accept returns within 7 days. However, the customer will be responsible for shipping costs; we will ONLY refund the purchase price. If a refund is requested on a listing with free shipping, the shipping costs will be subtracted before refund is submitted.\r\n\r\nALL ITEMS RETURNED MUST BE IN NEW, UNUSED AND UNLAUNDERED CONDITION. WE ONLY RETURN ITEMS THAT HAVE BEEN PURCHASED DIRECTLY FROM ETSY/SOUTHERNGIRLAPPAREL.COM. All ITEMS MUST HAVE THEIR ORIGINAL TAGS ATTACHED. \r\n\r\nIf you receive an item that is damaged send a note and a photo and we&#39;ll start working with you right away to exchange or refund your purchase. \r\n\r\nI&#39;m sorry I do not accept returns on holiday items, 4th of July, Christmas, Easter, Halloween, Thanksgiving, etc...\r\nI put the measurements and do my best to describe the item in the &quot;Item Details&quot; area so be sure to check them before ordering.","policy_additional":"We endeavor to represent our items as accurately as we can online, but please bear in mind that all computer monitors are calibrated differently and some colors may appear differently on your screen than in real life.\r\n\r\n*If you have ANY questions, please do not hesitate to send me a convo via Etsy. I am happy to answer and help with questions/concerns you may have*\r\n\r\n\r\n\r\nLEGAL NOTICE: Southern Girl Apparel® is a Registered Trademark. Regarding all original images and Content © 2011-2015 Southern Girl Apparel. All Rights Reserved. No artwork, images, or designs from this site may be reproduced in any way, shape or form without prior written consent. No rights are transferred upon purchase of apparel, accessories, wall art or gift items.  Southern Girl Apparel®","policy_seller_info":"Southern Girl Apparel® is a Registered Trademark. All art and content is copyright Southern Girl Apparel®\r\n\r\nsoutherngirlapparel@gmail.com","policy_updated_tsz":1444959448,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/SouthernGirlApparel?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/114/0/9046066/iusb_760x100.18101227_g3jq.jpg","num_favorers":3345,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/106/0/9046066/isla_fullxfull.18194650_mfmy36xe.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":257755351,"state":"active","user_id":67426023,"category_id":69150425,"title":"Groomsmen Gifts Personalized Whiskey Decanter Set with Wood Box Christmas Gifts for Dad for Men","description":"Ideal gift for your groomsmen, your buddy or Christmas gifts for dad? What says more about your good taste than an engraved whiskey decanter set? Crafted from fine European glass it makes a big style statement in your own home, or a distinctive housewarming present.\n\nDecanter 9&quot; X 3.5&quot; X 3.5&quot;, 0.7Kg, lead-free glass.\nGlass 3&quot;, 0.3Kg\n\nHow to place a personalized order? \n-------------------------------------------------------\nRoll over to the 5th picture above, you see the demonstration of 4 basic designs for engraving. Pick your favorite design and select it from the drop-down menu.\n\nAt the check out page, specify the custom information in the note to seller section. (please also include a phone number for shipping)\n\nSame content will be engraved on both decanter & glasses & wood box unless specified.\n\nAll the designs are okay to make a change upon your idea like adding or removing a line, a title, a date or quote.\n\nFor Design #4, please write as aBc - B is the initial of Last name.\n1 or 2 initials is also doable.\n\nFont: We recommend dafont.com if you need to change the font.\n\nLength limit: for best fit please try not to use a name that exceeds 8 letters.\n\nYour own design? \nLogo, quote, new design? Just feel free to share your idea with us. \nProof will not be provided unless specified.\n\nHandling & Shipping\n----------------------------------------------------------\nWe need 10-15 business days to process your order\nShipping usually takes 10 days \nWe suggest you placing the order 25-30 days before the event.\n\nWe suggest you placing the order at least 15 days before the event. \nWhen not busy we can deliver the order in 10 days.","creation_tsz":1460683513,"ending_tsz":1471224313,"original_creation_tsz":1448419311,"last_modified_tsz":1460683513,"price":"35.00","currency_code":"USD","quantity":95,"tags":["christmas gifts","christmas gift","groomsmen gift","groomsmen gifts","christmas gifts dad","gifts for dad","gifts for men","gifts for boyfriend","whiskey decanter","whiskey glasses","personalized gift","whiskey decanter set","scotch glasses"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["glass","wood"],"shop_section_id":17357275,"featured_rank":null,"state_tsz":1455113790,"url":"https://www.etsy.com/listing/257755351/groomsmen-gifts-personalized-whiskey?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":6714,"num_favorers":411,"shipping_template_id":null,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1862,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Drinkware"],"used_manufacturer":false,"Images":[{"listing_image_id":875431467,"hex_code":"8D897D","red":141,"green":137,"blue":125,"hue":45,"saturation":11,"brightness":55,"is_black_and_white":false,"creation_tsz":1448419311,"listing_id":257755351,"rank":1,"url_75x75":"https://img1.etsystatic.com/114/0/11221885/il_75x75.875431467_ocjf.jpg","url_170x135":"https://img1.etsystatic.com/114/0/11221885/il_170x135.875431467_ocjf.jpg","url_570xN":"https://img1.etsystatic.com/114/0/11221885/il_570xN.875431467_ocjf.jpg","url_fullxfull":"https://img1.etsystatic.com/114/0/11221885/il_fullxfull.875431467_ocjf.jpg","full_height":1000,"full_width":1333},{"listing_image_id":875636968,"hex_code":"6D695E","red":109,"green":105,"blue":94,"hue":44,"saturation":13,"brightness":42,"is_black_and_white":false,"creation_tsz":1448419312,"listing_id":257755351,"rank":2,"url_75x75":"https://img0.etsystatic.com/105/0/11221885/il_75x75.875636968_ktyd.jpg","url_170x135":"https://img0.etsystatic.com/105/0/11221885/il_170x135.875636968_ktyd.jpg","url_570xN":"https://img0.etsystatic.com/105/0/11221885/il_570xN.875636968_ktyd.jpg","url_fullxfull":"https://img0.etsystatic.com/105/0/11221885/il_fullxfull.875636968_ktyd.jpg","full_height":1000,"full_width":1333},{"listing_image_id":875407419,"hex_code":"6E695F","red":110,"green":105,"blue":95,"hue":40,"saturation":13,"brightness":43,"is_black_and_white":false,"creation_tsz":1448419312,"listing_id":257755351,"rank":3,"url_75x75":"https://img1.etsystatic.com/130/0/11221885/il_75x75.875407419_74ig.jpg","url_170x135":"https://img1.etsystatic.com/130/0/11221885/il_170x135.875407419_74ig.jpg","url_570xN":"https://img1.etsystatic.com/130/0/11221885/il_570xN.875407419_74ig.jpg","url_fullxfull":"https://img1.etsystatic.com/130/0/11221885/il_fullxfull.875407419_74ig.jpg","full_height":1000,"full_width":1333},{"listing_image_id":875638858,"hex_code":"B7B7B7","red":183,"green":183,"blue":183,"hue":0,"saturation":0,"brightness":71,"is_black_and_white":null,"creation_tsz":1448419312,"listing_id":257755351,"rank":4,"url_75x75":"https://img0.etsystatic.com/130/0/11221885/il_75x75.875638858_ab6b.jpg","url_170x135":"https://img0.etsystatic.com/130/0/11221885/il_170x135.875638858_ab6b.jpg","url_570xN":"https://img0.etsystatic.com/130/0/11221885/il_570xN.875638858_ab6b.jpg","url_fullxfull":"https://img0.etsystatic.com/130/0/11221885/il_fullxfull.875638858_ab6b.jpg","full_height":800,"full_width":1200}],"Shop":{"shop_id":11221885,"shop_name":"AnnaEngraving","user_id":67426023,"creation_tsz":1433513630,"title":"ANNA Engraving Gift","announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"1. PLEASE USE NON-PO BOX ADDRESS \r\n2. PLEASE INCLUDE RECIPIENT&#39;S PHONE NUMBER FOR SHIPPING\r\n\r\nTHANKS!","digital_sale_message":null,"last_updated_tsz":1460683513,"listing_active_count":55,"digital_listing_count":0,"login_name":"AnnaEngraving","accepts_custom_requests":true,"policy_welcome":"We are dedicated to make decent gift for the proper event. We are passionate about materials and textures that we creating on. \r\n\r\nFeel free to share with us if you have any wonderful idea. We are ready to bring your dream into  reality.","policy_payment":"PayPal is the most secure and convenient way to shop online. \r\nAs an international seller from Singapore we only accept payment from PayPal.","policy_shipping":"Order processing:\r\n3-5 business days\r\n\r\nShipping:\r\nUSA/CA/AU/UK (5-10 days)\r\nOther countries (10-15 days)\r\n\r\nWe suggest you placing the order at least 12 days before the event. \r\nWhen not busy we can deliver the order in 10 days.","policy_refunds":"100% satisfaction guaranteed.\r\n\r\nAny broken / faulty / wrong item will be replaced or refunded upon request.","policy_additional":"We are happy to personalize gift for any event. Feel free to contact us for custom / wholesale orders.","policy_seller_info":"We are located in Singapore as a family business. \r\nReach us via annamillerwork@gmail.com","policy_updated_tsz":1446909946,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/AnnaEngraving?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/073/0/11221885/iusb_760x100.15752344_n0pm.jpg","num_favorers":783,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":253203354,"state":"active","user_id":26109516,"category_id":69150367,"title":"Holiday Drink Recipe Card - Old Fashioned - Wishing you an old fashioned Christmas! / HLY-DRINK-OLDFASHIONED","description":"Drink recipe on back of the card.\n\nA print of an original gouache painting.\n\nThis listing is for 1 card and 1 cream coloured envelope \nCard size: 4.25&quot; x 5.5&quot;\nBlank inside for your personal message.\nProfessionally printed on heavy matte card stock.\nIt comes in a clear ECO plastic wrapper for protection. \n\nOUR ECO COMMITMENT:\nPrinted on 100% recycled paper\nEnvelope is made of 100% recycled material, 30% PCW\nPlastic wrapper is compostable (it’s made out of plants)\n\nGet a discount when buying 3 cards from our store (3 for $12 CAD)!\nhttps://www.etsy.com/listing/114439316/get-a-discout-when-buying-3-greeting?ref=shop_home_active_2\n\nGet a discount when buying 6 cards from our store (6 for $20 CAD)!\nhttps://www.etsy.com/listing/185584028/get-a-discout-when-buying-6-greeting?ref=shop_home_active_13","creation_tsz":1460683230,"ending_tsz":1471224030,"original_creation_tsz":1445626529,"last_modified_tsz":1460683230,"price":"4.90","currency_code":"USD","quantity":49,"tags":["holiday card","christmas card","old fashioned drink","drink recipe card","holiday drink","merry christmas","hipster christmas","blue","modern christmas","whiskey","drink card"],"category_path":["Paper Goods"],"category_path_ids":[69150367],"materials":["paper","matte card stock"],"shop_section_id":15309182,"featured_rank":null,"state_tsz":1445626531,"url":"https://www.etsy.com/listing/253203354/holiday-drink-recipe-card-old-fashioned?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":139,"num_favorers":19,"shipping_template_id":1314910791,"processing_min":1,"processing_max":1,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1273,"taxonomy_path":["Paper & Party Supplies","Paper","Greeting Cards","Holiday & Seasonal Cards","Christmas Cards"],"used_manufacturer":false,"Images":[{"listing_image_id":925828603,"hex_code":"61524C","red":97,"green":82,"blue":76,"hue":17,"saturation":21,"brightness":38,"is_black_and_white":false,"creation_tsz":1455999292,"listing_id":253203354,"rank":1,"url_75x75":"https://img1.etsystatic.com/122/1/7429508/il_75x75.925828603_5vv7.jpg","url_170x135":"https://img1.etsystatic.com/122/1/7429508/il_170x135.925828603_5vv7.jpg","url_570xN":"https://img1.etsystatic.com/122/1/7429508/il_570xN.925828603_5vv7.jpg","url_fullxfull":"https://img1.etsystatic.com/122/1/7429508/il_fullxfull.925828603_5vv7.jpg","full_height":1000,"full_width":1000},{"listing_image_id":925826879,"hex_code":"353336","red":53,"green":51,"blue":54,"hue":280,"saturation":5,"brightness":21,"is_black_and_white":false,"creation_tsz":1455999124,"listing_id":253203354,"rank":2,"url_75x75":"https://img1.etsystatic.com/140/0/7429508/il_75x75.925826879_4fk3.jpg","url_170x135":"https://img1.etsystatic.com/140/0/7429508/il_170x135.925826879_4fk3.jpg","url_570xN":"https://img1.etsystatic.com/140/0/7429508/il_570xN.925826879_4fk3.jpg","url_fullxfull":"https://img1.etsystatic.com/140/0/7429508/il_fullxfull.925826879_4fk3.jpg","full_height":1000,"full_width":1000}],"Shop":{"shop_id":7429508,"shop_name":"MadeInBV","user_id":26109516,"creation_tsz":1352169743,"title":"Playful hand-painted stationery & gifts","announcement":"**NSS2016 Exhibitor (Booth #1963)**\r\nWe&#39;re a Toronto based paper goods studio. Our products feature playful hand-painted designs. We create greeting cards, postcards, calendars, prints, custom invitations and more.\r\n","currency_code":"USD","is_vacation":false,"vacation_message":"Exciting news: We&#39;ll be exhibiting at the National Stationery Show May 17-20 (Booth #1963)! The shop will reopen on May 21 when we&#39;re back :)","sale_message":"Thanks so much for your purchase! ","digital_sale_message":null,"last_updated_tsz":1460683230,"listing_active_count":94,"digital_listing_count":0,"login_name":"madeinbv","accepts_custom_requests":true,"policy_welcome":"Welcome to &quot;Made in Brockton Village&quot;\r\nBrockton Village is the Toronto neighbourhood where we live and work from our home studio. Our cards, calendars and invitations feature playful and beautiful hand-painted designs. We work with local print companies, most of our products are printed in Offset. Our ECO commitment includes printing on 100% recycled paper, 100% recycled envelopes and the use of compostable eco plastic wrappers (they are made of plants).","policy_payment":"We accept PayPal payments\r\n\r\nWe&#39;re located in Toronto so we have to charge GST/HST on all orders coming from Canada. Depending on the GST/HST rate in your province the amount will be automatically added to your order during checkout.","policy_shipping":"Greeting cards and gift tags are shipped as letters with Canada Post.\r\n\r\nTote bags, prints and calendars are shipped as small packets with Canada Post.\r\n\r\nCANADA: shipping times vary between 2 - 6 business days, depending on which province we are shipping to (rural areas might take longer). We are shipping from Toronto.\r\n\r\nUSA: shipping takes 4 - 10 business days, depending on the state we&#39;re shipping to. We&#39;re shipping from Toronto so delivery to the West coast takes longer.\r\n\r\nINTERNATIONAL: shipping can take up to 3 weeks depending on the country and seasonal rush times.\r\n\r\nIf your order doesn&#39;t arrive within the mentioned times please contact us.\r\n\r\nIf you prefer to have your items shipped with an express or insured option, please send us a note so we can adjust the shipping costs.","policy_refunds":null,"policy_additional":null,"policy_seller_info":"Made in Brockton Village\r\nLansdowne Ave\r\nToronto, ON, M6H3Y2\r\n\r\nmadeinbv@gmail.com\r\n\r\nBusiness no. (GST/HST):  82316 2037 RT0001","policy_updated_tsz":1453939977,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/MadeInBV?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/034/0/7429508/iusb_760x100.12656258_n0e2.jpg","num_favorers":720,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/074/0/7429508/isla_fullxfull.15842250_tmt1bdkv.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":210206901,"state":"active","user_id":55777117,"category_id":69150425,"title":"There&#39;s a chance this is wine/vodka/whiskey - coffee mug","description":"Custom made 11 and 15 oz coffee mugs","creation_tsz":1460683226,"ending_tsz":1471224026,"original_creation_tsz":1415410541,"last_modified_tsz":1460683226,"price":"10.00","currency_code":"USD","quantity":15,"tags":["whiskey","vodka","coffee wine","funny mugs"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":[],"shop_section_id":16585352,"featured_rank":null,"state_tsz":1450058933,"url":"https://www.etsy.com/listing/210206901/theres-a-chance-this-is-winevodkawhiskey?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":105,"num_favorers":4,"shipping_template_id":11652757552,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"20","item_weight_units":null,"item_length":"6","item_width":"3.5","item_height":"5","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1062,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Drinkware","Mugs"],"used_manufacturer":false,"Images":[{"listing_image_id":693365523,"hex_code":"6E6B67","red":110,"green":107,"blue":103,"hue":34,"saturation":6,"brightness":43,"is_black_and_white":false,"creation_tsz":1417547395,"listing_id":210206901,"rank":1,"url_75x75":"https://img1.etsystatic.com/054/0/10232096/il_75x75.693365523_9320.jpg","url_170x135":"https://img1.etsystatic.com/054/0/10232096/il_170x135.693365523_9320.jpg","url_570xN":"https://img1.etsystatic.com/054/0/10232096/il_570xN.693365523_9320.jpg","url_fullxfull":"https://img1.etsystatic.com/054/0/10232096/il_fullxfull.693365523_9320.jpg","full_height":1478,"full_width":1477},{"listing_image_id":705429918,"hex_code":"AC7D6E","red":172,"green":125,"blue":110,"hue":15,"saturation":36,"brightness":67,"is_black_and_white":false,"creation_tsz":1420147876,"listing_id":210206901,"rank":2,"url_75x75":"https://img0.etsystatic.com/060/0/10232096/il_75x75.705429918_s3b2.jpg","url_170x135":"https://img0.etsystatic.com/060/0/10232096/il_170x135.705429918_s3b2.jpg","url_570xN":"https://img0.etsystatic.com/060/0/10232096/il_570xN.705429918_s3b2.jpg","url_fullxfull":"https://img0.etsystatic.com/060/0/10232096/il_fullxfull.705429918_s3b2.jpg","full_height":1494,"full_width":1500},{"listing_image_id":731752687,"hex_code":"79695E","red":121,"green":105,"blue":94,"hue":24,"saturation":22,"brightness":47,"is_black_and_white":false,"creation_tsz":1424641596,"listing_id":210206901,"rank":3,"url_75x75":"https://img1.etsystatic.com/052/0/10232096/il_75x75.731752687_i9pi.jpg","url_170x135":"https://img1.etsystatic.com/052/0/10232096/il_170x135.731752687_i9pi.jpg","url_570xN":"https://img1.etsystatic.com/052/0/10232096/il_570xN.731752687_i9pi.jpg","url_fullxfull":"https://img1.etsystatic.com/052/0/10232096/il_fullxfull.731752687_i9pi.jpg","full_height":1500,"full_width":1500},{"listing_image_id":731752717,"hex_code":"9F9589","red":159,"green":149,"blue":137,"hue":33,"saturation":13,"brightness":62,"is_black_and_white":false,"creation_tsz":1424641596,"listing_id":210206901,"rank":4,"url_75x75":"https://img1.etsystatic.com/051/0/10232096/il_75x75.731752717_2o3t.jpg","url_170x135":"https://img1.etsystatic.com/051/0/10232096/il_170x135.731752717_2o3t.jpg","url_570xN":"https://img1.etsystatic.com/051/0/10232096/il_570xN.731752717_2o3t.jpg","url_fullxfull":"https://img1.etsystatic.com/051/0/10232096/il_fullxfull.731752717_2o3t.jpg","full_height":1500,"full_width":1500},{"listing_image_id":837766423,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1442928360,"listing_id":210206901,"rank":5,"url_75x75":"https://img1.etsystatic.com/101/0/10232096/il_75x75.837766423_8m21.jpg","url_170x135":"https://img1.etsystatic.com/101/0/10232096/il_170x135.837766423_8m21.jpg","url_570xN":"https://img1.etsystatic.com/101/0/10232096/il_570xN.837766423_8m21.jpg","url_fullxfull":"https://img1.etsystatic.com/101/0/10232096/il_fullxfull.837766423_8m21.jpg","full_height":1500,"full_width":1500}],"Shop":{"shop_id":10232096,"shop_name":"ARStills","user_id":55777117,"creation_tsz":1415399929,"title":null,"announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1460683227,"listing_active_count":136,"digital_listing_count":0,"login_name":"stillsgraphicdesign","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":0,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/ARStills?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":59,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/071/0/10232096/isla_fullxfull.15815060_fzzzkv9g.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":243903485,"state":"active","user_id":25346997,"category_id":68887346,"title":"Gourmet Pecan Praline&#39;s  Mother&#39;s Day Gift Birthday Gift","description":"Southern pecan pralines in an elegant gift box for a special person! In this box you will receive 6 pecan pralines. They are made with the freshest ingredients which include local, Georgia pecans. You choose which flavor of pecan pralines you would like! The choices are, traditional, chocolate, coffee, pumpkin, pumpkin spice latte and whiskey.","creation_tsz":1460683226,"ending_tsz":1471224026,"original_creation_tsz":1439428175,"last_modified_tsz":1460683226,"price":"19.00","currency_code":"USD","quantity":3,"tags":["Chocolate pralines","whiskey pralines","coffee pralines","Christmas gift","New Orleans pralines","praline gift box","Savannah pralines","Charleston pralines","Pumpkin pralines","Pumpkin spice latte","Pecan Pralines","Gourmet","foodie"],"category_path":["Plants and Edibles"],"category_path_ids":[68887346],"materials":["Pecans","brown sugar","cream","butter","corn syrup","whiskey","vanilla","espresso powder","chocolate","love","pumpkin"],"shop_section_id":17262838,"featured_rank":null,"state_tsz":1439428175,"url":"https://www.etsy.com/listing/243903485/gourmet-pecan-pralines-mothers-day-gift?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":34,"num_favorers":4,"shipping_template_id":12814905278,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"16","item_weight_units":null,"item_length":"13","item_width":"12","item_height":"3","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":["Traditional"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":944,"taxonomy_path":["Home & Living","Food & Drink","Candy","Fudge"],"used_manufacturer":false,"Images":[{"listing_image_id":816410457,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1439428177,"listing_id":243903485,"rank":1,"url_75x75":"https://img1.etsystatic.com/073/0/10922570/il_75x75.816410457_7ewg.jpg","url_170x135":"https://img1.etsystatic.com/073/0/10922570/il_170x135.816410457_7ewg.jpg","url_570xN":"https://img1.etsystatic.com/073/0/10922570/il_570xN.816410457_7ewg.jpg","url_fullxfull":"https://img1.etsystatic.com/073/0/10922570/il_fullxfull.816410457_7ewg.jpg","full_height":1112,"full_width":1500},{"listing_image_id":816632262,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1439428177,"listing_id":243903485,"rank":2,"url_75x75":"https://img0.etsystatic.com/072/0/10922570/il_75x75.816632262_4wff.jpg","url_170x135":"https://img0.etsystatic.com/072/0/10922570/il_170x135.816632262_4wff.jpg","url_570xN":"https://img0.etsystatic.com/072/0/10922570/il_570xN.816632262_4wff.jpg","url_fullxfull":"https://img0.etsystatic.com/072/0/10922570/il_fullxfull.816632262_4wff.jpg","full_height":1500,"full_width":1185},{"listing_image_id":816639498,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1439428177,"listing_id":243903485,"rank":3,"url_75x75":"https://img0.etsystatic.com/074/0/10922570/il_75x75.816639498_8wui.jpg","url_170x135":"https://img0.etsystatic.com/074/0/10922570/il_170x135.816639498_8wui.jpg","url_570xN":"https://img0.etsystatic.com/074/0/10922570/il_570xN.816639498_8wui.jpg","url_fullxfull":"https://img0.etsystatic.com/074/0/10922570/il_fullxfull.816639498_8wui.jpg","full_height":505,"full_width":1227}],"Shop":{"shop_id":10922570,"shop_name":"PSSweet","user_id":25346997,"creation_tsz":1431380167,"title":"P. S. Sweets","announcement":"Welcome to P. S. Sweets! Don&#39;t forget the treats\r\nAll items are made from scratch in a licensed kitchen. ","currency_code":"USD","is_vacation":false,"vacation_message":"I will be back on Friday, July 3, 2015.","sale_message":"Thank you for your purchase! If you love your purchase please leave a review.","digital_sale_message":null,"last_updated_tsz":1460683226,"listing_active_count":89,"digital_listing_count":0,"login_name":"gretchennorman","accepts_custom_requests":true,"policy_welcome":"Welcome to P. S. Sweets! I hope you find the sweet treat you are looking for! If you need any additional help please feel free to contact me.","policy_payment":"SECURE OPTIONS\nEtsy keeps your payment information secure. Sellers don't receive your credit card information.\n- Visa\n- MasterCard\n- American Express\n- Discover\n- PayPal\n- Apple Pay\n- SOFORT Bank Transfer\n- iDEAL\n- Etsy Gift Card","policy_shipping":"PROCESSING TIME\nThe time I need to prepare an order for shipping varies. For details, see individual items.\n\nESTIMATED SHIPPING TIME\nNorth America: 1 - 4 business days\n\nI'll do my best to meet these shipping estimates, but cannot guarantee them. Actual delivery time will depend on the shipping method you choose.\n\nCUSTOMS AND DUTIES FEES\nBuyers are responsible for any customs or duties fees that may apply. Sellers aren't responsible for delays due to customs","policy_refunds":"I DON'T ACCEPT RETURNS, EXCHANGES, OR CANCELLATIONS\nBut please contact me if you have any problems with your order.","policy_additional":"I will only use your shipping and billing address, and contact information\n- To communicate with you about your order\n- To fulfill your order\n- For legal reasons (like paying taxes)\n\nCUSTOM AND PERSONALIZED ORDERS\nI do take custom order for cookies. Please let me know when you need them, how many cookies you need, a description of the cookies (colors, shape, etc.) and a zip code of where it is shipping to. I need the zip code for an accurate shipping quote. All of my cookies are sealed in a cello bag. If you do not want a cello bag please let me know. I also offer a select variety of bow colors for favors. If you have a large rush order, anything over 35 cookies, there will be a rush order fee of at least $10.  I need at least 5 days notice on large orders.","policy_seller_info":"","policy_updated_tsz":1458526966,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/PSSweet?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/135/0/10922570/iusb_760x100.17551429_2r0x.jpg","num_favorers":109,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/126/0/10922570/isla_fullxfull.16980290_faiqsrro.jpg","is_using_structured_policies":true,"has_onboarded_structured_policies":true,"has_unstructured_policies":true}},{"listing_id":168207930,"state":"active","user_id":32660934,"category_id":68887494,"title":"Set of 4 Glass Flask Gift for Men, Groomsmen Whiskey Drinkers with Quotes","description":"Unique one of a kind glass whiskey 5-6 oz. flask with antique silver bottle stopper with box (optional). No more stainless steel flask gentlemen, we&#39;ve all seen them and received them, there&#39;s not much surprise anymore. These personalized etched flask are a certain hit. Perfect groomsmen gift, birthday gift for men, man cave gift. \r\n\r\nBottle Size = 6&quot; x 3&quot; x 1&quot; (excluding stopper)\r\nBox Size = 10&quot; x 5.5&quot; x 2.5&quot;\r\n\r\nThese come personalized with or without whiskey quotes, here&#39;s some ideas:\r\n\r\n1) “A drunk man’s words are a sober man’s thoughts.” ~ Steve Fergosi\r\n2) “Work is the curse of the drinking classes.” ~ Oscar Wilde \r\n3) “Reality is an illusion created by a lack of alcohol.” ~ N.F. Simpson \r\n4) “He that drinks fast, pays slow.” ~ Benjamin Franklin \r\n5) “Responsible drinking? Now that’s an oxymoron.” ~ Aaron Howard \r\n6) “I know a lot more old drunks than old doctors.” ~ Joe E. Lewis \r\n7) “Alcoholic friends are as easy to make as Sea Monkeys.” ~ Dry \r\n8) “I’ve never been drunk, but often I’ve been overserved.” ~ George Gobel\r\n\r\nNeed another quantity? Use links below or contact us for custom listing. \r\n\r\nPurchase 1\r\nhttps://www.etsy.com/listing/168220545/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 2\r\nhttps://www.etsy.com/listing/168207772/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 3\r\nhttps://www.etsy.com/listing/168207892/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 4\r\nhttps://www.etsy.com/listing/168207930/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 5\r\nhttps://www.etsy.com/listing/168208044/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 6\r\nhttps://www.etsy.com/listing/168221407/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 7\r\nhttps://www.etsy.com/listing/168221447/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 8\r\nhttps://www.etsy.com/listing/168221473/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 9\r\nhttps://www.etsy.com/listing/168221503/glass-flask-gift-for-men-groomsmen?ref=shop_home_active\r\n\r\nPurchase 10\r\nhttps://www.etsy.com/listing/168221529/glass-flask-gift-for-men-groomsmen?ref=shop_home_active","creation_tsz":1460683183,"ending_tsz":1471223983,"original_creation_tsz":1383738593,"last_modified_tsz":1460683183,"price":"77.99","currency_code":"USD","quantity":974,"tags":["glass flask","groomsmen flask","flask","whiskey flask","unique flask","personalized flask","customized flask","21st birthday gift","man cave","unique gift for men","christmas gift men","whiskey","groomsmen gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass"],"shop_section_id":13518721,"featured_rank":null,"state_tsz":1437403439,"url":"https://www.etsy.com/listing/168207930/set-of-4-glass-flask-gift-for-men?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1435,"num_favorers":61,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":651296947,"hex_code":"6A4A3F","red":106,"green":74,"blue":63,"hue":15,"saturation":40,"brightness":41,"is_black_and_white":false,"creation_tsz":1410248914,"listing_id":168207930,"rank":1,"url_75x75":"https://img1.etsystatic.com/038/0/8057725/il_75x75.651296947_k4hc.jpg","url_170x135":"https://img1.etsystatic.com/038/0/8057725/il_170x135.651296947_k4hc.jpg","url_570xN":"https://img1.etsystatic.com/038/0/8057725/il_570xN.651296947_k4hc.jpg","url_fullxfull":"https://img1.etsystatic.com/038/0/8057725/il_fullxfull.651296947_k4hc.jpg","full_height":600,"full_width":600},{"listing_image_id":651296951,"hex_code":"765752","red":118,"green":87,"blue":82,"hue":8,"saturation":30,"brightness":46,"is_black_and_white":false,"creation_tsz":1410248914,"listing_id":168207930,"rank":2,"url_75x75":"https://img1.etsystatic.com/040/0/8057725/il_75x75.651296951_a033.jpg","url_170x135":"https://img1.etsystatic.com/040/0/8057725/il_170x135.651296951_a033.jpg","url_570xN":"https://img1.etsystatic.com/040/0/8057725/il_570xN.651296951_a033.jpg","url_fullxfull":"https://img1.etsystatic.com/040/0/8057725/il_fullxfull.651296951_a033.jpg","full_height":600,"full_width":600},{"listing_image_id":651181980,"hex_code":"704F4A","red":112,"green":79,"blue":74,"hue":8,"saturation":33,"brightness":43,"is_black_and_white":false,"creation_tsz":1410248914,"listing_id":168207930,"rank":3,"url_75x75":"https://img0.etsystatic.com/035/0/8057725/il_75x75.651181980_q6cs.jpg","url_170x135":"https://img0.etsystatic.com/035/0/8057725/il_170x135.651181980_q6cs.jpg","url_570xN":"https://img0.etsystatic.com/035/0/8057725/il_570xN.651181980_q6cs.jpg","url_fullxfull":"https://img0.etsystatic.com/035/0/8057725/il_fullxfull.651181980_q6cs.jpg","full_height":600,"full_width":600},{"listing_image_id":651181964,"hex_code":"6D605F","red":109,"green":96,"blue":95,"hue":4,"saturation":12,"brightness":42,"is_black_and_white":false,"creation_tsz":1410248914,"listing_id":168207930,"rank":4,"url_75x75":"https://img0.etsystatic.com/027/0/8057725/il_75x75.651181964_oe4k.jpg","url_170x135":"https://img0.etsystatic.com/027/0/8057725/il_170x135.651181964_oe4k.jpg","url_570xN":"https://img0.etsystatic.com/027/0/8057725/il_570xN.651181964_oe4k.jpg","url_fullxfull":"https://img0.etsystatic.com/027/0/8057725/il_fullxfull.651181964_oe4k.jpg","full_height":600,"full_width":600},{"listing_image_id":651181992,"hex_code":"825849","red":130,"green":88,"blue":73,"hue":16,"saturation":43,"brightness":50,"is_black_and_white":false,"creation_tsz":1410248914,"listing_id":168207930,"rank":5,"url_75x75":"https://img0.etsystatic.com/041/0/8057725/il_75x75.651181992_qy9i.jpg","url_170x135":"https://img0.etsystatic.com/041/0/8057725/il_170x135.651181992_qy9i.jpg","url_570xN":"https://img0.etsystatic.com/041/0/8057725/il_570xN.651181992_qy9i.jpg","url_fullxfull":"https://img0.etsystatic.com/041/0/8057725/il_fullxfull.651181992_qy9i.jpg","full_height":600,"full_width":600}],"Shop":{"shop_id":8057725,"shop_name":"TealsPrairie","user_id":32660934,"creation_tsz":1366241465,"title":"Teals Prairie & Co. | Specialty Gift Engravers ","announcement":"You see, all products are personalized with initials, graphics or anything you want. There is no setup or engraving fee. To personalize, at checkout in &quot;Notes to Seller&quot; type instructions and if you&#39;re including a graphic, provide an online link or e-mail it when we contact you. ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Our current production time is 1 week in addition to the listed production time, excluding shipping time. We will return to our regular production schedule Feb. 14, 2016. Thank you!\r\n\r\nSTOP: support@tealsprairieco.zendesk.com\r\n\r\nSTOP: PLEASE CHECK YOUR SHIPPING ADDRESS, IF INCORRECT, PLEASE NOTIFY US IMMEDIATELY. PACKAGES SHIPPED TO  THE WRONG ADDRESS WILL NOT BE REPRODUCED. WE WILL RE-SHIP AT YOUR EXPENSE ONCE THE PACKAGE HAS RETURNED. WE ARE NOT RESPONSIBLE FOR PACKAGES SHIPPED TO THE WRONG ADDRESS.  \r\n\r\nSTOP: WE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED 2 WEEKS FROM ORDER TO DELIVERY. \r\n\r\nPlease email support@tealsprairieco.zendesk.com for after-sales support. Include order # in subject line. But first, here are our top 4 FAQs.\r\n\r\nQUESTION: WHERE IS MY ORDER?\r\n\r\nreply: you see, if you placed an orders and within 36 hours (excluding weekends) you did NOT hear from us by email with proofs to confirm or additional questions, this means we understood your customization request and put the order immediately into production. from order to delivery, we need 7 - 10 business days. tracking numbers are automatically emailed; however some email servers reject these emails, in which case, we apologize for the inconvenience, but kindly ask that you be patient until the 10 business days delivery time has expired before contacting us by email for an update. CHECK YOUR SPAM FOLDER \r\n\r\nNote: 95% of the time orders placed by Thursday are delivered by that following Friday. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\n\r\nQUESTION: MY ORDER ARRIVED BROKE, ENGRAVED WRONG, ETC. WHAT&#39;S NEXT?\r\n\r\nreply: you see, we always and without question replace broken, incorrectly engraved items, free of charge, so please don&#39;t worry. just email us, let us know exactly what needs to be replaced along with a few supporting images (if convenient). typically speaking, lead-time for replacements are the same as the original order. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I FORGOT TO LEAVE PERSONALIZATION DETAILS \r\n\r\nreply: you see, just send those details to the email address above with order # in subject line. we do not ship blank, non-personalized items. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I NEED TO CHANGE MY SHIPPING ADDRESS \r\n\r\nreply: you see, as long as the order hasn&#39;t shipped, we can change the shipping address. simply email the shipping address with order # in subject line. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nWe appreciate your business. \r\n\r\nTeals Prairie & Co.\r\nsupport@tealsprairieco.zendesk.com","digital_sale_message":null,"last_updated_tsz":1460684293,"listing_active_count":2074,"digital_listing_count":0,"login_name":"TealsPrairie","accepts_custom_requests":false,"policy_welcome":"Keep it affordable. ","policy_payment":"Paypal only.\r\n\r\n","policy_shipping":"FOR INTERNATIONAL DELIVERIES, WE ARE NOT RESPONSIBLE FOR DUTIES AND TAXES COLLECTED BY YOUR COUNTRY&#39;S CUSTOM OFFICE. THESE ARE NOT INCLUDED IN YOUR SHIPPING COST. \r\n\r\nWE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED  7 BUSINESS DAYS. ","policy_refunds":"No refunds on customized items; however if you get the item damaged to a point that it cannot be used, we will redo and reship at our cost. If the item is damaged, e.g. scratched, but still can be used, we&#39;ll come up with a reasonable settlement.\r\n\r\n","policy_additional":"Owing to the sudden growth of our international business (thank you Etsy!), the brother in our team has opened a very, very little work shop in Hong Kong. This effort not only moves us closer to some of our suppliers, but also allows us to ship international orders to Australia, Singapore, Japan, etc. including much of Europe, South America... cheaper and faster. \r\n\r\nNorth American customers, mainly USA and Canada, will not be affected by this addition, for you good folks, it&#39;s business as usual: engraved and shipped from Houston, Texas. Yee Haw!\r\n\r\nThis concept looked good on paper, let&#39;s hope it pays off- wish us luck!\r\n\r\nLastly, for items with multiple colors, for example journals, since our suppliers cannot keep accurate stock levels, we may substitute your purchase with the same product in a different stocked color. \r\n  \r\nImportant Notes:\r\n\r\n*Expedited orders, large orders or orders with not stock in the USA will come from our Hong Kong shop. We reserve the right to ship from either shops. \r\n\r\n*Ordering samples before a large order is prudent; however owing to the nature of our business, we cannot guarantee a sample and the final production will look &quot;exactly&quot; alike as we have different machinist and many machines that all engrave / print slightly different. If getting &quot;exact&quot; is critical, please let us know at order so we can find the previous order documents and make sure we use the same machinist to engrave the order. We may request a visual photo of the sample for a final reference.   \r\n","policy_seller_info":"PO Box 1538\r\nFresno, TX 77545\r\n1-800-925-7044","policy_updated_tsz":1455255726,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TealsPrairie?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/030/0/8057725/iusb_760x100.14286491_ae7v.jpg","num_favorers":22229,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/105/0/8057725/isla_fullxfull.18388728_dhqi44v9.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":192440838,"state":"active","user_id":20513122,"category_id":68887494,"title":"3, Personalized Groomsmen Gift, Flasks, Engraved Flask Set, Groomsmen Flasks, 3 Flask Sets","description":"Our listing is for THREE personalized flask sets. See below for a different quantity of flask sets.\n\nFrom groomsmen gifts to birthdays and parties, our personalized flask sets will help you celebrate in style! Designed to carry liquor, our 6 oz. black, powder coated flasks, and shot cups are made of stainless steel. Our state-of-the-art laser engraves the powder coating resulting in a durable, beautiful silver engraving, which shines in any light. \n\nPacked in a sturdy black gift box, each set includes; one flask, four stainless steel cups and one funnel, and any one of the above engraving designs.\n\nSIZE: \nEach flask measures approximately 3-1/2&quot; wide x 4&quot; tall, and each stainless steel shot cup holds 1 ounce of liquor.\n\nPERSONALIZATION:\nThe front side of each flask will be personalized with your choice of an engraving design (see the above photos and pull-down menu). \n\nORDERING: \nSelect the engraving design and cups from the drop-down menus and click the &quot;add to cart&quot; button, specify ALL engraving instructions in the note box under &quot;notes to Engravingpro&quot; on the add to cart page. Include the following information if applicable:\n1) Name;\n2) Title;\n3) Wedding date.\n\nMost orders are ready and shipped within 5 business days after receiving payment. Shipping upgrades are offered at checkout.\n\nThank you for visiting our shop!\n\nIf you would like a different quantity of flask gift sets, contact us via &#39;Etsy conversation&#39;, or select one of the following listings:\n1 Set: https://www.etsy.com/listing/162101530/1\n2 Sets: https://www.etsy.com/listing/170252895/2\n3 Sets: https://www.etsy.com/listing/192440838/3\n4 Sets: https://www.etsy.com/listing/193274969/4\n5 Sets: https://www.etsy.com/listing/187705429/5\n6 Sets: https://www.etsy.com/listing/182221487/6\n7 Sets: https://www.etsy.com/listing/186471594/7\n8 Sets: https://www.etsy.com/listing/178629653/8\n9 Sets: https://www.etsy.com/listing/168882394/9\n10 Sets: https://www.etsy.com/listing/195223721/10\n11 Sets: https://www.etsy.com/listing/222077621/11\n12 Sets: https://www.etsy.com/listing/171932501/12\n13 Sets: https://www.etsy.com/listing/187333943/13\n* * * * * * * * * * * * * * * * * * * \nReview our shop policies here:\nhttp://www.etsy.com/shop/EngravingPro/policy","creation_tsz":1460682942,"ending_tsz":1471223742,"original_creation_tsz":1402346845,"last_modified_tsz":1460682942,"price":"56.85","currency_code":"USD","quantity":1,"tags":["groomsmen gift","engraved flask","flasks","groomsmen gifts","engraved flask set","flask sets","flask gift set","groomsmen flask","groomsmen flasks","groomsman gift","whiskey flask","hip flask","personalized flask"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["stainless steel","powder coating"],"shop_section_id":11306815,"featured_rank":null,"state_tsz":1456436383,"url":"https://www.etsy.com/listing/192440838/3-personalized-groomsmen-gift-flasks?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1488,"num_favorers":109,"shipping_template_id":21661916851,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"48","item_weight_units":null,"item_length":"10","item_width":"8","item_height":"6","item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":"wedding","style":["personalization","Customization"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":672336894,"hex_code":"4F4D4B","red":79,"green":77,"blue":75,"hue":30,"saturation":5,"brightness":30,"is_black_and_white":false,"creation_tsz":1414272095,"listing_id":192440838,"rank":1,"url_75x75":"https://img0.etsystatic.com/052/1/6815820/il_75x75.672336894_4j7b.jpg","url_170x135":"https://img0.etsystatic.com/052/1/6815820/il_170x135.672336894_4j7b.jpg","url_570xN":"https://img0.etsystatic.com/052/1/6815820/il_570xN.672336894_4j7b.jpg","url_fullxfull":"https://img0.etsystatic.com/052/1/6815820/il_fullxfull.672336894_4j7b.jpg","full_height":666,"full_width":1000},{"listing_image_id":672459009,"hex_code":"515051","red":81,"green":80,"blue":81,"hue":300,"saturation":1,"brightness":31,"is_black_and_white":false,"creation_tsz":1414272095,"listing_id":192440838,"rank":2,"url_75x75":"https://img1.etsystatic.com/045/0/6815820/il_75x75.672459009_dy6n.jpg","url_170x135":"https://img1.etsystatic.com/045/0/6815820/il_170x135.672459009_dy6n.jpg","url_570xN":"https://img1.etsystatic.com/045/0/6815820/il_570xN.672459009_dy6n.jpg","url_fullxfull":"https://img1.etsystatic.com/045/0/6815820/il_fullxfull.672459009_dy6n.jpg","full_height":665,"full_width":1000},{"listing_image_id":672458369,"hex_code":"4F4E4F","red":79,"green":78,"blue":79,"hue":300,"saturation":1,"brightness":30,"is_black_and_white":false,"creation_tsz":1414272095,"listing_id":192440838,"rank":3,"url_75x75":"https://img1.etsystatic.com/045/0/6815820/il_75x75.672458369_n51n.jpg","url_170x135":"https://img1.etsystatic.com/045/0/6815820/il_170x135.672458369_n51n.jpg","url_570xN":"https://img1.etsystatic.com/045/0/6815820/il_570xN.672458369_n51n.jpg","url_fullxfull":"https://img1.etsystatic.com/045/0/6815820/il_fullxfull.672458369_n51n.jpg","full_height":665,"full_width":1000},{"listing_image_id":672337152,"hex_code":"545353","red":84,"green":83,"blue":83,"hue":0,"saturation":1,"brightness":32,"is_black_and_white":false,"creation_tsz":1414272095,"listing_id":192440838,"rank":4,"url_75x75":"https://img0.etsystatic.com/045/0/6815820/il_75x75.672337152_2f68.jpg","url_170x135":"https://img0.etsystatic.com/045/0/6815820/il_170x135.672337152_2f68.jpg","url_570xN":"https://img0.etsystatic.com/045/0/6815820/il_570xN.672337152_2f68.jpg","url_fullxfull":"https://img0.etsystatic.com/045/0/6815820/il_fullxfull.672337152_2f68.jpg","full_height":665,"full_width":1000},{"listing_image_id":727444506,"hex_code":"494847","red":73,"green":72,"blue":71,"hue":30,"saturation":2,"brightness":28,"is_black_and_white":false,"creation_tsz":1423934866,"listing_id":192440838,"rank":5,"url_75x75":"https://img0.etsystatic.com/058/0/6815820/il_75x75.727444506_s5ix.jpg","url_170x135":"https://img0.etsystatic.com/058/0/6815820/il_170x135.727444506_s5ix.jpg","url_570xN":"https://img0.etsystatic.com/058/0/6815820/il_570xN.727444506_s5ix.jpg","url_fullxfull":"https://img0.etsystatic.com/058/0/6815820/il_fullxfull.727444506_s5ix.jpg","full_height":666,"full_width":1000}],"Shop":{"shop_id":6815820,"shop_name":"EngravingPro","user_id":20513122,"creation_tsz":1332104083,"title":null,"announcement":"***QUICK Turn-around. Most orders will be processed and shipped within 3 to 5 BUSINESS Days.*** Personalized groomsmen gifts; flasks, flask gift sets, mini baseball bats, and wedding gifts engraved in our shop outside Vancouver, Washington. Come on in and browse and let us know if you have questions, we specialize in custom work and personal service!","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for visiting my Etsy shop, www.etsy.com/shop/engravingpro and for making a purchase! This message confirms your purchase. \r\n\r\nMost orders will be processed, and packages shipped within 5 BUSINESS days, unless mentioned otherwise in our shop banner, listing&#39;s description or your order receipt.\r\n\r\nPackages will be shipped to the name and address that you provided in your Etsy account. Please contact us as soon as possible if this is an issue. \r\n\r\nWe will email you a shipping notification and TRACKING when your package has shipped. \r\n\r\nWe guarantee our engraving 100 percent. If there&#39;s a mistake we made with your order, feel free to contact us via &#39;Etsy conversations&#39;, we will ship you another (corrected) item at our cost! Also, if there is a problem with the product, please contact us as soon as you receive your package. \r\n\r\nUnfortunately, we can not give refunds once we personalized an item for an order. So please make sure all engraving instructions are correct and complete on your order form -if they are not, message us at &#39;Etsy conversation&#39; as as soon as possible. Please note we do not provide proofs for the designs purchased in our shop.\r\n\r\nPackages shipped internationally can take up to 3 or 6 weeks for delivery. If this conflicts with your deadline, please contact us as soon as possible via &#39;Etsy conversation&#39;. \r\n\r\nOur INTERNATIONAL customers will be responsible for all import taxes, duties, VAT and/or handling fees that may be applied on different imported merchandise by your countries. The fees, are collected at the time of customs clearance, and your merchandise/package may be held at your local (Postal Office) or other location until the fees are paid. Please see our shop policies for more information.\r\n\r\nPlease note:\r\n+++The KNIVES we sell have extremely sharp edges. Use caution when opening the knife, and always make sure the blade is fully open before using the knife! Failure to do so may risk serious injury.\r\n\r\n+++Please wash the engraved FLASKS and shot cups (by hand) thoroughly inside and out before using.\r\n\r\n+++Please wash all engraved GLASS thoroughly inside and out before using.\r\n\r\n+++Please be careful opening all packages containing GLASS. Although we pack our glassware with layers of bubble wrap and cardboard, glass may break during shipping!\r\n\r\nWe manage another Etsy Shop, AKLaser\r\n\r\nPlease contact us if your have any questions and/or concerns!\r\n\r\nwww.etsy.com/shop/engravingpro\r\n360.667.0380\r\n\r\nRespectfully,\r\nEngravingpro, LLC","digital_sale_message":null,"last_updated_tsz":1460682963,"listing_active_count":243,"digital_listing_count":0,"login_name":"kellieon1","accepts_custom_requests":false,"policy_welcome":"Welcome to our shop and thank you for visiting! \r\n\r\nIf you have questions, concerns and/or issues please do not hesitate to contact us!!\r\n\r\nOur contact information is via &#39;Etsy conversation&#39; -we check our Etsy messages hourly during normal business hours and every few hours on weekends. We also receive phone calls during normal business hours.","policy_payment":"We accept PayPal and credit card payment in US Dollars. Payment must be made in full and have cleared before the item is shipped.\r\n\r\nWashington State residents will be charged sales tax of 8.4% upon checkout. ","policy_shipping":"Most orders will be processed, and packages shipped within 5 BUSINESS days, unless mentioned otherwise in our shop banner, listing&#39;s description or order form receipt.\r\n\r\nPackages will be shipped to the name and address that you provided in your PAYPAL or Etsy account.\r\n\r\nWe ship through the UNITED STATES POSTAL SERVICE (USPS). In the United States, we ship packages First Class Mail, Priority Mail or Parcel Select (Ground). The following shipping delivery times are estimates: \r\n\r\n***Packages shipped First Class Mail can be expected in 2-5 days;\r\n***Priority Mail (2-3 days or more during holidays);\r\n***Parcel Select (2-9 days). \r\n\r\nMost of our flask sets and all glassware are shipped USPS Priority Mail. All packages of orders purchased from within the U.S. are tracked to their destination.\r\n\r\nIf you require a RUSH ORDER, please message us before you order so we can tailor your needs to the appropriate USPS shipping delivery method. We process rush orders in 1 to 2 days and packages can be expected within 3 or 4 business days. This may include a guaranteed delivery time in the U.S, depending on the shipping upgrade that is purchased. \r\n\r\nAbout INTERNATIONAL ORDERS:\r\nInternational orders are welcome for all of our shop listings! International packages are shipped USPS First Class International or Priority Mail International (if packages weigh over 4 pounds). First Class International packages can take up to 4 weeks for delivery. Packages shipped Priority International can be expected in 6-11 days. Please order early. Contact us via Etsy conversations -if questions. \r\n\r\nPackages shipped internationally can be TRACKED either to the International sorting center in the U.S or to your address.\r\n\r\nInternational customers will be responsible for all fees imposed by their countries. These fees include and are not limited to IMPORT TAXES, VAT and/or handling fees. The fees, may be applied on different imported merchandise by your countries and post offices and are collected at the time of customs clearance. Your merchandise/package may be held at your local (Post Office) or other location, and a notification will be sent to you to pick up your package. Fees will be charged to you when you pick up your package. Our listing&#39;s shipping prices do not include any of the aforementioned fees.\r\n\r\nTo our shop visitors from the UK -please review the following information (in the link provided below) before purchasing our items:\r\nwww.hmrc.gov.uk/customs/post/buying.htm#3\r\n\r\nBelow is a sample of fees charged for four flask sets to the UK:\r\n  £10.32 in VAT;\r\n  £8 Royal Mail international handling fee;\r\n  Total £18.32 plus the cost of the four flask sets.\r\n\r\n(The above was received from a customer of the UK in 2014).\r\n\r\nAll packages will be shipped with the full value (item price) and as merchandise. \r\n \r\nWe will email you a &#39;shipping notification&#39; when your package has shipped. \r\n\r\nWe recycle packaging materials when possible.","policy_refunds":"We guarantee our engraving 100 percent. If there&#39;s an engraving mistake we made with your order, feel free to contact us via &#39;Etsy conversations&#39;, we will ship you another (corrected) item at our expense. Also, if there is a problem with the product, please contact us as soon as you receive your package.  \r\n\r\nWe are very sorry that we can not give refunds for personalized engraved merchandise. \r\n\r\nSometimes our customers will discover an engraving mistake that they made (per engraving instructions on the order form) once the item is received, such as a  misspelled name or incomplete information (unbeknownst to us). We will only correct the engraving mistake at the customer&#39;s expense. So please make sure all engraving instructions are correct and complete on your order form.  \r\n\r\nFurther, we will only read engraving information if it is written in the note box on the order form, and/or the instructions references an e-mail or  &#39;&#39;Etsy conversation&quot;. ","policy_additional":"About CUSTOM DESIGN:\r\nSome of our listings include an option for CUSTOM DESIGN (which can be a design created by the customer or by us). Custom design work begins after purchase of a shop listing. With some &#39;custom design orders&#39; we will send you via &#39;Etsy conversation&#39; one proof of the design (in PDF format) if requested for your review and/or approval before we engrave onto the item. \r\n\r\nWe do not provide PROOFS of personalization for any of the engraving designs listed in our shop.\r\n\r\nPlease make sure when you order that all ENGRAVING INSTRUCTIONS are written in the &#39;note box&#39; on the &#39;add to cart &#39; page, and all names, titles and wedding dates and other information if required are correct, and complete. \r\n\r\nFor most orders we will engrave exactly or close to what is requested on the order form, except for two exceptions, i.e., if the customer requests that &quot;Groomsmen&quot; or &quot;Bestman&quot; be engraved for a flask or knife order, we will engrave &quot;Groomsman&quot; and &quot;Best Man&quot;. Dates will be engraved exactly or close to what is requested, August 14,2015, 14 Aug 2015, August 14th 2015, etc.\r\n\r\nAbout MONOGRAMS:\r\nWe engrave three-letter monograms on the wine glasses:\r\nTypically our three letter monogram for single men and women include the first initial of a person&#39;s first, last and middle name.  \r\n\r\nFor example the three-letter monogram for Amber Lee Otto is AOL.  The last names first initial O is in the center and is also engraved larger than the first and middle name initials.\r\n\r\nAbout INTELLECTUAL PROPERTY:\r\nAll of the ENGRAVED IMAGES on the flasks and the wood products are intellectual property, created by us. All of our shop&#39;s listing PHOTOS and NARRATIVE are Intellectual Property. Copying our images, photos or narrative is intellectual property right infringement. Also, we will not work with logos, graphics and/or artwork that we know come from Etsy Shops, have copyright protection, or are trademarked. \r\n\r\nOur wood products may have variations in the wood grain and/or color than what is depicted in a listings&#39; photograph. The engraving results may vary as well.\r\n\r\nOur flask gift set boxes are are not a shiny black as shown in the photographs.\r\n\r\nOur glass may have slight imperfections in the glass-not always visible to the naked eye, and so engraving results may result in slight irregularities.\r\n\r\n+++The KNIVES we sell have extremely sharp edges. Use caution when opening the knife, and always make sure the blade is fully open before using the knife! Failure to do so may risk serious injury.\r\n\r\n+++Please wash the engraved FLASKS and shot cups (by hand) thoroughly inside and out before using.\r\n\r\n+++Please wash all engraved GLASS thoroughly inside and out before using.\r\n\r\n+++Please be careful opening all packages containing GLASS. Although we pack our glassware with layers of bubble wrap and cardboard, glass may break during shipping.\r\n\r\nWHEN YOU ORDER from Engravingpro, you understand and agree to our shop policies.\r\n\r\nOur studio and wood shop is located at Battle Ground, Washington, 35 minutes north of Portland, Oregon. \r\n\r\nEngravingpro, LLC\r\n20505 NE 221st CIR\r\nBattle Ground, WA 98604\r\n\r\nAgain, please CONTACT us via &#39;Etsy Conversation&#39; -we check for new messages hourly during normal business hours.","policy_seller_info":null,"policy_updated_tsz":1460133910,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/EngravingPro?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/010/0/6815820/iusb_760x100.11113330_5xkv.jpg","num_favorers":2475,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/112/0/6815820/isla_fullxfull.17056182_r157p4zb.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":229222204,"state":"active","user_id":10127804,"category_id":68887494,"title":"Pepperoni Pizza Whiskey Flask Pepperoni and Cheese Pie Trendy Nom Nom Hangry Foodie Gift Stainless Steel 6 oz Liquor Hip Flask LC-1530","description":"Liquid Courage Flasks™ are brand new stainless steel flasks that hold six ounces of your favorite liquor.  These hip flasks fit perfectly in your pocket or purse.  Flasks make awesome gifts for any occasion...or for yourself!  Perfect for bridesmaids, groomsmen, work friends, birthday presents, guys gifts, big/little sorority gifts, stocking stuffers, and much more!\n\nFeel free to give us a shout with any questions (888) 959-2870 M-F 9am - 5pm Central or send us a convo anytime!\n\nDETAILS:\nLiquid Courage Flasks™ are unique handmade creations designed, printed, and applied in Tennessee.  All of the designs/patterns wrap completely around the flask and overlap in the back.  Each design is professionally printed on high quality vinyl and permanently adhered to the flask.  The layout/positioning of the design will vary slightly since each flask is a unique piece, and the colors displayed on your monitor may be slightly different from the actual flask. \n\nFLASK SIZE:\nSix Ounce Flask (6 oz)\nDimensions: 3.75&quot; Length, 1.00&quot; Width, 4.50&quot; Height\n\nCUSTOM FLASKS:\nHave your own image or flask idea? Convo us for custom orders. If you don&#39;t see what you are looking for or have a question...feel free to contact us.\n\nWHOLESALE INQUIRIES:\nLiquid Courage flasks are available in select boutiques throughout multiple countries. If you are interested in carrying our line of flasks in your retail space, please contact us for details.\n\nKEEP SHOPPING:\nhttp://www.etsy.com/shop/LiquidCourage\nhttp://liquidcourageflasks.com\n\nVINETTA MAE:\nBe sure to check out our other Etsy shop, Vinetta Mae! It is a monogram boutique with a full lineup of custom phone cases, canvases, prints, signs, and more! \nhttp://www.etsy.com/shop/VinettaMae\n\nThank you for visiting Liquid Courage!\nTyler & Amy Fisk","creation_tsz":1460682859,"ending_tsz":1471223659,"original_creation_tsz":1428526614,"last_modified_tsz":1460682859,"price":"20.00","currency_code":"USD","quantity":40,"tags":["favor","flask","liquid courage","guys gift","burger","food","funny gift","pizza","pepperoni","pepperoni pizza","gag gift","hangry","nom nom"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["stainless steel flask","vinyl","permanent adhesive"],"shop_section_id":7072960,"featured_rank":null,"state_tsz":1428526614,"url":"https://www.etsy.com/listing/229222204/pepperoni-pizza-whiskey-flask-pepperoni?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":230,"num_favorers":21,"shipping_template_id":4390793852,"processing_min":1,"processing_max":2,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":["Traditional","Rustic"],"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":754466468,"hex_code":"A8735E","red":168,"green":115,"blue":94,"hue":17,"saturation":44,"brightness":65,"is_black_and_white":false,"creation_tsz":1428526614,"listing_id":229222204,"rank":1,"url_75x75":"https://img0.etsystatic.com/055/0/5905696/il_75x75.754466468_t53j.jpg","url_170x135":"https://img0.etsystatic.com/055/0/5905696/il_170x135.754466468_t53j.jpg","url_570xN":"https://img0.etsystatic.com/055/0/5905696/il_570xN.754466468_t53j.jpg","url_fullxfull":"https://img0.etsystatic.com/055/0/5905696/il_fullxfull.754466468_t53j.jpg","full_height":800,"full_width":800},{"listing_image_id":754580949,"hex_code":"A6ACAC","red":166,"green":172,"blue":172,"hue":180,"saturation":3,"brightness":67,"is_black_and_white":false,"creation_tsz":1428526614,"listing_id":229222204,"rank":2,"url_75x75":"https://img1.etsystatic.com/063/0/5905696/il_75x75.754580949_lclo.jpg","url_170x135":"https://img1.etsystatic.com/063/0/5905696/il_170x135.754580949_lclo.jpg","url_570xN":"https://img1.etsystatic.com/063/0/5905696/il_570xN.754580949_lclo.jpg","url_fullxfull":"https://img1.etsystatic.com/063/0/5905696/il_fullxfull.754580949_lclo.jpg","full_height":1500,"full_width":1500}],"Shop":{"shop_id":5905696,"shop_name":"LiquidCourage","user_id":10127804,"creation_tsz":1275331311,"title":"Custom Flasks, Liquor Bottle Labels, & Bottle Openers","announcement":"We are a husband and wife team that left our corporate cubicles and started our business on Etsy in 2010.  We print our flask and liquor bottle label designs on high quality vinyl. Personalize any flask in our shop with your name, initials, or picture. Convo us or call us at (888) 959-2870 with any questions.\n\nBe sure to sign up for our newsletter to stay up to date with our latest designs, discounts, and giveaways!\n\nNEWSLETTER SIGNUP LINK:\nhttp://eepurl.com/FP_fT","currency_code":"USD","is_vacation":false,"vacation_message":"Thank you for visiting Liquid Courage!  We specialize in flasks to match every personality.  All flasks are now available in your choice if 8 oz, 6 oz, or 4 oz sizes for the same low price.  Don&#39;t see what you are looking for, have your own idea or image, or want multiples of certain designs?  Convo us for a custom listing.","sale_message":"Thank you for your purchase from Liquid Courage Flasks!  Be sure to sign up for our newsletter to stay up to date with our latest designs, discounts, and giveaways!\r\n\r\nNEWSLETTER SIGNUP LINK:\r\nhttp://eepurl.com/FP_fT\r\n\r\n-Shipping-\r\nOur items typically ship within 2 business days and have an estimated delivery time of 2-5 business days within the United States.  If you purchased a custom item, a convo will be sent to you shortly to request more information or to approve a mock up.  Please let us know if you have any questions.  \r\n\r\n-International Shipping-\r\nInternational shipments have an estimated delivery time of 6-10 business days from the time of shipment.  Please note that the shipping time may vary due to customs policies in your country.  International customers are responsible for all Destination Duties, Taxes, and Import Charges.\r\n\r\nIf you have any issues with your order at all.  Please be sure to reach out before leaving feedback.  We will do everything within our power to correct the situation.\r\n\r\nThanks!\r\nAmy and Tyler Fisk\r\nLiquid Courage\r\n888-959-2870\r\nsales@liquidcourageflasks.com","digital_sale_message":null,"last_updated_tsz":1460682859,"listing_active_count":617,"digital_listing_count":0,"login_name":"LiquidCourage","accepts_custom_requests":true,"policy_welcome":"Hello and welcome to our shop! My name is Amy, and my husband, Tyler and I are the owners and creators of Liquid Courage. We have been selling online since 2003. Recently, we decided to make the leap from selling items made by others to selling items that we make. We have been goofing around making all sorts of arts, crafts, scrapbooks, and clothing for many years and decided to combine my hobby with my online business experience. \r\n\r\nTyler has an Accounting degree from Tennessee Technological University, and I have a bachelor&#39;s degree in Marketing and an MBA in Accounting from TTU as well.  Upon graduating, we tried &quot;real, grown-up jobs&quot; - Tyler as a general manager at a greenhouse manufacturing company, and I as a staff accountant for a nationwide manufacturing company.  We spent a couple of years working for &quot;the man&quot;...at a desk eight hours a day...fifty weeks a year.\r\n\r\nWe finally decided to follow our dream of becoming entrepreneurs, pursue our passion, and determine our own future with hands on approach. We chose the path less traveled by, and that has made all the difference.\r\n\r\nPlease don&#39;t hesitate to ask if you have any questions or would like a custom item.\r\n\r\n(888) 959-2870 (M-F 9am - 5pm Eastern)\r\nor\r\nConvo us anytime! \r\n\r\nCheers! \r\nTyler and Amy","policy_payment":"SECURE OPTIONS\nEtsy keeps your payment information secure. Sellers don't receive your credit card information.\n- Visa\n- MasterCard\n- American Express\n- Discover\n- PayPal\n- Apple Pay\n- SOFORT Bank Transfer\n- iDEAL\n- Etsy Gift Card","policy_shipping":"PROCESSING TIME\nThe time I need to prepare an order for shipping varies. For details, see individual items.\n\nESTIMATED SHIPPING TIME\nNorth America: 2 - 5 business days\n\nI'll do my best to meet these shipping estimates, but cannot guarantee them. Actual delivery time will depend on the shipping method you choose.\n\nCUSTOMS AND DUTIES FEES\nBuyers are responsible for any customs or duties fees that may apply. Sellers aren't responsible for delays due to customs","policy_refunds":"I GLADLY ACCEPT RETURNS AND EXCHANGES\nJust contact me within: 7 days of delivery\nShip returns back to me within: 14 days of delivery\n\nI DON'T ACCEPT CANCELLATIONS\nBut please contact me if you have any problems with your order.\n\nTHE FOLLOWING ITEMS CAN'T BE RETURNED\nBecause of the nature of these items, unless they arrive damaged or defective, I can't accept returns for:\n- Custom or personalized orders\n\nCONDITIONS OF RETURN\nBuyers are responsible for return shipping costs.\nIf the item is not returned in its original condition, the buyer is responsible for any loss in value.","policy_additional":"I will only use your shipping and billing address, and contact information\n- To communicate with you about your order\n- To fulfill your order\n- For legal reasons (like paying taxes)\n- Email newsletter\n\nHOW MANY BOTTLES AND/OR LABELS DO I GET FOR $25?\nPlease see on the right hand side of the listing, there is a drop down menu called &quot;Label/Bottle Options&quot; with different quantities and pricing. Don&#39;t see a quantity that will work for you? That&#39;s not a problem. Please just contact me, and I will add a custom quantity for you.\n\nWHAT SIZE ARE THE BOTTLES?\nThe 50mL plastic bottles are approximately 4 inches tall.\n\nCAN I CHANGE THE WORDING/COLORS OF THE LABEL DESIGN?\nYes, we can change the wording any way that you would like. Please leave a note to seller at checkout with your preferences, and I will create a mock up for you to proof.\n\nWILL I GET TO SEE A PROOF OF THE DESIGN BEFORE THE LABELS ARE PRINTED?\nYes, we will send you a mock up to proof before the labels are printed and shipped.\n\nHOW DO I SEND YOU THE PERSONALIZATION THAT I WANT?\nAt checkout, please send us a note to seller with your custom preferences.\n\nSHIPPING/TURNAROUND TIME\nWe ship within 2 business days of the approval of the mock up. Shipping takes 2-5 business days. Upgraded/Overnight shipping is available upon request for an additional fee.","policy_seller_info":"","policy_updated_tsz":1372190570,"policy_has_private_receipt_info":false,"vacation_autoreply":"Thank you for visiting Liquid Courage!  We specialize in flasks to match every personality.  All flasks are now available in your choice if 8 oz, 6 oz, or 4 oz sizes for the same low price.  Don&#39;t see what you are looking for, have your own idea or image, or want multiples of certain designs?  Convo us for a custom listing.","url":"https://www.etsy.com/shop/LiquidCourage?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/117/0/5905696/iusb_760x100.18197553_6ty1.jpg","num_favorers":10197,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/135/0/5905696/isla_fullxfull.19708789_3jmxiyzk.jpg","is_using_structured_policies":true,"has_onboarded_structured_policies":true,"has_unstructured_policies":true}},{"listing_id":242736460,"state":"active","user_id":16132772,"category_id":68887494,"title":"Bridesmaid Gift, Personalized Bridal Party Gift, Engraved Hip Flask, Personalized Whiskey Flask, Pocket Size Flask","description":"The perfect sized hip flasks will fit in a small clutch or handbag-a perfect gift for your bridesmaid. Designed to carry liquor, our smaller, 5 oz. black flasks are made of stainless steel. Our state-of-the-art laser engraves the black coating, resulting in a durable, beautiful silver engraving.  \n\nOur listing is  ONE personalized flasks, and the above engraving designs. \n\nFlask Gift Box Sets include a black gift box with engraved flask and a stainless steel funnel only, they do not include a cup.\n\nSPECIFICATIONS:\n3-1/2&quot; wide x 4&quot; tall;\nHolds 6 ounces of liquor;\nFood grade stainless steel;\nSilver stainless steel cup holds 1 ounce of liquor.\n\nSPECIFICATIONS for gift box upgrade\nGift Box is 5-1/2&quot; wide, 6-3/4&quot; tall;\nIncludes flask \nStainless Steel Funnel \n\nPERSONALIZATION:\nWe will laser-engrave the front side of each flask with your personalized information. \n\nORDERING:\nSelect the quantity from the drop-down menu, click the green &#39;add to cart&#39; button, and specify all engraving information in the note box on the add to cart page, including the following information if applicable:\n1) Name;\n2) Title;\n3) Wedding date.\n\nMost orders are ready and shipped within 3 to 5 business days after receiving payment.\n\nINTERNATIONAL ORDERS are WELCOME!\n\nThank you for visiting our shop!\n* * * * * * * * * * * * * * * * * * * * *","creation_tsz":1460682847,"ending_tsz":1471223647,"original_creation_tsz":1438543094,"last_modified_tsz":1460682847,"price":"8.95","currency_code":"USD","quantity":97,"tags":["flask","personalized flask","Engraved Hip Flask","wedding gift","engraved flask","wedding party gift","personalized","bridesmaid gift","engraved flasks","whiskey flask","wedding flasks","bridal party gifts","bridal party gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["food grade stainless steel"],"shop_section_id":11197327,"featured_rank":null,"state_tsz":1457531652,"url":"https://www.etsy.com/listing/242736460/bridesmaid-gift-personalized-bridal?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":9692,"num_favorers":970,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":"wedding","style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":811116907,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1438543095,"listing_id":242736460,"rank":1,"url_75x75":"https://img1.etsystatic.com/074/1/6476377/il_75x75.811116907_sd5d.jpg","url_170x135":"https://img1.etsystatic.com/074/1/6476377/il_170x135.811116907_sd5d.jpg","url_570xN":"https://img1.etsystatic.com/074/1/6476377/il_570xN.811116907_sd5d.jpg","url_fullxfull":"https://img1.etsystatic.com/074/1/6476377/il_fullxfull.811116907_sd5d.jpg","full_height":665,"full_width":1000},{"listing_image_id":813934161,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1439001995,"listing_id":242736460,"rank":2,"url_75x75":"https://img1.etsystatic.com/069/0/6476377/il_75x75.813934161_303r.jpg","url_170x135":"https://img1.etsystatic.com/069/0/6476377/il_170x135.813934161_303r.jpg","url_570xN":"https://img1.etsystatic.com/069/0/6476377/il_570xN.813934161_303r.jpg","url_fullxfull":"https://img1.etsystatic.com/069/0/6476377/il_fullxfull.813934161_303r.jpg","full_height":1224,"full_width":1464},{"listing_image_id":838693821,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1443051601,"listing_id":242736460,"rank":3,"url_75x75":"https://img1.etsystatic.com/102/0/6476377/il_75x75.838693821_mw71.jpg","url_170x135":"https://img1.etsystatic.com/102/0/6476377/il_170x135.838693821_mw71.jpg","url_570xN":"https://img1.etsystatic.com/102/0/6476377/il_570xN.838693821_mw71.jpg","url_fullxfull":"https://img1.etsystatic.com/102/0/6476377/il_fullxfull.838693821_mw71.jpg","full_height":1000,"full_width":1043},{"listing_image_id":907796732,"hex_code":"5B5D5D","red":91,"green":93,"blue":93,"hue":180,"saturation":2,"brightness":36,"is_black_and_white":false,"creation_tsz":1453400154,"listing_id":242736460,"rank":4,"url_75x75":"https://img0.etsystatic.com/107/0/6476377/il_75x75.907796732_935j.jpg","url_170x135":"https://img0.etsystatic.com/107/0/6476377/il_170x135.907796732_935j.jpg","url_570xN":"https://img0.etsystatic.com/107/0/6476377/il_570xN.907796732_935j.jpg","url_fullxfull":"https://img0.etsystatic.com/107/0/6476377/il_fullxfull.907796732_935j.jpg","full_height":534,"full_width":540},{"listing_image_id":954105514,"hex_code":"74406A","red":116,"green":64,"blue":106,"hue":312,"saturation":44,"brightness":45,"is_black_and_white":false,"creation_tsz":1460060603,"listing_id":242736460,"rank":5,"url_75x75":"https://img0.etsystatic.com/138/0/6476377/il_75x75.954105514_9a1q.jpg","url_170x135":"https://img0.etsystatic.com/138/0/6476377/il_170x135.954105514_9a1q.jpg","url_570xN":"https://img0.etsystatic.com/138/0/6476377/il_570xN.954105514_9a1q.jpg","url_fullxfull":"https://img0.etsystatic.com/138/0/6476377/il_fullxfull.954105514_9a1q.jpg","full_height":942,"full_width":1200}],"Shop":{"shop_id":6476377,"shop_name":"AKLaser","user_id":16132772,"creation_tsz":1313467446,"title":"Personalized Flasks","announcement":"**QUICK TURN AROUND TIME & FREE SHOT GLASS with every flask purchased. Most orders will be processed and shipped within 3 to 5  BUSINESS Days***\r\n\r\nWedding flasks, hip flasks, whiskey flasks, personalized in my studio and wood shop near Vancouver, Washington. Come on in and browse and let me know if you have questions, I specialize in personal service! ","currency_code":"USD","is_vacation":false,"vacation_message":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com or visit us at www.etsy.shop/engravingpro\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","sale_message":"Thank you for visiting our Etsy shop, www.etsy.com/shopaklaser and for making a purchase! This e-mail confirms your purchase.\r\n\r\n Most orders will be processed and shipped within 3 to 5 BUSINESS Days***\r\n\r\nThe order invoice includes the ship date (located above your name and address).  We will email you a shipping notification and TRACKING when your package has shipped. \r\n\r\nWe guarantee our custom work 100 percent. If there&#39;s a mistake we made with your order, feel free to contact me via &#39;Etsy conversations&#39;, we will ship you another (corrected) item at our cost!\r\n\r\nPackages shipped INTERNATIONALLY can take up to 3 or 4 weeks for delivery. If this conflicts with your deadline, please contact us as soon as possible via &#39;Etsy conversation&#39;. \r\n\r\nOur  INTERNATIONAL customers will be responsible for all import taxes, duties, VAT and/or handling fees that may be applied on different imported merchandise by your countries. The fees, are collected at the time of customs clearance, and your merchandise/package may be held at your local (Postal Office) or other location until the fees are paid. Please see my shop policies for more information.\r\n\r\nWe recycle packaging materials when possible.\r\n\r\nPlease note:\r\n+++Please wash the engraved FLASKS (by hand) thoroughly inside and out before using.\r\n\r\nPlease contact us if your have any questions and/or concerns!\r\nwww.etsy.com/shop/aklaser, \r\n\r\n360.667.0380\r\n\r\nRespectfully,\r\nKellie\r\nAK Laser","digital_sale_message":null,"last_updated_tsz":1460682847,"listing_active_count":28,"digital_listing_count":0,"login_name":"AKLaser","accepts_custom_requests":false,"policy_welcome":"Welcome to our shop and thank you for visiting! \r\n\r\nIf you have questions, concerns and/or issues please do not hesitate to contact us!!\r\n\r\nOur contact information is via &#39;Etsy conversation&#39; -we check our Etsy messages hourly during normal business hours and every few hours on weekends. We also receive phone calls during normal business hours. ","policy_payment":"We accept PayPal and credit card payment in US Dollars. Payment must be made in full and have cleared before the item is shipped.\r\n\r\nWashington State residents will be charged sales tax of 8.4% upon checkout. ","policy_shipping":"Most orders will be processed, and packages shipped within 5 business days, unless mentioned otherwise in our shop banner, listing&#39;s description or order form receipt.\r\n\r\nPackages will be shipped to the name and address that you provided in your PAYPAL or Etsy account.\r\n\r\nWe ship through the UNITED STATES POSTAL SERVICE (USPS). In the United States, we ship packages First Class Mail, Priority Mail or Parcel Select (Ground). The following shipping delivery times are estimates: \r\n\r\n***Packages shipped First Class Mail can be expected in 2-5 days;\r\n***Priority Mail (2-3 days or more during holidays);\r\n***Parcel Select (2-9 days). \r\n\r\nMost of our flask sets are shipped USPS Parcel Select. All packages of orders purchased from within the U.S. are tracked to their destination. \r\n\r\nIf you require a RUSH ORDER, please message us before you order so we can tailor your needs to the appropriate USPS shipping delivery method. We process rush orders in 1 to 2 days and packages can be expected within 3 or 4 business days. This may include a guaranteed delivery time in the U.S, depending on the shipping upgrade that is purchased. \r\n\r\nINTERNATIONAL ORDERS are welcome for all of our shop listings! International packages are shipped USPS First Class International or Priority Mail International (if packages weigh over 4 pounds). First Class International packages can take up to 4 weeks for delivery. Packages shipped Priority International can be expected in 6-11 days. Please order early. Contact us via Etsy conversations -if questions. \r\n\r\nINTERNATIONAL packages shipped internationally are TRACKED ONLY to the International sorting center in the U.S.\r\n\r\nINTERNATIONAL CUSTOMERS will be responsible for all fees imposed by their countries. These fees include and are not limited to IMPORT TAXES, VAT and/or handling fees. The fees, may be applied on different imported merchandise by your countries and post offices and are collected at the time of customs clearance. Your merchandise/package may be held at your local (Post Office) or other location until the fees are paid. Our listing&#39;s shipping prices do not include any of the aforementioned fees.\r\n\r\nTo our shop visitors from the UK -please review the following information (in the link provided below) before purchasing our items:\r\nwww.hmrc.gov.uk/customs/post/buying.htm#3\r\n\r\nBelow is a sample of fees charged for four flask sets to the UK:\r\n  £10.32 in VAT;\r\n  £8 Royal Mail international handling fee;\r\n  Total £18.32 plus the cost of the four flask sets.\r\n\r\n(The above was received from a customer of the UK in 2014).\r\n\r\nAll packages will be shipped with the full value (item price) and as merchandise.\r\n\r\nWe recycle packaging materials when possible. \r\n \r\nWe will email you when your package has shipped. ","policy_refunds":"We are very sorry that we can not give refunds for personalized engraved merchandise. Still, please message us, we are sometimes willing to work out something!! \r\n\r\nIf there is a mistake with our engraving, or a problem with the merchandise, please contact us via &#39;Etsy conversations&#39; within five days of receiving your package.\r\n\r\nWe will only read engraving information if it is written in the note box on the order form, or if it references an e-mail or  &#39;&#39;Etsy conversation&quot;. ","policy_additional":"Please make sure when you order that all ENGRAVING INSTRUCTIONS are written in the &#39;note box&#39; on the &#39;add to cart &#39; page, and all names, titles and wedding dates and other information if required are correct. \r\n\r\nWe do not provide PROOFS of personalization for any of the engraving designs listed in our shop.\r\n\r\nFor most orders we will engrave exactly or close to what is requested on the order form, except for two exceptions, i.e., if the customer requests that &quot;Groomsmen&quot; or &quot;Bestman&quot; be engraved for a flask or knife order, we will engrave &quot;Groomsman&quot; and &quot;Best Man&quot;. Dates will be engraved exactly or close to what is pictured.\r\n\r\nAll of the ENGRAVED IMAGES on the flasks are intellectual property, created by us. All of our shop&#39;s listing PHOTOS and NARRATIVE are Intellectual Property. Copying our images, photos or narrative is intellectual property right infringement. \r\n\r\n+++Please wash the engraved FLASKS and shot cups (by hand) thoroughly inside and out before using.\r\n\r\nWHEN YOU ORDER from AKLASER, you understand and agree to our shop policies.\r\n\r\nOur studio is located at Battle Ground, Washington, 35 minutes north of Portland, Oregon.\r\n \r\nEngravingpro, LLC\r\n20505 NE 221st CIR\r\n\r\nWe manage another Etsy Shop, Engravingpro.","policy_seller_info":null,"policy_updated_tsz":1460491999,"policy_has_private_receipt_info":false,"vacation_autoreply":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com.\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","url":"https://www.etsy.com/shop/AKLaser?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":430,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":264016067,"state":"active","user_id":16132772,"category_id":68887494,"title":"Bridesmaid Gift, Personalized Bridal Party Gift , Engraved Hip Flask, Personlized Whiskey Flask, Pocket Size Flask","description":"This listing is for ONE or MORE flasks gift sets, personalized with any one of the above engraving designs.\n\nDesigned to carry liquor, our 6 oz. powder coated flasks are made of stainless steel. Our state-of-the-art laser engraves the coating resulting in a beautiful silver engraving, which shines in any light! To make a special gift this listing includes an Engraved Flask, and a Funnel, packaged in a Black Gift Box.\n\nSPECIFICATIONS:\nGift Box is 5-1/2&quot; wide, 6-3/4&quot; tall;\nFlask is 3-1/2&quot; wide x 4&quot; tall;\nHolds 6 ounces of liquor;\nFood grade stainless steel;\nStainless steel funnel.\n\nPERSONALIZATION:\nWe will laser-engrave the front side of each flask with your personalized information. Please see the engraving design/layout from the photos above and/or the drop-down menu.\n\nORDERING:\nSelect the quantity and design from the drop-down menus, click the green &#39;add to cart&#39; button, and specify all engraving information in the note box on the add to cart page, including the following information if applicable:\n1) Name;\n2) Title;\n3) Wedding date.\n\nMost orders are ready and shipped within 3 to 5 business days after receiving payment.\n\nINTERNATIONAL ORDERS are WELCOME!\n\nThank you for visiting our shop!\n* * * * * * * * * * * * * * * * * * * * * *","creation_tsz":1460682847,"ending_tsz":1471223647,"original_creation_tsz":1452884246,"last_modified_tsz":1460682847,"price":"11.95","currency_code":"USD","quantity":80,"tags":["flask","personalized flask","Engraved Hip Flask","wedding gift","engraved flask","wedding party gift","bridesmaid gift","wedding flasks","bridal party gifts","bridal party gift","flask gift set","groomsman gift","groomsmen gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["powder coating","food grade stainless steel"],"shop_section_id":11197327,"featured_rank":null,"state_tsz":1452884247,"url":"https://www.etsy.com/listing/264016067/bridesmaid-gift-personalized-bridal?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":351,"num_favorers":39,"shipping_template_id":1206049516,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1666,"taxonomy_path":["Weddings","Gifts & Mementos","Bridesmaids' Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":904164866,"hex_code":"7D6369","red":125,"green":99,"blue":105,"hue":346,"saturation":20,"brightness":49,"is_black_and_white":false,"creation_tsz":1452884246,"listing_id":264016067,"rank":1,"url_75x75":"https://img0.etsystatic.com/134/0/6476377/il_75x75.904164866_oxw4.jpg","url_170x135":"https://img0.etsystatic.com/134/0/6476377/il_170x135.904164866_oxw4.jpg","url_570xN":"https://img0.etsystatic.com/134/0/6476377/il_570xN.904164866_oxw4.jpg","url_fullxfull":"https://img0.etsystatic.com/134/0/6476377/il_fullxfull.904164866_oxw4.jpg","full_height":897,"full_width":1000},{"listing_image_id":1000647337,"hex_code":"74406A","red":116,"green":64,"blue":106,"hue":312,"saturation":44,"brightness":45,"is_black_and_white":false,"creation_tsz":1460060275,"listing_id":264016067,"rank":2,"url_75x75":"https://img1.etsystatic.com/129/0/6476377/il_75x75.1000647337_9p1k.jpg","url_170x135":"https://img1.etsystatic.com/129/0/6476377/il_170x135.1000647337_9p1k.jpg","url_570xN":"https://img1.etsystatic.com/129/0/6476377/il_570xN.1000647337_9p1k.jpg","url_fullxfull":"https://img1.etsystatic.com/129/0/6476377/il_fullxfull.1000647337_9p1k.jpg","full_height":942,"full_width":1200},{"listing_image_id":903920669,"hex_code":"6E6D6F","red":110,"green":109,"blue":111,"hue":270,"saturation":1,"brightness":43,"is_black_and_white":false,"creation_tsz":1452884247,"listing_id":264016067,"rank":3,"url_75x75":"https://img1.etsystatic.com/115/0/6476377/il_75x75.903920669_tpj2.jpg","url_170x135":"https://img1.etsystatic.com/115/0/6476377/il_170x135.903920669_tpj2.jpg","url_570xN":"https://img1.etsystatic.com/115/0/6476377/il_570xN.903920669_tpj2.jpg","url_fullxfull":"https://img1.etsystatic.com/115/0/6476377/il_fullxfull.903920669_tpj2.jpg","full_height":903,"full_width":900},{"listing_image_id":903921355,"hex_code":"6B6A6C","red":107,"green":106,"blue":108,"hue":270,"saturation":1,"brightness":42,"is_black_and_white":false,"creation_tsz":1452884247,"listing_id":264016067,"rank":4,"url_75x75":"https://img1.etsystatic.com/138/0/6476377/il_75x75.903921355_geiq.jpg","url_170x135":"https://img1.etsystatic.com/138/0/6476377/il_170x135.903921355_geiq.jpg","url_570xN":"https://img1.etsystatic.com/138/0/6476377/il_570xN.903921355_geiq.jpg","url_fullxfull":"https://img1.etsystatic.com/138/0/6476377/il_fullxfull.903921355_geiq.jpg","full_height":889,"full_width":900},{"listing_image_id":904171326,"hex_code":"69686B","red":105,"green":104,"blue":107,"hue":260,"saturation":2,"brightness":41,"is_black_and_white":false,"creation_tsz":1452884247,"listing_id":264016067,"rank":5,"url_75x75":"https://img0.etsystatic.com/124/0/6476377/il_75x75.904171326_2wde.jpg","url_170x135":"https://img0.etsystatic.com/124/0/6476377/il_170x135.904171326_2wde.jpg","url_570xN":"https://img0.etsystatic.com/124/0/6476377/il_570xN.904171326_2wde.jpg","url_fullxfull":"https://img0.etsystatic.com/124/0/6476377/il_fullxfull.904171326_2wde.jpg","full_height":919,"full_width":1000}],"Shop":{"shop_id":6476377,"shop_name":"AKLaser","user_id":16132772,"creation_tsz":1313467446,"title":"Personalized Flasks","announcement":"**QUICK TURN AROUND TIME & FREE SHOT GLASS with every flask purchased. Most orders will be processed and shipped within 3 to 5  BUSINESS Days***\r\n\r\nWedding flasks, hip flasks, whiskey flasks, personalized in my studio and wood shop near Vancouver, Washington. Come on in and browse and let me know if you have questions, I specialize in personal service! ","currency_code":"USD","is_vacation":false,"vacation_message":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com or visit us at www.etsy.shop/engravingpro\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","sale_message":"Thank you for visiting our Etsy shop, www.etsy.com/shopaklaser and for making a purchase! This e-mail confirms your purchase.\r\n\r\n Most orders will be processed and shipped within 3 to 5 BUSINESS Days***\r\n\r\nThe order invoice includes the ship date (located above your name and address).  We will email you a shipping notification and TRACKING when your package has shipped. \r\n\r\nWe guarantee our custom work 100 percent. If there&#39;s a mistake we made with your order, feel free to contact me via &#39;Etsy conversations&#39;, we will ship you another (corrected) item at our cost!\r\n\r\nPackages shipped INTERNATIONALLY can take up to 3 or 4 weeks for delivery. If this conflicts with your deadline, please contact us as soon as possible via &#39;Etsy conversation&#39;. \r\n\r\nOur  INTERNATIONAL customers will be responsible for all import taxes, duties, VAT and/or handling fees that may be applied on different imported merchandise by your countries. The fees, are collected at the time of customs clearance, and your merchandise/package may be held at your local (Postal Office) or other location until the fees are paid. Please see my shop policies for more information.\r\n\r\nWe recycle packaging materials when possible.\r\n\r\nPlease note:\r\n+++Please wash the engraved FLASKS (by hand) thoroughly inside and out before using.\r\n\r\nPlease contact us if your have any questions and/or concerns!\r\nwww.etsy.com/shop/aklaser, \r\n\r\n360.667.0380\r\n\r\nRespectfully,\r\nKellie\r\nAK Laser","digital_sale_message":null,"last_updated_tsz":1460682847,"listing_active_count":28,"digital_listing_count":0,"login_name":"AKLaser","accepts_custom_requests":false,"policy_welcome":"Welcome to our shop and thank you for visiting! \r\n\r\nIf you have questions, concerns and/or issues please do not hesitate to contact us!!\r\n\r\nOur contact information is via &#39;Etsy conversation&#39; -we check our Etsy messages hourly during normal business hours and every few hours on weekends. We also receive phone calls during normal business hours. ","policy_payment":"We accept PayPal and credit card payment in US Dollars. Payment must be made in full and have cleared before the item is shipped.\r\n\r\nWashington State residents will be charged sales tax of 8.4% upon checkout. ","policy_shipping":"Most orders will be processed, and packages shipped within 5 business days, unless mentioned otherwise in our shop banner, listing&#39;s description or order form receipt.\r\n\r\nPackages will be shipped to the name and address that you provided in your PAYPAL or Etsy account.\r\n\r\nWe ship through the UNITED STATES POSTAL SERVICE (USPS). In the United States, we ship packages First Class Mail, Priority Mail or Parcel Select (Ground). The following shipping delivery times are estimates: \r\n\r\n***Packages shipped First Class Mail can be expected in 2-5 days;\r\n***Priority Mail (2-3 days or more during holidays);\r\n***Parcel Select (2-9 days). \r\n\r\nMost of our flask sets are shipped USPS Parcel Select. All packages of orders purchased from within the U.S. are tracked to their destination. \r\n\r\nIf you require a RUSH ORDER, please message us before you order so we can tailor your needs to the appropriate USPS shipping delivery method. We process rush orders in 1 to 2 days and packages can be expected within 3 or 4 business days. This may include a guaranteed delivery time in the U.S, depending on the shipping upgrade that is purchased. \r\n\r\nINTERNATIONAL ORDERS are welcome for all of our shop listings! International packages are shipped USPS First Class International or Priority Mail International (if packages weigh over 4 pounds). First Class International packages can take up to 4 weeks for delivery. Packages shipped Priority International can be expected in 6-11 days. Please order early. Contact us via Etsy conversations -if questions. \r\n\r\nINTERNATIONAL packages shipped internationally are TRACKED ONLY to the International sorting center in the U.S.\r\n\r\nINTERNATIONAL CUSTOMERS will be responsible for all fees imposed by their countries. These fees include and are not limited to IMPORT TAXES, VAT and/or handling fees. The fees, may be applied on different imported merchandise by your countries and post offices and are collected at the time of customs clearance. Your merchandise/package may be held at your local (Post Office) or other location until the fees are paid. Our listing&#39;s shipping prices do not include any of the aforementioned fees.\r\n\r\nTo our shop visitors from the UK -please review the following information (in the link provided below) before purchasing our items:\r\nwww.hmrc.gov.uk/customs/post/buying.htm#3\r\n\r\nBelow is a sample of fees charged for four flask sets to the UK:\r\n  £10.32 in VAT;\r\n  £8 Royal Mail international handling fee;\r\n  Total £18.32 plus the cost of the four flask sets.\r\n\r\n(The above was received from a customer of the UK in 2014).\r\n\r\nAll packages will be shipped with the full value (item price) and as merchandise.\r\n\r\nWe recycle packaging materials when possible. \r\n \r\nWe will email you when your package has shipped. ","policy_refunds":"We are very sorry that we can not give refunds for personalized engraved merchandise. Still, please message us, we are sometimes willing to work out something!! \r\n\r\nIf there is a mistake with our engraving, or a problem with the merchandise, please contact us via &#39;Etsy conversations&#39; within five days of receiving your package.\r\n\r\nWe will only read engraving information if it is written in the note box on the order form, or if it references an e-mail or  &#39;&#39;Etsy conversation&quot;. ","policy_additional":"Please make sure when you order that all ENGRAVING INSTRUCTIONS are written in the &#39;note box&#39; on the &#39;add to cart &#39; page, and all names, titles and wedding dates and other information if required are correct. \r\n\r\nWe do not provide PROOFS of personalization for any of the engraving designs listed in our shop.\r\n\r\nFor most orders we will engrave exactly or close to what is requested on the order form, except for two exceptions, i.e., if the customer requests that &quot;Groomsmen&quot; or &quot;Bestman&quot; be engraved for a flask or knife order, we will engrave &quot;Groomsman&quot; and &quot;Best Man&quot;. Dates will be engraved exactly or close to what is pictured.\r\n\r\nAll of the ENGRAVED IMAGES on the flasks are intellectual property, created by us. All of our shop&#39;s listing PHOTOS and NARRATIVE are Intellectual Property. Copying our images, photos or narrative is intellectual property right infringement. \r\n\r\n+++Please wash the engraved FLASKS and shot cups (by hand) thoroughly inside and out before using.\r\n\r\nWHEN YOU ORDER from AKLASER, you understand and agree to our shop policies.\r\n\r\nOur studio is located at Battle Ground, Washington, 35 minutes north of Portland, Oregon.\r\n \r\nEngravingpro, LLC\r\n20505 NE 221st CIR\r\n\r\nWe manage another Etsy Shop, Engravingpro.","policy_seller_info":null,"policy_updated_tsz":1460491999,"policy_has_private_receipt_info":false,"vacation_autoreply":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com.\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","url":"https://www.etsy.com/shop/AKLaser?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":430,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":165756195,"state":"active","user_id":32660934,"category_id":68887494,"title":"Personalized Engraved Etched Whiskey Scotch Decanter Bottle Groomsmen, Man Cave, Just Married, Christmas Gift for Him (024559)","description":"This glass whiskey decanter makes the perfect gift for that classic gentlemen in your life. Designed to evoke 1920s charm, this 34 oz. bottle will be cherished for generations. Great groomsmen gift, best man gift, graduation gift, 21st birthday gift. \r\n\r\nWE CAN ENGRAVE ANYTHING ON THIS BOTTLE, NOT JUST INITIALS- NO ADDITIONAL CHARGE OR SETUP FEE REQUIRED. SEE OUR OTHER LISTINGS BELOW FOR IDEAS.\r\n\r\nSize: 3.5&quot; x 3.5&quot; x 9&quot; or 9 cm x 9 cm x 23 cm\r\nHolds: 1 Liter\r\n\r\nhttps://www.etsy.com/listing/165756195/personalized-engraved-etched-whiskey?ref=shop_home_active\r\n\r\nhttps://www.etsy.com/listing/165748342/personalized-engraved-etched-whiskey?ref=shop_home_active\r\n\r\nhttps://www.etsy.com/listing/165757411/personalized-engraved-etched-whiskey?ref=shop_home_active\r\n\r\nhttps://www.etsy.com/listing/165749108/personalized-engraved-etched-whiskey?ref=shop_home_active\r\n\r\nhttps://www.etsy.com/listing/165749210/personalized-engraved-etched-whiskey?ref=shop_home_active","creation_tsz":1460682689,"ending_tsz":1471223489,"original_creation_tsz":1381765140,"last_modified_tsz":1460682689,"price":"29.99","currency_code":"USD","quantity":502,"tags":["whiskey decanter","whiskey bottle","21st birthday gift","gift for him","best man gift","man cave","whiskey glass","wedding gift","groomsmen gift","drinking gift","personalized whiskey","gift for dad","scotch decanter"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass"],"shop_section_id":13510077,"featured_rank":null,"state_tsz":1440533636,"url":"https://www.etsy.com/listing/165756195/personalized-engraved-etched-whiskey?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":22543,"num_favorers":1042,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":"men","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":646028006,"hex_code":"674B49","red":103,"green":75,"blue":73,"hue":4,"saturation":29,"brightness":40,"is_black_and_white":false,"creation_tsz":1409231605,"listing_id":165756195,"rank":1,"url_75x75":"https://img0.etsystatic.com/028/1/8057725/il_75x75.646028006_t4yw.jpg","url_170x135":"https://img0.etsystatic.com/028/1/8057725/il_170x135.646028006_t4yw.jpg","url_570xN":"https://img0.etsystatic.com/028/1/8057725/il_570xN.646028006_t4yw.jpg","url_fullxfull":"https://img0.etsystatic.com/028/1/8057725/il_fullxfull.646028006_t4yw.jpg","full_height":600,"full_width":600},{"listing_image_id":610132544,"hex_code":"6B5757","red":107,"green":87,"blue":87,"hue":0,"saturation":18,"brightness":41,"is_black_and_white":false,"creation_tsz":1401781972,"listing_id":165756195,"rank":2,"url_75x75":"https://img0.etsystatic.com/037/2/8057725/il_75x75.610132544_joqt.jpg","url_170x135":"https://img0.etsystatic.com/037/2/8057725/il_170x135.610132544_joqt.jpg","url_570xN":"https://img0.etsystatic.com/037/2/8057725/il_570xN.610132544_joqt.jpg","url_fullxfull":"https://img0.etsystatic.com/037/2/8057725/il_fullxfull.610132544_joqt.jpg","full_height":600,"full_width":600},{"listing_image_id":610132540,"hex_code":"6A5B5E","red":106,"green":91,"blue":94,"hue":348,"saturation":14,"brightness":41,"is_black_and_white":false,"creation_tsz":1401781972,"listing_id":165756195,"rank":3,"url_75x75":"https://img0.etsystatic.com/035/0/8057725/il_75x75.610132540_6uoq.jpg","url_170x135":"https://img0.etsystatic.com/035/0/8057725/il_170x135.610132540_6uoq.jpg","url_570xN":"https://img0.etsystatic.com/035/0/8057725/il_570xN.610132540_6uoq.jpg","url_fullxfull":"https://img0.etsystatic.com/035/0/8057725/il_fullxfull.610132540_6uoq.jpg","full_height":600,"full_width":600},{"listing_image_id":610243295,"hex_code":"6A595B","red":106,"green":89,"blue":91,"hue":353,"saturation":16,"brightness":41,"is_black_and_white":false,"creation_tsz":1401781972,"listing_id":165756195,"rank":4,"url_75x75":"https://img1.etsystatic.com/032/0/8057725/il_75x75.610243295_9aw4.jpg","url_170x135":"https://img1.etsystatic.com/032/0/8057725/il_170x135.610243295_9aw4.jpg","url_570xN":"https://img1.etsystatic.com/032/0/8057725/il_570xN.610243295_9aw4.jpg","url_fullxfull":"https://img1.etsystatic.com/032/0/8057725/il_fullxfull.610243295_9aw4.jpg","full_height":600,"full_width":600},{"listing_image_id":610243277,"hex_code":"5E4B4A","red":94,"green":75,"blue":74,"hue":3,"saturation":21,"brightness":36,"is_black_and_white":false,"creation_tsz":1401781972,"listing_id":165756195,"rank":5,"url_75x75":"https://img1.etsystatic.com/043/0/8057725/il_75x75.610243277_mga2.jpg","url_170x135":"https://img1.etsystatic.com/043/0/8057725/il_170x135.610243277_mga2.jpg","url_570xN":"https://img1.etsystatic.com/043/0/8057725/il_570xN.610243277_mga2.jpg","url_fullxfull":"https://img1.etsystatic.com/043/0/8057725/il_fullxfull.610243277_mga2.jpg","full_height":600,"full_width":600}],"Shop":{"shop_id":8057725,"shop_name":"TealsPrairie","user_id":32660934,"creation_tsz":1366241465,"title":"Teals Prairie & Co. | Specialty Gift Engravers ","announcement":"You see, all products are personalized with initials, graphics or anything you want. There is no setup or engraving fee. To personalize, at checkout in &quot;Notes to Seller&quot; type instructions and if you&#39;re including a graphic, provide an online link or e-mail it when we contact you. ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Our current production time is 1 week in addition to the listed production time, excluding shipping time. We will return to our regular production schedule Feb. 14, 2016. Thank you!\r\n\r\nSTOP: support@tealsprairieco.zendesk.com\r\n\r\nSTOP: PLEASE CHECK YOUR SHIPPING ADDRESS, IF INCORRECT, PLEASE NOTIFY US IMMEDIATELY. PACKAGES SHIPPED TO  THE WRONG ADDRESS WILL NOT BE REPRODUCED. WE WILL RE-SHIP AT YOUR EXPENSE ONCE THE PACKAGE HAS RETURNED. WE ARE NOT RESPONSIBLE FOR PACKAGES SHIPPED TO THE WRONG ADDRESS.  \r\n\r\nSTOP: WE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED 2 WEEKS FROM ORDER TO DELIVERY. \r\n\r\nPlease email support@tealsprairieco.zendesk.com for after-sales support. Include order # in subject line. But first, here are our top 4 FAQs.\r\n\r\nQUESTION: WHERE IS MY ORDER?\r\n\r\nreply: you see, if you placed an orders and within 36 hours (excluding weekends) you did NOT hear from us by email with proofs to confirm or additional questions, this means we understood your customization request and put the order immediately into production. from order to delivery, we need 7 - 10 business days. tracking numbers are automatically emailed; however some email servers reject these emails, in which case, we apologize for the inconvenience, but kindly ask that you be patient until the 10 business days delivery time has expired before contacting us by email for an update. CHECK YOUR SPAM FOLDER \r\n\r\nNote: 95% of the time orders placed by Thursday are delivered by that following Friday. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\n\r\nQUESTION: MY ORDER ARRIVED BROKE, ENGRAVED WRONG, ETC. WHAT&#39;S NEXT?\r\n\r\nreply: you see, we always and without question replace broken, incorrectly engraved items, free of charge, so please don&#39;t worry. just email us, let us know exactly what needs to be replaced along with a few supporting images (if convenient). typically speaking, lead-time for replacements are the same as the original order. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I FORGOT TO LEAVE PERSONALIZATION DETAILS \r\n\r\nreply: you see, just send those details to the email address above with order # in subject line. we do not ship blank, non-personalized items. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I NEED TO CHANGE MY SHIPPING ADDRESS \r\n\r\nreply: you see, as long as the order hasn&#39;t shipped, we can change the shipping address. simply email the shipping address with order # in subject line. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nWe appreciate your business. \r\n\r\nTeals Prairie & Co.\r\nsupport@tealsprairieco.zendesk.com","digital_sale_message":null,"last_updated_tsz":1460684293,"listing_active_count":2074,"digital_listing_count":0,"login_name":"TealsPrairie","accepts_custom_requests":false,"policy_welcome":"Keep it affordable. ","policy_payment":"Paypal only.\r\n\r\n","policy_shipping":"FOR INTERNATIONAL DELIVERIES, WE ARE NOT RESPONSIBLE FOR DUTIES AND TAXES COLLECTED BY YOUR COUNTRY&#39;S CUSTOM OFFICE. THESE ARE NOT INCLUDED IN YOUR SHIPPING COST. \r\n\r\nWE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED  7 BUSINESS DAYS. ","policy_refunds":"No refunds on customized items; however if you get the item damaged to a point that it cannot be used, we will redo and reship at our cost. If the item is damaged, e.g. scratched, but still can be used, we&#39;ll come up with a reasonable settlement.\r\n\r\n","policy_additional":"Owing to the sudden growth of our international business (thank you Etsy!), the brother in our team has opened a very, very little work shop in Hong Kong. This effort not only moves us closer to some of our suppliers, but also allows us to ship international orders to Australia, Singapore, Japan, etc. including much of Europe, South America... cheaper and faster. \r\n\r\nNorth American customers, mainly USA and Canada, will not be affected by this addition, for you good folks, it&#39;s business as usual: engraved and shipped from Houston, Texas. Yee Haw!\r\n\r\nThis concept looked good on paper, let&#39;s hope it pays off- wish us luck!\r\n\r\nLastly, for items with multiple colors, for example journals, since our suppliers cannot keep accurate stock levels, we may substitute your purchase with the same product in a different stocked color. \r\n  \r\nImportant Notes:\r\n\r\n*Expedited orders, large orders or orders with not stock in the USA will come from our Hong Kong shop. We reserve the right to ship from either shops. \r\n\r\n*Ordering samples before a large order is prudent; however owing to the nature of our business, we cannot guarantee a sample and the final production will look &quot;exactly&quot; alike as we have different machinist and many machines that all engrave / print slightly different. If getting &quot;exact&quot; is critical, please let us know at order so we can find the previous order documents and make sure we use the same machinist to engrave the order. We may request a visual photo of the sample for a final reference.   \r\n","policy_seller_info":"PO Box 1538\r\nFresno, TX 77545\r\n1-800-925-7044","policy_updated_tsz":1455255726,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TealsPrairie?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/030/0/8057725/iusb_760x100.14286491_ae7v.jpg","num_favorers":22229,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/105/0/8057725/isla_fullxfull.18388728_dhqi44v9.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":265347269,"state":"active","user_id":27746457,"category_id":69150425,"title":"Sioux Inspired Whiskey Glass","description":"Brand new etched glass! \nEtched into the glass so it is dish washer safe and ready to use!\nPerfect for that die hard fan! \n\nCheck out my other shops for other glasses, barware, mugs, and decor! \n\nDue to the custom nature of this product, I am unable to give refunds, exchanges, or returns.","creation_tsz":1460682570,"ending_tsz":1471223370,"original_creation_tsz":1453695690,"last_modified_tsz":1460682570,"price":"12.00","currency_code":"USD","quantity":17,"tags":["pub","wine ","beer","barware","Hockey","Sioux Hockey","Ralph Englestad","Sioux","North Dakota","Fighting Sioux","whiskey","alcohol"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["glass"],"shop_section_id":18564050,"featured_rank":2,"state_tsz":1460214671,"url":"https://www.etsy.com/listing/265347269/sioux-inspired-whiskey-glass?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":336,"num_favorers":23,"shipping_template_id":21306139616,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1071,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Drinkware","Tumblers & Water Glasses"],"used_manufacturer":false,"Images":[{"listing_image_id":909742913,"hex_code":"715C50","red":113,"green":92,"blue":80,"hue":22,"saturation":29,"brightness":44,"is_black_and_white":false,"creation_tsz":1453695690,"listing_id":265347269,"rank":1,"url_75x75":"https://img1.etsystatic.com/117/0/12293779/il_75x75.909742913_bdcu.jpg","url_170x135":"https://img1.etsystatic.com/117/0/12293779/il_170x135.909742913_bdcu.jpg","url_570xN":"https://img1.etsystatic.com/117/0/12293779/il_570xN.909742913_bdcu.jpg","url_fullxfull":"https://img1.etsystatic.com/117/0/12293779/il_fullxfull.909742913_bdcu.jpg","full_height":1500,"full_width":1125}],"Shop":{"shop_id":12293779,"shop_name":"AnnieAndEllaBoutique","user_id":27746457,"creation_tsz":1451967495,"title":null,"announcement":"While we get back on track with orders, please be patient as we are working as fast as possible. Etsy was busy updating their site which meant we couldn&#39;t access our shop account. We don&#39;t normally work weekends but have been working at a steady pace to keep up with the HUGE amount of orders we have been getting in make sure all orders are shipped as soon as possible.\r\n\r\n\r\nIn the meantime, use the code HANG8 for $10 off your purchase of $25 or more to celebrate UND bringing home their 8th NCAA title! Keep calm and GO SIOUX! ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you SO much for your order here at Annie & Ella Boutique! We really appreciate your business. Please use the code THANKYOU for 10% off your purchase with us again. ","digital_sale_message":null,"last_updated_tsz":1460682570,"listing_active_count":16,"digital_listing_count":0,"login_name":"ncbatham","accepts_custom_requests":true,"policy_welcome":null,"policy_payment":"SECURE OPTIONS\nEtsy keeps your payment information secure. Sellers don't receive your credit card information.\n- Visa\n- MasterCard\n- American Express\n- Discover\n- PayPal\n- Apple Pay\n- SOFORT Bank Transfer\n- iDEAL\n- Etsy Gift Card","policy_shipping":"PROCESSING TIME\nThe time I need to prepare an order for shipping varies. For details, see individual items.\n\nCUSTOMS AND DUTIES FEES\nBuyers are responsible for any customs or duties fees that may apply. Sellers aren't responsible for delays due to customs","policy_refunds":"I DON'T ACCEPT RETURNS, EXCHANGES, OR CANCELLATIONS\nBut please contact me if you have any problems with your order.","policy_additional":"I will only use your shipping and billing address, and contact information\n- To communicate with you about your order\n- To fulfill your order\n- For legal reasons (like paying taxes)","policy_seller_info":"","policy_updated_tsz":1455580580,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/AnnieAndEllaBoutique?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":30,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/110/0/12293779/isla_fullxfull.17656818_2gfb34vi.jpg","is_using_structured_policies":true,"has_onboarded_structured_policies":true,"has_unstructured_policies":true}},{"listing_id":225348545,"state":"active","user_id":24216001,"category_id":68887494,"title":"8 Ounce Swing Top Glass Flask-Wedding Gift, Groomsmen Gift, Bridesmaid Gift, Personalized, Wedding Party Gift, Laser Engraved, Wedding Favor","description":"8 Ounce Glass Flask with Swing Top.  A unique gift for anyone in your wedding party, especially groomsmen.  Each flask is laser engraved for a permanent and beautiful memento from your special day.\n\nTo order:\n\nChoose your design from the drop down menu\n\nIn your cart, in the &quot;Notes to Seller&quot; section, please tell us the following information based on the chosen design:\n\nAnchor (pic 1)\n1.  First Name\n2.  Wedding Role (can also substitute with a person&#39;s nickname)\n3.  Date of Wedding\n\nLabel (pic 2)\n1.  First Name\n2.  Wedding Role (can also substitute with a person&#39;s nickname)\n3.  Date of Wedding\n\nBig Buck (pic 3)\n1.  First Name\n2.  Wedding Role (can also substitute with a person&#39;s nickname)\n3.  Date of Wedding\n\nInitial (pic 4)\n1.  First Name\n2.  Wedding Role (can also substitute with a person&#39;s nickname)\n3.  Date of Wedding\n\nVarsity (pic 5)\n1.  First Name\n2.  Wedding Role (can also substitute with a person&#39;s nickname)\n3.  Date of Wedding\n\n*****All our designs are available for many other occasions.  Please feel free to message us with any questions regarding customization*****\n\nAll Designs are the Intellectual Property of Queen Bee Concepts Copyright 2015","creation_tsz":1460682372,"ending_tsz":1471223172,"original_creation_tsz":1425761303,"last_modified_tsz":1460682555,"price":"13.95","currency_code":"USD","quantity":11,"tags":["Glass Flask","Swing Top Flask","Laser Engraved","Wedding Gift","Groomsmen","Bridesmaids","Personalized","Liquor Bottle","Engraved Bottle","Buck","Deer","Whiskey","Bourbon"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["Swing Top Glass Flask","Laser Engraved","Free Engraving"],"shop_section_id":16817849,"featured_rank":null,"state_tsz":1460669210,"url":"https://www.etsy.com/listing/225348545/8-ounce-swing-top-glass-flask-wedding?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1050,"num_favorers":53,"shipping_template_id":15214997549,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":"32","item_weight_units":null,"item_length":"9","item_width":"4","item_height":"1","item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":"wedding","style":["Traditional","Modern"],"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":751163328,"hex_code":"D1A36C","red":209,"green":163,"blue":108,"hue":33,"saturation":48,"brightness":81,"is_black_and_white":false,"creation_tsz":1427921830,"listing_id":225348545,"rank":1,"url_75x75":"https://img0.etsystatic.com/053/0/7216920/il_75x75.751163328_mmll.jpg","url_170x135":"https://img0.etsystatic.com/053/0/7216920/il_170x135.751163328_mmll.jpg","url_570xN":"https://img0.etsystatic.com/053/0/7216920/il_570xN.751163328_mmll.jpg","url_fullxfull":"https://img0.etsystatic.com/053/0/7216920/il_fullxfull.751163328_mmll.jpg","full_height":971,"full_width":929},{"listing_image_id":751283661,"hex_code":"D1A46F","red":209,"green":164,"blue":111,"hue":32,"saturation":46,"brightness":81,"is_black_and_white":false,"creation_tsz":1427921830,"listing_id":225348545,"rank":2,"url_75x75":"https://img1.etsystatic.com/059/0/7216920/il_75x75.751283661_j9zk.jpg","url_170x135":"https://img1.etsystatic.com/059/0/7216920/il_170x135.751283661_j9zk.jpg","url_570xN":"https://img1.etsystatic.com/059/0/7216920/il_570xN.751283661_j9zk.jpg","url_fullxfull":"https://img1.etsystatic.com/059/0/7216920/il_fullxfull.751283661_j9zk.jpg","full_height":971,"full_width":929},{"listing_image_id":751163364,"hex_code":"D4AB79","red":212,"green":171,"blue":121,"hue":33,"saturation":42,"brightness":83,"is_black_and_white":false,"creation_tsz":1427921830,"listing_id":225348545,"rank":3,"url_75x75":"https://img0.etsystatic.com/055/0/7216920/il_75x75.751163364_bk1e.jpg","url_170x135":"https://img0.etsystatic.com/055/0/7216920/il_170x135.751163364_bk1e.jpg","url_570xN":"https://img0.etsystatic.com/055/0/7216920/il_570xN.751163364_bk1e.jpg","url_fullxfull":"https://img0.etsystatic.com/055/0/7216920/il_fullxfull.751163364_bk1e.jpg","full_height":971,"full_width":929},{"listing_image_id":751283655,"hex_code":"D5AB7A","red":213,"green":171,"blue":122,"hue":32,"saturation":42,"brightness":83,"is_black_and_white":false,"creation_tsz":1427921830,"listing_id":225348545,"rank":4,"url_75x75":"https://img1.etsystatic.com/056/0/7216920/il_75x75.751283655_jrvo.jpg","url_170x135":"https://img1.etsystatic.com/056/0/7216920/il_170x135.751283655_jrvo.jpg","url_570xN":"https://img1.etsystatic.com/056/0/7216920/il_570xN.751283655_jrvo.jpg","url_fullxfull":"https://img1.etsystatic.com/056/0/7216920/il_fullxfull.751283655_jrvo.jpg","full_height":971,"full_width":929},{"listing_image_id":751283665,"hex_code":"D5AC7B","red":213,"green":172,"blue":123,"hue":33,"saturation":42,"brightness":83,"is_black_and_white":false,"creation_tsz":1427921830,"listing_id":225348545,"rank":5,"url_75x75":"https://img1.etsystatic.com/061/0/7216920/il_75x75.751283665_czso.jpg","url_170x135":"https://img1.etsystatic.com/061/0/7216920/il_170x135.751283665_czso.jpg","url_570xN":"https://img1.etsystatic.com/061/0/7216920/il_570xN.751283665_czso.jpg","url_fullxfull":"https://img1.etsystatic.com/061/0/7216920/il_fullxfull.751283665_czso.jpg","full_height":971,"full_width":929}],"Shop":{"shop_id":7216920,"shop_name":"QueenBeeConcepts","user_id":24216001,"creation_tsz":1347366796,"title":"Personalized & Sophisticated Gifts","announcement":"Personalized Wedding Gifts/Favors; Custom Engraved Beer Mugs, Swing Top Glass Flasks, Beer Can Glasses, Wine Glasses; FREE LASER ENGRAVING; Custom Orders Welcomed; Laser Engraved Bamboo Cutting Boards, Bottle Openers, Lighters, Stainless Steel Flasks, Leatherette Portfolios and Business Card Holders.  Personalized Gifts for Bride and Groom, Bridesmaids, Groomsmen, Best Man, Maid of Honor, Matron of Honor, Ushers, Ring Bearers, Mother and Father of the Bride, Mother and Father of the Groom, and many more!","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for purchasing from Queen Bee Concepts.  Your business is greatly appreciated! If you have any questions or comments feel free to contact us.  We will respond to you promptly.\r\n\r\nFollow us on Facebook for Additional Information and Updates on New Designs","digital_sale_message":null,"last_updated_tsz":1460682372,"listing_active_count":37,"digital_listing_count":0,"login_name":"kaciboatwright","accepts_custom_requests":true,"policy_welcome":"Thank you for visiting Queen Bee Concepts.  We offer a beautiful array of personalized and sophisticated gifts for weddings and other occasions.  Weddings are a special time in a couples lives and we want our products to represent that love with a timeless splendor.\r\n\r\n**Follow us on Facebook for additional information on our products, behind the scenes info and news on upcoming designs and products.","policy_payment":"We accept Visa, MasterCard, Discover via Paypal or direct checkout.\r\n\r\n***If you need to cancel your order, you must do it as soon as possible.  A full refund is available for orders as long as we have not begun work on your order.  Due to the customized nature of our orders, once we start on an order no refund will be issued***","policy_shipping":"Upon completion of your order, a USPS shipping confirmation will be provided along with a tracking number.  Insurance is included with our shipping and handling.  1-2 day rush processing is available in our shop with expedited priority mail shipping for an extra $45.\r\n\r\nAt times, due to timing and cost comparison, UPS will be used as an alternate form of shipping.  As with USPS, when we utilize UPS, you will be provided a tracking number at the time your order is ready to ship.\r\n\r\n*Please note: Queen Bee Concepts is not responsible for USPS or UPS delay or damage.\r\n\r\nFor most items we ship USPS Priority Mail.  The time allotted for this particular shipping is 1-3 days from receipt of shipping confirmation (based on information from USPS.com). ","policy_refunds":"Refunds:\r\nAs long as an order has not been completed, a refund is available.  However, if an order has been started or is completed all sales are final and no refunds or exchanges will be made for any reason.\r\n\r\nDamaged Items:\r\nPlease inform us of any damage within 48 hours of receipt of your order.  Claims can be emailed along with a picture of the damage to qualify for our free replacement guarantee.\r\n\r\nSpelling Errors:\r\nRefunds will be given on misspelled items if it is due to our mistake.  To qualify for free replacements please send us a photograph of the personalization and we will mail a new item within 72 hours.","policy_additional":"We welcome custom orders.\r\n\r\nFor any questions regarding our products or designs please send us a message.  We will get back to you in a timely matter.\r\n\r\n***Due to item availability and time needed to complete certain orders, some products such as glasses and mugs, may differ from the picture shown.  However, as always, we will do our very best to substitute with items that match our pictures***","policy_seller_info":"Queen Bee Concepts\r\n1929 Northside Drive East\r\nStatesboro, GA 30458\r\nqueenbeeconcepts@yahoo.com\r\n\r\n***Follow us on Facebook for updates on new designs, behind the scenes information, and much more!***","policy_updated_tsz":1443701494,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/QueenBeeConcepts?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/100/0/7216920/iusb_760x100.16422723_ahgp.jpg","num_favorers":72,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/128/0/7216920/isla_fullxfull.19358294_ocur6jjg.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true,"custom_shops_state":4}},{"listing_id":236014636,"state":"active","user_id":67426023,"category_id":68887494,"title":"Engraved Scotch Glasses Personalized Whiskey Decanter Set Groomsmen Gift Set","description":"## Please include Phone Number (for shipping) in Order Note ##\n\nThis listing is for 1 set whiskey decanter & glasses.\nThe set includs 1 decanter and 2 glasses.\n\n--- Get Discount & Combined Shipping ---\n\nBuy 5 Sets Get 5% off\nhttp://etsy.me/1CSoP7q\n\nBuy 6 Sets Get 6% off\nhttp://etsy.me/1HEEN44\n\nBuy 7 Sets Get 7% off\nhttp://etsy.me/1SxlRr2\n\nBuy 8 Sets Get 8% off\nhttp://etsy.me/1SxlUmJ\n\nBuy 9 Sets Get 9% off\nhttp://etsy.me/1IeZdUI\n\nBuy 10 Sets Get 10% off\nhttp://etsy.me/1RJGfKp\n\nBuy 11 Sets Get 11% off\nhttp://etsy.me/1JswB51\n\nBuy 12 Sets Get 12% off\nhttp://etsy.me/1Dqo1lf\n\nLooking for perfect groomsmen gift? What says more about your good taste than an engraved decanter? Crafted from fine European lead-free glass it makes a classic style statement in your own home, or a distinctive present for groomsmen or just him.\n\nEach decanter & glass is customized to your requirements. Suggested engravings includes names / dates / monogrammed initials / quotes / custom logo patterns. Free of charge for all engravings!\n\nDimensions\nDecanter, 9&quot;H x 3-1/2&quot;W, 32 oz.\nGlass, 3&quot;H x 3&quot;W, 8 oz.\n\nPersonalize instruction\nPlease comment your custom requirements as detailed as possible in the Note to Seller section upon check out. Or send me conversation right after you placing the order. (IMPORTANT! Pls also leave your phone number for shipping.)\n\nHandling & Shipping\nWe need 10-15 business days to process your order\nShipping usually takes 10 days \nWe suggest you placing the order 25-30 days before the event.\n\nThanks for stopping!","creation_tsz":1460682267,"ending_tsz":1471223067,"original_creation_tsz":1433513026,"last_modified_tsz":1460682267,"price":"35.00","currency_code":"USD","quantity":96,"tags":["whiskey decanter","whiskey glass","personalized whiskey","scotch glass","scotch decanter","scotch whiskey","personalized scotch","engraved scotch","groomsmen gift","groomsman gift","groomsmen gift set","personalized gift","groomsmen"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass"],"shop_section_id":17357275,"featured_rank":null,"state_tsz":1449159820,"url":"https://www.etsy.com/listing/236014636/engraved-scotch-glasses-personalized?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":8215,"num_favorers":310,"shipping_template_id":null,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":["Cottage Chic","Country Western"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":801986467,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1436933190,"listing_id":236014636,"rank":1,"url_75x75":"https://img1.etsystatic.com/062/0/11221885/il_75x75.801986467_oqmr.jpg","url_170x135":"https://img1.etsystatic.com/062/0/11221885/il_170x135.801986467_oqmr.jpg","url_570xN":"https://img1.etsystatic.com/062/0/11221885/il_570xN.801986467_oqmr.jpg","url_fullxfull":"https://img1.etsystatic.com/062/0/11221885/il_fullxfull.801986467_oqmr.jpg","full_height":533,"full_width":800},{"listing_image_id":802210978,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1436933190,"listing_id":236014636,"rank":2,"url_75x75":"https://img0.etsystatic.com/062/0/11221885/il_75x75.802210978_feep.jpg","url_170x135":"https://img0.etsystatic.com/062/0/11221885/il_170x135.802210978_feep.jpg","url_570xN":"https://img0.etsystatic.com/062/0/11221885/il_570xN.802210978_feep.jpg","url_fullxfull":"https://img0.etsystatic.com/062/0/11221885/il_fullxfull.802210978_feep.jpg","full_height":533,"full_width":800},{"listing_image_id":801986537,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1436933190,"listing_id":236014636,"rank":3,"url_75x75":"https://img1.etsystatic.com/065/0/11221885/il_75x75.801986537_kxbv.jpg","url_170x135":"https://img1.etsystatic.com/065/0/11221885/il_170x135.801986537_kxbv.jpg","url_570xN":"https://img1.etsystatic.com/065/0/11221885/il_570xN.801986537_kxbv.jpg","url_fullxfull":"https://img1.etsystatic.com/065/0/11221885/il_fullxfull.801986537_kxbv.jpg","full_height":533,"full_width":800},{"listing_image_id":802210872,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1436933190,"listing_id":236014636,"rank":4,"url_75x75":"https://img0.etsystatic.com/065/0/11221885/il_75x75.802210872_b6z6.jpg","url_170x135":"https://img0.etsystatic.com/065/0/11221885/il_170x135.802210872_b6z6.jpg","url_570xN":"https://img0.etsystatic.com/065/0/11221885/il_570xN.802210872_b6z6.jpg","url_fullxfull":"https://img0.etsystatic.com/065/0/11221885/il_fullxfull.802210872_b6z6.jpg","full_height":533,"full_width":800},{"listing_image_id":785026273,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1433945556,"listing_id":236014636,"rank":5,"url_75x75":"https://img1.etsystatic.com/061/0/11221885/il_75x75.785026273_ejae.jpg","url_170x135":"https://img1.etsystatic.com/061/0/11221885/il_170x135.785026273_ejae.jpg","url_570xN":"https://img1.etsystatic.com/061/0/11221885/il_570xN.785026273_ejae.jpg","url_fullxfull":"https://img1.etsystatic.com/061/0/11221885/il_fullxfull.785026273_ejae.jpg","full_height":800,"full_width":1200}],"Shop":{"shop_id":11221885,"shop_name":"AnnaEngraving","user_id":67426023,"creation_tsz":1433513630,"title":"ANNA Engraving Gift","announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"1. PLEASE USE NON-PO BOX ADDRESS \r\n2. PLEASE INCLUDE RECIPIENT&#39;S PHONE NUMBER FOR SHIPPING\r\n\r\nTHANKS!","digital_sale_message":null,"last_updated_tsz":1460683513,"listing_active_count":55,"digital_listing_count":0,"login_name":"AnnaEngraving","accepts_custom_requests":true,"policy_welcome":"We are dedicated to make decent gift for the proper event. We are passionate about materials and textures that we creating on. \r\n\r\nFeel free to share with us if you have any wonderful idea. We are ready to bring your dream into  reality.","policy_payment":"PayPal is the most secure and convenient way to shop online. \r\nAs an international seller from Singapore we only accept payment from PayPal.","policy_shipping":"Order processing:\r\n3-5 business days\r\n\r\nShipping:\r\nUSA/CA/AU/UK (5-10 days)\r\nOther countries (10-15 days)\r\n\r\nWe suggest you placing the order at least 12 days before the event. \r\nWhen not busy we can deliver the order in 10 days.","policy_refunds":"100% satisfaction guaranteed.\r\n\r\nAny broken / faulty / wrong item will be replaced or refunded upon request.","policy_additional":"We are happy to personalize gift for any event. Feel free to contact us for custom / wholesale orders.","policy_seller_info":"We are located in Singapore as a family business. \r\nReach us via annamillerwork@gmail.com","policy_updated_tsz":1446909946,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/AnnaEngraving?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/073/0/11221885/iusb_760x100.15752344_n0pm.jpg","num_favorers":783,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":208448751,"state":"active","user_id":17039438,"category_id":69194689,"title":"Ravens Laser Engraved Tumbler","description":"This is a very heavy gauge Laser Engraved Tumbler, with an original version of The Ravens Bird.","creation_tsz":1460682033,"ending_tsz":1471222833,"original_creation_tsz":1414202920,"last_modified_tsz":1460682033,"price":"15.00","currency_code":"USD","quantity":3,"tags":["Glassware","Drinkware","Tumbler","Old Fashioned","Scotch","Whiskey","Ravens","Baltimore Ravens"],"category_path":["Glass","Glassware","Etched"],"category_path_ids":[69150361,68891932,69194689],"materials":["Glass","Tumbler"],"shop_section_id":10556660,"featured_rank":null,"state_tsz":1439829056,"url":"https://www.etsy.com/listing/208448751/ravens-laser-engraved-tumbler?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":86,"num_favorers":2,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"suggested_taxonomy_id":1054,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware"],"used_manufacturer":false,"Images":[{"listing_image_id":672160025,"hex_code":"666764","red":102,"green":103,"blue":100,"hue":80,"saturation":2,"brightness":40,"is_black_and_white":false,"creation_tsz":1414202920,"listing_id":208448751,"rank":1,"url_75x75":"https://img1.etsystatic.com/049/0/6562906/il_75x75.672160025_48px.jpg","url_170x135":"https://img1.etsystatic.com/049/0/6562906/il_170x135.672160025_48px.jpg","url_570xN":"https://img1.etsystatic.com/049/0/6562906/il_570xN.672160025_48px.jpg","url_fullxfull":"https://img1.etsystatic.com/049/0/6562906/il_fullxfull.672160025_48px.jpg","full_height":1500,"full_width":1424}],"Shop":{"shop_id":6562906,"shop_name":"BEKLaserworks","user_id":17039438,"creation_tsz":1318575897,"title":"BEK Laserworks and Crafts","announcement":"Offering stock & custom laser engraved products, Hand Sewn Items, Jewelry, Ornaments, Wood Craft Items and support services to the craft community.  All proceeds dedicated to the realization of our Daughters dream of becoming a Veterinarian. Thank you for your support. We can also make quantities of our stock or custom items","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"100% Satisfaction guaranteed on all our craft items. Custom items cannot be returned, but you will be supplied with a preview of your project file prior to engraving. Contact us any time with any questions you may have.","digital_sale_message":null,"last_updated_tsz":1460682033,"listing_active_count":19,"digital_listing_count":0,"login_name":"kevinaylward","accepts_custom_requests":true,"policy_welcome":"Enjoy browsing our items offered for sale. Contact us for customization of the items we provide, suggest new items, or inquire as to services we might provide to support your crafting projects!\r\nCall anytime 410-877-5629","policy_payment":"Payment may be made by Pay Pal, Visa, Mastercard, American Express, Discover. Maryland State tax is applied to all sales. Cancellation of order must be done prior to shipment. No cancellation of customized items.","policy_shipping":"Shipping within the continental US only at this time. Cost is actual shipping fee, including insurance and confirmation of delivery charges. ","policy_refunds":"Satisfaction guaranteed! Return unused items within 30 days of sale date for full refund of purchase price. No refund on shipping charges. Returns require prior authorization. No refund of custom items. Damages due to shipping will be the buyers responsibility through insurance claim.","policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":1321215231,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/BEKLaserworks?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/052/0/6562906/iusb_760x100.14449950_dsos.jpg","num_favorers":26,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":237937662,"state":"active","user_id":21027212,"category_id":69150425,"title":"Classico Gold Rim Custom Whiskey Glasses, Set of 4","description":"Some believe that the key to good whiskey is the glass you drink it from, and we completely agree. Give your whiskey the glass it deserves with our custom gold rim whiskey glasses.  Whiskey glasses measure 4” x 3” and can hold 10 ounces of his preferred spirits. Hand washing is recommended to keep these glasses looking like new.\n\n-Made from premium glass with 22 kt gold rim details\n-Glasses are engraved with the monogram of your choice\n-Hand washing is recommended\n-Set of four, each measuring 4&quot; x 3&quot; with a 10 oz capacity\n\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\nWHEN WILL MY PERSONALIZED ITEM SHIP:\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\nAll items are stocked and personalized one at a time in Oklahoma City, OK. After your order is placed, it typically takes 1-2 business days to ship out (3 days during holidays). Depending on where you live, it then typically takes an additional 4-5 days for the item to arrive. (please allow an extra 4-5 days for Alaska, Hawaii, and Puerto Rico)\n\n\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\nHOW TO ORDER PERSONALIZED ITEMS:\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\nA) Please select your item and add it to the cart\nB) Please INCLUDE IN THE CHECKOUT NOTES:\n1) Three Initials for Monogram (Family name initial is typically in the center. For example, John F. Kennedy would be JKF.)\n\n*** Note: The item will be personalized engraved in the font shown. The more text you put the smaller the engraving will have to be to fit the object. Flasks are limited to 2-3 lines, all other items are limited to the personalization areas shown. We will make all efforts to fit your personalization, but please keep it reasonable, no special characters or emoticons please. As a general rule, if it&#39;s not on your keyboard, we cannot print it. Enter your personalization EXACTLY as it should to engraved. We will engrave letters in the same order you list them in. ***\n\nAll artwork, designs, and photos Copyright © HomeWetBar.com","creation_tsz":1460681425,"ending_tsz":1471222225,"original_creation_tsz":1434987252,"last_modified_tsz":1460681425,"price":"59.95","currency_code":"USD","quantity":997,"tags":["whiskey glasses","rocks glasses","rocks glass","whiskey glass","custom glasses","personalized glasses","monogram glasses","anniversary gift","gifts for him","whiskey gift","retirement gift","dof glasses","personalized gift"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["glass"],"shop_section_id":17177437,"featured_rank":null,"state_tsz":1434987252,"url":"https://www.etsy.com/listing/237937662/classico-gold-rim-custom-whiskey-glasses?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":180,"num_favorers":12,"shipping_template_id":12087584207,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"74","item_weight_units":null,"item_length":"12","item_width":"9","item_height":"6","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1863,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Barware"],"used_manufacturer":false,"Images":[{"listing_image_id":790964352,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1434987285,"listing_id":237937662,"rank":1,"url_75x75":"https://img0.etsystatic.com/061/0/11053806/il_75x75.790964352_h8lp.jpg","url_170x135":"https://img0.etsystatic.com/061/0/11053806/il_170x135.790964352_h8lp.jpg","url_570xN":"https://img0.etsystatic.com/061/0/11053806/il_570xN.790964352_h8lp.jpg","url_fullxfull":"https://img0.etsystatic.com/061/0/11053806/il_fullxfull.790964352_h8lp.jpg","full_height":1000,"full_width":1000},{"listing_image_id":854711385,"hex_code":"C7AEAE","red":199,"green":174,"blue":174,"hue":0,"saturation":12,"brightness":78,"is_black_and_white":false,"creation_tsz":1445532191,"listing_id":237937662,"rank":2,"url_75x75":"https://img1.etsystatic.com/113/0/11053806/il_75x75.854711385_4vg0.jpg","url_170x135":"https://img1.etsystatic.com/113/0/11053806/il_170x135.854711385_4vg0.jpg","url_570xN":"https://img1.etsystatic.com/113/0/11053806/il_570xN.854711385_4vg0.jpg","url_fullxfull":"https://img1.etsystatic.com/113/0/11053806/il_fullxfull.854711385_4vg0.jpg","full_height":1000,"full_width":1000}],"Shop":{"shop_id":11053806,"shop_name":"HomeWetBar","user_id":21027212,"creation_tsz":1430170783,"title":"Personalized Gifts for Men + Women and Groomsmen Gifts","announcement":"Home Wet Bar specializes in personalized gifts. We create all of our own designs, and do all of the personalization here in Oklahoma. We specialize in gifts for men, and all kinds of personalized glasses, beer mugs, signs, cutting boards, groomsmen gifts, flasks, decanters, wedding gifts, leather flasks, beer and whiskey items, gifts for dads, Christmas gifts for men, husbands, boyfriends, and custom barware.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you! We will begin processing your order immediately and ship your item within 2-3 business days. \r\n\r\nPlease sign up for our weekly newsletter so we can stay in touch! http://eepurl.com/bu4u-P\r\n\r\nHERE&#39;S WHAT YOU CAN EXPECT:\r\n1) We will start processing your order immediately and it will ship out by the 3rd business day. So if your order is placed Friday afternoon, Saturday, or Sunday your order will ship out Tuesday or Wednesday and we will update the tracking in Etsy the DAY AFTER it ships. \r\n\r\n2) We&#39;re sorry but we cannot accept ANY cancellations, modifications, or changes to orders after they are placed. Here is why: Once your order is submitted, it is immediately printed and sent on it&#39;s way to our workshop for production. Any changes would not only delay your order, they will also delay other customers orders. We cannot make any exceptions to this. We ask that you respect this policy out of courtesy to other customers waiting for their order and our team that&#39;s working hard to process everyone&#39;s gift orders on time. If you&#39;d like to read more about this policy, we have it publicly posted on our policies page here: https://www.etsy.com/shop/HomeWetBar/policy?ref=shopinfo_policies_leftnav\r\n\r\n3) We thank you so much for trusting us with your gift order! As a family owned business we try to put care into everything we do. If you ever need to get a hold of us please contact us through etsy or visit us at www.HomeWetBar.com to see all 2,000+ of our items. Also be sure to read our policies page on etsy if you have any other questions on your order: https://www.etsy.com/shop/HomeWetBar/policy?ref=shopinfo_policies_leftnav\r\n\r\nThank you so much for your order from our family to yours!","digital_sale_message":null,"last_updated_tsz":1460681425,"listing_active_count":647,"digital_listing_count":0,"login_name":"homewetbar","accepts_custom_requests":false,"policy_welcome":"Since 2004 HomeWetBar has specialized in creating unique designs and personalized gifts. We create all of our own designs, and do all of the personalization here in Oklahoma. We specialize in gifts for men, and all kinds of personalized glasses, mugs, signs, cutting boards, groomsmen gifts, flasks, wedding gifts, beer and whiskey items, gifts for dads, and custom barware.\r\n","policy_payment":"Please submit payment through etsy and include your personalization in the order notes. We aim to create your items as quickly as possible, so please make sure all of your information and personalization in the order notes is correct before submitting your order. \r\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\r\nOnce your order is placed the order will print out for our team to create and the processing will begin. As such, we regret that we cannot cancel or modify ANY orders after they have been placed, regardless of the time or date the order was placed. This is due to the highly personalized nature of our products and our detailed multi-step personalization process which begins the moment your order is submitted into our system. Please make sure all information is correct before submitting your order. \r\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\r\nIf you have any questions on personalization or just have some questions for our friendly team, please feel free to call us before you place your order at:\r\n(855) 611-3800 \r\n8am-5pm CST, Monday-Friday","policy_shipping":"Items typically ship within 2 business days (3 days during peak holidays) and transit normally takes 4-5 days via USPS and UPS ground. We ship all items out of Oklahoma City, OK\r\n\r\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\r\nEXAMPLE OF STANDARD TRANSIT TIME: \r\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\r\nYou place your order on Saturday, the first business day is Monday. Your order will typically ship Tuesday (2nd processing day) or Wednesday (3rd processing day) and arrive to you 4-5 business days later on the following (earliest) Monday or Wednesday (latest). During Christmas add 1 more day to this scenario to factor your transit time. Thanks! \r\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::","policy_refunds":"We will gladly replace any damaged items at our expense when reported within 15 days, so rest assured your item will arrive in great shape. However, due to the highly customized nature of the items we sell, regret we cannot accept returns on personalized items.","policy_additional":"Please contact us directly if you are interested in bulk or wholesale orders. We can add your event or company logo to most items.","policy_seller_info":null,"policy_updated_tsz":1460578961,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/HomeWetBar?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/068/0/11053806/iusb_760x100.15370687_9wff.jpg","num_favorers":1881,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/073/0/11053806/isla_fullxfull.15982649_sf8xvb0c.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":165749108,"state":"active","user_id":32660934,"category_id":68887494,"title":"Personalized Engraved Etched Scotch Whiskey Decanter Bottle Groomsmen, Man Cave, Just Married, Christmas Gift for Him (024559)","description":"This glass whiskey decanter makes the perfect gift for that classic gentlemen in your life. Designed to evoke 1920s charm, this 34 oz. bottle will be cherished for generations. Great groomsmen gift, best man gift, graduation gift, 21st birthday gift. \n\nWE CAN ENGRAVE ANYTHING ON THIS BOTTLE, NOT JUST INITIALS- NO ADDITIONAL CHARGE OR SETUP FEE REQUIRED. SEE OUR OTHER LISTINGS BELOW FOR IDEAS.\n\nSize: 3.5&quot; x 3.5&quot; x 9&quot; or 9 cm x 9 cm x 23 cm\nHolds: 1 Liter\n\nhttps://www.etsy.com/listing/165756195/personalized-engraved-etched-whiskey?ref=shop_home_active\n\nhttps://www.etsy.com/listing/165748342/personalized-engraved-etched-whiskey?ref=shop_home_active\n\nhttps://www.etsy.com/listing/165757411/personalized-engraved-etched-whiskey?ref=shop_home_active\n\nhttps://www.etsy.com/listing/165749108/personalized-engraved-etched-whiskey?ref=shop_home_active\n\nhttps://www.etsy.com/listing/165749210/personalized-engraved-etched-whiskey?ref=shop_home_active","creation_tsz":1460681333,"ending_tsz":1471222133,"original_creation_tsz":1381766061,"last_modified_tsz":1460681333,"price":"29.99","currency_code":"USD","quantity":563,"tags":["whiskey decanter","gift for him","man cave","whiskey glass","groomsmen gift","father's day gift","personalized gift","wedding gift","gift for dad","men anniversary","best man gift","scotch decanter","scotch glass"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass"],"shop_section_id":13510077,"featured_rank":null,"state_tsz":1457143134,"url":"https://www.etsy.com/listing/165749108/personalized-engraved-etched-scotch?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":69340,"num_favorers":4083,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":646028746,"hex_code":"674B49","red":103,"green":75,"blue":73,"hue":4,"saturation":29,"brightness":40,"is_black_and_white":false,"creation_tsz":1409231921,"listing_id":165749108,"rank":1,"url_75x75":"https://img0.etsystatic.com/038/1/8057725/il_75x75.646028746_c5nv.jpg","url_170x135":"https://img0.etsystatic.com/038/1/8057725/il_170x135.646028746_c5nv.jpg","url_570xN":"https://img0.etsystatic.com/038/1/8057725/il_570xN.646028746_c5nv.jpg","url_fullxfull":"https://img0.etsystatic.com/038/1/8057725/il_fullxfull.646028746_c5nv.jpg","full_height":600,"full_width":600},{"listing_image_id":610244183,"hex_code":"6A5B5E","red":106,"green":91,"blue":94,"hue":348,"saturation":14,"brightness":41,"is_black_and_white":false,"creation_tsz":1401782342,"listing_id":165749108,"rank":2,"url_75x75":"https://img1.etsystatic.com/036/0/8057725/il_75x75.610244183_gtju.jpg","url_170x135":"https://img1.etsystatic.com/036/0/8057725/il_170x135.610244183_gtju.jpg","url_570xN":"https://img1.etsystatic.com/036/0/8057725/il_570xN.610244183_gtju.jpg","url_fullxfull":"https://img1.etsystatic.com/036/0/8057725/il_fullxfull.610244183_gtju.jpg","full_height":600,"full_width":600},{"listing_image_id":610133430,"hex_code":"6B5757","red":107,"green":87,"blue":87,"hue":0,"saturation":18,"brightness":41,"is_black_and_white":false,"creation_tsz":1401782342,"listing_id":165749108,"rank":3,"url_75x75":"https://img0.etsystatic.com/040/0/8057725/il_75x75.610133430_fo5j.jpg","url_170x135":"https://img0.etsystatic.com/040/0/8057725/il_170x135.610133430_fo5j.jpg","url_570xN":"https://img0.etsystatic.com/040/0/8057725/il_570xN.610133430_fo5j.jpg","url_fullxfull":"https://img0.etsystatic.com/040/0/8057725/il_fullxfull.610133430_fo5j.jpg","full_height":600,"full_width":600},{"listing_image_id":610133428,"hex_code":"6A595B","red":106,"green":89,"blue":91,"hue":353,"saturation":16,"brightness":41,"is_black_and_white":false,"creation_tsz":1401782342,"listing_id":165749108,"rank":4,"url_75x75":"https://img0.etsystatic.com/039/0/8057725/il_75x75.610133428_8y9a.jpg","url_170x135":"https://img0.etsystatic.com/039/0/8057725/il_170x135.610133428_8y9a.jpg","url_570xN":"https://img0.etsystatic.com/039/0/8057725/il_570xN.610133428_8y9a.jpg","url_fullxfull":"https://img0.etsystatic.com/039/0/8057725/il_fullxfull.610133428_8y9a.jpg","full_height":600,"full_width":600},{"listing_image_id":610244185,"hex_code":"5E4B4A","red":94,"green":75,"blue":74,"hue":3,"saturation":21,"brightness":36,"is_black_and_white":false,"creation_tsz":1401782342,"listing_id":165749108,"rank":5,"url_75x75":"https://img1.etsystatic.com/037/0/8057725/il_75x75.610244185_qonn.jpg","url_170x135":"https://img1.etsystatic.com/037/0/8057725/il_170x135.610244185_qonn.jpg","url_570xN":"https://img1.etsystatic.com/037/0/8057725/il_570xN.610244185_qonn.jpg","url_fullxfull":"https://img1.etsystatic.com/037/0/8057725/il_fullxfull.610244185_qonn.jpg","full_height":600,"full_width":600}],"Shop":{"shop_id":8057725,"shop_name":"TealsPrairie","user_id":32660934,"creation_tsz":1366241465,"title":"Teals Prairie & Co. | Specialty Gift Engravers ","announcement":"You see, all products are personalized with initials, graphics or anything you want. There is no setup or engraving fee. To personalize, at checkout in &quot;Notes to Seller&quot; type instructions and if you&#39;re including a graphic, provide an online link or e-mail it when we contact you. ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Our current production time is 1 week in addition to the listed production time, excluding shipping time. We will return to our regular production schedule Feb. 14, 2016. Thank you!\r\n\r\nSTOP: support@tealsprairieco.zendesk.com\r\n\r\nSTOP: PLEASE CHECK YOUR SHIPPING ADDRESS, IF INCORRECT, PLEASE NOTIFY US IMMEDIATELY. PACKAGES SHIPPED TO  THE WRONG ADDRESS WILL NOT BE REPRODUCED. WE WILL RE-SHIP AT YOUR EXPENSE ONCE THE PACKAGE HAS RETURNED. WE ARE NOT RESPONSIBLE FOR PACKAGES SHIPPED TO THE WRONG ADDRESS.  \r\n\r\nSTOP: WE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED 2 WEEKS FROM ORDER TO DELIVERY. \r\n\r\nPlease email support@tealsprairieco.zendesk.com for after-sales support. Include order # in subject line. But first, here are our top 4 FAQs.\r\n\r\nQUESTION: WHERE IS MY ORDER?\r\n\r\nreply: you see, if you placed an orders and within 36 hours (excluding weekends) you did NOT hear from us by email with proofs to confirm or additional questions, this means we understood your customization request and put the order immediately into production. from order to delivery, we need 7 - 10 business days. tracking numbers are automatically emailed; however some email servers reject these emails, in which case, we apologize for the inconvenience, but kindly ask that you be patient until the 10 business days delivery time has expired before contacting us by email for an update. CHECK YOUR SPAM FOLDER \r\n\r\nNote: 95% of the time orders placed by Thursday are delivered by that following Friday. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\n\r\nQUESTION: MY ORDER ARRIVED BROKE, ENGRAVED WRONG, ETC. WHAT&#39;S NEXT?\r\n\r\nreply: you see, we always and without question replace broken, incorrectly engraved items, free of charge, so please don&#39;t worry. just email us, let us know exactly what needs to be replaced along with a few supporting images (if convenient). typically speaking, lead-time for replacements are the same as the original order. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I FORGOT TO LEAVE PERSONALIZATION DETAILS \r\n\r\nreply: you see, just send those details to the email address above with order # in subject line. we do not ship blank, non-personalized items. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I NEED TO CHANGE MY SHIPPING ADDRESS \r\n\r\nreply: you see, as long as the order hasn&#39;t shipped, we can change the shipping address. simply email the shipping address with order # in subject line. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nWe appreciate your business. \r\n\r\nTeals Prairie & Co.\r\nsupport@tealsprairieco.zendesk.com","digital_sale_message":null,"last_updated_tsz":1460684293,"listing_active_count":2074,"digital_listing_count":0,"login_name":"TealsPrairie","accepts_custom_requests":false,"policy_welcome":"Keep it affordable. ","policy_payment":"Paypal only.\r\n\r\n","policy_shipping":"FOR INTERNATIONAL DELIVERIES, WE ARE NOT RESPONSIBLE FOR DUTIES AND TAXES COLLECTED BY YOUR COUNTRY&#39;S CUSTOM OFFICE. THESE ARE NOT INCLUDED IN YOUR SHIPPING COST. \r\n\r\nWE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED  7 BUSINESS DAYS. ","policy_refunds":"No refunds on customized items; however if you get the item damaged to a point that it cannot be used, we will redo and reship at our cost. If the item is damaged, e.g. scratched, but still can be used, we&#39;ll come up with a reasonable settlement.\r\n\r\n","policy_additional":"Owing to the sudden growth of our international business (thank you Etsy!), the brother in our team has opened a very, very little work shop in Hong Kong. This effort not only moves us closer to some of our suppliers, but also allows us to ship international orders to Australia, Singapore, Japan, etc. including much of Europe, South America... cheaper and faster. \r\n\r\nNorth American customers, mainly USA and Canada, will not be affected by this addition, for you good folks, it&#39;s business as usual: engraved and shipped from Houston, Texas. Yee Haw!\r\n\r\nThis concept looked good on paper, let&#39;s hope it pays off- wish us luck!\r\n\r\nLastly, for items with multiple colors, for example journals, since our suppliers cannot keep accurate stock levels, we may substitute your purchase with the same product in a different stocked color. \r\n  \r\nImportant Notes:\r\n\r\n*Expedited orders, large orders or orders with not stock in the USA will come from our Hong Kong shop. We reserve the right to ship from either shops. \r\n\r\n*Ordering samples before a large order is prudent; however owing to the nature of our business, we cannot guarantee a sample and the final production will look &quot;exactly&quot; alike as we have different machinist and many machines that all engrave / print slightly different. If getting &quot;exact&quot; is critical, please let us know at order so we can find the previous order documents and make sure we use the same machinist to engrave the order. We may request a visual photo of the sample for a final reference.   \r\n","policy_seller_info":"PO Box 1538\r\nFresno, TX 77545\r\n1-800-925-7044","policy_updated_tsz":1455255726,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TealsPrairie?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/030/0/8057725/iusb_760x100.14286491_ae7v.jpg","num_favorers":22229,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/105/0/8057725/isla_fullxfull.18388728_dhqi44v9.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":257219175,"state":"active","user_id":38922519,"category_id":68892008,"title":"FREE SHIPPING! 2 Liter Personalized Oak Whiskey Barrel- Personalized Oak Barrel-Personalized Wine Barrels- Oak Keg- Custom Oak Whisky Barrel","description":"Personalized Custom Mini Oak Barrels, perfect for the home bar or professional distillery.  FREE SHIPPING WITHIN THE CONTINENTAL USA! Worldwide Shipping Available! (See Exclusions) American White Oak barrels just like those used in distilleries in smaller sizes to allow you to age spirits to perfection in a fraction of the time! Order blank or personalized. See barrel option info and descriptions on bottom of page. Matching accessories available (see photos).✩Stand, Bung and Spigot are included.✩ \n\n☞TO PERSONALIZE YOUR BARREL, WE NEED THIS INFO☟\n❶ Finish and Hoop Selections  (Select from Drop Down Menu)  \n❷ Personalization: (Please refer to 2nd photo for design info)\n~NAME\n~DISTILLERY\n~CITY/STATE\n~EST. YEAR \n\n✪COPY & PASTE THE ABOVE PERSONALIZATION IN THE NOTE TO SELLER AREA DURING CHECKOUT TO ENSURE WE GET ALL INFO NEEDED. PLEASE BE SURE TO ENTER YOUR PERSONALIZATION EXACTLY AS YOU WANT IT TO BE ENGRAVED! IF YOU WISH TO OMIT A LINE, SIMPLY ENTER &quot;BLANK&quot; FOR THAT LINE. FOR TEMPLATE DESIGN CHANGES, PLEASE CONTACT US PRIOR TO PLACE A CUSTOM ORDER.\n\n❸ CLEANING KITS (OPTIONAL): https://www.etsy.com/listing/169199812/care-and-cleaning-kits-for-your-custom?ref=shop_home_active&ga_search_query=CLEANING\n\n❹ NEED YOUR BARREL IN A HURRY? ADD RUSH OPTIONS:\nWe offer Rush Production and/or Rush Shipping options. Please be sure to see shop banner for production and cutoff times and add one or both options, depending on what you need. Rush shipping can be selected during checkout. Rush production can be added here: https://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=RUSH  Not sure what you will need, please contact us.\n\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\n ☟☟☟☟☟☟☟ ☟☟☟ PRODUCT & OFFER DESCRIPTIONS ☟☟☟☟☟☟☟☟\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\n\n✪BLANK, PERSONALIZED OR CUSTOM- WHAT’S THE DIFFERENCE?\n1) BLANK BARREL: A blank, non-personalized barrel with no design.\n2) PERSONALIZED: The design shown above, with YOUR personalization.\n3) CUSTOM-YOUR DESIGN: You can order a barrel using your own design here: https://www.etsy.com/shop/BootlegBarrels?section_id=14695743&ref=shopsection_leftnav_8 See Art Req!\n4) CUSTOM-WE DESIGN: Contact us PRIOR to ordering. We are capable of creating just about any design you can imagine so just let us know what you are wanting and we’d be happy to provide a quote. Our minimum art fee is $35 for something basic or all text and goes up from there based on intricacy and time estimated to complete your artwork. Requires purchase of custom barrel, art fee and a custom listing since cost will vary based on design desired.\n\n\n✪FINISH AND HOOP OPTIONS:\n-Unfinished/Steel: Unfinished Barrel with Steel Hoops\n-Finished/Steel: Finished barrel with Steel Hoops\n-Unfinished/Black: Unfinished Barrel with Black Hoops\n-Finished/Black: Finished barrel with Black Hoops\nWHAT’S THE DIFFERENCE? Finished barrels will have a few light coats of a clear, water based finish applied to them.  Unfinished barrel will not have this finish applied.  Steel hoops are steel.  Black hoops are steel hoops coated in black.\n\n✪ RUSH PRODUCTION & RUSH SHIPPING OPTIONS: To be fair to all customers, we offer standard and rush options to all customers. Unless rush production has been ordered, all orders are produced in the order in which they are received to be fair to all customers. Upgrading shipping will expedite your shipping. Adding a rush production will place your order into the rush production queue ahead of the line. You can select one or both options based on what you need and one is not required to purchase the other. Requesting rush options in the note to seller area will not expedite your order unless you have added a rush to your order. We had to implement this policy to be fair to all customers since 85% of customers ordering have a specific date in mind that they&#39;d like their order. All current production times, order cutoff dates, etc. are all posted in the shop banner. \n\n✪ BARREL DIMENSIONS:\n1 Liter 6.5 x 4.5 x 4.5 inches\n2 Liter 7.5 x 5 x 5 inches\n3 Liter 8.5 x 5.5 x 5.5 inches\n5 Liter 9.5 x 6.5 x 6.5 inches\n10 Liter 12 x 8 x 8 inches\n20 Liter 15 x 10.5 x 10.5 inches\n*DIMESIONS ABOVE DO NOT INCLUDE STAND HEIGHT AND WIDTH. If needing to fit within a specific space, please contact us and we can provide measurements including the stand. Although it doesn&#39;t seem like there is a great difference in sizes, a 1 liter will hold an entire liter more and so on. Larger barrels also come with larger stands to ensure everything looks proportionate.\n\n✪FREE SHIPPING PROMOTION:\nFree Standard Domestic Shipping within the Continental USA only. Excludes orders shipping to AK, HI, PR or internationally, as shipping is higher to ship to these locations. Excludes all expedited options. We reserve the right to ship the most economical way, (most often USPS 1st class) and therefore cannot guarantee a specific delivery date. If ordering multiple items, we may split your order into multiple shipments to reduce shipping costs. \n\n✪ ENGRAVING INFO:\nEach design will state what lines can be personalized free. Copy and paste personalization lines and enter your personalization in note to seller area. If you selected personalized and did not enter personalization- no worries, you will be contacted to get the needed info prior to shipping your order :) If you ordered a blank barrel, but entered personalization, your barrel will arrive blank-you will only get a personalized barrel if you ordered a personalized barrel. Please be sure to enter all personalization exactly as you want it engraved. Note that some fonts used in certain designs do not always have both upper and lower case characters. In this case all letters will be uppercase regardless of how it is entered since this is all the font allows. Please refer to the images in each listing for reference. \n\n✪ INTERNATIONAL ORDERS:\nWe ship to most destinations worldwide! Please be aware that if we are unable to ship to your location, we will notify you, cancel your order and refund you in full. Shipping calculation errors may occur with international shipping on Etsy that are out of our control and we accept no responsibility for these errors. If ordering multiple items, we reserve the right to ship in multiple packages to reduce shipping costs. We reserve the right to use other carriers other than USPS if it is more cost effective and the lowest shipping shown is always for the most economical shipping option available regardless of what method is stated during checkout. In the event shipping is much higher than shown we will contact you and offer to invoice for the difference or cancel your order. If you decide to cancel, we will issue you a full refund. We want to continue to offer international shipping, so thank you for your understanding.\n\nPlease be sure we have all information needed to create your one of a kind barrel. If we do not receive all necessary information to create your custom barrel, your order will be placed on hold so we can contact you. Please be sure to include all info~ we really want you to love your custom barrel!  \n\n☎ Have Questions or need help creating your customized barrel?  There&#39;s a lot of options, so please feel free to contact us and we will be happy to assist you.\n\nThank you for your business!  We appreciate each and every one of you :)\n\nCSP_5","creation_tsz":1460681234,"ending_tsz":1471222034,"original_creation_tsz":1448132225,"last_modified_tsz":1460681234,"price":"69.95","currency_code":"USD","quantity":10,"tags":["whiskey barrel","custom oak barrel","wedding barrel","personalized barrel","custom whisky barrel","personalized keg","black hoop barrel","custom wine barrel","curing barrel keg","groomsman barrel","steel hoop barrel","whiskey aging barrel","barrel home decor"],"category_path":["Housewares","Home Decor"],"category_path_ids":[69150425,68892008],"materials":["unfinished oak whiskey barrel","finished oak whiskey barrel","black hoop barrel","steel hoop barrel","aging barrel","bootleg barrel","custom oak keg","groomsman gift","personalized wine barrel","age your own spirits","wedding present","custom oak barrel","personalized whiskey barrel"],"shop_section_id":14521027,"featured_rank":null,"state_tsz":1450934163,"url":"https://www.etsy.com/listing/257219175/free-shipping-2-liter-personalized-oak?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":2923,"num_favorers":155,"shipping_template_id":18734801693,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"48","item_weight_units":null,"item_length":"7.5","item_width":"5.5","item_height":"5.5","item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1002,"taxonomy_path":["Home & Living","Home Décor"],"used_manufacturer":false,"Images":[{"listing_image_id":873268306,"hex_code":"C19F82","red":193,"green":159,"blue":130,"hue":28,"saturation":32,"brightness":75,"is_black_and_white":false,"creation_tsz":1448132225,"listing_id":257219175,"rank":1,"url_75x75":"https://img0.etsystatic.com/134/0/8795606/il_75x75.873268306_2nua.jpg","url_170x135":"https://img0.etsystatic.com/134/0/8795606/il_170x135.873268306_2nua.jpg","url_570xN":"https://img0.etsystatic.com/134/0/8795606/il_570xN.873268306_2nua.jpg","url_fullxfull":"https://img0.etsystatic.com/134/0/8795606/il_fullxfull.873268306_2nua.jpg","full_height":1000,"full_width":908},{"listing_image_id":873036585,"hex_code":"969191","red":150,"green":145,"blue":145,"hue":0,"saturation":3,"brightness":58,"is_black_and_white":false,"creation_tsz":1448132225,"listing_id":257219175,"rank":2,"url_75x75":"https://img1.etsystatic.com/113/0/8795606/il_75x75.873036585_xa50.jpg","url_170x135":"https://img1.etsystatic.com/113/0/8795606/il_170x135.873036585_xa50.jpg","url_570xN":"https://img1.etsystatic.com/113/0/8795606/il_570xN.873036585_xa50.jpg","url_fullxfull":"https://img1.etsystatic.com/113/0/8795606/il_fullxfull.873036585_xa50.jpg","full_height":249,"full_width":504},{"listing_image_id":873268360,"hex_code":"CEAB87","red":206,"green":171,"blue":135,"hue":30,"saturation":34,"brightness":80,"is_black_and_white":false,"creation_tsz":1448132225,"listing_id":257219175,"rank":3,"url_75x75":"https://img0.etsystatic.com/121/0/8795606/il_75x75.873268360_kl3g.jpg","url_170x135":"https://img0.etsystatic.com/121/0/8795606/il_170x135.873268360_kl3g.jpg","url_570xN":"https://img0.etsystatic.com/121/0/8795606/il_570xN.873268360_kl3g.jpg","url_fullxfull":"https://img0.etsystatic.com/121/0/8795606/il_fullxfull.873268360_kl3g.jpg","full_height":1500,"full_width":1423},{"listing_image_id":873268506,"hex_code":"B49973","red":180,"green":153,"blue":115,"hue":35,"saturation":36,"brightness":70,"is_black_and_white":false,"creation_tsz":1448132225,"listing_id":257219175,"rank":4,"url_75x75":"https://img0.etsystatic.com/114/0/8795606/il_75x75.873268506_j26j.jpg","url_170x135":"https://img0.etsystatic.com/114/0/8795606/il_170x135.873268506_j26j.jpg","url_570xN":"https://img0.etsystatic.com/114/0/8795606/il_570xN.873268506_j26j.jpg","url_fullxfull":"https://img0.etsystatic.com/114/0/8795606/il_fullxfull.873268506_j26j.jpg","full_height":796,"full_width":854},{"listing_image_id":873268980,"hex_code":"BD8357","red":189,"green":131,"blue":87,"hue":26,"saturation":53,"brightness":74,"is_black_and_white":false,"creation_tsz":1448132225,"listing_id":257219175,"rank":5,"url_75x75":"https://img0.etsystatic.com/111/0/8795606/il_75x75.873268980_5mpb.jpg","url_170x135":"https://img0.etsystatic.com/111/0/8795606/il_170x135.873268980_5mpb.jpg","url_570xN":"https://img0.etsystatic.com/111/0/8795606/il_570xN.873268980_5mpb.jpg","url_fullxfull":"https://img0.etsystatic.com/111/0/8795606/il_fullxfull.873268980_5mpb.jpg","full_height":705,"full_width":657}],"Shop":{"shop_id":8795606,"shop_name":"BootlegBarrels","user_id":38922519,"creation_tsz":1384336545,"title":"Custom Oak Whiskey Barrels & Barrel Accessories","announcement":"Personalized Whiskey Barrels, Custom Barrels, Quarter Barrel Signs, Barrel Heads, Wine Coasters and Serving Trays.  WE SHIP WORLDWIDE! International orders  & P.O. Box&#39;s all require a valid phone number! ✪✪✪✪✪✪✪✪✪✪✪✪✪VIEW CURRENT PRODUCTION TIMES & SHIPPING INFO ✪✪✪✪✪✪✪✪✪✪✪✪ ✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\n\n✦✦✦✦✦✦CURRENT PRODUCTION TIMES:✦✦✦✦✦✦\nWe update all production times and stock notices here since it is not feasible to edit our hundreds of listings just for the Holidays, temporary backorders and other peak times.\nBarrels: 5-7 business days \nWedding Card Barrels: 5-7 business days\nSigns (Printed): 5-7 business days\nSigns (Engraved): 5-7 business days\nTrays: 5-7 business days\n*If you placed a full custom order that includes custom art we are creating, please allow additional time for art creation, proofing, etc. and be sure to inquire on current proofing times. We only include proofing on orders containing custom artwork and not on any other type of order to reduce proofing times. For all full custom orders, production time starts after proof is approved.\n\n✦STOCK NOTICE:✦\n*Please be sure to read our substitution policies for all OOS hoop colors if ordering near a Holiday.\n\n********************************************************************************************\n✪✪✪✪✪✪✪✪NEED IT FAST? ADD RUSH OPTIONS✪✪✪✪✪✪✪✪\n********************************************************************************************\nRUSH PRODUCTION: https://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush This option gets your order produced faster, usually within 2-3 business days.\n\nRUSH SHIPPING: All shipping is now automatically calculated by Etsy based on weight, size and shipping destination. No need to contact us for a quote, simply select what option you want during checkout.\n\n********************************************************************************************STANDARD TRANSIT TIMES BASED ON SHIPPING METHOD AND DESTINATION:\n********************************************************************************************\nCONTINENTAL USA (excludes AK, HI, PR or international destinations)\nFREE SHIPPING: 6-8 Business days-FedEx Smart Post, UPS Sure Post, Parcel Select\nPRIORITY: 2-3 business days transit\nPRIORITY EXPRESS: 1-2 Business days transit\n\nAK, HI & PR:\nFREE SHIPPING: Not offered\nPRIORITY: 3-5 Business days average\nPRIORITY EXPRESS: 2-3 business days average\n\nINTERNATIONAL DESTINATIONS:\nFREE SHIPPING: Not offered\nUSPS 1ST CLASS: 2 weeks\nPRIORITY: 6-10 Business days average\nPRIORITY EXPRESS: 3-5 business days average\n\nNOTE: Average transit times are not meant to guarantee delivery dates and are estimated transit times for many major markets. Actual number of days may vary based on origin, destination, and if internationally shipping-customs delays. We can in no way guarantee specific delivery dates with any order that must be processed through customs. \n\n✦Daily Cutoff Times:\nOrders submitted after 11 am EST may be processed on the next business day.\n\nPlease view our policy page here for FAQ&#39;s and other important information:\nhttps://www.etsy.com/shop/BootlegBarrels/policy?ref=shopinfo_policies_leftnav\n\nWe thank you for your business and hope you love your barrels :)","currency_code":"USD","is_vacation":false,"vacation_message":"We are currently updating our shop designs and products.  You may still contact us by sending us a message and may continue to place your orders at www.customsentiments.com.\r\n\r\nThank you for your patience.","sale_message":"Thank you for your purchase from our Etsy Shop, BootlegBarrels, a division of Custom Sentiments.  Leave us your feedback to receive a special coupon code to use toward your next purchase! \r\n\r\nORDERS SHIPPING INTERNATIONALLY AND TO P.O, BOX&#39;S REQUIRE A VALID PHONE NUMBER-NO EXCEPTIONS, AS THE CARRIER REQUIRES IT AND THIS IS TO PROTECT YOU. IF NO PHONE # IS PROVIDED, THIS WILL DELAY YOUR ORDER.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nPRODUCTION TIMES:\r\nWe update all production times and stock notices in the SHOP BANNER since it is not feasible to edit our hundreds of listings just for the Holidays, temporary backorders and other peak times. Please be sure to check shop banner for a list of all current production times.  Here is what was posted at time of your order:\r\n✦✦✦✦✦✦CURRENT PRODUCTION TIMES:✦✦✦✦✦✦\r\nWe update all production times and stock notices here since it is not feasible to edit our hundreds of listings just for the Holidays and other peak times.\r\nBarrels: 5-7 business days \r\nWedding Card Barrels: Backordered- due to ship end of March \r\nSigns (Printed): 7 business days\r\nSigns (Engraved): 5-7 business days\r\nTrays: 7 business days\r\n*If you placed a full custom order that includes custom art we are creating, please allow additional time for art creation, proofing, etc. and be sure to inquire on current proofing times. We only include proofing on orders containing custom artwork and not on any other type of order to reduce proofing times. For all full custom orders, production time starts after proof is approved.\r\n\r\n✦✦✦✦✦✦AVG. PRODUCTION TIMES BASED ON ORDER DAY & TIME:✦✦✦✦✦✦\r\nThe following time tables are to provide examples of when an order enters the production queue from when it is placed and not meant to be a guarantee date.  This notice is also posted in our policy page, as it does not change.                     \r\nMONDAY PRIOR TO 11a EST: Enters production queue Tuesday.\r\nMONDAY AFTER 11a EST: Enters production queue Wednesday.\r\nTUESDAY PRIOR TO 11a EST: Enters production queue Wednesday.\r\nTUESDAY AFTER 11am EST: Enters production queue Thursday.\r\nWEDNESDAY PRIOR TO 11am EST: Enters production queue Thursday.\r\nWEDNESDAY AFTER 11am EST: Enters production queue Friday.\r\nTHURSDAY PRIOR TO 11am EST: Enters production queue Friday.\r\nTHURSDAY AFTER 11am EST: Enters production queue Monday.\r\nFRIDAY PRIOR TO 11am EST: Enters production queue Monday.\r\nFRIDAY AFTER 11am EST: Enters production queue Tuesday.\r\nSATURDAY, SUNDAY OR ON A HOLIDAY OR DAY WE ARE CLOSED: Entered into system on the following business day, but enters the production queue the following day.\r\n*********************************************************************************************\r\n✪✪✪RUSH PRODUCTION & RUSH SHIPPING OPTIONS AVAILABLE✪✪✪            \r\n***********************************************************************************************\r\nRUSH PRODUCTION: This option places your order in the rush production queue (normally 2-3 business days for barrels or 3-4 for wedding card barrels). See rush production listing for current rush times. This will expedite production of your order, but will not expedite the shipping method selected at checkout.\r\n\r\nPURCHASE THIS LISTING TO ADD A RUSH PRODUCITON TO YOUR ORDER:\r\nhttps://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush\r\n*********************************************************************************************\r\n✪✪✪RUSH SHIPPING OPTIONS AVAILABLE AT CHECKOUT✪✪✪            \r\n***********************************************************************************************\r\nRush Shipping: All shipping is now automatically calculated by Etsy based on weight, size and shipping destination. No need to contact us for a quote, simply select what option you want during checkout.\r\n\r\nCONTINENTAL USA (excludes AK, HI, PR or international destinations)\r\nFREE SHIPPING: 6-8 Business days-FedEx Smart Post, UPS Sure Post, Parcel Select\r\nPRIORITY: 2-3 business days transit\r\nPRIORITY EXPRESS: 1-2 Business days transit\r\n\r\nAK, HI & PR:\r\nFREE SHIPPING: Not offered\r\nPRIORITY: 3-5 Business days average\r\nPRIORITY EXPRESS: 2-3 business days average\r\n\r\nINTERNATIONAL DESTINATIONS:\r\nFREE SHIPPING: Not offered\r\nUSPS 1ST CLASS: 2 weeks\r\nPRIORITY: 6-10 Business days average\r\nPRIORITY EXPRESS: 3-5 business days average\r\n\r\nNOTE: Average transit times are not meant to guarantee delivery dates and are estimated transit times for many major markets. Actual number of days may vary based on origin, destination, and if internationally shipping-customs delays. We can in no way guarantee specific delivery dates with any order that must be processed through customs. \r\n\r\nRequesting we rush your order in the note to seller area during checkout will not rush your order unless you have ordered a rush production. We offer the same options to all customers to be fair to all customers so we cannot make any exceptions regardless of special requests in the note section. \r\n✦Daily Cutoff Times:\r\nOrders submitted after 11 am EST may be processed on the next business day. See production schedule for more info on how/when orders are processed.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nFREE SHIPPING OFFER: \r\n*Continental USA only (excludes AK, HI, PR and international destinations). \r\n*Ships most economical-FedEx Smart Post, UPS Sure Post, Parcel Select\r\n*average transit times of 6-8 business days. \r\n*we cannot guarantee a specific delivery date when selecting this option, as we are not given a guaranteed delivery date by the carrier.\r\n*We cannot estimate your delivery date with this option, as transit time is displayed to us as &quot;varies&quot; on the carrier website(s).\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\n✦✦✦✦✦✦HOLIDAYS & CLOSURES:✦✦✦✦✦✦\r\nNew Years Eve: December 31\r\nNew Years Day: January 1\r\nMartin Luther King Day: January 18\r\nPresident&#39;s Day: February 15\r\nSt. Patrick&#39;s Day: March 17\r\nGood Friday- Easter: March 25-28 & will re-open March 29\r\nMemorial Day: May 30\r\nIndependence Day: July 4\r\nLabor Day: September 5\r\nColumbus Day: October 10\r\nHalloween: October 31\r\nVeterans Day: November 11\r\nThanksgiving: November 23-27 Will re-open Monday Nov 28 as usual\r\nChristmas: December 23-26 Will re-open Tuesday Dec 27\r\n*There may also be closures due to inclement weather or issues that are out of our control. In such event we will try to post this info as well in the shop banner.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nDESIGN OPTIONS OFFERED:\r\nWe offer blank, non-personalized templates, personalized templates and custom design options. Each listing clearly states what customization can be made (if any). By customer request, the option to order blank barrels are now on every listing so it is easier to find. To order a completely blank barrel, simply select &quot;blank barrel&quot;. Since most personalized designs are just templates and will be engraved as shown, but with your personalization copied/pasted into the template, we do not provide proofs on these designs. We only include proofs on full custom artwork orders (additional cost). This helps to keep turnaround times as quick as possible.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nCHANGES & CANCELLATIONS:\r\nOnce an order is received, a shipping label is created and your order is pre-labeled and entered into the production queue. Since it can be rather difficult to track down an order already in production, we ask that you please double check all information you are submitting for accuracy prior to submitting, (including personalization, shipping address, sizing, etc.). Our listings are very detailed, so generally provide quite a bit of info within the listing as well in regards to what is needed. This helps to eliminate confusion and mistakes from being made. Due to these reasons and due to many changes being requested, especially around holidays, we had to implement a no change- no cancellation policy and cannot make exceptions. If you need to make a change to the shipping address or personalization please contact us IMMEDIATELY. We can in no way guarantee the change will be made, but will make every effort to change your order for you.  Once a label has been purhcased and printed, we will not make changes to the shipping address.  In the event a cancellation is honored, there will be a $35 cancellation fee assessed. By requesting cancellation, you are agreeing to this charge. You can view our cancellation and change request policy on our policy page for more info.\r\n\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\n✪SUBSTITUTIONS:\r\nPlease note that in very rare circumstances (usually around Christmas), we may, at our discretion, substitute for a different hoop color if the wait time for the color you ordered exceeds one week.  This is very rare, but can happen and is something that every barrel company has to deal with from time to time and therefore, this will not warrant a refund or replacement as this cannot be helped. \r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\n☎ Please feel free to contact us and we will be happy to assist you.  Either message me directly on Etsy for questions regarding your order or email me at steve.barrels@customsentiments.com.  \r\n\r\nView Our Policy Page Here: https://www.etsy.com/shop/BootlegBarrels/policy?ref=shopinfo_policies_leftnav\r\n\r\nWe hope you love your custom barrels and barrel products and wish you Happy 2016!  Cheers!","digital_sale_message":null,"last_updated_tsz":1460681234,"listing_active_count":343,"digital_listing_count":0,"login_name":"steveweissenfluh","accepts_custom_requests":true,"policy_welcome":"Welcome to our Etsy shop Bootleg Barrels!  Here you will find everything from mini barrels, perfect for Groomsman gifts and wedding parties or for use at home to full Serving Trays, Quarter Barrel Heads and Half Barrel Heads, Lazy Susan&#39;s and we even have your pooch covered with our unique and one of a kind Dog Collar Barrels!  ","policy_payment":"We accept Etsy direct checkout and PayPal. For business orders: You can also call or fax your order in toll free. Once you have placed an order, your order goes into our production queue and is produced in the order received, usually within 3-5 business days, but can take up to 1 week or more during Holidays and peak times. PLEASE CHECK SHOP BANNER FOR CURRENT PRODUCTION TIMES AND HOLIDAY CUTOFFS. ALL HOLIDAY CUTOFFS AND CURRENT PRODUCTION TIMES ARE CLEARLY POSTED IN THE SHOP BANNER SINCE THERE IS NO EASY WAY TO UPDATE EACH LISTING&#39;S TURNAROUND TIMES EVERY TIME THEY CHANGE DUE TO A HOLIDAY. \r\n","policy_shipping":"WE SHIP MOST ITEMS WORLDWIDE! A VALID PHONE NUMBER IS REQUIRED FOR ALL INTERNATIONAL ORDERS AND SHIPMENTS TO P.O. BOXES.  WE WILL NOT SHIP UNLESS THIS HAS BEEN PROVIDED, AS IT IS REQUIRED BY MOST CARRIERS.  THIS IS TO ENSURE THE CARRIER CAN CONTACT YOU SHOULD THERE BE ANY ISSUE IN DELIVERING YOUR PACKAGE.  THIS IS FOR YOUR BENEFIT AS IT HELPS PREVENT RETURNED OR UNDELIVERED PACKAGES.  \r\n\r\n✦✦✦✦✦✦ SHIPPING POLICY: ✦✦✦✦✦✦\r\nEtsy now automatically calculates our shipping on most items for us based on package weight, size and destination. Large orders or orders containing different items may be grouped into separate packages based on box dimensions and ship separately. While Etsy only uses USPS for calculated shipping, we reserve the right to use multiple carriers. We are not responsible for miscalculated shipping on Etsy. If Etsy made an error in calculating shipping on your order, we will contact you and offer the option for you to cancel your order or invoice for additional shipping due.\r\n\r\n✦✦✦✦✦✦ AVERAGE TRANSIT TIMES: ✦✦✦✦✦✦\r\nCONTINENTAL USA (excludes AK, HI, PR or international destinations)\r\nFREE SHIPPING: 6-8 Business days average\r\nPRIORITY: 2-3 business days transit\r\nPRIORITY EXPRESS: 1-2 Business days transit\r\n\r\nAK, HI & PR:\r\nFREE SHIPPING: Not offered\r\nPRIORITY: 3-5 Business days average\r\nPRIORITY EXPRESS: 2-3 business days average\r\n\r\nINTERNATIONAL DESTINATIONS:\r\nFREE SHIPPING: Not offered\r\nUSPS 1ST CLASS: 2 weeks\r\nPRIORITY: 6-10 Business days average\r\nPRIORITY EXPRESS: 3-5 business days average\r\n\r\nNote: The above stated transit times are provided by the USPS and are intended as estimated transit times only and not as a guaranteed delivery date to most major markets. We cannot be held liable for carrier delays due to inclement weather, customs delays, service interruptions or any other related issues out of our control. For shipping related issues, contact the carrier directly. We are responsible for the providing the item for shipping, but the carrier is ultimately responsible for delivery. Although we can estimate your delivery date and state average transit times, we are not the carrier and therefore in no way can we 100% guarantee your package by a specific date. We provide tracking on all orders. Please contact the carrier directly for any shipping related issues. Insurance is available at additional cost. Please contact us if you would like to insure your package. \r\n\r\n✦✦✦✦✦✦AVG. PRODUCTION TIMES BASED ON ORDER DAY & TIME:✦✦✦✦✦✦\r\nThe following time tables are to provide examples of when an order enters the production queue from when it is placed and not meant to be a guarantee date.                       \r\nMONDAY PRIOR TO 11a EST: Enters production queue Tuesday.\r\nMONDAY AFTER 11a EST: Enters production queue Wednesday.\r\nTUESDAY PRIOR TO 11a EST: Enters production queue Wednesday.\r\nTUESDAY AFTER 11am EST: Enters production queue Thursday.\r\nWEDNESDAY PRIOR TO 11am EST: Enters production queue Thursday.\r\nWEDNESDAY AFTER 11am EST: Enters production queue Friday.\r\nTHURSDAY PRIOR TO 11am EST: Enters production queue Friday.\r\nTHURSDAY AFTER 11am EST: Enters production queue Monday.\r\nFRIDAY PRIOR TO 11am EST: Enters production queue Monday.\r\nFRIDAY AFTER 11am EST: Enters production queue Tuesday.\r\nSATURDAY, SUNDAY OR ON A HOLIDAY OR DAY WE ARE CLOSED: Entered into system on the following business day, but enters the production queue the folowing day.\r\n\r\n✦✦✦✦✦✦*2015 GUARANTEED HOLIDAY DELIVERY CUTOFFS:✦✦✦✦✦✦\r\nPersonalized Non Barrel Items: DEC 8 \r\nPersonalized Barrels & Signs: DEC 10 \r\nBlank (Non Personalized) Orders: DEC 14 \r\nRUSH BARRELS FINAL DAY: DEC 22 \r\nGEOGRAPHIC FULLFILLMENT: DEC 14- DEC 22\r\nDAILY ORDER CUTOFF TIME: 11am EST\r\n\r\n*Exclusions: These guaranteed delivery times are for orders shipping within the Continental USA, (exludes AK, HI, PR and International destinations). We cannot be responsible for carrier delays due to inclement weather or other issues out of our control.  AFTER 11AM ON DEC 10, ALL ORDERS WILL REQUIRE RUSH PRODUCTION AND RUSH SHIPPING IN ORDER TO BE GUARANTEED FOR CHRISTMAS DELIVERY! IF THIS IS NOT PURCHASED, YOUR ORDER WILL BE ADDED TO THE AFTER CHRISTMAS QUEUE AND SHIP EARLY-MID JANUARY.  \r\nhttps://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush\r\n\r\n✦✦✦✦✦✦RUSH PRODUCTION AND/OR RUSH SHIPPING OPTIONS: ✦✦✦✦✦✦\r\nRush production and rush shipping options are available for an additional cost of $35/pkg. Adding a rush production to your order will place your order in the front of the line in the rush production queue on a first in-first out basis. You can add a rush production to your order here: https://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush \r\nRush production times are 1-2 business days during normal sales times. However, during peak times this can increase, especially during the Holidays, After DEC 10, all orders will require rush production and rush shipping in order to be received by Christmas.\r\n\r\nRush Production expedites the production process and does not include any rush shipping upgrades. If you need rush shipping, please select appropriate option during checkout. \r\n\r\nPlease do not enter requests for rush production or rush shipping in the note to seller area during checkout, as this will not expedite your order- it may delay it.  This is because all orders received are first entered into the system. Then a shipping label and a sheet detailing your personalization is printed and placed in the box. That box is then sent down the production line to be produced crossing multiple stations before finally making its way to be packed and placed in carrier pickup.  If there is notes requesting rush services but no order for those services, your order is pulled and highlighted with &quot;Contact Customer 1st&quot; and can only be entered into the system once you have purchased the requested upgrades and we have finalized your order. \r\n\r\n✦✦✦✦✦✦ RETURNED PACKAGES: ✦✦✦✦✦✦\r\nPlease be sure to check your address for accuracy PRIOR to submitting your order.  All orders are pre-labeled as they are entered into the production queue.  We charge a $25 return package fee, as well as the cost of the new shipping label to reship a package in the event it is returned to us.  International return package fees may be higher, depending on where you are located. We will then hold the package for a period of 7 days. If returned and unclaimed after 7 days the order will be forfeited, package destroyed and no refunds will be given. ","policy_refunds":"Since each item is made to order, like many of our products, we have a no return and no refund policy.  If there is damage during shipping, please alert us and contact the shipping carrier to file your claim.  If we have made an error on your barrel, please send a high quality photo to steve.barrels@customsentiments.com and be sure to reference your Etsy order number in the subject line, describing the issue.  We will review your order and if warranted, offer a free replacement.  We will then send a RMA label for the return of your defective barrel.  The return of the defective barrel is required prior to processing any free exchange.  Once received, we will send you a replacement.  All replacement&#39;s are for the same exact item only, with the same exact personalization, finish, etc. and no changes can be made to your order.\r\n\r\nORDER CHANGES OR CANCELLATIONS:\r\nPlease contact us immediately if you need to make a change to your order.  We will do our best to accomodate, but we can in no way guarantee that a change can be made.  It is important to note that once an order is received, it is pre-labeled for shipping with a note regarding personalizations and sent down the production line through several stations.  It can take hours to locate where an order is in the process, which is why we cannot accept any change requests once an order enters the production queue.  Since each item is made to order, we do not allow cancellations.  Once an order has been placed, we will not honor cancellation requests, so please make sure you want to order our products prior to placing your order.Please be sure you are ordering exactly what you want and double check all personalization entered prior to placing an order.  In the event we agree to cancel an order, there is a $35 cancellation fee assessed and you will be refunded the price paid less the cancellation fee.  This is only allowed in rare circumstances and only if the order has not entered the production queue and is not something we do often.  There is absolutely no cancellations for any custom barrel designs (artwork) as we start the design process shortly after receiving the order or for orders that are in the production queue-no exceptions. By placing your order with us, you are agreeing to these terms and conditions.\r\n\r\nDuring the Holidays, all orders are pre-labeled as they enter the production queue to keep the queue clean, prevent duplicates from being shipped and to keep everything running efficiently. Once you place an order and your order is processed we will purchase a shipping label. When we purchase your label Etsy will automatically send you a shipping notification. THIS DOES NOT MEAN YOUR ORDER SHIPPED, ONLY THAT WE PURCHASED A LABEL AND YOUR ORDER IS IN THE PRODUCTION QUEUE. Your tracking link provided will not become active until your order has been completed and picked up by the carrier. During the Holiday season we have to stick with a no change and no cancellation policy once an order has been pre-labeled and we will not make any exceptions, as this helps prevent any delays, duplicates or confusion with orders. Please be sure to check your order for accuracy prior to submitting, as we will not be able to make changes to your shipping address, your personalization, cancel an order or make any additional changes once your order has been pre-labeled and enters the production queue. \r\n\r\nPricing is subject to change without notice. We on occasion offer sales, free shipping offers, coupon codes and freebies. As with any website, a sale can be here today and gone tomorrow. If you place an order today and a sale starts tomorrow, this does not constitute a refund, just as if you were placing an order today and the price went up tomorrow we would not expect the difference.\r\n\r\nPlease note that in very rare circumstances (usually around Christmas), we may, at our discretion, substitute for a different hoop color if the wait time for the color you ordered exceeds one week.  This is very rare, but can happen and is something that every barrel company has to deal with from time to time and therefore, this will not warrant a refund or replacement as this cannot be helped. \r\n\r\nPROBLEMS WITH YOUR ORDER?\r\nPlease email order support at support@customsentiments.com, being sure to reference your Etsy Order number in the subject line of the email. A few good quality photos are required to open an exchange request. Due to the custom nature of our products, we do not offer refunds since once personalized it cannot simply be returned to stock. Please note that since wood is a natural product and not man made, there will be variations in color of wood from barrel to barrel and it may be lighter or darker than depicted in photos.  This is something that cannot be controlled for any wood product, not just barrels. Barrels are engraved using a laser and are not printed.  All true barrels will have a rivet from manufacturing- some more prominent than others no matter where ordered.   We just like to be more up front than most so you know what to expect.  Also note that the barrel rings may have a few &quot;scars&quot;, which is again perfectly normal no matter where you order a true barrel from.  The mentioned do not warrant an exchange.  Just enjoy your unique one of a kind barrel for the unique work of art it truly is and it&#39;ll love you back ;)  \r\n\r\nABANDONED ORDERS: We cannot process an order that is incomplete, not correctly entered or where additional shipping may be due due to request for upgrades in which your order will be on hold until payment has been received for the upgrade.  In the event we have questions regarding your order we will attempt to make contact with you.  If we have made reasonable effort to contact you regarding your order and we have not received a response within 60 days we will, at our discretion, treat your order as an abandoned order.  No refunds will be given and no cancellation requests accepted after 60 days from date of your order.  Since all orders need to be closed out within the Etsy system, a blank shipping notification will be sent out to close your order out after the initial 60 days wait time. \r\n\r\nNOTE: All information is given as an estimated time table and not a guaranteed date of service. We cannot be held liable for missing or incorrectly entered information or addresses entered by the customer, inclement weather or other service interruptions that cause missing, late or undelivered packages or other service interruptions that are out of our control. However, we are happy to assist and direct you the best we can should any shipping issue arise. Thank you for your understanding.\r\n\r\nWe cannot be responsible for carrier delays due to inclement weather or other issues out of our control. No refunds will be given (even for rush services), when these issues arise as we cannot prevent them, nor control them. We are not responsible for a package once it is in the carriers hands and it is up to the carrier to deliver the package once shipped. Please contact the carrier for any shipping related issues- a tracking number is provided on all orders for your convenience. We are happy to assist you in contacting the carrier when needed to resolve delivery issues within 7 days of delivery date.","policy_additional":"DESIGN PROOFS: \r\nWe get asked for design proofs A LOT.  We do not provide design proofs or photos for personalized orders using current designs.  ONLY FULLY CUSTOM designs or large corporate logo orders can request a design proof.  Proofing may be subject to a $25 proof charge so please request a custom listing if you would like to add a design proof.  Your proof includes one small revision if necessary, as well as one revised proof.  Proofs are not photographs of the actual barrel. This will be a design proof.  \r\n\r\nCan I use my OWN PHOTO OR LOGO? \r\nYes, absolutely!  We do have a few rules on this though:\r\n1) Your image must be complete and ready to engrave, meaning:\r\n  a. It must be high quality (300 dpi at product size or vector)\r\n  b. It must be 100% black and white (black is what gets engraved).\r\n  c. It cannot violate any copyright or trademarks.\r\n  d. It must be complete with all text, imagery, etc. and not need any editing on our part.  If any changes, modifications, additions or other editing is needed, there may be additional cost for this service.\r\n  \r\n2) We DO NOT accept artwork that violates any copyright or trademark.  This includes images from the web that are protected, College or Professional Sports Logos, Collegiate Logos, Brand Name Distillery Logos or quotations (including but not limited to Jack Daniels, Jameson, Jim Beam, etc.). Their logos and sayings are copyright protected and cannot be duplicated without prior written legal consent.  It is against the law and we do not knowingly infringe on any copyright. If you are wanting to use a college logo, permission is usually pretty easy to obtain from your school, but we cannot use it without their prior written permission.  Please contact us if you have any questions regarding this copyright policy. \r\n✪Custom barrels can take longer, usually around 5-7 business days (longer around Holidays). \r\n\r\n3) You need to purchase the correct listing.  For barrels, we have &quot;Design Your Own&quot; barrel listings.  Simply select the &quot;My Photo or Logo&quot; option in the drop down menu.\r\n\r\nIMAGE FORMATS ACCEPTED:\r\nSince we are designers as well, we use and are very familiar with most major deisgn programs (Illustrator, Corel Draw, Photoshop, WPC, Flexi Sign, etc.)  We accept almost any image format, (jpg, png, eps, cdr, ai, psd, pdf or wpc).  Etsy does not allow uploading of any vector images, so if you have a vector image, please email it to art@customsentiments.com, being sure to reference your Etsy order number in the email.  If you are wanting us to create something custom for you, please see below, as there is additional costs for us to create custom artwork.\r\n\r\nTO ORDER USING YOUR OWN LOGO OR DESIGN:\r\n❶Go to our Custom Products Page here:  https://www.etsy.com/shop/BootlegBarrels?section_id=14695743&ref=shopsection_leftnav_8\r\n❷ Select the listing with the size you would like (1,2,3,5, 10 or 20 liters) \r\n❸ Select the &quot;My Design or Logo&quot; option from the drop down menu.\r\n❹ Tell us what Hoop Color you want (Black or Steel)\r\n❺ Select whether you want a Finished or Unfinished barrel.\r\n❻ Email your complete artwork to art@customsentiments.com being sure to reference your Etsy Order Number in the email. If you are wanting us to create something custom, there is additional cost so please inquire prior to placing na order, tell us what you envision and we can provide a custom art quote.\r\n\r\nDO YOU OFFER CUSTOM DESIGN SERVICES?\r\nYes, we can design almost anything you can imagine!  There is an additional cost for custom designing or editing and the cost will be based on intricacy of the design and how long it will take to create.  Simply let us know what you are envisioning and we can give you a quote for your project.  Be as specific as possible in your request, (using visuals if possible) so that we can be sure your receive an accurate quote, timeline and to ensure you will be satisfied with the outcome.  Once you have placed your custom order, you will be referred to Joni, Kirsten or Leici to assist you in the design process.  You are allowed one small revision for your custom order.  Additional small revisions will be at additional cost, ($10 each).  If you decide to start completely over or your design goes into a different direction or you need a more involved edit, you will need to discuss the cost of the new design and you will be charged a new custom art fee for that new design.\r\n\r\nCAN YOU SEND ME A PHOTO OF MY ORDER: \r\nNo, Orders cannot be pulled from the production line to have photographs taken of your actual barrel prior to shipping it to you.  This is disruptive to the entire process and is not something we offer or will do.  Thank you for your understanding.\r\n\r\n====================================================================\r\n\r\n               ✪✪✪✪    BUSINESS HOURS AND HOLIDAY CLOSINGS:   ✪✪✪✪\r\nWe are open M-F 7am- 4:30pm EST and are closed on the weekends and Holidays.  Questions can still be answered on weekends and after hours when we are available.  If nobody is available, your question will be answered on the next business day.  Business days are considered M-F between business hours.  \r\n\r\nWe are closed on all major Holidays and Holiday weekends to allow for us to observe these Holidays with our families.  Although we may be able to answer questions and phone calls on occasion during these times, our stores are not open and we are not in production on the following dates (unless notated):\r\n\r\nNew Years: Dec 31st- January 1st\r\nValentine&#39;s Day: February 13th- February 16th \r\nEaster weekend: April 3rd- April 6th (Good Friday- Easter Monday)\r\nMother&#39;s Day: closed over weekend as usual\r\nFather&#39;s Day: closed over weekend as usual\r\nIndependence Day: July 3rd-6th\r\nLabor Day: Sept. 7th\r\nHalloween: closed over weekend as usual\r\nThanksgiving: November 25th-27th\r\nChristmas Eve and Christmas Day: Closed 12/23-12/29 for Christmas Break.  We will re-open 12/29 as usual. \r\n\r\nEtsy is a multi cultural site, so it does not always observe Holidays as we do.  For certain Holidays, Etsy does not seem to automatically account for Holiday closings and may cause a miscalculation in your shipping time frame around these Holidays.  We are unable to change this and unfortunately cannot help this from happening as it is an issue in the Etsy system itself.  If your order shows it will ship on one of the above dates that we are closed, it will be shipped on the next business day.  If your order is placed outside of business hours or on a weekend or Holiday, it will be entered the next business day. Thank you for understanding.\r\n\r\n\r\n*********************************************************************************************\r\n✪✪✪✪ BARREL FAQ&#39;S ✪✪✪ \r\n***********************************************************************************************\r\nWHAT SIZES DO YOU OFFER:\r\nANSWER: We offer 1, 2 ,3 ,5 ,10 and 20 liter sizes personalized.  We offer larger sizes as well, but they cannot be customized due to their size. \r\nBARREL DIMENSIONS:\r\n1 Liter   6.5 x 4.5 x 4.5 inches\r\n2 Liter   7.5 x 5 x 5 inches\r\n3 Liter   8.5 x 5.5 x 5.5 inches\r\n5 Liter   9.5 x 6.5 x 6.5 inches\r\n10 Liter  12 x 8 x 8 inches\r\n20 Liter   15 x 10.5 x 10.5 inches\r\n*DIMESIONS ABOVE DO NOT INCLUDE STAND HEIGHT AND WIDTH. If needing to fit within a specific space, please contact us and we can provide measurements including the stand.\r\n\r\n\r\nQUESTION: What&#39;s the difference between the finish and hoop color options? ANSWER: \r\nSteel Hoops are made of steel.\r\nBlack hoops are powder coated steel hoops.\r\nFinished will have a few light sprays of clear coat on it.\r\nUnfinished is simply unfinished- no clear coat\r\n✪No heavy stains, dyes or varnishes are used on these barrels so it will not affect the integrity of the barrel. Finished vs. unfinished is purely an aesthetics preference. Please note that since wood is a natural product it may be lighter or darker than depicted in photos.  Photos are of an actual barrel with designs superimposed onto the barrel. Barrels ate not printed, they are engraved using a laser burner.\r\n\r\nQUESTION: How are these made?\r\nANSWER: These are made using a laser burner, as most custom distillery grade barrels are.  It is completely normal to have darker areas around the engraved portion of your barrel caused by the laser.  This is not smudging and is meant to give your barrel it&#39;s character. Some barrels will have more than others, but that is what makes each barrel unique and no two barrels alike.  Please love and respect your custom barrels for the unique pieces of art they are and they will love you back ;)  \r\n\r\nQUESTION: What are the barrels made from?\r\nANSWER: Our barrels are made from premium quality American White Oak. The staves are air dried for two years and all barrels have a medium char.\r\n\r\nQUESTION: How do I cure the barrel?\r\nANSWER: Barrels should be cured prior to use. Start by filling the barrel with boiling or hot water and leave it to soak for 3 to 5 days. This allows the barrel to swell tightly against the hoops and ensure that the barrel doesn&#39;t leak.  Your barrel WILL leak if you have not cured it.\r\n\r\nQUESTION: Are glues or nails used to make the barrel?\r\nANSWER: No, our barrels are all hand crafted with no use of glues or nails.\r\n\r\nQUESTION: How should the barrel be stored?\r\nANSWER: Barrels are best stored in a cool damp environment such as a wine cellar. This will keep the exterior from drying out and minimize evaporation (Angels Share).  \r\n\r\nQUESTION: How many times can I use my barrel?\r\nANSWER: These are high grade barrels!  With proper care, you can use your barrel for 8 to 10 years. Following the cleaning and re-charing instructions will insure a long life for your product and be sure to not let your barrel dry out.\r\n\r\nQUESTION: I left my barrel dry for an extented time. Now it leaks... what do I do?\r\nANSWER: In many cases just re-cure the barrel. If it continues leaking, submerge the barrel in water for a couple of days. After it&#39;s been submerged, dry the exterior with a towel and fill it with water to see if it continues to leak. If so, find the leak and apply barrel wax to the hole... If you can&#39;t stop the leaking... cut in half and use as a planter!\r\n\r\nQUESTION: My barrel is rough around the edges and does not look exactly like pictured.  Is this a defect?  \r\nANSWER: No, these are made with natural wood and therefore there will always be variation in color, roughness, veining, etc.  This does not affect the functionality of your barrel and is not a defect.  This is something that every barrel company has to deal with and cannot be helped regardless of where you order from.  We just like to be more upfront about it.  In the barrel world, the uniqueness of each barrel is also what we consider it&#39;s character.  Although similar, no two barrels will ever be alike and that is what gives the barrels their character and what lends to the beauty and uniqueness of each barrel.  We suggest loving your barrel for the truly unique piece of art and it will love you back ;)\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ CLEANING FAQ&#39;S ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How often do I clean my barrel?\r\nANSWER: When aging hard spirits such as whiskey, rum or tequila, clean the barrel after two or three batches (or every 1 to 2 years). For wine, cider, liquor or other low alcohol content spirits, clean after each batch.\r\n\r\nQUESTION: How do I clean  my barrel?\r\nMULTI- STEP ANSWER:\r\n1.Dissolve the Cleaning Solution into warm water (we sell a cleaning kit for this). Fill the barrel with this cleaning solution and soak for 24 hours. Empty and rinse 3 times with hot water.\r\n2.Dissolve the Neutralizing Acid into warm water. Fill the barrel with this neutralizing solution and soak for 15 minutes. Empty and rinse the barrel 3 times with hot water.\r\n3.To re-char the barrel interior, drain the barrel for 3 hours. Place a butane torch in the bung and spigot hole and re-char the inside.\r\n\r\nIMPORTANT: To prevent the barrel from drying out and minimize the possibility of contamination, barrels should always be stored full with spirits or water with sterilizing solution.\r\n\r\n***See cleaning package directions for exact mixture quantities.\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ STORING FAQ&#39;S ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How do I store my barrel?\r\nANSWER: When storing the barrel fill the barrel with a mixture of sterilizing tablets and cool water. Fill the barrel with the solution and leave in a cool damp place until you are ready to use again.\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ AGING FAQ&#39;S ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How long do I age my spirits?\r\nANSWER: There&#39;s no formula for the perfect time to age your spirits. Age to taste! We suggest you taste your spirits every week and once aged to YOUR taste, start drinking or move it to a glass bottle to stop the aging process.  \r\n\r\nQUESTION: Do smaller barrels age the spirit faster than large barrels?\r\nANSWER: Yes... due to the greater surface or contact area ratio, small size barrels will age 5 to 10 times faster then your standard 55 gallon barrel. These means that one month in a small barrel will produce the equivalent aging to 1 to 1 1/2 years in a full size barrel.\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ BOOTLEGGIN&#39; ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How do I get Whiskey from a bottle of Vodka, Swish or Moonshine?\r\nANSWER: When alcohol is distilled, either from potatoes, corn, fruit, grain or sugar cane, it produces Ethanol. A clear and tasteless alcohol. Distilleries then flavor and filter the alcohol to get their unique flavor. Vodka is the only alcohol you can buy in an unflavored form. When mixed with a bottle of  Barrel Premium Essence, you can recreate the taste of many of the famous brands.\r\n\r\nQUESTION: Will a more expensive Vodka produce a better tasting whiskey?\r\nANSWER: No!  We actually recommend using a cheaper Vodka such as Taaka or the like, as it will pick up the flavors better and thus have a better taste.\r\n\r\nQUESTION: Do you sell Bootleg kits?  \r\nANSWER: Yes, we do!  Simply contact us and we would be happy to assist you.\r\n","policy_seller_info":null,"policy_updated_tsz":1453389569,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/BootlegBarrels?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":609,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/120/0/8795606/isla_fullxfull.17106038_hk601ot5.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":207932120,"state":"active","user_id":32660934,"category_id":68887494,"title":"Personalized Whiskey Scotch Glass Set with Wood Box Gift for Men, Groomsmen, Father&#39;s and Dad (024955)","description":"Personalized 8 oz. whiskey scotch glasses with engraved wood box. We  can engrave anything you need on the glasses and box. \r\n\r\nBox Size: 8&quot; x 5.5&quot; x 5&quot;","creation_tsz":1460681115,"ending_tsz":1471221915,"original_creation_tsz":1413861577,"last_modified_tsz":1460681115,"price":"39.99","currency_code":"USD","quantity":648,"tags":["whiskey decanter","gift for him","man cave","whiskey glass","groomsmen gift","personalized whiskey","father's day gift","wedding gift","gift for dad","scotch glasses","rocks glass","highball glasses","personalized gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass"],"shop_section_id":13510077,"featured_rank":null,"state_tsz":1449796086,"url":"https://www.etsy.com/listing/207932120/personalized-whiskey-scotch-glass-set?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":9005,"num_favorers":431,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":670300045,"hex_code":"604238","red":96,"green":66,"blue":56,"hue":15,"saturation":41,"brightness":37,"is_black_and_white":false,"creation_tsz":1413861577,"listing_id":207932120,"rank":1,"url_75x75":"https://img1.etsystatic.com/051/1/8057725/il_75x75.670300045_4qxl.jpg","url_170x135":"https://img1.etsystatic.com/051/1/8057725/il_170x135.670300045_4qxl.jpg","url_570xN":"https://img1.etsystatic.com/051/1/8057725/il_570xN.670300045_4qxl.jpg","url_fullxfull":"https://img1.etsystatic.com/051/1/8057725/il_fullxfull.670300045_4qxl.jpg","full_height":600,"full_width":600},{"listing_image_id":670299479,"hex_code":"654339","red":101,"green":67,"blue":57,"hue":14,"saturation":43,"brightness":39,"is_black_and_white":false,"creation_tsz":1413861577,"listing_id":207932120,"rank":2,"url_75x75":"https://img1.etsystatic.com/048/0/8057725/il_75x75.670299479_944d.jpg","url_170x135":"https://img1.etsystatic.com/048/0/8057725/il_170x135.670299479_944d.jpg","url_570xN":"https://img1.etsystatic.com/048/0/8057725/il_570xN.670299479_944d.jpg","url_fullxfull":"https://img1.etsystatic.com/048/0/8057725/il_fullxfull.670299479_944d.jpg","full_height":600,"full_width":600},{"listing_image_id":670173900,"hex_code":"68483F","red":104,"green":72,"blue":63,"hue":13,"saturation":39,"brightness":40,"is_black_and_white":false,"creation_tsz":1413861577,"listing_id":207932120,"rank":3,"url_75x75":"https://img0.etsystatic.com/051/0/8057725/il_75x75.670173900_hihk.jpg","url_170x135":"https://img0.etsystatic.com/051/0/8057725/il_170x135.670173900_hihk.jpg","url_570xN":"https://img0.etsystatic.com/051/0/8057725/il_570xN.670173900_hihk.jpg","url_fullxfull":"https://img0.etsystatic.com/051/0/8057725/il_fullxfull.670173900_hihk.jpg","full_height":600,"full_width":600},{"listing_image_id":608220968,"hex_code":"553E3A","red":85,"green":62,"blue":58,"hue":9,"saturation":31,"brightness":33,"is_black_and_white":false,"creation_tsz":1413861577,"listing_id":207932120,"rank":4,"url_75x75":"https://img0.etsystatic.com/029/1/8057725/il_75x75.608220968_oxqt.jpg","url_170x135":"https://img0.etsystatic.com/029/1/8057725/il_170x135.608220968_oxqt.jpg","url_570xN":"https://img0.etsystatic.com/029/1/8057725/il_570xN.608220968_oxqt.jpg","url_fullxfull":"https://img0.etsystatic.com/029/1/8057725/il_fullxfull.608220968_oxqt.jpg","full_height":600,"full_width":600},{"listing_image_id":608220972,"hex_code":"6F5E61","red":111,"green":94,"blue":97,"hue":349,"saturation":15,"brightness":43,"is_black_and_white":false,"creation_tsz":1413861577,"listing_id":207932120,"rank":5,"url_75x75":"https://img0.etsystatic.com/031/0/8057725/il_75x75.608220972_j7r3.jpg","url_170x135":"https://img0.etsystatic.com/031/0/8057725/il_170x135.608220972_j7r3.jpg","url_570xN":"https://img0.etsystatic.com/031/0/8057725/il_570xN.608220972_j7r3.jpg","url_fullxfull":"https://img0.etsystatic.com/031/0/8057725/il_fullxfull.608220972_j7r3.jpg","full_height":600,"full_width":600}],"Shop":{"shop_id":8057725,"shop_name":"TealsPrairie","user_id":32660934,"creation_tsz":1366241465,"title":"Teals Prairie & Co. | Specialty Gift Engravers ","announcement":"You see, all products are personalized with initials, graphics or anything you want. There is no setup or engraving fee. To personalize, at checkout in &quot;Notes to Seller&quot; type instructions and if you&#39;re including a graphic, provide an online link or e-mail it when we contact you. ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Our current production time is 1 week in addition to the listed production time, excluding shipping time. We will return to our regular production schedule Feb. 14, 2016. Thank you!\r\n\r\nSTOP: support@tealsprairieco.zendesk.com\r\n\r\nSTOP: PLEASE CHECK YOUR SHIPPING ADDRESS, IF INCORRECT, PLEASE NOTIFY US IMMEDIATELY. PACKAGES SHIPPED TO  THE WRONG ADDRESS WILL NOT BE REPRODUCED. WE WILL RE-SHIP AT YOUR EXPENSE ONCE THE PACKAGE HAS RETURNED. WE ARE NOT RESPONSIBLE FOR PACKAGES SHIPPED TO THE WRONG ADDRESS.  \r\n\r\nSTOP: WE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED 2 WEEKS FROM ORDER TO DELIVERY. \r\n\r\nPlease email support@tealsprairieco.zendesk.com for after-sales support. Include order # in subject line. But first, here are our top 4 FAQs.\r\n\r\nQUESTION: WHERE IS MY ORDER?\r\n\r\nreply: you see, if you placed an orders and within 36 hours (excluding weekends) you did NOT hear from us by email with proofs to confirm or additional questions, this means we understood your customization request and put the order immediately into production. from order to delivery, we need 7 - 10 business days. tracking numbers are automatically emailed; however some email servers reject these emails, in which case, we apologize for the inconvenience, but kindly ask that you be patient until the 10 business days delivery time has expired before contacting us by email for an update. CHECK YOUR SPAM FOLDER \r\n\r\nNote: 95% of the time orders placed by Thursday are delivered by that following Friday. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\n\r\nQUESTION: MY ORDER ARRIVED BROKE, ENGRAVED WRONG, ETC. WHAT&#39;S NEXT?\r\n\r\nreply: you see, we always and without question replace broken, incorrectly engraved items, free of charge, so please don&#39;t worry. just email us, let us know exactly what needs to be replaced along with a few supporting images (if convenient). typically speaking, lead-time for replacements are the same as the original order. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I FORGOT TO LEAVE PERSONALIZATION DETAILS \r\n\r\nreply: you see, just send those details to the email address above with order # in subject line. we do not ship blank, non-personalized items. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I NEED TO CHANGE MY SHIPPING ADDRESS \r\n\r\nreply: you see, as long as the order hasn&#39;t shipped, we can change the shipping address. simply email the shipping address with order # in subject line. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nWe appreciate your business. \r\n\r\nTeals Prairie & Co.\r\nsupport@tealsprairieco.zendesk.com","digital_sale_message":null,"last_updated_tsz":1460684293,"listing_active_count":2074,"digital_listing_count":0,"login_name":"TealsPrairie","accepts_custom_requests":false,"policy_welcome":"Keep it affordable. ","policy_payment":"Paypal only.\r\n\r\n","policy_shipping":"FOR INTERNATIONAL DELIVERIES, WE ARE NOT RESPONSIBLE FOR DUTIES AND TAXES COLLECTED BY YOUR COUNTRY&#39;S CUSTOM OFFICE. THESE ARE NOT INCLUDED IN YOUR SHIPPING COST. \r\n\r\nWE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED  7 BUSINESS DAYS. ","policy_refunds":"No refunds on customized items; however if you get the item damaged to a point that it cannot be used, we will redo and reship at our cost. If the item is damaged, e.g. scratched, but still can be used, we&#39;ll come up with a reasonable settlement.\r\n\r\n","policy_additional":"Owing to the sudden growth of our international business (thank you Etsy!), the brother in our team has opened a very, very little work shop in Hong Kong. This effort not only moves us closer to some of our suppliers, but also allows us to ship international orders to Australia, Singapore, Japan, etc. including much of Europe, South America... cheaper and faster. \r\n\r\nNorth American customers, mainly USA and Canada, will not be affected by this addition, for you good folks, it&#39;s business as usual: engraved and shipped from Houston, Texas. Yee Haw!\r\n\r\nThis concept looked good on paper, let&#39;s hope it pays off- wish us luck!\r\n\r\nLastly, for items with multiple colors, for example journals, since our suppliers cannot keep accurate stock levels, we may substitute your purchase with the same product in a different stocked color. \r\n  \r\nImportant Notes:\r\n\r\n*Expedited orders, large orders or orders with not stock in the USA will come from our Hong Kong shop. We reserve the right to ship from either shops. \r\n\r\n*Ordering samples before a large order is prudent; however owing to the nature of our business, we cannot guarantee a sample and the final production will look &quot;exactly&quot; alike as we have different machinist and many machines that all engrave / print slightly different. If getting &quot;exact&quot; is critical, please let us know at order so we can find the previous order documents and make sure we use the same machinist to engrave the order. We may request a visual photo of the sample for a final reference.   \r\n","policy_seller_info":"PO Box 1538\r\nFresno, TX 77545\r\n1-800-925-7044","policy_updated_tsz":1455255726,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TealsPrairie?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/030/0/8057725/iusb_760x100.14286491_ae7v.jpg","num_favorers":22229,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/105/0/8057725/isla_fullxfull.18388728_dhqi44v9.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":263385656,"state":"active","user_id":56534071,"category_id":68887494,"title":"Personalized Whiskey Stones, Groomsmen Gift, Engraved Whiskey Stones, Custom Whiskey Stones, Wedding Gift, Stainless Steel Cubes","description":"These personalized quintessential whiskey stones will make a stylish luxurious present for a wedding, birthday, or groomsmen party. Cubes with engraved logos are wonderful corporate gifts for your VIP business partners. The whiskey stones can serve as an addition to the main gift-a bottle of good whiskey- or be presented on its own.\n\nNOTE: See all designs on the last picture.\n\nComes in an individual black velvet bag.\n\nSize: 1&quot;\n\n&quot;HOW TO ORDER&quot; \n1. Use the drop down menu on the right to select the quantity and design.\n2. Select “Add to Cart.”\n3. Please indicate what you would like to appear on the cubes using the &#39;NOTES&#39; section. The information you enter will be engraved exactly as you write it out.\n4. Enter a valid shipping address for the completion of the order. If you are sending the board directly to the gift recipient, please submit their address instead. If you are sending items to several recipients please place separate orders, as per address.\n5. Please look over the text you wish to have engraved for spelling errors! Feel free to contact us with any questions or concerns you may have.\n\n&quot;PERSONALIZATION&quot;\nPlease indicate: \n(Example) GMH or AD or W\n\n&quot;LEAD TIME&quot;\nWe will process and ship your order withing 3-7 business days that it comes in.\nWe also offer RUSH ORDER (1 day turnaround) for an additional charge, so please go to RUSH ORDER service: https://www.etsy.com/listing/212033089/rush-order-option-fast-turnaround-24?ref=shop_home_active_17","creation_tsz":1460681057,"ending_tsz":1471221857,"original_creation_tsz":1452443543,"last_modified_tsz":1460681057,"price":"17.00","currency_code":"USD","quantity":958,"tags":["groomsmen gift","whiskey stones","stainless steel cube","personalizaed stones","whiskey glasses","wedding gift","best man gift","whiskey rocks","holiday gift","gift for men","monogram","custom whiskey stone","engraved stones"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["Stainless Steel","Velvet Bag","Personalization"],"shop_section_id":16377314,"featured_rank":3,"state_tsz":1459259297,"url":"https://www.etsy.com/listing/263385656/personalized-whiskey-stones-groomsmen?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":662,"num_favorers":62,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":901020610,"hex_code":"6F6E6F","red":111,"green":110,"blue":111,"hue":300,"saturation":0,"brightness":43,"is_black_and_white":false,"creation_tsz":1452443543,"listing_id":263385656,"rank":1,"url_75x75":"https://img0.etsystatic.com/126/1/10301637/il_75x75.901020610_fw7g.jpg","url_170x135":"https://img0.etsystatic.com/126/1/10301637/il_170x135.901020610_fw7g.jpg","url_570xN":"https://img0.etsystatic.com/126/1/10301637/il_570xN.901020610_fw7g.jpg","url_fullxfull":"https://img0.etsystatic.com/126/1/10301637/il_fullxfull.901020610_fw7g.jpg","full_height":650,"full_width":650},{"listing_image_id":901020608,"hex_code":"7C7B7D","red":124,"green":123,"blue":125,"hue":270,"saturation":1,"brightness":49,"is_black_and_white":false,"creation_tsz":1452443543,"listing_id":263385656,"rank":2,"url_75x75":"https://img0.etsystatic.com/125/0/10301637/il_75x75.901020608_hwbp.jpg","url_170x135":"https://img0.etsystatic.com/125/0/10301637/il_170x135.901020608_hwbp.jpg","url_570xN":"https://img0.etsystatic.com/125/0/10301637/il_570xN.901020608_hwbp.jpg","url_fullxfull":"https://img0.etsystatic.com/125/0/10301637/il_fullxfull.901020608_hwbp.jpg","full_height":650,"full_width":650},{"listing_image_id":901020606,"hex_code":"616262","red":97,"green":98,"blue":98,"hue":180,"saturation":1,"brightness":38,"is_black_and_white":false,"creation_tsz":1452443543,"listing_id":263385656,"rank":3,"url_75x75":"https://img0.etsystatic.com/124/0/10301637/il_75x75.901020606_ggl2.jpg","url_170x135":"https://img0.etsystatic.com/124/0/10301637/il_170x135.901020606_ggl2.jpg","url_570xN":"https://img0.etsystatic.com/124/0/10301637/il_570xN.901020606_ggl2.jpg","url_fullxfull":"https://img0.etsystatic.com/124/0/10301637/il_fullxfull.901020606_ggl2.jpg","full_height":650,"full_width":650},{"listing_image_id":900779709,"hex_code":"6E6E6E","red":110,"green":110,"blue":110,"hue":0,"saturation":0,"brightness":43,"is_black_and_white":false,"creation_tsz":1452443543,"listing_id":263385656,"rank":4,"url_75x75":"https://img1.etsystatic.com/115/0/10301637/il_75x75.900779709_8m0l.jpg","url_170x135":"https://img1.etsystatic.com/115/0/10301637/il_170x135.900779709_8m0l.jpg","url_570xN":"https://img1.etsystatic.com/115/0/10301637/il_570xN.900779709_8m0l.jpg","url_fullxfull":"https://img1.etsystatic.com/115/0/10301637/il_fullxfull.900779709_8m0l.jpg","full_height":762,"full_width":1000},{"listing_image_id":901021106,"hex_code":"212121","red":33,"green":33,"blue":33,"hue":0,"saturation":0,"brightness":12,"is_black_and_white":null,"creation_tsz":1452443543,"listing_id":263385656,"rank":5,"url_75x75":"https://img0.etsystatic.com/134/0/10301637/il_75x75.901021106_e4hn.jpg","url_170x135":"https://img0.etsystatic.com/134/0/10301637/il_170x135.901021106_e4hn.jpg","url_570xN":"https://img0.etsystatic.com/134/0/10301637/il_570xN.901021106_e4hn.jpg","url_fullxfull":"https://img0.etsystatic.com/134/0/10301637/il_fullxfull.901021106_e4hn.jpg","full_height":760,"full_width":829}],"Shop":{"shop_id":10301637,"shop_name":"MWgiftshop","user_id":56534071,"creation_tsz":1416533802,"title":"Cake Toppers, Personalized Cutting Boards, Wedding Gift","announcement":"Cake Topper, Cutting Board, Wedding Gifts, Personalized Gifts, Groomsmen Gifts, Bridesmaid Gifts, Ring Bearer Gifts, Birthday Gift, Anniversary Gift, Graduation Gift, Corporate Gift, Personalized Beer Glass, Custom Beer Glass, Custom Wine Glass, Personalized Wine Glass, Wine Glass, Beer Glass, Pilsner Beer Glass, Personalized Hanger, Custom Hanger, Monogram, Baseball, Mini Bat, Pocket Knife, Personalized Pocket Knife, Engraved Knife, Custom Pocket Knife, Flask, Personalized Flask, Custom Flask, Groomsmen Flask, Bridesmaid Flask, Pink Flask, Personalized Wood Pen, Custom Mirror, Glass Sign, Bowling Pins, Wedding Party Gift, Christmas Gift, Holiday Gift, New Year Gift, Hanukkah Gift, Valentine Day Gift, ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you very much for shopping at MW Gift Shop. We deeply appreciate your recent purchase. Please be assured that we&#39;ll do everything we can to make your  shopping experience at our store fantastic and memorable. Your satisfaction and feedback are very important to us because we value each and every client and make sure you get what you pay for and even more. At MW Gift Shop we truly care about you and are always open to the two-way conversation to ensure your satisfaction with our product.","digital_sale_message":null,"last_updated_tsz":1460681057,"listing_active_count":290,"digital_listing_count":0,"login_name":"mwgiftshop","accepts_custom_requests":true,"policy_welcome":"MW Gift Shop is owned by Magic Wood Shop and specializes mostly in stylish, tasteful and elegant Personalized Laser Engraved Cutting Boards and Custom Made Cake Toppers. Other personalized laser engraved gifts are also available to make any occasion one of a kind. We carry a large assortment of wedding gifts including Personalized Flasks, Monogrammed Beer and Wine Glasses, Customized Hangers, and much more. Wide selection of Personalized Laser Engraved Gifts is also available for Holidays and Theme Parties.\r\nWe are open to your suggestions and ideas and work hard to make your vision of the unique gift design come true.","policy_payment":"We accept all major credit and debit cards; Visa, Master Card, American Express, Discovery.\n\nAlso we accept PayPal.\n\nNew York Residents will be charged States Sales Tax in amount of 8.875% upon checkout.","policy_shipping":"TURNAROUND\r\nWe are working hard to have your order shipped out as soon as possible. Please note that it will not always be on the same day the order was placed. Depending on our work load, the processing time may vary from 1 to 10 business days. Feel free to contact us if you would like to find out the lead time for a specific item you are interested in. \r\n\r\nDOMESTIC SHIPPING\r\nWe use USPS First Class, USPS Priority mail, and FedEx Ground shipping destinations within the US. The amount of time it takes to receive the delivery depends on the carrier. Unfortunately, once the order leaves our workshop, we have no control over their accuracy or delays in shipping. You can find the estimated time for delivery on the carrier website.\r\n\r\nPlease make sure to you specified correct shipping address before completing check out as this is the exact address we will ship your order to.\r\n\r\nINTERNATIONAL SHIPPING\r\nAll international orders are shipped via USPS First Class Mail. Please note that you won’t be able to track your package once it leaves the U.S. using USPS tracking number provided. Delivery time varies by destination and depends on foreign Customs processing time. We are not responsible for lost, stolen, or damaged during the shipment items. Please be advised that all packages are insured. If you received damaged item, please contact us for further instructions on how to receive your compensation.\r\n \r\nCUSTOMS CHARGES\r\nIt is the customers responsibility to contact the local customs, the courier office regarding any additional and applicable customs, duties, or Vat charges.\r\n \r\nIf you have any questions or concerns, please do not hesitate to contact us.","policy_refunds":"REFUNDS AND EXCHANGES\r\nAll personalized item sales are final and  not subjects to refund or exchange. Please make sure that you provided us all order details and correctly entered all information before completing your purchase. Please be advised that all packages are insured. If you received damaged item, please contact us for further instructions on how to receive your compensation.\r\nNOTE: Please remember to doublecheck your spelling as the wording will appear on the item exactly as you wrote it out when placing the order. We won&#39;t be responsible for incorrect spelling unless due to our negligence. The customer will have to pay again if he/she wants us to make another item with correct spelling.\r\n\r\nORDER CANCELLATION\r\nPLEASE NOTE WE WILL CANCEL YOUR ORDER IF YOU HAVEN&#39;T SUBMITTED DESCRIPTION AND FAILED TO RESPOND TO OUR MESSAGE REGARDING YOUR ORDER DESCRIPTION.","policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":1459729943,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/MWgiftshop?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/072/0/10301637/iusb_760x100.15927415_15o3.jpg","num_favorers":363,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/076/0/10301637/isla_fullxfull.15924015_q2xw74uu.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":271537708,"state":"active","user_id":80430300,"category_id":69201265,"title":"Jack Daniels Whiskey Black Racerback Tank Top Cute Summer Tank Womens","description":"Jack Daniels Whiskey Racerback Womens Tank Top\n\nGreat Summer Tank for any one who loves whiskey!\nSoft and comfy longer length  tank top.\n\n30 singles for extreme softness\n50% cotton/50% Polyester, 4.9 oz.\nSizes: S, M, L, XL, 2XL\n\nAlso available in unisex sizes","creation_tsz":1460680931,"ending_tsz":1471221731,"original_creation_tsz":1457506447,"last_modified_tsz":1460680931,"price":"18.95","currency_code":"USD","quantity":4,"tags":["racerback","summer tank","summer top","gift for her","vacation top","fun tank","jack daniels","tank top","whiskey tank","country festival","jack daniels top","whiskey friskey"],"category_path":["Clothing","Women","Tank"],"category_path_ids":[69150353,69152559,69201265],"materials":[],"shop_section_id":18419405,"featured_rank":null,"state_tsz":1460620325,"url":"https://www.etsy.com/listing/271537708/jack-daniels-whiskey-black-racerback?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1674,"num_favorers":221,"shipping_template_id":null,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"women","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":558,"taxonomy_path":["Clothing","Women's Clothing","Tops & Tees","Tanks"],"used_manufacturer":false,"Images":[{"listing_image_id":936354251,"hex_code":"696668","red":105,"green":102,"blue":104,"hue":320,"saturation":2,"brightness":41,"is_black_and_white":false,"creation_tsz":1457506448,"listing_id":271537708,"rank":1,"url_75x75":"https://img1.etsystatic.com/106/1/12347769/il_75x75.936354251_i9jm.jpg","url_170x135":"https://img1.etsystatic.com/106/1/12347769/il_170x135.936354251_i9jm.jpg","url_570xN":"https://img1.etsystatic.com/106/1/12347769/il_570xN.936354251_i9jm.jpg","url_fullxfull":"https://img1.etsystatic.com/106/1/12347769/il_fullxfull.936354251_i9jm.jpg","full_height":1250,"full_width":1000}],"Shop":{"shop_id":12347769,"shop_name":"FeyonceShop","user_id":80430300,"creation_tsz":1452740886,"title":null,"announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1460680931,"listing_active_count":32,"digital_listing_count":0,"login_name":"mauricedre","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":0,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/FeyonceShop?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":83,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/127/0/12347769/isla_fullxfull.17768133_aoslsm5f.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":260447585,"state":"active","user_id":18007223,"category_id":68887312,"title":"Wheel Thrown Cup","description":"A mid-sized cup thrown on the wheel with a white stoneware clay. Before firing, I carved a pattern into the clay and inlaid the lines with a black stain. The glazes are celadons in varying shades of blue. \n\nHandle with love. Dishwasher and microwave safe.","creation_tsz":1460680828,"ending_tsz":1471221628,"original_creation_tsz":1450056667,"last_modified_tsz":1460680828,"price":"25.00","currency_code":"USD","quantity":1,"tags":["Celadon","tumbler","whiskey cup","wine cup","cup","handmade","Pottery","Wheel Thrown","Mishima","Handmade Pottery","pattern","ceramic","modern"],"category_path":["Art"],"category_path_ids":[68887312],"materials":["Wheel Thrown","White Stoneware","Underglaze","Mishima","Celadon","Glaze","Clay"],"shop_section_id":17962416,"featured_rank":null,"state_tsz":1450056667,"url":"https://www.etsy.com/listing/260447585/wheel-thrown-cup?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":67,"num_favorers":1,"shipping_template_id":19814251034,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":"24","item_weight_units":null,"item_length":"5","item_width":"5","item_height":"5","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":6096,"taxonomy_path":["Art & Collectibles","Fine Art Ceramics"],"used_manufacturer":false,"Images":[{"listing_image_id":888446048,"hex_code":"967F6C","red":150,"green":127,"blue":108,"hue":27,"saturation":28,"brightness":58,"is_black_and_white":false,"creation_tsz":1450056668,"listing_id":260447585,"rank":1,"url_75x75":"https://img0.etsystatic.com/125/0/8242409/il_75x75.888446048_4mf7.jpg","url_170x135":"https://img0.etsystatic.com/125/0/8242409/il_170x135.888446048_4mf7.jpg","url_570xN":"https://img0.etsystatic.com/125/0/8242409/il_570xN.888446048_4mf7.jpg","url_fullxfull":"https://img0.etsystatic.com/125/0/8242409/il_fullxfull.888446048_4mf7.jpg","full_height":1125,"full_width":1500},{"listing_image_id":888446062,"hex_code":"A19386","red":161,"green":147,"blue":134,"hue":29,"saturation":16,"brightness":63,"is_black_and_white":false,"creation_tsz":1450056668,"listing_id":260447585,"rank":2,"url_75x75":"https://img0.etsystatic.com/132/0/8242409/il_75x75.888446062_s42z.jpg","url_170x135":"https://img0.etsystatic.com/132/0/8242409/il_170x135.888446062_s42z.jpg","url_570xN":"https://img0.etsystatic.com/132/0/8242409/il_570xN.888446062_s42z.jpg","url_fullxfull":"https://img0.etsystatic.com/132/0/8242409/il_fullxfull.888446062_s42z.jpg","full_height":1125,"full_width":1500}],"Shop":{"shop_id":8242409,"shop_name":"RachelsClay","user_id":18007223,"creation_tsz":1443630822,"title":"Rachel&#39;s Clay","announcement":"Handmade in St. Augustine, FL. Thanks for stopping by! ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for your purchase! Don&#39;t hesitate to email me with questions or requests. ","digital_sale_message":null,"last_updated_tsz":1460680828,"listing_active_count":11,"digital_listing_count":0,"login_name":"rachelchild","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":0,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/RachelsClay?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/102/0/8242409/iusb_760x100.16637121_9hhy.jpg","num_favorers":37,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/103/0/8242409/isla_fullxfull.16635827_k62clhrh.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":257460689,"state":"active","user_id":38922519,"category_id":69150425,"title":"SALE! 3 Liter Oak Barrel- Build A Barrel- Select Font- Select Image- Select Layout- Create Your Own Design- Custom Design- Barrel Builder","description":"3 Liter Custom Oak Barrel. Create your own design by selecting a font, layout and image. Hundreds of unique possibilities! FREE SHIPPING WITHIN THE CONTINENTAL USA! Worldwide Shipping Available! (See exclusions). Refer to 2nd image above for image, layout and font options. Refer to 3rd image for hoop options. 4th image is a sample of what you can create.\n\n✩Stand, Bung and Spigot are included.✩\n\n☞BUILD YOUR OWN DESIGN----WE WE NEED FROM YOU☟\n❶ Image (Select from drop down menu~ See image above for reference) \n❷ Layout (Select from drop down menu~ See image above for reference)\n❸ Font Selection (See image above for selections)\n❹ Hoop Style- Select from Black or Steel (Enter in Note To Seller During Checkout)\n❺ Finish- Select Finished or Unfinished (Enter In Note To Seller During Checkout)\n✪PERSONALIZATION:\nENTER IN NOTE TO SELLER AREA DURING CHECKOUT, ALONG WITH YOUR HOOP PREFERENCE AND FINISH PREFERENCE.\n\nCLEANING KITS: https://www.etsy.com/listing/169199812/care-and-cleaning-kits-for-your-custom?ref=shop_home_active&ga_search_query=CLEANING\n\nNEED YOUR BARREL IN A HURRY? ADD RUSH OPTIONS:\nWe offer Rush Production and/or Rush Shipping options. Please be sure to see shop banner for production and cutoff times and add one or both options, depending on what you need. Rush shipping can be selected during checkout. Rush production can be added here: https://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=RUSH Not sure what you will need, please contact us.\n\n\n\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\n☟☟☟☟☟☟☟☟☟☟ PRODUCT & OFFER DESCRIPTIONS ☟☟☟☟☟☟☟☟☟☟☟☟\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\n\n✪LAYOUT OPTIONS:\nONE LINE: One single line (can be name or other)- no image. \nTOP LINE/BOTTOM LINE: Two lines of text-no image.\nTOP CURVE/G/LOWER: Top curve/Graphic/Lower Straight\nTOP/G/LOWER CURVE: Top curve/Graphic/Lower Curve\nG/LOWER: Graphic/Lower\nTOP/G: Top Line/Grahic Image\nTOP CURVE/G: Top curve/Graphic Image\nTOP CURVE/G/EST/LOWER: Top curve/Graphic/Est/Lower line\nAS SHOWN: This is the layout shown in sample image.\nMONOGRAM: You can enter a monogram up to 4 letters. Just enter the initials in the exact order you want engraved. We do not make monogram assumptions, so please be sure to enter ONLY INITIALS for this option&#39;s personalization in the order you want.\n\n✪FINISH AND HOOP OPTIONS:\n-Unfinished/Steel: Unfinished Barrel with Steel Hoops\n-Finished/Steel: Finished barrel with Steel Hoops\n-Unfinished/Black: Unfinished Barrel with Black Hoops\n-Finished/Black: Finished barrel with Black Hoops\n-Unfinished/Brass: Unfinished Barrel with Brass Hoops\n-Finished/Brass: Finished Barrel with Brass Hoops\nWHAT’S THE DIFFERENCE? Finished barrels will have a few light coats of a clear, water based finish applied to them. Unfinished barrel will not have this finish applied. Steel hoops are steel. Black hoops are steel hoops coated in black.\n\n✪ RUSH PRODUCTION & RUSH SHIPPING OPTIONS: To be fair to all customers, we offer standard and rush options to all customers. Unless rush production has been ordered, all orders are produced in the order in which they are received to be fair to all customers. Upgrading shipping will expedite your shipping. Adding a rush production will place your order into the rush production queue ahead of the line. You can select one or both options based on what you need and one is not required to purchase the other. Requesting rush options in the note to seller area will not expedite your order unless you have added a rush to your order. We had to implement this policy to be fair to all customers since 85% of customers ordering have a specific date in mind that they&#39;d like their order. All current production times, order cutoff dates, etc. are all posted in the shop banner. \n\n✪ BARREL DIMENSIONS:\n1 Liter 6.5 x 4.5 x 4.5 inches \n2 Liter 7.5 x 5 x 5 inches  \n3 Liter 8.5 x 5.5 x 5.5 inches  *This listing is for a 3 liter barrel.\n5 Liter 9.5 x 6.5 x 6.5 inches \n10 Liter 12 x 8 x 8 inches\n20 Liter 15 x 10.5 x 10.5 inches\n*DIMESIONS ABOVE DO NOT INCLUDE STAND HEIGHT AND WIDTH. If needing to fit within a specific space, please contact us and we can provide measurements including the stand. Although it doesn&#39;t seem like there is a great difference in sizes, a 1 liter will hold an entire liter more and so on. Larger barrels also come with larger stands to ensure everything looks proportionate.\n\n✪FREE SHIPPING PROMOTION:\nFree Standard Domestic Shipping within the Continental USA only. Excludes orders shipping to AK, HI, PR or internationally, as shipping is higher to ship to these locations. Excludes all expedited options. We reserve the right to ship the most economical way, (most often USPS 1st class) and therefore cannot guarantee a specific delivery date. If ordering multiple items, we may split your order into multiple shipments to reduce shipping costs. \n\n✪ ENGRAVING INFO:\nWhen submitting your own design, please make sure your design is complete with all text and/or imagery present. Remember what you submit IS what gets engraved.\n\n✪ INTERNATIONAL ORDERS:\nWe ship to most destinations worldwide! Please be aware that if we are unable to ship to your location, we will notify you, cancel your order and refund you in full. Shipping calculation errors may occur with international shipping on Etsy that are out of our control and we accept no responsibility for these errors. If ordering multiple items, we reserve the right to ship in multiple packages to reduce shipping costs. We reserve the right to use other carriers other than USPS if it is more cost effective and the lowest shipping shown is always for the most economical shipping option available regardless of what method is stated during checkout. In the event shipping is much higher than shown we will contact you and offer to invoice for the difference or cancel your order. If you decide to cancel, we will issue you a full refund. We want to continue to offer international shipping, so thank you for your understanding.\n\nPlease be sure we have all information needed to create your one of a kind barrel. If we do not receive all necessary information to create your custom barrel, your order will be placed on hold so we can contact you. Please be sure to include all info~ we really want you to love your custom barrel! \n\n☎ Have Questions or need help creating your customized barrel? Please read through the options and if no answer- feel free to contact us and we will be happy to assist you :) Thank you for your business!","creation_tsz":1460680826,"ending_tsz":1471221626,"original_creation_tsz":1448264307,"last_modified_tsz":1460680826,"price":"94.95","currency_code":"USD","quantity":9,"tags":["custom barrel","barrel design","barrel builder","build a barrel","3 liter","barrel","barrel designer","personalized barrel","whiskey","whisky","bourbon","tequila","rum"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["create your own barrel design","select layout","select font","selection graphic image","enter personalization in note to seller","enter font in note to seller","enter finish in note to seller","enter hoop option in note to seller","barrel builder","build a design barrel","finished or unfinished barrel","steel or black hoops","american white oak"],"shop_section_id":14695743,"featured_rank":null,"state_tsz":1448264307,"url":"https://www.etsy.com/listing/257460689/sale-3-liter-oak-barrel-build-a-barrel?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":64,"num_favorers":1,"shipping_template_id":18734801693,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"80","item_weight_units":null,"item_length":"8.5","item_width":"5.5","item_height":"5.5","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1862,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Drinkware"],"used_manufacturer":false,"Images":[{"listing_image_id":874102787,"hex_code":"B0998A","red":176,"green":153,"blue":138,"hue":24,"saturation":21,"brightness":69,"is_black_and_white":false,"creation_tsz":1448264307,"listing_id":257460689,"rank":1,"url_75x75":"https://img1.etsystatic.com/134/0/8795606/il_75x75.874102787_rcei.jpg","url_170x135":"https://img1.etsystatic.com/134/0/8795606/il_170x135.874102787_rcei.jpg","url_570xN":"https://img1.etsystatic.com/134/0/8795606/il_570xN.874102787_rcei.jpg","url_fullxfull":"https://img1.etsystatic.com/134/0/8795606/il_fullxfull.874102787_rcei.jpg","full_height":1000,"full_width":908},{"listing_image_id":525205169,"hex_code":"AFAEAE","red":175,"green":174,"blue":174,"hue":0,"saturation":0,"brightness":68,"is_black_and_white":null,"creation_tsz":1448264307,"listing_id":257460689,"rank":2,"url_75x75":"https://img1.etsystatic.com/037/0/8795606/il_75x75.525205169_n01z.jpg","url_170x135":"https://img1.etsystatic.com/037/0/8795606/il_170x135.525205169_n01z.jpg","url_570xN":"https://img1.etsystatic.com/037/0/8795606/il_570xN.525205169_n01z.jpg","url_fullxfull":"https://img1.etsystatic.com/037/0/8795606/il_fullxfull.525205169_n01z.jpg","full_height":1500,"full_width":474},{"listing_image_id":874096999,"hex_code":"776748","red":119,"green":103,"blue":72,"hue":40,"saturation":39,"brightness":46,"is_black_and_white":false,"creation_tsz":1448264307,"listing_id":257460689,"rank":3,"url_75x75":"https://img1.etsystatic.com/120/0/8795606/il_75x75.874096999_c0kz.jpg","url_170x135":"https://img1.etsystatic.com/120/0/8795606/il_170x135.874096999_c0kz.jpg","url_570xN":"https://img1.etsystatic.com/120/0/8795606/il_570xN.874096999_c0kz.jpg","url_fullxfull":"https://img1.etsystatic.com/120/0/8795606/il_fullxfull.874096999_c0kz.jpg","full_height":588,"full_width":476},{"listing_image_id":525209477,"hex_code":"C39F82","red":195,"green":159,"blue":130,"hue":27,"saturation":33,"brightness":76,"is_black_and_white":false,"creation_tsz":1448264307,"listing_id":257460689,"rank":4,"url_75x75":"https://img1.etsystatic.com/035/1/8795606/il_75x75.525209477_e92e.jpg","url_170x135":"https://img1.etsystatic.com/035/1/8795606/il_170x135.525209477_e92e.jpg","url_570xN":"https://img1.etsystatic.com/035/1/8795606/il_570xN.525209477_e92e.jpg","url_fullxfull":"https://img1.etsystatic.com/035/1/8795606/il_fullxfull.525209477_e92e.jpg","full_height":1000,"full_width":908}],"Shop":{"shop_id":8795606,"shop_name":"BootlegBarrels","user_id":38922519,"creation_tsz":1384336545,"title":"Custom Oak Whiskey Barrels & Barrel Accessories","announcement":"Personalized Whiskey Barrels, Custom Barrels, Quarter Barrel Signs, Barrel Heads, Wine Coasters and Serving Trays.  WE SHIP WORLDWIDE! International orders  & P.O. Box&#39;s all require a valid phone number! ✪✪✪✪✪✪✪✪✪✪✪✪✪VIEW CURRENT PRODUCTION TIMES & SHIPPING INFO ✪✪✪✪✪✪✪✪✪✪✪✪ ✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\n\n✦✦✦✦✦✦CURRENT PRODUCTION TIMES:✦✦✦✦✦✦\nWe update all production times and stock notices here since it is not feasible to edit our hundreds of listings just for the Holidays, temporary backorders and other peak times.\nBarrels: 5-7 business days \nWedding Card Barrels: 5-7 business days\nSigns (Printed): 5-7 business days\nSigns (Engraved): 5-7 business days\nTrays: 5-7 business days\n*If you placed a full custom order that includes custom art we are creating, please allow additional time for art creation, proofing, etc. and be sure to inquire on current proofing times. We only include proofing on orders containing custom artwork and not on any other type of order to reduce proofing times. For all full custom orders, production time starts after proof is approved.\n\n✦STOCK NOTICE:✦\n*Please be sure to read our substitution policies for all OOS hoop colors if ordering near a Holiday.\n\n********************************************************************************************\n✪✪✪✪✪✪✪✪NEED IT FAST? ADD RUSH OPTIONS✪✪✪✪✪✪✪✪\n********************************************************************************************\nRUSH PRODUCTION: https://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush This option gets your order produced faster, usually within 2-3 business days.\n\nRUSH SHIPPING: All shipping is now automatically calculated by Etsy based on weight, size and shipping destination. No need to contact us for a quote, simply select what option you want during checkout.\n\n********************************************************************************************STANDARD TRANSIT TIMES BASED ON SHIPPING METHOD AND DESTINATION:\n********************************************************************************************\nCONTINENTAL USA (excludes AK, HI, PR or international destinations)\nFREE SHIPPING: 6-8 Business days-FedEx Smart Post, UPS Sure Post, Parcel Select\nPRIORITY: 2-3 business days transit\nPRIORITY EXPRESS: 1-2 Business days transit\n\nAK, HI & PR:\nFREE SHIPPING: Not offered\nPRIORITY: 3-5 Business days average\nPRIORITY EXPRESS: 2-3 business days average\n\nINTERNATIONAL DESTINATIONS:\nFREE SHIPPING: Not offered\nUSPS 1ST CLASS: 2 weeks\nPRIORITY: 6-10 Business days average\nPRIORITY EXPRESS: 3-5 business days average\n\nNOTE: Average transit times are not meant to guarantee delivery dates and are estimated transit times for many major markets. Actual number of days may vary based on origin, destination, and if internationally shipping-customs delays. We can in no way guarantee specific delivery dates with any order that must be processed through customs. \n\n✦Daily Cutoff Times:\nOrders submitted after 11 am EST may be processed on the next business day.\n\nPlease view our policy page here for FAQ&#39;s and other important information:\nhttps://www.etsy.com/shop/BootlegBarrels/policy?ref=shopinfo_policies_leftnav\n\nWe thank you for your business and hope you love your barrels :)","currency_code":"USD","is_vacation":false,"vacation_message":"We are currently updating our shop designs and products.  You may still contact us by sending us a message and may continue to place your orders at www.customsentiments.com.\r\n\r\nThank you for your patience.","sale_message":"Thank you for your purchase from our Etsy Shop, BootlegBarrels, a division of Custom Sentiments.  Leave us your feedback to receive a special coupon code to use toward your next purchase! \r\n\r\nORDERS SHIPPING INTERNATIONALLY AND TO P.O, BOX&#39;S REQUIRE A VALID PHONE NUMBER-NO EXCEPTIONS, AS THE CARRIER REQUIRES IT AND THIS IS TO PROTECT YOU. IF NO PHONE # IS PROVIDED, THIS WILL DELAY YOUR ORDER.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nPRODUCTION TIMES:\r\nWe update all production times and stock notices in the SHOP BANNER since it is not feasible to edit our hundreds of listings just for the Holidays, temporary backorders and other peak times. Please be sure to check shop banner for a list of all current production times.  Here is what was posted at time of your order:\r\n✦✦✦✦✦✦CURRENT PRODUCTION TIMES:✦✦✦✦✦✦\r\nWe update all production times and stock notices here since it is not feasible to edit our hundreds of listings just for the Holidays and other peak times.\r\nBarrels: 5-7 business days \r\nWedding Card Barrels: Backordered- due to ship end of March \r\nSigns (Printed): 7 business days\r\nSigns (Engraved): 5-7 business days\r\nTrays: 7 business days\r\n*If you placed a full custom order that includes custom art we are creating, please allow additional time for art creation, proofing, etc. and be sure to inquire on current proofing times. We only include proofing on orders containing custom artwork and not on any other type of order to reduce proofing times. For all full custom orders, production time starts after proof is approved.\r\n\r\n✦✦✦✦✦✦AVG. PRODUCTION TIMES BASED ON ORDER DAY & TIME:✦✦✦✦✦✦\r\nThe following time tables are to provide examples of when an order enters the production queue from when it is placed and not meant to be a guarantee date.  This notice is also posted in our policy page, as it does not change.                     \r\nMONDAY PRIOR TO 11a EST: Enters production queue Tuesday.\r\nMONDAY AFTER 11a EST: Enters production queue Wednesday.\r\nTUESDAY PRIOR TO 11a EST: Enters production queue Wednesday.\r\nTUESDAY AFTER 11am EST: Enters production queue Thursday.\r\nWEDNESDAY PRIOR TO 11am EST: Enters production queue Thursday.\r\nWEDNESDAY AFTER 11am EST: Enters production queue Friday.\r\nTHURSDAY PRIOR TO 11am EST: Enters production queue Friday.\r\nTHURSDAY AFTER 11am EST: Enters production queue Monday.\r\nFRIDAY PRIOR TO 11am EST: Enters production queue Monday.\r\nFRIDAY AFTER 11am EST: Enters production queue Tuesday.\r\nSATURDAY, SUNDAY OR ON A HOLIDAY OR DAY WE ARE CLOSED: Entered into system on the following business day, but enters the production queue the following day.\r\n*********************************************************************************************\r\n✪✪✪RUSH PRODUCTION & RUSH SHIPPING OPTIONS AVAILABLE✪✪✪            \r\n***********************************************************************************************\r\nRUSH PRODUCTION: This option places your order in the rush production queue (normally 2-3 business days for barrels or 3-4 for wedding card barrels). See rush production listing for current rush times. This will expedite production of your order, but will not expedite the shipping method selected at checkout.\r\n\r\nPURCHASE THIS LISTING TO ADD A RUSH PRODUCITON TO YOUR ORDER:\r\nhttps://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush\r\n*********************************************************************************************\r\n✪✪✪RUSH SHIPPING OPTIONS AVAILABLE AT CHECKOUT✪✪✪            \r\n***********************************************************************************************\r\nRush Shipping: All shipping is now automatically calculated by Etsy based on weight, size and shipping destination. No need to contact us for a quote, simply select what option you want during checkout.\r\n\r\nCONTINENTAL USA (excludes AK, HI, PR or international destinations)\r\nFREE SHIPPING: 6-8 Business days-FedEx Smart Post, UPS Sure Post, Parcel Select\r\nPRIORITY: 2-3 business days transit\r\nPRIORITY EXPRESS: 1-2 Business days transit\r\n\r\nAK, HI & PR:\r\nFREE SHIPPING: Not offered\r\nPRIORITY: 3-5 Business days average\r\nPRIORITY EXPRESS: 2-3 business days average\r\n\r\nINTERNATIONAL DESTINATIONS:\r\nFREE SHIPPING: Not offered\r\nUSPS 1ST CLASS: 2 weeks\r\nPRIORITY: 6-10 Business days average\r\nPRIORITY EXPRESS: 3-5 business days average\r\n\r\nNOTE: Average transit times are not meant to guarantee delivery dates and are estimated transit times for many major markets. Actual number of days may vary based on origin, destination, and if internationally shipping-customs delays. We can in no way guarantee specific delivery dates with any order that must be processed through customs. \r\n\r\nRequesting we rush your order in the note to seller area during checkout will not rush your order unless you have ordered a rush production. We offer the same options to all customers to be fair to all customers so we cannot make any exceptions regardless of special requests in the note section. \r\n✦Daily Cutoff Times:\r\nOrders submitted after 11 am EST may be processed on the next business day. See production schedule for more info on how/when orders are processed.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nFREE SHIPPING OFFER: \r\n*Continental USA only (excludes AK, HI, PR and international destinations). \r\n*Ships most economical-FedEx Smart Post, UPS Sure Post, Parcel Select\r\n*average transit times of 6-8 business days. \r\n*we cannot guarantee a specific delivery date when selecting this option, as we are not given a guaranteed delivery date by the carrier.\r\n*We cannot estimate your delivery date with this option, as transit time is displayed to us as &quot;varies&quot; on the carrier website(s).\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\n✦✦✦✦✦✦HOLIDAYS & CLOSURES:✦✦✦✦✦✦\r\nNew Years Eve: December 31\r\nNew Years Day: January 1\r\nMartin Luther King Day: January 18\r\nPresident&#39;s Day: February 15\r\nSt. Patrick&#39;s Day: March 17\r\nGood Friday- Easter: March 25-28 & will re-open March 29\r\nMemorial Day: May 30\r\nIndependence Day: July 4\r\nLabor Day: September 5\r\nColumbus Day: October 10\r\nHalloween: October 31\r\nVeterans Day: November 11\r\nThanksgiving: November 23-27 Will re-open Monday Nov 28 as usual\r\nChristmas: December 23-26 Will re-open Tuesday Dec 27\r\n*There may also be closures due to inclement weather or issues that are out of our control. In such event we will try to post this info as well in the shop banner.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nDESIGN OPTIONS OFFERED:\r\nWe offer blank, non-personalized templates, personalized templates and custom design options. Each listing clearly states what customization can be made (if any). By customer request, the option to order blank barrels are now on every listing so it is easier to find. To order a completely blank barrel, simply select &quot;blank barrel&quot;. Since most personalized designs are just templates and will be engraved as shown, but with your personalization copied/pasted into the template, we do not provide proofs on these designs. We only include proofs on full custom artwork orders (additional cost). This helps to keep turnaround times as quick as possible.\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\nCHANGES & CANCELLATIONS:\r\nOnce an order is received, a shipping label is created and your order is pre-labeled and entered into the production queue. Since it can be rather difficult to track down an order already in production, we ask that you please double check all information you are submitting for accuracy prior to submitting, (including personalization, shipping address, sizing, etc.). Our listings are very detailed, so generally provide quite a bit of info within the listing as well in regards to what is needed. This helps to eliminate confusion and mistakes from being made. Due to these reasons and due to many changes being requested, especially around holidays, we had to implement a no change- no cancellation policy and cannot make exceptions. If you need to make a change to the shipping address or personalization please contact us IMMEDIATELY. We can in no way guarantee the change will be made, but will make every effort to change your order for you.  Once a label has been purhcased and printed, we will not make changes to the shipping address.  In the event a cancellation is honored, there will be a $35 cancellation fee assessed. By requesting cancellation, you are agreeing to this charge. You can view our cancellation and change request policy on our policy page for more info.\r\n\r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\n✪SUBSTITUTIONS:\r\nPlease note that in very rare circumstances (usually around Christmas), we may, at our discretion, substitute for a different hoop color if the wait time for the color you ordered exceeds one week.  This is very rare, but can happen and is something that every barrel company has to deal with from time to time and therefore, this will not warrant a refund or replacement as this cannot be helped. \r\n✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪✪\r\n\r\n☎ Please feel free to contact us and we will be happy to assist you.  Either message me directly on Etsy for questions regarding your order or email me at steve.barrels@customsentiments.com.  \r\n\r\nView Our Policy Page Here: https://www.etsy.com/shop/BootlegBarrels/policy?ref=shopinfo_policies_leftnav\r\n\r\nWe hope you love your custom barrels and barrel products and wish you Happy 2016!  Cheers!","digital_sale_message":null,"last_updated_tsz":1460681234,"listing_active_count":343,"digital_listing_count":0,"login_name":"steveweissenfluh","accepts_custom_requests":true,"policy_welcome":"Welcome to our Etsy shop Bootleg Barrels!  Here you will find everything from mini barrels, perfect for Groomsman gifts and wedding parties or for use at home to full Serving Trays, Quarter Barrel Heads and Half Barrel Heads, Lazy Susan&#39;s and we even have your pooch covered with our unique and one of a kind Dog Collar Barrels!  ","policy_payment":"We accept Etsy direct checkout and PayPal. For business orders: You can also call or fax your order in toll free. Once you have placed an order, your order goes into our production queue and is produced in the order received, usually within 3-5 business days, but can take up to 1 week or more during Holidays and peak times. PLEASE CHECK SHOP BANNER FOR CURRENT PRODUCTION TIMES AND HOLIDAY CUTOFFS. ALL HOLIDAY CUTOFFS AND CURRENT PRODUCTION TIMES ARE CLEARLY POSTED IN THE SHOP BANNER SINCE THERE IS NO EASY WAY TO UPDATE EACH LISTING&#39;S TURNAROUND TIMES EVERY TIME THEY CHANGE DUE TO A HOLIDAY. \r\n","policy_shipping":"WE SHIP MOST ITEMS WORLDWIDE! A VALID PHONE NUMBER IS REQUIRED FOR ALL INTERNATIONAL ORDERS AND SHIPMENTS TO P.O. BOXES.  WE WILL NOT SHIP UNLESS THIS HAS BEEN PROVIDED, AS IT IS REQUIRED BY MOST CARRIERS.  THIS IS TO ENSURE THE CARRIER CAN CONTACT YOU SHOULD THERE BE ANY ISSUE IN DELIVERING YOUR PACKAGE.  THIS IS FOR YOUR BENEFIT AS IT HELPS PREVENT RETURNED OR UNDELIVERED PACKAGES.  \r\n\r\n✦✦✦✦✦✦ SHIPPING POLICY: ✦✦✦✦✦✦\r\nEtsy now automatically calculates our shipping on most items for us based on package weight, size and destination. Large orders or orders containing different items may be grouped into separate packages based on box dimensions and ship separately. While Etsy only uses USPS for calculated shipping, we reserve the right to use multiple carriers. We are not responsible for miscalculated shipping on Etsy. If Etsy made an error in calculating shipping on your order, we will contact you and offer the option for you to cancel your order or invoice for additional shipping due.\r\n\r\n✦✦✦✦✦✦ AVERAGE TRANSIT TIMES: ✦✦✦✦✦✦\r\nCONTINENTAL USA (excludes AK, HI, PR or international destinations)\r\nFREE SHIPPING: 6-8 Business days average\r\nPRIORITY: 2-3 business days transit\r\nPRIORITY EXPRESS: 1-2 Business days transit\r\n\r\nAK, HI & PR:\r\nFREE SHIPPING: Not offered\r\nPRIORITY: 3-5 Business days average\r\nPRIORITY EXPRESS: 2-3 business days average\r\n\r\nINTERNATIONAL DESTINATIONS:\r\nFREE SHIPPING: Not offered\r\nUSPS 1ST CLASS: 2 weeks\r\nPRIORITY: 6-10 Business days average\r\nPRIORITY EXPRESS: 3-5 business days average\r\n\r\nNote: The above stated transit times are provided by the USPS and are intended as estimated transit times only and not as a guaranteed delivery date to most major markets. We cannot be held liable for carrier delays due to inclement weather, customs delays, service interruptions or any other related issues out of our control. For shipping related issues, contact the carrier directly. We are responsible for the providing the item for shipping, but the carrier is ultimately responsible for delivery. Although we can estimate your delivery date and state average transit times, we are not the carrier and therefore in no way can we 100% guarantee your package by a specific date. We provide tracking on all orders. Please contact the carrier directly for any shipping related issues. Insurance is available at additional cost. Please contact us if you would like to insure your package. \r\n\r\n✦✦✦✦✦✦AVG. PRODUCTION TIMES BASED ON ORDER DAY & TIME:✦✦✦✦✦✦\r\nThe following time tables are to provide examples of when an order enters the production queue from when it is placed and not meant to be a guarantee date.                       \r\nMONDAY PRIOR TO 11a EST: Enters production queue Tuesday.\r\nMONDAY AFTER 11a EST: Enters production queue Wednesday.\r\nTUESDAY PRIOR TO 11a EST: Enters production queue Wednesday.\r\nTUESDAY AFTER 11am EST: Enters production queue Thursday.\r\nWEDNESDAY PRIOR TO 11am EST: Enters production queue Thursday.\r\nWEDNESDAY AFTER 11am EST: Enters production queue Friday.\r\nTHURSDAY PRIOR TO 11am EST: Enters production queue Friday.\r\nTHURSDAY AFTER 11am EST: Enters production queue Monday.\r\nFRIDAY PRIOR TO 11am EST: Enters production queue Monday.\r\nFRIDAY AFTER 11am EST: Enters production queue Tuesday.\r\nSATURDAY, SUNDAY OR ON A HOLIDAY OR DAY WE ARE CLOSED: Entered into system on the following business day, but enters the production queue the folowing day.\r\n\r\n✦✦✦✦✦✦*2015 GUARANTEED HOLIDAY DELIVERY CUTOFFS:✦✦✦✦✦✦\r\nPersonalized Non Barrel Items: DEC 8 \r\nPersonalized Barrels & Signs: DEC 10 \r\nBlank (Non Personalized) Orders: DEC 14 \r\nRUSH BARRELS FINAL DAY: DEC 22 \r\nGEOGRAPHIC FULLFILLMENT: DEC 14- DEC 22\r\nDAILY ORDER CUTOFF TIME: 11am EST\r\n\r\n*Exclusions: These guaranteed delivery times are for orders shipping within the Continental USA, (exludes AK, HI, PR and International destinations). We cannot be responsible for carrier delays due to inclement weather or other issues out of our control.  AFTER 11AM ON DEC 10, ALL ORDERS WILL REQUIRE RUSH PRODUCTION AND RUSH SHIPPING IN ORDER TO BE GUARANTEED FOR CHRISTMAS DELIVERY! IF THIS IS NOT PURCHASED, YOUR ORDER WILL BE ADDED TO THE AFTER CHRISTMAS QUEUE AND SHIP EARLY-MID JANUARY.  \r\nhttps://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush\r\n\r\n✦✦✦✦✦✦RUSH PRODUCTION AND/OR RUSH SHIPPING OPTIONS: ✦✦✦✦✦✦\r\nRush production and rush shipping options are available for an additional cost of $35/pkg. Adding a rush production to your order will place your order in the front of the line in the rush production queue on a first in-first out basis. You can add a rush production to your order here: https://www.etsy.com/listing/172997767/production-rush-get-your-barrels-goods?ref=shop_home_active_1&ga_search_query=rush \r\nRush production times are 1-2 business days during normal sales times. However, during peak times this can increase, especially during the Holidays, After DEC 10, all orders will require rush production and rush shipping in order to be received by Christmas.\r\n\r\nRush Production expedites the production process and does not include any rush shipping upgrades. If you need rush shipping, please select appropriate option during checkout. \r\n\r\nPlease do not enter requests for rush production or rush shipping in the note to seller area during checkout, as this will not expedite your order- it may delay it.  This is because all orders received are first entered into the system. Then a shipping label and a sheet detailing your personalization is printed and placed in the box. That box is then sent down the production line to be produced crossing multiple stations before finally making its way to be packed and placed in carrier pickup.  If there is notes requesting rush services but no order for those services, your order is pulled and highlighted with &quot;Contact Customer 1st&quot; and can only be entered into the system once you have purchased the requested upgrades and we have finalized your order. \r\n\r\n✦✦✦✦✦✦ RETURNED PACKAGES: ✦✦✦✦✦✦\r\nPlease be sure to check your address for accuracy PRIOR to submitting your order.  All orders are pre-labeled as they are entered into the production queue.  We charge a $25 return package fee, as well as the cost of the new shipping label to reship a package in the event it is returned to us.  International return package fees may be higher, depending on where you are located. We will then hold the package for a period of 7 days. If returned and unclaimed after 7 days the order will be forfeited, package destroyed and no refunds will be given. ","policy_refunds":"Since each item is made to order, like many of our products, we have a no return and no refund policy.  If there is damage during shipping, please alert us and contact the shipping carrier to file your claim.  If we have made an error on your barrel, please send a high quality photo to steve.barrels@customsentiments.com and be sure to reference your Etsy order number in the subject line, describing the issue.  We will review your order and if warranted, offer a free replacement.  We will then send a RMA label for the return of your defective barrel.  The return of the defective barrel is required prior to processing any free exchange.  Once received, we will send you a replacement.  All replacement&#39;s are for the same exact item only, with the same exact personalization, finish, etc. and no changes can be made to your order.\r\n\r\nORDER CHANGES OR CANCELLATIONS:\r\nPlease contact us immediately if you need to make a change to your order.  We will do our best to accomodate, but we can in no way guarantee that a change can be made.  It is important to note that once an order is received, it is pre-labeled for shipping with a note regarding personalizations and sent down the production line through several stations.  It can take hours to locate where an order is in the process, which is why we cannot accept any change requests once an order enters the production queue.  Since each item is made to order, we do not allow cancellations.  Once an order has been placed, we will not honor cancellation requests, so please make sure you want to order our products prior to placing your order.Please be sure you are ordering exactly what you want and double check all personalization entered prior to placing an order.  In the event we agree to cancel an order, there is a $35 cancellation fee assessed and you will be refunded the price paid less the cancellation fee.  This is only allowed in rare circumstances and only if the order has not entered the production queue and is not something we do often.  There is absolutely no cancellations for any custom barrel designs (artwork) as we start the design process shortly after receiving the order or for orders that are in the production queue-no exceptions. By placing your order with us, you are agreeing to these terms and conditions.\r\n\r\nDuring the Holidays, all orders are pre-labeled as they enter the production queue to keep the queue clean, prevent duplicates from being shipped and to keep everything running efficiently. Once you place an order and your order is processed we will purchase a shipping label. When we purchase your label Etsy will automatically send you a shipping notification. THIS DOES NOT MEAN YOUR ORDER SHIPPED, ONLY THAT WE PURCHASED A LABEL AND YOUR ORDER IS IN THE PRODUCTION QUEUE. Your tracking link provided will not become active until your order has been completed and picked up by the carrier. During the Holiday season we have to stick with a no change and no cancellation policy once an order has been pre-labeled and we will not make any exceptions, as this helps prevent any delays, duplicates or confusion with orders. Please be sure to check your order for accuracy prior to submitting, as we will not be able to make changes to your shipping address, your personalization, cancel an order or make any additional changes once your order has been pre-labeled and enters the production queue. \r\n\r\nPricing is subject to change without notice. We on occasion offer sales, free shipping offers, coupon codes and freebies. As with any website, a sale can be here today and gone tomorrow. If you place an order today and a sale starts tomorrow, this does not constitute a refund, just as if you were placing an order today and the price went up tomorrow we would not expect the difference.\r\n\r\nPlease note that in very rare circumstances (usually around Christmas), we may, at our discretion, substitute for a different hoop color if the wait time for the color you ordered exceeds one week.  This is very rare, but can happen and is something that every barrel company has to deal with from time to time and therefore, this will not warrant a refund or replacement as this cannot be helped. \r\n\r\nPROBLEMS WITH YOUR ORDER?\r\nPlease email order support at support@customsentiments.com, being sure to reference your Etsy Order number in the subject line of the email. A few good quality photos are required to open an exchange request. Due to the custom nature of our products, we do not offer refunds since once personalized it cannot simply be returned to stock. Please note that since wood is a natural product and not man made, there will be variations in color of wood from barrel to barrel and it may be lighter or darker than depicted in photos.  This is something that cannot be controlled for any wood product, not just barrels. Barrels are engraved using a laser and are not printed.  All true barrels will have a rivet from manufacturing- some more prominent than others no matter where ordered.   We just like to be more up front than most so you know what to expect.  Also note that the barrel rings may have a few &quot;scars&quot;, which is again perfectly normal no matter where you order a true barrel from.  The mentioned do not warrant an exchange.  Just enjoy your unique one of a kind barrel for the unique work of art it truly is and it&#39;ll love you back ;)  \r\n\r\nABANDONED ORDERS: We cannot process an order that is incomplete, not correctly entered or where additional shipping may be due due to request for upgrades in which your order will be on hold until payment has been received for the upgrade.  In the event we have questions regarding your order we will attempt to make contact with you.  If we have made reasonable effort to contact you regarding your order and we have not received a response within 60 days we will, at our discretion, treat your order as an abandoned order.  No refunds will be given and no cancellation requests accepted after 60 days from date of your order.  Since all orders need to be closed out within the Etsy system, a blank shipping notification will be sent out to close your order out after the initial 60 days wait time. \r\n\r\nNOTE: All information is given as an estimated time table and not a guaranteed date of service. We cannot be held liable for missing or incorrectly entered information or addresses entered by the customer, inclement weather or other service interruptions that cause missing, late or undelivered packages or other service interruptions that are out of our control. However, we are happy to assist and direct you the best we can should any shipping issue arise. Thank you for your understanding.\r\n\r\nWe cannot be responsible for carrier delays due to inclement weather or other issues out of our control. No refunds will be given (even for rush services), when these issues arise as we cannot prevent them, nor control them. We are not responsible for a package once it is in the carriers hands and it is up to the carrier to deliver the package once shipped. Please contact the carrier for any shipping related issues- a tracking number is provided on all orders for your convenience. We are happy to assist you in contacting the carrier when needed to resolve delivery issues within 7 days of delivery date.","policy_additional":"DESIGN PROOFS: \r\nWe get asked for design proofs A LOT.  We do not provide design proofs or photos for personalized orders using current designs.  ONLY FULLY CUSTOM designs or large corporate logo orders can request a design proof.  Proofing may be subject to a $25 proof charge so please request a custom listing if you would like to add a design proof.  Your proof includes one small revision if necessary, as well as one revised proof.  Proofs are not photographs of the actual barrel. This will be a design proof.  \r\n\r\nCan I use my OWN PHOTO OR LOGO? \r\nYes, absolutely!  We do have a few rules on this though:\r\n1) Your image must be complete and ready to engrave, meaning:\r\n  a. It must be high quality (300 dpi at product size or vector)\r\n  b. It must be 100% black and white (black is what gets engraved).\r\n  c. It cannot violate any copyright or trademarks.\r\n  d. It must be complete with all text, imagery, etc. and not need any editing on our part.  If any changes, modifications, additions or other editing is needed, there may be additional cost for this service.\r\n  \r\n2) We DO NOT accept artwork that violates any copyright or trademark.  This includes images from the web that are protected, College or Professional Sports Logos, Collegiate Logos, Brand Name Distillery Logos or quotations (including but not limited to Jack Daniels, Jameson, Jim Beam, etc.). Their logos and sayings are copyright protected and cannot be duplicated without prior written legal consent.  It is against the law and we do not knowingly infringe on any copyright. If you are wanting to use a college logo, permission is usually pretty easy to obtain from your school, but we cannot use it without their prior written permission.  Please contact us if you have any questions regarding this copyright policy. \r\n✪Custom barrels can take longer, usually around 5-7 business days (longer around Holidays). \r\n\r\n3) You need to purchase the correct listing.  For barrels, we have &quot;Design Your Own&quot; barrel listings.  Simply select the &quot;My Photo or Logo&quot; option in the drop down menu.\r\n\r\nIMAGE FORMATS ACCEPTED:\r\nSince we are designers as well, we use and are very familiar with most major deisgn programs (Illustrator, Corel Draw, Photoshop, WPC, Flexi Sign, etc.)  We accept almost any image format, (jpg, png, eps, cdr, ai, psd, pdf or wpc).  Etsy does not allow uploading of any vector images, so if you have a vector image, please email it to art@customsentiments.com, being sure to reference your Etsy order number in the email.  If you are wanting us to create something custom for you, please see below, as there is additional costs for us to create custom artwork.\r\n\r\nTO ORDER USING YOUR OWN LOGO OR DESIGN:\r\n❶Go to our Custom Products Page here:  https://www.etsy.com/shop/BootlegBarrels?section_id=14695743&ref=shopsection_leftnav_8\r\n❷ Select the listing with the size you would like (1,2,3,5, 10 or 20 liters) \r\n❸ Select the &quot;My Design or Logo&quot; option from the drop down menu.\r\n❹ Tell us what Hoop Color you want (Black or Steel)\r\n❺ Select whether you want a Finished or Unfinished barrel.\r\n❻ Email your complete artwork to art@customsentiments.com being sure to reference your Etsy Order Number in the email. If you are wanting us to create something custom, there is additional cost so please inquire prior to placing na order, tell us what you envision and we can provide a custom art quote.\r\n\r\nDO YOU OFFER CUSTOM DESIGN SERVICES?\r\nYes, we can design almost anything you can imagine!  There is an additional cost for custom designing or editing and the cost will be based on intricacy of the design and how long it will take to create.  Simply let us know what you are envisioning and we can give you a quote for your project.  Be as specific as possible in your request, (using visuals if possible) so that we can be sure your receive an accurate quote, timeline and to ensure you will be satisfied with the outcome.  Once you have placed your custom order, you will be referred to Joni, Kirsten or Leici to assist you in the design process.  You are allowed one small revision for your custom order.  Additional small revisions will be at additional cost, ($10 each).  If you decide to start completely over or your design goes into a different direction or you need a more involved edit, you will need to discuss the cost of the new design and you will be charged a new custom art fee for that new design.\r\n\r\nCAN YOU SEND ME A PHOTO OF MY ORDER: \r\nNo, Orders cannot be pulled from the production line to have photographs taken of your actual barrel prior to shipping it to you.  This is disruptive to the entire process and is not something we offer or will do.  Thank you for your understanding.\r\n\r\n====================================================================\r\n\r\n               ✪✪✪✪    BUSINESS HOURS AND HOLIDAY CLOSINGS:   ✪✪✪✪\r\nWe are open M-F 7am- 4:30pm EST and are closed on the weekends and Holidays.  Questions can still be answered on weekends and after hours when we are available.  If nobody is available, your question will be answered on the next business day.  Business days are considered M-F between business hours.  \r\n\r\nWe are closed on all major Holidays and Holiday weekends to allow for us to observe these Holidays with our families.  Although we may be able to answer questions and phone calls on occasion during these times, our stores are not open and we are not in production on the following dates (unless notated):\r\n\r\nNew Years: Dec 31st- January 1st\r\nValentine&#39;s Day: February 13th- February 16th \r\nEaster weekend: April 3rd- April 6th (Good Friday- Easter Monday)\r\nMother&#39;s Day: closed over weekend as usual\r\nFather&#39;s Day: closed over weekend as usual\r\nIndependence Day: July 3rd-6th\r\nLabor Day: Sept. 7th\r\nHalloween: closed over weekend as usual\r\nThanksgiving: November 25th-27th\r\nChristmas Eve and Christmas Day: Closed 12/23-12/29 for Christmas Break.  We will re-open 12/29 as usual. \r\n\r\nEtsy is a multi cultural site, so it does not always observe Holidays as we do.  For certain Holidays, Etsy does not seem to automatically account for Holiday closings and may cause a miscalculation in your shipping time frame around these Holidays.  We are unable to change this and unfortunately cannot help this from happening as it is an issue in the Etsy system itself.  If your order shows it will ship on one of the above dates that we are closed, it will be shipped on the next business day.  If your order is placed outside of business hours or on a weekend or Holiday, it will be entered the next business day. Thank you for understanding.\r\n\r\n\r\n*********************************************************************************************\r\n✪✪✪✪ BARREL FAQ&#39;S ✪✪✪ \r\n***********************************************************************************************\r\nWHAT SIZES DO YOU OFFER:\r\nANSWER: We offer 1, 2 ,3 ,5 ,10 and 20 liter sizes personalized.  We offer larger sizes as well, but they cannot be customized due to their size. \r\nBARREL DIMENSIONS:\r\n1 Liter   6.5 x 4.5 x 4.5 inches\r\n2 Liter   7.5 x 5 x 5 inches\r\n3 Liter   8.5 x 5.5 x 5.5 inches\r\n5 Liter   9.5 x 6.5 x 6.5 inches\r\n10 Liter  12 x 8 x 8 inches\r\n20 Liter   15 x 10.5 x 10.5 inches\r\n*DIMESIONS ABOVE DO NOT INCLUDE STAND HEIGHT AND WIDTH. If needing to fit within a specific space, please contact us and we can provide measurements including the stand.\r\n\r\n\r\nQUESTION: What&#39;s the difference between the finish and hoop color options? ANSWER: \r\nSteel Hoops are made of steel.\r\nBlack hoops are powder coated steel hoops.\r\nFinished will have a few light sprays of clear coat on it.\r\nUnfinished is simply unfinished- no clear coat\r\n✪No heavy stains, dyes or varnishes are used on these barrels so it will not affect the integrity of the barrel. Finished vs. unfinished is purely an aesthetics preference. Please note that since wood is a natural product it may be lighter or darker than depicted in photos.  Photos are of an actual barrel with designs superimposed onto the barrel. Barrels ate not printed, they are engraved using a laser burner.\r\n\r\nQUESTION: How are these made?\r\nANSWER: These are made using a laser burner, as most custom distillery grade barrels are.  It is completely normal to have darker areas around the engraved portion of your barrel caused by the laser.  This is not smudging and is meant to give your barrel it&#39;s character. Some barrels will have more than others, but that is what makes each barrel unique and no two barrels alike.  Please love and respect your custom barrels for the unique pieces of art they are and they will love you back ;)  \r\n\r\nQUESTION: What are the barrels made from?\r\nANSWER: Our barrels are made from premium quality American White Oak. The staves are air dried for two years and all barrels have a medium char.\r\n\r\nQUESTION: How do I cure the barrel?\r\nANSWER: Barrels should be cured prior to use. Start by filling the barrel with boiling or hot water and leave it to soak for 3 to 5 days. This allows the barrel to swell tightly against the hoops and ensure that the barrel doesn&#39;t leak.  Your barrel WILL leak if you have not cured it.\r\n\r\nQUESTION: Are glues or nails used to make the barrel?\r\nANSWER: No, our barrels are all hand crafted with no use of glues or nails.\r\n\r\nQUESTION: How should the barrel be stored?\r\nANSWER: Barrels are best stored in a cool damp environment such as a wine cellar. This will keep the exterior from drying out and minimize evaporation (Angels Share).  \r\n\r\nQUESTION: How many times can I use my barrel?\r\nANSWER: These are high grade barrels!  With proper care, you can use your barrel for 8 to 10 years. Following the cleaning and re-charing instructions will insure a long life for your product and be sure to not let your barrel dry out.\r\n\r\nQUESTION: I left my barrel dry for an extented time. Now it leaks... what do I do?\r\nANSWER: In many cases just re-cure the barrel. If it continues leaking, submerge the barrel in water for a couple of days. After it&#39;s been submerged, dry the exterior with a towel and fill it with water to see if it continues to leak. If so, find the leak and apply barrel wax to the hole... If you can&#39;t stop the leaking... cut in half and use as a planter!\r\n\r\nQUESTION: My barrel is rough around the edges and does not look exactly like pictured.  Is this a defect?  \r\nANSWER: No, these are made with natural wood and therefore there will always be variation in color, roughness, veining, etc.  This does not affect the functionality of your barrel and is not a defect.  This is something that every barrel company has to deal with and cannot be helped regardless of where you order from.  We just like to be more upfront about it.  In the barrel world, the uniqueness of each barrel is also what we consider it&#39;s character.  Although similar, no two barrels will ever be alike and that is what gives the barrels their character and what lends to the beauty and uniqueness of each barrel.  We suggest loving your barrel for the truly unique piece of art and it will love you back ;)\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ CLEANING FAQ&#39;S ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How often do I clean my barrel?\r\nANSWER: When aging hard spirits such as whiskey, rum or tequila, clean the barrel after two or three batches (or every 1 to 2 years). For wine, cider, liquor or other low alcohol content spirits, clean after each batch.\r\n\r\nQUESTION: How do I clean  my barrel?\r\nMULTI- STEP ANSWER:\r\n1.Dissolve the Cleaning Solution into warm water (we sell a cleaning kit for this). Fill the barrel with this cleaning solution and soak for 24 hours. Empty and rinse 3 times with hot water.\r\n2.Dissolve the Neutralizing Acid into warm water. Fill the barrel with this neutralizing solution and soak for 15 minutes. Empty and rinse the barrel 3 times with hot water.\r\n3.To re-char the barrel interior, drain the barrel for 3 hours. Place a butane torch in the bung and spigot hole and re-char the inside.\r\n\r\nIMPORTANT: To prevent the barrel from drying out and minimize the possibility of contamination, barrels should always be stored full with spirits or water with sterilizing solution.\r\n\r\n***See cleaning package directions for exact mixture quantities.\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ STORING FAQ&#39;S ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How do I store my barrel?\r\nANSWER: When storing the barrel fill the barrel with a mixture of sterilizing tablets and cool water. Fill the barrel with the solution and leave in a cool damp place until you are ready to use again.\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ AGING FAQ&#39;S ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How long do I age my spirits?\r\nANSWER: There&#39;s no formula for the perfect time to age your spirits. Age to taste! We suggest you taste your spirits every week and once aged to YOUR taste, start drinking or move it to a glass bottle to stop the aging process.  \r\n\r\nQUESTION: Do smaller barrels age the spirit faster than large barrels?\r\nANSWER: Yes... due to the greater surface or contact area ratio, small size barrels will age 5 to 10 times faster then your standard 55 gallon barrel. These means that one month in a small barrel will produce the equivalent aging to 1 to 1 1/2 years in a full size barrel.\r\n\r\n*********************************************************************************************\r\n✪✪✪✪✪✪✪✪ BOOTLEGGIN&#39; ✪✪✪✪✪✪✪✪\r\n***********************************************************************************************\r\n\r\nQUESTION: How do I get Whiskey from a bottle of Vodka, Swish or Moonshine?\r\nANSWER: When alcohol is distilled, either from potatoes, corn, fruit, grain or sugar cane, it produces Ethanol. A clear and tasteless alcohol. Distilleries then flavor and filter the alcohol to get their unique flavor. Vodka is the only alcohol you can buy in an unflavored form. When mixed with a bottle of  Barrel Premium Essence, you can recreate the taste of many of the famous brands.\r\n\r\nQUESTION: Will a more expensive Vodka produce a better tasting whiskey?\r\nANSWER: No!  We actually recommend using a cheaper Vodka such as Taaka or the like, as it will pick up the flavors better and thus have a better taste.\r\n\r\nQUESTION: Do you sell Bootleg kits?  \r\nANSWER: Yes, we do!  Simply contact us and we would be happy to assist you.\r\n","policy_seller_info":null,"policy_updated_tsz":1453389569,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/BootlegBarrels?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":609,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/120/0/8795606/isla_fullxfull.17106038_hk601ot5.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":192858122,"state":"active","user_id":32660934,"category_id":68887494,"title":"Personalized Engraved Etched Scotch Whiskey Decanter Bottle with Wood Box Groomsmen, Man Cave, Just Married, Christmas Gift for Him","description":"This glass whiskey decanter makes the perfect gift for that classic gentlemen in your life. Designed to evoke 1920s charm, this 28 oz. bottle will be cherished for generations. Great groomsmen gift, best man gift, graduation gift, 21st birthday gift. \n\nWe can engrave anything you want on these, just let us know at checkout in notes to seller. \n\nDecanter Size: 3.5&quot; x 3.5&quot; x 9&quot; \nGlasses: 8 oz. \nBox Size 11&quot; x 5&quot; x 5.5&quot; (no glasses)\nBox Size : 8&quot; x 11&quot; x 5&quot; (2 glasses)\nBox Size  11.5&quot; x 12.25&quot; x 6&quot; (4  glasses)","creation_tsz":1460680769,"ending_tsz":1471221569,"original_creation_tsz":1402628231,"last_modified_tsz":1460680769,"price":"67.50","currency_code":"USD","quantity":369,"tags":["whiskey decanter","gift for him","man cave","whiskey glass","groomsmen gift","father's day gift","personalized gift","wedding gift","gift for dad","men anniversary","best man gift","scotch decanter","scotch glass"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass","wood"],"shop_section_id":13510077,"featured_rank":null,"state_tsz":1458132755,"url":"https://www.etsy.com/listing/192858122/personalized-engraved-etched-scotch?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":82677,"num_favorers":4903,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":761279033,"hex_code":"6D4E47","red":109,"green":78,"blue":71,"hue":11,"saturation":34,"brightness":42,"is_black_and_white":false,"creation_tsz":1429697149,"listing_id":192858122,"rank":1,"url_75x75":"https://img1.etsystatic.com/065/0/8057725/il_75x75.761279033_l06e.jpg","url_170x135":"https://img1.etsystatic.com/065/0/8057725/il_170x135.761279033_l06e.jpg","url_570xN":"https://img1.etsystatic.com/065/0/8057725/il_570xN.761279033_l06e.jpg","url_fullxfull":"https://img1.etsystatic.com/065/0/8057725/il_fullxfull.761279033_l06e.jpg","full_height":600,"full_width":600},{"listing_image_id":761279099,"hex_code":"62463E","red":98,"green":70,"blue":62,"hue":13,"saturation":36,"brightness":38,"is_black_and_white":false,"creation_tsz":1429697149,"listing_id":192858122,"rank":2,"url_75x75":"https://img1.etsystatic.com/066/0/8057725/il_75x75.761279099_ahs3.jpg","url_170x135":"https://img1.etsystatic.com/066/0/8057725/il_170x135.761279099_ahs3.jpg","url_570xN":"https://img1.etsystatic.com/066/0/8057725/il_570xN.761279099_ahs3.jpg","url_fullxfull":"https://img1.etsystatic.com/066/0/8057725/il_fullxfull.761279099_ahs3.jpg","full_height":600,"full_width":600},{"listing_image_id":830675315,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1441788250,"listing_id":192858122,"rank":3,"url_75x75":"https://img1.etsystatic.com/100/0/8057725/il_75x75.830675315_lers.jpg","url_170x135":"https://img1.etsystatic.com/100/0/8057725/il_170x135.830675315_lers.jpg","url_570xN":"https://img1.etsystatic.com/100/0/8057725/il_570xN.830675315_lers.jpg","url_fullxfull":"https://img1.etsystatic.com/100/0/8057725/il_fullxfull.830675315_lers.jpg","full_height":600,"full_width":600},{"listing_image_id":830899356,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1441788250,"listing_id":192858122,"rank":4,"url_75x75":"https://img0.etsystatic.com/100/0/8057725/il_75x75.830899356_pxa8.jpg","url_170x135":"https://img0.etsystatic.com/100/0/8057725/il_170x135.830899356_pxa8.jpg","url_570xN":"https://img0.etsystatic.com/100/0/8057725/il_570xN.830899356_pxa8.jpg","url_fullxfull":"https://img0.etsystatic.com/100/0/8057725/il_fullxfull.830899356_pxa8.jpg","full_height":570,"full_width":570},{"listing_image_id":830899682,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1441788250,"listing_id":192858122,"rank":5,"url_75x75":"https://img0.etsystatic.com/100/0/8057725/il_75x75.830899682_1fok.jpg","url_170x135":"https://img0.etsystatic.com/100/0/8057725/il_170x135.830899682_1fok.jpg","url_570xN":"https://img0.etsystatic.com/100/0/8057725/il_570xN.830899682_1fok.jpg","url_fullxfull":"https://img0.etsystatic.com/100/0/8057725/il_fullxfull.830899682_1fok.jpg","full_height":570,"full_width":570}],"Shop":{"shop_id":8057725,"shop_name":"TealsPrairie","user_id":32660934,"creation_tsz":1366241465,"title":"Teals Prairie & Co. | Specialty Gift Engravers ","announcement":"You see, all products are personalized with initials, graphics or anything you want. There is no setup or engraving fee. To personalize, at checkout in &quot;Notes to Seller&quot; type instructions and if you&#39;re including a graphic, provide an online link or e-mail it when we contact you. ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Our current production time is 1 week in addition to the listed production time, excluding shipping time. We will return to our regular production schedule Feb. 14, 2016. Thank you!\r\n\r\nSTOP: support@tealsprairieco.zendesk.com\r\n\r\nSTOP: PLEASE CHECK YOUR SHIPPING ADDRESS, IF INCORRECT, PLEASE NOTIFY US IMMEDIATELY. PACKAGES SHIPPED TO  THE WRONG ADDRESS WILL NOT BE REPRODUCED. WE WILL RE-SHIP AT YOUR EXPENSE ONCE THE PACKAGE HAS RETURNED. WE ARE NOT RESPONSIBLE FOR PACKAGES SHIPPED TO THE WRONG ADDRESS.  \r\n\r\nSTOP: WE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED 2 WEEKS FROM ORDER TO DELIVERY. \r\n\r\nPlease email support@tealsprairieco.zendesk.com for after-sales support. Include order # in subject line. But first, here are our top 4 FAQs.\r\n\r\nQUESTION: WHERE IS MY ORDER?\r\n\r\nreply: you see, if you placed an orders and within 36 hours (excluding weekends) you did NOT hear from us by email with proofs to confirm or additional questions, this means we understood your customization request and put the order immediately into production. from order to delivery, we need 7 - 10 business days. tracking numbers are automatically emailed; however some email servers reject these emails, in which case, we apologize for the inconvenience, but kindly ask that you be patient until the 10 business days delivery time has expired before contacting us by email for an update. CHECK YOUR SPAM FOLDER \r\n\r\nNote: 95% of the time orders placed by Thursday are delivered by that following Friday. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\n\r\nQUESTION: MY ORDER ARRIVED BROKE, ENGRAVED WRONG, ETC. WHAT&#39;S NEXT?\r\n\r\nreply: you see, we always and without question replace broken, incorrectly engraved items, free of charge, so please don&#39;t worry. just email us, let us know exactly what needs to be replaced along with a few supporting images (if convenient). typically speaking, lead-time for replacements are the same as the original order. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I FORGOT TO LEAVE PERSONALIZATION DETAILS \r\n\r\nreply: you see, just send those details to the email address above with order # in subject line. we do not ship blank, non-personalized items. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I NEED TO CHANGE MY SHIPPING ADDRESS \r\n\r\nreply: you see, as long as the order hasn&#39;t shipped, we can change the shipping address. simply email the shipping address with order # in subject line. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nWe appreciate your business. \r\n\r\nTeals Prairie & Co.\r\nsupport@tealsprairieco.zendesk.com","digital_sale_message":null,"last_updated_tsz":1460684293,"listing_active_count":2074,"digital_listing_count":0,"login_name":"TealsPrairie","accepts_custom_requests":false,"policy_welcome":"Keep it affordable. ","policy_payment":"Paypal only.\r\n\r\n","policy_shipping":"FOR INTERNATIONAL DELIVERIES, WE ARE NOT RESPONSIBLE FOR DUTIES AND TAXES COLLECTED BY YOUR COUNTRY&#39;S CUSTOM OFFICE. THESE ARE NOT INCLUDED IN YOUR SHIPPING COST. \r\n\r\nWE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED  7 BUSINESS DAYS. ","policy_refunds":"No refunds on customized items; however if you get the item damaged to a point that it cannot be used, we will redo and reship at our cost. If the item is damaged, e.g. scratched, but still can be used, we&#39;ll come up with a reasonable settlement.\r\n\r\n","policy_additional":"Owing to the sudden growth of our international business (thank you Etsy!), the brother in our team has opened a very, very little work shop in Hong Kong. This effort not only moves us closer to some of our suppliers, but also allows us to ship international orders to Australia, Singapore, Japan, etc. including much of Europe, South America... cheaper and faster. \r\n\r\nNorth American customers, mainly USA and Canada, will not be affected by this addition, for you good folks, it&#39;s business as usual: engraved and shipped from Houston, Texas. Yee Haw!\r\n\r\nThis concept looked good on paper, let&#39;s hope it pays off- wish us luck!\r\n\r\nLastly, for items with multiple colors, for example journals, since our suppliers cannot keep accurate stock levels, we may substitute your purchase with the same product in a different stocked color. \r\n  \r\nImportant Notes:\r\n\r\n*Expedited orders, large orders or orders with not stock in the USA will come from our Hong Kong shop. We reserve the right to ship from either shops. \r\n\r\n*Ordering samples before a large order is prudent; however owing to the nature of our business, we cannot guarantee a sample and the final production will look &quot;exactly&quot; alike as we have different machinist and many machines that all engrave / print slightly different. If getting &quot;exact&quot; is critical, please let us know at order so we can find the previous order documents and make sure we use the same machinist to engrave the order. We may request a visual photo of the sample for a final reference.   \r\n","policy_seller_info":"PO Box 1538\r\nFresno, TX 77545\r\n1-800-925-7044","policy_updated_tsz":1455255726,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TealsPrairie?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/030/0/8057725/iusb_760x100.14286491_ae7v.jpg","num_favorers":22229,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/105/0/8057725/isla_fullxfull.18388728_dhqi44v9.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}}],"params":{"limit":25,"offset":0,"page":null,"keywords":"whiskey","sort_on":"created","sort_order":"down","min_price":null,"max_price":null,"color":null,"color_accuracy":0,"tags":null,"category":null,"location":null,"lat":null,"lon":null,"region":null,"geo_level":"city","accepts_gift_cards":"false","translate_keywords":"false"},"type":"Listing","pagination":{"effective_limit":25,"effective_offset":0,"next_offset":25,"effective_page":1,"next_page":2}}];exports["default"] = etsyItems;module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _etsyItems = require('./etsy-items');

var _etsyItems2 = _interopRequireDefault(_etsyItems);

console.log("hello world");

console.log(_etsyItems2['default']);

},{"./etsy-items":2,"jquery":1}]},{},[3])


//# sourceMappingURL=bundle.js.map
