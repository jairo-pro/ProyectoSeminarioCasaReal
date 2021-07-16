import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleProduct {
    registerdateP?: Date;
    nameProduct?: string;
    stockP?: number;
    priceP?: number;
    uriphoto?: string;
    pathphoto?: string;
}
export interface IProduct extends Document {
    registerdateP: Date;
    nameProduct: string;
    stockP: number;
    priceP: number;
    uriphoto: string;
    pathphoto: string;
}

const productSchema: Schema = new Schema({
    registerdateP: { type: Date },
    nameProduct: { type: String },
    stockP: { type: Number },
    priceP: { type: Number },
    uriphoto: { type: String },
    pathphoto: { type: String },
});
export default mongoose.model<IProduct>("Product", productSchema);