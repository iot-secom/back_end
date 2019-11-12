import * as functions from "firebase-functions";
import { _bucketWithOptions } from "firebase-functions/lib/providers/storage";

class Controller {
  async register(req, res) {
    try {
      const nickname = req.body.name;
      const mac = req.body.mac;
      const pwd = req.body.pwd;
      res.json({ res: `nickname: ${nickname}, mac: ${mac}, pwd: ${pwd}` });
    } catch (err) {}
  }
  async pwd_match(req, res) {
    try {
      //db에서 mac address 와 pwd를 서로 매치
      //매치가 되면 디비에서 들어왔는지 플래그 수정
      //나갈때는 안드로이드에서 버튼
      res.json({ res: `your pwd is ${req.body.pwd}` });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", err: err });
    }
  }

  async mac(req, res) {
    try {
      //db에서
      res.json({ res: `your mac address is ${req.body.mac}` });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", err: err });
    }
  }

  async who_on(req, res) {
    try {
      res.json({ name: ["김주영", "이재규"] });
    } catch (err) {}
  }

  async log(req, res) {
    // name, 출석 기록
    try {
      res.json({});
    } catch (err) {}
  }

  async exit(req, res) {
    try {
      res.json({ exit: "ok" });
    } catch (err) {}
  }
}

module.exports = new Controller();
