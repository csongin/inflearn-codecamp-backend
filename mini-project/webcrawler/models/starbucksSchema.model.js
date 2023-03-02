import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StarbucksSchema = new Schema({
  id: ObjectId,
  name: String,
  img: String,
}, {
  bufferTimeoutMS: 10000
});

export const Starbucks = mongoose.model('Starbucks', StarbucksSchema);
