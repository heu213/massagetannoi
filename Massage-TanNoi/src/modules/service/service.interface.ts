import { Document, Schema } from "mongoose";
export interface ServiceModalBase {
  serviceName?: String,
  employeeId?: Schema.Types.ObjectId
}
export interface ServiceDocument extends ServiceModalBase, Document {}