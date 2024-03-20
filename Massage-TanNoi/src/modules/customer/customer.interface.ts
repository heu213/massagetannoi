import { Document, Schema } from "mongoose";
export interface Customer {
  customerName?: String,
  customerCode?: Number,
  address?: String,
  phoneNumber?: String,
  employeeId?: Schema.Types.ObjectId,
  email?: String,
  deletedAt?: Date,
}
interface CustomerBaseDocument extends Customer, Document { }

export interface CustomerDocument extends CustomerBaseDocument { }