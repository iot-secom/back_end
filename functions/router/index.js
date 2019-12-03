'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _indexCtrl = require('../controller/indexCtrl');

var _indexCtrl2 = _interopRequireDefault(_indexCtrl);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post(_route2.default.pwd_match, _indexCtrl2.default.pwd_match);
router.post(_route2.default.mac, _indexCtrl2.default.mac);
router.post(_route2.default.reg, _indexCtrl2.default.register);
router.get(_route2.default.who_on, _indexCtrl2.default.who_on);
router.post(_route2.default.exit, _indexCtrl2.default.exit);
router.get(_route2.default.logs, _indexCtrl2.default.log);

exports.default = router;