import lib from './index.js';

const args = process.argv.slice(2);
const key = args[0] || 'ana123';

const svgText = lib.getSVG(key);
console.log(svgText);
