import mongoose, { Document, Schema } from "mongoose";

export interface ISimpleReunion {
    idVendedor?: string;
    idClient?: string;
    fecha?: string; // fecha de la reunion programada
    result?: boolean; // resultado de la reunion Si no
    registerdate?: Date; // fecha de la reunion creada
    updateAt?: Date;

}
export interface IReunion extends Document {
    idVendedor: string;
    idClient: string;
    fecha: string; // fecha de la reunion programada
    hora: string;
    result: boolean; // resultado de la reunion Si no
    registerdate?: Date; // fecha de la reunion creada
    updateAt?: Date;

}
const reunionSchema = new Schema({
    idVendedor: { type: String, required: true },
    idClient: { type: String, required: true },
    fecha: { type: String },
    hora: { type: String },
    result: { type: Boolean },
    registerdate: { type: Date, default: Date.now },
    updateAt: { type: Date },
});

export default mongoose.model<IReunion>("Reunion", reunionSchema);