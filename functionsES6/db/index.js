import * as functions from 'firebase-functions';
import fs from 'fs';
import mongoose from 'mongoose';

const connectDB = () => {
  const MONGO_URI = `mongodb+srv://admin:${
    functions.config().env.pwd
  }@cluster0-kxzuv.mongodb.net/test?retryWrites=true&w=majority`;
  mongoose.Promise = global.Promise;

  return mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('connected to db!'))
    .catch(e => console.log(e));
};

export default connectDB;
