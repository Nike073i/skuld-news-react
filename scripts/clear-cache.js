const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache');
fs.rmdir(cacheDir, { recursive: true }, (err) => {
    if (err) {
        console.error('An error occurred while clearing the cache');
        return;
    }
    console.log('Cache has been cleared');
});
