import * as functions from 'firebase-functions';

class Controller {
	async pwd_match(req, res) {
		try {
			res.json({ res: `your pwd is ${req.body.pwd}` });
		} catch (err) {
			console.log(err);
			res.json({ status: 'error', err: err });
		}
	}
}

module.exports = new Controller();
