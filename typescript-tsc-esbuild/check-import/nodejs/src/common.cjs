const path = require('path');
// CommonJS module은 .cjs 확장자를 사용해야 한다. 
exports.getCommonPath = function () {
    return path.join(__dirname, 'common.cjs');
} 



