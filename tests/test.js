var test = require('tape');
var lib = require('../lib/simpleflakes')
var BigNum = require('bn.js')

var SIMPLEFLAKE = '4242436206093260245';
var SIMPLEFLAKE_EPOCH = 946702800000;
var SIMPLEFLAKE_TIMESTAMP = 1452440606092;
var SIMPLEFLAKE_RANDOMBITS = 7460309;

var SIMPLEFLAKE_2 = '11101011100000001010010100000010000110011100011101010111010101';
var SIMPLEFLAKE_16 = '3ae029408671d5d5';
var SIMPLEFLAKE_36 = 'w8cq4fjf37x1';

test('testing bn.js', function(t) {

  var bignum = new BigNum(SIMPLEFLAKE);

  t.equal(bignum.toString(), SIMPLEFLAKE, 'stores-retrieves the right value');
  t.equal(bignum.toString(), bignum.toString(10), 'toString() aliases toString(10)');
  t.equal(bignum.toString(2), SIMPLEFLAKE_2, 'base 2 (binary)');
  t.equal(bignum.toString(16), SIMPLEFLAKE_16, 'base 16');
  t.equal(bignum.toString(36), SIMPLEFLAKE_36, 'base 36');
  t.end();

});


test('testing lib.simpleflake()', function(t) {

  t.assert(lib.simpleflake() instanceof  BigNum, 'returning correct instance of bn.js');
  t.equal(lib.simpleflake(SIMPLEFLAKE_TIMESTAMP, SIMPLEFLAKE_RANDOMBITS, SIMPLEFLAKE_EPOCH).toString(), '4242436206093260245', 'right timestamp, random bits and epoch parameterization');
  t.end();
});

test('testing lib.binary()', function(t) {

  t.equal(lib.binary('83928382810918298'), '0000000100101010001011000110101101100100000001001000110110011010', "simpleflake.binary('83928382810918298')");
  t.equal(lib.binary('83928382810918298', false), '100101010001011000110101101100100000001001000110110011010', "simpleflake.binary('83928382810918298', false)");
  t.equal(lib.binary(7) ,  '0000000000000000000000000000000000000000000000000000000000000111', "simpleflake.binary(7)");
  t.equal(lib.binary(7, false), '111', "simpleflake.binary(7, false)");
  t.equal(lib.binary(64), '0000000000000000000000000000000000000000000000000000000001000000', "simpleflake.binary(64)");
  t.equal(lib.binary(64, false), '1000000', "simpleflake.binary(64, false)");
  t.end();
});

// test('testing lib.extractBits()', function(t) {
//
//   t.equal(SIMPLEFLAKE_TIMESTAMP.toString())
//
// });

test('testing lib.parseSimpleflake()', function(t) {

  var flake = lib.simpleflake(SIMPLEFLAKE_TIMESTAMP, SIMPLEFLAKE_RANDOMBITS);

  t.equal(lib.parseSimpleflake(flake).timestamp, SIMPLEFLAKE_TIMESTAMP.toString(), 'correct timestamp parsing');
  t.equal(lib.parseSimpleflake(flake).randomBits, SIMPLEFLAKE_RANDOMBITS.toString(), 'correct random bits parsing');

  t.end();
});
