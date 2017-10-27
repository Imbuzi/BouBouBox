const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const dirTree = require('directory-tree');

let modules = {};

function requireNested(tree, parentName = '') {
    tree.children.forEach(function (child) {
        if (child.type == 'directory') {
            let pathName = ((parentName) ? (parentName) : '') + child.name + '/';
            requireNested(child, pathName);
        } else {
            let fileName = parentName + child.name;
            let dottedModuleName = fileName.replace(/\//g, '.').replace('.js', '');
            lodash.set(modules, dottedModuleName, require('./modules/' + fileName));
        }
    });
}
const tree = dirTree(path.join(__dirname, "modules"));

requireNested(tree);

console.log(modules);

module.exports = modules;