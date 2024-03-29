/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var now = require( '@stdlib/time-now' );
var beta = require( '@stdlib/random-base-beta' ).factory;
var iteratorSymbol = require( '@stdlib/symbol-iterator' );
var isUint32Array = require( '@stdlib/assert-is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants-uint32-max' );
var Uint32Array = require( '@stdlib/array-uint32' );
var minstd = require( '@stdlib/random-base-minstd' );
var iterator = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof iterator, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if first shape parameter `alpha` is not a positive number', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		{},
		function noop() {},
		-0.1,
		0.0
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( value, 2.0 );
		};
	}
});

tape( 'the function throws an error if second shape parameter `beta` is not a positive number', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		{},
		function noop() {},
		-0.1,
		0.0
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, value );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'abc',
		5,
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, value );
		};
	}
});

tape( 'the function throws an error if provided an invalid `iter` option', function test( t ) {
	var values;
	var i;

	values = [
		'abc',
		-5,
		3.14,
		null,
		true,
		false,
		void 0,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'iter': value
			});
		};
	}
});

tape( 'if provided a `prng` option which is not a function, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		3.14,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'prng': value
			});
		};
	}
});

tape( 'if provided a `copy` option which is not a boolean, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'copy': value
			});
		};
	}
});

tape( 'if provided a `seed` which is not a positive integer or a non-empty array-like object, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		3.14,
		0.0,
		-5.0,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'seed': value
			});
		};
	}
});

tape( 'the function throws a range error if provided a `seed` which is an integer greater than the maximum unsigned 32-bit integer', function test( t ) {
	var values;
	var i;

	values = [
		UINT32_MAX + 1,
		UINT32_MAX + 2,
		UINT32_MAX + 3
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws a range error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'seed': value
			});
		};
	}
});

tape( 'if provided a `state` option which is not a Uint32Array, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'state': value
			});
		};
	}
});

tape( 'if provided an invalid `state` option, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		new Uint32Array( 0 ),
		new Uint32Array( 10 ),
		new Uint32Array( 100 )
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterator( 2.0, 5.0, {
				'state': value
			});
		};
	}
});

tape( 'the function returns an iterator protocol-compliant object (no seed)', function test( t ) {
	var it;
	var r;
	var i;

	it = iterator( 1.0, 1.0 );
	t.equal( it.next.length, 0, 'has zero arity' );

	for ( i = 0; i < 100; i++ ) {
		r = it.next();
		t.equal( typeof r.value, 'number', 'returns a number' );
		t.equal( typeof r.done, 'boolean', 'returns a boolean' );
	}
	t.end();
});

tape( 'the function returns an iterator protocol-compliant object (seed)', function test( t ) {
	var seed;
	var it1;
	var it2;
	var r1;
	var r2;
	var i;

	seed = now();

	it1 = iterator( 2.0, 4.0, {
		'seed': seed
	});
	it2 = iterator( 2.0, 4.0, {
		'seed': seed
	});

	t.notEqual( it1, it2, 'separate iterators' );

	for ( i = 0; i < 100; i++ ) {
		r1 = it1.next();
		r2 = it2.next();
		t.equal( r1.value, r2.value, 'both return same number' );
	}
	t.end();
});

tape( 'attached to the returned iterator is the underlying PRNG', function test( t ) {
	var it = iterator( 2.0, 5.0 );
	t.equal( typeof it.PRNG, 'function', 'has property' );

	it = iterator( 2.0, 5.0, {
		'prng': minstd.normalized
	});
	t.equal( it.PRNG, minstd.normalized, 'has property' );
	t.end();
});

