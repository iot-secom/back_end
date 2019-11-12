'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var functionConfig = function functionConfig() {
	if (process.env.RUN_LOCALLY) {
		return JSON.parse(_fs2.default.readFileSync('.env.json'));
	} else {
		return functions.config();
	}
};
var connectDB = function connectDB() {
	var MONGO_URI = functionConfig().env.MONGO_URI;

	_mongoose2.default.Promise = global.Promise;

	return _mongoose2.default.connect(MONGO_URI, { useNewUrlParser: true }).then(function () {
		return console.log('connected to db!');
	}).catch(function (e) {
		return console.log(e);
	});
};

exports.default = connectDB;