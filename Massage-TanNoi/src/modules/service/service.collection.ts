import mongoose,{ Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const serviceSchema = new Schema({
  serviceName: {
    vi:String,
    en:String,
    kr:String,
  },
  description: {
    vi:String,
    en:String,
    kr:String,
  },
},{
  timestamps: true
})

serviceSchema.plugin(mongooseAggregatePaginate)
const serviceCollection = mongoose.model('service', serviceSchema, 'service');

export default serviceCollection;