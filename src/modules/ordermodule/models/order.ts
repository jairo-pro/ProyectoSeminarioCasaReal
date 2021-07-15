import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleOrder1 {
    nameP?: string;
    quantityP?: number;
    pricePO?: number;
    priceTotalO?: number;
    stockD?: number;
}
export interface IOrder1 extends Document {
    nameP: string;
    quantityP: number;
    pricePO: number;
    priceTotalO: number;
    stockD: number;
}
const orderSchema: Schema = new Schema({
    nameP: { type: String },
    quantityP: { type: Number },
    pricePO: { type: Number },
    priceTotalO: { type: Number },
    stockD: { type: Number }
});
export default mongoose.model<IOrder1>("Order1", orderSchema);