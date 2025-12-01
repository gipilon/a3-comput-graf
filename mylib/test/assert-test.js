import lib from '../index.js';
import assert from 'assert';

console.log('Running assert-test.js');

// 1) test getSVG returns a string
const svg = lib.getSVG('testKey');
assert.strictEqual(typeof svg, 'string', 'getSVG should return a string');

// 2) test svg includes the key text
assert.ok(svg.includes('testKey'), 'SVG should contain the provided key');

// 3) test the svg starts with xml header
assert.ok(svg.trim().startsWith('<?xml'), 'SVG should start with XML header');

// 4) test generating different keys produce different colors (basic check)
const svgA = lib.getSVG('aaa');
const svgB = lib.getSVG('bbb');
assert.notStrictEqual(svgA, svgB, 'SVG outputs should differ for different keys');

console.log('All tests passed.');
