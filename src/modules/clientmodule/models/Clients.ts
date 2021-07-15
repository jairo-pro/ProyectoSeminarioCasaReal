import mongoose, { Schema, Document } from "mongoose";
import { IReunion } from "./Reunion";
import { IOrder } from "../../ordermodule/models/orders"

export interface ISimpleClient {
    fullname?: string;
    surname?: string;
    telephone?: string;
    zona?: string;  //domicilio, direccion
    calle?: string;
    numero?: number;
    email?: string;
    type?: string; // regular, potencial
    probability?: number;
    state?: boolean;
    registerdate?: Date;
    updateAt?: Date;
    uriphoto?: string;
    pathphoto?: string;
    idVendedor?: string;
    pedidos?: Array<IOrder>;
    reunion?: Array<IReunion>;
}
export interface IClient extends Document {
    fullname: string;
    surname: string;
    telephone: string;
    zona: string;
    calle: string;
    numero: number; //numero de domicilio o negocio
    email: string;
    type: string; // regular, potencial
    probability: number; //probabilidad
    state: boolean; // en ruta
    registerdate: Date;
    updateAt?: Date;
    uriphoto?: string;
    pathphoto?: string;
    idVendedor: string;
    pedidos?: Array<IOrder>;
    reunion?: Array<IReunion>;
}
const clientSchema: Schema = new Schema({
    fullname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, required: true/*default: "potencial"*/ },
    telephone: { type: String },
    zona: { type: String },
    calle: { type: String },
    numero: { type: Number },
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