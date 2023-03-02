import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TokenSchema = new Schema({
  id: ObjectId,
  token: String,
  phone: String,
  isAuth: { type: Boolean, default: false }
});

export const Tokens = mongoose.model('Tokens', TokenSchema);
