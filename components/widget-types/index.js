import fs from '/node_modules/fs'
import path from '/node_modules/path'

console.log(fs);

const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';