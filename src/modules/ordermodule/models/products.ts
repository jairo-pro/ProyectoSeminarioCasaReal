import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleProduct {
    registerdateP?: Date;
    nameProduct?: string;
    stockP?: number;
    priceP?: number;
}
export interface IProduct extends Document {
    registerdateP: Date;
    nameProduct: string;
    stockP: number;
    priceP: number;
}
const productSchema: Schema = new Schema({
    registerdateP: { type: Date },
    nameProduct: { type: String },
    stockP: { type: Number },
    priceP: { type: Number },
});
export default mongoose.model<IProduct>("Product", productSchema);