tape( 'attached to the returned iterator is the generator seed', function test( t ) {
	var it = iterator( 2.0, 5.0, {
		'seed': 12345
	});
	t.equal( isUint32Array( it.seed ), true, 'has property' );
	t.equal( it.seed[ 0 ], 12345, 'equal to provided seed' );

	it = iterator( 2.0, 5.0, {
		'seed': 12345,
		'prng': minstd.normalized
	});
	t.equal( it.seed, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned iterator is the generator seed (array seed)', function test( t ) {
	var actual;
	var seed;
	var it;
	var i;

	seed = [ 1234, 5678 ];
	it = iterator( 2.0, 5.0, {
		'seed': seed
	});

	actual = it.seed;
	t.equal( isUint32Array( actual ), true, 'has property' );
	for ( i = 0; i < seed.length; i++ ) {
		t.equal( actual[ i ], seed[ i ], 'returns expected value for word '+i );
	}
	t.end();
});

tape( 'attached to the returned iterator is the generator seed length', function test( t ) {
	var it = iterator( 2.0, 5.0 );
	t.equal( typeof it.seedLength, 'number', 'has property' );

	it = iterator( 2.0, 5.0, {
		'prng': minstd.normalized
	});
	t.equal( it.seedLength, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned iterator is the generator state', function test( t ) {
	var it = iterator( 2.0, 5.0 );
	t.equal( isUint32Array( it.state ), true, 'has property' );

	it = iterator( 2.0, 5.0, {
		'prng': minstd.normalized
	});
	t.equal( it.state, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned iterator is the generator state length', function test( t ) {
	var it = iterator( 2.0, 5.0 );
	t.equal( typeof it.stateLength, 'number', 'has property' );

	it = iterator( 2.0, 5.0, {
		'prng': minstd.normalized
	});
	t.equal( it.stateLength, null, 'equal to `null`' );
	t.end();
});

tape( 'attached to the returned iterator is the generator state size', function test( t ) {
	var it = iterator( 2.0, 5.0 );
	t.equal( typeof it.byteLength, 'number', 'has property' );

	it = iterator( 2.0, 5.0, {
		'prng': minstd.normalized
	});
	t.equal( it.byteLength, null, 'equal to `null`' );
	t.end();
});

tape( 'the function returns an iterator for generating pseudorandom numbers from a beta distribution', function test( t ) {
	var rand;
	var it;
	var i;

	// Note: we assume that the underlying generator is the following PRNG...
	rand = beta( 2.0, 5.0, {
		'seed': 12345
	});

	it = iterator( 2.0, 5.0, {
		'seed': 12345
	});

	for ( i = 0; i < 1e3; i++ ) {
		t.equal( rand(), it.next().value, 'returns expected value' );
	}
	t.end();
});

tape( 'the function supports limiting the number of iterations', function test( t ) {
	var niter;
	var it;
	var r;
	var i;
	var j;

	niter = 10;

	it = iterator( 2.0, 5.0, {
		'iter': niter
	});

	for ( i = 0; i < 100; i++ ) {
		r = it.next();
		j = i + 1;
		if ( j <= niter ) {
			t.equal( typeof r.value, 'number', 'returns expected `value` value. iteration: '+j );
			t.equal( r.done, false, 'returns expected `done` value. iteration: '+j );
		} else {
			t.equal( r.value, void 0, 'returns expected `value` value. iteration: '+j );
			t.equal( r.done, true, 'returns expected `done` value. iteration: '+j );
		}
	}
	t.end();
});

tape( 'the returned iterator has a `return` method for closing an iterator (no argument)', function test( t ) {
	var it;
	var r;

	it = iterator( 1.0, 1.0 );

	r = it.next();
	t.equal( typeof r.value, 'number', 'returns a number' );
	t.equal( r.done, false, 'returns expected value' );

	r = it.next();
	t.equal( typeof r.value, 'number', 'returns a number' );
	t.equal( r.done, false, 'returns expected value' );

	r = it.return();
	t.equal( r.value, void 0, 'returns expected value' );
	t.equal( r.done, true, 'returns expected value' );

	r = it.next();
	t.equal( r.value, void 0, 'returns expected value' );
	t.equal( r.done, true, 'returns expected value' );

	t.end();
});

tape( 'the returned iterator has a `return` method for closing an iterator (argument)', function test( t ) {
	var it;
	var r;

	it = iterator( 1.0, 1.0 );

	r = it.next();
	t.equal( typeof r.value, 'number', 'returns a number' );
	t.equal( r.done, false, 'returns expected value' );

	r = it.next();
	t.equal( typeof r.value, 'number', 'returns a number' );
	t.equal( r.done, false, 'returns expected value' );

	r = it.return( 'finished' );
	t.equal( r.value, 'finished', 'returns expected value' );
	t.equal( r.done, true, 'returns expected value' );

	r = it.next();
	t.equal( r.value, void 0, 'returns expected value' );
	t.equal( r.done, true, 'returns expected value' );

	t.end();
});

tape( 'if an environment supports `Symbol.iterator`, the returned iterator is iterable', function test( t ) {
	var iterator;
	var it1;
	var it2;
	var i;

	iterator = proxyquire( './../lib/main.js', {
		'@stdlib/symbol-iterator': '__ITERATOR_SYMBOL__'
	});

	it1 = iterator( 2.0, 5.0 );
	t.equal( typeof it1[ '__ITERATOR_SYMBOL__' ], 'function', 'has method' );
	t.equal( it1[ '__ITERATOR_SYMBOL__' ].length, 0, 'has zero arity' );

	it2 = it1[ '__ITERATOR_SYMBOL__' ]();
	t.equal( typeof it2, 'object', 'returns an object' );
	t.equal( typeof it2.next, 'function', 'has method' );
	t.equal( typeof it2.return, 'function', 'has method' );
	t.deepEqual( it2.seed, it1.seed, 'has expected seed' );
	t.deepEqual( it2.state, it1.state, 'has expected state' );

	for ( i = 0; i < 100; i++ ) {
		t.equal( it2.next().value, it1.next().value, 'returns expected value' );
	}
	t.end();
});

tape( 'if an environment does not support `Symbol.iterator`, the returned iterator is not "iterable"', function test( t ) {
	var iterator;
	var it;

	iterator = proxyquire( './../lib/main.js', {
		'@stdlib/symbol-iterator': false
	});

	it = iterator( 2.0, 5.0 );
	t.equal( it[ iteratorSymbol ], void 0, 'does not have property' );

	t.end();
});

tape( 'the function supports specifying the underlying PRNG', function test( t ) {
	var it;
	var r;
	var i;

	it = iterator( 2.0, 5.0, {
		'prng': minstd.normalized
	});

	for ( i = 0; i < 1e2; i++ ) {
		r = it.next().value;
		t.equal( typeof r, 'number', 'returns a number' );
	}
	t.end();
});

tape( 'the function supports providing a seeded underlying PRNG', function test( t ) {
	var randu;
	var seed;
	var it1;
	var it2;
	var r1;
	var r2;
	var i;

	seed = now();

	randu = minstd.factory({
		'seed': seed
	});
	it1 = iterator( 2.0, 5.0, {
		'prng': randu.normalized
	});

	randu = minstd.factory({
		'seed': seed
	});
	it2 = iterator( 2.0, 5.0, {
		'prng': randu.normalized
	});

	t.notEqual( it1, it2, 'separate iterators' );

	for ( i = 0; i < 1e2; i++ ) {
		r1 = it1.next().value;
		r2 = it2.next().value;
		t.equal( r1, r2, 'both return same number' );
	}
	t.end();
});

tape( 'the function supports specifying the underlying generator state', function test( t ) {
	var state;
	var arr;
	var it;
	var i;

	it = iterator( 2.0, 5.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		it.next();
	}
	// Capture the current state:
	state = it.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( it.next().value );
	}

	// Create another iterator using the captured state:
	it = iterator( 2.0, 5.0, {
		'state': state
	});

	// Replay previously generated values...
	for ( i = 0; i < 100; i++ ) {
		t.equal( it.next().value, arr[ i ], 'returns expected value. i: '+i+'.' );
	}
	t.end();
});

tape( 'the function supports specifying a shared underlying generator state', function test( t ) {
	var shared;
	var state;
	var arr;
	var it1;
	var it2;
	var it;
	var v1;
	var v2;
	var i;
	var j;

	it = iterator( 2.0, 5.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		it.next();
	}
	// Capture the current state:
	state = it.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( it.next().value );
	}

	// Create a copy of the state (to prevent mutation) which will be shared by more than one PRNG:
	shared = new Uint32Array( state );

	// Create iterators using the captured state:
	it1 = iterator( 2.0, 5.0, {
		'state': shared,
		'copy': false
	});
	it2 = iterator( 2.0, 5.0, {
		'state': shared,
		'copy': false
	});

	// Replay previously generated values...
	j = 0;
	for ( i = 0; i < 25; i++ ) {
		v1 = it1.next().value;
		v2 = it2.next().value;
		t.equal( v1, arr[ j ], 'returns expected value. i: '+j+'.' );
		t.equal( v2, arr[ j+1 ], 'returns expected value. i: '+(j+1)+'.' );
		j += 2; // stride
	}

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		it2.next();
	}

	// Reset the (shared) state:
	it1.state = state;

	// Replay previously generated values...
	j = 0;
	for ( i = 0; i < 25; i++ ) {
		v1 = it1.next().value;
		v2 = it2.next().value;
		t.equal( v1, arr[ j ], 'returns expected value. i: '+j+'.' );
		t.equal( v2, arr[ j+1 ], 'returns expected value. i: '+(j+1)+'.' );
		j += 2; // stride
	}
	t.end();
});

tape( 'the returned iterator supports setting the underlying generator state', function test( t ) {
	var state;
	var arr;
	var it;
	var i;

	it = iterator( 2.0, 5.0 );

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		it.next();
	}
	// Capture the current state:
	state = it.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( it.next().value );
	}
	// Set the state:
	it.state = state;

	// Replay previously generated values...
	for ( i = 0; i < 100; i++ ) {
		t.equal( it.next().value, arr[ i ], 'returns expected value. i: '+i+'.' );
	}
	t.end();
});
