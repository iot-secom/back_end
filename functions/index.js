'use strict';

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_firebaseAdmin2.default.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var app = (0, _express2.default)();

var functionConfig = function functionConfig() {
  if (process.env.RUN_LOCALLY) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync('.env.json'));
  } else {
    return functions.config();
  }
};
(0, _db2.default)();
console.log(functionConfig());
// Automatically allow cross-origin requests
app.use((0, _cors2.default)({ origin: true }));

// Add middleware to authenticate requests
app.use(_express2.default.json());
app.use(_bodyParser2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use(_router2.default);

// Expose Express API as a single Cloud Function:
exports.webHook = functions.region('asia-northeast1').https.onRequest(app);