'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _storage = require('firebase-functions/lib/providers/storage');

var _models = require('../db/models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: 'register',
    value: async function register(req, res) {
      try {
        var nickname = req.body.name;
        var mac = req.body.mac;
        var pwd = req.body.pwd;
        var user = await _models.User.findOne({ device_id: mac });
        if (!user) {
          var newUser = new _models.User();
          newUser.name = nickname;
          newUser.pwd = pwd;
          newUser.device_id = mac;
          newUser.exist_flag = false;
          newUser.admin_flag = false;
          await newUser.save();
        }
        res.json({ status: 'ok' });
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: 'pwd_match',
    value: async function pwd_match(req, res) {
      try {
        //db에서 mac address 와 pwd를 서로 매치
        //매치가 되면 디비에서 들어왔는지 플래그 수정
        //나갈때는 안드로이드에서 버튼
        var mac = req.body.mac;
        var user = await _models.User.findOne({ device_id: mac });
        if (user) {
          if (user.pwd == req.body.pwd) {
            var update_user = await _models.User.updateOne({ device_id: mac }, { $set: { exist_flag: 'true' } });
            var log = new _models.Log();
            log.device_id = mac;
            log.exist_flag = true;
            log.time = new Date().toString();
            await log.save();
            console.log(log);
            res.json({ user: user.nickname, exist_flag: true });
          } else {
            res.json({ user: user.nickname, status: 'pwd is not match' });
          }
        } else {
          res.json({ user: user.nickname, status: 'no user' });
        }
      } catch (err) {
        console.log(err);
        res.json({ status: 'error', err: err });
      }
    }
  }, {
    key: 'mac',
    value: async function mac(req, res) {
      try {
        //db에서
        res.json({ res: 'your mac address is ' + req.body.mac });
      } catch (err) {
        console.log(err);
        res.json({ status: 'error', err: err });
      }
    }
  }, {
    key: 'who_on',
    value: async function who_on(req, res) {
      try {
        var users = await _models.User.find({ exist_flag: true }, { name: 1 });

        res.json({ users: users });
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: 'log',
    value: async function log(req, res) {
      try {
        var logs = await _models.Log.find({});
        var log_c = await Promise.all(logs.map(async function (l) {
          var user = await _models.User.findOne({ device_id: l.device_id }, { name: 1 });
          console.log(user.name);
          var exist_string = l.exist_flag ? '들어왔습니다.' : '나갔습니다.';
          return user.name + ' ' + exist_string + ', \uC2DC\uAC04: ' + l.time;
        }));

        res.json(log_c);
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: 'exit',
    value: async function exit(req, res) {
      try {
        var mac = req.body.mac;
        var user = await _models.User.findOne({ device_id: mac });
        if (user) {
          _models.User.updateOne({ device_id: mac }, { $set: { exist_flag: 'false' } });
          var log = new _models.Log();
          log.device_id = mac;
          log.exist_flag = false;
          log.time = new Date().toString();
          await log.save();
        }
        res.json({ exit: 'ok' });
      } catch (err) {}
    }
  }]);

  return Controller;
}();

module.exports = new Controller();