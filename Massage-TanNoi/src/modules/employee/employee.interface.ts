import { Document, Schema } from "mongoose";
export interface CustomerModalBase {
    employeeCode?: String,
    employeeName?: String,
    ticketType?:String,
    managementArea?: [{
      path?: String,
      fullAddress?: String
    }],
    priceTicket?: Number,
    timeService?: String,
    picture?: String,
}
export interface CustomerDocument extends CustomerModalBase, Document {}