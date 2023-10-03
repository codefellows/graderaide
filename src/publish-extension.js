// create out directory for static Chrome Extension

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('out/**/*.html');
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const modifiedContent = content.replace(/\/_next/g, './next');
  fs.writeFileSync(file, modifiedContent, 'utf-8');
});

let sourcePath = 'out/_next';
let destinationPath = 'out/next';

fs.renameSync(sourcePath, destinationPath);

sourcePath = 'out';
destinationPath = '../extension';

fs.rmSync(destinationPath, {force: true, recursive: true});
fs.renameSync(sourcePath, destinationPath);

console.log('Extension created successfully, exported to /extension for loading into Chrome.');
