import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleOrder1 {
    id_Producto?: string;
    nameP?: string;
    quantityP?: number;
    pricePO?: number;
    priceTotalO?: number;
    stockD?: number;
}
export interface IOrder1 extends Document {
    id_Producto: string;
    nameP: string;
    quantityP: number;
    pricePO: number;
    priceTotalO: number;
    stockD: number;
}
const orderSchema: Schema = new Schema({
    id_Producto: { type: String },
    nameP: { type: String },
    quantityP: { type: Number },
    pricePO: { type: Number },
    priceTotalO: { type: Number },
    stockD: { type: Number }
});
export default mongoose.model<IOrder1>("Order1", orderSchema);