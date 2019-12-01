import * as functions from 'firebase-functions';
import { _bucketWithOptions } from 'firebase-functions/lib/providers/storage';
import { User, Log } from '../db/models';

class Controller {
  async register(req, res) {
    try {
      const nickname = req.body.name;
      const mac = req.body.mac;
      const pwd = req.body.pwd;
      const user = await User.findOne({ device_id: mac });
      if (!user) {
        const newUser = new User();
        newUser.name = nickname;
        newUser.pwd = pwd;
        newUser.device_id = mac;
        newUser.exist_flag = false;
        await newUser.save();
      }
      res.json({ status: 'ok' });
    } catch (err) {
      console.log(err);
    }
  }
  async pwd_match(req, res) {
    try {
      //db에서 mac address 와 pwd를 서로 매치
      //매치가 되면 디비에서 들어왔는지 플래그 수정
      //나갈때는 안드로이드에서 버튼
      const mac = req.body.mac;
      const user = await User.findOne({ device_id: mac });
      if (user) {
        if (user.pwd == req.body.pwd) {
          const update_user = await User.updateOne(
            { device_id: mac },
            { $set: { exist_flag: 'true' } }
          );
          const log = new Log();
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

  async mac(req, res) {
    try {
      //db에서
      res.json({ res: `your mac address is ${req.body.mac}` });
    } catch (err) {
      console.log(err);
      res.json({ status: 'error', err: err });
    }
  }

  async who_on(req, res) {
    try {
      const users = await User.find({ exist_flag: true }, { name: 1 });

      res.json({ users: users });
    } catch (err) {
      console.log(err);
    }
  }

  async log(req, res) {
    // name, 출석 기록
    try {
      res.json({});
    } catch (err) {}
  }

  async exit(req, res) {
    try {
      const mac = req.body.mac;
      const user = await User.findOne({ device_id: mac });
      if (user) {
        User.updateOne({ device_id: mac }, { $set: { exist_flag: 'false' } });
        const log = new Log();
        log.device_id = mac;
        log.exist_flag = false;
        log.time = new Date().toString();
      }
      res.json({ exit: 'ok' });
    } catch (err) {}
  }
}

module.exports = new Controller();
