const { readdirSync } = require('fs');
const path = require('path');

console.log(readdirSync);
console.log(path);

const getDirectories = srcPath => readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';