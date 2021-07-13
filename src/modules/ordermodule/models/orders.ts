import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleOrder {
    client?: string;
    stateOrder?: string;
    registerdateO?: Date;
    registerdateD?: Date;
    productO?: Array<string>;
    priceTotalO?: number;
    methodPay?: string;
    notOrder?: string;
}
export interface IOrder extends Document {
    client: string;
    stateOrder: string;
    registerdateO: Date;
    registerdateD: Date;
    productO: Array<string>;
    priceTotalO: number;
    methodPay: string;
    notOrder: string;
}
const orderSchema: Schema = new Schema({
    client: { type: String, required: true },
    stateOrder: { type: String, required: true },
    registerdateO: { type: Date, required: true },
    registerdateD: { type: Date },
    productO: { type: Array },
    priceTotalO: { type: Number },
    methodPay: { type: String },
    notOrder: { type: String },
});
export default mongoose.model<IOrder>("Order", orderSchema);