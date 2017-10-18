const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const getDirectories = srcPath => readdirSync(srcPath).filter(file => lstatSync(join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';