import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { TYPE_TICKET } from "./constant";
const employeeSchema = new Schema({
  seviceName: String,
  employeeCode: String,
  picture: String,
  ticketType:{
    type:String,
    enum: Object.values(TYPE_TICKET),
    default: TYPE_TICKET.RAMDOMTICKETS
  },
  managementArea: [{
    path: String,
    fullAddress: String
  }],
  service: [Schema.Types.ObjectId],
  priceTicket: Number,
  timeService: String,
  count: Number,
}, {
  timestamps: true,
},
)
employeeSchema.plugin(mongooseAggregatePaginate);
employeeSchema.plugin(mongoosePaginate);



const employeeCollection = mongoose.model('employee', employeeSchema, 'employee');

export default employeeCollection;