import express from 'express';
import ctrl from '../controller/indexCtrl';
import route from '../route';
const router = express.Router();

router.post(route.pwd_match, ctrl.pwd_match);
router.post(route.mac, ctrl.mac);
router.post(route.reg, ctrl.register);
router.get(route.who_on, ctrl.who_on);

export default router;
