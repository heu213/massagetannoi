import { Document, Schema } from "mongoose";
export interface ServiceModalBase {
  wardName?: String,
  cityId?: Schema.Types.ObjectId
}
export interface ServiceDocument extends ServiceModalBase, Document {}