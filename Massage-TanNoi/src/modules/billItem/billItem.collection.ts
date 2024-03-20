import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const billItemSchema = new Schema({
  billItemCode: Number,
  serviceId: {
  type: Schema.Types.ObjectId,
  ref: 'service',
  required: true
  },
  employeeId:  {
    type: Schema.Types.ObjectId,
    ref: 'employee',
    required: true
  },
  billId: Schema.Types.ObjectId,
  quality: Number
}, {
  timestamps: true,
},
)
billItemSchema.plugin(mongooseAggregatePaginate);
billItemSchema.plugin(mongoosePaginate);

const billItemCollection = mongoose.model('billItem', billItemSchema, 'billItem');

export default billItemCollection;