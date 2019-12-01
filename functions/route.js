'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PWD_MATCH = '/pwd';
var MAC = '/mac';
var REG = '/register';
var WHO_ON = '/who_on';

var routes = {
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
  who_on: WHO_ON
};

exports.default = routes;