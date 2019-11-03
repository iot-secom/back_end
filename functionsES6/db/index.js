import * as functions from 'firebase-functions';
import fs from 'fs';
import mongoose from 'mongoose';

const functionConfig = () => {
	if (process.env.RUN_LOCALLY) {
		return JSON.parse(fs.readFileSync('.env.json'));
	} else {
		return functions.config();
	}
};
const connectDB = () => {
	const { MONGO_URI } = functionConfig().env;
	mongoose.Promise = global.Promise;

	return mongoose
		.connect(MONGO_URI, { useNewUrlParser: true })
		.then(() => console.log('connected to db!'))
		.catch((e) => console.log(e));
};

export default connectDB;
