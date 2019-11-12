"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseFunctions = require("firebase-functions");

var functions = _interopRequireWildcard(_firebaseFunctions);

var _storage = require("firebase-functions/lib/providers/storage");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: "register",
    value: async function register(req, res) {
      try {
        var nickname = req.body.name;
        var mac = req.body.mac;
        var pwd = req.body.pwd;
        res.json({ res: "nickname: " + nickname + ", mac: " + mac + ", pwd: " + pwd });
      } catch (err) {}
    }
  }, {
    key: "pwd_match",
    value: async function pwd_match(req, res) {
      try {
        //db에서 mac address 와 pwd를 서로 매치
        //매치가 되면 디비에서 들어왔는지 플래그 수정
        //나갈때는 안드로이드에서 버튼
        res.json({ res: "your pwd is " + req.body.pwd });
      } catch (err) {
        console.log(err);
        res.json({ status: "error", err: err });
      }
    }
  }, {
    key: "mac",
    value: async function mac(req, res) {
      try {
        //db에서
        res.json({ res: "your mac address is " + req.body.mac });
      } catch (err) {
        console.log(err);
        res.json({ status: "error", err: err });
      }
    }
  }, {
    key: "who_on",
    value: async function who_on(req, res) {
      try {
        res.json({ name: ["김주영", "이재규"] });
      } catch (err) {}
    }
  }, {
    key: "log",
    value: async function log(req, res) {
      // name, 출석 기록
      try {
        res.json({});
      } catch (err) {}
    }
  }, {
    key: "exit",
    value: async function exit(req, res) {
      try {
        res.json({ exit: "ok" });
      } catch (err) {}
    }
  }]);

  return Controller;
}();

module.exports = new Controller();