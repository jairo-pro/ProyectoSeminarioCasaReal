import mongoose, { Schema, Document } from "mongoose";
import { IOrder1 } from "./order";

export interface ISimpleOrder {
    client?: string;
    telephono?: string;
    stateOrder?: string;
    registerdateO?: Date;
    registerdateD?: Date;
    productO?: Array<IOrder1>;
    quantityP?: number;
    priceTotalOrder?: number;
    methodPay?: string;
    notOrder?: string;
    causeNotOrder?: string;
}
export interface IOrder extends Document {
    client: string;
    telephono: string;
    stateOrder: string;
    registerdateO: Date;
    registerdateD?: Date;
    productsO: Array<IOrder1>;
    quantityP: number;
    priceTotalOrder: number;
    methodPay: string;
    notOrder?: string;
    causeNotOrder?: string;
}
const ordersSchema: Schema = new Schema({
    client: { type: String, required: true },
    telephono: { type: String },
    stateOrder: { type: String },
    registerdateO: { type: Date, required: true },
    registerdateD: { type: Date },
    productsO: { type: Array },
    quantityP: { type: Number },
    priceTotalOrder: { type: Number },
    methodPay: { type: String },
    notOrder: { type: String },
    causeNotOrder: { type: String },
});
export default mongoose.model<IOrder>("Orders", ordersSchema);