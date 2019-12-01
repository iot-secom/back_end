import mongoose from 'mongoose';

const { Schema } = mongoose;

const Log = new Schema({
  device_id: {
    type: String
  },
  exist_flag: {
    type: Boolean
  },
  time: {
    type: String
  }
});

export default mongoose.model('Log', Log);
