const PWD_MATCH = '/pwd';
const MAC = '/mac';
const REG = '/register';
const WHO_ON = '/who_on';
const EXIT = '/exit'
const LOGS = '/log'

const routes = {
  // update: (id, flag) => {
  // 	if (id) {
  // 		console.log(id);
  // 		return `/edit/${id}/${flag}`;
  // 	} else {
  // 		return EDIT_FLAG;
  // 	}
  // },
  pwd_match: PWD_MATCH,
  mac: MAC,
  reg: REG,
  who_on: WHO_ON,
  exit: EXIT,
  logs: LOGS
};

export default routes;
