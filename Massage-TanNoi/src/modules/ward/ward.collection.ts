import mongoose,{ Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const wardSchema = new Schema({
  wardName: String,
  cityId: Schema.Types.ObjectId
},{
  timestamps: true
})

wardSchema.plugin(mongooseAggregatePaginate)
const wardCollection = mongoose.model('ward', wardSchema, 'ward');

export default wardCollection;