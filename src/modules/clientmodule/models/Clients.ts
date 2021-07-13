import mongoose, { Schema, Document } from "mongoose";
import { IReunion } from "./Reunion";

export interface ISimpleClient {
    fullname?: string;
    surname?: string;
    telephone?: string;
    address?: string;  //domicilio, direccion
    email?: string;
    type?: string; // regular, potencial
    probability?: number;
    state?: boolean;
    registerdate?: Date;
    updateAt?: Date;
    uriphoto?: string;
    pathphoto?: string;
    idVendedor?: string;
    //pedidos?: Array<IPedido>;
    reunion?: Array<IReunion>;
}
export interface IClient extends Document {
    fullname: string;
    surname: string;
    telephone: string;
    address: string;
    email: string;
    type: string; // regular, potencial
    probability: number; //probabilidad
    state: boolean;
    registerdate: Date;
    updateAt?: Date;
    uriphoto?: string;
    pathphoto?: string;
    idVendedor: string;
    //pedidos?: Array<IPedido>;
    reunion?: Array<IReunion>;
}
const clientSchema: Schema = new Schema({
    fullname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, required: true/*default: "potencial"*/ },
    telephone: { type: String },
    address: { type: String },
    probability: {type: Number},
    state: { type: Boolean },
    registerdate: { type: Date, required: true },//default: Date.now
    updateAt: { type: Date },
    uriphoto: { type: String },
    pathphoto: { type: String },
    idVendedor: { type: String },
    pedidos: {type: Array},
    reunion: { type: Array },
});

export default mongoose.model<IClient>("Client", clientSchema);