import mongoose,{ Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const citySchema = new Schema({
  cityName: String,
},{
  timestamps: true
})

citySchema.plugin(mongooseAggregatePaginate)
const cityCollection = mongoose.model('city', citySchema, 'city');

export default cityCollection;