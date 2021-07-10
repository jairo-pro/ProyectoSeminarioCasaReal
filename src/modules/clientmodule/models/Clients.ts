import mongoose, { Schema, Document } from "mongoose";


export interface ISimpleClient {
    fullname?: string;
    surname?: string;
    telephone?: string;
    address?: string;
    email?: string;
    type: string; // regular, potencial
    state?: boolean;
    registerdate?: Date;
    updateAt?: Date;
    uriavatar?: string;
    pathavatar?: string;
}
export interface IClient extends Document {
    fullname: string;
    surname: string;
    telephone: string;
    address: string;
    email: string;
    type: string; // regular, potencial
    state: boolean;
    registerdate: Date;
    updateAt?: Date;
    uriavatar?: string;
    pathavatar?: string;
}
const userSchema: Schema = new Schema({
    fullname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, required: true/*default: "potencial"*/ },
    telephone: { type: String },
    address: { type: String },
    state: { type: Boolean },
    registerdate: { type: Date, required: true },//default: Date.now
    updateAt: { type: Date },
    uriavatar: { type: String },
    pathavatar: { type: String },
});

export default mongoose.model<IClient>("Client", userSchema);