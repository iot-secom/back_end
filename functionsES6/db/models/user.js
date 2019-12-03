import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String
  },
  pwd: {
    type: String
  },
  device_id: {
    type: String
  },
  exist_flag: {
    type: Boolean
  },
  admin_flag:{
    type:Boolean
  }
});

export default mongoose.model('User', User);
