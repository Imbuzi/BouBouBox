const fs = require('fs');
const path = require('path');

console.log(fs);
console.log(path);

const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';