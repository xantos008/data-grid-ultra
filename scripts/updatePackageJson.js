const fs = require('fs');
const path = require('path');

function updatePackageJson() {
    const packageBuild = path.join(__dirname, '../build/package.json');
    const packageDist = path.join(__dirname, '../dist/package.json');
    fs.access(packageBuild, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('package.json does not exist');
        } else {
            const packageJson = require(packageBuild);
            // Modify package.json
            delete packageJson.files;
            delete packageJson['jsnext:main'];
            packageJson.main = './node/index.js';
            packageJson.module = './index.js';
            packageJson.types = './index.d.ts';
            // Save the modified package.json
            fs.writeFileSync(packageBuild, JSON.stringify(packageJson, null, 2));
        }
    });
    fs.access(packageDist, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('package.json does not exist');
        } else {
            const packageJson = require(packageBuild);
            // Modify package.json
            delete packageJson.files;
            delete packageJson['jsnext:main'];
            packageJson.main = './node/index.js';
            packageJson.module = './index.js';
            packageJson.types = './index.d.ts';
            // Save the modified package.json
            fs.writeFileSync(packageDist, JSON.stringify(packageJson, null, 2));
        }
    });
}

module.exports = updatePackageJson;
