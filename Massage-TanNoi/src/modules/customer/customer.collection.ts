import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const customerSchema = new Schema({
  customerName: String,
  customerCode: Number,
  address: String,
  phoneNumber: String,
  employeeId: Schema.Types.ObjectId,
  email: String,
  deletedAt: Date,
}, {
  timestamps: true,
},
)
customerSchema.plugin(mongooseAggregatePaginate)
const customerCollection = mongoose.model('customer', customerSchema, 'customer');

export default customerCollection;