const fs = require('fs')
const path = require('path')

const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';