const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';