import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MobileTokenSchema = new Schema({
  id: ObjectId,
  token: String,
  phone: String,
  isAuth: { type: Boolean, default: false }
});

export const MobileToken = mongoose.model('MobileToken', MobileTokenSchema);
