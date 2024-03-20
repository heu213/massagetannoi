import { Document, Schema } from "mongoose";
export interface BillItemModalBase {
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
}
export interface BillItemDocument extends BillItemModalBase, Document {}