import express from 'express';
import ctrl from '../controller/indexCtrl';
import route from '../route';
const router = express.Router();

router.post(route.pwd_match, ctrl.pwd_match);

export default router;
