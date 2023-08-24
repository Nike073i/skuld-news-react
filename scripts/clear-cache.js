const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache');
fs.stat(cacheDir, (err) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('Cache folder missing');
        } else {
            console.error('An error occurred while clearing the cache');
        }
    } else {
        fs.rmdir(cacheDir, { recursive: true }, (err) => {
            if (err) {
                console.error('An error occurred while clearing the cache');
                return;
            }
            console.log('Cache has been cleared');
        });
    }
});
