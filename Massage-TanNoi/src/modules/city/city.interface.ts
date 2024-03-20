import { Document, Schema } from "mongoose";
export interface ServiceModalBase {
  cityName?: String,
}
export interface ServiceDocument extends ServiceModalBase, Document {}