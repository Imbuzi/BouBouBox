import fs from 'fs'
import path from 'path'

console.log(fs);

const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())

console.log(getDirectories('./'));

import * as components from './';