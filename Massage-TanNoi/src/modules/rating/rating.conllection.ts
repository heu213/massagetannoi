import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ratingSchema = new Schema({
 ratingNumber: Number,
 employeeId: Schema.Types.ObjectId
}, {
  timestamps: true,
},
)
ratingSchema.plugin(mongooseAggregatePaginate)
const ratingCollection = mongoose.model('rating', ratingSchema, 'rating');

export default ratingCollection;